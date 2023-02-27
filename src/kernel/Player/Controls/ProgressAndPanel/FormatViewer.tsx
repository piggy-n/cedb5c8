import s from './styles/formatViewer.scss';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const FormatViewer = () => {
    const {
        playerStore: {
            mime,
        },
    } = useContext(PlayerContext);

    if (!mime) return null;
    return (
        <div className={s.container}>
            {mime}
        </div>
    );
};

export default FormatViewer;
