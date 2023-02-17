import { createContext } from 'react';
import { initialState } from '@/utils/hooks/data/usePlayerStore';
import type WsPlayer from '@/utils/players/wsPlayer';
import type FlvPlayer from '@/utils/players/flvPlayer';
import type { Dispatch } from 'react';
import type { PlayerProps, VideoEleAttributes } from '@/index.d';
import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';

export interface PlayerContextType extends PlayerProps {
    uuid: string;
    playerStore: PlayerStoreState;
    playerStoreDispatch: Dispatch<PlayerStoreState>;
    wsPlayer: WsPlayer;
    flvPlayer: FlvPlayer;
    videoEle: HTMLVideoElement | null;
    videoEleAttributes: VideoEleAttributes;
    videoContainerEle: HTMLDivElement | null;
}

export const playerContextDefaultValue: Partial<PlayerContextType> = {
    playerStore: initialState,
    videoEle: null,
    videoContainerEle: null,
    controlsOpts: {
        fullscreen: true,
        recording: false,
        screenshot: true,
    },
};

export const PlayerContext = createContext<PlayerContextType>(<PlayerContextType>playerContextDefaultValue);
