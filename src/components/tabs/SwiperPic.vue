<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-1 anchor">
        <h2>事件点</h2>
        <div class="list-group">
          <a href="#" class="list-group-item anchor-li" v-for="(item, index) in eventPoint" :key="index" @click="picTo(item.value)">{{item.text}}</a>
        </div>
      </div>
      <div class="col-lg-11">
        <div class="row">
          <div class="col-lg-12">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(slide, index) in virtualData.slides" :key="index" :style="{left: `${virtualData.offset}px`}"><img :src="slide" :width="imgWith"/></div>
              </div>
              <div class="swiper-scrollbar"></div>
            </div>

          </div>
          <div class="col-lg-12" style="text-align: center; font-size: 20px">
            <span>{{activeIndex+2}}/{{picCount}}</span>
          </div>
          <div class="col-lg-2 goPic">
              <div class="row">
                <div class="col-lg-8">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="想要去的页数" v-model="picNum">
                    <span class="input-group-btn">
                    <button class="btn btn-default" type="button" @click="picTo(picNum)">GO</button>
                    </span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Swiper from 'swiper/dist/js/swiper.esm.bundle'

export default {
  // components: {
  //   swiper,
  //   swiperSlide
  // },
  props: {
  },
  data () {
    return {
      eventPoint: [
        {text:'第1张图片',value:1},
        {text:'第10张图片',value:10},
        {text:'第20张图片',value:20},
        {text:'第500张图片',value:500},
        {text:'第100张图片',value:100},
        {text:'第200张图片',value:200},
        {text:'第500张图片',value:500},
        {text:'第700张图片',value:700},
        {text:'第900张图片',value:900},
        {text:'第1000张图片',value:1000},
      ],
      swiper: null,
      activeIndex: 1,
      picNum: 1,
      slides:[],
      virtualData: {
        slides: [],
      },
    }
  },
  computed: {
    imgWith(){
      return (this.swiper.width/3)
    }
  },
  created(){
    $.ajax({
      url: '/static/pic/record2.json',
      async: false,
      success: (response) => {
        this.swiperData = response.steps;
        this.picCount = this.swiperData.length
      }
    });
    const slides = [];
    // slides.push("<div></div>");
    for (let i = 0; i < this.swiperData.length; i += 1) {
      const srcs = '/static/pic/' + this.swiperData[i].screenshot;
      slides.push(srcs)
    }
    // slides.push("<div></div>");
    this.slides = slides;
  },
  mounted() {
    this.swiper = new Swiper('.swiper-container', {
      keyboard : true,
      mousewheel: true,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true,//修改swiper的父元素时，自动初始化swiper
      spaceBetween : 100,
      slidesPerView: 3,
      virtual: {
        slides: this.slides,
        renderExternal: (data)=> {
          this.virtualData = data;
        },
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
        draggable: true,
      },
      on:{
        transitionEnd: () =>{
          this.activeIndex = this.swiper.activeIndex
        },
      },
    });
    // this.swiper.virtual.prependSlide();
    this.swiper.virtual.appendSlide();
  },
  methods: {
    picTo (num) {
      this.swiper.slideTo(parseInt(num)-2, 1000, false);
    },
  }
}
</script>

<style scoped>
.anchor{
  height: 600px;
  background-color: #EEEEEE;
}
  .anchor-li{
    background-color: #EEEEEE;
    border: 0;
    color: #424242;
    font-size: 18px;
  }
  .goPic{
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
