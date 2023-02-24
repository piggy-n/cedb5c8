import { useMemo } from 'react';

/**
 * SD：标准清晰度（分辨率小于720p）
 * HD：高清晰度（分辨率介于720p和1080p之间）
 * FHD：全高清晰度（分辨率介于1080p和4K之间）
 * UHD：超高清晰度（分辨率介于4K和8K之间）
 * 8K：超高清晰度（分辨率大于等于8K）
 * @param videoWidth
 * @param videoHeight
 */
const useVideoResolution = (videoWidth: number, videoHeight: number) => useMemo(
    () => {
        const resolution = videoWidth * videoHeight;

        if (resolution === 0) {
            return '';
        } else if (resolution < 1280 * 720) {
            return 'SD';
        } else if (resolution < 1920 * 1080) {
            return 'HD';
        } else if (resolution < 3840 * 2160) {
            return 'FHD';
        } else if (resolution < 7680 * 4320) {
            return 'UHD';
        } else {
            return '8K';
        }
    },
    [
        videoWidth,
        videoHeight,
    ],
);

export default useVideoResolution;
