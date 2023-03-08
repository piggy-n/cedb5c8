import { createContext } from 'react';
import { initialState } from '@/utils/hooks/data/useRndPlayerStore';
import type { Dispatch } from 'react';
import type { RndPlayerProps } from '@/index.d';
import type { RndPlayerStoreState } from '@/utils/hooks/data/useRndPlayerStore';

export interface RndPlayerContextType extends RndPlayerProps {
    rndEle: any;
    rndPlayerStore: RndPlayerStoreState;
    rndPlayerStoreDispatch: Dispatch<Partial<RndPlayerStoreState>>;
}

export const rndPlayerContextDefaultValue: Partial<RndPlayerContextType> = {
    rndPlayerStore: initialState,
};

export const RndPlayerContext = createContext<RndPlayerContextType>(<RndPlayerContextType>rndPlayerContextDefaultValue);
