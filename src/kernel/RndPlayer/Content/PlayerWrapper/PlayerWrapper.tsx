import s from './styles/playerWrapper.scss';
import { useRef } from 'react';
import PlayerBox from '@/kernel/RndPlayer/Content/PlayerWrapper/PlayerBox';

const PlayerWrapper = () => {
    const playerWrapperEleRef = useRef<HTMLDivElement>(null);

    return (
        <div className={s.container} ref={playerWrapperEleRef}>
            <PlayerBox />
        </div>
    );
};

export default PlayerWrapper;
