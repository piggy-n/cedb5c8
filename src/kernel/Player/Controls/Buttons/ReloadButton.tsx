import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const ReloadButton = () => {
    const {
        playerStore: {
            videoLoadFailedVal,
        },
    } = useContext(PlayerContext);

    if (!videoLoadFailedVal) return null;
    return (
        <h2>刷新</h2>
    );
};

export default ReloadButton;
