import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import App from './App.vue';
import router from './router';

const options = {
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
};
const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(VueLoading);
app.use(VueSweetalert2, options);
app.component('loading', VueLoading);
app.mount('#app');
