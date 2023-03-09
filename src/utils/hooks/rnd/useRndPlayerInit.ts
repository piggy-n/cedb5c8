import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { randomString } from '@/utils/methods/common/randomString';
import { ItemProps } from '@/kernel/RndPlayer/components/Content/components/Players/Item';

const borderWidth = 2;
const headerHeight = 36;

const useRndPlayerInit = () => {
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
            const videoMinWidth = minWidth - borderWidth * 2;
            const videoMinHeight = minHeight - headerHeight - borderWidth * 2;
            const playerItem: ItemProps = {
                minWidth: videoMinWidth,
                minHeight: videoMinHeight,
                id: randomString(),
            };

            rndPlayerStoreDispatch({
                position,
                players: [playerItem],
                rndWidth: minWidth,
                rndMinWidth: minWidth,
                rndMinHeight: minHeight,
                videoMinWidth,
                videoMinHeight,
            });
        },
        [],
    );
};

export default useRndPlayerInit;
