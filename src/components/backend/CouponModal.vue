<template>
  <section>
    <div
      class="modal fade"
      id="productModal"
      ref="modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
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
          <div class="modal-body pt-1">
            <form>
              <div class="form-group">
                <label for="title" class="col-form-label">標題</label
                ><span
                  class="ms-2 text-danger"
                  v-if="!tempCoupon.title && verificationStart"
                  ><i class="bi bi-exclamation-triangle-fill me-1"></i
                  >必填</span
                >
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempCoupon.title"
                />
              </div>
              <div class="form-group">
                <label for="percent" class="col-form-label">折扣百分比</label
                ><span
                  class="ms-2 text-danger"
                  v-if="!tempCoupon.percent && verificationStart"
                  ><i class="bi bi-exclamation-triangle-fill me-1"></i
                  >必填</span
                >
                <input
                  type="number"
                  class="form-control"
                  id="percent"
                  placeholder="請輸入折扣百分比"
                  v-model.number="tempCoupon.percent"
                />
              </div>
              <div class="form-group">
                <label for="code" class="col-form-label">折扣碼</label
                ><span
                  class="ms-2 text-danger"
                  v-if="!tempCoupon.code && verificationStart"
                  ><i class="bi bi-exclamation-triangle-fill me-1"></i
                  >必填</span
                >
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  placeholder="請輸入折扣碼"
                  v-model="tempCoupon.code"
                />
              </div>
              <div class="form-group mb-1">
                <label for="date" class="col-form-label">折扣到期日</label
                ><span
                  class="ms-2 text-danger"
                  v-if="!tempCoupon.due_date && verificationStart"
                  ><i class="bi bi-exclamation-triangle-fill me-1"></i
                  >必填</span
                >
                <input
                  type="date"
                  class="form-control"
                  id="date"
                  v-model="tempCoupon.date"
                />
              </div>
              <div
                class="
                  custom-control custom-checkbox
                  d-flex
                  align-items-center
                  w-100
                  mr-sm-2
                  col-xl-1
                "
              >
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customControlAutosizing"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label
                  class="custom-control-label ms-1"
                  for="customControlAutosizing"
                  >啟用</label
                >
              </div>
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
              刪除優惠券
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
              tempCoupon.title
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

export default {
  data() {
    return {
      modal: '',
      tempCoupon: {},
      verificationStart: false,
    };
  },
  props: {
    status: {
      typeof: String,
      require: true,
    },
  },
  emits: {
    'get-data': () => true,
  },
  methods: {
    handlingProduct() {
      this.tempCoupon.is_enabled = Object.keys(this.tempCoupon).indexOf('is_enabled') < 0 ? 0 : this.tempCoupon.is_enabled;
      this.tempCoupon.due_date = new Date(this.tempCoupon.date).getTime();
      const api = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/admin/coupon`;
      const url = this.status !== 'post' ? `${api}/${this.tempCoupon.id}` : api;
      const data = this.status !== 'delete' ? { data: { ...this.tempCoupon } } : '';
      this.$store.dispatch('updateLoading', true);
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
          this.$store.dispatch('updateLoading', false);
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
