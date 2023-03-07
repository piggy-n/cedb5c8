import { useReducer } from 'react';
import type { Position } from 'react-rnd';

export interface RndPlayerStoreState {
    position?: Position;
    disableDragging?: boolean;
    minWidth?: number | string;
    minHeight?: number | string;
}

export const initialState: RndPlayerStoreState = {
    disableDragging: true,
};

const useRndPlayerStore = () => {
    const reducer = (
        state: RndPlayerStoreState,
        payload: Partial<RndPlayerStoreState>,
    ) => ({ ...state, ...payload });

    const [rndPlayerStore, rndPlayerStoreDispatch] = useReducer(reducer, initialState);

    return [rndPlayerStore, rndPlayerStoreDispatch] as const;
};

export default useRndPlayerStore;
