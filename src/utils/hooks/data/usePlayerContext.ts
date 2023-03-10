import { createContext } from 'react';
import { initialState } from '@/utils/hooks/data/usePlayerStore';
import type { Dispatch } from 'react';
import type { PlayerProps } from '@/index.d';
import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';

export interface PlayerContextType extends PlayerProps {
    uuid: string;
    playerStore: PlayerStoreState;
    playerStoreDispatch: Dispatch<Partial<PlayerStoreState>>;
    videoEle: HTMLVideoElement | null;
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
