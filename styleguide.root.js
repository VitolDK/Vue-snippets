// config/styleguide.root.js
import Vue from 'vue'
import store from '@/store'

export default previewComponent => {
  return {
    store,
    render(createElement) {
      return createElement(previewComponent)
    }
  }
}
