import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const borderWidth = 2;

const useRndPlayerStyles = () => {
    const {
        // rndEle,
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            players,
            rndEleWidth,
            initialMinWidth,

        },
    } = useContext(RndPlayerContext);

    useEffect(
        () => {
            if (!players.length || !rndEleWidth || !initialMinWidth) return;

            // rndEle.updateSize({
            //     width: rndEleWidth * players.length,
            // });
            rndPlayerStoreDispatch({
                minWidth: initialMinWidth * players.length + borderWidth * 2,
            });
        },
        [players.length],
    );
};

export default useRndPlayerStyles;
