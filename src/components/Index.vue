<template>
  <div>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <a href="#" class="my-0 mr-md-auto font-weight-normal">
        <img class="logo sm_img" src="@/assets/APKCI.png" alt style="width: 80px;height: 20px;margin-right: 20px;">
      </a>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">模版列表</a>
        <a class="p-2 text-dark" href="#">创建新模板</a>
        <a class="p-2 text-dark" target="_blank" href="http://wifiphone.nie.netease.com">
          设备管理 <i class="fa fa-external-link"></i>
        </a>
        <a class="p-2 text-dark" target="_blank" href="http://10.246.46.160:8080/job/K-apk-onephone-test-pipeline/">
          Jenkins <i class="fa fa-external-link"></i>
        </a>
        <a class="p-2 text-dark" href="/about">关于
          <span class="sr-only"></span>
        </a>
        <a class="p-2 text-dark" href="/logout">退出
          <span class="sr-only"></span>
        </a>
      </nav>
      <a class="btn btn-outline-primary" href="#">Sign up</a>
    </div>
    <div class="container">
      <table class="table table-hover">
        <thead>
        <tr>
          <th>Name</th>
          <th class="text-center">操作</th>
          <th>创建时间</th>
          <th>创建人</th>
          <th>其他</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="t in templates" :key="t.id">
          <td>
            {{t.title}}
          </td>
          <td class="text-center">
            <button class="btn btn-xs btn-link" @click.prevent='runTest(t.id)'>一键测试</button>
            <a class="btn btn-xs btn-link" :href='"/templates/"+t.id'>
              <i class="fa fa-cog"></i> 配置</a>
            <a class="btn btn-xs btn-link" :href='"/templates/"+t.id+"/history"'>
              <i class="fa fa-history"></i> 历史</a>
          </td>
          <td>{{t.createdAt|timeSince}}</td>
          <td>{{t.email}}</td>
          <td>
            <a href="#" @click.prevent="deleteTemplate(t)">
              <i class="fa fa-trash"></i> 删除
            </a>
          </td>
        </tr>
        </tbody>
      </table>
      <p class="text-right">&copy;Copyright Netease-game 2018</p>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "Index",
    data() {
      return {
        templates: []
      }
    },
    mounted: function () {
      var _this = this
      $.ajax({
        url: "http://10.240.169.75:7000",
        type: "get",
        success: function (data) {
          var result = JSON.parse(data)
          if (result.success) {
            _this.templates = result.templates
            console.log(this.templates)
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    },
    created: function () {

    },
    filters: {
      "timeSince": function (value) {
        return this.moment(value).fromNow();
      }
    }
  }
</script>

<style scoped>
  .vue-title > i {
    display: none;
  }

  .vue-title:hover > i {
    display: inline-block;
  }
</style>
