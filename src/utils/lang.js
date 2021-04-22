import Cookies from 'js-cookie'

const KEY = 'APP-LANG'

export function getAppLang() {
  return Cookies.get(KEY)
}

export function setAppLang(lang) {
  return Cookies.set(KEY, lang)
}

export function removeAppLang() {
  return Cookies.remove(KEY)
}
