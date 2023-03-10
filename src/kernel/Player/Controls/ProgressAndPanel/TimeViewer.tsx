import s from './styles/timeViewer.scss';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useContext } from 'react';
import { toMinutesAndSeconds } from '@/utils/methods/common/times';

const TimeViewer = () => {
    const {
        playerStore: {
            videoType,
            streamRecordCurrentTime,
        },
        videoEleAttributes: {
            currentTime,
            totalTime,
        },
    } = useContext(PlayerContext);

    if (videoType === 'live') return <div className={s.container}>实时</div>;
    if (videoType === 'stream-record') return (
        <div className={s.container}>
            <div className={s.time}>
                录像
                &nbsp;
                {toMinutesAndSeconds(streamRecordCurrentTime ?? 0)}
            </div>
        </div>
    );
    return (
        <div className={s.container}>
            <div className={s.time}>
                {toMinutesAndSeconds(currentTime)}
                &nbsp;/&nbsp;
                {toMinutesAndSeconds(totalTime)}
            </div>
        </div>
    );
};

export default TimeViewer;
