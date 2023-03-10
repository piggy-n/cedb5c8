import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import Icon from '@/components/Icon';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const ReloadButton = () => {
    const {
        playerStore: {
            videoLoadFailedVal,
        },
    } = useContext(PlayerContext);
    const {
        controlsStore: {
            showPlayBtn,
            showEndedBtn,
        },
    } = useContext(ControlsContext);

    if (!videoLoadFailedVal || showPlayBtn || showEndedBtn) return null;
    return (
        <Icon name={'reload-2'} size={55} title={'重载'} />
    );
};

export default ReloadButton;
