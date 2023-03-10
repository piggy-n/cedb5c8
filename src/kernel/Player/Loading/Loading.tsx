import s from './styles/loading.scss';
import Icon from '@/components/Icon';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useContext } from 'react';

const Loading = () => {
    const {
        playerStore: {
            loading,
        },
    } = useContext(PlayerContext);

    if (!loading) return null;
    return (
        <div className={s.container}>
            <Icon name={'loading'} size={24} />
            <p>正在加载中...</p>
        </div>
    );
};

export default Loading;
