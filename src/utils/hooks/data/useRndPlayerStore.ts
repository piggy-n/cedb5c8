import { useReducer } from 'react';
import type { FC } from 'react';
import type { Position } from 'react-rnd';
import type { ItemProps } from '@/kernel/RndPlayer/Content/Players/Item';

export interface PlayerItem extends ItemProps {
    id: string;
    render: FC<ItemProps>;
}

export interface RndPlayerStoreState {
    position?: Position;
    disableDragging?: boolean;
    minWidth?: number;
    minHeight?: number;
    players: PlayerItem[];
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
