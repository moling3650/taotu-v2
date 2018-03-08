import Vue from 'vue'
import Vuex from 'vuex'
import albums from '@/store/modules/albums'
import categories from '@/store/modules/categories'
import bucket from '@/models/bucket'
import Model from '@/models/Model'

Vue.use(Vuex)

const configModel = new Model('config')

const store = new Vuex.Store({
  state: {
    keys: {},
    config: {}
  },
  getters: {
    keys: state => state.keys,
    config: state => state.config
  },
  mutations: {
    setKeys (state, keys) {
      state.keys = keys
    },
    setConfig (state, config) {
      state.config = config
    }
  },
  actions: {
    getKeys ({ commit }, password) {
      return bucket.getKeys(password).then(keys => commit('setKeys', keys))
    },
    getConfig ({ commit }) {
      return configModel.fetch().then(config => commit('setConfig', config))
    },
    updateConfig ({ commit, getters }, config) {
      return configModel.saveToCloud(getters.keys, config).then(() => commit('setConfig', config))
    }
  },
  modules: {
    albums,
    categories
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
