import { useMandatoryUpdate } from '@/utils/hooks';
import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useSize } from 'ahooks';

const Listener = () => {
    const forceUpdate = useMandatoryUpdate();
    const { videoEle, playerStoreDispatch } = useContext(PlayerContext);

    const videoEleSize = useSize(videoEle);

    const resizingTimeoutRef = useRef<NodeJS.Timeout>();
    const videoListenerIntervalRef = useRef<NodeJS.Timer>();

    const canPlayHandler = () => {
        if (!videoEle) return;

        playerStoreDispatch({
            totalTime: videoEle.duration,
            videoWidth: videoEle.videoWidth,
            videoHeight: videoEle.videoHeight,
        });
    };

    const progressHandler = () => {
        if (!videoEle) return;

        if (videoEle.buffered.length >= 1) {
            playerStoreDispatch({
                bufferedTime: videoEle.buffered.end(0),
            });
        }
    };

    const playOrPauseHandler = () => {
        if (!videoEle) return;

        playerStoreDispatch({
            playing: !videoEle.paused,
        });
    };

    const endedHandler = () => {
        if (!videoEle) return;

        playerStoreDispatch({
            ended: videoEle.ended,
        });
    };

    const waitingHandler = () => {
        playerStoreDispatch({
            buffering: true,
        });
    };

    const playingHandler = () => {
        playerStoreDispatch({
            buffering: false,
        });
    };

    // listen videoEle event
    useEffect(
        () => {
            if (!videoEle) return forceUpdate();

            videoEle.addEventListener('canplay', canPlayHandler);
            videoEle.addEventListener('progress', progressHandler);
            videoEle.addEventListener('play', playOrPauseHandler);
            videoEle.addEventListener('pause', playOrPauseHandler);
            videoEle.addEventListener('timeupdate', playOrPauseHandler);
            videoEle.addEventListener('ended', endedHandler);
            videoEle.addEventListener('waiting', waitingHandler);
            videoEle.addEventListener('playing', playingHandler);

            videoListenerIntervalRef.current && clearInterval(videoListenerIntervalRef.current);
            videoListenerIntervalRef.current = setInterval(
                () => {
                    forceUpdate();

                    playerStoreDispatch({
                        currentTime: videoEle.currentTime,
                        totalTime: videoEle.duration,
                        playing: !videoEle.paused,
                        ended: videoEle.ended,
                        networkState: videoEle.networkState,
                        readyState: videoEle.readyState,
                        videoWidth: videoEle.videoWidth,
                        videoHeight: videoEle.videoHeight,
                    });
                },
                1,
            );

            return () => {
                videoEle.removeEventListener('canplay', canPlayHandler);
                videoEle.removeEventListener('progress', progressHandler);
                videoEle.removeEventListener('play', playOrPauseHandler);
                videoEle.removeEventListener('pause', playOrPauseHandler);
                videoEle.removeEventListener('timeupdate', playOrPauseHandler);
                videoEle.removeEventListener('ended', endedHandler);
                videoEle.removeEventListener('waiting', waitingHandler);
                videoEle.removeEventListener('playing', playingHandler);
                videoListenerIntervalRef.current && clearInterval(videoListenerIntervalRef.current);
            };
        },
        [videoEle],
    );

    // listen videoEle size change
    useEffect(
        () => {
            playerStoreDispatch({
                resizing: true,
            });

            resizingTimeoutRef.current && clearTimeout(resizingTimeoutRef.current);
            resizingTimeoutRef.current = setTimeout(
                () => playerStoreDispatch({
                    resizing: false,
                }),
                250,
            );

            return () => {
                resizingTimeoutRef.current && clearTimeout(resizingTimeoutRef.current);
            };
        },
        [videoEleSize],
    );

    return null;
};

export default Listener;
