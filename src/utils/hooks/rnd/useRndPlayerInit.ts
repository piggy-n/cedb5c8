import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { randomString } from '@/utils/methods/common/randomString';
import type { ItemProps } from '@/kernel/RndPlayer/Content/Players/Item';

const borderWidth = 2;

const useRndPlayerInit = () => {
    const {
        rndPlayerStoreDispatch,
        rndEleOpts: {
            minWidth = 480,
            minHeight = 270,
            position = { x: 0, y: 0 },
        } = {},
    } = useContext(RndPlayerContext);

    useEffect(
        () => {
            const playerItem: ItemProps = {
                minWidth,
                minHeight,
                id: randomString(),
            };

            rndPlayerStoreDispatch({
                position,
                players: [playerItem],
                initialMinWidth: minWidth,
                initialMinHeight: minHeight,
                minWidth: minWidth + borderWidth * 2,
                minHeight: minHeight + borderWidth * 2,
            });
        },
        [],
    );
};

export default useRndPlayerInit;
