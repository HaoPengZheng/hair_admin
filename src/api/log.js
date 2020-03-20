import request from '../utils/request';

export const logData = query => {
    return request({
        url: '/api/logs',
        method: 'get',
        params: query
    });
};
