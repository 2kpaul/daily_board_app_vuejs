<template>
    <div class="column" 
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
          <column-task  
            v-for="(task, taskIndex) in column.tasks" 
            :key="taskIndex"
            :column="column"
            :task="task"
            :taskIndex="taskIndex"
            :board="board"
            :columnIndex="columnIndex"
          /> 
          <input 
            type="text"
            class="w-full block p-2 bg-transparent border-0 focus:ring-teal-500"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          >
        </div>
    </div>
</template>

<script>
import ColumnTask from '@/components/ColumnTask.vue'
import board from '@/mixins/board'
export default {
    components: { ColumnTask },
    mixins:[board],
    methods: {
        pickupColumn(e, fromColumnIndex) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

            e.dataTransfer.setData('from-column-index', fromColumnIndex)
            e.dataTransfer.setData('type', 'column')
        },
        clearColumn(columnIndex, columnName) {
            if(confirm('delete all tasks from "' + columnName + '" list' + '?')){
                const columnTasks = this.board.columns[columnIndex].tasks
                
                this.$store.commit('CLEAR_COLUMN', {
                    columnTasks
                })
            }
        },
        deleteColumn(columnIndex, columnName) {
            if(confirm('delete "' + columnName + '" list' + '?')){
                this.$store.commit('DELETE_COLUMN', { columnIndex })   
            }
        },
        createTask(e, tasks) {
            this.$store.commit('CREATE_TASK', {
                tasks,
                name: e.target.value
            })
            e.target.value = ''
        }
    },
}
</script>