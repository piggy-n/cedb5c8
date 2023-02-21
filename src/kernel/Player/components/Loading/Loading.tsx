import s from './styles/loading.scss';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useContext } from 'react';
import { useVideoLoading } from '@/utils/hooks';

const Loading = () => {
    const {
        playerStore: {
            loading,
            buffering,
        },
        videoEleAttributes: {
            playing,
            networkState,
            readyState,
        },
        playerStoreDispatch,
        videoEle,
    } = useContext(PlayerContext);

    useVideoLoading(
        videoEle,
        playerStoreDispatch,
        !!buffering,
        playing,
        networkState,
        readyState,
    );

    return (
        loading
            ? <div className={s.container}>
                <p>正在加载中...</p>
            </div>
            : null
    );
};

export default Loading;
