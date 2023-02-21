import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import c from 'classnames';
import s from './styles/controls.scss';

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
                Controls
            </div>
            : null
    );

};

export default Controls;
