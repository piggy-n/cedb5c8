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
    const { currentTime, totalTime } = attributes;

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
        if (videoType === 'record' && canplay) {
            const time = progress > totalTime ? totalTime : progress;
            flvPlayer.seek(time > 0 ? time : 0);
        }
    };

    const setVideoSrc = (src: string, type?: VideoType) => {
        const isLive = /^ws:\/\/|^wss:\/\//.test(src);
        return dispatch({
            url: src,
            videoType: type ?? (isLive ? 'live' : 'record'),
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
