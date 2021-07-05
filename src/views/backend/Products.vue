<template>
  <section>
    <div class="container py-5">
      <div class="d-flex">
        <button
          class="btn btn-primary text-white btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
          @click="statusModal('post', '')"
        >
          建立新的產品
        </button>
        <ProductsCategory @value="categoryValue" ref="category" />
      </div>
      <div class="table-responsive">
        <table class="table table-responsive">
          <thead>
            <tr>
              <th scope="col" class="ps-3" width="10%">縮圖</th>
              <th scope="col">分類</th>
              <th scope="col">產品名稱</th>
              <th scope="col">原價</th>
              <th scope="col">售價</th>
              <th scope="col">星級</th>
              <th scope="col" width="10%">重量</th>
              <th scope="col">產地</th>
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
                  class="img-transparent w-lg-50 w-md-75 ps-2"
                />
              </th>
              <th scope="row">{{ item.category }}</th>
              <td>{{ item.title }}</td>
              <td>${{ item.origin_price.toLocaleString() }}</td>
              <td>${{ item.price.toLocaleString() }}</td>
              <td>{{ item.options.rating }}</td>
              <td>{{ item.options.weight }}</td>
              <td>{{ item.options.origin }}</td>
              <td :class="{ 'text-success': item.is_enabled }">
                {{ item.is_enabled ? '啟用' : '未啟用' }}
              </td>
              <td align="right">
                <div class="btn-group">
                  <button
                    class="btn btn-outline-gray btn-sm"
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
      <Pagination
        :category="category"
        :pagination="pagination"
        @page="getProducts"
      />
    </div>
    <ProductModal ref="modal" :status="status" @get-data="getAllProducts" />
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
    };
  },
  components: {
    ProductModal,
    ProductsCategory,
    Pagination,
  },
  methods: {
    getProducts(num = 1) {
      this.$store.dispatch('updateLoading', true);
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/admin/products?page=${num}`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.$router.push('/login');
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$swal({ title: '發生錯誤，請嘗試重新整理此頁面', icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
    statusModal(status, data) {
      this.status = status;
      this.$refs.modal.verificationStart = false;
      this.$refs.modal.tempProduct = status === 'post' ? { imagesUrl: [], options: { rating: '', weight: '', origin: '' } } : JSON.parse(JSON.stringify(data));
      this.$bus.emit('tempProduct', this.$refs.modal.tempProduct);
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
  mounted() {
    this.getProducts();
    this.$refs.category.getAllProducts();
  },
};
</script>
