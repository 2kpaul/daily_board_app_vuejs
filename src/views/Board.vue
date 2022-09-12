<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div class="column" 
        v-for="(column, columnIndex) in board.columns" 
        :key="columnIndex"
        draggable="true"
        @drop="moveTaskorColumn($event, column.tasks, columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickupColumn($event, columnIndex)"
      >
        <div class="flex items-center mb-2 font-bold justify-between">
          {{ column.name }}
          <div class="flex">
            <a href="#" @click.stop="clearColumn(columnIndex, column.name)" class="text-pink-600 hover:text-gray-900 dark:hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </a>  
            <a href="#" @click.prevent="deleteColumn(columnIndex, column.name)" class="text-pink-600 hover:text-gray-900 dark:hover:text-white">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
            </a> 
          </div>
          
        </div>
        <div class="list-reset">
          <div class="task" 
            v-for="(task, taskIndex) in column.tasks" 
            :key="taskIndex"
            draggable="true"
            @dragstart="pickupTask($event, taskIndex, columnIndex)"
            @click="goToTask(task)"
            @dragover.prevent
            @dragenter.prevent
            @drop.stop="moveTaskorColumn($event, column.tasks, columnIndex, taskIndex)"
          >
            <span class="w-full flex-shrink-0 font-bold flex justify-between">
              {{ task.name }}
              <a href="#" @click.stop="deleteTask(columnIndex, taskIndex, task.name)" class="text-pink-600 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              </a>  
            </span>
            <p class="w-full flex-shrink-0 mt-1 text-sm" v-if="task.description">
              {{ task.description }}
            </p>
          </div>
          <input 
            type="text"
            class="w-full block p-2 bg-transparent border-0 focus:ring-teal-500"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          >
        </div>
      </div>
      <div class="column">
        <input 
            type="text"
            class="w-full block p-2 bg-transparent border-0 focus:ring-teal-500"
            placeholder="+ Create new list"
            v-model="columnName"
            @keyup.enter="createColumn()"
          >
      </div>
    </div>
    <div 
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="close"
    >
      <router-view />
    </div>
  </div>
  <footer>
    <div class="py-6 px-4  dark:bg-gray-700 md:flex md:items-center md:justify-between">
        <div class="flex mt-4 space-x-6 sm:justify-center md:mt-0">
            <a href="#" @click.prevent="resetBoard()" class="text-pink-600 hover:text-gray-900 dark:hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
            </a>  
        </div>
    </div>
</footer>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  data() {
    return {
      columnName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    close () {
      this.$router.push({ name: 'board' })
    },
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    },
    pickupTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    },
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    moveTaskorColumn(e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')

      if(type === 'task') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex )
      }
    },
    moveTask(e, toTasks, toTaskIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex
      })
    },
    moveColumn(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', { fromColumnIndex, toColumnIndex })
    },
    resetBoard() {
      if(confirm('Are you sure you want to reset board? All tasks will be deleted')){
        this.$store.commit('RESET_BOARD')        
      }
    },
    createColumn() {
      this.$store.commit('CREATE_COLUMN', { name: this.columnName })
      this.columnName = ''
    },
    deleteColumn(columnIndex, columnName) {
      if(confirm('delete "' + columnName + '" list' + '?')){
        this.$store.commit('DELETE_COLUMN', { columnIndex })   
      }
    },
    deleteTask(columnIndex, taskIndex, taskName) {
      if(confirm('delete "' + taskName + '" ' + '?')){
        const fromTasks = this.board.columns[columnIndex].tasks

        this.$store.commit('DELETE_TASK', {
          fromTasks,
          taskIndex
        })
      }
    },
    clearColumn(columnIndex, columnName) {
      if(confirm('delete all tasks from "' + columnName + '" list' + '?')){
        const columnTasks = this.board.columns[columnIndex].tasks
        
        this.$store.commit('CLEAR_COLUMN', {
          columnTasks
        })
      }
    }
  }
}
</script>
