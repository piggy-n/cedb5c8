import { useContext, useEffect, useMemo, useRef } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { hoverStylesHandler } from '@/utils/methods/common/hoverStylesHandler';
import { useLatest } from 'ahooks';

const useControlsProgressStyles = (
    progressWrapperEle: HTMLDivElement | null,
    progressControlPointEle: HTMLDivElement | null,
) => {
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
            suspending,
        },
    } = useContext(ControlsContext);

    const latestProgressWrapperEleRef = useLatest(progressWrapperEle);
    const latestProgressControlPointEleRef = useLatest(progressControlPointEle);
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
            if (latestProgressWrapperEleRef.current && latestProgressControlPointEleRef.current) {
                const progressWrapperEle = latestProgressWrapperEleRef.current;
                const progressControlPointEle = latestProgressControlPointEleRef.current;

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

    return useMemo(
        () => ({
            bufferedPercentage,
            processPercentage,
        }),
        [
            bufferedPercentage,
            processPercentage,
        ],
    );
};

export default useControlsProgressStyles;
