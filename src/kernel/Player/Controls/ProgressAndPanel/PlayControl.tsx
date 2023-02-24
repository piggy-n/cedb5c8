import s from './styles/playControl.scss';
import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const PlayControl = () => {
    const {
        playerStore: {
            videoLoadFailedVal,
        },
    } = useContext(PlayerContext);
    const {
        changePlayStatusHandler,
        controlsStore: {
            showPlayBtn,
        },
    } = useContext(ControlsContext);

    return (
        <div className={s.container} onClick={changePlayStatusHandler}>
            {showPlayBtn || videoLoadFailedVal ? '播' : '停'}
        </div>
    );
};

export default PlayControl;
