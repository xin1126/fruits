<template>
  <footer
    class="
      d-flex
      flex-column flex-sm-row
      justify-content-sm-center
      align-items-center
      text-white
      bg-primary
      py-3
    "
  >
    <p class="mb-1">
      ⓒ 2021 All Right Reserved . <span class="d-none d-sm-inline">｜</span>
    </p>
    <div class="d-flex-center">
      <p class="m-0">僅個人作品練習，無商業用途</p>
      <router-link
        class="btn btn-outline-light btn-sm ms-3 d-none d-sm-block"
        to="/login"
        ><i class="bi bi-person-fill me-1"></i>登入後台</router-link
      >
    </div>
  </footer>
</template>

<style scoped lang="scss">
a:hover {
  border: #49641f 1px solid;
  background-color: #8dbf41;
  color: #49641f;
}
</style>
