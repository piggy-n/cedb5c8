import s from './styles/wrapper.scss';
import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const Wrapper = () => {
    const {
        controlsStoreDispatch: dispatch,
        changePlayStatusHandler
    } = useContext(ControlsContext);

    return (
        <div
            className={s.container}
            onClick={changePlayStatusHandler}
            onMouseMove={() => dispatch({
                mouseIsMoving: true,
                mouseIsOnControls: false,
            })}
            onMouseLeave={() => dispatch({ mouseIsMoving: false })}
        />
    );
};

export default Wrapper;
