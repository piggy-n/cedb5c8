import Icon from '@/components/Icon';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const VideoPanelBtn = () => {
    const {
        rndPlayerStore: {
            serviceObj: {
                videoRecord,
            },
        },
    } = useContext(RndPlayerContext);

    console.log('videoRecord', videoRecord);
    // if (!videoRecord) return null;
    return (
        <Icon
            name={true ? 'video-2' : 'video-1'}
            title={'录像列表'}
            onClick={() => {
                console.log(1);
            }}
        />
    );
};

export default VideoPanelBtn;
