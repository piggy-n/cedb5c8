import s from './styles/buttons.scss';
import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { EndedButton, PlayButton, ReloadButton } from '@/kernel/Player/Controls/Buttons/index';

const Buttons = () => {
    const { changePlayStatusHandler } = useContext(ControlsContext);

    return (
        <div className={s.container} onClick={changePlayStatusHandler}>
            <PlayButton />
            <EndedButton />
            <ReloadButton />
        </div>
    );
};

export default Buttons;
