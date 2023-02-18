import { useLatest } from 'ahooks';
import { useMandatoryUpdate } from '@/utils/hooks';
import { useEffect, useMemo, useRef } from 'react';
import type { VideoEleAttributes } from '@/index.d';

const useVideoListener = (ele: HTMLVideoElement | null) => {
    const forceUpdate = useMandatoryUpdate();
    const videoEleRef = useLatest(ele);
    const videoEle = videoEleRef.current;

    const videoListenerIntervalRef = useRef<NodeJS.Timer | null>(null);
    const videoEleAttributesRef = useRef<VideoEleAttributes>({
        playing: false,
        buffering: false,
        currentTime: 0,
        totalTime: 0,
        bufferedTime: 0,
        ended: false,
        error: null,
        networkState: 0,
        readyState: 0,
        videoSize: {
            videoWidth: 0,
            videoHeight: 0
        },
    });

    const setVideoEleAttributesHandler = <T extends Partial<VideoEleAttributes>>(val: T) => {
        videoEleAttributesRef.current = { ...videoEleAttributesRef.current, ...val };
    };

    const canPlayHandler = () => {
        if (!videoEle) return;

        setVideoEleAttributesHandler({
            totalTime: videoEle.duration,
            videoSize: {
                videoWidth: videoEle.videoWidth,
                videoHeight: videoEle.videoHeight
            },
        });
    };

    const progressHandler = () => {
        if (!videoEle) return;

        if (videoEle.buffered.length >= 1) {
            setVideoEleAttributesHandler({
                bufferedTime: videoEle.buffered.end(0),
            });
        }
    };

    const playOrPauseHandler = () => {
        if (!videoEle) return;

        setVideoEleAttributesHandler({
            playing: !videoEle.paused,
        });
    };

    const endedHandler = () => {
        if (!videoEle) return;

        setVideoEleAttributesHandler({
            ended: videoEle.ended,
        });
    };

    const errorHandler = () => {
        setVideoEleAttributesHandler({
            error: Date.now(),
        });
    };

    const waitingHandler = () => {
        setVideoEleAttributesHandler({
            buffering: true
        });
    };

    const playingHandler = () => {
        setVideoEleAttributesHandler({
            buffering: false
        });
    };

    useEffect(
        () => {
            if (!videoEle) return;
            console.log('useVideoListener: videoEle', videoEle);
            videoEle.addEventListener('canplay', canPlayHandler);
            videoEle.addEventListener('progress', progressHandler);
            videoEle.addEventListener('play', playOrPauseHandler);
            videoEle.addEventListener('pause', playOrPauseHandler);
            videoEle.addEventListener('timeupdate', playOrPauseHandler);
            videoEle.addEventListener('ended', endedHandler);
            videoEle.addEventListener('error', errorHandler);
            videoEle.addEventListener('waiting', waitingHandler);
            videoEle.addEventListener('playing', playingHandler);

            videoListenerIntervalRef.current && clearInterval(videoListenerIntervalRef.current);
            videoListenerIntervalRef.current = setInterval(
                () => {
                    forceUpdate();

                    setVideoEleAttributesHandler({
                        currentTime: videoEle.currentTime,
                        totalTime: videoEle.duration,
                        playing: !videoEle.paused,
                        ended: videoEle.ended,
                        networkState: videoEle.networkState,
                        readyState: videoEle.readyState,
                        videoSize: {
                            videoWidth: videoEle.videoWidth,
                            videoHeight: videoEle.videoHeight
                        },
                    });
                },
                1
            );

            return () => {
                videoEle.removeEventListener('canplay', canPlayHandler);
                videoEle.removeEventListener('progress', progressHandler);
                videoEle.removeEventListener('play', playOrPauseHandler);
                videoEle.removeEventListener('pause', playOrPauseHandler);
                videoEle.removeEventListener('timeupdate', playOrPauseHandler);
                videoEle.removeEventListener('ended', endedHandler);
                videoEle.removeEventListener('error', errorHandler);
                videoEle.removeEventListener('waiting', waitingHandler);
                videoEle.removeEventListener('playing', playingHandler);
                videoListenerIntervalRef.current && clearInterval(videoListenerIntervalRef.current);
            };
        },
        [videoEle]
    );

    return useMemo(
        () => videoEleAttributesRef.current,
        [videoEleAttributesRef.current]
    );
};

export default useVideoListener;

