<template>
  <div
    :class="[
      offsetWidthData.list
        ? 'position-relative'
        : ['position-sticky', 'list-top'],
    ]"
  >
    <ul
      class="list-group position-absolute top-0 w-100"
      id="accordionFlushExample"
    >
      <li>
        <a
          data-bs-toggle="collapse"
          :href="offsetWidthData.list ? '#collapseExample' : '#'"
          class="
            d-flex
            justify-content-between
            d-lg-none
            bg-white
            pt-md-4
            py-3
            border-bottom border-4 border-lg-0
            text-gray
          "
          :class="{ 'text-secondary': color }"
          @click.prevent="color = !color"
          >搜尋商品類別、價格、星級、名稱<i class="bi bi-chevron-down"></i>
        </a>
      </li>
      <li
        class="collapse border-bottom border-4 py-3 bg-white"
        id="collapseExample"
      >
        <div class="d-flex align-items-center">
          <label for="exampleFormControlInput2" class="form-label mb-0 me-2"
            ><i class="bi bi-search"></i
          ></label>
          <input
            type="email"
            class="form-control w-50 rounded-0"
            id="exampleFormControlInput2"
            placeholder="請輸入產品"
            v-model="search"
            @input="productsData(search, 'input')"
          />
        </div>
      </li>
      <li class="collapse" id="collapseExample">
        <a
          data-bs-toggle="collapse"
          :data-bs-target="offsetWidthData.list ? '#flush-collapseOne' : '#'"
          href="#"
          class="
            d-flex
            justify-content-between
            d-lg-none
            bg-white
            py-3
            border-bottom border-4
            text-gray
          "
          :class="{ 'text-secondary': color }"
          id="flush-headingOne"
          @click.prevent="color = !color"
          >商品類別<i class="bi bi-chevron-down"></i>
        </a>
      </li>
      <li class="list-group fs-6 p-0 rounded-0" id="collapseExample">
        <ul
          class="accordion-collapse p-0"
          :class="{ collapse: offsetWidthData.list }"
          id="flush-collapseOne"
          data-bs-parent="#accordionFlushExample"
        >
          <li
            class="list-group-item d-flex p-0"
            :class="[categoryValue === 'total' ? 'bg-primary' : 'bg-white']"
          >
            <a
              data-bs-toggle="collapse"
              :href="offsetWidthData.list ? '#collapseExample' : '#'"
              @click.prevent="productsData('total', 'click')"
              class="d-flex w-100 ms-4 ms-lg-0 py-2 ps-3"
              :class="[categoryValue === 'total' ? 'text-white' : 'text-gray']"
              v-scroll-to="{
                el: '#topProduct',
                offset: offsetWidthData.offset,
              }"
              ><img
                src="@/assets/images/icon/全部商品.png"
                class="icon mt-0"
                alt="全部商品"
              />全部商品<span
                :class="[
                  categoryValue === 'total' ? 'text-white' : 'text-gray',
                ]"
                >({{ allProducts.length }})</span
              ></a
            >
          </li>
          <li
            class="list-group-item d-flex p-0"
            :class="[categoryValue === item ? 'bg-primary' : 'bg-white']"
            v-for="(index, item) of totalNum"
            :key="item"
            :data-title="item"
          >
            <a
              data-bs-toggle="collapse"
              :href="offsetWidthData.list ? '#collapseExample' : '#'"
              @click.prevent="productsData(item, 'click')"
              class="d-flex w-100 ms-4 ms-lg-0 py-2 ps-3"
              :class="[categoryValue === item ? 'text-white' : 'text-gray']"
              v-scroll-to="{
                el: '#topProduct',
                offset: offsetWidthData.offset,
              }"
              ><img
                :src="require(`@/assets/images/icon/${item}.png`)"
                class="icon mt-0"
                :alt="item"
              />{{ item
              }}<span
                :class="[categoryValue === item ? 'text-white' : 'text-gray']"
                >({{ index }})</span
              ></a
            >
          </li>
        </ul>
      </li>
      <li class="collapse" id="collapseExample">
        <a
          data-bs-toggle="collapse"
          :data-bs-target="offsetWidthData.list ? '#flush-collapseTwo' : '#'"
          href="#"
          class="
            d-flex
            justify-content-between
            d-lg-none
            bg-white
            py-3
            border-bottom border-4
            text-gray
          "
          :class="{ 'text-secondary': color }"
          id="flush-collapseTwo"
          @click.prevent="color = !color"
          >商品價格、星級<i class="bi bi-chevron-down"></i>
        </a>
      </li>
      <li
        class="fs-6"
        id="collapseExample"
        v-scroll-to="{
          el: '#topProduct',
          offset: -30,
        }"
      >
        <ul
          class="list-group accordion-collapse collapse"
          id="flush-collapseTwo"
          data-bs-parent="#accordionFlushExample"
        >
          <li
            class="list-group-item p-0"
            :class="[optionValue === 'highPrice' ? 'bg-primary' : 'bg-white']"
          >
            <a
              data-bs-toggle="collapse"
              :href="offsetWidthData.list ? '#collapseExample' : '#'"
              class="ps-4 py-2"
              :class="[
                optionValue === 'highPrice' ? 'text-white' : 'text-gray',
              ]"
              @click.prevent="productsData('highPrice', 'select')"
              ><i class="bi bi-sort-numeric-down-alt me-1"></i
              >商品價格由高到低</a
            >
          </li>
          <li
            class="list-group-item p-0"
            :class="[optionValue === 'lowPrice' ? 'bg-primary' : 'bg-white']"
          >
            <a
              data-bs-toggle="collapse"
              :href="offsetWidthData.list ? '#collapseExample' : '#'"
              class="ps-4 py-2"
              :class="[optionValue === 'lowPrice' ? 'text-white' : 'text-gray']"
              @click.prevent="productsData('lowPrice', 'select')"
              ><i class="bi bi-sort-numeric-up me-1"></i>商品價格由低到高</a
            >
          </li>
          <li
            class="list-group-item p-0"
            :class="[optionValue === '2' ? 'bg-primary' : 'bg-white']"
          >
            <a
              data-bs-toggle="collapse"
              :href="offsetWidthData.list ? '#collapseExample' : '#'"
              class="ps-4 py-2"
              :class="[optionValue === '2' ? 'text-white' : 'text-gray']"
              @click.prevent="productsData('2', 'select')"
              ><i class="bi bi-star-fill text-warning me-1"></i>二星級商品</a
            >
          </li>
          <li
            class="list-group-item p-0"
            :class="[optionValue === '3' ? 'bg-primary' : 'bg-white']"
          >
            <a
              data-bs-toggle="collapse"
              :href="offsetWidthData.list ? '#collapseExample' : '#'"
              class="ps-4 py-2"
              :class="[optionValue === '3' ? 'text-white' : 'text-gray']"
              @click.prevent="productsData('3', 'select')"
              ><i class="bi bi-star-fill text-warning me-1"></i>三星級商品</a
            >
          </li>
          <li
            class="list-group-item p-0"
            :class="[optionValue === '4' ? 'bg-primary' : 'bg-white']"
          >
            <a
              data-bs-toggle="collapse"
              :href="offsetWidthData.list ? '#collapseExample' : '#'"
              class="ps-4 py-2"
              :class="[optionValue === '4' ? 'text-white' : 'text-gray']"
              @click.prevent="productsData('4', 'select')"
              ><i class="bi bi-star-fill text-warning me-1"></i>四星級商品</a
            >
          </li>
          <li
            class="list-group-item p-0"
            :class="[optionValue === '5' ? 'bg-primary' : 'bg-white']"
          >
            <a
              data-bs-toggle="collapse"
              :href="offsetWidthData.list ? '#collapseExample' : '#'"
              class="ps-4 py-2"
              :class="[optionValue === '5' ? 'text-white' : 'text-gray']"
              @click.prevent="productsData('5', 'select')"
              ><i class="bi bi-star-fill text-warning me-1"></i>五星級商品</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      optionValue: '',
      search: '',
      totalNum: {},
      color: false,
    };
  },
  props: {
    categoryValue: {
      typeof: String,
      require: true,
    },
  },
  computed: {
    ...mapGetters(['offsetWidthData', 'allProducts']),
  },
  methods: {
    productsData(value, status) {
      this.$emit('emitData', value, status);
      this.search = status !== 'input' ? '' : value;
    },
  },
  watch: {
    allProducts() {
      this.allProducts.forEach((item) => {
        this.totalNum[item.category] = (this.totalNum[item.category] || 0) + 1;
      });
    },
  },
};
</script>

<style scoped  lang="scss">
@import '@/assets/scss/all';
.list-group-item:hover {
  background-color: $primary !important;
  a {
    color: white !important;
  }
  span {
    color: white !important;
  }
}

.icon {
  margin: 3px 6px 0 0;
  width: 25px;
  height: 25px;
}

.list-top {
  top: 10%;
}

.title-top {
  top: 56px;
}

.position-sticky {
  z-index: 10;
}
</style>
