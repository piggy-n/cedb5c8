import { useReducer } from 'react';

/**
 * @description ProgressStoreState
 * @param {number} position - 进度条位置
 * @param {number} percentage - 进度条百分比
 * @param {boolean} suspending - 是否暂停
 * @param {boolean} dragging - 是否拖拽进度条
 * @param {boolean} mouseIsMoving - 鼠标是否移动
 * @param {boolean} mouseIsOnControls - 鼠标是否在控制栏上
 * @param {boolean} showControls - 是否显示控制栏
 * @param {boolean} showPlayBtn - 是否显示播放按钮
 */
export interface ControlsStoreState {
    position: number;
    percentage: number;
    suspending: boolean;
    dragging: boolean;
    mouseIsMoving: boolean;
    mouseIsOnControls: boolean;
    showControls: boolean;
    showPlayBtn: boolean;
}

export const initialState: ControlsStoreState = {
    position: 0,
    percentage: 0,
    suspending: false,
    dragging: false,
    mouseIsMoving: false,
    mouseIsOnControls: false,
    showControls: false,
    showPlayBtn: false,
};

const useControlsStore = () => {
    const reducer = (
        state: ControlsStoreState,
        payload: Partial<ControlsStoreState>,
    ) => ({ ...state, ...payload });

    const [controlsStore, controlsStoreDispatch] = useReducer(reducer, initialState);

    return [controlsStore, controlsStoreDispatch] as const;
};

export default useControlsStore;
