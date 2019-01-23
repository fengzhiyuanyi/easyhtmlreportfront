<template>
  <div>
    <summaryPage></summaryPage>
    <div class="perf">
      <perfPage></perfPage>
      <tracePage></tracePage>
    </div>
  </div>
</template>

<script>
import summaryPage from "./Summary";
import perfPage from "./tabs/Perf";
import tracePage from "./tabs/Trace"

export default {
  name: "Pdf",
  components: {
    summaryPage,
    perfPage,
    tracePage
  },
  mounted: function() {
    let _this = this
    setTimeout(function () {
      _this.getPdf()
    }, 5000)
  }
}
</script>

<style scoped>

  .perf {
    width: 90%;
    margin: auto
  }

</style>
