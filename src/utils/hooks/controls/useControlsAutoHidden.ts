import { useRafInterval } from 'ahooks';
import { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const useControlsAutoHidden = () => {
    const {
        playerStore: {
            resizing,
        },
        videoEleAttributes: {
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

    const [hiddenKey, setHiddenKey] = useState(0);

    const hiddenTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const controlsVisibleChangeHandler = () => {
        if (mouseIsMoving) {
            controlsStoreDispatch({
                mouseIsMoving: false,
                showControls: !resizing && !ended,
            });

            hiddenTimeoutRef.current && clearTimeout(hiddenTimeoutRef.current);
            hiddenTimeoutRef.current = setTimeout(
                () => setHiddenKey(hiddenKey + 1),
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

    useEffect(
        () => {
            if (!mouseIsMoving && !mouseIsOnControls) {
                controlsStoreDispatch({
                    showControls: false,
                });
            }
        },
        [hiddenKey],
    );
};

export default useControlsAutoHidden;
