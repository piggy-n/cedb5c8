import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import Icon from '@/components/Icon';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const EndedButton = () => {
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

    if (!ended || videoLoadFailedVal || showPlayBtn) return null;
    return (
        <Icon name={'replay'} size={55} title={'重播'} />
    );
};

export default EndedButton;
