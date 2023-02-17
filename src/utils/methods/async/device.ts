import { getDeviceStream } from '@/services/device';
import { devLocationPrefix, locationHost, token, wsPrefix } from '@/services/config';
import type { DeviceOpts } from '@/index.d';

export type StreamItem = {
    url: string,
    streamTypeCode: string,
    streamTypeDesc: string,
    channelDesc: string,
    channelCode: string,
}

/**
 * 根据设备id获取视频流list
 * @param deviceOpts
 */
export const obtainDeviceStream = async (deviceOpts: DeviceOpts) => {
    const { deviceId, urlPrefix } = deviceOpts;
    const isDevEnv = locationHost.includes('localhost:');

    return await getDeviceStream({ id: deviceId }).then(res => {
        if (!res?.success) return [];

        const streamList = [...res.list as StreamItem[]];
        streamList.forEach((item: StreamItem) => {
            if (item.url) {
                item.url = isDevEnv
                    ? `${urlPrefix ? urlPrefix : devLocationPrefix}${item.url}${token}`
                    : `${wsPrefix}${locationHost}${item.url}${token}`;
            }
        });

        return streamList;
    });
};
