import { useMemo } from 'react';
import { isNumber } from 'ahooks/es/utils';
import type { PlayerMethods, VideoEleAttributes, VideoType } from '@/index.d';
import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';
import type { WsPlayer } from '@/utils/players';
import type { FlvPlayer } from '@/utils/players';

const usePlayerMethods = (
    store: PlayerStoreState,
    dispatch: (action: Partial<PlayerStoreState>) => void,
    attributes: VideoEleAttributes,
    wsPlayer: WsPlayer,
    flvPlayer: FlvPlayer,
) => {
    const { url = '', videoType, canplay } = store;
    const { currentTime } = attributes;

    const play = () => {
        if (videoType === 'record') {
            if (canplay) return flvPlayer.play();
            flvPlayer.stop();
            flvPlayer.start(url);
            return;
        }

        if (canplay) return wsPlayer.play();
        wsPlayer.stop();
        wsPlayer.start(url);
    };

    const pause = () => {
        if (videoType === 'record') {
            if (canplay) return flvPlayer.pause();
            return flvPlayer.stop();
        }

        if (canplay) return wsPlayer.pause();
        return wsPlayer.stop();
    };

    const reload = () => {
        if (videoType === 'record') {
            if (canplay && isNumber(currentTime)) {
                return flvPlayer.reload(currentTime);
            }
            flvPlayer.stop();
            flvPlayer.start(url);
            return;
        }

        if (canplay && isNumber(currentTime)) {
            return wsPlayer.reload();
        }

        wsPlayer.stop();
        wsPlayer.start(url);
    };

    const setPlayProgress = (progress: number) => {
        if (videoType === 'record') {
            flvPlayer.seek(progress);
        }
    };

    const setVideoSrc = (src: string, videoType?: VideoType) => {
        const isLive = /^ws:\/\/|^wss:\/\//.test(url);
        return dispatch({
            url,
            videoType: videoType ?? (isLive ? 'live' : 'record'),
        });
    };

    return useMemo<PlayerMethods>(
        () => ({
            play,
            pause,
            reload,
            setPlayProgress,
            setVideoSrc,
        }),
        [
            url,
            videoType,
            canplay,
            currentTime,
        ],
    );
};

export default usePlayerMethods;
