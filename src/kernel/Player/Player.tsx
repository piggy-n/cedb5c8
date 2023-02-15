import { forwardRef, useState } from 'react';
import s from './styles/player.scss';
import c from 'classnames';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';
import { randomString } from '@/utils/methods/randomString';

const VanillaPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        videoContainerEleOpts,
        ...rest
    },
    ref
) => {
    const [uuid] = useState(randomString());

    return (
        <div
            id={`player-${uuid}`}
            {...videoContainerEleOpts}
            className={c(s.container, videoContainerEleOpts?.className)}
        />
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
