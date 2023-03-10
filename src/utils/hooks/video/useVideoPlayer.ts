import { useContext, useEffect } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const useVideoPlayer = () => {
    const {
        playerStore: {
            url = '',
            videoType = 'live',
            wsPlayer,
            flvPlayer,
        },
    } = useContext(PlayerContext);

    // useEffect(
    //     () => {
    //         if (!videoEle) return;
    //         wsPlayer.init(videoEle);
    //         flvPlayer.init(videoEle);
    //
    //         return () => {
    //             wsPlayer.destroy();
    //             flvPlayer.destroy();
    //         };
    //     },
    //     [videoEle],
    // );

    useEffect(
        () => {
            if (!wsPlayer || !flvPlayer) return;

            wsPlayer.stop();
            flvPlayer.stop();
            videoType === 'record' ? flvPlayer.start(url) : wsPlayer.start(url);
        },
        [
            url,
            videoType,
        ],
    );
};

export default useVideoPlayer;
