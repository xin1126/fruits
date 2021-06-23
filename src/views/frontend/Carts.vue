<template>
  <section
    class="content"
    :class="{ 'bg-light': $store.getters.cart.carts?.length }"
  >
    <div class="cart-banner d-flex-center text-white fs-2 mb-4">
      <p class="bg-translucent fw-bolder px-5 py-3">購物車列表</p>
    </div>
    <div class="container mb-5">
      <div v-if="$store.getters.cart.carts?.length">
        <div class="d-flex justify-content-between mb-2">
          <button class="btn btn-primary btn-hover" @click="$router.push('/')">
            <i class="bi bi-caret-left-fill"></i>繼續購物
          </button>
          <button
            class="btn btn-primary btn-hover"
            @click="$router.push('/from')"
          >
            填寫訂購資料<i class="bi bi-caret-right-fill"></i>
          </button>
        </div>
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th width="10%">縮圖</th>
              <th width="15%">品名</th>
              <th width="20%">單位</th>
              <th class="text-center">數量</th>
              <th width="10%">單價</th>
              <th width="10%" class="text-end">金額</th>
              <th width="10%" class="text-end">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <img
                  :src="item.product.imgUrl"
                  :alt="item.product.title"
                  class="img-transparent"
                />
              </td>
              <td>
                {{ item.product.title }}
              </td>
              <td>
                {{ item.product.unit }}({{ item.product.options.weight }})
              </td>
              <td>
                <div class="input-group w-75 mx-auto">
                  <button
                    type="button"
                    class="
                      input-group-text
                      bg-light
                      text-gray
                      fs-8
                      border-end-0
                    "
                    :class="[
                      item.qty !== 1 ? ['upade-hover'] : 'cursor-allowed',
                    ]"
                    :disabled="item.qty === 1"
                    @click="updateCart(item.id, item.qty - 1)"
                  >
                    <i class="bi bi-dash-lg"></i>
                  </button>
                  <p class="form-control text-center m-0">{{ item.qty }}</p>
                  <button
                    type="button"
                    class="input-group-text upade-hover bg-light text-gray fs-8"
                    @click="updateCart(item.id, item.qty + 1)"
                  >
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
              </td>
              <td>{{ item.product.price }}</td>
              <td class="text-end">
                {{ item.final_total.toLocaleString() }}
              </td>
              <td class="text-end">
                <a
                  href="#"
                  class="fs-4"
                  @click.prevent="removeCartItem(item.id)"
                >
                  <i class="bi bi-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
          <tfoot class="border-white">
            <tr class="border-light">
              <td class="pt-3">
                <button
                  class="btn btn-outline-gray btn-sm"
                  type="button"
                  @click="deleteAllCarts"
                >
                  刪除全部
                </button>
              </td>
              <td></td>
              <td></td>
              <td colspan="3" class="text-end pt-3">
                <div class="d-flex justify-content-end align-items-center">
                  <div class="input-group w-75 me-3">
                    <button
                      type="button"
                      class="input-group-text bg-primary text-white btn-hover"
                      id="basic-addon1"
                      @click="coupon"
                    >
                      套用優惠券
                    </button>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入折扣代碼"
                      v-model="code"
                    />
                  </div>
                  <p class="mb-0 fw-bold">總計：</p>
                </div>
              </td>
              <td
                class="text-end fw-bold"
                :class="{
                  'text-decoration-line-through': couponPrice,
                  'text-gray': couponPrice,
                }"
              >
                {{ cart.total?.toLocaleString() }}
              </td>
            </tr>
            <tr class="border-light">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="text-end text-danger fw-bold pt-0" v-if="couponPrice">
                折扣價：
              </td>
              <td class="text-end text-danger fw-bold pt-0" v-if="couponPrice">
                {{ couponPrice }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div v-else>
        <div class="text-center">
          <h2 class="fw-bold">目前購物車列表為空</h2>
          <h3>逛逛新鮮水果</h3>
          <button
            class="btn btn-primary btn-sm btn-hover"
            @click="$router.push('/')"
          >
            商品列表
          </button>
        </div>
        <hr class="border border-primary border-3" />
        <ProductsSpecialOffer />
      </div>
    </div>
    <Subscription v-if="$store.getters.cart.carts?.length" />
  </section>
</template>

<script>
import ProductsSpecialOffer from '@/components/frontend/ProductsSpecialOffer.vue';
import Subscription from '@/components/frontend/Subscription.vue';

export default {
  data() {
    return {
      code: '',
      couponPrice: '',
    };
  },
  components: {
    ProductsSpecialOffer,
    Subscription,
  },
  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
    deleteAllCarts() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/carts`;
      this.$store.dispatch('updateLoading', true);
      this.axios.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$swal({ title: res.data.message, icon: 'success' });
            this.getCart();
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart/${id}`;
      this.$store.dispatch('updateLoading', true);
      this.axios.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$swal({ title: res.data.message, icon: 'success' });
            this.getCart();
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
    updateCart(id, qty) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart/${id}`;
      this.$store.dispatch('updateLoading', true);
      const cart = {
        product_id: id,
        qty,
      };
      this.axios.put(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.$swal({ title: res.data.message, icon: 'success' });
            this.getCart();
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
    coupon() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/coupon`;
      this.axios.post(url, { data: { code: this.code } })
        .then((res) => {
          if (res.data.success) {
            this.couponPrice = res.data.data.final_total;
            this.$swal({ title: res.data.message, icon: 'success' });
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
.btn-hover:hover {
  background-color: $secondary !important;
  border: $secondary solid 1px !important;
}

.upade-hover:hover {
  background-color: $primary !important;
  color: white !important;
}

thead > tr > th {
  border-bottom: $primary 1px solid !important;
  text-align: center;
}

tbody > tr {
  text-align: center;
  &:last-child > td {
    border-bottom: $primary 1px solid !important;
  }
}
</style>
