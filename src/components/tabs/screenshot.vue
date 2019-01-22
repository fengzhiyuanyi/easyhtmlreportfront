<template>
  <div class="Screenshot_box">
    <div class="row" style="min-height: 400px;">
      <div id="no-screenshot" v-if="hiddenPager">暂无截图数据!</div>
      <div class="col-md-4" v-for="(v, index) in nova" :key="index">
        <div id="pic">
          <img class="img-thumbnail" :src="v.screenshot">
          <strong>{{index+1}}</strong>
          <div class="pull-right" style="font-weight:bold">{{v.time}}</div>
        </div>
      </div>
    </div>
    <div class="jqPager" v-if="hiddenPager === false">
      <ul id="jqPage" class="pagination"></ul>
      <div class="jumpBox">
        <input type="number" class="jumppage" id="jumpPageIndex">
        <a href="javascript:;" class="jumpbtn" @click="pageSkip()">跳转</a>
      </div>
    </div>
  </div>
</template>
<script>
import { jqPaginator } from "../../assets/jqpaginator.min.js";
import $ from "jquery";
export default {
  data() {
    return {
      speed: "",
      show: false,
      query: {
        pageIndex: 1,
        pageSize: 30
      },
      totaldata: [],
      nova: [],
      hiddenPager: false,
      totalCount: ""
    };
  },
  methods: {
    onChange() {
      let video = document.getElementById("video");
      video.playbackRate = Number.parseFloat(this.speed);
    },
    setPlaySpeed() {
      var video = document.getElementById("video");
      var speed = document.getElementsByName("speed")[0];
      video.playbackRate = parseFloat(speed.value);
    },
    changeshow() {
      this.show = !this.show;
    },
    getPics() {
      let _this = this;
      let taskId = _this.$route.query.taskId
      let deviceIp = _this.$route.query.deviceIp
      let url = 'http://10.240.172.253:7000/report/' + taskId + '/' + deviceIp.replace(/\./g, '_') + '/record'
      // url = 'http://10.240.172.253:7000/report/local_task/local_device/record'
      $.get(url).then(ret => {
        _this.totaldata = ret.data.steps;
        _this.totalCount = ret.data.steps.length;
      });
    },
    initPager: function() {
      $("#jqPage").jqPaginator({
        visiblePages: 1,
        currentPage: 1,
        totalPages: 1,
        first:
          '<li class="page-item" id="first"><a class="page-link" href="javascript:void(0);">首页</a></li>',
        prev:
          '<li class="page-item" id="prev"><a class="page-link" href="javascript:void(0);">上一页 </a></li>',
        next:
          '<li class="page-item" id="next"><a class="page-link" href="javascript:void(0);">下一页</a></li>',
        last:
          '<li class="page-item" id="last"><a class="page-link" href="javascript:void(0);">尾页</a></li>',
        page:
          '<li class="page-item" class="page"><a class="page-link" href="javascript:void(0);">{{page}}</a></li>'
      });
    },

    // 获取数据并根据结果配置分页
    getData: function() {
      var _this = this;
      if (this.totaldata.length > 0) {
        this.nova = this.totaldata.slice(
          (this.query.pageIndex - 1) * this.query.pageSize,
          this.query.pageIndex * this.query.pageSize
        );
        // 核心配置在此部，根据后台返回数据控制分页器该如何显示
        // 想要完全掌握这个分页器，你可以研究下jgPaginator.js源码，很容易修改。
        $("#jqPage").jqPaginator("option", {
          totalCounts: _this.totalCount, // 后台返回数据总数
          pageSize: _this.query.pageSize, // 每一页显示多少条内容
          currentPage: _this.query.pageIndex, // 现在的页码
          visiblePages: 10, // 最多显示几页

          // 翻页时触发的事件
          onPageChange: function(num) {
            // app.query.pageIndex = num;
            _this.pageChangeEvent(num); // 调用翻页事件
          }
        });
      }else{
        this.hiddenPager = true;
      }
    },
    // 翻页或者跳页事件
    pageChangeEvent: function(pageIndex) {
      this.query.pageIndex = Number(pageIndex);
      this.getData();
    },

    // 跳页-选用功能，可有可无
    pageSkip: function() {
      var maxPage = 1; // 默认可以跳的最大页码
      var targetPage = document.getElementById("jumpPageIndex").value; // 目的页面
      if (!targetPage) {
        alert("请输入页码");
        return;
      }

      // 计算最大可跳页数
      maxPage = Math.floor(this.totalCount / this.query.pageSize);
      if (maxPage < 1) {
        maxPage = 1;
      }

      if (targetPage > maxPage) {
        alert("超过最大页数了，当前最大页数是" + maxPage);
        return;
      }
      this.pageChangeEvent(targetPage);
    }
  },
  mounted() {
    let _this = this;
    this.getPics();
    setTimeout(() => {
      _this.initPager();
    }, 50);
    setTimeout(() => {
      _this.getData();
    }, 1000);
  }
};
</script>
<style>
#videoBox {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.out video {
  width: 100%;
}

#videoBox.in {
  animation: ac 1s;
}

#videoBox.out {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  z-index: 999;
  animation: an 0.5s;
  margin-bottom: 0px;
}

#no-screenshot{
  margin: auto;
  font-size: large;
}

#fwindow1 {
  z-index: 999;
  position: fixed;
  left: 0px;
  top: 0px;
}

#pic {
  margin-bottom: 20px;
  position: relative;
}

img {
  max-height: 400px;
}

.jqPager {
  position: relative;
}

.jumpBox {
  position: absolute;
  top: 0;
  right: 300px;
}

.jumppage {
  display: block;
  width: 42px;
  padding-left: 8px;
  float: left;
  height: 34px;
  outline: none;
}

.jumpbtn {
  float: left;
  display: block;
  height: 34px;
  line-height: 34px;
  margin-left: 5px;
}

.jqPager .pagination {
  float: initial;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}

.jqPager .pagination li {
  display: inline-block;
}
</style>
