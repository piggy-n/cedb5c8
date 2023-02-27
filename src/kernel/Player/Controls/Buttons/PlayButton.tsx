import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import Icon from '@/components/Icon';

const PlayButton = () => {
    const {
        controlsStore: {
            showPlayBtn,
        },
    } = useContext(ControlsContext);

    if (!showPlayBtn) return null;
    return (
        <Icon name={'play-2'} size={55} title={'播放'} />
    );
};

export default PlayButton;
