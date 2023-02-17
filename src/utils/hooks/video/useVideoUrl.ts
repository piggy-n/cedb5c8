import { useAsyncEffect } from 'ahooks';
import { isObject } from 'ahooks/es/utils';
import { obtainDeviceStream } from '@/utils/methods/async/device';
import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';
import type { Dispatch } from 'react';
import type { DeviceOpts, VideoType } from '@/index.d';

const useVideoUrl = (
    dispatch: Dispatch<PlayerStoreState>,
    url?: string,
    videoType?: VideoType,
    deviceOpts?: DeviceOpts,
) => {
    useAsyncEffect(
        async () => {
            if (url) {
                const isLive = /^ws:\/\/|^wss:\/\//.test(url) && /live.mp4$/.test(url);

                return dispatch({
                    url,
                    videoType: videoType ?? (isLive ? 'live' : 'record'),
                });
            }

            if (isObject(deviceOpts) && deviceOpts.deviceId) {
                const { streamType = '1', channelType = '1' } = deviceOpts;
                const streamList = await obtainDeviceStream(deviceOpts);
                const streamInfo = streamList.find(item => item.streamTypeCode === streamType && item.channelCode === channelType);
                const streamUrl = streamInfo?.url ?? '';

                dispatch({
                    url: streamUrl,
                    videoType: videoType === 'stream-record' ? 'stream-record' : 'live',
                });
            }
        },
        [
            url,
            videoType,
            deviceOpts?.deviceId,
        ]
    );
};

export default useVideoUrl;
