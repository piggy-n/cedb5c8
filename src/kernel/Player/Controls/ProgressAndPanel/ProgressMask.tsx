import s from './styles/progressMask.scss';
import { useRef } from 'react';
import { useProgressMethods } from '@/utils/hooks';

const ProgressMask = () => {
    const progressMaskEleRef = useRef<HTMLDivElement>(null);

    const {
        mouseDownHandler,
        mouseUpHandler,
        mouseMoveHandler,
        mouseLeaveHandler,
        clickHandler,
    } = useProgressMethods(progressMaskEleRef.current);

    return (
        <div
            ref={progressMaskEleRef}
            className={s.container}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            onMouseMove={mouseMoveHandler}
            onMouseLeave={mouseLeaveHandler}
            onClick={clickHandler}
        />
    );
};

export default ProgressMask;
