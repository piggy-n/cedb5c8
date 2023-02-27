import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import Icon from '@/components/Icon';

const EndedButton = () => {
    const {
        videoEleAttributes: {
            ended,
        },
    } = useContext(PlayerContext);

    if (!ended) return null;
    return (
        <Icon name={'replay'} size={55} title={'重播'} />
    );
};

export default EndedButton;
