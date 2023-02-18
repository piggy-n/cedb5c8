import { useEffect } from 'react';
import { WsPlayer, FlvPlayer } from '@/utils/players';
import type { Dispatch } from 'react';
import type { VideoType } from '@/index.d';
import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';

const useVideoPlayer = (
    ele: HTMLVideoElement | null,
    url: string,
    videoType: VideoType,
    dispatch: Dispatch<PlayerStoreState>,
    wsPlayer: WsPlayer,
    flvPlayer: FlvPlayer,
) => {
    useEffect(
        () => {
            if (!ele) return;
        },
        [
            ele,
            url,
            videoType,
        ]
    );
};

export default useVideoPlayer;
