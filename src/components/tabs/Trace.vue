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
      size="small"
      @row-click="gotoProcess"
      style="width: 90%;margin: auto"
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column
        align="center"
        prop="errorType"
        label="ErrorType"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="errorTime"
        align="center"
        label="ErrorTime"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="errorContent"
        label="ErrorInfo">
      </el-table-column>
      <el-table-column
        align="center"
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
import global from "@/components/Global"

export default {
  data() {
    return {
      trace_count: 0,
      tableData: []
    };
  },
  methods: {
    getTrace() {
      let _this = this
      let taskId = _this.$route.query.taskId
      let deviceIp = _this.$route.query.deviceIp
      let url = global.HOST + '/report/' + taskId + '/' + deviceIp.replace(/\./g, '_') + '/trace'
      // url = global.HOST + '/report/local_task/local_device/trace'
      $.get(url).then(ret => {
        this.trace_count = ret.trace_info.trace_count;
        if (ret.trace_info.traces.length === 0) {
          this.tableData.push({
            errorType: '',
            errorTime: '',
            errorContent: '暂无数据',
            errorCount: ''
          });
        } else {
          for (var i = 0; i < ret.trace_info.traces.length; i++) {
            this.tableData.push({
              errorType: ret.trace_info.traces_type[i],
              errorTime: ret.trace_info.traces_time[i],
              errorContent: ret.trace_info.traces[i],
              errorCount: ret.trace_info.traces_count[i]
            });
          }
        }
      });
    },
    gotoProcess(row) {
      this.$router.push({
        name: 'Progress',
        params: {
          time: row.errorTime
        }
      })
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

  .el-table .cell {
    white-space: pre !important;
  }

  .cell {
    max-height: 200px !important;
    overflow: auto !important;
  }
</style>
