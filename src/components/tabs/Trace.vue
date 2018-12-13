<template>
  <div class="Trace_box">
    <pre v-for="trace in traces" :key="trace">{{trace}}</pre>
</template>
<script>
import $ from "jquery";

const errorOptions = ['CRASH', 'TRACEBACK', 'ERROR'];
export default {
  data() {
    return {
      trace_count: 0,
      traces: [],
      traces_count: []
    };
  },
  methods: {
    getTrace() {
      let _this = this;
      $.getJSON("../../static/info.json").then(ret => {
        _this.trace_count = ret.trace_info.trace_count;
        _this.traces = ret.trace_info.traces;
        _this.traces_count = ret.trace_info.traces_count;
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
