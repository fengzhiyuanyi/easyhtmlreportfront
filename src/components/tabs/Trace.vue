<template>
  <div class="Trace_box">
    <pre v-for="trace in trace_list" :key="trace">{{trace}}</pre>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      trace_list: ["Trace信息无"]
    };
  },
  methods: {
    getTrace() {
      let _this = this;
      $.getJSON("./info.json").then(ret => {
        _this.trace_list = ret.trace_info.trace_list;
      });
    }
  },
  mounted() {
    this.getTrace();
  }
};
</script>
<style>
</style>
