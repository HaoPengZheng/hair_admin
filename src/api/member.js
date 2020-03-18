import request from '../utils/request';

export function addUserLevel(data) {
  return request({
    url: '/api/user_level',
    method: 'post',
    data
  })
}

export function getUserLevel() {
  return request({
    url: '/api/user_level',
    method: 'get',
  })
}

export function updateUserLevel(data) {
  return request({
    url: '/api/user_level',
    method: 'patch',
    data
  })
}

export function getUserList(params){
  return request({
    url:'/api/users',
    method:'get',
    params
  })
}

export function updateUser(id,data){
  return request({
    url:`/api/users/${id}`,
    method:'patch',
    data
  })
}