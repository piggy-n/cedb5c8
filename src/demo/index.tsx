import { createRoot } from 'react-dom/client';
import Player from '@/kernel/Player';
import { useState } from 'react';
// import { randomString } from '@/utils/methods/common/randomString';

const Demo = () => {
    const [url, setUrl] = useState('wss://lzz.enbo12119.com/live/1572529841719136267/101.live.mp4?token=b4a9fc6a-d3b4-444e-9d46-1ba70fe0468d');
    const [, setDevice] = useState<any>({
        deviceId: '1622468092196032514',
        streamType: '1',
    });

    return (
        <>
            <button onClick={() => setUrl(
                Math.random() > 0.5
                    ? 'ws://192.168.9.148/live/1625782312488669187/101.live.mp4?token=c3cb9efd-a63a-4243-9b83-00cd02f9689a'
                    : 'https://osstest-enbo.oss-cn-shanghai.aliyuncs.com/alarm/file/2023/02/20/13_105008_105108.mp4?Expires=1834541575&OSSAccessKeyId=LTAI5tDjcMGsJKeq9L3PautV&Signature=fl%2BEsqO%2BsInyoc6fq9AtUCWXF88%3D',
            )}>
                设url random
            </button>
            <button onClick={() => setUrl('')}>
                设url 空
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
                    <Player url={url} controlsOpts={{}}/>
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
