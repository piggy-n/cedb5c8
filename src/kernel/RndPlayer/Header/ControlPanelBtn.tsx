import Icon from '@/components/Icon';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const ControlPanelBtn = () => {
    const {
        rndPlayerStore: {
            serviceObj: {
                ptz,
            },
        },
    } = useContext(RndPlayerContext);
    console.log('ptz', ptz);
    // if (!ptz) return null;
    return (
        <Icon
            name={true ? 'control-2' : 'control-1'}
            title={'控制面板'}
            onClick={() => {
                console.log('click');
            }}
        />
    );
};

export default ControlPanelBtn;
