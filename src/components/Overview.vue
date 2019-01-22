<template>
  <div id="app">
    <headpage></headpage>
    <div class="wrapper_main">
      <div class="Application_cont">
        <div id="con">
          <section class="information_Presentation" style="display: block;">
            <resultpage></resultpage>
          </section>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import headpage from './Header'
import resultpage from './report/Result'

export default {
  data () {
    return {}
  },
  components: {
    headpage,
    resultpage,
  }

}
</script>

<style scoped>

</style>
