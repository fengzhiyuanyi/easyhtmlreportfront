<template>
  <div id="app">
    <headpage></headpage>
    <summarypage></summarypage>
    <div id="wrp">
      <button class="btn">数据下载</button>
      <button class="btn">生成PDF</button>
      <button class="btn" @click="linkto('log.txt')">游戏日志</button>
      <div id="tabs">
        <router-link to="/perf"><span class="select">性能数据</span></router-link>
        <router-link to="/progress"><span >过程详情</span></router-link>
        <router-link to="/trace"><span >Trace收集</span></router-link>
      </div>
      <div id="con">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import headpage from './components/Header'
import summarypage from './components/Summary'
import $ from 'jquery'
export default {
  name: 'App',
  components: {
    headpage,
    summarypage
  },
  methods: {
    linkto (e) {
      window.location.href = e
    }
  },
  mounted: function () {
    $('#tabs span').click(function () {
      $('#tabs span').removeClass('select')
      $(this).addClass('select')
    })
  }
}
</script>

<style scoped>
  #tabs {
      height: 60px;
      width: 66.66%;
      margin-top: 50px;
  }

  #tabs span {
      float: left;
      height: 60px;
      line-height: 60px;
      width: 25%;
      font-size: 28px;
      text-align: center;
      color: black;
      background: #008B8B;
      border: 1px solid gray;
  }

  #tabs span.select {
      background: #dc3545;
      color: #ccc;
  }

  p{
    margin-bottom: 0px;
  }

  #con {
    padding: 50px 80px 0px 80px;
    border-top: 1px solid black;
  }
  .btn {
    float: right;
    margin-right: 50px;
  }
</style>
