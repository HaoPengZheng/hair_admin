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
    method:'post',
    data
  })
}

//会员消费接口
export function consumption(uid,data){
  return request({
    url:`/api/user/${uid}/user_amount`,
    method:'post',
    data
  })
}

// 修改服务
export function updateGoods(id,data){
  return request({
    url:`/api/goods/${id}`,
    method:"patch",
    data
  })
}


//服务列表
export function saleGoodsList(){
  return request({
    url:`/api/goods/sale`,
    method:'get',
  })
}

//获取商品类型

export function getGoodsTypes(){
  return request({
    url:"/api/types",
    method:"get"
  })
}

export function editGoodsTypes(id,data){
  return request({
    url:`/api/types/${id}`,
    method:"patch",
    data
  })
}
export function delGoodsTypes(id){
  return request({
    url:`/api/types/${id}`,
    method:"delete"
  })
}

export function addGoodsTypes(params){
  return request({
    url:`/api/types`,
    method:"post",
    params
  })
}