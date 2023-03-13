import s from './styles/content.scss';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { Panel, Players } from '@/kernel/RndPlayer/Content';

const Content = () => {
    const { rndPlayerStoreDispatch } = useContext(RndPlayerContext);

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
