import { forwardRef, useContext, useEffect } from 'react';
import defaultPoster from '@/assets/images/snap.png';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import type { ForwardRefRenderFunction } from 'react';
import { obtainDeviceStream } from '@/services/device';

const VanillaVideo: ForwardRefRenderFunction<HTMLVideoElement | null> = (
    _,
    videoEleRef
) => {
    const { url, videoEleOpts } = useContext(PlayerContext);

    useEffect(() => {
        obtainDeviceStream({ id: '1622468092196032514' }).then(res => {
            console.log(res);
        });
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

