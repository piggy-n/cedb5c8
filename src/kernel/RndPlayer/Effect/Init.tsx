import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import type { ItemProps } from '@/kernel/RndPlayer/Content/Players/Item';

const borderWidth = 4;
const headerHeight = 36;

const Init = () => {
    const {
        rndPlayerStoreDispatch,
        rndEleOpts: {
            minWidth = 484,
            minHeight = 310,
            position = { x: 0, y: 0 },
        } = {},
    } = useContext(RndPlayerContext);

    useEffect(
        () => {
            const videoMinWidth = minWidth - borderWidth;
            const videoMinHeight = minHeight - headerHeight - borderWidth;
            const playerItem: ItemProps = {
                minWidth: videoMinWidth,
                minHeight: videoMinHeight,
                isMainPlayer: true,
                url: '',
            };

            rndPlayerStoreDispatch({
                position,
                players: [playerItem, { ...playerItem, isMainPlayer: false }],
                rndWidth: minWidth,
                rndMinWidth: minWidth,
                rndMinHeight: minHeight,
                videoMinWidth,
                videoMinHeight,
            });
        },
        [],
    );

    return null;
};

export default Init;
