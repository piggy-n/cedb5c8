import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const useVideoLoading = () => {
    const {
        videoEle,
        playerStoreDispatch,
        videoEleAttributes: {
            buffering,
            playing,
            networkState,
            readyState,
        },
    } = useContext(PlayerContext);

    const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(
        () => {
            const inBuffer = playing && buffering;
            const inReady = !videoEle?.autoplay && readyState === 4;
            const inPlay = playing && [1, 2].includes(networkState) && [3, 4].includes(readyState);

            loadingTimeoutRef.current && clearTimeout(loadingTimeoutRef.current);

            if (inBuffer) {
                loadingTimeoutRef.current = setTimeout(
                    () => playerStoreDispatch({
                        loading: true,
                    }),
                    750,
                );
            }

            if (inPlay || inReady) {
                playerStoreDispatch({
                    loading: false,
                });
            }
        },
        [
            playing,
            buffering,
            networkState,
            readyState,
        ],
    );
};

export default useVideoLoading;
