import { useRef } from 'react';
import Player from '@/kernel/Player';

const PlayerWrapper = () => {
    const playerWrapperEleRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={playerWrapperEleRef}>
            <Player />
        </div>
    );
};

export default PlayerWrapper;
