import { forwardRef, useContext } from 'react';
import { useVideoPlayer, useVideoUrl } from '@/utils/hooks';
import defaultPoster from '@/assets/images/snap.png';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import type { ForwardRefRenderFunction } from 'react';

const VanillaVideo: ForwardRefRenderFunction<HTMLVideoElement | null> = (
    _,
    ref
) => {
    const { videoEleOpts } = useContext(PlayerContext);

    useVideoUrl();

    useVideoPlayer();

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

