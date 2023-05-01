import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon, Icons } from "@/components/Icon";
import { useLoading } from "@/hooks/useLoading";
import { MWMediaType, MWSeasonWithEpisodeMeta } from "@/backend/metadata/types";
import { getMetaFromId } from "@/backend/metadata/getmeta";
import { decodeJWId } from "@/backend/metadata/justwatch";
import { Loading } from "@/components/layout/Loading";
import { IconPatch } from "@/components/buttons/IconPatch";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useMeta } from "@/video/state/logic/meta";
import { useControls } from "@/video/state/logic/controls";
import { useWatchedContext } from "@/state/watched";
import { useTranslation } from "react-i18next";
import { FloatingView } from "@/components/popout/FloatingView";
import { useFloatingRouter } from "@/hooks/useFloatingRouter";
import { FloatingCardView } from "@/components/popout/FloatingCard";
import { PopoutListEntry } from "./PopoutUtils";

export function EpisodeSelectionPopout() {
  const params = useParams<{
    media: string;
  }>();
  const { t } = useTranslation();
  const { pageProps, navigate } = useFloatingRouter("/episodes");

  const descriptor = useVideoPlayerDescriptor();
  const meta = useMeta(descriptor);
  const controls = useControls(descriptor);

  const [currentVisibleSeason, setCurrentVisibleSeason] = useState<{
    seasonId: string;
    season?: MWSeasonWithEpisodeMeta;
  } | null>(null);
  const [reqSeasonMeta, loading, error] = useLoading(
    (id: string, seasonId: string) => {
      return getMetaFromId(MWMediaType.SERIES, id, seasonId);
    }
  );
  const requestSeason = useCallback(
    (sId: string) => {
      setCurrentVisibleSeason({
        seasonId: sId,
        season: undefined,
      });
      reqSeasonMeta(decodeJWId(params.media)?.id as string, sId).then((v) => {
        if (v?.meta.type !== MWMediaType.SERIES) return;
        setCurrentVisibleSeason({
          seasonId: sId,
          season: v?.meta.seasonData,
        });
      });
    },
    [reqSeasonMeta, params.media]
  );

  const currentSeasonId =
    currentVisibleSeason?.seasonId ?? meta?.episode?.seasonId;

  const setCurrent = useCallback(
    (seasonId: string, episodeId: string) => {
      controls.closePopout();
      // race condition, jank solution but it works.
      setTimeout(() => {
        controls.setCurrentEpisode(seasonId, episodeId);
      }, 100);
    },
    [controls]
  );

  const currentSeasonInfo = useMemo(() => {
    return meta?.seasons?.find((season) => season.id === currentSeasonId);
  }, [meta, currentSeasonId]);

  const currentSeasonEpisodes = useMemo(() => {
    if (currentVisibleSeason?.season) {
      return currentVisibleSeason?.season?.episodes;
    }
    return meta?.seasons?.find?.(
      (season) => season && season.id === currentSeasonId
    )?.episodes;
  }, [meta, currentSeasonId, currentVisibleSeason]);

  const setSeason = (id: string) => {
    requestSeason(id);
    setCurrentVisibleSeason({ seasonId: id });
    navigate("/episodes");
  };

  const { watched } = useWatchedContext();

  const closePopout = () => {
    controls.closePopout();
  };

  return (
    <>
      <FloatingView {...pageProps("seasons")} height={600} width={375}>
        <FloatingCardView.Header
          title={t("videoPlayer.popouts.seasons")}
          description={t("videoPlayer.popouts.descriptions.seasons")}
          goBack={() => navigate("/episodes")}
          backText={`To ${currentSeasonInfo?.title.toLowerCase()}`}
        />
        <FloatingCardView.Content>
          {currentSeasonInfo
            ? meta?.seasons?.map?.((season) => (
                <PopoutListEntry
                  key={season.id}
                  active={meta?.episode?.seasonId === season.id}
                  onClick={() => setSeason(season.id)}
                >
                  {season.title}
                </PopoutListEntry>
              ))
            : "No season"}
        </FloatingCardView.Content>
      </FloatingView>
      <FloatingView {...pageProps("episodes")} height={600} width={375}>
        <FloatingCardView.Header
          title={currentSeasonInfo?.title ?? "Unknown season"}
          description={t("videoPlayer.popouts.descriptions.episode")}
          goBack={closePopout}
          close
          action={
            <button
              type="button"
              onClick={() => navigate("/episodes/seasons")}
              className="flex cursor-pointer items-center space-x-2 transition-colors duration-200 hover:text-white"
            >
              <span>Other seasons</span>
              <Icon icon={Icons.CHEVRON_RIGHT} />
            </button>
          }
        />
        <FloatingCardView.Content>
          {loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loading />
            </div>
          ) : error ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col flex-wrap items-center text-slate-400">
                <IconPatch
                  icon={Icons.EYE_SLASH}
                  className="text-xl text-bink-600"
                />
                <p className="mt-6 w-full text-center">
                  {t("videoPlayer.popouts.errors.loadingWentWrong", {
                    seasonTitle: currentSeasonInfo?.title?.toLowerCase(),
                  })}
                </p>
              </div>
            </div>
          ) : (
            <div>
              {currentSeasonEpisodes && currentSeasonInfo
                ? currentSeasonEpisodes.map((e) => (
                    <PopoutListEntry
                      key={e.id}
                      active={e.id === meta?.episode?.episodeId}
                      onClick={() => {
                        if (e.id === meta?.episode?.episodeId)
                          controls.closePopout();
                        else setCurrent(currentSeasonInfo.id, e.id);
                      }}
                      percentageCompleted={
                        watched.items.find(
                          (item) =>
                            item.item?.series?.seasonId ===
                              currentSeasonInfo.id &&
                            item.item?.series?.episodeId === e.id
                        )?.percentage
                      }
                    >
                      {t("videoPlayer.popouts.episode", {
                        index: e.number,
                        title: e.title,
                      })}
                    </PopoutListEntry>
                  ))
                : "No episodes"}
            </div>
          )}
        </FloatingCardView.Content>
      </FloatingView>
    </>
  );
}
