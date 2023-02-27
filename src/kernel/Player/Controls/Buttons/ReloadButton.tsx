import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import Icon from '@/components/Icon';

const ReloadButton = () => {
    const {
        playerStore: {
            videoLoadFailedVal,
        },
    } = useContext(PlayerContext);

    if (!videoLoadFailedVal) return null;
    return (
        <Icon name={'reload-2'} size={55} title={'重载'} />
    );
};

export default ReloadButton;
