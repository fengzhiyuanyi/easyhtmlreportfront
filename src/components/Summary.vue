<template>
  <div class="container-fluid">
  	<div class="row summary">
  		<div class="col-sm-2 m-auto cell">
  			<div class="row m-auto" style="padding-left: 30px;">
  					<span><img src="http://arch.s3.netease.com/hzdev-appci/Android.png" style="height:50px;width:50px;"></span>
  					<div>
  						<p style="line-height:50px;">{{info.basic_info.app}}</p>
  					</div>
  			</div>
  		</div>
  		<div class="col-sm-2 m-auto">
  			<div>
  				<p>测试设备：{{info.basic_info.device_info.brand}}-{{info.basic_info.device_info.model}}</p>
  				<p>SDK版本：{{info.basic_info.device_info.sdk}}</p>
  			</div>
  		</div>
  		<div class="col-sm-2 m-auto">
  			<p>开始时间：{{info.record_info.start_time}}</p>
  			<p>总计耗时：{{info.record_info.total_time}}</p>
  		</div>
  		<div class="col-sm-2 m-auto">
  			<p>测试步数：{{info.record_info.steps}}</p>
  		</div>
  		<div class="col-sm-4 m-auto">
  			<div>
  				<p class="results">测试结果: 成功</p>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
    	info: {
    		basic_info: {
    			app: '111',
    			device_info: {
    				brand: '',
    				model: '',
    				sdk: ''
    			}
    		},
    		record_info: {
  				start_time: '',
  				total_time: '',
  				steps: ''
    		}
    	}
    }
  },
  mounted () {
  	let _this = this
  	$.getJSON('info.json').then((ret) => {
  		_this.info = ret
  	})
  }
}
</script>

<style scoped>
	.summary{
		text-align: center;
		background-color: #d8d8d8;
		color: black;
		height: 140px;
	}

	.results{
		font-size: 26px;
	}

	p {margin-bottom: 0px;}
</style>
