import request from '../utils/request';

export function addGood(data){
  return request({
    url:'/api/goods',
    method:'post',
    data
  })
}
//name=1&limit=20&is_sale=0&is_order=0
export function goodlist(params){
  return request({
    url:'/api/goods',
    method:'get',
    params
  })
}