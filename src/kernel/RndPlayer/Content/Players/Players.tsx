import s from './styles/players.scss';
import { useContext, useMemo } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { Item } from '@/kernel/RndPlayer/Content/Players/index';

const Players = () => {
    const {
        rndPlayerStore: {
            players,
        },
    } = useContext(RndPlayerContext);

    const flexDirection = useMemo(
        () => {
            const [player] = players;
            if (!player || player.isMainPlayer) return 'row';
            return 'row-reverse';
        },
        [players],
    );

    return (
        <div className={s.container} style={{ flexDirection }}>
            {
                players.map((props, index) => <Item {...props} key={`p___${index}`} />)
            }
        </div>
    );
};

export default Players;
