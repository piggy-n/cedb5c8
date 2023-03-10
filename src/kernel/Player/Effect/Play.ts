import { useContext, useEffect } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';
import { useAsyncEffect } from 'ahooks';
import { isObject } from 'ahooks/es/utils';
import { obtainDeviceStreamList } from '@/utils/methods/async/device';

const Play = () => {
    const {
        url: propsUrl,
        videoType: propsVideoType,
        deviceOpts,
        playerStoreDispatch,
        playerStore: {
            url = '',
            videoType = 'live',
            wsPlayer,
            flvPlayer,
        },
    } = useContext(PlayerContext);

    const {
        deviceId,
        urlPrefix,
        streamType = '1',
        channelType = '1',
    } = deviceOpts || {};

    useAsyncEffect(
        async () => {
            if (propsUrl) {
                const isLive = /^ws:\/\/|^wss:\/\//.test(propsUrl);

                return playerStoreDispatch({
                    url: propsUrl,
                    videoType: propsVideoType ?? (isLive ? 'live' : 'record'),
                });
            }

            if (isObject(deviceOpts) && deviceId) {
                const streamList = await obtainDeviceStreamList(deviceOpts);
                const streamInfo = streamList.find(item => item.streamTypeCode === streamType && item.channelCode === channelType);
                const streamUrl = streamInfo?.url ?? '';

                return playerStoreDispatch({
                    url: streamUrl,
                    videoType: propsVideoType === 'stream-record' ? 'stream-record' : 'live',
                });
            }

            return playerStoreDispatch({
                url: '',
                videoType: 'live',
            });
        },
        [
            propsUrl,
            propsVideoType,
            deviceId,
            urlPrefix,
            streamType,
            channelType,
        ],
    );

    useEffect(
        () => {
            if (!wsPlayer || !flvPlayer) return;
            wsPlayer.stop();
            flvPlayer.stop();
            videoType === 'record' ? flvPlayer.start(url) : wsPlayer.start(url);
        },
        [
            url,
            videoType,
        ],
    );

    return null;
};

export default Play;
