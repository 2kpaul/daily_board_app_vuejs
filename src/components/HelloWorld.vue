<template>
  <div>
    {{ boards }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    this.$store.dispatch('fetchBoards')
  },
  computed: {
    boards() {
      return this.$store.state.boards
    }
  },

}
</script>

