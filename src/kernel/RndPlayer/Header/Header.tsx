import s from './styles/header.scss';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import type { MouseEventHandler } from 'react';
import DeviceInfo from '@/kernel/RndPlayer/Header/DeviceInfo';

const Header = () => {
    const { rndPlayerStoreDispatch } = useContext(RndPlayerContext);

    const mouseOverHandler: MouseEventHandler = (e) => {
        const { target } = e;
        const targetEleName = (target as Record<string, any>)?.tagName;

        rndPlayerStoreDispatch({
            disableDragging: targetEleName !== 'DIV',
        });
    };

    return (
        <div className={s.container} onMouseMove={mouseOverHandler}>
            <DeviceInfo />
        </div>
    );
};

export default Header;
