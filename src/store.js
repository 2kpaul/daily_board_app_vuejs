import { createStore } from 'vuex'
import boardTemplate from './board-template'
import { saveStatePlugin } from './utils'

const board = JSON.parse(localStorage.getItem('board')) || boardTemplate

export default createStore({
  plugins:[saveStatePlugin],
  state: {
    board: board
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
