<template>
  <section class="bg-gradual h-auto">
    <div
      class="container py-5"
      :class="{ 'vh-100': categoryProducts.length < 12 }"
    >
      <button class="btn btn-info text-white d-block ms-auto" @click="signout">
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
      <table class="table table-hover mb-4">
        <thead>
          <tr>
            <th scope="col" width="10%">縮圖</th>
            <th scope="col">分類</th>
            <th scope="col">產品名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">是否啟用</th>
            <th scope="col" class="">操作</th>
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
                alt=""
                class="img-transparent w-50 ps-2"
              />
            </th>
            <th scope="row">{{ item.category }}</th>
            <td>{{ item.title }}</td>
            <td>${{ item.origin_price.toLocaleString() }}</td>
            <td>${{ item.price.toLocaleString() }}</td>
            <td :class="{ 'text-success': item.is_enabled }">
              {{ item.is_enabled ? '啟用' : '未啟用' }}
            </td>
            <td>
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
      <loading v-model:active="isLoading"></loading>
    </div>
    <Pagination
      :category="category"
      :pagination="pagination"
      @page="getProducts"
    />
    <ProductModal
      ref="modal"
      :status="status"
      :tempProduct="tempProduct"
      @render-all="getAllProducts"
      @render-products="getProducts"
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
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
      products: [],
      apiUrl: 'https://vue3-course-api.hexschool.io',
      apiPath: 'aquarium-supplies',
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
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${num}`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.$swal({ title: res.data.message, icon: 'error' });
            this.$router.push('/');
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.$swal({ title: error.data.message, icon: 'error' });
        });
    },
    statusModal(status, data) {
      this.verificationStart = false;
      this.status = status;
      this.$refs.modal.tempProduct = status === 'post' ? { imagesUrl: [] } : JSON.parse(JSON.stringify(data));
    },
    signout() {
      const url = `${this.apiUrl}/logout`;
      this.isLoading = true;
      this.axios.post(url)
        .then((res) => {
          if (res.data.success) {
            document.cookie = 'hexToken=; expires=; path=/';
            this.isLoading = false;
            this.$swal({ title: res.data.message, icon: 'success' });
            this.$router.push('/');
          } else {
            this.isLoading = false;
            this.$swal({ title: res.data.message, icon: 'error' });
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.$swal({ title: error.data.message, icon: 'error' });
        });
    },
    addImg() {
      const verification = this.tempProduct.imagesUrl.map((item) => item.indexOf('https://'));
      if (!this.tempProduct.imagesUrl.length) {
        this.tempProduct.imagesUrl = [''];
      } else if (verification.some((key) => key === -1)) {
        const key = verification.map((item, i) => (item !== 0 ? `(${i + 1})` : ''));
        const error = key.filter((item) => item !== '');
        this.$swal({ title: `多圖檔${error}尚未輸入圖片網址`, icon: 'error' });
      } else {
        this.tempProduct.imagesUrl.push('');
      }
    },
    loading(boolean) {
      this.isLoading = boolean;
    },
    categoryValue(value) {
      this.category = value;
    },
    getAllProducts() {
      this.$refs.category.getAllProducts();
    },
  },
  computed: {
    categoryProducts() {
      const newArr = this.category === 'total' ? this.products : this.$refs.category.allProducts.filter((item) => item.category === this.category);
      return newArr;
    },
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
