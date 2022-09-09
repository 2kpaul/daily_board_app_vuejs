<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input 
        type="text"
        :value="task.name"
        class="p-2 mr-2 flex-grow text-xl font-bold w-full border-0 bg-gray-100 focus:ring-teal-500"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      >
      <textarea 
        class="relative bg-transparent px-2 mt-2 h-64 border-0 leading-normal w-full focus:ring-teal-500"
        :value="task.description"
        placeholder="enter description task"
        @change="updateTaskProperty($event, 'description')"  
      >
      </textarea>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getTask']),
    task() {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty(e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    }
  },
}
</script>
