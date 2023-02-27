import s from './styles/fullscreenControl.scss';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { isBoolean, isObject } from 'ahooks/es/utils';
import { fullscreen } from '@/utils/methods/common/fullscreen';
import Icon from '@/components/Icon';

const FullscreenControl = () => {
    const {
        controlsOpts,
        videoContainerEle,
        playerStoreDispatch,
        playerStore: {
            isFullscreen,
        },
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
            <Icon
                name={isFullscreen ? 'fullscreen-2' : 'fullscreen-1'}
                size={18}
                title={isFullscreen ? '退出全屏' : '全屏'}
            />
        </div>
    );
};

export default FullscreenControl;
