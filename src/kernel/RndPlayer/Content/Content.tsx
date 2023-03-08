import s from './styles/content.scss';
import { useContext, useEffect } from 'react';
import { Panel, Players } from '@/kernel/RndPlayer/Content';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const Content = () => {
    const {
        rndPlayerStoreDispatch,
        rndEleOpts: {
            minWidth = 480,
            minHeight = 270,
            position = { x: 0, y: 0 },
        } = {},
    } = useContext(RndPlayerContext);

    useEffect(
        () => rndPlayerStoreDispatch({
            minWidth: minWidth + 4,
            minHeight: minHeight + 4,
            position,
        }),
        [],
    );

    useEffect(() => {
        // const playerBoxEle = <PlayerBox minWidth={minWidth} minHeight={minHeight} />;
        // const playerBoxWrapperEle = document.getElementById('rnd-player-box-wrapper');
        //
        // if (playerBoxWrapperEle) {
        //     render(playerBoxEle, playerBoxWrapperEle);
        // }
    }, []);

    return (
        <div
            className={s.container}
            onMouseOver={() => rndPlayerStoreDispatch({ disableDragging: true })}
        >
            <Panel />
            <Players />
        </div>
    );
};

export default Content;
