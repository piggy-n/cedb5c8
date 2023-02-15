import { createRoot } from 'react-dom/client';
import Player from '@/kernel/Player/Player';

const Demo = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.1)' }}>
            <div style={{ width: '480px', height: '270px' }}>
                <Player />
            </div>
            <br />
            <Player videoContainerEleOpts={{ style: { width: '480px', height: '270px' } }} />
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Demo />);
