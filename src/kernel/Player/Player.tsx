import { forwardRef } from 'react';
import s from './styles/player.scss';
import c from 'classnames';
import type { PlayerRef, PlayerProps } from '@/index.d';

const Player = forwardRef<PlayerRef, PlayerProps>(function _(
    {
        videoContainerEleOpts,
        ...rest
    },
    ref
) {
    return (
        <div
            {...videoContainerEleOpts}
            className={c(s.container, videoContainerEleOpts?.className)}
        />
    );
});

export default Player;
