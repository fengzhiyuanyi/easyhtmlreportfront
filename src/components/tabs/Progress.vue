<template>
  <div class="Progress_box">
    <section id="dg-container" class="dg-container">
      <div class="dg-wrapper">
        <a href="#" v-for="(slide, index) in virtualData.slides" :key="index">
          <img class="img-size" :src="slide">
          <div style="font-weight:bold">{{index}}</div>
        </a>
      </div>
      <nav>
        <span class="dg-prev">&lt;</span>
        <span class="dg-next">&gt;</span>
      </nav>
    </section>
  </div>
</template>
<script>
import $ from "jquery";
import gallery from "../../assets/jquery.gallery.js";
export default {
  data() {
    return {
      virtualData: {
        slides: [
        ]
      }
    };
  },
  methods: {
    getTrace() {
      let _this = this;
      $.getJSON("./info.json").then(ret => {
        _this.trace_list = ret.trace_info.trace_list;
      });
    }
  },
  mounted() {
    this.getTrace();
    $(function() {
      $("#dg-container").gallery();
    });
  }
};
</script>
<style>
.dg-container {
  width: 100%;
  height: 450px;
  position: relative;
}
.dg-wrapper {
  width: 481px;
  height: 316px;
  margin: 0 auto;
  margin-top: 75px;
  position: relative;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -o-perspective: 1000px;
  -ms-perspective: 1000px;
  perspective: 1000px;
}
.dg-wrapper a {
  width: 482px;
  height: 316px;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

.img-size {
  width: 100%;
  height: 100%;
}
.dg-wrapper a.dg-transition {
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.dg-wrapper a img {
  display: block;
  padding: 0px 0px 0px 1px;
}
.dg-wrapper a div {
  text-align: center;
  line-height: 50px;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
  color: #333;
  font-size: 16px;
  width: 100%;
  bottom: -55px;
  display: none;
  position: absolute;
}
.dg-wrapper a.dg-center div {
  display: block;
}
.dg-container nav {
  width: 58px;
  position: absolute;
  z-index: 1000;
  bottom: 40px;
  left: 50%;
  margin-left: -29px;
}
.dg-container nav span {
  text-indent: -9000px;
  float: left;
  cursor: pointer;
  width: 24px;
  height: 25px;
  opacity: 0.8;
  background: transparent url(./images/arrows.png) no-repeat top left;
}
.dg-container nav span:hover {
  opacity: 1;
}
.dg-container nav span.dg-next {
  background-position: top right;
  margin-left: 10px;
}
</style>
