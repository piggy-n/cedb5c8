import { forwardRef, useContext } from 'react';
import { useVideoPlayer, useVideoUrlAndType } from '@/utils/hooks';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import defaultPoster from '@/assets/images/snap.png';
import type { ForwardRefRenderFunction } from 'react';

const VanillaVideo: ForwardRefRenderFunction<HTMLVideoElement | null> = (
    _,
    ref,
) => {
    const { videoEleOpts } = useContext(PlayerContext);

    useVideoUrlAndType(); // 设置 store 中的 url 和 videoType
    useVideoPlayer(); // 初始化/销毁播放器实例，开始/停止播放视频

    return (
        <video
            ref={ref}
            muted
            autoPlay
            poster={defaultPoster}
            crossOrigin={'anonymous'}
            {...videoEleOpts}
        />
    );
};

export const Video = forwardRef<HTMLVideoElement | null>(VanillaVideo);

