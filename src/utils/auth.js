import Cookies from 'js-cookie'

const AUTH_TOKEN = 'AUTH_TOKEN'
const AUTH_TOKEN_REFRESH = 'AUTH_TOKEN_REFRESH'
const PROFILE_ID = 'PROFILE_ID'
const LOGIN = 'LOGIN'

export function setToken({ token }) {
  return Cookies.set(AUTH_TOKEN, token)
}

export function getToken() {
  return Cookies.get(AUTH_TOKEN)
}

export function removeToken() {
  return Cookies.remove(AUTH_TOKEN)
}

export function setRefreshToken({ token }) {
  return Cookies.set(AUTH_TOKEN_REFRESH, token)
}

export function getRefreshToken() {
  return Cookies.get(AUTH_TOKEN_REFRESH)
}

export function removeRefreshToken() {
  return Cookies.remove(AUTH_TOKEN_REFRESH)
}

export function setActiveProfileId(profileId) {
  return profileId && Cookies.set(PROFILE_ID, profileId)
}

export function getActiveProfileId() {
  return Cookies.get(PROFILE_ID) || null
}

export function removeActiveProfileId() {
  return Cookies.remove(PROFILE_ID)
}

export function setUserLogin(login) {
  return login && Cookies.set(LOGIN, login)
}

export function getUserLogin() {
  return Cookies.get(LOGIN) || null
}

export function removeUserLogin() {
  return Cookies.remove(LOGIN)
}
