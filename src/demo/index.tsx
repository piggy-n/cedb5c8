import { render } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import type { PlayerRef } from '@/index.d';
// import RndPlayer from '@/kernel/RndPlayer';
import { Player } from '@/index';
// import { randomString } from '@/utils/methods/common/randomString';

const Demo = () => {
    const [url, setUrl] = useState('wss://lzz.enbo12119.com/live/1557971989710430210/101.live.mp4?token=3029f52d-a276-4de8-b8e0-f43b69e7d7fe');
    const [, setDevice] = useState<any>({
        deviceId: '1622468092196032514',
        streamType: '1',
    });

    const playerRef = useRef<PlayerRef>(null);

    const changeUrl = () => {
        playerRef.current?.setVideoSrc('https://www.w3schools.com/html/mov_bbb.mp4');
    };

    const play = () => {
        playerRef.current?.play();
    };

    const pause = () => {
        playerRef.current?.pause();
    };

    const reload = () => {
        playerRef.current?.reload();
    };

    const seek = () => {
        playerRef.current?.setPlayProgress(Math.random() * 100);
    };

    useEffect(() => {
        // console.log(playerRef.current?.attributes, 'playerRef.current?.attributes');
    }, [playerRef.current?.attributes]);

    return (
        <>
            <div style={{ backgroundColor: '#5e4949' }}>
                <h3>方法</h3>
                <button onClick={play}>play</button>
                <button onClick={pause}>pause</button>
                <button onClick={reload}>reload</button>
                <button onClick={seek}>seek</button>
                <button onClick={changeUrl}>setVideoSrc</button>
            </div>

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

            <div style={{ backgroundColor: '#49555e' }}>
                <h3>rnd方法</h3>
                {/*<button onClick={setOpt}>设opt</button>*/}
            </div>
            <div style={{ width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.1)' }}>
                <div style={{ width: '480px', height: '270px' }}>
                    {/*<Player*/}
                    {/*    ref={playerRef}*/}
                    {/*    url={url}*/}
                    {/*    controlsOpts={{}}*/}
                    {/*    onTimeUpdate={(e) => console.log(e, 111)}*/}
                    {/*    onPlay={() => console.log('onPlay', 222)}*/}
                    {/*    onPause={() => console.log('onPause', 333)}*/}
                    {/*    onEnded={() => console.log('onEnded', 444)}*/}
                    {/*    onCanplay={() => console.log('onCanplay', 555)}*/}
                    {/*    onVideoStateChange={() => console.log('onVideoStateChange', 666)}*/}
                    {/*    onProgressMouseDown={() => console.log('onProgressMouseDown', 777)}*/}
                    {/*    onProgressMouseUp={() => console.log('onProgressMouseUp', 888)}*/}
                    {/*    onVideoLoadError={() => console.log('onVideoLoadError', 999)}*/}
                    {/*    onVideoLoadFailed={() => console.log('onVideoLoadFailed', 101010)}*/}
                    {/*/>*/}
                    <Player url={url}
                        // videoType={'stream-record'}
                        // onTimeUpdate={(e: any) => console.log(e, 111)}
                        // deviceOpts={}
                    />
                </div>
                <br />
                {/*<RndPlayer deviceOpts={{*/}
                {/*    deviceId: '1622468092196032514',*/}
                {/*    deviceName: '测试设备',*/}
                {/*    deviceStatus: 'online',*/}
                {/*}} />*/}
                {/*<Player videoContainerEleOpts={{ style: { width: '480px', height: '270px' } }} />*/}
            </div>
        </>
    );
};

render(<Demo />, document.getElementById('root'));
