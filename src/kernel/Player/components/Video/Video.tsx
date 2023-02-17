import { forwardRef, useContext } from 'react';
import { useVideoUrl } from '@/utils/hooks';
import defaultPoster from '@/assets/images/snap.png';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import type { ForwardRefRenderFunction } from 'react';

const VanillaVideo: ForwardRefRenderFunction<HTMLVideoElement | null> = (
    _,
    videoEleRef
) => {
    const {
        deviceOpts,
        videoEleOpts,
        url: propsUrl, // url from props
        videoType: propsVideoType, // videoType from props
        playerStore: {
            url: storeUrl, // url from store
            // videoType: storeVideoType, // videoType from store
        },
        playerStoreDispatch,
    } = useContext(PlayerContext);

    useVideoUrl(
        playerStoreDispatch,
        propsUrl,
        propsVideoType,
        deviceOpts
    );

    return (
        storeUrl
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

