import s from './styles/progressWrapper.scss';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { toMinutesAndSeconds } from '@/utils/methods/common/times';
import { hoverStylesHandler } from '@/utils/methods/common/hoverStylesHandler';

const ProgressWrapper = () => {
    const {
        videoEleAttributes: {
            currentTime,
            totalTime,
            bufferedTime,
            networkState,
            readyState,
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
    const hoverStylesIntervalRef = useRef<NodeJS.Timer>();

    const bufferedPercentage = useMemo(
        () => [2, 3].includes(networkState) && readyState === 0
            ? 0
            : ((bufferedTime / totalTime) * 100).toString(),
        [
            bufferedTime,
            totalTime,
            networkState,
            readyState,
        ],
    );

    const processPercentage = useMemo(
        () => [2, 3].includes(networkState) && readyState === 0
            ? 0
            : ((currentTime / totalTime) * 100).toString(),
        [
            totalTime,
            currentTime,
            networkState,
            readyState,
        ],
    );

    useEffect(
        () => {
            if (progressWrapperEleRef.current && progressControlPointEleRef.current) {
                const progressWrapperEle = progressWrapperEleRef.current;
                const progressControlPointEle = progressControlPointEleRef.current;

                hoverStylesIntervalRef.current && clearInterval(hoverStylesIntervalRef.current);
                hoverStylesIntervalRef.current = setInterval(
                    () => {
                        hoverStylesHandler({
                            height: suspending ? 7 : 3,
                            opacity: suspending ? 1 : 0,
                            aniName: suspending ? 'example' : 'leave',
                            progressWrapperEle,
                            progressControlPointEle,
                        });
                    },
                    100,
                );
            }

            return () => {
                hoverStylesIntervalRef.current && clearInterval(hoverStylesIntervalRef.current);
            };
        },
        [suspending],
    );

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
