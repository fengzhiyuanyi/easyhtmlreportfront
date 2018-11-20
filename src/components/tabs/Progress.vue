<template>
  <div id="wrapper">
    <swiperPic></swiperPic>
    <div id="videoBox" class="box">
      <div style="display:inline-block;">
        <video src="video.mp4" id="video" controls ></video>
        <br>
        <input type="number" name="speedbtn" v-model="speed" min="0" max="8" @change="onChange" />
        <label>倍播放速度</label>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import swiperPic from './SwiperPic'
export default {
  components: { swiperPic },
  data () {
    return {
      speed: '',
      show: false,
      query: {
        pageIndex: 1,
        pageSize: 30
      },
      totaldata: [],
      nova: [],
      hiddenPager: false,
      totalCount: ''
    }
  },
  methods: {
    onChange () {
      let video = document.getElementById('video')
      video.playbackRate = Number.parseFloat(this.speed)
    },
    setPlaySpeed () {
      var video = document.getElementById('video')
      var speed = document.getElementsByName('speed')[0]
      video.playbackRate = parseFloat(speed.value)
    },
    changeshow () {
      this.show = !this.show
    }
  }
}

</script>
<style>
#videoBox{
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.out video{
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

#fwindow1 {
  z-index: 999;
  position: fixed;
  left: 0px;
  top: 0px;
}

#pic {
  margin-bottom: 20px;
  padding: 5px;
  background-color:aliceblue;
  position: relative;
}

img {
  margin-bottom: 5px;
  max-height: 400px
}

.hiddenPager {
  visibility: hidden;
}

.jqPager{
  position: relative;
}

.jumpBox{
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
