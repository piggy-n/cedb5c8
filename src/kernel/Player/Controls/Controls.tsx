import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import {
    ControlsContext,
    controlsContextDefaultValue,
} from '@/utils/hooks/data/useControlsContext';
import { useControlsStore } from '@/utils/hooks';
import c from 'classnames';
import s from './styles/controls.scss';
import Wrapper from '@/kernel/Player/Controls/Wrapper';
import Buttons from '@/kernel/Player/Controls/Buttons';
import ProgressAndPanel from '@/kernel/Player/Controls/ProgressAndPanel';
import useA from '@/utils/hooks/video/useA';

const Controls = () => {
    const {
        flvPlayer,
        controlsOpts,
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

    const [store, dispatch] = useControlsStore();

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
        // todo other video type
    };

    useA(
        ended,
        !!resizing,
        store.mouseIsMoving,
        store.mouseIsOnControls,
        dispatch,
    );

    if (!(!!controlsOpts && !!url)) return null;
    return (
        <ControlsContext.Provider value={{
            ...controlsContextDefaultValue,
            controlsStore: store,
            controlsStoreDispatch: dispatch,
            changePlayStatusHandler,
        }}>
            <div
                className={c(s.container, { [s.mask]: ended })}
                onMouseEnter={() => dispatch({ showControls: !resizing && !ended })}
                onMouseLeave={() => dispatch({ showControls: false })}
            >
                <Wrapper />
                <Buttons />
                <ProgressAndPanel />
            </div>
        </ControlsContext.Provider>
    );
};

export default Controls;
