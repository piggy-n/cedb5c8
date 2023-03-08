import s from './styles/playerBox.scss';
import { FC } from 'react';
import Draggable from 'react-draggable';
import Player from '@/kernel/Player';

interface PlayerBoxProps {
    minWidth?: number;
    minHeight?: number;
}

const PlayerBox: FC<PlayerBoxProps> = (
    {
        minWidth,
        minHeight,
    },
) => {
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
