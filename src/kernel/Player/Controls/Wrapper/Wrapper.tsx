import s from './styles/wrapper.scss';
import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';

const Wrapper = () => {
    const { controlsStoreDispatch: dispatch } = useContext(ControlsContext);

    const clickHandler = () => {
        console.log('click');
    };

    return (
        <div
            className={s.container}
            onClick={clickHandler}
            onMouseMove={() => dispatch({
                mouseIsMoving: true,
                mouseIsOnControls: false,
            })}
            onMouseLeave={() => dispatch({ mouseIsMoving: false })}
        />
    );
};

export default Wrapper;
