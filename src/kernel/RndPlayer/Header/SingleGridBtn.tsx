import Icon from '@/components/Icon';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const SingleGridBtn = () => {
    const {
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            mode,
        },
    } = useContext(RndPlayerContext);

    return (
        <Icon
            name={mode === 'sg' ? 'sg-2' : 'sg-1'}
            title={'单宫'}
            onClick={() => rndPlayerStoreDispatch({ mode: 'sg' })}
        />
    );
};

export default SingleGridBtn;
