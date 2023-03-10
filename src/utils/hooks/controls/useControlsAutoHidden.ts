import { useLatest, useRafInterval, useUnmount } from 'ahooks';
import { useContext, useRef } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const useControlsAutoHidden = () => {
    const {
        playerStore: {
            resizing,
            ended,
        },
    } = useContext(PlayerContext);
    const {
        controlsStoreDispatch,
        controlsStore: {
            mouseIsMoving,
            mouseIsOnControls,
        },
    } = useContext(ControlsContext);

    const hiddenTimeoutRef = useRef<NodeJS.Timeout>();
    const latestMouseIsMovingRef = useLatest(mouseIsMoving);
    const latestMouseIsOnControlsRef = useLatest(mouseIsOnControls);

    const controlsVisibleChangeHandler = () => {
        if (mouseIsMoving) {
            controlsStoreDispatch({
                mouseIsMoving: false,
                showControls: !resizing && !ended,
            });

            hiddenTimeoutRef.current && clearTimeout(hiddenTimeoutRef.current);
            hiddenTimeoutRef.current = setTimeout(
                () => {
                    if (
                        !latestMouseIsMovingRef.current &&
                        !latestMouseIsOnControlsRef.current
                    ) {
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
        },
    );

    useUnmount(() => {
        hiddenTimeoutRef.current && clearTimeout(hiddenTimeoutRef.current);
    });
};

export default useControlsAutoHidden;
