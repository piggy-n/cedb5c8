import { forwardRef, useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import defaultPoster from '@/assets/images/snap.png';
import type { ForwardRefRenderFunction } from 'react';

const VanillaVideo: ForwardRefRenderFunction<HTMLVideoElement> = (
    _,
    ref,
) => {
    const { videoEleOpts } = useContext(PlayerContext);

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

export const Video = forwardRef<HTMLVideoElement>(VanillaVideo);

