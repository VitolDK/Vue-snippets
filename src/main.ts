import Vue from 'vue'

import App from './App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import QScroll from '@/components/QScroll'
import * as Fields from '@/components/Fields'
import * as Formatters from '@/components/Formatters'
import { toKebabCase } from '@/utils'

import './styles/main.scss'

import './utils/icons'

import './directives/Debounce'

[
  { components: Fields, prefix: 'q', origin: true },
  { components: Formatters, prefix: 'f', origin: false }
].forEach(({ components, prefix, origin }) => {
  Object.keys(components).forEach(name => {
    const component = components[name]
    origin && Vue.component(name, component)
    Vue.component(`${prefix}-${toKebabCase(name)}`, component)
  })
})

Vue.component('q-scroll', QScroll)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
