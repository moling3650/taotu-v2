import Model from '@/models/Model'

const albumsModel = new Model('albums')

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allAlbums: state => state.all,
  allAlbumsCount: state => state.all.length,
  allPhotosCount: state => state.all.map(album => album.photos.length).reduce((a, b) => a + b, 0)
}

// actions
const actions = {
  getAllAlbums ({ commit }) {
    return albumsModel.fetch().then(albums => commit('setAlbums', albums))
  },
  updateAlbum ({ state, rootState, commit }, album) {
    const albums = JSON.parse(JSON.stringify(state.all))
    const index = albums.findIndex(a => a.title === album.title)
    if (~index) {
      albums[index] = album
    } else {
      albums.push(album)
    }
    return albumsModel.saveToCloud(rootState.keys, albums).then(() => commit('setAlbums', albums))
  },
  deleteAlbum ({ state, rootState, commit }, albumTitle) {
    const albums = JSON.parse(JSON.stringify(state.all))
    const index = albums.findIndex(a => a.title === albumTitle)
    if (~index) {
      albums.splice(index, 1)
    }
    return albumsModel.saveToCloud(rootState.keys, albums).then(() => commit('setAlbums', albums))
  }
}

// mutations
const mutations = {
  setAlbums (state, albums) {
    state.all = albums
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
