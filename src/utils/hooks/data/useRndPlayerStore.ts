import { useReducer } from 'react';
import type { Position } from 'react-rnd';
import type { ItemProps } from '@/kernel/RndPlayer/Content/Players/Item';

type InitialSize = {
    minWidth: number;
    minHeight: number;
}

export interface RndPlayerStoreState {
    position?: Position;
    minWidth?: number;
    minHeight?: number;
    initialSize?: InitialSize;
    disableDragging?: boolean;
    players: ItemProps[];
}

export const initialState: RndPlayerStoreState = {
    disableDragging: true,
    players: [],
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
