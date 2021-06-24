<template>
  <section
    class="content d-flex flex-column justify-content-between"
    :class="{ 'bg-light': $store.getters.cart.carts?.length }"
  >
    <div>
      <div class="cart-banner d-flex-center text-white fs-2 mb-lg-4 mb-3">
        <p class="bg-translucent fw-bolder px-lg-5 py-lg-3 px-4 py-2 m-0">
          購物車列表
        </p>
      </div>
      <div class="container-lg mb-lg-4 mb-3">
        <div v-if="$store.getters.cart.carts?.length">
          <div class="d-flex justify-content-between mb-2">
            <button
              class="btn btn-primary btn-hover"
              @click="$router.push('/')"
            >
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
                <th class="remove d-md-none">刪除</th>
                <th class="d-none d-lg-table-cell">縮圖</th>
                <th width="15%" class="d-none d-sm-table-cell">
                  品名<span class="d-md-none d-sm-inline d-none">/單位</span>
                </th>
                <th width="20%" class="d-none d-md-table-cell">單位</th>
                <th class="text-center">
                  <span class="d-sm-none">品名/</span>數量
                </th>
                <th width="10%" class="d-none d-sm-table-cell">單價</th>
                <th width="15%" class="text-end">金額</th>
                <th width="10%" class="text-end d-none d-md-table-cell">
                  刪除
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="d-md-none">
                  <a
                    href="#"
                    class="fs-4"
                    @click.prevent="removeCartItem(item.id)"
                  >
                    <i class="bi bi-trash text-gray icon"></i>
                  </a>
                </td>
                <td class="img d-none d-lg-table-cell">
                  <img
                    :src="item.product.imgUrl"
                    :alt="item.product.title"
                    class="img-transparent"
                  />
                </td>
                <td class="d-none d-sm-table-cell">
                  {{ item.product.title }}
                  <span class="d-md-none d-sm-inline d-none"
                    >{{ item.product.unit }}({{
                      item.product.options.weight
                    }})</span
                  >
                </td>
                <td class="d-none d-md-table-cell">
                  {{ item.product.unit }}({{ item.product.options.weight }})
                </td>
                <td>
                  <p class="d-sm-none mb-1">{{ item.product.title }}</p>
                  <div class="input-group update-num w-lg-75 w-sm-65 mx-auto">
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
                      class="
                        input-group-text
                        upade-hover
                        bg-light
                        text-gray
                        fs-8
                      "
                      @click="updateCart(item.id, item.qty + 1)"
                    >
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </td>
                <td class="d-none d-sm-table-cell">
                  NT${{ item.product.price }}
                </td>
                <td class="text-end">
                  NT${{ item.final_total.toLocaleString() }}
                </td>
                <td class="text-end d-none d-md-table-cell">
                  <a
                    href="#"
                    class="fs-4"
                    @click.prevent="removeCartItem(item.id)"
                  >
                    <i class="bi bi-trash text-gray icon"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <button
                class="btn btn-outline-gray btn-sm d-none d-sm-block"
                type="button"
                @click="deleteAllCarts"
              >
                刪除全部
              </button>
              <div
                class="
                  d-flex
                  align-items-sm-center
                  flex-sm-row
                  align-items-end
                  flex-column
                  w-sm-auto w-100
                "
              >
                <div class="input-group w-sm-65 me-sm-3 mb-2">
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
                <p class="mb-0 fw-bold">
                  總價：<span
                    class="text-end fw-bold"
                    :class="{
                      'text-decoration-line-through': couponPrice,
                      'text-gray': couponPrice,
                    }"
                    >NT${{ cart.total?.toLocaleString() }}</span
                  >
                </p>
              </div>
            </div>
            <div class="mt-2 me-sm-3">
              <p
                class="text-end text-danger fw-bold pt-0 mb-0"
                v-if="couponPrice"
              >
                折扣總價：NT${{ Math.floor(couponPrice).toLocaleString() }}
              </p>
            </div>
          </div>
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

.icon:hover {
  color: $dark !important;
}

.update-num {
  @media screen and (min-width: 450px) {
    width: 60%;
  }
}

.remove {
  width: 20%;
  @include media-breakpoint-up(sm) {
    width: 10%;
  }
}

.img {
  width: 70px;
  height: 70px;
  @include media-breakpoint-up(lg) {
    width: 100px;
    height: 100px;
  }
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
