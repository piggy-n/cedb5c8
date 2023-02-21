import s from './styles/wrapper.scss';
import { useRafInterval } from 'ahooks';
import { useContext, useRef } from 'react';
import { fullscreen } from '@/utils/methods/common/fullscreen';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const Wrapper = () => {
    const {
        videoContainerEle,
        playerStoreDispatch,
        playerStore: {
            resizing,
        },
        videoEleAttributes: {
            ended,
        }
    } = useContext(PlayerContext);
    const {
        controlsStoreDispatch,
        changePlayStatusHandler,
        controlsStore: {
            mouseIsMoving,
            mouseIsOnControls,
        }
    } = useContext(ControlsContext);

    const clickCountRef = useRef(0);
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clickHandler = () => {
        clickCountRef.current += 1;

        clickTimeoutRef.current && clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(
            async () => {
                if (clickCountRef.current === 1) {
                    changePlayStatusHandler();
                }

                if (clickCountRef.current === 2) {
                    const isFullscreen = await fullscreen(videoContainerEle);

                    playerStoreDispatch({
                        isFullscreen,
                    });
                }

                clickCountRef.current = 0;
            },
            250,
        );
    };

    const controlsVisibleChangeHandler = () => {
        if (mouseIsMoving) {
            controlsStoreDispatch({
                mouseIsMoving: false,
                showControls: !resizing && !ended,
            });

            inactivityTimeoutRef.current && clearTimeout(inactivityTimeoutRef.current);
            inactivityTimeoutRef.current = setTimeout(
                () => {
                    if (!mouseIsMoving && !mouseIsOnControls) {
                        controlsStoreDispatch({
                            showControls: false,
                        });
                    }
                },
                5000,
            );
        }
    };

    useRafInterval(
        controlsVisibleChangeHandler,
        200,
        {
            immediate: true,
        }
    );

    return (
        <div
            className={s.container}
            onClick={clickHandler}
            onMouseMove={() => controlsStoreDispatch({
                mouseIsMoving: true,
                mouseIsOnControls: false,
            })}
            onMouseLeave={() => controlsStoreDispatch({ mouseIsMoving: false })}
        />
    );
};

export default Wrapper;
