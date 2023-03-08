import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { randomString } from '@/utils/methods/common/randomString';
import type { ItemProps } from '@/kernel/RndPlayer/Content/Players/Item';

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
            const initialSize = { minWidth, minHeight };
            const playerItem: ItemProps = {
                ...initialSize,
                id: randomString(),
            };

            rndPlayerStoreDispatch({
                position,
                initialSize,
                players: [playerItem],
                minWidth: minWidth + 4,
                minHeight: minHeight + 4,
            });
        },
        [],
    );
};

export default useRndPlayerInit;
