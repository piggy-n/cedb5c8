import s from './styles/reloadControl.scss';
import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import Icon from '@/components/Icon';

const ReloadControl = () => {
    const {
        videoEleAttributes: {
            currentTime,
        },
    } = useContext(PlayerContext);
    const { reloadHandler } = useContext(ControlsContext);

    return (
        <div className={s.container} onClick={() => reloadHandler(currentTime)}>
            <Icon name={'reload-1'} size={18} title={'重载'} />
        </div>
    );
};

export default ReloadControl;
