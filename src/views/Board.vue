<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div class="column" 
        v-for="(column, columnIndex) in board.columns" 
        :key="columnIndex"
        @drop="moveTask($event, column.tasks)"
        @dragover.prevent
        @dragenter.prevent
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
            class="w-full block p-2 bg-transparent"
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
    }
  }
}
</script>
