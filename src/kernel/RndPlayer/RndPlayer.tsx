import c from 'classnames';
import s from './styles/rndPlayer.scss';
import { Rnd } from 'react-rnd';
import type { FC } from 'react';
import type { RndPlayerProps } from '@/index.d';
import { useRef } from 'react';


const RndPlayer: FC<RndPlayerProps> = (
    {
        rndEleOpts,
        rndPlayerContainerEleOpts,
    },
) => {
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
        >
            <div
                ref={rndPlayerContainerEleRef}
                {...rndPlayerContainerEleOpts}
                className={c(s.player_container, rndPlayerContainerEleOpts?.className)}
            >

            </div>
        </Rnd>
    );
};

export default RndPlayer;
