import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import Icon from '@/components/Icon';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const ReloadButton = () => {
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

    if (!videoLoadFailedVal || showPlayBtn || ended) return null;
    return (
        <Icon name={'reload-2'} size={55} title={'重载'} />
    );
};

export default ReloadButton;
