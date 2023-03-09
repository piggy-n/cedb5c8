import c from 'classnames';
import s from './styles/item.scss';
import Player from '@/kernel/Player';
import Draggable from 'react-draggable';
import type { FC } from 'react';
import { useContext, useState } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

export interface ItemProps {
    id?: string;
    url?: string;
    minWidth?: number;
    minHeight?: number;
    isMainPlayer?: boolean;
}

const Item: FC<ItemProps> = (
    {
        id,
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

    return (
        <Draggable
            bounds={'parent'}
            disabled={!(mode === 'pip' && !isMainPlayer)}
            position={mode === 'pip' && !isMainPlayer ? position : { x: 0, y: 0 }}
            onDrag={(_, data) => setPosition(data)}
        >
            <div
                id={id}
                className={c(
                    s.container,
                    {
                        [s.sg]: mode === 'sg' || players.length === 1 || (mode === 'pip' && isMainPlayer),
                        [s.db]: mode === 'db' && players.length === 2,
                        [s.pip]: mode === 'pip' && !isMainPlayer,
                    },
                )}
            >
                <div className={s.mask} />
                <Player
                    videoContainerEleOpts={{
                        style: mode === 'pip' && !isMainPlayer
                            ? undefined
                            : { minWidth, minHeight },
                    }}
                    url={url}
                />
            </div>
        </Draggable>
    );
};

export default Item;
