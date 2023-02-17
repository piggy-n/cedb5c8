import type { DeviceOpts, VideoType } from '@/index.d';
import { useMemo } from 'react';
import { obtainDeviceStream } from '@/utils/methods/async/device';
import { isObject } from 'ahooks/es/utils';

const useVideoUrl = async (
    url?: string,
    videoType?: VideoType,
    deviceOpts?: DeviceOpts,
) => {
    return useMemo(
        async () => {
            if (url) {
                const isLive = /^ws:\/\/|^wss:\/\//.test(url) && /live.mp4$/.test(url);
                return videoType ? [url, videoType] : [url, isLive ? 'live' : 'record'];
            }

            if (isObject(deviceOpts) && deviceOpts?.deviceId) {
                const { streamType = '1', channelType = '1' } = deviceOpts;
                const streamList = await obtainDeviceStream(deviceOpts);
                const streamInfo = streamList.find(item => item.streamTypeCode === streamType && item.channelCode === channelType);
                const streamUrl = streamInfo?.url || '';

                return [streamUrl, videoType === 'stream-record' ? 'stream-record' : 'live'];
            }

            return [];
        },
        [
            url,
            videoType,
            deviceOpts,
        ]
    );
};

export default useVideoUrl;
