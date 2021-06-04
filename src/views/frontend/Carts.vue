<template>
  <section class="content">
    <div class="banner d-flex-center text-white fs-2 mb-3">
      <p class="bg-translucent fw-bolder px-5 py-3">購物車列表</p>
    </div>
    <div class="container mb-5">
      <div class="row" v-if="cart.carts?.length">
        <div class="col-lg-8">
          <div class="text-end">
            <button
              class="btn btn-outline-danger"
              type="button"
              @click="deleteAllCarts"
            >
              清空購物車
            </button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th width="10%">刪除</th>
                <th width="10%">縮圖</th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th class="text-end">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)"
                  >
                    x
                  </button>
                </td>
                <td>
                  <img
                    :src="item.product.imgUrl"
                    :alt="item.product.title"
                    class=""
                  />
                </td>
                <td>
                  {{ item.product.title }}
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <input
                        v-model.number="item.qty"
                        @blur="updateCart(item)"
                        min="1"
                        type="number"
                        class="form-control"
                      />
                      <span class="input-group-text" id="basic-addon2">{{
                        item.product.unit
                      }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  {{ item.final_total.toLocaleString() }}
                </td>
              </tr>
            </tbody>
            <tfoot class="">
              <tr>
                <td></td>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ cart.total?.toLocaleString() }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="col-lg-4">
          <Form v-slot="{ errors }" @submit="createOrder" ref="form">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="form.user.email"
              ></Field>
              <Message name="email" class="invalid-feedback"></Message>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <Field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"
              ></Field>
              <Message name="姓名" class="invalid-feedback"></Message>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <Field
                id="tel"
                name="電話"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話"
                rules="required|min:8|max:10"
                v-model="form.user.tel"
              ></Field>
              <Message name="電話" class="invalid-feedback"></Message>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <Field
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                rules="required"
                v-model="form.user.address"
              ></Field>
              <Message name="地址" class="invalid-feedback"></Message>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                name="留言"
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-end">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </Form>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center">
        <router-link to="/"><img :src="img" alt="" /></router-link>
      </div>
    </div>
  </section>
  <loading v-model:active="isLoading">
    <div class="loadingio-spinner-spin-3mx4cy187my">
      <div class="ldio-vvip0fav2if">
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
      </div>
    </div>
  </loading>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {},
      img: '',
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.isLoading = true;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            this.$bus.emit('cartsQuantity', this.cart.carts.length);
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
          this.isLoading = false;
          this.img = !this.cart.carts.length ? 'https://i.imgur.com/JWtbdcf.jpg' : '';
        })
        .catch((error) => {
          this.$swal({ title: error.data?.message, icon: 'error' });
          this.isLoading = false;
        });
    },
    deleteAllCarts() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/carts`;
      this.isLoading = true;
      this.axios.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$swal({ title: res.data.message, icon: 'success' });
            this.getCart();
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.isLoading = false;
        });
    },
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart/${id}`;
      this.isLoading = true;
      this.axios.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$swal({ title: res.data.message, icon: 'success' });
            this.isLoading = false;
            this.getCart();
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.isLoading = false;
          }
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.isLoading = false;
        });
    },
    createOrder() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/order`;
      const order = this.form;
      this.isLoading = true;
      this.axios.post(url, { data: order })
        .then((res) => {
          if (res.data.success) {
            this.$swal({ title: res.data.message, icon: 'success' });
            this.getCart();
            this.$refs.form.resetForm();
            this.form.message = '';
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.isLoading = false;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style scoped lang="scss">
.banner {
  background-image: url('~@/assets/images/banner2.jpg');
  background-position: center;
  background-size: cover;
  padding-top: 70px;
  height: 300px;
}
</style>
