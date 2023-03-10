import c from 'classnames';
import s from './styles/player.scss';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { usePlayerStore } from '@/utils/hooks';
import { PlayerContext, playerContextDefaultValue } from '@/utils/hooks/data/usePlayerContext';
import { Controls, Loading, PlayerListener, PlayerMethods, Video } from '@/kernel/Player';
import { randomString } from '@/utils/methods/common/randomString';
import { WsPlayer, FlvPlayer } from '@/utils/players';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';

const VanillaPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        videoContainerEleOpts,
        ...rest
    },
    ref,
) => {
    const [uuid] = useState(randomString());
    const [store, dispatch] = usePlayerStore();

    const videoEleRef = useRef<HTMLVideoElement>(null);
    const videoContainerEleRef = useRef<HTMLDivElement>(null);
    const wsPlayerRef = useRef<WsPlayer>(new WsPlayer({ uuid, dispatch }));
    const flvPlayerRef = useRef<FlvPlayer>(new FlvPlayer({ uuid, dispatch }));

    // const videoEleAttributes = useVideoListener(videoEleRef.current); // video 元素的监听器

    useImperativeHandle(
        ref,
        () => ({
            ...store.playerMethods!,
            // ...videoEleAttributes,
            video: videoEleRef.current,
        }),
    );

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
                <Video ref={videoEleRef} />
                <Loading />
                <Controls />
                <PlayerListener />
                <PlayerMethods />
            </div>
        </PlayerContext.Provider>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
