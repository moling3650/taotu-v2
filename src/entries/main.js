import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import i18n from '@/utils/i18n'
import thumbnail from '@/utils/thumbnail'

Vue.config.productionTip = false
Vue.filter('i18n', i18n)
Vue.filter('thumbnail', thumbnail)

const actions = ['getConfig', 'getAllCategories', 'getAllAlbums']

Promise.all(actions.map(action => store.dispatch(action)))
  .then(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      store,
      router,
      render: h => h(App)
    })
  })
