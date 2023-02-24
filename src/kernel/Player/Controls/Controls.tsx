import c from 'classnames';
import s from './styles/controls.scss';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import {
    ControlsContext,
    controlsContextDefaultValue,
} from '@/utils/hooks/data/useControlsContext';
import { useControlsMethods, useControlsStore } from '@/utils/hooks';
import { Buttons, ProgressAndPanel, Wrapper } from '@/kernel/Player/Controls/index';

const Controls = () => {
    const {
        controlsOpts,
        playerStore: {
            url,
            resizing,
        },
        videoEleAttributes: {
            ended,
        },
    } = useContext(PlayerContext);

    const [store, dispatch] = useControlsStore();

    const controlsMethods = useControlsMethods(dispatch); // 控制面板的方法

    if (!(!!controlsOpts && !!url)) return null;
    return (
        <ControlsContext.Provider value={{
            ...controlsContextDefaultValue,
            controlsStore: store,
            controlsStoreDispatch: dispatch,
            ...controlsMethods,
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
