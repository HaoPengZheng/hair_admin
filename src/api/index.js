import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const staticData = query =>{
    return request({
        url: '/api/transStatic',
        method: 'get',
        params: query
    })
}
