<template>
  <div class="Progress_box">
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
                @keyup.enter.native="searchEvent"
                size="mini"
                placeholder="请输入关键字进行搜索"/>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="21">
        <div style="height:360px">
          <swiper :options="swiperOption" ref="mySwiper">
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div>
          </swiper>
          <div style="text-align: center;padding-top: 20px">
            <span style="font-size: 15px; font-weight: bold" >{{activePic}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import $ from "jquery";

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
        errorTime: '',
        coverflowEffect: {
          rotate: 5,
          stretch: 8,
          depth: 100,
          modifier: 5,
          slideShadows: true
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          transitionEnd: () => {
            if (this.eventPic.indexOf(this.swiper.activeIndex) === -1) {
              this.activePic = "第 " + (this.swiper.activeIndex+1) + " 张图片  " + this.swiperData[this.swiper.activeIndex].time;
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
      url: 'http://10.240.172.253:7000/report/local_task/local_device/record',
      async: false,
      success: (response) => {
        this.swiperData = response.data.steps;
        this.picCount = this.swiperData ? this.swiperData.length : 0;

        const slides = [];
        const event=[];
        for (let i = 0; i < this.picCount; i += 1) {
          const srcs = this.swiperData[i].screenshot;
          const arr=this.swiperData[i].code.split("\n")
          if(arr[1].indexOf("##")!==-1){
            event.push({text: arr[1].split("##")[1], value: (i+1), time: this.swiperData[i].time})
          }else {
            var content = {text: "第 " + (i + 1) + " 张图片  " + this.swiperData[i].time, value: (i+1), time: this.swiperData[i].time};
            event.push(content)
          }
          // this.eventPoint.push(i)
          slides.push("<img src=" +  srcs + " height='300px'"+"/>")
        }
        this.eventPoint = event;
        this.swiperOption.virtual.slides = slides;
      }
    });

  },
  mounted() {
    this.swiper.init();
    mousewheel: true;
    if (this.$route.params.time !== ''){
      this.search = this.$route.params.time;
      this.errorLocation();
    }
  },
  methods: {
    picTo (row) {
      this.swiper.slideTo(parseInt(row.value)-1, 1000, false);
    },
    searchEvent (){
      for(let index in this.eventPoint){
        if (this.eventPoint[index].text.indexOf(this.search) > -1){
          this.swiper.slideTo(index, 1000, false);
          break;
        }
      }
    },
    errorLocation (){
      var searchs = this.search.split(":")
      var timecell = -1;
      for(let index in this.eventPoint){
        var timearr = this.eventPoint[index].time.split(":")
        var tmp = Math.abs((searchs[0] - timearr[0]) * 3600 + (searchs[1] - timearr[1]) * 60 + searchs[2] - timearr[2]);
        if (timecell === -1 || tmp <= timecell){
          timecell = tmp;
        }else {
          this.swiper.slideTo(index - 1, 1000, false);
          break;
        }
      }
    }
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

  .swiper-container-horizontal>.swiper-scrollbar {
    position: relative;
  }

  .swiper-scrollbar{
    margin-top: 30px;
  }

</style>

