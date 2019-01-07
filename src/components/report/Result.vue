<template>
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
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      result: {
        count: {
          total: '',
          success: '',
          fail: ''
        }
      }
    }
  },
  mounted () {
    // alert("sf");
    let _this = this
    // $.getJSON("info.json").then(ret => {
    //   _this.info = ret;
    // });

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
            // {value: _this.result.count.success, name: '成功'},
            // {value: _this.result.count.fail, name: '失败'}
            {value: '2', name: '成功'},
            {value: '3', name: '失败'}
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
    };
    if (option && typeof option === 'object') {
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>
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
</style>
