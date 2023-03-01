import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import Icon from '@/components/Icon';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const PlayButton = () => {
    const {
        playerStore: {
            videoLoadFailedVal,
        },
        videoEleAttributes: {
            ended,
        },
    } = useContext(PlayerContext);
    const {
        controlsStore: {
            showPlayBtn,
        },
    } = useContext(ControlsContext);

    if (!showPlayBtn || videoLoadFailedVal || ended) return null;
    return (
        <Icon name={'play-2'} size={55} title={'播放'} />
    );
};

export default PlayButton;
