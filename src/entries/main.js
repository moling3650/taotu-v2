import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import thumbnail from '@/utils/thumbnail'

Vue.config.productionTip = false
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
