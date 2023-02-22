import { useContext, useMemo } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import type { Dispatch } from 'react';
import type { ControlsStoreState } from '@/utils/hooks/data/useControlsStore';

const useControlsMethods = (dispatch: Dispatch<Partial<ControlsStoreState>>) => {
    const {
        // wsPlayer,
        flvPlayer,
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

    const changePlayStatusHandler = () => {
        if (ended) {
            dispatch({
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

    return useMemo(
        () => ({
            changePlayStatusHandler,
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
