import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import bus from './bus';
import App from './App.vue';
import router from './router';

const options = {
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
};
const app = createApp(App);
app.config.globalProperties.$bus = bus;
app.use(router);
app.use(VueAxios, axios);
app.use(VueLoading, {
  color: '#D3AC2B',
  loader: 'bars',
  width: 64,
  height: 64,
  backgroundColor: '#fff',
  opacity: 1,
  zIndex: 9999,
});
app.use(VueSweetalert2, options);
app.component('loading', VueLoading);
app.mount('#app');
