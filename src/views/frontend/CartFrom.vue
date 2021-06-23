<template>
  <section class="content bg-light">
    <div class="cart-banner d-flex-center text-white fs-2 mb-4">
      <p class="bg-translucent fw-bolder px-5 py-3">填寫訂購資料</p>
    </div>
    <div class="container">
      <div class="row justify-content-center mb-3">
        <div class="col-lg-8">
          <Form v-slot="{ errors }" @submit="createOrder" ref="form">
            <div class="d-flex justify-content-between mb-2">
              <button
                type="button"
                class="btn btn-primary btn-hover"
                @click="$router.push('/carts')"
              >
                <i class="bi bi-caret-left-fill"></i>回上一步
              </button>
              <button
                type="submit"
                class="btn btn-primary btn-hover"
                @click="$router.push('/from')"
              >
                送出訂單<i class="bi bi-caret-right-fill"></i>
              </button>
            </div>
            <div class="row mb-3">
              <div class="col-6">
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
              <div class="col-6">
                <label for="tel" class="form-label">收件人電話</label>
                <Field
                  id="tel"
                  name="電話"
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話"
                  rules="required|min:8|max:10|numeric"
                  v-model="form.user.tel"
                ></Field>
                <Message name="電話" class="invalid-feedback"></Message>
              </div>
            </div>
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
          </Form>
        </div>
      </div>
    </div>
  </section>
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
    };
  },
  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
    createOrder() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/order`;
      const order = this.form;
      this.$store.dispatch('updateLoading', true);
      this.axios.post(url, { data: order })
        .then((res) => {
          if (res.data.success) {
            this.$swal({ title: res.data.message, icon: 'success' });
            this.getCart();
            this.$refs.form.resetForm();
            this.form.message = '';
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
    // this.getCart();
  },
};
</script>
