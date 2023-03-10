import s from './styles/header.scss';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import {
    CloseBtn,
    ControlPanelBtn,
    DeviceInfo,
    DoubleGridBtn,
    FullscreenBtn,
    PipGridBtn,
    ScreenshotBtn,
    SingleGridBtn,
    VideoPanelBtn,
} from '@/kernel/RndPlayer/Header';
import type { MouseEventHandler } from 'react';
import StreamSelector from '@/kernel/RndPlayer/Header/StreamSelector';
import CameraSelector from '@/kernel/RndPlayer/Header/CameraSelector';

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
            <div className={s.toolbar}>
                <StreamSelector />
                <CameraSelector />
                <SingleGridBtn />
                <DoubleGridBtn />
                <PipGridBtn />
                <ScreenshotBtn />
                <ControlPanelBtn />
                <VideoPanelBtn />
                <FullscreenBtn />
                <CloseBtn />
            </div>
        </div>
    );
};

export default Header;
