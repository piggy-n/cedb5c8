import s from './styles/progressWrapper.scss';
import { useContext, useRef } from 'react';
import { useControlsProgressStyles } from '@/utils/hooks';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { toMinutesAndSeconds } from '@/utils/methods/common/times';

const ProgressWrapper = () => {
    const {
        playerStore: {
            totalTime,
        },
    } = useContext(PlayerContext);
    const {
        controlsStore: {
            position,
            percentage,
            suspending,
        },
    } = useContext(ControlsContext);

    const progressWrapperEleRef = useRef<HTMLDivElement>(null);
    const progressPointerEleRef = useRef<HTMLDivElement>(null);

    const {
        bufferedPercentage,
        processPercentage,
    } = useControlsProgressStyles(
        progressWrapperEleRef.current,
        progressPointerEleRef.current,
    ); // 获取已播放进度条、已缓冲进度条的百分比，修改进度条的样式

    return (
        <div className={s.container} ref={progressWrapperEleRef}>
            <div className={s.buffered} style={{ width: `${bufferedPercentage}%` }} />
            <div className={s.played} style={{ width: `${processPercentage}%` }}>
                <i ref={progressPointerEleRef} />
            </div>
            {
                suspending && totalTime > 0 &&
                <div className={s.time_text} style={{ left: `${position}px` }}>
                    <i />
                    <span>{toMinutesAndSeconds(totalTime, percentage)}</span>
                </div>
            }
        </div>
    );
};

export default ProgressWrapper;
