import { useReducer } from 'react';
import type { VideoType } from '@/index.d';

/**
 * @description PlayerStoreState
 * @param {boolean} canplay - 视频是否可以播放
 * @param {boolean} isFullScreen - 播放器是否全屏
 * @param {boolean} isError - 视频是否出错
 * @param {VideoType} videoType - 视频类型
 * @param {boolean} loading - 视频是否在加载中
 * @param {string} mime - 视频mime类型
 * @param {boolean} resizing - video元素大小是否正在调整
 * @param {number} transmissionRate - 视频传输速率
 * @param {string} url - 视频url
 * @param {number} videoLoadErrorVal - 视频加载错误值，用于触发回调
 * @param {number} videoLoadFailedVal - 视频加载失败值，用于触发回调
 * @param {number} progressMouseDownVal - 进度条鼠标按下值，用于触发回调
 * @param {number} progressMouseUpVal - 进度条鼠标抬起值，用于触发回调
 */
export interface PlayerStoreState {
    canplay?: boolean;
    isFullscreen?: boolean;
    isError?: boolean;
    videoType?: VideoType;
    loading?: boolean;
    mime?: string;
    resizing?: boolean;
    transmissionRate?: number;
    url?: string;
    videoCanplayVal?: number;
    videoLoadErrorVal?: number;
    videoLoadFailedVal?: number;
    progressMouseDownVal?: number;
    progressMouseUpVal?: number;
}

export const initialState: PlayerStoreState = {};

const usePlayerStore = () => {
    const reducer = (
        state: PlayerStoreState,
        payload: Partial<PlayerStoreState>,
    ) => ({ ...state, ...payload });

    const [playerStore, playerStoreDispatch] = useReducer(reducer, initialState);

    return [playerStore, playerStoreDispatch] as const;
};

export default usePlayerStore;
