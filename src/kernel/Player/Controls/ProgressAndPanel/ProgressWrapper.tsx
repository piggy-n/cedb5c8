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
            position,
            percentage,
            suspending,
        },
    } = useContext(ControlsContext);

    const progressWrapperEleRef = useRef<HTMLDivElement>(null);
    const progressControlPointEleRef = useRef<HTMLDivElement>(null);

    const {
        bufferedPercentage,
        processPercentage,
    } = useControlsProgressStyles(
        progressWrapperEleRef.current,
        progressControlPointEleRef.current,
    ); // 获取已播放进度条、已缓冲进度条的百分比，修改进度条的样式

    return (
        <div className={s.container} ref={progressWrapperEleRef}>
            <div className={s.buffered} style={{ width: `${bufferedPercentage}%` }} />
            <div className={s.played} style={{ width: `${processPercentage}%` }}>
                <i ref={progressControlPointEleRef} />
            </div>
            {
                suspending && totalTime > 0 &&
                <div className={s.pointer} style={{ left: `${position}px` }}>
                    <i />
                    <span>{toMinutesAndSeconds(totalTime, percentage)}</span>
                </div>
            }
        </div>
    );
};

export default ProgressWrapper;
