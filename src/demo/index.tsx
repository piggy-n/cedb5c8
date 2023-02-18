import { createRoot } from 'react-dom/client';
import Player from '@/kernel/Player';
import { useState } from 'react';
// import { randomString } from '@/utils/methods/common/randomString';

const Demo = () => {
    const [url, setUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');
    const [, setDevice] = useState<any>({
        deviceId: '1622468092196032514',
        streamType: '1',
    });

    return (
        <>
            <button onClick={() => setUrl(
                Math.random() > 0.5 ? 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4' : 'https://www.w3schools.com/html/mov_bbb.mp4',
            )}>
                设url random
            </button>
            <button onClick={() => setDevice({
                deviceId: '1622468092196032514',
                streamType: Math.random() > 0.5 ? '1' : '2',
                channelType: Math.random() > 0.5 ? '1' : '2',
            })}>
                设deviceOpts
            </button>
            <div style={{ width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.1)' }}>
                <div style={{ width: '480px', height: '270px' }}>
                    <Player url={url} />
                    {/*<Player*/}
                    {/*    // url={url}*/}
                    {/*    deviceOpts={device} />*/}
                </div>
                <br />
                {/*<Player videoContainerEleOpts={{ style: { width: '480px', height: '270px' } }} />*/}
            </div>
        </>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Demo />);
