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

//会员充值接口
export function pay(uid,data){
  return request({
    url:`/api/user/${uid}/user_amount`,
    method:'post'
  })
}

//会员消费接口
export function consumption(uid,data){
  return request({
    url:`/api/user/${uid}/user_amount`,
    method:'post'
  })
}

// 修改服务
export function updateGoods(id,data){
  return request({
    url:`/api/goods/${id}`,
    method:"patch",
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    data
  })
}