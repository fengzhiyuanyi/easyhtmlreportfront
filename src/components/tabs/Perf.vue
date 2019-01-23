<template>
  <div class="Analysis_box">
    <ul>
      <li class="box">
        <div id="pss" class="box_in"></div>
      </li>
      <li class="box">
        <div id="cpu" class="box_in"></div>
      </li>
      <li class="box">
        <div id="Bytes" class="box_in"></div>
      </li>
      <li class="box">
        <div id="fps" class="box_in"></div>
      </li>
    </ul>
  </div>
</template>
<script>
import Papa from "papaparse";
import echarts from "echarts";
import global from "@/components/Global"
export default {
  data () {
    return {
      data: ''
    };
  },
  mounted: function() {
    let _this = this
    let taskId = _this.$route.query.taskId
    let deviceIp = _this.$route.query.deviceIp
    let url = global.HOST + '/report/' + taskId + '/' + deviceIp.replace(/\./g, '_') + '/perf'
    // let url = global.HOST + '/report/local_task/local_device/perf'
    Papa.parse(url, {
      download: true,
      complete: results => {
        results = results.data;
        var xAisdata = [];
        var xAisdataindex = results[0].indexOf("time");
        var pss = [];
        var pssindex = results[0].indexOf("pss");
        var cpu = [];
        var cpuindex = results[0].indexOf("cpu");
        var systemCpu = [];
        var systemCpuindex = results[0].indexOf("systemCpu");
        var rxBytes = [];
        var rxBytesindex = results[0].indexOf("txBytes");
        var txBytes = [];
        var txBytesindex = results[0].indexOf("rxBytes");
        var rxTcpBytes = [];
        var rxTcpBytesindex = results[0].indexOf("rxTcpBytes");
        var txTcpBytes = [];
        var txTcpBytesindex = results[0].indexOf("txTcpBytes");
        var fps = [];
        var fpsindex = results[0].indexOf("fps");
        for (var i = 1, _l = results.length - 1; i < _l; i++) {
          xAisdata.push(results[i][xAisdataindex].split(" ")[1].split(".")[0]);
          pss.push(results[i][pssindex]);
          cpu.push(results[i][cpuindex]);
          systemCpu.push(results[i][systemCpuindex]);
          rxBytes.push(results[i][rxBytesindex]);
          txBytes.push(results[i][txBytesindex]);
          rxTcpBytes.push(results[i][rxTcpBytesindex]);
          txTcpBytes.push(results[i][txTcpBytesindex]);
          fps.push(results[i][fpsindex]);
        }
        let pssChart = echarts.init(document.getElementById("pss"));
        let option = {
          title: {
            text: "内存"
          },
          animation: false,
          dataZoom: [
            {
              type: "inside",
              xAxisIndex: [0]
            }
          ],
          xAxis: {
            type: "category",
            data: xAisdata,
            name: "时间"
          },
          yAxis: {
            type: "value",
            name: "MB"
          },
          series: [
            {
              data: pss,
              type: "line"
            }
          ]
        };
        pssChart.setOption(option, true);
        let systemCpuChart = echarts.init(document.getElementById("cpu"));
        option = {
          title: {
            text: "Cpu"
          },
          animation: false,
          dataZoom: [
            {
              type: "inside",
              xAxisIndex: [0]
            }
          ],
          legend: {
            data: ["cpu", "systemCpu"]
          },
          xAxis: {
            type: "category",
            data: xAisdata,
            name: "时间"
          },
          yAxis: {
            type: "value",
            name: "%"
          },
          series: [
            {
              data: cpu,
              name: "cpu",
              type: "line"
            },
            {
              data: systemCpu,
              name: "systemCpu",
              type: "line"
            }
          ]
        };
        systemCpuChart.setOption(option, true);
        let bytesChart = echarts.init(document.getElementById("Bytes"));
        option = {
          title: {
            text: "Bytes"
          },
          animation: false,
          dataZoom: [
            {
              type: "inside",
              xAxisIndex: [0]
            }
          ],
          legend: {
            data: ["rxBytes", "txBytes", "rxTcpBytes", "txTcpBytes"]
          },
          xAxis: {
            type: "category",
            data: xAisdata,
            name: "时间"
          },
          yAxis: {
            type: "value",
            name: "Bytes"
          },
          series: [
            {
              data: rxBytes,
              name: "rxBytes",
              type: "line"
            },
            {
              data: txBytes,
              name: "txBytes",
              type: "line"
            },
            {
              data: rxTcpBytes,
              name: "rxTcpBytes",
              type: "line"
            },
            {
              data: txTcpBytes,
              name: "txTcpBytes",
              type: "line"
            }
          ]
        };
        bytesChart.setOption(option, true);
        let fpsChart = echarts.init(document.getElementById("fps"));
        option = {
          title: {
            text: "fps"
          },
          animation: false,
          dataZoom: [
            {
              type: "inside",
              xAxisIndex: [0]
            }
          ],
          xAxis: {
            type: "category",
            data: xAisdata,
            name: "时间"
          },
          yAxis: {
            type: "value",
            name: "帧"
          },
          series: [{ data: fps, type: "line" }]
        };
        fpsChart.setOption(option, true);
      }
    });
  }
};
</script>
<style>
.box {
  width: calc(50% - 20px);
  height: calc(50% - 40px);
  float: left;
  border: 1px solid rgb(204, 204, 204);
  padding: 10px;
  margin: 10px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  position: relative;
}
.box_in {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 366px;
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  cursor: default;
}
</style>
