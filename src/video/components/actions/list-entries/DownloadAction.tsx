import { Icons } from "@/components/Icon";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useSource } from "@/video/state/logic/source";
import { MWStreamType } from "@/backend/helpers/streams";
import { normalizeTitle } from "@/utils/normalizeTitle";
import { useTranslation } from "react-i18next";
import { useMeta } from "@/video/state/logic/meta";
import { PopoutListAction } from "../../popouts/PopoutUtils";

export function DownloadAction() {
  const descriptor = useVideoPlayerDescriptor();
  const sourceInterface = useSource(descriptor);
  const { t } = useTranslation();
  const meta = useMeta(descriptor);

  const isHLS = sourceInterface.source?.type === MWStreamType.HLS;

  if (isHLS) return null;

  const title = meta?.meta.meta.title;

  return (
    <PopoutListAction
      href={isHLS ? undefined : sourceInterface.source?.url}
      download={title ? `${normalizeTitle(title)}.mp4` : undefined}
      icon={Icons.DOWNLOAD}
    >
      {t("videoPlayer.buttons.download")}
    </PopoutListAction>
  );
}
