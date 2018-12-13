<template>
  <div class="Trace_box">
    <div id="trace-title">
      <div style="display: inline">
        Trace列表 <span style="font-size: small;font-weight: bold"> 共 {{trace_count}} 条</span>
      </div>
      <div style="float: right;">
        <a target="_blank" href="log.txt">
          log详情
        </a>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 90%;margin: auto"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="errorType"
        label="TraceType"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="errorContent"
        label="TraceInfo">
      </el-table-column>
      <el-table-column
        prop="errorCount"
        label="Count"
        sortable
        width="180"
        :formatter="formatter">
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
  import $ from "jquery";

  export default {
    data() {
      return {
        trace_count: 0,
        // traces: [],
        // traces_count: [],
        tableData: []
      };
    },
    methods: {
      getTrace() {
        // let _this = this;
        $.getJSON("./info.json").then(ret => {
          this.trace_count = ret.trace_info.trace_count;
          for (var i = 0; i < ret.trace_info.traces.length; i++) {
            this.tableData.push({
              errorType: ret.trace_info.traces_type[i],
              errorContent: ret.trace_info.traces[i],
              errorCount: ret.trace_info.traces_count[i]
            });
          }
          // _this.trace_count = ret.trace_info.trace_count;
          // _this.traces = ret.trace_info.traces;
          // _this.traces_count = ret.trace_info.traces_count;
        });
      }
    },
    mounted() {
      this.getTrace();
    }
  };
</script>
<style>
  #trace-title {
    width: 90%;
    margin: auto auto 20px;
    font-size: medium;
  }
</style>
