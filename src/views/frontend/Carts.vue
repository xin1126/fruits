<template>
  <section class="content d-flex flex-column justify-content-between">
    <div>
      <div
        class="
          cart-banner
          position-relative
          d-flex-center
          text-white
          fs-2
          mb-md-4 mb-3
        "
      >
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
          購物車列表
        </p>
      </div>
      <div class="container-lg mb-md-5 mb-4">
        <div v-if="$store.getters.cart.carts?.length">
          <div class="row">
            <Process class="col mb-3 d-sm-none" />
          </div>
          <div class="d-flex justify-content-between align-items-end mb-2">
            <button
              type="button"
              class="btn btn-primary btn-hover"
              @click="$router.push('/products')"
            >
              <i class="bi bi-caret-left-fill"></i>繼續購物
            </button>
            <Process class="d-none d-sm-block" />
            <button
              type="button"
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
                <td class="img d-none d-lg-table-cell position-relative">
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
                  <p class="d-sm-none mb-1 text-center">
                    {{ item.product.title }}
                  </p>
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
                    <p class="form-control text-center">{{ item.qty }}</p>
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
            <div class="d-flex justify-content-between">
              <div>
                <button
                  class="btn btn-outline-gray btn-sm"
                  type="button"
                  @click="deleteAllCarts"
                >
                  刪除全部
                </button>
              </div>
              <div
                class="
                  d-flex
                  align-items-sm-center
                  flex-sm-row
                  align-items-end
                  flex-column
                "
              >
                <button
                  v-if="Object.keys(couponNum).length && !couponPrice"
                  type="button"
                  class="
                    input-group-text
                    btn
                    bg-primary
                    text-white
                    btn-hover
                    me-sm-2
                    mb-1
                  "
                  id="basic-addon1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="couponModal"
                  :disabled="couponPrice !== ''"
                >
                  選擇折扣優惠券
                </button>
                <p class="fw-bold">
                  總價：<span
                    :class="{
                      'text-decoration-line-through': couponPrice,
                      'text-gray': couponPrice,
                    }"
                    >NT${{ cart.total?.toLocaleString() }}</span
                  >
                </p>
              </div>
            </div>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4
                      class="modal-title fw-bold ms-auto"
                      id="exampleModalLabel"
                    >
                      點選折扣優惠券
                    </h4>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body pb-0">
                    <div class="p-0">
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-center
                          flex-column flex-sm-row
                          coupon
                          mb-4
                        "
                        v-for="(item, key) in couponNum"
                        :key="key"
                      >
                        <label
                          :for="key"
                          class="d-sm-flex align-items-center cursor-pointer"
                          @click="couponTarget = key"
                        >
                          <div
                            :for="key"
                            class="
                              cursor-hover
                              position-relative
                              d-inline-block
                              me-sm-5
                              mb-1 mb-sm-0
                              px-4
                              py-4
                            "
                            :class="[
                              couponTarget === key ? 'bg-warning' : 'bg-danger',
                            ]"
                          >
                            <div class="coupon-style">
                              <span
                                class="border w-auto fs-5 px-3 py-2 fw-bold"
                                :class="[
                                  couponTarget === key
                                    ? 'text-danger'
                                    : 'text-warning',
                                ]"
                                >{{ key }}折優惠折扣券</span
                              >
                            </div>
                          </div>
                          <p class="text-center fs-4 me-sm-3 mb-1 mb-sm-0">
                            x{{ item }}
                          </p>
                        </label>
                        <input
                          type="radio"
                          name="coupon"
                          :ref="'radio' + key"
                          :id="key"
                          v-if="Object.keys(couponNum).length > 1"
                          class="cursor-pointer"
                          @click="couponTarget = key"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      ref="tooltip"
                      type="button"
                      class="btn btn-primary d-block mx-auto"
                      :class="{
                        'cursor-allowed': !couponTarget,
                      }"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      :data-bs-dismiss="modal"
                      :data-bs-original-title="[
                        !couponTarget ? '請先選擇折扣優惠券哦' : '',
                      ]"
                      @click="coupon(couponTarget)"
                    >
                      確認
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-end text-danger fw-bold" v-if="couponPrice">
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
              type="button"
              class="btn btn-primary btn-sm btn-hover"
              @click="$router.push('/products')"
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
import Process from '@/components/frontend/Process.vue';
import { mapGetters, mapActions } from 'vuex';
import 'bootstrap/js/dist/modal';
import Tooltip from 'bootstrap/js/dist/tooltip';

export default {
  data() {
    return {
      couponPrice: '',
      couponTarget: '',
      tooltip: '',
      modal: '',
    };
  },
  components: {
    ProductsSpecialOffer,
    Subscription,
    Process,
  },
  methods: {
    ...mapActions(['getCart', 'removeCoupon']),
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
        .catch(() => {
          this.$swal({ title: '發生錯誤，請嘗試重新整理此頁面', icon: 'error' });
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
        .catch(() => {
          this.$swal({ title: '發生錯誤，請嘗試重新整理此頁面', icon: 'error' });
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
        .catch(() => {
          this.$swal({ title: '發生錯誤，請嘗試重新整理此頁面', icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
    coupon(num) {
      if (!this.couponTarget) return;
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/coupon`;
      this.$store.dispatch('updateLoading', true);
      this.axios.post(url, { data: { code: num } })
        .then((res) => {
          if (res.data.success) {
            this.couponPrice = res.data.data.final_total;
            this.$swal({
              title: `成功套用${num}折優惠折扣券
            `,
              icon: 'success',
            });
            this.removeCoupon(num);
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
    couponModal() {
      if (this.couponTarget) {
        this.$refs[`radio${this.couponTarget}`].checked = false;
      }
      this.couponTarget = '';
      this.tooltip = new Tooltip(this.$refs.tooltip);
    },
  },
  computed: {
    ...mapGetters(['cart', 'couponNum']),
  },
  watch: {
    couponTarget() {
      this.modal = this.couponTarget ? 'modal' : '';
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
  background-color: rgb(244, 244, 244) !important;
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

.coupon:hover {
  .cursor-hover {
    background-color: $warning !important;
    span {
      color: $danger !important;
    }
  }
}
</style>
