import Vue from 'vue'
import VueI18n from 'vue-i18n'

import Formatter from './CustomFormatter'
import pluralizationRules from './PluralizationRules'
import { defaultLocale, messages, locales } from './locales'

const locale = locales[defaultLocale]

const formatter = new Formatter({ locale })

Vue.use(VueI18n)

export default new VueI18n({
  locale,
  formatter,
  messages,
  pluralizationRules
})
