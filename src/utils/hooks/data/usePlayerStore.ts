import { useReducer } from 'react';
import type { VideoType } from '@/index.d';

/**
 * @description PlayerStoreState
 * @param {boolean} buffering - 视频是否在缓冲中
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
 */
export interface PlayerStoreState {
    buffering?: boolean;
    isFullscreen?: boolean;
    isError?: boolean;
    videoType?: VideoType;
    loading?: boolean;
    mime?: string;
    resizing?: boolean;
    transmissionRate?: number;
    url?: string;
    videoLoadErrorVal?: number;
    videoLoadFailedVal?: number;
}

export const initialState: PlayerStoreState = {};

const usePlayerStore = () => {
    const reducer = (
        state: PlayerStoreState,
        payload: Partial<PlayerStoreState>
    ) => ({ ...state, ...payload });

    const [playerStore, playerStoreDispatch] = useReducer(reducer, initialState);

    return [playerStore, playerStoreDispatch] as const;
};

export default usePlayerStore;
