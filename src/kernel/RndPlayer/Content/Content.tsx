import s from './styles/content.scss';
import Panel from '@/kernel/RndPlayer/Content/Panel/Panel';
import PlayerWrapper from '@/kernel/RndPlayer/Content/PlayerWrapper/PlayerWrapper';
import { useContext, useEffect } from 'react';
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
        () => rndPlayerStoreDispatch({ minWidth, minHeight, position }),
        [],
    );

    return (
        <div className={s.container}>
            <Panel />
            <PlayerWrapper />
        </div>
    );
};

export default Content;
