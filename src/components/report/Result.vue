<template>
  <div>
    <div class="Overview_box">
      <div class="row">
        <div class="col-sm-6">
          <div class="row result">
            <div class="col-sm-4">
              <p>测试结果</p>
            </div>
          </div>
          <div class="row rowtext">
            <div class="col-sm-4">
              <p>覆盖台数：{{result.count.total}}台</p>
            </div>
            <div class="col-sm-4">
              <p>市场覆盖率：未知</p>
            </div>
            <div class="col-sm-4">
              <p>覆盖用户数量：未知</p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <p>通过台数：{{result.count.success}}台</p>
            </div>
            <div class="col-sm-4">
              <p>失败台数：{{result.count.fail}}台</p>
            </div>
            <div class="col-sm-4">
              <p>影响用户数量：未知</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div id="pie" style="height: 500px;"></div>
        </div>
      </div>
    </div>
    <div class="Details_box">
      <div class="row rowhead rowcell">
        <div class="col-sm-8 rowtitle">
          <div class="row">
            <div class="col-sm-3">
              <p>设备</p>
            </div>
            <div class="col-sm-3">
              <p>运行结果</p>
            </div>
            <div class="col-sm-3">
              <p>运行时长</p>
            </div>
            <div class="col-sm-3">
              <p>测试报告</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <p>异常信息</p>
        </div>

      </div>
      <div class="row rowcell" v-for="task in task_list">
        <div class="col-sm-8 rowtitle">
          <div class="row">
            <div class="col-sm-3">
              <p>{{task.device.brand + ": " + task.device.model}}</p>
            </div>
            <div class="col-sm-3">
              <p>{{task.result}}</p>
            </div>
            <div class="col-sm-3">
              <p>{{task.duration}}</p>
            </div>
            <div class="col-sm-3">
              <a target="_blank" v-if="task.jenkinsEnvironment"
                 :href='task.jenkinsEnvironment.BUILD_URL + "HTML_Report"'>
                <i class="fa fa-bar-chart"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <p>{{task.exception || "无"}}</p>
        </div>
      </div>
      <div id="stage" class="row text-center">
        <table class="table-bordered col-sm-12">
          <thead>
          <tr>
            <th v-for="stage in task_list[0].stages">{{stage.name}}</th>
            <th>详细日志</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="task in task_list">
            <td v-for="stage in task.stages">
              <p
                :class="[stage.status==='SUCCESS'? 'success': '', stage.status==='IN_PROGRESS'? 'inprogress': '',stage.status==='FAILURE'? 'failure': '']">
                {{stage.status + "-" + stage.duration}}</p>
            </td>
            <td>
              <a target="_blank" v-if="task.jenkinsEnvironment" :href='task.log_link'>
                <i class="fa fa-bar-chart"></i>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="Comparison_box">
      <div class="row">
        <div class="col-md-6 col-sm-12 col-lg-6 graph">
          <div id="installApk" style="height:450px"></div>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-6 graph">
          <div id="pss" style="height:450px"></div>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-6 graph">
          <div id="fps" style="height:450px"></div>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-6 graph">
          <div id="cpu" style="height:450px"></div>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-6 graph">
          <div id="systemCpu" style="height:450px"></div>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-6 graph">
          <div id="rxBytes" style="height:450px"></div>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-6 graph">
          <div id="txBytes" style="height:450px"></div>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-6 graph">
          <div id="rxTcpBytes" style="height:450px"></div>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-6 graph">
          <div id="txTcpBytes" style="height:450px"></div>
        </div>
      </div>
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

export default {
  data () {
    return {
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
              cpu: '1',
              pss: '1',
              systemCpu: '1',
              rxBytes: '1',
              txBytes: '1',
              rxTcpBytes: '1',
              txTcpBytes: '1',
              fps: '1'
            }
          },
          log_link: '',
          exception: '',
          device: {
            brand: '',
            model: ''
          },
          result: '',
          duration: '',
          jenkinsEnvironment: {
            BUILD_URL: ''
          },
          stages: [
            {
              name: '',
              status: '',
              duration: ''
            },
            {
              name: '',
              status: '',
              duration: ''
            },
            {
              name: '',
              status: '',
              duration: ''
            }
          ]
        }
      ]
    }
  },
  mounted () {
    let _this = this
    _this.getData()
    _this.draw()
  },
  methods: {
    getData: function () {
      let _this = this
      $.get('http://127.0.0.1:7000/suites/1105ce3c-775b-46d0-94a1-39cfcfca0e80').then(ret => {
        _this.result = ret.result
        _this.task_list = ret.task_list
        _this.drawInfo()
      })
    },
    drawInfo: function () {
      let _this = this
      // 图表
      var dom = document.getElementById('pie')
      var myChart = echarts.init(dom)
      var option = null

      option = {
        title: {
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#28a745', '#dc3545'],
        legend: {
          orient: 'vertical',
          right: 'right',
          top: '400',
          data: ['成功', '失败']
        },
        series: [
          {
            name: '台数',
            type: 'pie',
            radius: '55%',
            center: ['50%', '30%'],
            data: [
              {value: _this.result.count.success, name: '成功'},
              {value: _this.result.count.fail, name: '失败'}
              // {value: '2', name: '成功'},
              // {value: '3', name: '失败'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
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
        var instime = _this.task_list[i].stages[2].duration.split(':')
        installApk.push(parseInt(instime[0]) * 3600 + parseInt(instime[1]) * 60 + parseInt(instime[2]));
      }
      // installApk
      var installApk_Chart = echarts.init(document.getElementById('installApk'));
      var option = {
        title: {
          text: "安装时间"
        },
        animation: false,
        dataZoom: [{
          type: "slider",
          xAxisIndex: [0]
        }],
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
        dataZoom: [{
          type: "slider",
          xAxisIndex: [0]
        }],
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
        dataZoom: [{
          type: "slider",
          xAxisIndex: [0]
        }],
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
        dataZoom: [{
          type: "slider",
          xAxisIndex: [0]
        }],
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
        dataZoom: [{
          type: "slider",
          xAxisIndex: [0]
        }],
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
        dataZoom: [{
          type: "slider",
          xAxisIndex: [0]
        }],
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
        dataZoom: [{
          type: "slider",
          xAxisIndex: [0]
        }],
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
        dataZoom: [{
          type: "slider",
          xAxisIndex: [0]
        }],
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
        dataZoom: [{
          type: "slider",
          xAxisIndex: [0]
        }],
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

    }
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
