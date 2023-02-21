import c from 'classnames';
import s from './styles/progressAndPanel.scss';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const ProgressAndPanel = () => {
    const {
        playerStore: {
            videoType
        }
    } = useContext(PlayerContext);
    const {
        controlsStoreDispatch,
        controlsStore: {
            showControls,
        }
    } = useContext(ControlsContext);

    return (
        <div
            className={s.container}
            onMouseEnter={() => controlsStoreDispatch({ mouseIsOnControls: true })}
            onMouseLeave={() => controlsStoreDispatch({ mouseIsOnControls: false })}
        >
            {
                videoType === 'record'
                    ? <div className={c(s.progress, { [s.show]: showControls })}>

                    </div>
                    : null
            }
            <div className={c(s.panel, { [s.show]: showControls })}>

            </div>
        </div>
    );
};

export default ProgressAndPanel;
