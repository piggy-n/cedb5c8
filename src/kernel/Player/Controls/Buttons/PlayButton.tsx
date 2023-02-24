import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const PlayButton = () => {
    const {
        controlsStore: {
            showPlayBtn,
        },
    } = useContext(ControlsContext);

    if (!showPlayBtn) return null;
    return (
        <h2>播放</h2>
    );
};

export default PlayButton;
