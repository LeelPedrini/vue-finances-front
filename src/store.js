import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  title: undefined
}

const type = {
  SET_TITLE: 'SET_TITLE'
}

const mutations = {
  [type.SET_TITLE]: (state, { title }) => {
    state.title = title
  }
}

const actions = {
  setTitle: ({ commit }, payload) => {
    commit(type.SET_TITLE, payload)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
