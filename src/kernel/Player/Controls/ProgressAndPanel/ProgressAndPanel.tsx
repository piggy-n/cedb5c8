import c from 'classnames';
import s from './styles/progressAndPanel.scss';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import ProgressMask from '@/kernel/Player/Controls/ProgressAndPanel/ProgressMask';
import ProgressWrapper from '@/kernel/Player/Controls/ProgressAndPanel/ProgressWrapper';

const ProgressAndPanel = () => {
    const {
        playerStore: {
            videoType,
        },
        videoEleAttributes: {
            ended,
        },
    } = useContext(PlayerContext);
    const {
        controlsStoreDispatch,
        controlsStore: {
            showControls,
        },
    } = useContext(ControlsContext);

    if (ended) return null;
    return (
        <div
            className={s.container}
            onMouseEnter={() => controlsStoreDispatch({ mouseIsOnControls: true })}
            onMouseLeave={() => controlsStoreDispatch({ mouseIsOnControls: false })}
        >
            {
                videoType === 'record'
                    ? <div className={c(s.progress, { [s.show]: showControls })}>
                        <ProgressMask />
                        <ProgressWrapper />
                    </div>
                    : null
            }
            <div className={c(s.panel, { [s.show]: showControls })}>

            </div>
        </div>
    );
};

export default ProgressAndPanel;
