<template>
  <section class="bg-gradual">
    <div
      class="container py-5"
      :class="[
        !pagination.has_next && category === 'total'
          ? 'vh-xl-100'
          : categoryProducts.length < 12 && category !== 'total'
          ? 'vh-100'
          : 'h-auto',
      ]"
    >
      <button
        class="btn btn-info text-white d-block ms-auto mb-3 mb-sm-0"
        @click="signout"
      >
        登出
      </button>
      <div class="d-flex">
        <button
          class="btn btn-info text-white btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
          @click="statusModal('post', '')"
        >
          建立新的產品
        </button>
        <ProductsCategory @value="categoryValue" ref="category" />
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col" class="ps-3" width="10%">縮圖</th>
              <th scope="col">分類</th>
              <th scope="col">產品名稱</th>
              <th scope="col">原價</th>
              <th scope="col">售價</th>
              <th scope="col">星級</th>
              <th scope="col">庫存</th>
              <th scope="col" width="10%">是否啟用</th>
              <th scope="col" class="text-center" width="10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in categoryProducts"
              :key="item.id"
              class="border-white"
            >
              <th scope="row">
                <img
                  :src="item.imgUrl"
                  :alt="item.title"
                  class="img-transparent w-lg-50 w-md-75 ps-2"
                />
              </th>
              <th scope="row">{{ item.category }}</th>
              <td>{{ item.title }}</td>
              <td>${{ item.origin_price.toLocaleString() }}</td>
              <td>${{ item.price.toLocaleString() }}</td>
              <td>{{ item.options.rating }}</td>
              <td>{{ item.options.stock }}</td>
              <td :class="{ 'text-success': item.is_enabled }">
                {{ item.is_enabled ? '啟用' : '未啟用' }}
              </td>
              <td align="right">
                <div class="btn-group">
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#productModal"
                    @click="statusModal('put', item)"
                  >
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    @click="statusModal('delete', item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <loading v-model:active="isLoading">
        <div class="loadingio-spinner-ripple-s9x0fb0v5xl">
          <div class="ldio-85i9asunyhd">
            <div></div>
            <div></div>
          </div>
        </div>
      </loading>
      <Pagination
        :category="category"
        :pagination="pagination"
        @page="getProducts"
      />
    </div>
    <ProductModal
      ref="modal"
      :status="status"
      @get-data="getAllProducts"
      @is-loading="loading"
    />
  </section>
</template>

<script>
import ProductModal from '@/components/backend/ProductModal.vue';
import ProductsCategory from '@/components/backend/ProductsCategory.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      status: '',
      category: 'total',
      pagination: {},
      products: [],
      isLoading: false,
    };
  },
  components: {
    ProductModal,
    ProductsCategory,
    Pagination,
  },
  methods: {
    getProducts(num = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/admin/products?page=${num}`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.$router.push('/');
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.isLoading = false;
        });
    },
    statusModal(status, data) {
      this.status = status;
      this.$refs.modal.verificationStart = false;
      this.$refs.modal.tempProduct = status === 'post' ? { imagesUrl: [], options: { stock: '', rating: '' } } : JSON.parse(JSON.stringify(data));
      this.$bus.emit('tempProduct', this.$refs.modal.tempProduct);
    },
    signout() {
      const url = `${process.env.VUE_APP_APIURL}/logout`;
      this.isLoading = true;
      this.axios.post(url)
        .then((res) => {
          if (res.data.success) {
            document.cookie = 'hexToken=; expires=; path=/';
            this.$swal({ title: res.data.message, icon: 'success' });
            this.$router.push('/');
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
    loading(boolean) {
      this.isLoading = boolean;
    },
    categoryValue(value) {
      this.category = value;
    },
    getAllProducts() {
      this.getProducts();
      this.$refs.category.getAllProducts();
    },
  },
  computed: {
    categoryProducts() {
      const newArr = this.category === 'total' ? this.products : this.$refs.category.allProducts.filter((item) => item.category === this.category);
      return newArr;
    },
  },
  created() {
    this.$bus.on('loading', (boolean) => {
      this.loading(boolean);
    });
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (!token) {
      this.$swal({ title: '尚未登入', icon: 'error' });
      this.$router.push('/');
    } else {
      this.axios.defaults.headers.common.Authorization = token;
      this.getProducts();
      this.$refs.category.getAllProducts();
    }
  },
};
</script>

<style lang="scss">
.table-responsive th {
  word-break: keep-all;
}
.bg-gradual {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
}
.img-transparent {
  mix-blend-mode: multiply;
}
textarea {
  height: 150px;
}
</style>
