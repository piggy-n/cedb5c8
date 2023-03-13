import { useAsyncEffect } from 'ahooks';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { obtainDeviceInfo } from '@/utils/methods/async/device';
import { isObject } from 'ahooks/es/utils';

const DeviceHandler = () => {
    const {
        deviceOpts,
        rndPlayerStoreDispatch,
    } = useContext(RndPlayerContext);
    const { deviceId } = deviceOpts || {};

    useAsyncEffect(
        async () => {
            if (isObject(deviceOpts) && deviceId) {
                const info = await obtainDeviceInfo(deviceOpts);
                const {
                    deviceTypeCode,
                    serviceObj = { stream: false, ptz: false, videoRecord: false },
                    streamSelectorList = [],
                    cameraSelectorList = [],
                } = info || {};
                const [firstStream] = streamSelectorList;
                const [firstCamera] = cameraSelectorList;
                const mainStream = streamSelectorList.find(item => item.main) || firstStream;

                rndPlayerStoreDispatch({
                    deviceTypeCode,
                    serviceObj,
                    streamSelectorList,
                    cameraSelectorList,
                    selectedStreamList: [mainStream.value],
                    selectedCameraItem: firstCamera.value,
                });
            }
        },
        [deviceId],
    );

    return null;
};

export default DeviceHandler;
