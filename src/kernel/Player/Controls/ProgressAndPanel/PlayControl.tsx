import s from './styles/playControl.scss';
import { useContext, useMemo } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import Icon from '@/components/Icon';

const PlayControl = () => {
    const {
        playerStore: {
            videoType,
            videoLoadFailedVal,
        },
    } = useContext(PlayerContext);
    const {
        changePlayStatusHandler,
        controlsStore: {
            showPlayBtn,
        },
    } = useContext(ControlsContext);

    const [iconName, iconTitle] = useMemo(
        () => videoType === 'record' ? ['pause', '暂停'] : ['stop', '停止'],
        [videoType],
    );

    return (
        <div className={s.container} onClick={changePlayStatusHandler}>
            {
                showPlayBtn || videoLoadFailedVal
                    ? <Icon name={'play-1'} size={18} title={'播放'} />
                    : <Icon name={iconName} size={18} title={iconTitle} />
            }
        </div>
    );
};

export default PlayControl;
