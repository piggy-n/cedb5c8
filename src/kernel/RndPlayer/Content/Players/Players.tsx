import s from './styles/players.scss';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const Players = () => {
    const {
        rndPlayerStore: {
            players,
        },
    } = useContext(RndPlayerContext);

    return (
        <div className={s.container}>
            {
                players.map(player => {
                    const { render, ...r } = player;
                    const Component = render;
                    return <Component {...r} />;
                })
            }
        </div>
    );
};

export default Players;
