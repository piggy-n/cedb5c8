import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { usePrevious } from 'ahooks';

const borderWidth = 2;

const useRndPlayerStyles = () => {
    const {
        rndEle,
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            players,
            rndWidth,
            rndHeight,
            videoMinWidth,
        },
    } = useContext(RndPlayerContext);

    const playersLength = players.length;
    const prevPlayersLength = usePrevious(players.length);

    useEffect(
        () => {
            if (!playersLength || !rndWidth || !rndHeight || !videoMinWidth) return;

            // 1 => 2
            if (prevPlayersLength === 1 && playersLength === 2) {
                rndEle.updateSize({
                    width: rndWidth * 2,
                    height: rndHeight,
                });
                rndPlayerStoreDispatch({
                    rndWidth: rndWidth * 2,
                })
            }
            // 2 => 1
            if (prevPlayersLength === 2 && playersLength === 1) {
                rndEle.updateSize({
                    width: rndWidth / 2,
                    height: rndHeight,
                });
                rndPlayerStoreDispatch({
                    rndWidth: rndWidth / 2,
                });
            }

            rndPlayerStoreDispatch({
                rndMinWidth: videoMinWidth * playersLength + borderWidth * 2,
            });
        },
        [playersLength, prevPlayersLength],
    );
};

export default useRndPlayerStyles;
