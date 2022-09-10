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
        <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
        <div class="list-reset">
          <div class="task" 
            v-for="(task, taskIndex) in column.tasks" 
            :key="taskIndex"
            draggable="true"
            @dragstart="pickupTask($event, taskIndex, columnIndex)"
            @click="goToTask(task)"
          >
            <span class="w-full flex-shrink-0 font-bold">
              {{ task.name }}
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

      e.dataTransfer.setData('task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    },
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    moveTaskorColumn(e, toTasks, toColumnIndex) {
      const type = e.dataTransfer.getData('type')

      if(type === 'task') {
        this.moveTask(e, toTasks)
      } else {
        this.moveColumn(e, toColumnIndex )
      }
    },
    moveTask(e, toTasks) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const taskIndex = e.dataTransfer.getData('task-index')

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        taskIndex
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
    }
  }
}
</script>
