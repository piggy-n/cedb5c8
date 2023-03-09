import c from 'classnames';
import s from './styles/item.scss';
import Player from '@/kernel/Player';
import Draggable from 'react-draggable';
import type { FC } from 'react';
import { useContext, useState } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

export interface ItemProps {
    url?: string;
    minWidth?: number;
    minHeight?: number;
    isMainPlayer?: boolean;
}

const Item: FC<ItemProps> = (
    {
        url,
        minWidth,
        minHeight,
        isMainPlayer,
    },
) => {
    const {
        rndPlayerStore: {
            mode,
            players,
        },
    } = useContext(RndPlayerContext);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const containerStylesHandler = () => {
        if (mode === 'sg' || players.length === 1 || (mode === 'pip' && isMainPlayer)) return [s.sg];
        if (mode === 'db' && players.length === 2) return [s.db];
        if (mode === 'pip' && !isMainPlayer) return [s.pip];
        return [];
    };

    const videoStylesHandler = () => {
        if (mode === 'pip' && !isMainPlayer) return;
        return { style: { minWidth, minHeight } };
    };

    return (
        <Draggable
            bounds={'parent'}
            disabled={!(mode === 'pip' && !isMainPlayer)}
            position={mode === 'pip' && !isMainPlayer ? position : { x: 0, y: 0 }}
            onDrag={(_, data) => setPosition(data)}
        >
            <div className={c(s.container, containerStylesHandler())}>
                <div className={s.mask} />
                <Player
                    videoContainerEleOpts={videoStylesHandler()}
                    url={url}
                />
            </div>
        </Draggable>
    );
};

export default Item;
