import { request } from '@/utils/request'

const baseUrl = url => `/api/autocomplete/${url}`

export function autocomplete({ url = '', params, token }) {
  return request({
    url: baseUrl(url),
    method: 'get',
    params,
    token
  })
}
