import { createStore } from 'vuex'
import boardTemplate from './board-template'
import { saveStatePlugin, uuid } from './utils'

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
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK(state, { task, key, value }) {
        task[key] = value
    },
    MOVE_TASK(state, { fromTasks, toTasks, taskIndex }) {
      const taskToMove = fromTasks.splice(taskIndex, 1)[0]
      toTasks.push(taskToMove)
    }
  },
  actions: {
  },
  modules: {
  }
})
