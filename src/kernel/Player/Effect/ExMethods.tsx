import { useContext, useEffect } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { isNumber } from 'ahooks/es/utils';
import type { VideoType } from '@/index.d';

const ExMethods = () => {
    const {
        wsPlayer,
        flvPlayer,
        playerStoreDispatch,
        playerStore: {
            url = '',
            videoType,
            canplay,
            currentTime,
            totalTime,
        },
    } = useContext(PlayerContext);

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
            let time = progress;
            if (time < 0) time = 0;
            if (time > totalTime) time = totalTime;
            return flvPlayer.seek(time);
        }
    };

    const setVideoSrc = (src: string, type?: VideoType) => {
        const isLive = /^ws:\/\/|^wss:\/\//.test(src);
        return playerStoreDispatch({
            url: src,
            videoType: type ?? (isLive ? 'live' : 'record'),
        });
    };

    useEffect(
        () => {
            playerStoreDispatch({
                playerMethods: {
                    play,
                    pause,
                    reload,
                    setPlayProgress,
                    setVideoSrc,
                },
            });
        },
        [
            url,
            videoType,
            canplay,
            currentTime,
        ],
    );

    return null;
};

export default ExMethods;
