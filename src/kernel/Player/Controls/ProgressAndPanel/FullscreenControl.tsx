import s from './styles/fullscreenControl.scss';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { isBoolean, isObject } from 'ahooks/es/utils';
import { fullscreen } from '@/utils/methods/common/fullscreen';

const FullscreenControl = () => {
    const {
        controlsOpts,
        videoContainerEle,
        playerStoreDispatch,
    } = useContext(PlayerContext);

    const clickHandler = async () => {
        const isFullscreen = await fullscreen(videoContainerEle);

        playerStoreDispatch({
            isFullscreen,
        });
    };

    if (
        isObject(controlsOpts) &&
        isBoolean(controlsOpts.fullscreen) &&
        !controlsOpts.fullscreen
    ) return null;
    return (
        <div className={s.container} onClick={clickHandler}>
            全
        </div>
    );
};

export default FullscreenControl;
