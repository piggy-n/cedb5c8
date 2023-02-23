import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const EndedButton = () => {
    const {
        videoEleAttributes: {
            ended,
        },
    } = useContext(PlayerContext);

    if (!ended) return null;
    return (
        <h2>重播</h2>
    );
};

export default EndedButton;
