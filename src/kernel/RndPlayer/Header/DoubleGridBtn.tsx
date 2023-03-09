import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import Icon from '@/components/Icon';

const DoubleGridBtn = () => {
    const {
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            mode,
        },
    } = useContext(RndPlayerContext);

    return (
        <Icon
            name={mode === 'db' ? 'db-2' : 'db-1'}
            title={'双宫'}
            onClick={() => rndPlayerStoreDispatch({ mode: 'db' })}
        />
    );
};

export default DoubleGridBtn;
