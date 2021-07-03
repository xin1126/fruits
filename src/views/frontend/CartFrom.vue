<template>
  <section class="content">
    <div class="cart-banner d-flex-center text-white fs-2 mb-lg-4 mb-3">
      <p class="bg-translucent fw-bolder rounded-3 rounded px-5 py-3">
        填寫訂購資料
      </p>
    </div>
    <div class="container pb-lg-4 pb-3 mb-0">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <Form v-slot="{ errors }" @submit="createOrder" ref="form">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <button
                type="button"
                class="btn btn-primary btn-hover"
                @click="$router.push('/carts')"
              >
                <i class="bi bi-caret-left-fill"></i>回上一步
              </button>
              <p class="text-danger d-none d-sm-block">*為必填欄位</p>
              <button
                :type="[
                  Object.values(errors).length ||
                  Object.values(form.user).indexOf('') >= 0
                    ? 'button'
                    : 'submit',
                ]"
                class="btn btn-primary"
                :class="[
                  Object.values(errors).length ||
                  Object.values(form.user).indexOf('') >= 0
                    ? 'cursor-allowed'
                    : 'btn-hover',
                ]"
                @click="$router.push('/from')"
                ref="tooltip"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                :data-bs-original-title="[
                  Object.values(errors).length ||
                  Object.values(form.user).indexOf('') >= 0
                    ? '表單欄位尚未填寫完整'
                    : '',
                ]"
              >
                送出訂單<i class="bi bi-caret-right-fill"></i>
              </button>
            </div>
            <p class="text-danger d-sm-none">*為必填欄位</p>
            <div class="row mb-3">
              <div class="col-sm-6 mb-3 mb-sm-0">
                <label for="name" class="form-label"
                  >收件人姓名<span class="text-danger ms-1">*</span></label
                >
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
              <div class="col-sm-6">
                <label for="tel" class="form-label"
                  >收件人電話<span class="text-danger ms-1">*</span></label
                >
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
              <label for="email" class="form-label"
                >Email<span class="text-danger ms-1">*</span></label
              >
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
              <label for="address" class="form-label"
                >收件人地址<span class="text-danger ms-1">*</span></label
              >
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
              <label for="payment" class="form-label"
                >付款方式<span class="text-danger ms-1">*</span></label
              >
              <Field
                as="select"
                id="payment"
                v-model="form.user.payment"
                name="付款方式"
                class="form-select"
                :class="{ 'is-invalid': errors['付款方式'] }"
                rules="required"
              >
                <option value="" disabled>請選擇付款方式</option>
                <option value="信用卡">信用卡</option>
                <option value="貨到付款">貨到付款</option>
                <option value="ATM 轉帳">ATM 轉帳</option>
              </Field>
              <Message name="付款方式" class="invalid-feedback"></Message>
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
import { Tooltip } from 'bootstrap';

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment: '',
        },
        message: '',
        tooltip: '',
      },
    };
  },
  methods: {
    createOrder() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/order`;
      const order = this.form;
      this.$store.dispatch('updateLoading', true);
      this.axios.post(url, { data: order })
        .then((res) => {
          if (res.data.success) {
            this.getCart();
            this.$router.push('/checkout');
            this.$swal({ title: res.data.message, icon: 'success' });
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
    getCart() {
      this.$store.dispatch('getCart');
    },
  },
  mounted() {
    this.tooltip = new Tooltip(this.$refs.tooltip);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
.btn-hover:hover {
  background-color: $secondary !important;
  border: $secondary solid 1px !important;
}
</style>
