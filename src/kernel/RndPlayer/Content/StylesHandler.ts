import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { usePrevious } from 'ahooks';
import type { ItemProps } from '@/kernel/RndPlayer/Content/Players/Item';

const borderWidth = 4;
const headerHeight = 36;

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
        rndEleOpts: {
            minWidth = 484,
            minHeight = 310,
            position = { x: 0, y: 0 },
        } = {},
    } = useContext(RndPlayerContext);

    const playersLength = players.length;
    const prevPlayersLength = usePrevious(players.length);
    const prevMode = usePrevious(mode);

    useEffect(
        () => {
            const videoMinWidth = minWidth - borderWidth;
            const videoMinHeight = minHeight - headerHeight - borderWidth;
            const playerItem: ItemProps = {
                minWidth: videoMinWidth,
                minHeight: videoMinHeight,
                isMainPlayer: true,
                url: 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4',
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
            if (!rndWidth || !rndHeight || !videoMinWidth) return;
            const oneToTwo = prevPlayersLength === 1 && playersLength === 2;
            const twoToOne = prevPlayersLength === 2 && playersLength === 1;

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
            if (playersLength === 2 && prevMode === 'db') return shrink();
            if (playersLength === 2 && prevMode === 'pip') return expand();
        },
        [playersLength, prevPlayersLength, mode, prevMode],
    );

    return null;
};

export default StylesHandler;
