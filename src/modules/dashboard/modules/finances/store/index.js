import actions from './actions.js'
import mutations from './mutations.js'

const state = {
  filters: undefined,
  isFiltering: false,
  month: undefined
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
