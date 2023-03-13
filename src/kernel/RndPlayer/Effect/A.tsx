import { useAsyncEffect } from 'ahooks';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import { obtainDeviceInfo } from '@/utils/methods/async/device';
import { isObject } from 'ahooks/es/utils';

const A = () => {
    const { deviceOpts } = useContext(RndPlayerContext);
    const { deviceId } = deviceOpts || {};

    useAsyncEffect(async () => {
        if (isObject(deviceOpts) && deviceId) {
            const info = await obtainDeviceInfo(deviceOpts);
            console.log(info);
        }
    }, [deviceId]);

    return null;
};

export default A;
