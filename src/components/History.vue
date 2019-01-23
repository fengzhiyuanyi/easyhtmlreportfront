<template>
  <div>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <div class="container">
        <a href="#" class="navbar-brand font-weight-normal">
          <img class="logo sm_img" src="@/assets/APKCI.png" alt style="width: 80px;height: 20px">
        </a>
        <nav class="navbar-brand">
          <a class="p-2"><strong>{{title}}</strong></a>
          <a class="p-2" href="/about">编辑</a>
          <a class="p-2" target="_blank" href="http://10.246.46.160:8080/job/K-apk-onephone-test-pipeline/">
            Jenkins <i class="fa fa-external-link"></i>
          </a>
          <a class="p-2" href="/about">关于
          </a>
        </nav>
      </div>
    </div>
    <div class="container" style="margin-bottom: 30px">
      <el-button size="mini" type="primary" style="margin-bottom: 15px" icon="el-icon-caret-right" @click="runTest">点击开始测试</el-button>
      <label style="padding-left: 8px"><strong>共 <span style="color: #1e7e34">{{suites.length}}</span>
        次测试</strong></label>
      <el-card class="box-card" v-for="suite in suites">
        <div slot="header" class="clearfix">
          <span>
            <strong>
              {{timeFormat(suite.createdAt)}}
            </strong>
          </span>
          <el-button style="float: right; padding: 3px 0" type="text">报告总览</el-button>
        </div>
        <div style="margin-bottom: 10px" v-if="suite.apkUrl">
          <strong>安装地址:</strong>
          <a :href="suite.apkUrl"><strong>{{suite.apkUrl}}</strong></a>
        </div>
        <div><strong>通知人:</strong>
          <strong>
            <span v-for="popo in suite.notifications">{{popo}} </span>
          </strong>
        </div>
        <el-table
          :data="suite.tasks"
          header-row-style="{
            'color': '#000'
          }"
          style="width: 100%;color: #0c1018">
          <el-table-column
            label="设备"
            width="180">
            <template slot-scope="scope">
              <a v-if="scope.row.device" target="_blank" :href="scope.row.device.udid | remoteControlUrl">
                {{scope.row.device ? scope.row.device.brand : scope.row.udid}}
              </a>
              <span v-text="scope.row.udids.join(' ')" v-else></span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.jenkinsEnvironment">
                <a target="_blank" :href="scope.row.jenkinsEnvironment.BUILD_URL + 'console'">
                <span :class="resultClass(scope.row.result)">
                  <i v-if="scope.row.result === 'canceled'" class="fa fa-slack"></i>
                  <i v-else-if="scope.row.result === 'success'" class="fa fa-trophy"></i>
                  <i v-else-if="scope.row.result === 'failure'" class="fa fa-bug"></i>
                  <i v-else class="fa fa-truck"></i>
                </span>
                </a>
                {{scope.row.result | translate}} {{scope.row.status | translate}}
                <button v-if="scope.row.status !== 'finished'" class="btn btn-default btn-xs color-red pull-right"
                        @click="taskCancel(t)">
                  <i class="fa fa-power-off"></i> 终止
                </button>
              </div>
              <div v-else-if="scope.row.status === 'pending'">
                等待设备, 已等待 {{scope.row.createdAt | timeSince}}
              </div>
              <div v-else-if="scope.row.status === 'finished'">
                异常结束
              </div>
              <div v-else>
                {{scope.row.status | translate}}.
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="运行时间"
            width="180">
            <template slot-scope="scope">
              <span>{{runningTime(scope.row)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="测试报告"
            width="100">
            <template slot-scope="scope">
              <a target="_blank" :href='scope.row.jenkinsEnvironment.BUILD_URL + "HTML_Report"'>
                <i class="fa fa-bar-chart"></i>
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="exception"
            label="异常">
          </el-table-column>

        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "History",
    data() {
      return {
        id: this.$route.params.id,
        title: "",
        suites: []
      }
    },
    mounted: function() {
      this.getHistoryDetail();
    },
    methods: {
      getHistoryDetail(){
        var _this = this;
        $.ajax({
          url: "http://10.240.169.75:7000/history/" + this.id,
          type: "get",
          success: function (result) {
            if (result.success) {
              _this.title = result.title;
              _this.suites = result.suites;
            }
          },
          error: function (error) {
            console.log(error);
          }
        });
      },
      restartFailures: function () {
        alert("Not implemented")
      },
      notify: function (message) {
        this.notifyMessage = message
        setTimeout(function () {
          this.notifyMessage = "";
        }.bind(this), 1000)
      },
      runTest: function () {
        $.ajax({
          url: location.pathname.replace(/history$/, 'build'),
          method: "post",
        }).then(function (ret) {
          if(ret.success)
            this.notify("测试触发成功");
          else
            alert(ret.mesg);

        }.bind(this))
      },
      runningTime: function (t) {
        var startTime = this.moment(t.startedAt);
        var endTime = this.moment(t.finishedAt || new Date());
        return this.moment.utc(endTime.diff(startTime)).format("HH:mm:ss")
      },
      taskRestart: function (t) {
        var res = confirm("Sure to restart?")
        if (res == true) {
          console.log("restart", t.id);
          $.ajax({
            method: "POST",
            url: "/tasks/" + t.id,
          }).then(function (ret) {
            console.log(ret)
          })
        }
      },
      taskCancel: function (t) {
        console.log("cancel", t.id);
        $.ajax({
          method: "DELETE",
          url: "/tasks/" + t.id,
        }).then(function (ret) {
          console.log(ret)
        })
      },
      timeFormat: function (value) {
        return this.moment(value).format('YYYY-MM-DD HH:mm:ss');
      },
      resultClass: function (result) {
        return {
          'success': 'color-green',
          'failure': 'color-red',
          'canceled': 'color-gray',
        }[result];
      }
    },
    filters: {
      timeSince: function (value) {
        return value;
      },
      remoteControlUrl: function (udid) {
        return "http://wifiphone.nie.netease.com/devices/" + udid + "/remote"
      },
      translate: function (en) {
        var cn = {
          // status
          "started": "环境准备中",
          "pending": "等待中",
          "running": "运行中",
          "finished": "",
          // result
          "success": "成功",
          "failure": "失败",
          "canceled": "已取消"
        }[en];
        return cn === undefined ? en : cn;
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-card {
    margin-bottom: 20px;
  }

  .status-success {
    padding: 2px;
    background-color: green;
    color: white;
  }

  .status-failure {
    padding: 2px;
    background-color: red;
    color: white;
  }

  .color-green {
    color: green;
  }

  .color-red {
    color: red;
  }

  .color-gray {
    color: gray;
  }

  nav a {
    font-size: small;
    color: #777;
  }
</style>
