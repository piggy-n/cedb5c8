import { useContext, useEffect, useRef } from 'react';
import { FlvPlayer, WsPlayer } from '@/utils/players';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const Init = () => {
    const {
        uuid,
        videoEle,
        playerStore: {
            wsPlayer,
            flvPlayer,
        },
        playerStoreDispatch: dispatch,
    } = useContext(PlayerContext);

    const wsPlayerRef = useRef<WsPlayer>(
        new WsPlayer({ uuid, dispatch }),
    );
    const flvPlayerRef = useRef<FlvPlayer>(
        new FlvPlayer({ uuid, dispatch }),
    );

    useEffect(
        () => {
            dispatch({
                wsPlayer: wsPlayerRef.current,
                flvPlayer: flvPlayerRef.current,
            });
        },
        [],
    );

    useEffect(
        () => {
            if (!videoEle || !wsPlayer || !flvPlayer) return;

            wsPlayer.init(videoEle);
            flvPlayer.init(videoEle);

            return () => {
                wsPlayer.destroy();
                flvPlayer.destroy();
            };
        },
        [videoEle, wsPlayer, flvPlayer],
    );

    return null;
};

export default Init;
