<template>
  <!-- 新增、編輯 -->
  <section>
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
              {{ status === 'post' ? '新建產品' : '編輯產品' }}
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
                  ><i class="bi bi-exclamation-triangle-fill me-1"></i
                  >必填</span
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
                  ><i class="bi bi-exclamation-triangle-fill me-1"></i
                  >必填</span
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
                  ><i class="bi bi-exclamation-triangle-fill me-1"></i
                  >必填</span
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
                  ><i class="bi bi-exclamation-triangle-fill me-1"></i
                  >必填</span
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
                  ><i class="bi bi-exclamation-triangle-fill me-1"></i
                  >必填</span
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
                class="
                  custom-control custom-checkbox
                  d-flex
                  align-items-center
                  mr-sm-2
                  col-xl-1
                "
              >
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customControlAutosizing"
                  v-model="tempProduct.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label
                  class="custom-control-label"
                  for="customControlAutosizing"
                  >啟用</label
                >
              </div>
              <div class="form-group col-xl-2">
                <label for="rating" class="col-form-label">星級</label>
                <input
                  type="number"
                  class="form-control"
                  id="rating"
                  min="1"
                  max="5"
                  placeholder="請輸入星級"
                  v-model="tempProduct.options.rating"
                />
                <label for="date" class="col-form-label">建立時間</label>
                <input
                  type="text"
                  class="form-control"
                  id="date"
                  v-model="tempProduct.options.date"
                />
              </div>
              <div class="form-group col-xl-5">
                <label for="description" class="col-form-label">產品描述</label>
                <textarea
                  class="form-control"
                  id="description"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                ></textarea>
              </div>
              <div class="form-group mb-2 col-xl-5">
                <label for="content" class="col-form-label">補充說明</label>
                <textarea
                  class="form-control"
                  id="content"
                  placeholder="請輸入補充說明"
                  v-model="tempProduct.content"
                ></textarea>
              </div>
              <ProductImg ref="img" />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-gray" data-bs-dismiss="modal">
              取消
            </button>
            <button
              type="submit"
              class="btn btn-success"
              @click="handlingProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
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
              class="btn btn-outline-gray"
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
  </section>
</template>

<script>
import { Modal } from 'bootstrap';
import ProductImg from '@/components/backend/ProductImg.vue';

export default {
  data() {
    return {
      modal: '',
      tempProduct: {
        imgUrl: '',
        imagesUrl: [],
        options: {
          date: '',
          rating: '',
        },
      },
      verificationStart: false,
    };
  },
  components: {
    ProductImg,
  },
  props: {
    status: {
      typeof: String,
      require: true,
    },
  },
  emits: {
    'get-data': () => true,
    'is-loading': (bool) => typeof bool === 'boolean',
  },
  methods: {
    handlingProduct() {
      this.tempProduct.imgUrl = this.$refs.img.tempProduct.imgUrl;
      this.tempProduct.imagesUrl = this.$refs.img.tempProduct.imagesUrl;
      const api = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/admin/product`;
      const url = this.status !== 'post' ? `${api}/${this.tempProduct.id}` : api;
      const data = this.status !== 'delete' ? { data: { ...this.tempProduct } } : '';
      this.$emit('is-loading', true);
      this.axios[this.status](url, data)
        .then((res) => {
          if (res.data.success) {
            this.$emit('get-data');
            this.modal.hide();
            this.$swal({ title: res.data.message, icon: 'success' });
          } else if (res.data.message.length > 0) {
            this.verificationStart = true;
            this.$swal({ title: '請填寫必填欄位', icon: 'error' });
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
          this.$emit('is-loading', false);
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.$emit('is-loading', false);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

<style scoped lang="scss">
textarea {
  height: 150px;
}
</style>
