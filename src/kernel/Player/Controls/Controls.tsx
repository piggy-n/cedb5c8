import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
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
        playerStoreDispatch: dispatch,
        videoEleAttributes: {
            ended,
        }
    } = useContext(PlayerContext);

    return (
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
    );
};

export default Controls;
