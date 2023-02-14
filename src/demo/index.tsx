import { createRoot } from 'react-dom/client';
import Icon from '@/components/Icon';

const Demo = () => {
    return (
        <h1><Icon /></h1>
    );
};

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Demo />);
