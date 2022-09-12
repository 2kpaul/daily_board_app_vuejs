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
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)

    },
    RESET_BOARD(state){
      state.board = boardTemplate
    },
    CREATE_COLUMN(state, { name }) {
      this.state.board.columns.push({
        name: name,
        tasks: []
      })
    },
    DELETE_COLUMN(state, { columnIndex }) {
      state.board.columns.splice(columnIndex, 1)
    },
    DELETE_TASK(state, {fromTasks, taskIndex}) {
      fromTasks.splice(taskIndex, 1)
    },
    CLEAR_COLUMN(state, {columnTasks}) {
      columnTasks.length = 0
    }
      
  },
  actions: {
  },
  modules: {
  }
})
