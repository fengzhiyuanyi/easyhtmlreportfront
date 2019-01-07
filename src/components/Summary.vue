<template>
  <div class="wrapper_main">
    <div class="Application_information">
      <div class="information_header">
        <div class="head_title">
          <b>应用信息</b>
        </div>
        <div class="pull-right div-btn" v-if="isReport()">
          <router-link to="/report">
            <el-button type="primary" icon="el-icon-document">生成PDF</el-button>
          </router-link>
          <a style="margin-left: 10px" href="log.txt" :download="info.basic_info.app_info.label + '_log.txt'">
            <el-button type="primary" icon="el-icon-download">游戏log</el-button>
          </a>
        </div>
      </div>
      <div class="information_box">
        <ul>
          <li>
            <img src="icon.png" alt="app图标">
          </li>
        </ul>
        <ul class="information_box_name">
          <li>
            <b>应用名称:</b>
            <span>{{info.basic_info.app_info.label === ''? '未知':info.basic_info.app_info.label}}</span>
            <!-- 楚留香 -->
          </li>
          <li>
            <b>测试类型:</b>
            <span>标准兼容性测试</span>
            <!-- 标准兼容性测试/Monkey测试 -->
          </li>
        </ul>
        <ul class="information_box_name">
          <li>
            <b>应用版本:</b>
            <span>{{info.basic_info.app_info.versionName === ''? '未知':info.basic_info.app_info.versionName}}</span>
            <!-- 1.2.6.1 -->
          </li>
          <li>
            <b>应用大小:</b>
            <span>{{info.basic_info.app_info.size === '0'? '未知':info.basic_info.app_info.size}}</span>
            <!-- 11.2 MB -->
          </li>
        </ul>
        <ul class="information_box_name">
          <li>
            <b>设备名称:</b>
            <span>{{info.basic_info.device_info.model === ''? '未知':info.basic_info.device_info.model}}</span>
            <!-- 华为Mate9 -->
          </li>
          <li>
            <b>设备版本:</b>
            <span>{{info.basic_info.device_info.version === '' ? '未知':'Android '+ info.basic_info.device_info.version}}</span>
            <!-- Android 7.0 -->
          </li>
        </ul>
        <ul class="information_box_name">
          <li>
            <b>提测时间:</b>
            <span>{{info.record_info.start_time === ''? '--:--':info.record_info.start_time}}</span>
            <!-- 2018-11-21 14:30:20 -->
          </li>
          <li>
            <b>测试用时:</b>
            <span>{{info.record_info.total_time === ''? '--:--':info.record_info.total_time}}</span>
            <!-- 1:20:20 s -->
          </li>
        </ul>
        <ul class="information_box_name information_box_name2">
          <li>
            <b>测试状态:</b>
            <span>成功</span>
          </li>
          <li>
            <b>发现Bug数量:</b>
            <span id="bugcount">{{info.trace_info.trace_count}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      info: {
        basic_info: {
					app_info: {
						size: "0",
						versionName: "",
						label: ""
					},
          device_info: {
            brand: "",
            model: "",
            sdk: ""
          }
        },
        record_info: {
          start_time: "",
          total_time: "",
          steps: ""
        },
        trace_info: {
          trace_count: 0
        }
      }
    };
  },
  mounted() {
    // let _this = this;
    $.getJSON("info.json").then(ret => {
			this.info = ret;
			this.info.basic_info.app_info.size = this.getFileSize(this.info.basic_info.app_info.size);
    });
  },
  methods: {
    getFileSize(fileByte) {
      var fileSizeByte = fileByte;
      var fileSizeMsg = "";
      if (fileSizeByte < 1048576)
        fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + " KB";
      else if (fileSizeByte == 1048576) fileSizeMsg = "1 MB";
      else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
        fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + " MB";
      else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824)
        fileSizeMsg = "1 GB";
      else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
        fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + " GB";
      else fileSizeMsg = "文件超过1TB";
      return fileSizeMsg;
    },
    isReport(){
      if(this.$route.name === 'Pdf'){
        return false;
      }else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.div-btn {
  padding-top: 15px;
  padding-right: 25px;
}
#bugcount{
  font-weight:bold;
	color:#ff9955;
}
</style>
