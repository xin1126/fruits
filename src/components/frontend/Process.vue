<template>
  <div>
    <div class="process-text d-flex justify-content-between">
      <p class="text-primary fw-bold">確認商品</p>
      <p
        class="fw-bold"
        :class="[
          $route.path === '/from' || $route.path === '/checkout'
            ? 'text-primary'
            : 'text-gray',
        ]"
      >
        填寫資料
      </p>
      <p
        class="fw-bold"
        :class="[$route.path === '/checkout' ? 'text-primary' : 'text-gray']"
      >
        付款結帳
      </p>
    </div>
    <ul
      class="d-flex align-items-center justify-content-center mb-0 mx-4 mx-sm-0"
    >
      <li
        class="
          process-border
          d-flex-center
          bg-primary
          text-white
          rounded-circle
          p-1
        "
      >
        1
      </li>
      <li
        class="process-line m-negative border-bottom border-top border-gray"
        :class="[
          $route.path === '/from' || $route.path === '/checkout'
            ? 'bg-primary'
            : 'bg-transparent',
        ]"
      ></li>
      <li
        class="
          process-border
          d-flex-center
          border border-gray
          rounded-circle
          p-1
          m-negative
        "
        :class="[
          $route.path === '/from' || $route.path === '/checkout'
            ? ['text-white', 'bg-primary']
            : ['text-gray', 'bg-transparent'],
        ]"
      >
        2
      </li>
      <li
        class="process-line m-negative border-bottom border-top border-gray"
        :class="[$route.path === '/checkout' ? 'bg-primary' : 'bg-transparent']"
      ></li>
      <li
        class="
          process-border
          d-flex-center
          border border-gray
          rounded-circle
          p-1
          m-negative
        "
        :class="[
          $route.path === '/checkout'
            ? ['text-white', 'bg-primary']
            : ['text-gray', 'bg-transparent'],
        ]"
      >
        3
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/all';

.process-border {
  width: 40px;
  @media screen and (min-width: 400px) {
    width: 25px;
  }
  height: 25px;
}

.process-line {
  width: 200px;
  height: 8px;
  @include media-breakpoint-up(sm) {
    width: 80px;
  }
  @include media-breakpoint-up(md) {
    width: 120px;
  }
  @include media-breakpoint-up(xl) {
    width: 150px;
  }
}

.process-text {
  @include media-breakpoint-up(sm) {
    p {
      &:first-child {
        margin-left: -20px;
      }
      &:last-child {
        margin-right: -20px;
      }
    }
  }
}

.m-negative {
  margin-left: -1px;
}
</style>
