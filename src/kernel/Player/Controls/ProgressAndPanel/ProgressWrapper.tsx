import s from './styles/progressWrapper.scss';
import { useRef } from 'react';

const ProgressWrapper = () => {
    const progressWrapperRef = useRef<HTMLDivElement>(null);
    const progressControlPointRef = useRef<HTMLDivElement>(null);

    return (
        <div className={s.container}>

        </div>
    );
};

export default ProgressWrapper;
