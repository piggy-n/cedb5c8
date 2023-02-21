import s from './styles/loading.scss';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useContext } from 'react';

const Loading = () => {
    const {
        playerStore: {
            loading
        }
    } = useContext(PlayerContext);

    return (
        loading
            ? <div className={s.container}>
                <p>正在加载中...</p>
            </div>
            : null
    );
};

export default Loading;
