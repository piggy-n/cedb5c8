import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const borderWidth = 2;

const useRndPlayerStyles = () => {
    const {
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            players,
            initialMinWidth,
            initialMinHeight,
        },
    } = useContext(RndPlayerContext);

    useEffect(
        () => {
            if (!players.length || !initialMinWidth || !initialMinHeight) return;

            rndPlayerStoreDispatch({
                minWidth: initialMinWidth * players.length + borderWidth * 2,
                minHeight: initialMinHeight * players.length + borderWidth * 2,
            });
        },
        [players.length],
    );
};

export default useRndPlayerStyles;
