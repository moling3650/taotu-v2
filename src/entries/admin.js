import Vue from 'vue'
import swal from 'sweetalert2'
import App from '@/App'
import store from '@/store'
import router from '@/router/admin'

Vue.config.productionTip = false

const actions = ['getConfig']
swal({
  title: 'input password',
  type: 'info',
  input: 'password',
  confirmButtonText: 'Login',
  allowOutsideClick: false,
  inputValidator: value => {
    return !value && 'password cannot be empty'
  }
})
  .then(({ value: password }) => store.dispatch('getKeys', password))
  .then(keys => Promise.all(actions.map(action => store.dispatch(action))))
  .then(() => {
    swal({
      type: 'success',
      title: 'welcome back',
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
      title: 'password wrong',
      type: 'error'
    })
  })
