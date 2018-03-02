import Vue from 'vue'
import swal from 'sweetalert2'
import App from '@/App'
import store from '@/store'
import router from '@/router/admin'
import i18n from '@/utils/i18n'

Vue.config.productionTip = false
Vue.filter('i18n', i18n)

const actions = ['getConfig']
swal({
  title: i18n('input password'),
  type: 'info',
  input: 'password',
  confirmButtonText: i18n('login'),
  allowOutsideClick: false,
  inputValidator: value => {
    return !value && i18n('password cannot be empty')
  }
})
  .then(({ value: password }) => store.dispatch('getKeys', password))
  .then(keys => Promise.all(actions.map(action => store.dispatch(action))))
  .then(() => {
    swal({
      type: 'success',
      title: i18n('welcome back'),
      timer: 1000
    })
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      store,
      router,
      render: h => h(App)
    })
  })
  .catch(() => {
    swal({
      title: i18n('password wrong'),
      type: 'error'
    })
  })
