import { createStore } from 'vuex'
import utils from '@/utils'

export default createStore({
  state: {
    boards: [],
    dataReady: false
  },
  getters: {
  },
  mutations: {
    SET_BOARDS(state, boards) {
      state['boards'] = boards
    }
  },
  actions: {
    fetchBoards({ commit }) {
      Promise.all(utils.getBoardsPromises()).then((boards) => {
        commit('SET_BOARDS', boards)
      }); 
    }
  },
  modules: {
  }
})
