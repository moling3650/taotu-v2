import Model from '@/models/Model'

const categoriesModel = new Model('categories')

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allCategories: state => state.all,
  allCategoriesCount: state => state.all.length,
  categoriesInfo: (state, getters, rootState) => state.all.map(category => {
    const albums = rootState.albums.all
    const albumsCount = albums.filter(album => album.category === category.name).length
    return {
      ...category,
      albumsCount,
      rate: albums.length && albumsCount / albums.length
    }
  })
}

// actions
const actions = {
  getAllCategories ({ commit }) {
    return categoriesModel.fetch().then(categories => commit('setCategories', categories))
  },
  updateCategory ({ state, rootState, commit }, category) {
    const categories = JSON.parse(JSON.stringify(state.all))
    const index = categories.findIndex(c => c.name === category.name)
    if (~index) {
      categories[index] = category
    } else {
      categories.push(category)
    }
    return categoriesModel.saveToCloud(rootState.keys, categories).then(() => commit('setCategories', categories))
  },
  deleteCategory ({ state, rootState, commit }, categoryName) {
    const categories = JSON.parse(JSON.stringify(state.all))
    const index = categories.findIndex(c => c.name === categoryName)
    if (~index) {
      categories.splice(index, 1)
    }
    return categoriesModel.saveToCloud(rootState.keys, categories).then(() => commit('setCategories', categories))
  }
}

// mutations
const mutations = {
  setCategories (state, categories) {
    state.all = categories
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
