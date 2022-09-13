<template>
    <div class="task" 
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
</template>

<script>
import board from '@/mixins/board'
export default {
    mixins:[board],
    props: {
        task: {
            type: Object,
            required: true
        },
        taskIndex: {
            type: Number,
            required: true
        }
    },
    methods: {
        goToTask (task) {
            this.$router.push({ name: 'task', params: { id: task.id } })
        },
        pickupTask(e, taskIndex, fromColumnIndex) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

            e.dataTransfer.setData('from-task-index', taskIndex)
            e.dataTransfer.setData('from-column-index', fromColumnIndex)
            e.dataTransfer.setData('type', 'task')
        },
        deleteTask(columnIndex, taskIndex, taskName) {
            if(confirm('delete "' + taskName + '" ' + '?')){
                const fromTasks = this.board.columns[columnIndex].tasks

                this.$store.commit('DELETE_TASK', {
                    fromTasks,
                    taskIndex
                })
            }
        }
    }
}
</script>