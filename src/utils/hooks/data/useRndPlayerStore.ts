import { useReducer } from 'react';
import type { Position } from 'react-rnd';

export interface RndPlayerStoreState {
    position?: Position;
    minWidth?: string;
    minHeight?: string;
}

export const initialState: RndPlayerStoreState = {};

const useRndPlayerStore = () => {
    const reducer = (
        state: RndPlayerStoreState,
        payload: Partial<RndPlayerStoreState>,
    ) => ({ ...state, ...payload });

    const [rndPlayerStore, rndPlayerStoreDispatch] = useReducer(reducer, initialState);

    return [rndPlayerStore, rndPlayerStoreDispatch] as const;
};

export default useRndPlayerStore;
