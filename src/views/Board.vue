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
            v-for="task in column.tasks" 
            :key="task.id"
          >
            <span class="w-full flex-shrink-0 font-bold">{{ task.name }}</span>
            <p class="w-full flex-shrink-0 mt-1 text-sm" v-if="task.description">
              {{ task.description }}
            </p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  computed: mapState(['board']),
}
</script>
