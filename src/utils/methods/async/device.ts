import { getDeviceInfo, getDeviceStreamList } from '@/services/device';
import { devLocationPrefix, locationHost, token, wsPrefix } from '@/services/config';
import type { DeviceOpts } from '@/index.d';

export type StreamItem = {
    url: string,
    streamTypeCode: string,
    streamTypeDesc: string,
    channelDesc: string,
    channelCode: string,
}

// 此处接口返回 streamType 和 channelId 字段不统一
export type LiveUrlItem = {
    url: string;
    streamType: number;
    streamTypeDesc: string,
    channelId: string;
    channelDesc: string;
}

export type PtzCameraItem = {
    id: string
    name: string,
    liveUrlList: LiveUrlItem[]
    // ...
}

export type ServiceItem = {
    serviceCode: string;
    serviceDesc: string;
}

export type SelectorItem = {
    label: string;
    value: string;
}

export type DeviceInfo = {
    deviceTypeCode: string // 2 云台 4 相机
    ptzCameraList: PtzCameraItem[],
    liveUrlList: LiveUrlItem[]
    serviceList: ServiceItem[]
}

/**
 * 根据设备id获取视频流list
 * @param deviceOpts
 */
export const obtainDeviceStreamList = async (deviceOpts: DeviceOpts) => {
    const { deviceId, urlPrefix } = deviceOpts;
    const isDevEnv = locationHost.includes('localhost:');

    return await getDeviceStreamList({ id: deviceId })
        .then(res => {
            if (!res?.success) return [];

            const streamList = [...res.list as StreamItem[]];
            streamList.forEach((item: StreamItem) => {
                if (item.url) {
                    item.url = isDevEnv
                        ? `${urlPrefix ?? devLocationPrefix}${item.url}${token}`
                        : `${wsPrefix}${locationHost}${item.url}${token}`;
                }
            });

            return streamList;
        })
        .catch(() => []);
};

export const obtainDeviceInfo = async (deviceOpts: DeviceOpts) => {
    const { deviceId, urlPrefix } = deviceOpts;
    const isDevEnv = locationHost.includes('localhost:');

    return await getDeviceInfo({ id: deviceId })
        .then(res => {
            if (!res?.success) return {};
            const {
                deviceTypeCode,
                serviceList = [],
                liveUrlList = [], // 相机
                ptzCameraList = [], // 云台
            } = res.data as DeviceInfo;

            const streamSelectorList: SelectorItem[] = [];
            const cameraSelectorList: SelectorItem[] = [];

            const setStreamSelectorList = (list: LiveUrlItem[]) => {
                list.forEach(item => {
                    streamSelectorList.push({
                        label: item.streamType + '' === '1' || item.streamTypeDesc === '主码流'
                            ? `${item.channelDesc}（主）`
                            : `${item.channelDesc}（辅）`,
                        value: isDevEnv
                            ? `${urlPrefix ?? devLocationPrefix}${item.url}${token}`
                            : `${wsPrefix}${locationHost}${item.url}${token}`,
                    });
                });
            };

            // 云台
            if (deviceTypeCode === '2') {
                ptzCameraList.forEach(item => {
                    setStreamSelectorList(item.liveUrlList);
                });

                ptzCameraList.forEach(item => {
                    cameraSelectorList.push({
                        label: item.name,
                        value: item.id,
                    });
                });
            }

            if (deviceTypeCode === '4') {
                setStreamSelectorList(liveUrlList);
            }

            return {
                deviceTypeCode,
                serviceList,
                streamSelectorList,
                cameraSelectorList,
            };
        })
        .catch(() => ({}));
};
