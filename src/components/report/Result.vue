<template>
  <div>
    <div class="Overview_box">
      <el-row>
        <el-col :span="20">
          <el-row class="result">
            <el-col :span="8">
               <p>测试结果</p>
            </el-col>
            <div class="pull-right">
              <el-button :disabled="!pdfStatus" @click="downPdf" type="primary" icon="el-icon-document">生成PDF</el-button>
            </div>
          </el-row>
          <el-row class="rowtext" style="text-align: center">
            <el-col :span="8">
              <p>覆盖台数：{{result.count.total}}台</p>
            </el-col>
            <el-col :span="8">
              <p>市场覆盖率：未知</p>
            </el-col>
            <el-col :span="8">
              <p>覆盖用户数量：未知</p>
            </el-col>
          </el-row>
          <el-row style="text-align: center">
            <el-col :span="8">
              <p>通过台数：{{result.count.success}}台</p>
            </el-col>
            <el-col :span="8">
              <p>失败台数：{{result.count.fail}}台</p>
            </el-col>
            <el-col :span="8">
              <p>影响用户数量：未知</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="Details_box">
      <el-row class="rowhead rowcell">
        <!--<el-col :span="20" class="rowtitle">-->
        <el-col :span="20">
          <el-row>
            <el-col :span="6">
              <p>设备</p>
            </el-col>
            <el-col :span="6">
              <p>运行结果</p>
            </el-col>
            <el-col :span="6">
              <p>运行时长</p>
            </el-col>
            <el-col :span="6">
              <p>测试报告</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <p>异常信息</p>
        </el-col>
      </el-row>
      <!--<el-row class="rowcell" v-for="task in task_list">-->
      <el-row v-for="task in task_list">
        <el-col :span="20">
          <el-row>
            <el-col :span="6">
              <p>{{task.device.brand + ": " + task.device.model}}</p>
            </el-col>
            <el-col :span="6">
              <p>{{task.result}}</p>
            </el-col>
            <el-col :span="6">
              <p>{{task.duration}}</p>
            </el-col>
            <el-col :span="6">
                <router-link
                   v-if="task.jenkinsEnvironment"
                   :to="{path:'/screenshot', query:{taskId:task.jenkinsEnvironment.BUILD_ID, deviceIp:task.device.ip}}"
                   tag="a"
                   target="_blank">
                  <i class="fa fa-bar-chart"></i>
                </router-link>
              <!--<a target="_blank" v-if="task.jenkinsEnvironment"-->
                 <!--@click="goToDeviceReport(task.jenkinsEnvironment.BUILD_ID, task.device.ip)">-->
                     <!--&lt;!&ndash;:href='task.jenkinsEnvironment.BUILD_URL + "HTML_Report"'>&ndash;&gt;-->
                     <!--&lt;!&ndash;:href='task.jenkinsEnvironment.BUILD_ID + "HTML_Report"'>&ndash;&gt;-->
                    <!--<i class="fa fa-bar-chart"></i>-->
                  <!--</a>-->
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <p>{{task.exception || "无"}}</p>
        </el-col>
      </el-row>
      <el-row id="stage">
        <el-table
          :cell-style="cellStyle"
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="stage in stages"
            :label="stage.name">
            <template slot-scope="scope">
              <p v-if="scope.row[stage.prop].status==='FAILURE'">FAILURE</p>
              <p v-else>{{scope.row[stage.prop].duration}}</p>
             <!--<p-->
             <!--:class="[scope.row[stage.prop].status==='IN_PROGRESS'? 'inprogress': '',scope.row[stage.prop].status==='FAILURE'? 'failure': '']">-->
               <!--{{scope.row[stage.prop].duration}}-->
             <!--</p>-->
            </template>
          </el-table-column>
          <el-table-column
            label="详细日志">
            <template slot-scope="scope">
             <a target="_blank" v-if="scope.row.jenkinsEnvironment" :href='scope.row.log_link'>
                <i class="fa fa-bar-chart"></i>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>

    <div class="Comparison_box">
      <el-row class="rowtitle">
        <el-col :span="12">
          <div id="installApk" style="height:450px"></div>
        </el-col>
        <el-col :span="12">
          <div id="pss" style="height:450px"></div>
        </el-col>
        <el-col :span="12">
          <div id="fps" style="height:450px"></div>
        </el-col>
        <el-col :span="12">
          <div id="cpu" style="height:450px"></div>
        </el-col>
        <el-col :span="12">
          <div id="systemCpu" style="height:450px"></div>
        </el-col>
        <el-col :span="12">
          <div id="rxBytes" style="height:450px"></div>
        </el-col>
        <el-col :span="12">
          <div id="txBytes" style="height:450px"></div>
        </el-col>
        <el-col :span="12">
          <div id="rxTcpBytes" style="height:450px"></div>
        </el-col>
        <el-col :span="12">
          <div id="txTcpBytes" style="height:450px"></div>
        </el-col>
      </el-row>
      <aside>
        <a href="#pss">安装时间</a>
        <a href="#pss">内存</a>
        <a href="#fps">帧率</a>
        <a href="#cpu">cpu</a>
        <a href="#systemCpu">systemCpu</a>
        <a href="#rxBytes">上行流量</a>
        <a href="#txBytes">下行流量</a>
        <a href="#rxTcpBytes">上行tcp流量</a>
        <a href="#txTcpBytes">下行tcp流量</a>
      </aside>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import $ from 'jquery'
import global from "@/components/Global"

export default {
  data () {
    return {
      pdfStatus: false,
      stages: [
        {
          prop: 'Checkout',
          name: '检查'
        },
        {
          prop: 'setUp',
          name: '准备'
        },
        {
          prop: 'Install APK',
          name: '安装'
        },
        {
          prop: 'Monkey-Test',
          name: '自动化测试'
        },
        // {
        //   prop: 'handle_exception',
        //   name: '处理异常'
        // },
        {
          prop: 'tearDown',
          name: '卸载'
        }
      ],
      result: {
        count: {
          total: '',
          success: '',
          fail: ''
        }
      },
      task_list: [
        {
          perf: {
            exit: false,
            data: {
              cpu: '',
              pss: '',
              systemCpu: '',
              rxBytes: '',
              txBytes: '',
              rxTcpBytes: '',
              txTcpBytes: '',
              fps: ''
            }
          },
          log_link: '',
          exception: '',
          device: {
            brand: '',
            model: '-',
            ip: ''
          },
          result: '-',
          duration: '-',
          jenkinsEnvironment: {
            BUILD_URL: '',
            BUILD_ID: ''
          },
          stages: [
            {
              name: 'Checkout',
              status: '-',
              duration: ''
            },
            {
              name: 'setUp',
              status: '-',
              duration: ''
            },
            {
              name: 'Install APK',
              status: '-',
              duration: ''
            },
            {
              name: 'Monkey-Test',
              status: '-',
              duration: ''
            },
            {
              name: 'handle_exception',
              status: '-',
              duration: ''
            },
            {
              name: 'tearDown',
              status: '-',
              duration: ''
            }
          ]
        }
      ]
    }
  },
  computed: {
    // 计算属性的 getter
    tableData: function () {
      let _this = this
      let data = []
      if (!_this.task_list) {
        return data
      }
      for (var task of _this.task_list) {
        let colData = {}
        if (!task.stages) {
          continue
        }
        for (let stage of task.stages) {
          // colData[stage.name] = stage.status + '-' + stage.duration
          colData[stage.name] = {
            'duration': stage.duration,
            'status': stage.status
          }
          // colData['status'] = stage.status
        }
        colData['jenkinsEnvironment'] = task.jenkinsEnvironment
        colData['log_link'] = task.log_link
        data.push(colData)
      }
      return data
    }
  },
  mounted () {
    let _this = this
    _this.getData()
    _this.draw()
    _this.readyPdf()
  },
  methods: {
    getData: function () {
      let _this = this
      let url = global.HOST + '/suites/' + this.$route.params.id
      // let url = global.HOST + '/suites/1105ce3c-775b-46d0-94a1-39cfcfca0e80'
      $.get(url).then(ret => {
        _this.result = ret.result
        _this.task_list = ret.task_list
      })
    },
    draw: function () {
      var _this = this;
      var cpu = [];
      var pss = [];
      var systemCpu = [];
      var rxBytes = [];
      var txBytes = [];
      var rxTcpBytes = [];
      var txTcpBytes = [];
      var fps = [];
      var xAisdata = [];
      var installApk = [];
      for (var i = 0; i < _this.task_list.length; i++) {
        xAisdata.push(_this.task_list[i].device.brand);
        if (_this.task_list[i].perf.exist) {
          cpu.push(_this.task_list[i].perf.data.cpu);
          pss.push(_this.task_list[i].perf.data.pss);
          systemCpu.push(_this.task_list[i].perf.data.systemCpu);
          rxBytes.push(_this.task_list[i].perf.data.rxBytes);
          txBytes.push(_this.task_list[i].perf.data.txBytes);
          rxTcpBytes.push(_this.task_list[i].perf.data.rxTcpBytes);
          txTcpBytes.push(_this.task_list[i].perf.data.txTcpBytes);
          fps.push(_this.task_list[i].perf.data.fps);
        } else {
          cpu.push(0);
          pss.push(0);
          systemCpu.push(0);
          rxBytes.push(0);
          txBytes.push(0);
          rxTcpBytes.push(0);
          txTcpBytes.push(0);
          fps.push(0);
        }
        if (_this.task_list[i].stages) {
          var instime = _this.task_list[i].stages[2].duration.split(':')
          installApk.push(parseInt(instime[0]) * 3600 + parseInt(instime[1]) * 60 + parseInt(instime[2]));
        }
      }
      // installApk
      var installApk_Chart = echarts.init(document.getElementById('installApk'));
      var option = {
        title: {
          text: "安装时间"
        },
        animation: false,
        // dataZoom: [{
        //   type: "slider",
        //   xAxisIndex: [0]
        // }],
        xAxis: {
          type: 'category',
          data: xAisdata,
          name: "手机"
        },
        yAxis: {
          type: 'value',
          name: '秒'
        },
        series: [{
          data: installApk,
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: '#277EAB',
            }
          }
        }
        ]
      }
      installApk_Chart.setOption(option, true);
      // pss
      var pss_Chart = echarts.init(document.getElementById('pss'));
      var option = {
        title: {
          text: "内存"
        },
        animation: false,
        // dataZoom: [{
        //   type: "slider",
        //   xAxisIndex: [0]
        // }],
        xAxis: {
          type: 'category',
          data: xAisdata,
          name: "手机"
        },
        yAxis: {
          type: 'value',
          name: 'MB'
        },
        series: [{
          data: pss,
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: '#277EAB',
            }
          }
        }
        ]
      }
      pss_Chart.setOption(option, true);

      // cpu
      var cpu_Chart = echarts.init(document.getElementById('cpu'));
      var option = {
        title: {
          text: "Cpu"
        },
        animation: false,
        // dataZoom: [{
        //   type: "slider",
        //   xAxisIndex: [0]
        // }],
        xAxis: {
          type: 'category',
          data: xAisdata,
          name: "手机"
        },
        yAxis: {
          type: 'value',
          name: '%'
        },
        series: [{
          data: cpu,
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: '#277EAB',
            }
          }
        }
        ]
      }
      cpu_Chart.setOption(option, true);

      // systemCpu
      var systemCpu_Chart = echarts.init(document.getElementById('systemCpu'));
      var option = {
        title: {
          text: "systemCpu"
        },
        animation: false,
        // dataZoom: [{
        //   type: "slider",
        //   xAxisIndex: [0]
        // }],
        xAxis: {
          type: 'category',
          data: xAisdata,
          name: "手机"
        },
        yAxis: {
          type: 'value',
          name: '%'
        },
        series: [{
          data: systemCpu,
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: '#277EAB',
            }
          }
        }
        ]
      }
      systemCpu_Chart.setOption(option, true);

      // rxBytes
      var rxBytes_Chart = echarts.init(document.getElementById('rxBytes'));
      var option = {
        title: {
          text: "上行流量"
        },
        animation: false,
        // dataZoom: [{
        //   type: "slider",
        //   xAxisIndex: [0]
        // }],
        xAxis: {
          type: 'category',
          data: xAisdata,
          name: "手机"
        },
        yAxis: {
          type: 'value',
          name: 'Bytes'
        },
        series: [{
          data: rxBytes,
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: '#277EAB',
            }
          }
        }
        ]
      }
      rxBytes_Chart.setOption(option, true);

      // txBytes
      var txBytes_Chart = echarts.init(document.getElementById('txBytes'));
      var option = {
        title: {
          text: "下行流量"
        },
        animation: false,
        // dataZoom: [{
        //   type: "slider",
        //   xAxisIndex: [0]
        // }],
        xAxis: {
          type: 'category',
          data: xAisdata,
          name: "手机"
        },
        yAxis: {
          type: 'value',
          name: 'Bytes'
        },
        series: [{
          data: txBytes,
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: '#277EAB',
            }
          }
        }
        ]
      }
      txBytes_Chart.setOption(option, true);

      // rxTcpBytes
      var rxTcpBytes_Chart = echarts.init(document.getElementById('rxTcpBytes'));
      var option = {
        title: {
          text: "上行tcp流量"
        },
        animation: false,
        // dataZoom: [{
        //   type: "slider",
        //   xAxisIndex: [0]
        // }],
        xAxis: {
          type: 'category',
          data: xAisdata,
          name: "手机"
        },
        yAxis: {
          type: 'value',
          name: 'Bytes'
        },
        series: [{
          data: rxTcpBytes,
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: '#277EAB',
            }
          }
        }
        ]
      }
      rxTcpBytes_Chart.setOption(option, true);

      // txTcpBytes
      var txTcpBytes_Chart = echarts.init(document.getElementById('txTcpBytes'));
      var option = {
        title: {
          text: "下行tcp流量"
        },
        animation: false,
        // dataZoom: [{
        //   type: "slider",
        //   xAxisIndex: [0]
        // }],
        xAxis: {
          type: 'category',
          data: xAisdata,
          name: "手机"
        },
        yAxis: {
          type: 'value',
          name: 'Bytes'
        },
        series: [{
          data: txTcpBytes,
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: '#277EAB',
            }
          }
        }
        ]
      }
      txTcpBytes_Chart.setOption(option, true);

      // fps
      var fps_Chart = echarts.init(document.getElementById('fps'));
      var option = {
        title: {
          text: "帧率"
        },
        animation: false,
        // dataZoom: [{
        //   type: "slider",
        //   xAxisIndex: [0]
        // }],
        xAxis: {
          type: 'category',
          data: xAisdata,
          name: "手机"
        },
        yAxis: {
          type: 'value',
          name: '帧'
        },
        series: [{
          data: fps,
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: '#277EAB',
            }
          }
        }
        ]
      }
      fps_Chart.setOption(option, true);

    },
    cellStyle: function ({row, column, rowIndex, columnIndex}) {
      if (columnIndex < this.stages.length) {
        if (row[this.stages[columnIndex].prop].status === 'IN_PROGRESS') {
          return 'background: #ded885'
        } else if (row[this.stages[columnIndex].prop].status === 'FAILURE') {
          return 'background-color: #cf4b52'
        }
      }
    },
    downPdf: function () {
      this.getPdf()
    },
    readyPdf: function () {
      let _this = this
      setTimeout(function () {
        _this.pdfStatus = true
      }, 5000)
    }
    // goToDeviceReport: function (taskId, deviceIp) {
    //   this.$router.push({path: `//${taskId}/${deviceIp}`})
    // }
  }
}
</script>

<style scoped>
  /*result start*/
  .Overview_box {
    /*height: 400px;*/
    background: #fff;
    border: 1px solid #e7e9ea;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
  }

  .rowtext p {
    padding: 25px 0px;
  }

  .result p {
    font-size: 26px;
  }

  div p {
    font-size: 18px;
  }

  /*result end*/
  /*details start*/
  .Details_box {
    /*height: 400px;*/
    background: #fff;
    border: 1px solid #e7e9ea;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
    font-size: 16px;
  }

  .Details_box button {
    background-color: #d8d8d8;
    font-size: 12px;
    border: 1px solid gray;
    width: 60px;
    height: 30px;
    border-radius: 5%;
    font-weight: bold;
  }

  .rowhead {
    font-size: 24px;
    font-weight: bold;
  }

  .rowcell {
    margin-bottom: 10px;
  }

  .rowtitle {
    text-align: center;
  }

  #stage {
    margin-top: 50px;
  }

  #stage table tr {
    height: 60px;
    line-height: 60px;
  }

  #stage table {
    background-color: #f7f7f7;
  }

  .success {
    background-color: #e7f8e4;
    color: #848c82;
  }

  .failure {
    background-color: #cf4b52;
    color: #848c82;
  }

  .inprogress {
    background-color: #ded885;
    color: #848c82;
  }

  /*details end*/
  /*comparison start*/
  .Comparison_box {
    /*height: 400px;*/
    background: #fff;
    border: 1px solid #e7e9ea;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
  }

  aside {
    position: fixed;
    right: 1px;
    top: 40%;
    width: 100px;
    height: 270px;
    background-color: #1abc9c;
    font-size: 16px;
  }

  aside a {
    display: inline-block;
    height: 11%;
    width: 100%;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-top: 1px solid #fff;
  }
  /*comparison end*/
</style>
