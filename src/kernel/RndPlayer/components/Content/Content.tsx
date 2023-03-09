import s from './styles/content.scss';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { useRndPlayerInit, useRndPlayerStyles } from '@/utils/hooks';
import { Panel, Players } from '@/kernel/RndPlayer/components/Content';

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
