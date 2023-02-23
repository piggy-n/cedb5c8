import { useContext, useMemo, useRef } from 'react';
import { useUnmount } from 'ahooks';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { fullscreen } from '@/utils/methods/common/fullscreen';
import type { Dispatch } from 'react';
import type { ControlsStoreState } from '@/utils/hooks/data/useControlsStore';

const useControlsMethods = (controlsStoreDispatch: Dispatch<Partial<ControlsStoreState>>) => {
    const {
        // wsPlayer,
        flvPlayer,
        videoContainerEle,
        playerStoreDispatch,
        playerStore: {
            url = '',
            canplay,
            resizing,
            videoType,
        },
        videoEleAttributes: {
            ended,
            playing,
        },
    } = useContext(PlayerContext);

    const wrapperClickCountRef = useRef(0);
    const wrapperClickTimeoutRef = useRef<NodeJS.Timeout>();

    const changePlayStatusHandler = () => {
        if (ended) {
            controlsStoreDispatch({
                showControls: !resizing,
            });
        }

        if (videoType === 'record') {
            if (canplay) return playing
                ? flvPlayer.pause()
                : flvPlayer.play();

            return flvPlayer.player
                ? flvPlayer.stop()
                : flvPlayer.start(url);
        }
    };

    const wrapperClickHandler = () => {
        wrapperClickCountRef.current += 1;

        wrapperClickTimeoutRef.current && clearTimeout(wrapperClickTimeoutRef.current);
        wrapperClickTimeoutRef.current = setTimeout(
            async () => {
                if (wrapperClickCountRef.current === 1) {
                    changePlayStatusHandler();
                }

                if (wrapperClickCountRef.current === 2) {
                    const isFullscreen = await fullscreen(videoContainerEle);

                    playerStoreDispatch({
                        isFullscreen,
                    });
                }

                wrapperClickCountRef.current = 0;
            },
            250,
        );
    };

    useUnmount(() => {
        wrapperClickTimeoutRef.current && clearTimeout(wrapperClickTimeoutRef.current);
    });

    return useMemo(
        () => ({
            changePlayStatusHandler,
            wrapperClickHandler,
        }),
        [
            ended,
            playing,
            canplay,
            resizing,
            videoType,
            url,
        ],
    );
};

export default useControlsMethods;
