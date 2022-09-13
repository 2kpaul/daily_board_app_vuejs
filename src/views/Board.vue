<template>
  <div class="board">
    <div class="flex flex-row items-start flex-wrap">
      <board-column
        v-for="(column, columnIndex) in board.columns"
        :key="columnIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board"   
      />
      
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
import BoardColumn from '@/components/BoardColumn.vue'
export default {
  components: { BoardColumn },
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
    close () {
      this.$router.push({ name: 'board' })
    },
    resetBoard() {
      if(confirm('Are you sure you want to reset board? All tasks will be deleted')){
        this.$store.commit('RESET_BOARD')        
      }
    },
    createColumn() {
      this.$store.commit('CREATE_COLUMN', { name: this.columnName })
      this.columnName = ''
    }
  }
}
</script>
