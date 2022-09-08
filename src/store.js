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
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              console.log('veva')
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
