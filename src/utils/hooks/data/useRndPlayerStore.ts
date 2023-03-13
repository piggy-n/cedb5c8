import { useReducer } from 'react';
import type { Position } from 'react-rnd';
import type { ItemProps } from '@/kernel/RndPlayer/Content/Players/Item';
import type { SelectorItem } from '@/utils/methods/async/device';

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
    deviceTypeCode: string, // 2 云台 4 相机
    serviceObj: Record<'stream' | 'ptz' | 'videoRecord', boolean>
    streamSelectorList: SelectorItem[],
    cameraSelectorList: SelectorItem[],
    selectedStreamList: string[],
    selectedCameraItem: string,
}

export const initialState: RndPlayerStoreState = {
    disableDragging: true,
    players: [
        { url: '', isMainPlayer: true },
        { url: '', isMainPlayer: false },
    ],
    mode: 'sg',
    deviceTypeCode: '',
    serviceObj: {
        stream: false,
        ptz: false,
        videoRecord: false,
    },
    streamSelectorList: [],
    cameraSelectorList: [],
    selectedStreamList: [],
    selectedCameraItem: '',
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
