<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div class="column" 
        v-for="(column, index) in board.columns" 
        :key="index"
      >
        <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
        <div class="list-reset">
          <div class="task" 
            v-for="(task, taskIndex) in column.tasks" 
            :key="taskIndex"
            @click="goToTask(task)"
          >
            <span class="w-full flex-shrink-0 font-bold">{{ task.name }}</span>
            <p class="w-full flex-shrink-0 mt-1 text-sm" v-if="task.description">
              {{ task.description }}
            </p>
            
          </div>
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
    }
  }
}
</script>
