import { useReducer } from 'react';
import type { Position } from 'react-rnd';
import type { ItemProps } from '@/kernel/RndPlayer/Content/Players/Item';

export interface RndPlayerStoreState {
    position?: Position;
    rndWidth?: number;
    rndHeight?: number;
    rndMinWidth?: number;
    rndMinHeight?: number;
    videoMinWidth?: number;
    videoMinHeight?: number;
    disableDragging?: boolean;
    players: ItemProps[];
    mode: 'sg' | 'db' | 'pip'; // 单宫 双宫 画中画
}

export const initialState: RndPlayerStoreState = {
    disableDragging: true,
    players: [],
    mode: 'sg',
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
