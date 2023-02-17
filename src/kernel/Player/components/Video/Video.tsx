import { forwardRef, useContext } from 'react';
import defaultPoster from '@/assets/images/snap.png';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import type { ForwardRefRenderFunction } from 'react';
import { obtainDeviceStream } from '@/utils/methods/async/device';
import { useAsyncEffect } from 'ahooks';

const VanillaVideo: ForwardRefRenderFunction<HTMLVideoElement | null> = (
    _,
    videoEleRef
) => {
    const { url, videoEleOpts } = useContext(PlayerContext);
    // 1622468092196032514
    useAsyncEffect(async () => {
        const aa = await obtainDeviceStream({ deviceId: '1622468092196032514',urlPrefix:'wss://lzz' });
        console.log(aa);
    }, []);

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

