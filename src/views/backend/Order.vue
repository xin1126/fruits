<template>
  <section>
    <div class="container example-popover py-5">
      <table class="table table-responsive">
        <thead>
          <tr>
            <th scope="col" class="ps-3" width="25%">訂單編號</th>
            <th scope="col" width="15%">付款狀態</th>
            <th scope="col" width="20%">建立日期</th>
            <th scope="col" width="15%">訂單客戶資料</th>
            <th scope="col" width="15%">訂單商品資料</th>
            <th scope="col" class="text-center" width="10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-white"
            v-for="(item, index) in orders"
            :key="item.id"
          >
            <th>{{ item.id }}</th>
            <th :class="{ 'text-success': item.is_paid }">
              {{ item.is_paid ? '已付款' : '未付款' }}
            </th>
            <th>
              {{
                new Date(item.create_at * 1000).toLocaleString().split(' ')[0]
              }}
            </th>
            <th>
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                :id="'dropdownUserButton' + (index + 1)"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                客戶資料
              </button>
              <ul
                class="dropdown-menu p-0"
                :aria-labelledby="'dropdownUserButton' + (index + 1)"
              >
                <li
                  class="
                    d-flex
                    justify-content-between
                    p-2
                    border-bottom border-2
                  "
                >
                  <p class="mb-0 me-5">姓名：</p>
                  <p class="mb-0">{{ item.user.name }}</p>
                </li>
                <li
                  class="
                    d-flex
                    justify-content-between
                    p-2
                    border-bottom border-2
                  "
                >
                  <p class="mb-0 me-5">email</p>
                  <p class="mb-0">{{ item.user.email }}</p>
                </li>
                <li
                  class="
                    d-flex
                    justify-content-between
                    p-2
                    border-bottom border-2
                  "
                >
                  <p class="mb-0 me-5">電話：</p>
                  <p class="mb-0">{{ item.user.tel }}</p>
                </li>
                <li
                  class="
                    d-flex
                    justify-content-between
                    p-2
                    border-bottom border-2
                  "
                >
                  <p class="mb-0 me-5">住址：</p>
                  <p class="mb-0">{{ item.user.address }}</p>
                </li>
                <li
                  class="
                    d-flex
                    justify-content-between
                    p-2
                    border-bottom border-2
                  "
                >
                  <p class="mb-0 me-5">留言：</p>
                  <p class="mb-0">
                    {{ item.message ? item.message : '未留言' }}
                  </p>
                </li>
              </ul>
            </th>
            <th>
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                :id="'dropdownMenuButton1' + (index + 1)"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                @click="orderData(item.products, item.total)"
              >
                商品資料
              </button>
              <table class="dropdown-menu table table-striped w-auto p-0">
                <thead>
                  <tr>
                    <th scope="col">商品名稱</th>
                    <th scope="col">數量</th>
                    <th scope="col">金額</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in tempOrder" :key="product.id">
                    <th scope="row">{{ product.product.title }}</th>
                    <td>{{ product.qty }}</td>
                    <td>{{ product.final_total.toLocaleString() }}</td>
                  </tr>
                  <tr>
                    <th class="text-danger">總金額</th>
                    <th></th>
                    <th>{{ total.toLocaleString() }}</th>
                  </tr>
                </tbody>
              </table>
            </th>
            <td align="right">
              <div class="btn-group">
                <button
                  class="btn btn-outline-gray btn-sm"
                  type="button"
                  :id="'dropdownEditButton' + (index + 1)"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  @click="edit(item.total, item.is_paid)"
                >
                  編輯
                </button>
                <form
                  class="dropdown-menu"
                  :aria-labelledby="'dropdownEditButton' + (index + 1)"
                >
                  <div class="form-group px-2">
                    <label :for="'total' + (index + 1)" class="col-form-label"
                      >總金額</label
                    ><span class="ms-2 text-danger" v-if="!verificationStart"
                      ><i class="bi bi-exclamation-triangle-fill me-1"></i
                      >必填</span
                    >
                    <input
                      type="number"
                      class="form-control"
                      :id="'total' + (index + 1)"
                      placeholder="請輸入總金額"
                      @input="verificationStart = editOrder.total"
                      v-model.number="editOrder.total"
                    />
                  </div>
                  <div class="form-group px-2 d-flex flex-column">
                    <label :for="'paid' + (index + 1)" class="col-form-label"
                      >是否付款</label
                    >
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      :id="'paid' + (index + 1)"
                      v-model="editOrder.is_paid"
                    />
                  </div>
                  <div class="d-flex justify-content-end px-2">
                    <button type="button" class="btn btn-gray btn-sm me-1">
                      取消
                    </button>
                    <button
                      type="button"
                      class="btn btn-success btn-sm"
                      @click="handlingOrder(item.id, 'put')"
                      :disabled="!verificationStart"
                    >
                      確認
                    </button>
                  </div>
                </form>
                <button
                  class="btn btn-outline-danger btn-sm"
                  :id="'dropdownDeleteButton' + (index + 1)"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  刪除
                </button>
                <div
                  class="dropdown-menu px-2"
                  :aria-labelledby="'dropdownDeleteButton' + (index + 1)"
                >
                  <h6>確認要刪除此訂單?</h6>
                  <button type="button" class="btn btn-gray btn-sm me-1">
                    取消
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="handlingOrder(item.id, 'delete')"
                  >
                    確認
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pagination="pagination" @page="getOrders" />
    </div>
  </section>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      total: '',
      verificationStart: false,
      pagination: {},
      editOrder: {},
      orders: [],
      tempOrder: [],
    };
  },
  components: {
    Pagination,
  },
  methods: {
    orderData(data, total) {
      this.total = total;
      this.tempOrder = Object.values(data);
    },
    getOrders(num = 1) {
      this.$store.dispatch('updateLoading', true);
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${num}`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
            this.pagination = res.data.pagination;
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.$router.push('/login');
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
    handlingOrder(id, status) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/admin/order/${id}`;
      const data = status !== 'delete' ? { data: { ...this.editOrder } } : '';
      this.$store.dispatch('updateLoading', true);
      this.axios[status](url, data)
        .then((res) => {
          if (res.data.success) {
            this.getOrders();
            this.$swal({ title: res.data.message, icon: 'success' });
          } else if (res.data.message.length > 0) {
            this.$swal({ title: '請填寫必填欄位', icon: 'error' });
            this.$store.dispatch('updateLoading', false);
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.$store.dispatch('updateLoading', false);
          }
        })
        .catch(() => {
          this.$swal({ title: '請求API失敗', icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
    edit(total, paid) {
      this.editOrder = { total, is_paid: paid };
      this.verificationStart = true;
    },
  },

  mounted() {
    this.getOrders();
  },
};
</script>
