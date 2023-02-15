import { forwardRef, useContext } from 'react';
import defaultPoster from '@/assets/images/snap.png';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import type { ForwardRefRenderFunction } from 'react';

const VanillaVideo: ForwardRefRenderFunction<HTMLVideoElement | null> = (
    _,
    videoEleRef
) => {
    const { url, videoEleOpts } = useContext(PlayerContext);

    return (
        url
            ? <video
                ref={videoEleRef}
                muted
                autoPlay
                poster={defaultPoster}
                crossOrigin={'anonymous'}
                {...videoEleOpts}
            />
            : null
    );
};

export const Video = forwardRef<HTMLVideoElement | null>(VanillaVideo);
