import s from './styles/content.scss';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { Panel, Players } from '@/kernel/RndPlayer/components/Content';
import { StylesHandler } from '@/kernel/RndPlayer/components/Content/handlers';

const Content = () => {
    const { rndPlayerStoreDispatch } = useContext(RndPlayerContext);

    return (
        <div
            className={s.container}
            onMouseOver={() => rndPlayerStoreDispatch({ disableDragging: true })}
        >
            <Panel />
            <Players />
            <StylesHandler />
        </div>
    );
};

export default Content;
