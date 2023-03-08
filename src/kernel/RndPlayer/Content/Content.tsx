import s from './styles/content.scss';
import Panel from '@/kernel/RndPlayer/Content/Panel/Panel';
import PlayerWrapper from '@/kernel/RndPlayer/Content/PlayerWrapper/PlayerWrapper';
import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { render } from 'react-dom';
import PlayerBox from '@/kernel/RndPlayer/Content/PlayerWrapper/PlayerBox';

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
        const rndPlayerWrapperEle = document.getElementById('rnd-player-wrapper');

        if (rndPlayerWrapperEle) {
            render(
                <PlayerBox minWidth={minWidth} minHeight={minHeight} />,
                rndPlayerWrapperEle,
            );
        }
    }, []);

    return (
        <div
            className={s.container}
            onMouseOver={() => rndPlayerStoreDispatch({ disableDragging: true })}
        >
            <Panel />
            <PlayerWrapper />
        </div>
    );
};

export default Content;
