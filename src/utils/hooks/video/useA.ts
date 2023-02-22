import { useRafInterval } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import type { Dispatch } from 'react';
import type { ControlsStoreState } from '@/utils/hooks/data/useControlsStore';

const useA = (
    ended: boolean,
    resizing: boolean,
    mouseIsMoving: boolean,
    mouseIsOnControls: boolean,
    dispatch: Dispatch<Partial<ControlsStoreState>>,
) => {
    const [inactivityKey, setInactivityKey] = useState(0);
    const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const controlsVisibleChangeHandler = () => {
        if (mouseIsMoving) {
            dispatch({
                mouseIsMoving: false,
                showControls: !resizing && !ended,
            });

            inactivityTimeoutRef.current && clearTimeout(inactivityTimeoutRef.current);
            inactivityTimeoutRef.current = setTimeout(
                () => setInactivityKey(inactivityKey + 1),
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
                dispatch({
                    showControls: false,
                });
            }
        },
        [inactivityKey],
    );
};

export default useA;
