import { getAppLang } from '@/utils/lang'
import en from './en'
import ru from './ru'

export const locales = {
  ru: 'ru-RU',
  en: 'en-US'
}

export const defaultLocale = getAppLang() || 'ru'

export const messages = {
  [locales.ru]: ru,
  [locales.en]: en
}
