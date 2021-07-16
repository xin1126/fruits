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
import SwiperCore, { Autoplay, EffectFade } from 'swiper/core';
import 'swiper/swiper.scss';
import VueScrollTo from 'vue-scrollto';
import animated from 'animate.css';
import VueEasyLightbox from 'vue-easy-lightbox';
import 'default-passive-events';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Wow from 'wow.js';
import 'wow.js/css/libs/animate.css';
import App from './App.vue';
import store from './store';
import router from './router';

AOS.init({
  once: true,
});
new Wow().init();
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');
const app = createApp(App);
SwiperCore.use([Autoplay, EffectFade]);
app.use(router);
app.use(VueAxios, axios);
app.use(VueLoading);
app.use(animated);
app.use(VueEasyLightbox);
app.use(VueScrollTo, { duration: 0 });
app.use(VueSweetalert2, {
  toast: true, position: 'center', showConfirmButton: false, timer: 2000,
});
app.use(store);
app.component('Swiper', Swiper);
app.component('SwiperSlide', SwiperSlide);
app.component('Field', Field);
app.component('Form', Form);
app.component('Message', ErrorMessage);
app.component('Loading', VueLoading);
app.mount('#app');
