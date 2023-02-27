import s from './styles/reloadControl.scss';
import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const ReloadControl = () => {
    const {
        videoEleAttributes: {
            currentTime,
        },
    } = useContext(PlayerContext);
    const { reloadHandler } = useContext(ControlsContext);

    return (
        <div className={s.container} onClick={() => reloadHandler(currentTime)}>
            重
        </div>
    );
};

export default ReloadControl;
