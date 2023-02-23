import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useContext, useEffect, useRef, useState } from 'react';

const PlayButton = () => {
    const {
        playerStore: {
            loading,
            videoLoadFailedVal,
        },
        videoEleAttributes: {
            ended,
            playing,
        },
    } = useContext(PlayerContext);

    const visibleTimeoutRef = useRef<NodeJS.Timeout>();
    const [visible, setVisible] = useState(false);

    useEffect(
        () => {
            const isPlaying = playing && !ended;
            const isPaused = !playing && !ended && !loading && !videoLoadFailedVal;

            visibleTimeoutRef.current && clearTimeout(visibleTimeoutRef.current);

            if (isPlaying || loading) {
                setVisible(false);
            }

            if (isPaused) {
                visibleTimeoutRef.current = setTimeout(
                    () => setVisible(true),
                    100,
                );
            }
        },
        [
            playing,
            ended,
            loading,
        ],
    );

    if (!visible) return null;
    return (
        <h2>播放</h2>
    );
};

export default PlayButton;
