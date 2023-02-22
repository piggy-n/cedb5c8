import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useSize } from 'ahooks';

const useVideoResizing = () => {
    const {
        videoEle,
        playerStoreDispatch,
    } = useContext(PlayerContext);

    const resizingTimeoutRef = useRef<NodeJS.Timeout>();
    const videoEleSize = useSize(videoEle);

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
};

export default useVideoResizing;
