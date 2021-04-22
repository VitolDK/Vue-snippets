import axios from 'axios'
import store from '@/store'
import i18n from 'vue-i18n'
import { timeZone } from '@/utils'
import { getToken, getRefreshToken, setToken, setRefreshToken } from '@/utils/auth'

const { protocol, host } = location

const axiosRequest = axios.create({
  baseURL: `${protocol}//${host}`,
  headers: {
    'Content-Type': 'application/json',
    'Time-Zone': timeZone()
  },
  json: true
})

const CancelToken = axios.CancelToken
let itemBuffer = null

async function requestTokenBuffer() {
  if (!itemBuffer && getRefreshToken()) {
    itemBuffer = tokenCall()
  }
  return await itemBuffer
}

async function tokenCall() {
  return new Promise((resolve, reject) => {
    const tokenRequest = {
      refresh_token: getRefreshToken()
    }
    fetch('/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(tokenRequest)
    })
      .then(response => {
        response.json().then(({access_token, refresh_token}) => {
          setToken({ token: access_token })
          setRefreshToken({ token: refresh_token })
          resolve(access_token)
        })
      })
      .catch(e => {
        reject(e)
      })
      .finally((_) => { itemBuffer = null })
  })
}
export let cancel = {}

function addPending(f, token) {
  if (cancel[token]) { cancel[token]() }
  cancel = { ...cancel, [token]: f }
}

export function resolvePending({ token }) {
  delete cancel[token]
}

export const request = ({ token, ...config }) => {
  if (token) {
    config.cancelToken = new CancelToken((c) => { addPending(c, token) })
  }
  return axiosRequest(config)
}

axiosRequest.interceptors.request.use(
  async(config) => {
    const token = getToken() ? getToken() : await requestTokenBuffer()
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

axiosRequest.interceptors.response.use(
  response => response,
  (item) => {
    if (axios.isCancel(item)) { return }
    const { status, data } = item.response
    const arrBuffer = data instanceof ArrayBuffer
    const { message } = (arrBuffer ? JSON.parse(new TextDecoder().decode(data)) : data)
    const hasTranslate = text => i18n.te(`ERRORS.${text}`) ? i18n.t(`ERRORS.${text}`) : text
    switch (status) {
      case 401:
        store.dispatch('logout', '401 logout')
        break
      case 400:
        store.dispatch('nextMessage', { text: `${hasTranslate(message)}` })
        break
      case 504:
        store.dispatch('nextMessage', { text: '504: Gateway Time-out' })
        break
      default:
        store.dispatch('nextMessage', { text: `${status}: ${hasTranslate(message)}` })
        break
    }
    return Promise.reject(item)
  })
