import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import Icon from '@/components/Icon';

const PipGridBtn = () => {
    const {
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            mode,
        },
    } = useContext(RndPlayerContext);

    return (
        <Icon
            name={mode === 'pip' ? 'pip-2' : 'pip-1'}
            title={'画中画'}
            onClick={() => rndPlayerStoreDispatch({ mode: 'pip' })}
        />
    );
};

export default PipGridBtn;
