import { forwardRef, useContext } from 'react';
import { useVideoPlayer, useVideoUrl } from '@/utils/hooks';
import defaultPoster from '@/assets/images/snap.png';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import type { ForwardRefRenderFunction } from 'react';

const VanillaVideo: ForwardRefRenderFunction<HTMLVideoElement | null> = (
    _,
    ref
) => {
    const {
        videoEle,
        deviceOpts,
        videoEleOpts,
        wsPlayer,
        flvPlayer,
        playerStoreDispatch,
        url: propsUrl, // url from props
        videoType: propsVideoType, // videoType from props
        playerStore: {
            url: storeUrl = '', // url from store
            videoType: storeVideoType = 'live', // videoType from store
        },
    } = useContext(PlayerContext);

    useVideoUrl(
        playerStoreDispatch,
        propsUrl,
        propsVideoType,
        deviceOpts
    );

    useVideoPlayer(
        videoEle,
        storeUrl,
        storeVideoType,
        playerStoreDispatch,
        wsPlayer,
        flvPlayer
    );

    return (
        <video
            ref={ref}
            muted
            autoPlay
            poster={storeUrl ? defaultPoster : undefined}
            crossOrigin={'anonymous'}
            {...videoEleOpts}
        />
    );
};

export const Video = forwardRef<HTMLVideoElement | null>(VanillaVideo);

