<template>
  <section>
    <div class="container py-5">
      <div class="d-flex">
        <button
          type="button"
          class="btn btn-primary text-white btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
          @click="statusModal('post', '')"
        >
          建立新的產品
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-responsive">
          <thead>
            <tr>
              <th scope="col" class="ps-3" width="10%">折扣碼名稱</th>
              <th scope="col">折扣百分比</th>
              <th scope="col">折扣碼</th>
              <th scope="col">到期日</th>
              <th scope="col" width="10%">是否啟用</th>
              <th scope="col" class="text-center" width="10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in coupons" :key="item.id" class="border-white">
              <th scope="row">{{ item.title }}</th>
              <td>{{ item.percent }}</td>
              <td>{{ item.code }}</td>
              <td>
                {{ new Date(item.due_date).toLocaleString().split(' ')[0] }}
              </td>
              <td :class="{ 'text-success': item.is_enabled }">
                {{ item.is_enabled ? '啟用' : '未啟用' }}
              </td>
              <td align="right">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-gray btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#productModal"
                    @click="statusModal('put', item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
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
    </div>
    <CouponModal :status="status" :coupon="tempCoupon" @get-data="getCoupons" />
  </section>
</template>

<script>
import CouponModal from '@/components/backend/CouponModal.vue';

export default {
  data() {
    return {
      status: '',
      coupons: [],
      tempCoupon: {},
    };
  },
  components: {
    CouponModal,
  },
  methods: {
    getCoupons(num = 1) {
      this.$store.dispatch('updateLoading', true);
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/admin/coupons?page=${num}`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.coupons = res.data.coupons;
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
      this.tempCoupon = status === 'post' ? {} : JSON.parse(JSON.stringify(data));
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>
