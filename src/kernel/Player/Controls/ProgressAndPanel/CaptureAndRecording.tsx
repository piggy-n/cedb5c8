import s from './styles/captureAndRecording.scss';
import { useContext, useMemo, useState } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { isBoolean, isObject, isUndef } from 'ahooks/es/utils';
import { tip } from '@/components/Tip';

const CaptureAndRecording = () => {
    const { uuid, controlsOpts } = useContext(PlayerContext);

    const [visible, setVisible] = useState(false);

    const mode = useMemo(
        () => {
            if (isObject(controlsOpts)) {
                const { screenshot, recording } = controlsOpts;

                if (
                    (screenshot && recording) ||
                    (screenshot && isUndef(recording)) ||
                    (isUndef(screenshot) && recording) ||
                    (isUndef(screenshot) && isUndef(recording))
                ) return 'both';

                if (
                    (screenshot || isUndef(screenshot)) &&
                    isBoolean(recording) &&
                    !recording
                ) return 'screenshot';

                if (
                    (recording || isUndef(recording)) &&
                    isBoolean(screenshot) &&
                    !screenshot
                ) return 'recording';

                return 'none';
            }
            return 'none';
        },
        [controlsOpts],
    );

    const screenshotHandler = () => {
        console.log('screenshot');
    };

    const recordingHandler = () => {
        tip({
            uuid,
            eleId: 'player',
            msg: '功能开发中',
            type: 'warning',
        });
    };

    const clickHandler = () => {
        if (mode === 'both') return setVisible(!visible);
        if (mode === 'screenshot') return screenshotHandler();
        if (mode === 'recording') return recordingHandler();
    };

    if (mode === 'none') return null;
    return (
        <div className={s.container}>
            <div onClick={clickHandler}>
                {mode}
            </div>
            {
                visible &&
                <div className={s.both}>
                    <div className={s.item} onClick={screenshotHandler}>
                        <p>截图</p>
                    </div>
                    <div className={s.item} onClick={recordingHandler}>
                        <p>录制</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default CaptureAndRecording;
