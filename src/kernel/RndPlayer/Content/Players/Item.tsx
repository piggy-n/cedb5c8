import s from './styles/item.scss';
import Player from '@/kernel/Player';
import Draggable from 'react-draggable';
import type { FC } from 'react';

interface ItemProps {
    minWidth?: number;
    minHeight?: number;
}

const Item: FC<ItemProps> = (
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

export default Item;
