import type { Response } from '@/index.d';
import request from '@/utils/methods/common/request';
import { requestPrefix } from '@/services/config';

/**
 * 获取设备流
 * @param id
 */
export const getDeviceStreamList: (params: {
    id: string;
}) => Promise<Response | undefined> = (
    {
        id,
    }
) => {
    return request(`${requestPrefix}${id}/service/stream`, {
        method: 'GET',
    });
};
