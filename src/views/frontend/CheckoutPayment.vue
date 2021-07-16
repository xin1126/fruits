<template>
  <section class="content">
    <div class="cart-banner d-flex-center text-white fs-2 mb-md-4 mb-3">
      <p
        class="
          bg-translucent
          fw-bolder
          rounded-3 rounded
          px-lg-5
          py-lg-3
          px-4
          py-2
        "
      >
        結帳付款
      </p>
    </div>
    <div class="container mb-md-5 mb-4">
      <div class="row">
        <Process class="col-lg-4 col-sm-5 mx-auto" />
      </div>
      <div class="row justify-content-center mb-3">
        <div class="col-md-6">
          <table class="table align-middle mb-0">
            <thead>
              <tr>
                <th colspan="5" class="fs-4">購物清單</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td class="img d-flex-center" height="75px">
                  <img
                    :src="item.product.imgUrl"
                    :alt="item.product.title"
                    class="img-transparent"
                  />
                </td>
                <td style="width: 200px" height="75px">
                  {{ item.product.title }}
                </td>
                <td style="width: 200px" height="75px">x{{ item.qty }}</td>
                <td height="75px">
                  NT${{ Math.floor(item.final_total).toLocaleString() }}
                </td>
              </tr>
            </tbody>
          </table>
          <p class="mt-3 text-end text-danger fw-bold" v-if="price">
            折扣總價：NT${{ Math.floor(user.total).toLocaleString() }}
          </p>
          <p class="mt-3 text-end fw-bold" v-else>
            總價：NT${{ user.total?.toLocaleString() }}
          </p>
        </div>
        <div class="col-md-6">
          <table class="table">
            <thead>
              <tr>
                <th colspan="5" class="fs-4">訂購人資訊</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">收件人姓名：</th>
                <td colspan="4" class="py-4" height="75px">
                  {{ user.user?.name }}
                </td>
              </tr>
              <tr>
                <th scope="row">收件人電話：</th>
                <td colspan="4" class="py-4" height="75px">
                  {{ user.user?.tel }}
                </td>
              </tr>
              <tr>
                <th scope="row">收件人地址 ：</th>
                <td colspan="4" class="py-4" height="75px">
                  {{ user.user?.address }}
                </td>
              </tr>
              <tr>
                <th scope="row">電子郵件 ：</th>
                <td colspan="4" class="py-4" height="75px">
                  {{ user.user?.email }}
                </td>
              </tr>
              <tr>
                <th scope="row">訂購日期 ：</th>
                <td colspan="4" class="py-4" height="75px">
                  {{
                    new Date(user.create_at * 1000)
                      .toLocaleString()
                      .split(' ')[0]
                  }}
                </td>
              </tr>
              <tr>
                <th scope="row">付款狀態 ：</th>
                <td colspan="4" height="75px">
                  <span class="text-danger" v-if="!user.is_paid">未付款</span>
                  <span class="text-success" v-else>已付款</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-center">
            <button
              type="button"
              class="btn btn-primary"
              @click="pay"
              v-if="!user.is_paid"
            >
              付款結帳
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="$router.push('/products')"
              v-else
            >
              繼續購物
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Process from '@/components/frontend/Process.vue';

export default {
  data() {
    return {
      user: {},
      products: [],
      price: '',
    };
  },
  components: {
    Process,
  },
  methods: {
    getOrders() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/orders?page=1`;
      this.$store.dispatch('updateLoading', true);
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            [this.user] = res.data.orders;
            this.products = Object.values(this.user.products);
            this.price = Object.keys(this.products[0]).indexOf('coupon') >= 0;
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$swal({ title: '發生錯誤，請嘗試重新整理此頁面', icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
    pay() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/pay/${this.user.id}`;
      this.$store.dispatch('updateLoading', true);
      this.axios.post(url)
        .then((res) => {
          if (res.data.success) {
            this.getOrders();
            this.$router.push('/payment');
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$swal({ title: '發生錯誤，請嘗試重新整理此頁面', icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
button:hover {
  background-color: $secondary !important;
  border: $secondary solid 1px !important;
}

.img {
  background-color: rgb(244, 244, 244) !important;
  width: 75px;
  height: 75px;
}

thead > tr > th,
tbody > tr {
  text-align: center;
  height: 70px;
}
</style>
