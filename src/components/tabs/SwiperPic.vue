<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-1 anchor">
        <h2>事件点</h2>
        <div class="list-group">
          <a href="#" class="list-group-item anchor-li" v-for="(item, index) in anchorPoint" :key="index" @click="picTo(item.value)">{{item.text}}</a>
        </div>
      </div>
      <div class="col-lg-11">
        <div class="row">
          <div class="col-lg-12">
            <div>
              <swiper :options="swiperOption" ref="mySwiper" >
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
                <div class="swiper-scrollbar"   slot="scrollbar"></div>
              </swiper>
            </div>
          </div>
          <div class="col-lg-12" style="text-align: center; font-size: 20px">
            <span>{{picNum}}/{{picCount}}</span>
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
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
  },
  data () {
    return {
      activeIndex: 1,
      picNum: 2,
      picCount: 0,
      anchorPoint: [
        {text: '第1张', value: 1},
        {text: '第5张', value: 5},
        {text: '第10张', value: 10},
        {text: '第15张', value: 15},
        {text: '第20张', value: 20}
      ],
      swiperOption: {
        virtual: {
          slides: (function () {
            let data = null;
            $.ajax({
              url: '/static/pic/record2.json',
              async: false,
              success: (response) => {
               data = response.steps;
              }
            });
            const slides = [];
            for (let i = 0; i < data.length; i += 1) {
              const srcs = '/static/pic/' + data[i].screenshot;
              slides.push("<img class='swiper-lazy' src=" +  srcs + "/>")
            }
            return slides;
          }()),
        },
        initialSlide: 0,
        slidesPerView: 3,
        spaceBetween: 200,
        keyboard: true,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 10,
          stretch: 10,
          depth: 100,
          modifier: 1,
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
            this.activeIndex = this.swiper.activeIndex;
            this.picNum = this.activeIndex + 2;
          }
        }
      },
      swiper111: {
        fontSize: '30px',
        textAlign: 'center',
        lineHeight: '460px',
        height: '460px',
        backgroundColor: 'aqua'
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    picTo (num) {
      this.swiper.slideTo(num - 2, 1000, false);
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
