import s from './styles/playerBox.scss';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import Draggable from 'react-draggable';
import Player from '@/kernel/Player';

const PlayerBox = () => {
    const {
        rndPlayerStore: {
            minWidth,
            minHeight,
        },
    } = useContext(RndPlayerContext);

    return (
        <Draggable bounds={'parent'} disabled>
            <div className={s.container}>
                <div className={s.mask} />
                <Player videoContainerEleOpts={{ style: { minWidth, minHeight } }} />
            </div>
        </Draggable>
    );
};

export default PlayerBox;
