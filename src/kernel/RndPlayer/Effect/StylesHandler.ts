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
        () => players
            .map(item => item.url)
            .filter(item => item)
            .length,
        [players],
    );
    const prevMode = usePrevious(mode);
    const prevPlayersUrlListLength = usePrevious(playersUrlListLength);
    const listLengthChangeStatus = useMemo(
        () => {
            if (prevPlayersUrlListLength === 1 && playersUrlListLength === 2) return 'expand';
            if (prevPlayersUrlListLength === 2 && playersUrlListLength === 1) return 'shrink';
            return 'none';
        },
        [prevPlayersUrlListLength, playersUrlListLength],
    );

    const expand = () => {
        if (!rndWidth || !rndHeight || !videoMinWidth) return;
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
        if (!rndWidth || !rndHeight || !videoMinWidth) return;
        rndEle.updateSize({
            width: Math.floor((rndWidth - borderWidth) / 2) + borderWidth,
            height: rndHeight,
        });
        rndPlayerStoreDispatch({
            rndWidth: Math.floor((rndWidth - borderWidth) / 2) + borderWidth,
            rndMinWidth: videoMinWidth + borderWidth,
        });
    };

    useEffect(
        () => {
            if (listLengthChangeStatus === 'expand') {
                if (mode === 'db') return expand();
            }
            if (listLengthChangeStatus === 'shrink') {
                if (mode === 'db') return shrink();
                if (prevMode === 'db' && (mode === 'sg' || mode === 'pip')) return shrink();
            }
        },
        [listLengthChangeStatus],
    );

    useEffect(
        () => {
            if (playersUrlListLength === 2) {
                if (prevMode === 'db') return shrink();
                if (prevMode === 'pip') return expand();
            }
        },
        [prevMode],
    );

    return null;
};

export default StylesHandler;
