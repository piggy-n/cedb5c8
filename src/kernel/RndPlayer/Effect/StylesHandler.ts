import { useContext, useEffect, useMemo } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { usePrevious } from 'ahooks';

const borderWidth = 4;

const StylesHandler = () => {
    const {
        rndEle,
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            mode,
            players,
            rndWidth,
            rndHeight,
            videoMinWidth,
        },
    } = useContext(RndPlayerContext);

    const playersUrlListLength = useMemo(
        () => players.map((item) => item.url).filter((item) => item).length,
        [players],
    );
    const prevMode = usePrevious(mode);
    const prevPlayersUrlListLength = usePrevious(playersUrlListLength);

    useEffect(
        () => {
            if (!rndWidth || !rndHeight || !videoMinWidth) return;
            const oneToTwo = prevPlayersUrlListLength === 1 && playersUrlListLength === 2;
            const twoToOne = prevPlayersUrlListLength === 2 && playersUrlListLength === 1;

            const expand = () => {
                rndEle.updateSize({
                    width: (rndWidth - borderWidth) * 2 + borderWidth,
                    height: rndHeight,
                });
                rndPlayerStoreDispatch({
                    rndWidth: (rndWidth - borderWidth) * 2 + borderWidth,
                    rndMinWidth: videoMinWidth * 2 + borderWidth,
                });
            };

            const shrink = () => {
                rndEle.updateSize({
                    width: Math.floor((rndWidth - borderWidth) / 2) + borderWidth,
                    height: rndHeight,
                });
                rndPlayerStoreDispatch({
                    rndWidth: Math.floor((rndWidth - borderWidth) / 2) + borderWidth,
                    rndMinWidth: videoMinWidth + borderWidth,
                });
            };

            // 1 => 2
            if (oneToTwo && mode === 'db') return expand();
            // 2 => 1
            if (twoToOne && prevMode === 'db') return shrink();
            // only mode change
            if (playersUrlListLength === 2 && prevMode === 'db') return shrink();
            if (playersUrlListLength === 2 && prevMode === 'pip') return expand();
        },
        [
            mode,
            prevMode,
            playersUrlListLength,
            prevPlayersUrlListLength,
        ],
    );

    return null;
};

export default StylesHandler;
