import s from './styles/content.scss';
import { useContext } from 'react';
import { Panel, Players } from '@/kernel/RndPlayer/Content';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { useRndPlayerInit, useRndPlayerStyles } from '@/utils/hooks';

const Content = () => {
    const { rndPlayerStoreDispatch } = useContext(RndPlayerContext);

    useRndPlayerInit();

    useRndPlayerStyles();

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
