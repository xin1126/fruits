import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay } from 'swiper/core';
import 'swiper/swiper.scss';
import VueScrollTo from 'vue-scrollto';
import animated from 'animate.css';
import VueEasyLightbox from 'vue-easy-lightbox';
import 'default-passive-events';
import 'bootstrap';
import bus from './bus';
import App from './App.vue';
import store from './store';
import router from './router';

const options = {
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
};
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');
const app = createApp(App);
app.config.globalProperties.$bus = bus;
SwiperCore.use(Autoplay);
app.use(router);
app.use(VueAxios, axios);
app.use(VueLoading);
app.use(animated);
app.use(VueEasyLightbox);
app.use(VueScrollTo, { duration: 0 });
app.use(VueSweetalert2, options);
app.use(store);
app.component('Swiper', Swiper);
app.component('SwiperSlide', SwiperSlide);
app.component('Field', Field);
app.component('Form', Form);
app.component('Message', ErrorMessage);
app.component('Loading', VueLoading);
app.mount('#app');
