import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { randomString } from '@/utils/methods/common/randomString';
import { usePrevious } from 'ahooks';
import type { ItemProps } from '@/kernel/RndPlayer/components/Content/components/Players/Item';

const borderWidth = 2;
const headerHeight = 36;

const StylesHandler = () => {
    const {
        rndEle,
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            players,
            rndWidth,
            rndHeight,
            videoMinWidth,
        },
        rndEleOpts: {
            minWidth = 484,
            minHeight = 310,
            position = { x: 0, y: 0 },
        } = {},
    } = useContext(RndPlayerContext);

    const playersLength = players.length;
    const prevPlayersLength = usePrevious(players.length);

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
                });
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

    return null;
};

export default StylesHandler;
