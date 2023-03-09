import Icon from '@/components/Icon';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const SingleGridBtn = () => {
    const {
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            mode,
            players,
        },
    } = useContext(RndPlayerContext);

    const clickHandler = () => {
        const copyPlayers = [...players];
        const subPlayer = copyPlayers.find((item) => !item.isMainPlayer);
        if (subPlayer) {
            subPlayer.url = '';
            rndPlayerStoreDispatch({
                players: copyPlayers,
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
