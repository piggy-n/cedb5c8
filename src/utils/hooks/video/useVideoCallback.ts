import { useContext, useEffect } from 'react';
import { useDebounceEffect } from 'ahooks';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import type { VideoCallback } from '@/index.d';

const useVideoCallback = (callback: Partial<VideoCallback>) => {
    const {
        playerStore: {
            videoCanplayVal,
            videoLoadErrorVal,
            videoLoadFailedVal,
            progressMouseDownVal,
            progressMouseUpVal,
            playing,
            ended,
            currentTime,
            networkState,
            readyState,
        },
        // videoEleAttributes,
    } = useContext(PlayerContext);

    const {
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
    } = callback;

    useEffect(
        () => {
            if (playing) {
                onPlay && onPlay();
            } else {
                onPause && onPause();
            }
        },
        [playing],
    );

    useEffect(
        () => {
            if (ended) {
                onEnded && onEnded();
            }
        },
        [ended],
    );

    useEffect(
        () => {
            if (videoCanplayVal) {
                onCanplay && onCanplay();
            }
        },
        [videoCanplayVal],
    );

    useEffect(
        () => {
            if (currentTime) {
                onTimeUpdate && onTimeUpdate();
            }
        },
        [currentTime],
    );

    useEffect(
        () => {
            onVideoStateChange && onVideoStateChange();
        },
        [
            networkState,
            readyState,
        ],
    );

    useEffect(
        () => {
            if (progressMouseDownVal) {
                onProgressMouseDown && onProgressMouseDown();
            }
        },
        [progressMouseDownVal],
    );

    useDebounceEffect(
        () => {
            if (progressMouseUpVal) {
                onProgressMouseUp && onProgressMouseUp();
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
                onVideoLoadError && onVideoLoadError();
            }
        },
        [videoLoadErrorVal],
    );

    useEffect(
        () => {
            if (videoLoadFailedVal) {
                onVideoLoadFailed && onVideoLoadFailed();
            }
        },
        [videoLoadFailedVal],
    );
};

export default useVideoCallback;
