import { useContext, useEffect, useMemo, useRef } from 'react';
import { useLatest } from 'ahooks';
import { useWindowClient } from '@/utils/hooks';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { percentToSeconds } from '@/utils/methods/common/times';
import type { MouseEventHandler } from 'react';

const useProgressMethods = (ele: HTMLDivElement | null) => {
    const {
        videoEle,
        playerStoreDispatch,
        playerStore: {
            canplay,
        },
        videoEleAttributes: {
            totalTime,
            currentTime,
        },
    } = useContext(PlayerContext);
    const {
        controlsStore: {
            dragging,
            percentage,
        },
        controlsStoreDispatch,
    } = useContext(ControlsContext);

    const { clientX } = useWindowClient();
    const latestClientXRef = useLatest(clientX);
    const latestProgressMaskEleRef = useLatest(ele);
    const draggingIntervalRef = useRef<NodeJS.Timer>();

    const mouseDownHandler = () => {
        if (!canplay) return;

        draggingIntervalRef.current && clearInterval(draggingIntervalRef.current);
        draggingIntervalRef.current = setInterval(
            () => {
                if (!videoEle || !latestProgressMaskEleRef.current) return;

                const { offsetWidth } = latestProgressMaskEleRef.current;
                const position = latestClientXRef.current - latestProgressMaskEleRef.current.getBoundingClientRect().left + 1;

                if (position >= 0 && position <= offsetWidth) {
                    const percentage = position / offsetWidth;
                    videoEle.currentTime = percentToSeconds(percentage, totalTime);

                    controlsStoreDispatch({
                        position,
                        percentage,
                        dragging: true,
                        suspending: true,
                    });
                }

                if (position < 0) {
                    videoEle.currentTime = 0;
                }

                if (position > offsetWidth) {
                    videoEle.currentTime = totalTime;
                }

                playerStoreDispatch({
                    progressMouseDownVal: Date.now(),
                });
            },
            1,
        );
    };

    const mouseUpHandler = () => {
        draggingIntervalRef.current && clearInterval(draggingIntervalRef.current);

        if (currentTime < totalTime && dragging) {
            playerStoreDispatch({
                progressMouseUpVal: Date.now(),
            });

            controlsStoreDispatch({
                dragging: false,
            });
        }

        controlsStoreDispatch({
            suspending: false,
        });
    };

    const mouseMoveHandler: MouseEventHandler = (e) => {
        if (latestProgressMaskEleRef.current) {
            const position = e.clientX - latestProgressMaskEleRef.current.getBoundingClientRect().left + 1;

            controlsStoreDispatch({
                position,
                percentage: position / latestProgressMaskEleRef.current.offsetWidth,
                suspending: true,
            });
        }
    };

    const mouseLeaveHandler = () => {
        controlsStoreDispatch({
            suspending: false,
        });
    };

    const clickHandler = () => {
        if (!canplay || !videoEle) return;

        videoEle.currentTime = percentToSeconds(percentage, totalTime);

        controlsStoreDispatch({
            suspending: true,
        });
    };

    useEffect(
        () => {
            addEventListener('mouseup', mouseUpHandler);

            return () => removeEventListener('mouseup', mouseUpHandler);
        },
        [],
    );

    return useMemo(
        () => ({
            mouseDownHandler,
            mouseUpHandler,
            mouseMoveHandler,
            mouseLeaveHandler,
            clickHandler,
        }),
        [
            canplay,
            dragging,
            percentage,
            currentTime,
            totalTime,
        ],
    );
};

export default useProgressMethods;
