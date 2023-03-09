import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const Panel = () => {
    const {
        rndPlayerStore: {
            players,
        },
        rndPlayerStoreDispatch,
        rndEle,
    } = useContext(RndPlayerContext);

    // const playerItem: ItemProps = {
    //     minWidth: videoMinWidth,
    //     minHeight: videoMinHeight,
    //     isMainPlayer: false,
    //     url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    // };

    const change = () => {
        const player = players.reverse();
        rndPlayerStoreDispatch({
            players: player,
        });
    };

    const add = () => {
        const url = Math.random() > 0.5
            ? 'https://www.w3schools.com/html/mov_bbb.mp4'
            : 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4';
        const player = [...players];
        const emptyPlayer = player.find((item) => !item.url);
        if (emptyPlayer) {
            emptyPlayer.url = url;
            rndPlayerStoreDispatch({
                players: player,
            });
        }
    };

    const del = () => {
        // const player = [...players];
        // player.splice(player.length - 1, 1);
        // console.log(player);
        // rndPlayerStoreDispatch({
        //     players: player,
        // });
    };

    useEffect(() => {
        console.log(rndEle);
    }, [rndEle]);

    return (
        <div style={{
            position: 'absolute',
            width: '300px',
            height: '200px',
            border: '1px solid red',
            top: '600px',
        }}>
            <button onClick={add}>add</button>
            <button onClick={change}>change</button>
            <button onClick={del}>del</button>
        </div>
    );
};

export default Panel;
