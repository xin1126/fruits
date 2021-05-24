<template>
  <section class="bg-gradual h-auto">
    <div
      class="container py-5"
      :class="{ 'vh-100': categoryProducts.length < 12 }"
    >
      <button class="btn btn-info d-block ms-auto" @click="signout">
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
        <select
          class="form-select w-25 ms-3 bg-transparent"
          aria-label="Default select example"
          v-model="categoryValue"
        >
          <option selected disabled value="">搜尋產品類別</option>
          <option value="total">全部商品</option>
          <option v-for="item in category" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <table class="table table-hover">
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
            <td>{{ item.origin_price }}</td>
            <td>{{ item.price }}</td>
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
  </section>
  <!-- Modal -->
  <!-- 新增、編輯 -->
  <div
    class="modal fade"
    id="productModal"
    ref="modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
            {{ !tempProduct.title ? '新建產品' : '編輯產品' }}
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="row">
            <div class="form-group col-xl-3">
              <label for="title" class="col-form-label">標題</label
              ><span
                class="ms-2 text-danger"
                v-if="!tempProduct.title && verificationStart"
                ><i class="bi bi-exclamation-triangle-fill me-1"></i>必填</span
              >
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="請輸入標題"
                v-model="tempProduct.title"
              />
            </div>
            <div class="form-group col-xl-2">
              <label for="category" class="col-form-label">分類</label
              ><span
                class="ms-2 text-danger"
                v-if="!tempProduct.category && verificationStart"
                ><i class="bi bi-exclamation-triangle-fill me-1"></i>必填</span
              >
              <input
                type="text"
                class="form-control"
                id="category"
                placeholder="請輸入分類"
                v-model="tempProduct.category"
              />
            </div>
            <div class="form-group col-xl-2">
              <label for="unit" class="col-form-label">單位</label
              ><span
                class="ms-2 text-danger"
                v-if="!tempProduct.unit && verificationStart"
                ><i class="bi bi-exclamation-triangle-fill me-1"></i>必填</span
              >
              <input
                type="text"
                class="form-control"
                id="unit"
                placeholder="請輸入單位"
                v-model="tempProduct.unit"
              />
            </div>
            <div class="form-group col-xl-2">
              <label for="origin-price" class="col-form-label">原價</label
              ><span
                class="ms-2 text-danger"
                v-if="!tempProduct.origin_price && verificationStart"
                ><i class="bi bi-exclamation-triangle-fill me-1"></i>必填</span
              >
              <input
                type="number"
                class="form-control"
                id="origin-price"
                min="0"
                max="1000000"
                placeholder="請輸入原價"
                v-model.number="tempProduct.origin_price"
              />
            </div>
            <div class="form-group col-xl-2">
              <label for="price" class="col-form-label">售價</label
              ><span
                class="ms-2 text-danger"
                v-if="!tempProduct.price && verificationStart"
                ><i class="bi bi-exclamation-triangle-fill me-1"></i>必填</span
              >
              <input
                type="number"
                class="form-control"
                id="price"
                min="0"
                max="1000000"
                placeholder="請輸入售價"
                v-model.number="tempProduct.price"
              />
            </div>
            <div
              class="custom-control custom-checkbox d-flex align-items-center mr-sm-2 col-xl-1"
            >
              <input
                type="checkbox"
                class="custom-control-input"
                id="customControlAutosizing"
                v-model="tempProduct.is_enabled"
                :true-value="1"
                :false-value="0"
              />
              <label class="custom-control-label" for="customControlAutosizing"
                >啟用</label
              >
            </div>
            <div class="form-group col-xl-6">
              <label for="description" class="col-form-label">產品描述</label>
              <textarea
                class="form-control"
                id="description"
                placeholder="請輸入產品描述"
                v-model="tempProduct.description"
              ></textarea>
            </div>
            <div class="form-group mb-2 col-xl-6">
              <label for="content" class="col-form-label">補充說明</label>
              <textarea
                class="form-control"
                id="content"
                placeholder="請輸入補充說明"
                v-model="tempProduct.content"
              ></textarea>
            </div>
            <div class="col-4">
              <div class="d-flex align-items-center justify-content-between">
                <label for="imgUrl" class="col-form-label mb-2">主要圖檔</label>
                <button class="btn btn-sm btn-secondary" @click="addImg">
                  多圖新增
                </button>
              </div>
              <input
                type="url"
                class="form-control mb-3"
                id="imgUrl"
                placeholder="請輸入圖片網址"
                v-model="tempProduct.imgUrl"
              />
              <img
                :src="tempProduct.imgUrl"
                class="img-fluid rounded mx-auto w-50"
              />
            </div>
            <div
              v-for="(item, key) in tempProduct.imagesUrl"
              :key="item"
              class="col-4"
            >
              <div class="d-flex align-items-center justify-content-between">
                <label for="imgUrl" class="col-form-label mb-2"
                  >多圖檔({{ key + 1 }})</label
                >
                <button
                  class="btn-close"
                  @click="tempProduct.imagesUrl.splice(key, 1)"
                ></button>
              </div>
              <input
                type="text"
                class="form-control mb-3"
                id="imgUrl"
                placeholder="請輸入圖片網址"
                v-model="tempProduct.imagesUrl[key]"
              />
              <img
                :src="tempProduct.imagesUrl[key]"
                class="img-fluid rounded mx-auto w-50"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            @click="handlingProduct"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <!-- 刪除 -->
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
            刪除商品
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          確定要刪除
          <span class="text-danger font-weight-bold">{{
            tempProduct.title
          }}</span>
          商品嗎？（刪除後將無法恢復）
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="handlingProduct"
            data-bs-dismiss="modal"
          >
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      modal: '',
      status: '',
      categoryValue: 'total',
      tempProduct: {
        imagesUrl: [],
      },
      products: [],
      totalProducts: [],
      category: [],
      apiUrl: 'https://vue3-course-api.hexschool.io',
      apiPath: 'aquarium-supplies',
      isLoading: false,
      verificationStart: false,
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=1`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
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
    getTotal() {
      this.isLoading = true;
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.totalProducts = Object.values(res.data.products);
            this.category = new Set(Object.values(res.data.products).map((item) => item.category));
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
    statusModal(status, data) {
      this.verificationStart = false;
      this.status = status;
      if (status === 'post') {
        this.tempProduct = { imagesUrl: [] };
      } else {
        this.tempProduct = JSON.parse(JSON.stringify(data));
      }
    },
    handlingProduct() {
      const api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      const url = this.status !== 'post' ? `${api}/${this.tempProduct.id}` : api;
      const data = this.status !== 'delete' ? { data: { ...this.tempProduct } } : '';
      this.isLoading = true;
      this.axios[this.status](url, data)
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
            this.getTotal();
            this.modal.hide();
            this.$swal({ title: res.data.message, icon: 'success' });
          } else if (this.status === 'delete') {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.isLoading = false;
          } else {
            this.verificationStart = true;
            this.$swal({ title: '請填寫必填欄位', icon: 'error' });
            this.isLoading = false;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.$swal({ title: error.data.message, icon: 'error' });
        });
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
      const arrLength = this.tempProduct.imagesUrl?.length;
      if (arrLength === undefined) {
        this.tempProduct.imagesUrl = [''];
      } else if (arrLength > 0 && this.tempProduct.imagesUrl[arrLength - 1].indexOf('https://')) {
        this.$swal({ title: `多圖檔(${arrLength})尚未輸入圖片網址`, icon: 'error' });
      } else {
        this.tempProduct.imagesUrl.push('');
      }
    },
  },
  computed: {
    categoryProducts() {
      let newArr;
      if (this.categoryValue === 'total') {
        newArr = this.products;
      } else {
        newArr = this.totalProducts.filter((item) => item.category === this.categoryValue);
      }
      return newArr;
    },
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.modal = new Modal(this.$refs.modal);
    if (!token) {
      this.$swal({ title: '尚未登入', icon: 'error' });
      this.$router.push('/');
    } else {
      this.axios.defaults.headers.common.Authorization = token;
      this.getProducts();
      this.getTotal();
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
