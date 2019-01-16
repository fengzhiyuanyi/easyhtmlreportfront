<template>
  <div>
    hello
  </div>
</template>

<script>
  export default {
    name: "Template",
    data() {
      return {
        id: this.$route.params.id,
      }
    },
    created() {
      console.log(this.id)
    }
  }
</script>

<style scoped>

</style>
