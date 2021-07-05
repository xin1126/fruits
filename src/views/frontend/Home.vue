<template>
  <div class="position-relative vh-100 bg-white mb-md-8 mb-5">
    <Swiper
      effect="fade"
      :loop="true"
      :loopFillGroupWithBlank="true"
      :autoplay="autoplay"
    >
      <SwiperSlide v-for="(item, index) in 3" :key="item" class="w-100"
        ><div :class="'home-banner' + (index + 1)" class="w-100">
          <div
            class="
              container-md
              d-flex
              align-items-center
              justify-content-center justify-content-md-start
              w-100
              vh-100
              pb-5
            "
          >
            <div class="title-banner p-4 p-md-0 rounded rounded-3">
              <h2 class="fw-bold" data-aos="zoom-in" data-aos-duration="1000">
                每日新鮮水果<span class="title-comma">，</span
                ><span class="title-content">健康天天有</span>
              </h2>
              <p class="text-dark mb-2">
                {{ typewriter }}
                <span
                  class="
                    animate__animated
                    animate__infinite
                    animate__flash
                    animate__slower
                  "
                  >|</span
                >
              </p>
              <button
                type="button"
                class="btn btn-primary btn"
                @click="$router.push('/products')"
              >
                立即選購
              </button>
            </div>
          </div>
        </div></SwiperSlide
      >
    </Swiper>
    <div
      class="arrow banner-arrow position-absolute end-50 cursor-pointer mb-4"
      v-scroll-to="{
        el: '#content',
        offset: -100,
      }"
    >
      <i
        class="
          d-flex
          align-items-end
          justify-content-center
          bi bi-arrow-down-circle-fill
          text-dark
          fs-1
          h-100
          animate__animated
          animate__infinite
          animate__fadeInDown
          animate__slower
        "
      ></i>
    </div>
  </div>
  <div class="container mb-5" id="content">
    <div class="row article justify-content-center mb-5">
      <img class="col-md-6" src="@/assets/images/benefit1.jpg" alt="" />
      <div class="col-md-6 col-sm-10" data-aos="fade" data-aos-duration="2000">
        <div class="article-content right shadow py-4 w-100">
          <h4 class="fw-bold pe-4 text-end">為什麼每日需攝取水果?</h4>
          <p class="text-dark px-4">
            水果攝取不足對健康的危害和吸煙相當。有研究顯示，現代人七成以上蔬果攝取量嚴重不足，加上脂肪攝食量偏高，
            使得乳癌、大腸直腸癌、肺癌及前列腺癌罹患率節節高升，維生素C的缺乏，容易造成疲勞、瘀青、牙齦出血、傷口不容易癒合。
          </p>
        </div>
      </div>
    </div>
    <div
      class="
        row
        article
        justify-content-center
        flex-column-reverse flex-sm-row
        mb-md-8 mb-5
      "
    >
      <div
        class="col-md-6 col-sm-10"
        data-aos="fade"
        data-aos-duration="2000"
        data-aos-delay="300"
      >
        <div class="article-content left shadow py-4 w-100">
          <h4 class="fw-bold ps-4">水果是真正的保健品</h4>
          <p class="text-dark px-4">
            水果是維他命、礦物質、膳食纖維和生物活性物質的重要來源。
            可刺激胃腸蠕動和消化液分泌，增加食欲，幫助消化，還能預防糖尿病。
            增強身體抵抗力，預防感冒，消除疲勞，並可降低血液中膽固醇的含量，預防靜脈血管中血栓的形成。
          </p>
        </div>
      </div>
      <img class="col-md-6" src="@/assets/images/benefit2.jpg" alt="" />
    </div>
  </div>
  <div
    class="parallax position-relative"
    :class="{ 'mb-5': view, 'mb-md-8': view }"
  >
    <ul
      class="
        position-absolute
        top-50
        start-50
        translate-middle
        p-0
        w-100
        d-flex
        flex-column
        align-items-center
      "
    >
      <li class="wow fadeInUp text mb-3" data-wow-duration="1s">
        三餐在外，大魚大肉，水果攝取不足嗎?
      </li>
      <li
        class="wow fadeInUp text mb-3"
        data-wow-duration="1s"
        data-wow-delay="0.2s"
      >
        上班忙碌苦惱沒時間逛果菜市場？
      </li>
      <li
        class="wow fadeInUp text mb-3"
        data-wow-duration="1s"
        data-wow-delay="0.4s"
        data-wow-offset="-150"
      >
        疫情期間不出門是否擔心水果攝取不足？
      </li>
      <li
        class="wow fadeIn title"
        data-wow-duration="1.5s"
        data-wow-delay="0.8s"
        data-wow-offset="-200"
      >
        <span class="logo text-primary text-center d-block d-md-inline me-1"
          >Fresh Fruits</span
        >
        <span class="fw-bold">提供優質新鮮水果線上訂購配送服務!</span>
        <div
          class="cursor-pointer mx-auto mt-3"
          v-if="arrow"
          v-scroll-to="{
            el: '#main',
            offset: -80,
          }"
        >
          <i
            class="
              d-flex
              align-items-end
              justify-content-center
              bi bi-arrow-down-circle-fill
              text-gray
              fs-1
              h-100
              animate__animated
              animate__infinite
              animate__fadeInDown
              animate__slower
            "
          ></i>
        </div>
      </li>
    </ul>
  </div>
  <main v-if="view" id="main">
    <div class="container mb-md-8 mb-5">
      <div class="row">
        <div class="col-5 d-flex justify-content-center d-none d-md-flex">
          <img
            class="h-lg-75"
            src="@/assets/images/farmer.png"
            alt="fruitGrower"
          />
        </div>
        <div class="col-md-7">
          <h3 class="fw-bold text-center">新鮮、健康，宅配到家</h3>
          <ul class="p-0">
            <li class="wow fadeInUp d-flex mb-3" data-wow-duration="1s">
              <i class="bi bi-award fs-2 text-primary me-3"></i>
              <div>
                <p class="fs-5 fw-bold text-primary">有機認證</p>
                <p>
                  國際雙認證有機栽種，品質嚴選安心購買，呵護您與家人的健康，希望帶給人們健康生活，從吃的營養開始！
                </p>
              </div>
            </li>
            <li
              class="wow fadeInUp d-flex mb-3"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <i
                class="
                  bi bi-hand-thumbs-up
                  text-center
                  d-block
                  fs-2
                  text-primary
                  me-3
                "
              ></i>
              <div>
                <p class="fs-5 fw-bold text-primary">新鮮水果</p>
                <p>
                  提供新鮮優質水果，讓我們的消費者享受到香甜、美味、可口的水果伊甸園，美味果品，品悅人生。
                </p>
              </div>
            </li>
            <li
              class="wow fadeInUp d-flex mb-3"
              data-wow-duration="1s"
              data-wow-delay="0.6s"
            >
              <i class="bi bi-truck d-block fs-2 text-primary me-3"></i>
              <div>
                <p class="fs-5 fw-bold text-primary">快速送貨</p>
                <p>
                  本公司非常重視消費者的購物體驗，為提供您更好的服務以及更優質的服務體驗，我們將提供更具效率的送貨服務
                </p>
              </div>
            </li>
            <li
              class="wow fadeInUp d-flex mb-3"
              data-wow-duration="1s"
              data-wow-delay="0.9s"
            >
              <i
                class="bi bi-clock text-center d-block fs-2 text-primary me-3"
              ></i>
              <div>
                <p class="fs-5 fw-bold text-primary">24小時配送</p>
                <p>
                  主打24小時配送服務，365天全年無休，並已全力投入人力加快訂單處理與出貨速度，當日準時送達到貨。
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="about-img w-100 mb-md-8 mb-5">
        <div class="row g-1 mb-1 cursor-pointer">
          <div
            v-for="item in 6"
            :key="item"
            class="more-img col-md-4 col-6 position-relative fs-1"
            @click="showMultiple(item)"
          >
            <img
              class="w-100"
              :src="require('@/assets/images/about/about' + item + '.jpg')"
              alt=""
            />
            <i class="bi bi-eye text-white position-absolute d-flex-center"></i>
          </div>
        </div>
      </div>
      <div class="row mb-md-4 mb-3">
        <div class="col-lg-6">
          <h3 class="text-center fw-bold">歡慶十周年開幕，限時促銷優惠</h3>
          <p class="text-center text-gray mb-lg-4 mb-2">
            優惠截止日期{{ promotionTime }}
          </p>
          <div class="time text-center text-danger fw-bold mb-lg-4 mb-2">
            <span>{{ time.h }}：</span><span>{{ time.m }}：</span
            ><span>{{ time.s }}</span>
          </div>
          <button
            type="button"
            class="
              btn btn-primary
              d-block
              mx-auto
              mb-3
              animate__animated animate__infinite animate__headShake
            "
            @click="$router.push('/products')"
          >
            立即搶購
          </button>
        </div>
        <img
          class="col-lg-6"
          src="@/assets/images/promotion.png"
          alt="promotion"
        />
      </div>
      <ProductsSpecialOffer />
    </div>
    <Subscription />
  </main>
  <Vue-easy-lightbox
    scrollDisabled
    escDisabled
    moveDisabled
    :visible="visible"
    :imgs="require('@/assets/images/about/' + imgs + '.jpg')"
    :index="index"
    @hide="visible = !visible"
    v-if="index"
  ></Vue-easy-lightbox>
</template>

<script>
import ProductsSpecialOffer from '@/components/frontend/ProductsSpecialOffer.vue';
import Subscription from '@/components/frontend/Subscription.vue';

export default {
  data() {
    return {
      imgs: '',
      typewriter: '',
      top: '',
      i: 0,
      index: 0,
      timer: 0,
      time: {},
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      view: false,
      visible: false,
      arrow: true,
      str: '研究指出每日攝取160克水果為健康長壽的最佳方式',
      promotionTime: new Date(new Date().getTime() + 86400000).toLocaleString().split(' ')[0],
    };
  },
  components: {
    ProductsSpecialOffer,
    Subscription,
  },
  methods: {
    showMultiple(num) {
      this.imgs = `about${num}`;
      this.index = num;
      this.visible = true;
    },
    typeing() {
      if (this.i <= this.str.length) {
        this.typewriter = `${this.str.slice(0, this.i += 1)}`;
        this.timer = setTimeout(() => {
          this.typeing();
        }, 100);
      } else {
        clearTimeout(this.timer);
      }
    },
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      this.top = scrollTop;
      if (scrollTop + windowHeight >= scrollHeight - 200) {
        setTimeout(() => {
          this.view = true;
        }, 1200);
      }
    },
  },
  watch: {
    top() {
      if (this.top > 1800) {
        this.arrow = false;
        window.removeEventListener('scroll', this.handleScroll);
      }
    },
    view() {
      this.$bus.emit('view', true);
    },
  },
  mounted() {
    this.view = false;
    window.addEventListener('scroll', this.handleScroll);
    setInterval(() => {
      this.time = {
        h: 23 - new Date().getHours(),
        m: 59 - new Date().getMinutes(),
        s: 59 - new Date().getSeconds(),
      };
      if (this.time.h < 10) {
        this.time.h = `0${this.time.h}`;
      }
      if (this.time.m < 10) {
        this.time.m = `0${this.time.m}`;
      }
      if (this.time.s < 10) {
        this.time.s = `0${this.time.s}`;
      }
    }, 1000);
    this.typeing();
    this.$bus.emit('view', false);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
.about-img {
  margin-top: 0px;
  @include media-breakpoint-up(lg) {
    margin-top: -280px;
  }
  @include media-breakpoint-up(xl) {
    margin-top: -400px;
  }
  img {
    height: 110px;
    @include media-breakpoint-up(sm) {
      height: 200px;
    }
  }
  .bi-eye {
    width: 100%;
    height: 100%;
    top: 0;
    display: none;
  }
  .more-img {
    overflow: hidden;
    &:hover {
      img {
        transition: 0.5s;
        transform: scale(1.2, 1.2);
      }
      .bi-eye {
        transition: 0.5s;
        background-color: rgba(0, 0, 0, 0.4) !important;
        display: flex;
      }
    }
  }
}

.parallax {
  background-image: url('~@/assets/images/parallax.jpg');
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  height: 250px;
  @include media-breakpoint-up(sm) {
    height: 350px;
  }
  .text {
    font-size: 16px;
    @include media-breakpoint-up(sm) {
      font-size: 24px;
    }
  }
  .title {
    font-size: 18px;
    @include media-breakpoint-up(sm) {
      font-size: 28px;
    }
  }
}

.time {
  font-size: 50px;
}

.arrow {
  z-index: 1;
  height: 100px;
}

.banner-arrow {
  bottom: 200px;
  @include media-breakpoint-up(sm) {
    bottom: 0;
  }
}

.article {
  position: relative;
  img {
    @include media-breakpoint-up(sm) {
      height: 300px;
    }
    @include media-breakpoint-up(md) {
      height: auto;
    }
  }
  .article-content {
    font-size: 16px;
    margin-top: 16px;
    @include media-breakpoint-up(sm) {
      margin-top: 0px;
      font-size: 18px;
      background-color: rgba(255, 255, 255, 0.9);
      position: absolute;
      right: 0;
    }
    @include media-breakpoint-up(md) {
      background-color: rgba(255, 255, 255, 0.5);
      transform: translate(-50%, -50%);
      bottom: initial;
      top: 50%;
    }
  }
  .right {
    @include media-breakpoint-up(sm) {
      bottom: 40px;
    }
    @include media-breakpoint-up(md) {
      bottom: initial;
      top: 50%;
      right: -30%;
    }
  }
  .left {
    @include media-breakpoint-up(sm) {
      top: 40px;
    }
    @include media-breakpoint-up(md) {
      bottom: initial;
      top: 50%;
      left: 70%;
    }
  }
}

.title-banner {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  width: 100%;
  @include media-breakpoint-up(md) {
    background-color: transparent;
  }
  @media screen and (min-width: 400px) {
    text-align: initial;
    width: auto;
  }
  .title-comma {
    display: none;
    @media screen and (min-width: 400px) {
      display: initial;
    }
  }
  .title-content {
    display: block;
    margin-top: 5px;
    @media screen and (min-width: 400px) {
      margin-top: 0px;
      display: initial;
    }
  }
}
</style>
