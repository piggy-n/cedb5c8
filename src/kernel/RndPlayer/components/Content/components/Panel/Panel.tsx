import { randomString } from '@/utils/methods/common/randomString';
import { useContext, useEffect } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { ItemProps } from '@/kernel/RndPlayer/components/Content/components/Players/Item';

const Panel = () => {
    const {
        rndPlayerStore: {
            videoMinWidth,
            videoMinHeight,
            players,
        },
        rndPlayerStoreDispatch,
        rndEle,
    } = useContext(RndPlayerContext);

    const playerItem: ItemProps = {
        minWidth: videoMinWidth,
        minHeight: videoMinHeight,
        id: randomString(),
    };

    const change = () => {
        const player = players.reverse();
        rndPlayerStoreDispatch({
            players: player,
        });
    };

    const add = () => {
        const player = [...players];
        player.push(playerItem);
        rndPlayerStoreDispatch({
            players: player,
        });
    };

    const del = () => {
        const player = [...players];
        player.splice(player.length - 1, 1);
        console.log(player);
        rndPlayerStoreDispatch({
            players: player,
        });
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
