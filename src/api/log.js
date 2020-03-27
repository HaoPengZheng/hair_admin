import request from '../utils/request';

export const logData = query => {
    return request({
        url: '/api/logs',
        method: 'get',
        params: query
    });
};

export const transLogs = query => {
    return request({
        url: '/api/adminTLogs',
        method: 'get',
        params: query
    });
};