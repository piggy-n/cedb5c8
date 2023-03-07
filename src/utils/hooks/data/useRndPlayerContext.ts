import { createContext } from 'react';
import { initialState } from '@/utils/hooks/data/useRndPlayerStore';
import type { Dispatch } from 'react';
import type { RndPlayerProps } from '@/index.d';
import type { RndPlayerStoreState } from '@/utils/hooks/data/useRndPlayerStore';

export interface RndPlayerContextType extends RndPlayerProps {
    rndPlayerStore: RndPlayerStoreState;
    rndPlayerStoreDispatch: Dispatch<Partial<RndPlayerStoreState>>;
    rndPlayerContainerEle: HTMLDivElement | null;
}

export const rndPlayerContextDefaultValue: Partial<RndPlayerContextType> = {
    rndPlayerStore: initialState,
    rndPlayerContainerEle: null,
};

export const RndPlayerContext = createContext<RndPlayerContextType>(<RndPlayerContextType>rndPlayerContextDefaultValue);
