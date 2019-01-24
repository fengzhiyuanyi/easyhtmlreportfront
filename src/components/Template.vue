<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="mDialogVisible"
      width="30%">
      <span>{{mAlertTip}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mDialogVisible=false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <div class="container">
        <a href="#" class="navbar-brand font-weight-normal">
          <img class="logo sm_img" src="@/assets/APKCI.png" alt style="width: 80px;height: 20px">
        </a>
        <nav class="navbar-brand">
          <a class="p-2" @click="changeTitle"><strong>{{title || "创建新模板 "}}</strong><i
            class="fa fa-pencil"></i></a>
          <a class="p-2" href="/about">历史
          </a>
          <a class="p-2" href="/about">关于
          </a>
        </nav>
      </div>
    </div>
    <div class="container" style="margin-bottom: 30px">
      <el-container>
        <el-header>
          <span><strong>快速操作</strong></span>
        </el-header>
        <el-main>
          <el-button size="mini" type="primary" @click="saveAndTest"><i class="fa fa-flash"></i> 保存并测试
          </el-button>
          <el-button size="mini" type="success" @click="saveConfiguration"><i class="fa fa-save"></i> 保存</el-button>
          <el-button size="mini" type="disable" disabled @click="saveConfiguration"><i class="el-icon-time"></i>
            定时测试
          </el-button>
          <p class="help-block">
            命令行触发
            <code>curl -X POST {{location.protocol+"//"+location.host+location.pathname+"/build"}}</code>
          </p>
        </el-main>
      </el-container>

      <el-container>
        <el-header>
          <span><strong>定时任务</strong></span>
        </el-header>
        <el-main>
          <div>
            <el-input placeholder="请输入内容" v-model="runConfiguration.mScheduler.value" class="input-with-select">
              <el-select v-model="runConfiguration.mScheduler.trigger" slot="prepend" placeholder="请选择"
                         style="width: 150px">
                <el-option label="延时执行" value="interval"></el-option>
                <el-option label="指定时间执行" value="date"></el-option>
                <el-option label="定时执行" value="cron"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-check" @click="addScheduler"></el-button>
            </el-input>
          </div>

          <div>
            <div v-show="runConfiguration.scheduler" v-for="v in runConfiguration.scheduler">
              <label v-text="v.value" class="text-center"></label>
              <i class="fa fa-trash" style="margin-left: 20px" @click="removeScheduler(v)"></i>
            </div>
          </div>

          <p class="help-block" v-show="runConfiguration.mScheduler.trigger==='interval'">
            表示任务启动和任务执行的时间间隔，如
            <b>60</b>
            表示任务启动60分钟后执行，仅当队列中没有等待的任务时触发。
          </p>
          <p class="help-block" v-show="runConfiguration.mScheduler.trigger==='date'">
            填写具体的执行时间，如
            <b>2017-9-08 21:30:05</b>
            表示任务将在 2017-9-08 21:30:05 执行。
          </p>
          <p class="help-block" v-show="runConfiguration.mScheduler.trigger==='cron'">
            定时性执行任务，定期触发。
          </p>
        </el-main>
      </el-container>

      <el-container>
        <el-header>
          <span><strong>常用配置项</strong></span>
        </el-header>
        <el-main>
          <el-input placeholder="请输入内容" v-model="normalConfiguration.popoUsers">
            <template slot="prepend">POPO通知</template>
          </el-input>
          <p class="help-block">用于接收测试进度。中间以英文逗号分隔, 可省去邮箱后缀，如"n7923lk,n3455jks"; 群通知直接写群号(需要邀请
            <code>grp.qa.mtlrobot@corp.netease.com</code>进群)</p>
          <label class="middle-title">
            <i class="fa fa-android"></i> <b>APK下载地址</b></label>
          <el-checkbox class="pull-right" v-model="normalConfiguration.installOn">下载并安装</el-checkbox>
          <div>
            <el-radio v-model="normalConfiguration.downloadType" label="url">url下载</el-radio>
            <el-radio v-model="normalConfiguration.downloadType" label="TestEase">TestEase下载</el-radio>
          </div>
          <el-input
            placeholder="请输入包体下载链接"
            v-model="normalConfiguration.apkUrl"
            v-if="normalConfiguration.downloadType === 'url'"
            clearable>
          </el-input>
          <el-container style="border: 0px" v-if="normalConfiguration.downloadType === 'TestEase'">
            <el-input placeholder="请输入项目ID" v-model="normalConfiguration.testeaseId">
              <template slot="prepend">项目ID</template>
            </el-input>
            <el-input class="pull-right" placeholder="请输入分支名称" v-model="normalConfiguration.testeaseBranch">
              <template slot="prepend">分支名称</template>
            </el-input>
            <el-input class="pull-right" placeholder="请输入Token" v-model="normalConfiguration.testeaseToken">
              <template slot="prepend">Token</template>
            </el-input>
          </el-container>
          <div v-if="normalConfiguration.downloadType === 'TestEase'">
            <div style="width: 50px" class="help-block pull-left"><strong>项目Id</strong></div>
            <div>可在TestEase主页的链接中查到</div>
            <div style="width: 50px" class="help-block pull-left"><strong>分支名称</strong></div>
            <div>可在TestEase的版本管理页面查看</div>
            <div style="width: 50px" class="help-block pull-left"><strong>Token</strong></div>
            <div>可在帮助中心页面的脚本上传包体说明栏目查看</div>
          </div>
          <p class="help-block" v-if="normalConfiguration.downloadType === 'url'">推荐使用
            <a target="_blank" href="http://test.nie.netease.com">TestEase</a></p>
          <label><strong>PackageName(可选)</strong></label>
          <el-input
            placeholder="请输入待测试游戏包名"
            v-model="normalConfiguration.packageName"
            clearable>
          </el-input>
          <label><strong>GIT_URL</strong></label>
          <el-input placeholder="测试脚本GIT地址" v-model="normalConfiguration.gitUrl" class="input-with-select">
            <el-button slot="prepend" icon="fa fa-gitlab"></el-button>
          </el-input>
          <p class="help-block">测试脚本GIT地址, 项目中需要包含
            <code>stages.yml</code>文件。参考Example:
            <code>http://git-qa.gz.netease.com/gamecitest/launch-test</code>
          </p>
          <label><strong>并发度</strong></label>
          <el-input placeholder="测试脚本GIT地址" v-model="normalConfiguration.concurrency" class="input-with-select">
            <el-button slot="prepend" icon="fa fa-gitlab"></el-button>
          </el-input>
        </el-main>
      </el-container>

      <el-container>
        <el-header>
          <span><strong>设备选择</strong></span>
          <el-checkbox class="pull-right" v-model="deviceConfiguration.scriptOn">执行测试脚本</el-checkbox>
        </el-header>
        <el-main>
          <el-button size="mini" type="primary" icon="el-icon-delete" @click="selectDevices(false)">清空选择</el-button>
          <el-button size="mini" type="primary" icon="el-icon-refresh" @click="refreshDevices(true)">刷新列表</el-button>
          <el-button size="mini" style="margin-bottom: 10px" type="primary" icon="fa fa-check-square"
                     @click="selectDevices(true)">
            全选
          </el-button>

          <el-table
            ref="multipleTable"
            :data="deviceConfiguration.mDevices"
            :show-header="false"
            @row-click="handleDevicesChange"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="name"
              width="150">
            </el-table-column>
            <el-table-column
              prop="using"
              label="using"
              width="100">
            </el-table-column>
            <el-table-column
              prop="ip"
              label="ip"
              width="180">
            </el-table-column>
            <el-table-column
              prop="notes"
              label="notes"
              width="180">
            </el-table-column>
            <el-table-column
              prop="udid"
              label="udid"
              width="380">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>

      <el-container>
        <el-header>
          <span><strong>Jenkins参数</strong></span>
        </el-header>
        <el-main>
          <label><strong>环境变量</strong></label>
          <el-input
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 4}"
            placeholder="环境变量配置"
            @input="updateEnvironment"
            v-model="jenkinsConfiguration.environment">
          </el-input>
          <p class="help-block">按行分隔，格式 key=value。环境变量会在脚本运行时生效</p>
          <label><strong>Jenkins Job Name</strong></label>
          <el-input
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 4}"
            placeholder="请在这里输入Jenkins的JobName"
            v-model="jenkinsConfiguration.jobName">
          </el-input>
          <p class="help-block">
            尽量不要改这个，除非你知道这是啥。查看所有Jobs，前往
            <a target="_blank" href="http://10.246.46.160:8080">Jenkins</a>
          </p>
        </el-main>
      </el-container>
      <el-button size="mini" type="primary" @click="saveAndTest"><i class="fa fa-flash"></i> 保存并测试
      </el-button>
      <el-button size="mini" type="success" @click="saveConfiguration"><i class="fa fa-save"></i> 保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Template",
    data() {
      return {
        id: this.$route.params.id,
        title: "",
        mDialogVisible: false,
        mAlertTip: "",
        mTitleValid: false,
        location: {
          protocol: "",
          host: "",
          pathname: ""
        },
        runConfiguration: {
          mScheduler: {
            id: "",
            trigger: "interval",
            value: "",
          },
          scheduler: []
        },
        normalConfiguration: {
          notifications: [],
          popoUsers: "",
          downloadType: "TestEase",
          installOn: true,
          apkUrl: "",
          testeaseId: "",
          testeaseToken: "",
          testeaseBranch: "",
          packageName: "",
          gitUrl: "",
          concurrency: 0,
        },
        deviceConfiguration: {
          scriptOn: true,
          mDevices: [],
          deviceUdids: [],
          mMissingUdids: [],
        },
        jenkinsConfiguration: {
          environment: "PYTHONIOENCODING=UTF-8",
          jobName: "K-apk-onephone-test-pipeline"
        }
      }
    },
    mounted: function () {
      document.title = this.title;
      if (this.id === '-') {
        this.location = window.location;
        this.refreshDevices();
      } else {
        this.getTemplateDetail(this.id);
      }
    },
    watch: {
      title: function (newTitle, oldTitle) {
        this.mTitleValid = true;
      },
      "deviceConfiguration.mDevices": function (newDevices, oldDevices) {
        if(newDevices !== undefined){
          this.$nextTick(() => {
            this.deviceConfiguration.mDevices.forEach((row) => {
              if (this.deviceConfiguration.deviceUdids.indexOf(row.udid) > -1) {
                this.$refs.multipleTable.toggleRowSelection(row, true);
              } else {
                this.$refs.multipleTable.toggleRowSelection(row, false);
              }
            });
          });
        }
      }
    },
    methods: {
      getTemplateDetail(id) {
        var _this = this;
        $.ajax({
          url: "http://10.240.169.75:7000/templates/" + id,
          type: "get",
          success: function (result) {
            if (result.success) {
              _this.title = result.data.title;
              _this.location = result.data.location;
              _this.mTitleValid = result.data.mTitleValid;
              _this.runConfiguration.scheduler = result.data.runConfiguration.scheduler;
              _this.normalConfiguration = result.data.normalConfiguration;
              _this.deviceConfiguration.deviceUdids = result.data.deviceConfiguration.deviceUdids;
              _this.deviceConfiguration.scriptOn = result.data.deviceConfiguration.scriptOn;
              _this.jenkinsConfiguration = result.data.jenkinsConfiguration;
              _this.refreshDevices();
            }
          },
          error: function (error) {
            console.log(error);
          }
        });
      },
      refreshDevices(nocache) {
        var url = nocache ? "http://10.240.169.75:7000/devices?cache=false" : "http://10.240.169.75:7000/devices";
        $.ajax({
          url: url,
          dataType: "json",
        }).then(function (ret) {
          this.deviceConfiguration.mDevices = ret.data.map(v => {
            return {
              udid: v.udid,
              name: v.product && v.product.name,
              using: v.using ? '使用中' : '空闲',
              notes: v.notes,
              serial: v.serial,
              ip: v.ip,
              present: v.present
            }
          });
          this.deviceConfiguration.mMissingUdids = this.difference(this.deviceConfiguration.deviceUdids, this.deviceConfiguration.mDevices);
          this.deviceConfiguration.mMissingUdids.forEach(function (v) {
            this.deviceConfiguration.mDevices.push({
              udid: v,
              name: "Missing!!",
              using: "未知",
              notes: "danger",
              serial: "",
              ip: "未知",
              present: false
            })
          }.bind(this));
        }.bind(this))
      },
      difference(deviceUdids, mDevices) {
        var onlineUdids = mDevices.map(function (v) {
          return v.udid
        });
        return deviceUdids.map(udid => {
          if (onlineUdids.indexOf(udid) === -1) {
            return udid;
          }
        }).filter(udid => {
          return udid !== undefined;
        });
      },
      changeTitle: function () {
        var newTitle = window.prompt("新标题", this.title);
        if (newTitle) {
          this.title = newTitle;
        }
      },
      addScheduler: function () {
        var valid = false;
        switch (this.runConfiguration.mScheduler.trigger) {
          case "interval":
            var delayTime = parseInt(this.runConfiguration.mScheduler.value);
            if (delayTime && delayTime > 0) {
              var date = new Date();
              var min = date.getMinutes();
              date.setMinutes(min + delayTime);
              this.runConfiguration.mScheduler.trigger = "date";
              this.runConfiguration.mScheduler.value = this.dateFormat(date.toString());
              valid = true;
            }
            break;
          case "date":
            if (this.isValidDate(this.runConfiguration.mScheduler.value)) {
              valid = true;
            }
            break;
          case "cron":
            var params = this.runConfiguration.mScheduler.value.split(" ");
            if (params.length === 5) {
              valid = true;
            }
            break;
        }
        if (valid === true) {
          if (this.id != null && this.id !== '-') {
            var data = {
              id: this.id,
              scheduler: this.runConfiguration.mScheduler,
            }
            $.ajax({
              url: "http://10.240.169.75:7000/schedulers",
              method: "post",
              data: JSON.stringify(data),
              contentType: "application/json",
              dataType: "json",
            }).then(function (ret) {
              if (ret.success === false) {
                this.showAlert(ret.description);
              } else {
                this.runConfiguration.scheduler.push({
                  id: ret.id + this.runConfiguration.mScheduler.value,
                  trigger: this.runConfiguration.mScheduler.trigger,
                  value: this.runConfiguration.mScheduler.value,
                });
                this.id = ret.id;
              }
            }.bind(this))
          } else {
            this.showAlert("需要先创建模板并保存，才能创建定时任务。");
          }
        } else {
          this.showAlert("请按照提示输入相应格式的内容。");
        }
      },
      removeScheduler: function (s) {
        this.runConfiguration.mScheduler.id = s.id;
        var data = {
          id: this.id,
          scheduler: this.runConfiguration.mScheduler,
        };
        $.ajax({
          url: "http://10.240.169.75:7000/schedulers",
          method: "delete",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json",
        }).then(function (ret) {
          if (ret.success === false) {
            this.showAlert(ret.description);
          }
          this.runConfiguration.scheduler = this.runConfiguration.scheduler.filter(function (v) {
            return s !== v;
          })
        }.bind(this))
      },
      saveAndTest: function (ev) {
        var _this = this;
        this.deviceConfiguration.mMissingUdids = this.difference(this.deviceConfiguration.deviceUdids, this.deviceConfiguration.mDevices);
        if (this.deviceConfiguration.deviceUdids.length <= this.deviceConfiguration.mMissingUdids.length) {
          this.showAlert("执行任务必须选择至少一台在线设备！")
        } else if (this.isEasetestValid()) {
          $.ajax({
            url: "http://10.240.169.75:7000/templates/" + this.id,
            method: "post",
            data: JSON.stringify(this.$data),
            contentType: "application/json",
            dataType: "json",
          }).then(function (ret) {
            if (ret.success) {
              this.id = ret.id;
              return ret;
            } else {
              this.showAlert(ret.mesg);
              return ret;
            }
          }.bind(this))
            .then(function (ret) {
              if (ret.success) {
                return $.ajax({
                  url: "http://10.240.169.75:7000/templates/" + this.id + "/build",
                  method: "post",
                })
              } else {
                return ret;
              }
            }.bind(this))
            .then(function (ret) {
              if (ret.success)
                _this.showAlert("测试触发成功，进度消息将会通过POPO通知到你。现在你可以去打游戏喝咖啡了 ^_^");
              else {
                return ret;
              }
            })
        } else {
          this.showAlert("请检查TestEase的配置是否有效！");
        }
      },
      isEasetestValid: function () {
        var success = true;
        if ("TestEase" === this.normalConfiguration.downloadType) {
          var testUrl = "http://test.nie.netease.com/api/projects/" + this.normalConfiguration.testeaseId + "/apps/latest?private_token=" + this.normalConfiguration.testeaseToken + "&branch=" + this.normalConfiguration.testeaseBranch + "&stable=0";
          $.ajax({
            url: testUrl,
            method: "get",
            async: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              success = false;
            }
          });
        }
        return success;
      },
      saveConfiguration: function (ev) {
        if (this.isEasetestValid()) {
          $.ajax({
            url: "http://10.240.169.75:7000/templates/-",
            method: "post",
            data: JSON.stringify(this.$data),
            contentType: "application/json",
            dataType: "json",
          }).then(function (ret) {
            if (ret.success) {
              history.replaceState({}, "K", "/templates/" + ret.id);
              this.id = ret.id;
              $(window).scrollTop(0);
              this.showAlert("保存成功");
            } else {
              this.showAlert(ret.mesg);
            }

          }.bind(this))
        } else {
          this.showAlert("保存之前需要先确保TestEase的配置有效，请参照提示重新配置！");
        }
      },
      updatePopoUsers: function (e, trim) {
        var value = e.target.value;
        if (trim) {
          value = value.trim();
        }
        this.notifications = value.split(/\s+/);
      },
      updateEnvironment: function (e) {
        this.environment = e.target.value.match(/[\w\d_-]+=[^\r\n]+/g)
      },
      selectDevices(val) {
        this.deviceConfiguration.mDevices.forEach(row => {
          this.updateSelectedDeviceUdids(row.udid, val);
          this.$refs.multipleTable.toggleRowSelection(row, val);
        });
      },
      updateSelectedDeviceUdids(udid, val) {
        var index = this.deviceConfiguration.deviceUdids.indexOf(udid)
        if (val) {
          if (index == -1)
            this.deviceConfiguration.deviceUdids.push(udid);
        } else {
          if (index >= 0) {
            this.deviceConfiguration.deviceUdids.splice(index, 1);
          }
        }
      },
      toggleSelectedDeviceUdids(udid) {
        var index = this.deviceConfiguration.deviceUdids.indexOf(udid);
        if (index == -1) {
          this.deviceConfiguration.deviceUdids.push(udid);
        } else {
          this.deviceConfiguration.deviceUdids.splice(index, 1);
        }
      },
      handleDevicesChange(row, event, column) {
        this.deviceConfiguration.mDevices.map((c, i) => {
          if (c.udid === row.udid) {
            this.toggleSelectedDeviceUdids(row.udid);
            this.$refs.multipleTable.toggleRowSelection(row)
          }
        });
      },
      dateFormat: function (dateStr) {
        var dt = new Date(dateStr);
        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        var d = dt.getDate();
        var h = dt.getHours();
        var min = dt.getMinutes();
        var s = dt.getSeconds();
        return `${y}-${m}-${d} ${h}:${min}:${s}`;
      },
      showAlert(msg) {
        this.mDialogVisible = true;
        this.mAlertTip = msg;
      },
      isValidDate(dateStr) {
        if (dateStr === undefined) {
          return false;
        } else {
          var reg = /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/;
          return reg.test(dateStr);
        }
      }
    },
    filters: {
      formatGitURL: function (value) {
        return value.replace("ssh://git@", "http://").replace(":32200/", "/");
      }
    }
  }
</script>

<style scoped>

  .el-container {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .el-container .el-input {
    margin-right: 20px;
  }

  .el-header {
    height: 40px !important;
    line-height: 40px;
    background: #f0f0f0;
    margin: 0;
    padding-left: 15px;
    box-sizing: border-box;
    color: #000;
    font-size: 14px;
  }

  .el-main p, label {
    margin-top: 10px;
  }

  .el-header label {
    margin-top: 0;
  }

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  nav a {
    font-size: small;
    color: #777;
  }

  span .el-button {
    padding: 0;
  }

</style>
