import { createContext } from 'react';
import { initialState } from '@/utils/hooks/usePlayerStore';
import WsPlayer from '@/utils/players/wsPlayer';
import FlvPlayer from '@/utils/players/flvPlayer';
import type { Dispatch } from 'react';
import type { PlayerProps } from '@/index.d';
// import type { UseVideo } from '@/utils/hooks/useVideo';
import type { PlayerStoreState } from '@/utils/hooks/usePlayerStore';

export interface PlayerContextType extends PlayerProps {
    uuid: string;
    playerStore: PlayerStoreState;
    playerStoreDispatch: Dispatch<PlayerStoreState>;
    wsPlayer: WsPlayer;
    flvPlayer: FlvPlayer;
    // videoProperties: UseVideo;
    videoEle: HTMLVideoElement | null;
    videoContainerEle: HTMLDivElement | null;
}

export const playerContextDefaultValue: Partial<PlayerContextType> = {
    playerStore: initialState,
    videoEle: null,
    videoContainerEle: null,
    controllable: true,
    fullscreen: true,
    screenshot: true,
};

export const PlayerContext = createContext<PlayerContextType>(<PlayerContextType>playerContextDefaultValue);
