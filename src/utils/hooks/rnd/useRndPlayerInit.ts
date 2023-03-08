import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { PlayerItem } from '@/utils/hooks/data/useRndPlayerStore';
import { randomString } from '@/utils/methods/common/randomString';

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
            const playerItem: PlayerItem = {
                minWidth,
                minHeight,
                id: randomString(),
                render: require('@/kernel/RndPlayer/Content/Players/Item').default,
            };

            rndPlayerStoreDispatch({
                position,
                players: [playerItem],
                minWidth: minWidth + 4,
                minHeight: minHeight + 4,
            });
        },
        [],
    );
};

export default useRndPlayerInit;
