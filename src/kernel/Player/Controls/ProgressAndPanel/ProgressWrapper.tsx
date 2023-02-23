import s from './styles/progressWrapper.scss';
import { useContext, useRef } from 'react';
import { useControlsProgressStyles } from '@/utils/hooks';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { toMinutesAndSeconds } from '@/utils/methods/common/times';

const ProgressWrapper = () => {
    const {
        videoEleAttributes: {
            totalTime,
        },
    } = useContext(PlayerContext);
    const {
        controlsStore: {
            percentage,
            suspending,
        },
    } = useContext(ControlsContext);

    const progressWrapperEleRef = useRef<HTMLDivElement>(null);
    const progressBufferedEleRef = useRef<HTMLDivElement>(null);
    const progressPlayedEleRef = useRef<HTMLDivElement>(null);
    const progressPointerEleRef = useRef<HTMLDivElement>(null);
    const progressTimeTextEleRef = useRef<HTMLDivElement>(null);

    useControlsProgressStyles(
        progressWrapperEleRef.current,
        progressBufferedEleRef.current,
        progressPlayedEleRef.current,
        progressPointerEleRef.current,
        progressTimeTextEleRef.current,
    ); // 获取已播放进度条、已缓冲进度条的百分比，修改进度条的样式

    return (
        <div className={s.container} ref={progressWrapperEleRef}>
            <div className={s.buffered} ref={progressBufferedEleRef} />
            <div className={s.played} ref={progressPlayedEleRef}>
                <i ref={progressPointerEleRef} />
            </div>
            {
                suspending && totalTime > 0 &&
                <div className={s.time_text} ref={progressTimeTextEleRef}>
                    <i />
                    <span>{toMinutesAndSeconds(totalTime, percentage)}</span>
                </div>
            }
        </div>
    );
};

export default ProgressWrapper;
