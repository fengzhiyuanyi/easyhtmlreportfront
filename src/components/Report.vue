<template>
  <div>
    <headPage></headPage>
    <summaryPage></summaryPage>
    <div class="wrapper_main">
      <div class="Application_cont">
        <div class="Application_menu">
          <ul id="menu_title">
            <router-link to="/screenshot" tag="li">游戏截图</router-link>
            <router-link to="/progress" tag="li">测试步骤</router-link>
            <router-link to="/perf" tag="li">性能数据</router-link>
            <router-link to="/trace" tag="li">Trace收集</router-link>
          </ul>
        </div>
        <div id="con">
          <section class="information_Presentation" style="display: block;">
            <router-view></router-view>
          </section>
        </div>
      </div>
    </div>
    <div id="floatvideo" v-drag>
      <video id="video" class="video-js vjs-big-play-centered vjs-default-skin" preload="true">
        <source src="" type="video/mp4">
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a
            href="http://videojs.com/html5-video-support/"
            target="_blank"
          >supports HTML5 video</a>
        </p>
      </video>
    </div>
  </div>
</template>

<script>
import headPage from "./Header";
import summaryPage from "./Summary";
import videojs from "video.js";
import "videojs-contrib-hls";
import $ from "jquery";
export default {
  name: "Report",
  data() {
    return {
      // video_url: 'https://arch.s3.netease.com/hzdev-appci/monkeytest/video/local_task/local_device/video.mp4',
      tabIndex: 0,
      flag: false, //鼠标|手指是否按下的标记
      speed: 1,
      cur: {
        //记录鼠标|手指按下时的坐标
        x: 0,
        y: 0
      },
      nx: 0,
      ny: 0,
      dx: 0,
      dy: 0,
      x: 0,
      y: 0
    };
  },
  components: {
    headPage,
    summaryPage
  },
  methods: {
    linkto(e) {
      window.location.href = e;
    },
  },
  directives: {
    drag: {
      inserted: function(el) {
        var oDiv = el;
        oDiv.onmousedown = function(ev) {
          var disX = ev.clientX - oDiv.offsetLeft;
          var disY = ev.clientY - oDiv.offsetTop;
          document.onmousemove = function(ev) {
            var l = ev.clientX - disX;
            var t = ev.clientY - disY;
            oDiv.style.left = l + "px";
            oDiv.style.top = t + "px";
          };
          document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  },
  mounted: function() {
    $.get('http://10.240.172.253:7000/report/local_task/local_device/video').then(ret => {
      var options = {
      preload: "auto",
      width: "482",
      height: "316",
      controls: "control",
      controlBar: {
        currentTimeDisplay: true,
        volumePanel: {
          inline: false
        },
        timeDivider: true,
        durationDisplay: true,
        remainingTimeDisplay: true,
        fullscreenToggle: true,
        PlaybackRateMenuButton: {
          playbackRates: [0.1, 0.5, 1, 1.5, 2, 5]
        },
        children: [
          { name: "playToggle" },
          { name: "progressControl" },
          { name: "currentTimeDisplay" },
          { name: "timeDivider" },
          { name: "durationDisplay" },
          { name: "volumePanel", inline: false },
          { name: "PlaybackRateMenuButton" },
          { name: "fullscreenToggle" }
        ]
      },
      autoplay: true
    };
      let myPlayer = videojs("#video", options, function() {
        console.log("播放器初始化完成"); //回调函数
      });
      // alert(ret.data.video)
      myPlayer.src(ret.data.video)
      myPlayer.load()
    })
  }
}
</script>

<style>
  @import url('video.js/dist/video-js.css');
  #floatvideo {
    position: absolute;
    top: 325px;
    left: calc(100% - 482px);
    width: 100px;
    height: 100px;
    background: #bbbbbb;
    z-index: 9999;
  }

  .router-link-active {
    color: #1f5dea;
    border-bottom: 2px solid #1f5dea;
  }

  .video {
    width: 482px;
    height: 316px;
  }

  .vjs-paused .vjs-big-play-button,
  .vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block;
  }

  .video-js .vjs-big-play-button {
    font-size: 2.5em;
    line-height: 2.3em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(115, 133, 159, 0.5);
    border-width: 0.15em;
    margin-top: -1.25em;
    margin-left: -1.75em;
  }
  .vjs-volume-panel {
    height: 50%;
  }

  /* 中间的播放箭头 */
  .vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em;
  }
  .video-js .vjs-time-control {
    display: block;
    padding-left: 0;
    padding-right: 0;
  }
  .video-js .vjs-time-divider {
    padding-left: 3px;
    padding-right: 3px;
    min-width: inherit;
  }
  .video-js .vjs-remaining-time {
    display: none;
  }
  .video-js .vjs-current-time {
    display: block;
  }
</style>
