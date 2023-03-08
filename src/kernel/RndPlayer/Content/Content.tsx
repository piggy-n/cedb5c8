import s from './styles/content.scss';
import Panel from '@/kernel/RndPlayer/Content/Panel/Panel';
import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { render } from 'react-dom';
import { PlayerBox, PlayerBoxWrapper } from '@/kernel/RndPlayer/Content/PlayerBoxWrapper';

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
        const playerBoxEle = <PlayerBox minWidth={minWidth} minHeight={minHeight} />;
        const playerBoxWrapperEle = document.getElementById('rnd-player-box-wrapper');

        if (playerBoxWrapperEle) {
            render(playerBoxEle, playerBoxWrapperEle);
        }
    }, []);

    return (
        <div
            className={s.container}
            onMouseOver={() => rndPlayerStoreDispatch({ disableDragging: true })}
        >
            <Panel />
            <PlayerBoxWrapper />
        </div>
    );
};

export default Content;
