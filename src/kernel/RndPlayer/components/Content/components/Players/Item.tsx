import s from './styles/item.scss';
import Player from '@/kernel/Player';
import Draggable from 'react-draggable';
import type { FC } from 'react';

export interface ItemProps {
    id?: string;
    minWidth?: number;
    minHeight?: number;
}

const Item: FC<ItemProps> = (
    {
        id,
        minWidth,
        minHeight,
    },
) => {
    return (
        <Draggable bounds={'parent'} disabled>
            <div className={s.container} id={id}>
                <div className={s.mask} />
                <Player
                    videoContainerEleOpts={{ style: { minWidth, minHeight } }}
                    url={'https://www.w3school.com.cn/i/movie.ogg'}
                />
            </div>
        </Draggable>
    );
};

export default Item;
