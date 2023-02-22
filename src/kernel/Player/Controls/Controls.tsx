import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import {
    ControlsContext,
    controlsContextDefaultValue,
} from '@/utils/hooks/data/useControlsContext';
import { useControlsMethods, useControlsStore } from '@/utils/hooks';
import c from 'classnames';
import s from './styles/controls.scss';
import Wrapper from '@/kernel/Player/Controls/Wrapper';
import Buttons from '@/kernel/Player/Controls/Buttons';
import ProgressAndPanel from '@/kernel/Player/Controls/ProgressAndPanel';

const Controls = () => {
    const {
        controlsOpts,
        playerStore: {
            url = '',
            resizing,
        },
        videoEleAttributes: {
            ended,
        },
    } = useContext(PlayerContext);

    const [store, dispatch] = useControlsStore();

    const { changePlayStatusHandler } = useControlsMethods(dispatch); // 控制面板的方法

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
