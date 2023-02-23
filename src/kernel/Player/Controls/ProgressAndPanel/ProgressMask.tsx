import s from './styles/progressMask.scss';
import { MouseEventHandler, useContext, useEffect, useRef } from 'react';
import { useWindowClient } from '@/utils/hooks';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { percentToSeconds } from '@/utils/methods/common/times';

const ProgressMask = () => {
    const {
        videoEle,
        flvPlayer,
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
    const draggingIntervalRef = useRef<NodeJS.Timer>();
    const progressMaskEleRef = useRef<HTMLDivElement | null>(null);

    const mouseDownHandler = () => {
        if (!canplay) return;

        draggingIntervalRef.current && clearInterval(draggingIntervalRef.current);
        draggingIntervalRef.current = setInterval(
            () => {
                if (!videoEle || !progressMaskEleRef.current) return;

                const { offsetWidth } = progressMaskEleRef.current;
                const position = clientX - progressMaskEleRef.current.getBoundingClientRect().left + 1;

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
            flvPlayer.play();

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
        if (progressMaskEleRef.current) {
            const position = e.clientX - progressMaskEleRef.current.getBoundingClientRect().left + 1;

            controlsStoreDispatch({
                position,
                percentage: position / progressMaskEleRef.current.offsetWidth,
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

            return () => {
                draggingIntervalRef.current && clearInterval(draggingIntervalRef.current);
                removeEventListener('mouseup', mouseUpHandler);
            };
        },
        [
            currentTime,
            totalTime,
            dragging,
        ],
    );

    return (
        <div
            ref={progressMaskEleRef}
            className={s.container}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            onMouseMove={(e) => mouseMoveHandler(e)}
            onMouseLeave={mouseLeaveHandler}
            onClick={clickHandler}
        />
    );
};

export default ProgressMask;
