import { request } from '@/utils/request'

const version = 'v1'
const userResource = url => `api/uaa/${version}/users` + (url ? '/' + url : '')

export function login(data) {
  return request({
    url: 'auth/token',
    method: 'post',
    data
  })
}

export function getUserInfo(login) {
  return request({
    url: userResource(login + '/profiles'),
    method: 'get'
  })
}

export function modules() {
  return request({
    url: '/api/module-filter/api/v1/modules',
    method: 'get'
  })
}
