import c from 'classnames';
import s from './styles/item.scss';
import Player from '@/kernel/Player';
import Draggable from 'react-draggable';
import type { FC } from 'react';
import { useContext, useMemo, useRef, useState } from 'react';
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
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            mode,
            players,
        },
    } = useContext(RndPlayerContext);

    const clickCountRef = useRef(0);
    const clickTimeoutRef = useRef<NodeJS.Timeout>();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const isPipPlayer = useMemo(
        () => mode === 'pip' && !isMainPlayer,
        [mode, isMainPlayer],
    );

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

    const exchangePlayerHandler = () => {
        if (!isPipPlayer) return;

        clickCountRef.current += 1;
        clickTimeoutRef.current && clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(
            () => {
                if (clickCountRef.current === 2) {
                    const copyPlayers = [...players];
                    const mainPlayer = copyPlayers.find(player => player.isMainPlayer);
                    const pipPlayer = copyPlayers.find(player => !player.isMainPlayer);

                    if (mainPlayer && pipPlayer) {
                        mainPlayer.isMainPlayer = false;
                        pipPlayer.isMainPlayer = true;
                        rndPlayerStoreDispatch({
                            players: copyPlayers,
                        });
                    }
                }
                clickCountRef.current = 0;
            },
            250,
        );
    };

    return (
        <Draggable
            bounds={'parent'}
            disabled={!isPipPlayer}
            position={isPipPlayer ? position : { x: 0, y: 0 }}
            onDrag={(_, data) => setPosition(data)}
        >
            <div className={c(s.container, containerStylesHandler())}>
                <div className={s.mask} onClick={exchangePlayerHandler} />
                <Player
                    url={url}
                    videoContainerEleOpts={videoStylesHandler()}
                    controlsOpts={isPipPlayer ? false : undefined}
                />
            </div>
        </Draggable>
    );
};

export default Item;
