import s from './styles/qualityViewer.scss';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useContext } from 'react';
import { useVideoResolution } from '@/utils/hooks';

const QualityViewer = () => {
    const {
        playerStore: {
            videoWidth,
            videoHeight,
        },
    } = useContext(PlayerContext);

    const quality = useVideoResolution(videoWidth, videoHeight);

    if (!quality) return null;
    return (
        <div className={s.container}>
            {quality}
        </div>
    );
};

export default QualityViewer;
