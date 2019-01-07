<template>
  <div id="app">
    <headpage></headpage>
    <!--<basepage></basepage>-->
    <div class="wrapper_main">
      <div class="Application_cont">
        <!--<div class="Application_menu">-->
          <!--<ul id="menu_title">-->
            <!--<router-link to="/overview" tag="li">测试总览</router-link>-->
            <!--<router-link to="/comparison" tag="li">性能对比</router-link>-->
            <!--<router-link to="/details" tag="li">设备详情</router-link>-->
          <!--</ul>-->
        <!--</div>-->
        <div id="con">
          <section class="information_Presentation" style="display: block;">
            <resultwpage></resultwpage>
            <!--<detailspage></detailspage>-->
            <!--<comparisonpage></comparisonpage>-->
          </section>
        </div>
      </div>
    </div>
    <div id="floatvideo" v-drag>
      <video id="video" class="video-js vjs-big-play-centered vjs-default-skin vjs-loading-spinner" preload="true">
        <source src="video.mp4" type="video/mp4">
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
import headpage from "./Header";
// import basepage from "./report/Base";
import resultwpage from "./report/Result";
// import detailspage from "./report/Details";
// import comparisonpage from "./report/Comparison";

export default {
  name: "ReportApp",
  data() {
    return {}
  },
  components: {
    headpage,
    // basepage,
    resultwpage,
    // detailspage,
    // comparisonpage,
  }

}
</script>

<style scoped>

</style>
