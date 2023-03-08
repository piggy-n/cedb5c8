import s from './styles/players.scss';
import { Item } from '@/kernel/RndPlayer/Content/Players';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const Players = () => {
    const {
        rndPlayerStore: {
            players,
        },
    } = useContext(RndPlayerContext);

    return (
        <div className={s.container} id={'rnd-players-container'}>
            {
                players.map((props, index) => <Item {...props} key={`p___${index}`} />)
            }
        </div>
    );
};

export default Players;