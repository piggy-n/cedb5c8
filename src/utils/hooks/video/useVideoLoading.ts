import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';
import type { Dispatch } from 'react';
import { useEffect, useRef } from 'react';

const useVideoLoading = (
    ele: HTMLVideoElement | null,
    dispatch: Dispatch<PlayerStoreState>,
    buffering: boolean,
    playing: boolean,
    networkState: number,
    readyState: number,
) => {
    const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(
        () => {
            const inBuffer = playing && buffering;
            const inReady = !ele?.autoplay && readyState === 4;
            const inPlay = playing && [1, 2].includes(networkState) && [3, 4].includes(readyState);

            loadingTimeoutRef.current && clearTimeout(loadingTimeoutRef.current);

            if (inBuffer) {
                loadingTimeoutRef.current = setTimeout(
                    () => dispatch({
                        loading: true
                    }),
                    750
                );
            }

            if (inPlay || inReady) {
                dispatch({
                    loading: false
                });
            }
        },
        [
            playing,
            buffering,
            networkState,
            readyState
        ]
    );
};

export default useVideoLoading;
