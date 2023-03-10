import { useContext, useEffect } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useDebounceEffect } from 'ahooks';
import type { VideoEleAttributes } from '@/index.d';

const Callback = () => {
    const {
        playerStore: {
            videoCanplayVal,
            videoLoadErrorVal,
            videoLoadFailedVal,
            progressMouseDownVal,
            progressMouseUpVal,
            playing,
            buffering,
            ended,
            canplay,
            resizing,
            currentTime,
            totalTime,
            bufferedTime,
            networkState,
            readyState,
            videoWidth,
            videoHeight,
        },
        onPlay,
        onPause,
        onEnded,
        onCanplay,
        onTimeUpdate,
        onProgressMouseDown,
        onProgressMouseUp,
        onVideoStateChange,
        onVideoLoadError,
        onVideoLoadFailed,
    } = useContext(PlayerContext);

    const videoEleAttributes: VideoEleAttributes = {
        playing,
        buffering,
        ended,
        canplay,
        resizing,
        currentTime,
        totalTime,
        bufferedTime,
        networkState,
        readyState,
        videoWidth,
        videoHeight,
    };

    useEffect(
        () => {
            if (playing) {
                onPlay && onPlay(videoEleAttributes);
            } else {
                onPause && onPause(videoEleAttributes);
            }
        },
        [playing],
    );

    useEffect(
        () => {
            if (ended) {
                onEnded && onEnded(videoEleAttributes);
            }
        },
        [ended],
    );

    useEffect(
        () => {
            if (videoCanplayVal) {
                onCanplay && onCanplay(videoEleAttributes);
            }
        },
        [videoCanplayVal],
    );

    useEffect(
        () => {
            if (currentTime) {
                onTimeUpdate && onTimeUpdate(videoEleAttributes);
            }
        },
        [currentTime],
    );

    useEffect(
        () => {
            onVideoStateChange && onVideoStateChange(videoEleAttributes);
        },
        [
            networkState,
            readyState,
        ],
    );

    useEffect(
        () => {
            if (progressMouseDownVal) {
                onProgressMouseDown && onProgressMouseDown(videoEleAttributes);
            }
        },
        [progressMouseDownVal],
    );

    useDebounceEffect(
        () => {
            if (progressMouseUpVal) {
                onProgressMouseUp && onProgressMouseUp(videoEleAttributes);
            }
        },
        [progressMouseUpVal],
        {
            wait: 100,
        },
    );

    useEffect(
        () => {
            if (videoLoadErrorVal) {
                onVideoLoadError && onVideoLoadError(videoEleAttributes);
            }
        },
        [videoLoadErrorVal],
    );

    useEffect(
        () => {
            if (videoLoadFailedVal) {
                onVideoLoadFailed && onVideoLoadFailed(videoEleAttributes);
            }
        },
        [videoLoadFailedVal],
    );

    return null;
};

export default Callback;
