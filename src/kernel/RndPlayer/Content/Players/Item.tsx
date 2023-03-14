import c from 'classnames';
import s from './styles/item.scss';
import Player from '@/kernel/Player';
import Draggable from 'react-draggable';
import type { FC } from 'react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

export interface ItemProps {
    url?: string;
    isMainPlayer?: boolean;
}

const Item: FC<ItemProps> = (
    {
        url,
        isMainPlayer,
    },
) => {
    const {
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            mode,
            players,
            videoMinWidth: minWidth,
            videoMinHeight: minHeight,
        },
    } = useContext(RndPlayerContext);

    const clickCountRef = useRef(0);
    const clickTimeoutRef = useRef<NodeJS.Timeout>();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const isPipPlayer = useMemo(
        () => mode === 'pip' && !isMainPlayer,
        [mode, isMainPlayer],
    );
    const playersUrlListLength = useMemo(
        () => players
            .map(item => item.url)
            .filter(item => item)
            .length,
        [players],
    );

    const containerStylesHandler = () => {
        if (mode === 'sg' || playersUrlListLength === 1) return [s.sg];
        if (mode === 'db' && playersUrlListLength === 2) return [s.db];
        if (mode === 'pip' && !isMainPlayer) return [s.pip];
        return [s.sg];
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
                    const subPlayer = copyPlayers.find(player => !player.isMainPlayer);

                    if (mainPlayer && subPlayer) {
                        mainPlayer.isMainPlayer = false;
                        subPlayer.isMainPlayer = true;
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

    useEffect(
        () => setPosition({ x: 0, y: 0 }),
        [isPipPlayer],
    );

    if (!url && !isMainPlayer) return null;
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
