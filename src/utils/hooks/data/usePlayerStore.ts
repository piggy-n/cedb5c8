import { useReducer } from 'react';

/**
 * @description PlayerStoreState
 * @param {boolean} buffering - 视频是否在缓冲中
 * @param {boolean} isFullScreen - 播放器是否全屏
 * @param {boolean} isError - 视频是否出错
 * @param {boolean} isLive - 视频是否为直播
 * @param {boolean} loading - 视频是否在加载中
 * @param {string} mime - 视频mime类型
 * @param {boolean} resizing - video元素大小是否正在调整
 * @param {boolean} showControls - 是否显示控制栏
 * @param {number} transmissionRate - 视频传输速率
 * @param {string} url - 视频url
 */
export interface PlayerStoreState {
    buffering?: boolean;
    isFullscreen?: boolean;
    isError?: boolean;
    isLive?: boolean;
    loading?: boolean;
    mime?: string;
    resizing?: boolean;
    showControls?: boolean;
    transmissionRate?: number;
    url?: string;
}

export const initialState: PlayerStoreState = {};

export const usePlayerStore = () => {
    const reducer = (
        state: PlayerStoreState,
        payload: Partial<PlayerStoreState>
    ) => ({ ...state, ...payload });

    const [playerStore, playerStoreDispatch] = useReducer(reducer, initialState);

    return [playerStore, playerStoreDispatch] as const;
};
