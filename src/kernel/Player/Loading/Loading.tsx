import s from './styles/loading.scss';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useContext } from 'react';
import { useVideoLoading } from '@/utils/hooks';

const Loading = () => {
    const {
        videoEle,
        playerStoreDispatch,
        playerStore: {
            loading,
            buffering,
        },
        videoEleAttributes: {
            playing,
            networkState,
            readyState,
        },
    } = useContext(PlayerContext);

    useVideoLoading(
        videoEle,
        playerStoreDispatch,
        !!buffering,
        playing,
        networkState,
        readyState,
    );

    if (!loading) return null;
    return (
        <div className={s.container}>
            <p>正在加载中...</p>
        </div>
    );
};

export default Loading;
