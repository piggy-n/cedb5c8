import s from './styles/buttons.scss';
import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const Buttons = () => {
    const { changePlayStatusHandler } = useContext(ControlsContext);

    return (
        <div className={s.container} onClick={changePlayStatusHandler}>

        </div>
    );
};

export default Buttons;
