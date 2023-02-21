import s from './styles/progressAndPanel.scss';
import { useContext } from 'react';
import { ControlsContext } from '@/utils/hooks/data/useControlsContext';
import Progress from '@/kernel/Player/Controls/ProgressAndPanel/Progress';
import Panel from '@/kernel/Player/Controls/ProgressAndPanel/Panel';

const ProgressAndPanel = () => {
    const { controlsStoreDispatch } = useContext(ControlsContext);

    return (
        <div
            className={s.container}
            onMouseEnter={() => controlsStoreDispatch({ mouseIsOnControls: true })}
            onMouseLeave={() => controlsStoreDispatch({ mouseIsOnControls: false })}
        >
            <Progress />
            <Panel />
        </div>
    );
};

export default ProgressAndPanel;
