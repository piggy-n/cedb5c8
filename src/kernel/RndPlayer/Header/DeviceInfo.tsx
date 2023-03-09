import c from 'classnames';
import s from './styles/deviceInfo.scss';
import { useContext } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const DeviceInfo = () => {
    const {
        deviceOpts: {
            deviceName = '',
            deviceStatus = 'offline',
        } = {},
        headerOpts: {
            showStatus = true,
        } = {},
    } = useContext(RndPlayerContext);

    return (
        <div className={s.container}>
            {
                showStatus &&
                <span className={c(s.status, s[deviceStatus])} />
            }
            <span className={s.name} title={deviceName}>
                {deviceName}
            </span>
        </div>
    );
};

export default DeviceInfo;
