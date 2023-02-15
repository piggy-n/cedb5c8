import { forwardRef } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';

const Player = forwardRef<PlayerRef, PlayerProps>((
    {},
    ref
) => {
    return (
        <div />
    );
});

export default Player;
