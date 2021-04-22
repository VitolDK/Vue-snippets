import i18n from '@/i18n'
import { locales, defaultLocale } from '@/i18n/locales'
import { setAppLang } from '@/utils/lang'
import { momentLocale } from '@/utils'

momentLocale(defaultLocale)

const lang = {
  state: {
    locale: defaultLocale,
    locales
  },
  mutations: {
    SET_LOCALE: (state, locale) => {
      momentLocale(locale)
      setAppLang(locale)
      state.locale = locale
      i18n.locale = locales[locale]
    }
  },
  actions: {
    setLocale({ commit, state: { locales } }, locale) {
      if (locales[locale]) {
        commit('SET_LOCALE', locale)
      }
    }
  }
}

export default lang
