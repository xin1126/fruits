<template>
  <div
    class="content d-flex justify-content-center flex-column align-items-center"
  >
    <h1>我的最愛</h1>
    <ul class="d-flex">
      <li v-for="item in collectionData" :key="item.title">
        {{ item.title }} 、
      </li>
    </ul>
    <img src="@/assets/images/QQ.png" alt="" class="w-lg-25" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectionData: this.$store.state.bookmarkModules.collectionData,
    };
  },
};
</script>
