<template>
  <section class="bg-backstage w-100 vh-100">
    <div class="container">
      <div class="row vh-100 justify-content-center align-content-center">
        <div class="col-12 col-md-6 col-xl-4">
          <div class="rounded shadow-lg bg-translucent p-3">
            <h3 class="mb-3 text-center text-white fw-bold">
              <i class="bi bi-person-fill me-1"></i>登入後台
            </h3>
            <form id="form" class="form-signin" @submit.prevent="login">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control mb-2"
                  id="username"
                  placeholder="name@example.com"
                  v-model="user.username"
                  required
                />
                <label for="username">請輸入帳號</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  :type="passwordStatus"
                  class="form-control mb-2 position-relative"
                  id="password"
                  placeholder="Password"
                  v-model="user.password"
                  required
                />
                <label for="password">請輸入密碼</label>
                <a href="#" @click.prevent="eyeChange">
                  <h3 class="position-absolute link-dark top-0 end-0 mt-3 me-3">
                    <i class="bi bi-eye-slash-fill" id="eye"></i>
                  </h3>
                </a>
              </div>
              <button
                class="btn btn-dark fw-bold w-100"
                id="signin"
                type="submit"
              >
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
      passwordStatus: 'password',
    };
  },
  methods: {
    login() {
      const api = `${process.env.VUE_APP_APIURL}/admin/signin`;
      this.isLoading = true;
      this.axios.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
          this.$router.push('/backstage');
        } else {
          this.$swal({ title: res.data.message, icon: 'error' });
        }
        this.isLoading = false;
      }).catch((error) => {
        this.$swal({ title: error.data.message, icon: 'error' });
        this.isLoading = false;
      });
    },
    eyeChange(e) {
      if (e.target.classList.contains('bi-eye-slash-fill')) {
        this.passwordStatus = 'current-password';
        e.target.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
      } else {
        e.target.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
        this.passwordStatus = 'password';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.bg-backstage {
  background-image: url('~@/assets/images/backstage-bg.jpg');
  background-position: center center;
  background-size: cover;
}
</style>
