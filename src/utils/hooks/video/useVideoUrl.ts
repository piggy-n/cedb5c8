import { useAsyncEffect } from 'ahooks';
import { isObject } from 'ahooks/es/utils';
import { obtainDeviceStreamList } from '@/utils/methods/async/device';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/data/usePlayerContext';

const useVideoUrl = () => {
    const { url, videoType, playerStoreDispatch, deviceOpts } = useContext(PlayerContext);

    const { deviceId, urlPrefix, streamType = '1', channelType = '1' } = deviceOpts || {};

    useAsyncEffect(
        async () => {
            if (url) {
                const isLive = /^ws:\/\/|^wss:\/\//.test(url) && /live.mp4$/.test(url);

                return playerStoreDispatch({
                    url,
                    videoType: videoType ?? (isLive ? 'live' : 'record'),
                });
            }

            if (isObject(deviceOpts) && deviceId) {
                const streamList = await obtainDeviceStreamList(deviceOpts);
                const streamInfo = streamList.find(item => item.streamTypeCode === streamType && item.channelCode === channelType);
                const streamUrl = streamInfo?.url ?? '';

                return playerStoreDispatch({
                    url: streamUrl,
                    videoType: videoType === 'stream-record' ? 'stream-record' : 'live',
                });
            }

            return playerStoreDispatch({
                url: '',
                videoType: 'live',
            });
        },
        [
            url,
            videoType,
            deviceId,
            urlPrefix,
            streamType,
            channelType,
        ],
    );
};

export default useVideoUrl;
