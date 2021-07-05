<template>
  <div class="content">
    <div class="about-banner d-flex-center text-dark fs-2 mb-md-4 mb-3">
      <div class="bg-linear-right w-100 h-100">
        <p
          class="
            container
            fw-bolder
            d-flex
            flex-column
            justify-content-center
            align-items-end
            rounded-3 rounded
            h-100
            fst-italic
          "
        >
          <span class="me-8">用完美的品質</span><span>打造常青的品牌</span>
        </p>
      </div>
    </div>
    <div class="container">
      <nav
        aria-label="breadcrumb"
        id="topProduct"
        class="bg-transparent mb-md-4 mb-3"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-gray">首頁</li>
          <li class="breadcrumb-item text-secondary">關於我們</li>
        </ol>
      </nav>
      <div class="row mb-4">
        <div
          class="
            col-lg-6 col-md-7
            d-flex
            flex-column
            justify-content-center
            mb-2 mb-md-0
          "
        >
          <div class="px-lg-6">
            <h3 class="fw-bold text-center mb-3">《品牌介紹》</h3>
            <p class="mb-2 fs-5">
              <span class="text-primary fw-bold">Fresh Fruits</span>
              創立於西元{{
                new Date().getFullYear() - 10
              }}年，自創始以來，始終堅持嚴格的食品監督和系統化的經營管理模式，從質量上和品質上進行可控化管理。
            </p>
            <p class="fs-5">
              專門提供消費者有機水果、便利購物、優質服務去創立的品牌，始終致力於創造新鮮、衛生、品質、方便的服務體驗。
            </p>
          </div>
        </div>
        <img
          class="col-lg-6 col-md-5"
          src="@/assets/images/about/about7.jpg"
          alt="about"
        />
      </div>
      <div class="row flex-column-reverse flex-md-row mb-4">
        <img
          class="col-lg-6 col-md-5"
          src="@/assets/images/about/about8.jpg"
          alt="about"
        />
        <div
          class="
            col-lg-6 col-md-7
            d-flex
            flex-column
            justify-content-center
            mb-2 mb-md-0
          "
        >
          <div class="px-lg-6">
            <h3 class="fw-bold text-center mb-3">《經營理念》</h3>
            <p class="mb-2 fs-5">
              <span class="text-primary fw-bold">Fresh Fruits</span>
              不僅是販售安心食品的品牌,我們期待能打破過去對於安心、健康食品就是不好吃的印象致力於創造更多美好的健康飲食體驗,為您打造好安心生活。
            </p>
            <p class="fs-5">
              水果產業在台灣占有重要的地位，水果能外銷到大陸、香港、澳門、日本，我們相信也能把我們的服務開拓到全世界，希望我們的水果、服務體驗能讓台灣在這世界上找到那一片天
            </p>
          </div>
        </div>
      </div>
      <div class="row mb-md-5 mb-4">
        <div
          class="
            col-lg-6 col-md-7
            d-flex
            flex-column
            justify-content-center
            mb-2 mb-md-0
          "
        >
          <div class="px-lg-6">
            <h3 class="fw-bold text-center mb-3">《聯絡資訊》</h3>
            <p class="mb-2 fs-5">
              我們非常高興能聽到來自客戶的任何意見，歡迎隨時聯絡我們，詢問、訂購產品或提供寶貴建議！
            </p>
            <ul class="p-0 fs-5">
              <li class="mb-1">
                <i class="bi bi-envelope me-1"></i>聯絡信箱：fruits@gmail.com
              </li>
              <li class="mb-1">
                <i class="bi bi-telephone me-1"></i>聯絡電話：0912345678
              </li>
              <li class="mb-1 d-flex">
                <i class="bi bi-geo-alt me-1"></i>地址：
                <p>
                  台北市內湖區瑞光路<span class="d-sm-inline d-block"
                    >437號30樓</span
                  >
                </p>
              </li>
              <li class="d-flex">
                <i class="bi bi-clock me-1"></i>服務時間：
                <p>
                  週一至週五
                  <span class="fs-6 d-xl-inline d-block"
                    >08：00 AM ~
                    <span class="d-sm-inline d-block">17：00 PM</span></span
                  >
                </p>
              </li>
            </ul>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d903.4216517862457!2d121.5700281698958!3d25.07860904590672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e3!4m3!3m2!1d25.0786151!2d121.56999599999999!4m0!5e0!3m2!1szh-TW!2stw!4v1625083678303!5m2!1szh-TW!2stw"
          class="col-lg-6 col-md-5"
          width="570"
          height="365"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
    <div class="row justify-content-center g-0 mb-md-5 mb-4">
      <div class="col-sm-5 col-12">
        <h3 class="fw-bold text-center mb-3">《合作廠商》</h3>
        <Swiper
          :slides-per-view="offsetWidthData.slidesView"
          :space-between="40"
          :loop="true"
          :loopFillGroupWithBlank="true"
          :autoplay="autoplay"
        >
          <SwiperSlide v-for="item in 6" :key="item">
            <img
              class="logo"
              :src="require('@/assets/images/logo/' + `logo${item}` + '.png')"
              alt="logo"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <Subscription />
  </div>
</template>

<script>
import Subscription from '@/components/frontend/Subscription.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
    };
  },
  components: {
    Subscription,
  },
  methods: {
    ...mapActions(['initOffsetWidth', 'updateOffsetWidth']),
  },
  computed: {
    ...mapGetters(['offsetWidth', 'offsetWidthData']),
  },
  watch: {
    offsetWidth() {
      this.updateOffsetWidth();
    },
  },
  created() {
    this.initOffsetWidth();
    window.onresize = () => {
      this.updateOffsetWidth();
    };
  },
};
</script>

<style lang="scss">
</style>
