import { createRoot } from 'react-dom/client';
import Icon from '@/components/Icon';

const Demo = () => {
    return (
        <h1><Icon /></h1>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Demo />);
