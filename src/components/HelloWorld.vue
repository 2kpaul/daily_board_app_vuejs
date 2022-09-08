<template>
  <div>
    {{ this.$store.state.board }}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
  },
  computed: {
  },

}
</script>

