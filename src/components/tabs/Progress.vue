<template>
  <el-row>
    <el-col :span="3">
      <el-table
        :data="eventPoint.filter(data => !search || data.text.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        max-height="360"
        @row-click="picTo">
        <el-table-column
          prop="text">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="请输入事件点关键字搜索"/>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="21">
      <el-card style="height:360px">
        <swiper :options="swiperOption" ref="mySwiper">
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-scrollbar"   slot="scrollbar"></div>
        </swiper>
        <div style="text-align: center;padding-top: 9px">
          <span style="font-size: 15px">{{activePic}}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import $ from "jquery";
  import gallery from "../../assets/jquery.gallery.js";

  export default {
    components: {
      swiper,
      swiperSlide
    },
    props: {
    },
    data () {
      return {
        swiperData: [],
        activePic: "",
        picNum: 0,
        picCount: 0,
        eventPoint: [],
        search:'',
        eventPic:[],
        swiperOption: {
          init: false,
          virtual: {
            slides: [],
          },
          mousewheel:true,
          initialSlide: 1,
          slidesPerView: 3,
          centeredSlides:true,
          keyboard: true,
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 5,
            stretch: 8,
            depth: 100,
            modifier: 5,
            slideShadows: true
          },
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            hide: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            transitionEnd: () => {
              if(this.eventPic.indexOf(this.swiper.activeIndex)==-1) {
                this.activePic = "第" + (this.swiper.activeIndex+1) + "张图片";
              }else {
                this.activePic=this.eventPoint[this.eventPic.indexOf(this.swiper.activeIndex)].text;
              }
            },
          },
        },
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    created(){
      $.ajax({
        url: 'record.json',
        async: false,
        success: (response) => {
          this.swiperData = response.steps;
          this.picCount = this.swiperData.length
        }
      });
      const slides = [];
      const event=[];
      for (let i = 0; i < this.swiperData.length; i += 1) {
        const srcs = this.swiperData[i].screenshot;
        const arr=this.swiperData[i].code.split("\n")
        if(arr[1].indexOf("##")!=-1){
          event.push({text:arr[1].split("##")[1],value:(i+1)})
          this.eventPic.push(i)
        }
        slides.push("<img src=" +  srcs + " height='300px'"+"/>")
      }
      this.eventPoint = event;
      this.swiperOption.virtual.slides = slides;
    },
    mounted() {
      this.swiper.init();
      mousewheel: true;
    },
    methods: {
      picTo (row, event, column) {
        this.swiper.slideTo(parseInt(row.value)-1, 1000, false);
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

