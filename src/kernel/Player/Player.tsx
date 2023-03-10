import c from 'classnames';
import s from './styles/player.scss';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { usePlayerStore } from '@/utils/hooks';
import { PlayerContext, playerContextDefaultValue } from '@/utils/hooks/data/usePlayerContext';
import { randomString } from '@/utils/methods/common/randomString';
import Loading from '@/kernel/Player/Loading';
import Video from '@/kernel/Player/Video';
import Controls from '@/kernel/Player/Controls';
import { Callback, ExMethods, Init, Listener, Play } from '@/kernel/Player/Effect';
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

    useImperativeHandle(
        ref,
        () => ({
            ...store.playerMethods,
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
            ...rest,
        }}>
            <div
                id={`player-${uuid}`}
                ref={videoContainerEleRef}
                {...videoContainerEleOpts}
                className={c(s.container, videoContainerEleOpts?.className)}
            >
                {/* Effect */}
                <Init />
                <Listener />
                <Play />
                <Callback />
                <ExMethods />
                {/* UI */}
                <Video ref={videoEleRef} />
                <Loading />
                <Controls />
            </div>
        </PlayerContext.Provider>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
