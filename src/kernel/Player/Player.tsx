import { forwardRef } from 'react';
import s from './styles/player.scss';
import c from 'classnames';
import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';

const VanillaPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        videoContainerEleOpts,
        ...rest
    },
    ref
) => {
    return (
        <div
            {...videoContainerEleOpts}
            className={c(s.container, videoContainerEleOpts?.className)}
        />
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
