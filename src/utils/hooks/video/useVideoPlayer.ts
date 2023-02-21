import { useEffect } from 'react';
import type { WsPlayer, FlvPlayer } from '@/utils/players';
import type { Dispatch } from 'react';
import type { VideoType } from '@/index.d';
import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';

const useVideoPlayer = (
    ele: HTMLVideoElement | null,
    url: string,
    videoType: VideoType,
    dispatch: Dispatch<Partial<PlayerStoreState>>,
    wsPlayer: WsPlayer,
    flvPlayer: FlvPlayer,
) => {
    useEffect(
        () => {
            if (!ele) return;
            // wsPlayer.init(ele);
            flvPlayer.init(ele);

            return () => {
                wsPlayer.destroy();
                flvPlayer.destroy();
            };
        },
        [ele]
    );

    useEffect(
        () => {
            flvPlayer.stop();
            flvPlayer.start(url);
        },
        [
            url,
            videoType,
        ]
    );
};

export default useVideoPlayer;
