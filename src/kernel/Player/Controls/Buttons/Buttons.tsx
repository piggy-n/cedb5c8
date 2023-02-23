import s from './styles/buttons.scss';
import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import PlayButton from '@/kernel/Player/Controls/Buttons/PlayButton';
import EndedButton from '@/kernel/Player/Controls/Buttons/EndedButton';
import ReloadButton from '@/kernel/Player/Controls/Buttons/ReloadButton';

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
