<template>
  <section class="row">
    <div class="col-xl-4">
      <label for="imgUrl" class="col-form-label mb-2">主要圖檔</label>
      <button
        type="button"
        class="btn btn-sm btn-gray ms-2"
        @click="addImg(0)"
        v-if="tempProduct.imagesUrl.length === 0"
      >
        多圖新增
      </button>
      <button
        type="button"
        class="btn btn-sm btn-gray ms-2 mb-2 mb-sm-0"
        @click="displayInput = !displayInput"
      >
        切換上傳圖片方式
      </button>
      <input
        v-if="!displayInput"
        type="text"
        class="form-control mb-3"
        id="imgUrl"
        placeholder="請輸入圖片網址"
        v-model="tempProduct.imgUrl"
      />
      <input
        v-if="displayInput"
        id="customFile"
        ref="file"
        type="file"
        class="form-control mb-3"
        @change="uploadFile('')"
      />
      <img :src="tempProduct.imgUrl" class="img-fluid rounded mx-auto w-50" />
    </div>
    <div
      v-for="(item, key) in tempProduct.imagesUrl"
      :key="item"
      class="col-xl-4"
    >
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <label :for="'imgUrl' + (key + 1)" class="col-form-label mb-2 me-2"
            >多圖檔({{ key + 1 }})</label
          >
          <button
            type="button"
            class="btn btn-sm btn-gray"
            @click="addImg(key + 1)"
            v-if="tempProduct.imagesUrl.length - 1 === key"
          >
            多圖新增
          </button>
          <button
            type="button"
            class="btn btn-sm btn-gray ms-2"
            @click="displayInputs[key] = !displayInputs[key]"
          >
            切換上傳圖片方式
          </button>
        </div>
        <button
          type="button"
          class="btn-close"
          @click="tempProduct.imagesUrl.splice(key, 1)"
        ></button>
      </div>
      <input
        v-if="!displayInputs[key]"
        type="text"
        class="form-control mb-3"
        :id="'imgUrl' + (key + 1)"
        placeholder="請輸入圖片網址"
        v-model="tempProduct.imagesUrl[key]"
      />
      <input
        v-if="displayInputs[key]"
        id="customFile"
        :ref="'file' + key"
        type="file"
        class="form-control mb-3"
        @change="uploadFile(key)"
      />
      <img
        :src="tempProduct.imagesUrl[key]"
        class="img-fluid rounded mx-auto w-50"
      />
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      tempProduct: {
        imgUrl: '',
        imagesUrl: [],
      },
      displayInput: false,
      displayInputs: {},
    };
  },
  methods: {
    addImg(index) {
      const verification = this.tempProduct.imagesUrl.map((item) => item.indexOf('https://'));
      if (!this.tempProduct.imagesUrl.length) {
        this.tempProduct.imagesUrl = [''];
        this.displayInputs[index] = false;
      } else if (verification.some((key) => key === -1)) {
        const key = verification.map((item, i) => (item !== 0 ? `(${i + 1})` : ''));
        const error = key.filter((item) => item !== '');
        this.$swal({ title: `多圖檔${error}尚未輸入圖片網址`, icon: 'error' });
      } else {
        this.tempProduct.imagesUrl.push('');
        this.displayInputs[index] = false;
      }
    },
    uploadFile(key) {
      const uploadedFile = key === '' ? this.$refs.file.files[0] : this.$refs[`file${key}`].files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/admin/upload`;
      this.$store.dispatch('updateLoading', true);
      this.axios.post(url, formData)
        .then((res) => {
          if (res.data.success) {
            if (key === '') {
              this.tempProduct.imgUrl = res.data.imageUrl;
            } else {
              this.tempProduct.imagesUrl[key] = res.data.imageUrl;
            }
            this.$swal({ title: '上傳成功', icon: 'success' });
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
  created() {
    this.$bus.on('tempProduct', (data) => {
      this.tempProduct = { ...data };
      if (Object.keys(this.tempProduct).indexOf('imagesUrl') < 0) {
        this.tempProduct.imagesUrl = [];
      }
    });
  },
  unmounted() {
    this.$bus.off('tempProduct');
  },
};
</script>
