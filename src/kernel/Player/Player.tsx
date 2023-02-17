import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { usePlayerMethods, usePlayerStore, useVideoListener } from '@/utils/hooks';
import { PlayerContext, playerContextDefaultValue } from '@/utils/hooks/data/usePlayerContext';
import c from 'classnames';
import s from './styles/player.scss';
import Video from '@/kernel/Player/components/Video';
import { randomString } from '@/utils/methods/common/randomString';
import { WsPlayer, FlvPlayer } from '@/utils/players';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';

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
    const playerMethods = usePlayerMethods();

    useImperativeHandle(
        ref,
        () => ({
            video: videoEleRef.current,
            ...videoEleAttributes,
            ...playerMethods,
        }),
    );

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
