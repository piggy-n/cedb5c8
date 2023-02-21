import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import {
    ControlsContext,
    controlsContextDefaultValue
} from '@/utils/hooks/data/useControlsContext';
import { useControlsStore } from '@/utils/hooks';
import c from 'classnames';
import s from './styles/controls.scss';
import Wrapper from '@/kernel/Player/Controls/Wrapper';
import Buttons from '@/kernel/Player/Controls/Buttons';
import ProgressAndPanel from '@/kernel/Player/Controls/ProgressAndPanel';

const Controls = () => {
    const {
        controlsOpts,
        playerStore: {
            url,
            resizing
        },
        videoEleAttributes: {
            ended,
        }
    } = useContext(PlayerContext);

    const [store, dispatch] = useControlsStore();

    return (
        <ControlsContext.Provider value={{
            ...controlsContextDefaultValue,
            controlsStore: store,
            controlsStoreDispatch: dispatch,
        }}>
            {
                !!controlsOpts && !!url
                    ? <div
                        className={c(s.container, { [s.mask]: ended })}
                        onMouseEnter={() => dispatch({ showControls: !resizing && !ended })}
                        onMouseLeave={() => dispatch({ showControls: false })}
                    >
                        <Wrapper />
                        <Buttons />
                        <ProgressAndPanel />
                    </div>
                    : null
            }
        </ControlsContext.Provider>
    );
};

export default Controls;
