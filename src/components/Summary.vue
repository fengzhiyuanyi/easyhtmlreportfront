<template>
  <div class="wrapper_main">
	<div class="Application_information">
	  <div class="information_header">
		  <div class="head_title">
			  <b>应用信息</b>
		  </div>
			<div class="pull-right div-btn">
				<el-button type="primary" icon="el-icon-document" @click="getPdf()">生成PDF</el-button>
				<el-button type="primary" icon="el-icon-download" href="*zip*/HTML_Report.zip">资源打包</el-button>
			</div>
	  </div>
	  <div class="information_box">
		  <ul>
			  <li>
				  <img src = "http://arch.s3.netease.com/hzdev-appci/Android.png" alt>
			  </li>
		  </ul>
		  <ul class="information_box_name">
			  <li>
				  <b>应用名称: </b>
				  <span>功能开发中</span><!-- 楚留香 -->
			  </li>
			  <li>
				  <b>测试类型: </b>
				  <span>标准兼容性测试</span><!-- 标准兼容性测试/Monkey测试 -->
			  </li>
		  </ul>
		  <ul class="information_box_name">
			  <li>
				  <b>应用版本: </b>
				  <span>功能开发中</span><!-- 1.2.6.1 -->
			  </li>
			  <li>
				  <b>应用大小: </b>
				  <span>功能开发中</span><!-- 11.2 MB -->
			  </li>
		  </ul>
		  <ul class="information_box_name">
			  <li>
				  <b>设备名称: </b>
				  <span>{{info.basic_info.device_info.brand}}-{{info.basic_info.device_info.model}}</span><!-- 华为Mate9 -->
			  </li>
			  <li>
				  <b>设备版本: </b>
				  <span>Android {{info.basic_info.device_info.version}}</span><!-- Android 7.0 -->
			  </li>
		  </ul>
		  <ul class="information_box_name">
			  <li>
				  <b>提测时间: </b>
				  <span>{{info.record_info.start_time}}</span><!-- 2018-11-21 14:30:20 -->
			  </li>
			  <li>
				  <b>测试用时: </b>
				  <span>{{info.record_info.total_time}}</span><!-- 1:20:20 s -->
			  </li>
		  </ul>
		  <ul class="information_box_name information_box_name2">
			  <li>
				  <b>测试状态: </b>
				  <span>成功</span>
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
          app: "111",
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
        }
      }
    };
  },
  mounted() {
    let _this = this;
    $.getJSON("info.json").then(ret => {
      _this.info = ret;
    });
  }
};
</script>

<style scoped>
.div-btn{
	padding-top: 15px;
	padding-right: 25px;
}
</style>
