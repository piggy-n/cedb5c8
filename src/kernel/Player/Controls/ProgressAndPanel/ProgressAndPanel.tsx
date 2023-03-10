import c from 'classnames';
import s from './styles/progressAndPanel.scss';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import {
    CaptureAndRecording,
    FormatViewer,
    FullscreenControl,
    PlayControl,
    ProgressMask,
    ProgressWrapper,
    QualityViewer,
    ReloadControl,
    TimeViewer,
    TransmissionRateViewer,
} from '@/kernel/Player/Controls/ProgressAndPanel/index';

const ProgressAndPanel = () => {
    const {
        playerStore: {
            videoType,
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
                <div className={s.left}>
                    <PlayControl />
                    <ReloadControl />
                    <TimeViewer />
                </div>
                <div className={s.right}>
                    <FormatViewer />
                    <QualityViewer />
                    <TransmissionRateViewer />
                    <CaptureAndRecording />
                    <FullscreenControl />
                </div>
            </div>
        </div>
    );
};

export default ProgressAndPanel;
