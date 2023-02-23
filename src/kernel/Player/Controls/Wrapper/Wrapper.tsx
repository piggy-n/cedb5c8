import s from './styles/wrapper.scss';
import { useContext, useRef } from 'react';
import { fullscreen } from '@/utils/methods/common/fullscreen';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const Wrapper = () => {
    const { videoContainerEle, playerStoreDispatch } = useContext(PlayerContext);
    const { controlsStoreDispatch, changePlayStatusHandler } = useContext(ControlsContext);

    const clickCountRef = useRef(0);
    const clickTimeoutRef = useRef<NodeJS.Timeout>();

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
