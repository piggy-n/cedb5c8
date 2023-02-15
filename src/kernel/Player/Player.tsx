import { forwardRef, useRef, useState } from 'react';
import s from './styles/player.scss';
import c from 'classnames';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';
import { randomString } from '@/utils/methods/randomString';
import { usePlayerStore } from '@/utils/hooks/usePlayerStore';
import FlvPlayer from '@/utils/players/flvPlayer';
import WsPlayer from '@/utils/players/wsPlayer';
import { PlayerContext, playerContextDefaultValue } from '@/utils/hooks/usePlayerContext';

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
    const wsPlayerRef = useRef<WsPlayer>(new WsPlayer());
    const flvPlayerRef = useRef<FlvPlayer>(new FlvPlayer());

    return (
        <PlayerContext.Provider value={{
            ...playerContextDefaultValue,
            uuid,
            playerStore: store,
            playerStoreDispatch: dispatch,
            videoEle: videoEleRef.current,
            videoContainerEle: videoContainerEleRef.current,
            wsPlayer: wsPlayerRef.current,
            flvPlayer: flvPlayerRef.current,
            ...rest,
        }}>
            <div
                id={`player-${uuid}`}
                ref={videoContainerEleRef}
                {...videoContainerEleOpts}
                className={c(s.container, videoContainerEleOpts?.className)}
            >

            </div>
        </PlayerContext.Provider>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
