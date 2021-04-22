import Vue from 'vue'
import debounce from './debounce'

export default Vue.directive('debounce', {
  bind: function(el, { value, arg }, vnode) {
    if (typeof value === 'function') {
      const input = el.getElementsByTagName('input')[0]
      if (input) {
        input.oninput = debounce(fn => { value(input.value) }, parseInt(arg) || 500)
      } else {
        debounce(value, parseInt(arg) || 500)
      }
    }
  }
})
