import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const useControlsPlayButtonVisible = () => {
    const {
        playerStore: {
            loading,
            videoLoadFailedVal,
        },
        videoEleAttributes: {
            ended,
            playing,
        },
    } = useContext(PlayerContext);
    const { controlsStoreDispatch } = useContext(ControlsContext);

    const visibleTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(
        () => {
            const isPlaying = playing && !ended;
            const isPaused = !playing && !ended && !loading && !videoLoadFailedVal;

            visibleTimeoutRef.current && clearTimeout(visibleTimeoutRef.current);

            if (isPlaying || loading) {
                controlsStoreDispatch({
                    showPlayBtn: false,
                });
            }

            if (isPaused) {
                visibleTimeoutRef.current = setTimeout(
                    () => controlsStoreDispatch({
                        showPlayBtn: true,
                    }),
                    100,
                );
            }

            return () => {
                visibleTimeoutRef.current && clearTimeout(visibleTimeoutRef.current);
            };
        },
        [
            playing,
            ended,
            loading,
        ],
    );
};

export default useControlsPlayButtonVisible;