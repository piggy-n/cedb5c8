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
        },
        videoEleAttributes,
    } = useContext(PlayerContext);
    const {
        playing,
        ended,
        currentTime,
        networkState,
        readyState,
    } = videoEleAttributes;
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
};

export default useVideoCallback;
