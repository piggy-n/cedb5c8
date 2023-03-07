import c from 'classnames';
import s from './styles/rndPlayer.scss';
import { useRef } from 'react';
import { useRndPlayerStore } from '@/utils/hooks';
import { Rnd } from 'react-rnd';
import type { FC } from 'react';
import type { RndPlayerProps } from '@/index.d';
import Header from '@/kernel/RndPlayer/Header';
import Main from '@/kernel/RndPlayer/Main';

const RndPlayer: FC<RndPlayerProps> = (
    {
        rndEleOpts,
        rndPlayerContainerEleOpts,
    },
) => {
    const [store, dispatch] = useRndPlayerStore();
    const rndPlayerContainerEleRef = useRef<HTMLDivElement>(null);
    // const { minWidth = 480, minHeight = 270, position: { x = 0, y = 0 } } = rndEleOpts || {};

    return (
        <Rnd
            bounds={'parent'}
            maxWidth={innerWidth}
            maxHeight={innerHeight}
            lockAspectRatio
            {...rndEleOpts}
            className={c(s.rnd_container, rndEleOpts?.className)}
            minHeight={store.minHeight}
            minWidth={store.minWidth}
        >
            <div
                ref={rndPlayerContainerEleRef}
                {...rndPlayerContainerEleOpts}
                className={c(s.player_container, rndPlayerContainerEleOpts?.className)}
                style={{
                    ...rndPlayerContainerEleOpts?.style,
                    minWidth: store.minWidth,
                    minHeight: store.minHeight,
                }}
            >
                <Header />
                <Main />
            </div>
        </Rnd>
    );
};

export default RndPlayer;
