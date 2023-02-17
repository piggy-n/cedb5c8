import { forwardRef, useRef, useState } from 'react';
import s from './styles/player.scss';
import c from 'classnames';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';
import { randomString } from '@/utils/methods/randomString';
import FlvPlayer from '@/utils/players/flvPlayer';
import WsPlayer from '@/utils/players/wsPlayer';
import { PlayerContext, playerContextDefaultValue } from '@/utils/hooks/data/usePlayerContext';
import { usePlayerStore, useVideoListener } from '@/utils/hooks';
import Video from '@/kernel/Player/components/Video';

const VanillaPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        videoContainerEleOpts,
        ...rest
    },
    ref
) => {
    const [uuid] = useState(randomString());
    const [store, dispatch] = usePlayerStore();

    const videoEleRef = useRef<HTMLVideoElement | null>(null);
    const videoContainerEleRef = useRef<HTMLDivElement | null>(null);

    const videoEleAttributes = useVideoListener(videoEleRef.current);

    return (
        <PlayerContext.Provider value={{
            ...playerContextDefaultValue,
            uuid,
            playerStore: store,
            playerStoreDispatch: dispatch,
            videoEle: videoEleRef.current,
            videoEleAttributes,
            videoContainerEle: videoContainerEleRef.current,
            wsPlayer: new WsPlayer({ dispatch }),
            flvPlayer: new FlvPlayer({ dispatch }),
            ...rest,
        }}>
            <div
                id={`player-${uuid}`}
                ref={videoContainerEleRef}
                {...videoContainerEleOpts}
                className={c(s.container, videoContainerEleOpts?.className)}
            >
                <Video ref={videoEleRef} />
            </div>
        </PlayerContext.Provider>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
