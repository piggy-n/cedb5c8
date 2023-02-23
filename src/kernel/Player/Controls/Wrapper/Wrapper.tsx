import s from './styles/wrapper.scss';
import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import { useControlsAutoHidden } from '@/utils/hooks';

const Wrapper = () => {
    const { controlsStoreDispatch, wrapperClickHandler } = useContext(ControlsContext);

    useControlsAutoHidden(); // 用于控制控制面板的自动隐藏

    return (
        <div
            className={s.container}
            onClick={wrapperClickHandler}
            onMouseMove={() => controlsStoreDispatch({
                mouseIsMoving: true,
                mouseIsOnControls: false,
            })}
            onMouseLeave={() => controlsStoreDispatch({ mouseIsMoving: false })}
        />
    );
};

export default Wrapper;
