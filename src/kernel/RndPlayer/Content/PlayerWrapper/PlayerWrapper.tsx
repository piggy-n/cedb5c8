import { useRef } from 'react';

const PlayerWrapper = () => {
    const playerWrapperEleRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={playerWrapperEleRef}>

        </div>
    );
};

export default PlayerWrapper;
