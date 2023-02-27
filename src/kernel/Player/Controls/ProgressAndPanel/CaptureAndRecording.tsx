import s from './styles/captureAndRecording.scss';
import { useContext, useMemo, useState } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { isBoolean, isObject, isUndef } from 'ahooks/es/utils';
import { tip } from '@/components/Tip';
import Icon from '@/components/Icon';

const CaptureAndRecording = () => {
    const { uuid, controlsOpts } = useContext(PlayerContext);

    const [visible, setVisible] = useState(false);

    const [mode, iconName, iconTitle] = useMemo(
        () => {
            if (isObject(controlsOpts)) {
                const { screenshot, recording } = controlsOpts;

                if (
                    (screenshot && recording) ||
                    (screenshot && isUndef(recording)) ||
                    (isUndef(screenshot) && recording) ||
                    (isUndef(screenshot) && isUndef(recording))
                ) return ['both', 'setting', '截图/录制'];

                if (
                    (screenshot || isUndef(screenshot)) &&
                    isBoolean(recording) &&
                    !recording
                ) return ['screenshot', 'screenshot-2', '截图'];

                if (
                    (recording || isUndef(recording)) &&
                    isBoolean(screenshot) &&
                    !screenshot
                ) return ['recording', 'recording', '录制'];

                return ['none', 'none', 'none'];
            }
            return ['none', 'none', 'none'];
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
                <Icon name={iconName} size={18} title={iconTitle} />
            </div>
            {
                visible &&
                <div className={s.both}>
                    <div className={s.item} onClick={screenshotHandler}>
                        <Icon name={'screenshot-1'} />
                        <p>截图</p>
                    </div>
                    <div className={s.item} onClick={recordingHandler}>
                        <Icon name={'recording'} />
                        <p>录制</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default CaptureAndRecording;
