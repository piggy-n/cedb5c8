import type { Response } from '@/index.d';
import request from '@/utils/methods/common/request';
import { prefix } from '@/services/config';

/**
 * 获取设备流
 * @param id
 */
export const obtainDeviceStream: (params: {
    id: string;
}) => Promise<Response | undefined> = (
    {
        id,
    }
) => {
    return request(`${prefix}${id}/service/stream`, {
        method: 'GET',
    });
};
