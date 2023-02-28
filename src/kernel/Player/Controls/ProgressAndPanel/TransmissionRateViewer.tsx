import s from './styles/transmissionRateViewer.scss';
import { useContext, useMemo } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const TransmissionRateViewer = () => {
    const {
        playerStore: {
            transmissionRate = 0,
            videoType,
            canplay,
        },
    } = useContext(PlayerContext);

    const rate = useMemo(
        () => transmissionRate >= 1024
            ? `${(transmissionRate / 1024).toFixed(2)}Mbps`
            : `${transmissionRate.toFixed(2)}Kbps`,
        [transmissionRate],
    );

    if (videoType === 'record' || !canplay) return null;
    return (
        <div className={s.container}>
            {rate}
        </div>
    );
};

export default TransmissionRateViewer;
