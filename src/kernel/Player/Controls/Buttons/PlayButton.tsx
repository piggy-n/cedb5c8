import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import Icon from '@/components/Icon';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const PlayButton = () => {
    const {
        playerStore: {
            videoLoadFailedVal,
        },
    } = useContext(PlayerContext);
    const {
        controlsStore: {
            showPlayBtn,
            showEndedBtn
        },
    } = useContext(ControlsContext);

    if (!showPlayBtn || videoLoadFailedVal || showEndedBtn) return null;
    return (
        <Icon name={'play-2'} size={55} title={'播放'} />
    );
};

export default PlayButton;
