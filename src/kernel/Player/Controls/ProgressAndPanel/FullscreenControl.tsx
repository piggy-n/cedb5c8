import s from './styles/fullscreenControl.scss';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { isBoolean, isObject } from 'ahooks/es/utils';
import { fullscreen } from '@/utils/methods/common/fullscreen';
import Icon from '@/components/Icon';
import { isFullscreen } from 'screenfull';

const FullscreenControl = () => {
    const { controlsOpts, videoContainerEle } = useContext(PlayerContext);

    const clickHandler = async () => await fullscreen(videoContainerEle);

    if (
        isObject(controlsOpts) &&
        isBoolean(controlsOpts.fullscreen) &&
        !controlsOpts.fullscreen
    ) return null;
    return (
        <div className={s.container} onClick={clickHandler}>
            <Icon
                name={isFullscreen ? 'fullscreen-2' : 'fullscreen-1'}
                size={18}
                title={isFullscreen ? '退出全屏' : '全屏'}
            />
        </div>
    );
};

export default FullscreenControl;
