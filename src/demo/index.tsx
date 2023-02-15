import { createRoot } from 'react-dom/client';
import Player from '@/kernel/Player';
import { useState } from 'react';
import { randomString } from '@/utils/methods/randomString';

const Demo = () => {
    const [url, setUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');

    return (
        <>
            <button onClick={() => setUrl(randomString())}>
                设url random
            </button>
            <div style={{ width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.1)' }}>
                <div style={{ width: '480px', height: '270px' }}>
                    <Player url={url} />
                </div>
                <br />
                <Player videoContainerEleOpts={{ style: { width: '480px', height: '270px' } }} />
            </div>
        </>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Demo />);
