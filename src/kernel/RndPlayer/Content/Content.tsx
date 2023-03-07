import s from './styles/content.scss';
import Panel from '@/kernel/RndPlayer/Content/Panel/Panel';
import PlayerWrapper from '@/kernel/RndPlayer/Content/PlayerWrapper/PlayerWrapper';

const Content = () => {
    return (
        <div className={s.container}>
            <Panel />
            <PlayerWrapper />
        </div>
    );
};

export default Content;
