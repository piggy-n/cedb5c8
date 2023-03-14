import Icon from '@/components/Icon';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const SingleGridBtn = () => {
    const {
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            mode,
            players,
            selectedStreamList,
        },
    } = useContext(RndPlayerContext);

    const clickHandler = () => {
        const copyPlayers = [...players];
        const copySelectedStreamList = [...selectedStreamList];
        const subPlayer = copyPlayers.find(item => !item.isMainPlayer);

        if (subPlayer) {
            const index = copySelectedStreamList.findIndex(item => item === subPlayer.url);
            if (index !== -1) copySelectedStreamList.splice(index, 1);
            subPlayer.url = '';
            rndPlayerStoreDispatch({
                players: copyPlayers,
                selectedStreamList: copySelectedStreamList,
            });
        }

        rndPlayerStoreDispatch({
            mode: 'sg',
        });
    };

    return (
        <Icon
            name={mode === 'sg' ? 'sg-2' : 'sg-1'}
            title={'单宫'}
            onClick={clickHandler}
        />
    );
};

export default SingleGridBtn;
