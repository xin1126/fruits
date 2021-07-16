<template>
  <div class="content">
    <div class="problem-banner d-flex-center text-dark fs-2 mb-md-4 mb-3">
      <div class="bg-linear-left w-100 h-100">
        <p
          class="
            container
            fw-bolder
            d-flex
            flex-column
            justify-content-center
            rounded-3 rounded
            h-100
          "
        >
          <span>常見問與答</span>
        </p>
      </div>
    </div>
    <div class="container mb-md-5 mb-4">
      <nav
        aria-label="breadcrumb"
        id="topProduct"
        class="bg-transparent mb-md-4 mb-3"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-gray">首頁</li>
          <li class="breadcrumb-item text-secondary">常見問題</li>
        </ol>
      </nav>
      <h3 class="fs-5 fw-bold title text-primary rounded-3 rounded m-0">
        需要協助？有任何問題？
        歡迎先看看我們的【常見問題】，讓您快速、方便得找到答案！
      </h3>
      <ul class="accordion p-0 mb-5" id="accordionExample">
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              Q：購買方式跟流程
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <ul class="p-0 list-style px-3">
                <li class="mb-1">
                  網路購買：
                  <p>
                    網路挑選商品，填寫資料後送出訂單。
                    送出訂單後，您可於指定email中收到訂單確認信，將有專人與您聯絡。
                  </p>
                </li>
                <li class="mb-1">
                  電話訂購：
                  <p>
                    您也可直接來電0912345678，告訴我們您想購買的商品、數量及訂購人資料。
                  </p>
                </li>
                <li>
                  傳真訂購：
                  <p>
                    將訂購資訊連同匯款收據（註明匯款人）傳真至02-1234-5678。
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Q：如何使用優惠券?
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              將商品加入購物車後，點選右上角購物車進入購物車列表即可套用優惠券進行折價。
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Q：商品退貨, 優惠券會歸還嗎?
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              若退貨，此訂單使用的優惠券，恕無法歸還。
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingFour">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Q：如何修改訂單?
            </button>
          </h2>
          <div
            id="collapseFour"
            class="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              訂單成立後即無法修改訂購明細，煩請您於下訂前確認訂單資料，如有疑問請直接來電或是填寫表單與我們聯絡。
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingSix">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              Q：可選擇的發票種類有哪些?
            </button>
          </h2>
          <div
            id="collapseSix"
            class="accordion-collapse collapse"
            aria-labelledby="headingSix"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              目前有二聯發票或三聯(統編)發票可選擇，發票會隨貨附上。如因送禮有另寄發票需求，請您在訂單留言備註欄告知，或致電客服中心。
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingSeven">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSeven"
              aria-expanded="false"
              aria-controls="collapseSeven"
            >
              Q：全台都可以配送嗎?
            </button>
          </h2>
          <div
            id="collapseSeven"
            class="accordion-collapse collapse"
            aria-labelledby="headingSeven"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              都可以送的呦，所有商品都有提供台灣本島及離島地區的宅配送貨，收件人資料寫的詳細都收的到哦！
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingEight">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEight"
              aria-expanded="false"
              aria-controls="collapseEight"
            >
              Q：請問訂購後何時出貨呢？
            </button>
          </h2>
          <div
            id="collapseEight"
            class="accordion-collapse collapse"
            aria-labelledby="headingEight"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              下單後當日即有專人處理，立馬為您整理出貨。
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingNine">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseNine"
              aria-expanded="false"
              aria-controls="collapseNine"
            >
              Q：今天訂貨何時可到貨?
            </button>
          </h2>
          <div
            id="collapseNine"
            class="accordion-collapse collapse"
            aria-labelledby="headingNine"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              本公司為24小時全年無休配送服務，當日下單24小時內即可送達，商品配送如遇颱風、地震等不可抗力因素，商品送達之時間將順延。
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingTen">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTen"
              aria-expanded="false"
              aria-controls="collapseTen"
            >
              Q：水果會不會在運送過程中受傷?
            </button>
          </h2>
          <div
            id="collapseTen"
            class="accordion-collapse collapse"
            aria-labelledby="headingTen"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              我們的每一粒水果皆由本店水果專家精心挑選過，並採用防護泡棉，確保水果不會在運送過程中掉出、碰傷。
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingEleven">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEleven"
              aria-expanded="false"
              aria-controls="collapseEleven"
            >
              Q：如何退換貨?
            </button>
          </h2>
          <div
            id="collapseEleven"
            class="accordion-collapse collapse"
            aria-labelledby="headingEleven"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              商品到貨後請立即檢查，若規格不符、瑕疵、損毀等其他品質問題，請立即與我們聯絡，退回商品時必須是完整包裝（包含商品、附件、內外包裝、發票、贈品等）。
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingTwelve">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwelve"
              aria-expanded="false"
              aria-controls="collapseTwelve"
            >
              Q：如何退費?
            </button>
          </h2>
          <div
            id="collapseTwelve"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwelve"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              若您是使用[信用卡]訂購，我們會將款項刷退至付款信用卡的帳戶，將於您的下一期信用卡帳單中顯示。
              若您是使用[貨到付款]，請您提供帳戶資訊(須和訂購人一致)，以轉帳方式退款給您。
            </div>
          </div>
        </li>
        <li class="accordion-item bg-transparent">
          <h2 class="accordion-header" id="headingThirteen">
            <button
              class="
                accordion-button
                collapsed
                fw-bold
                text-primary
                bg-transparent
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThirteen"
              aria-expanded="false"
              aria-controls="collapseThirteen"
            >
              Q：如何知道退款幾天內會收到呢?
            </button>
          </h2>
          <div
            id="collapseThirteen"
            class="accordion-collapse collapse"
            aria-labelledby="headingThirteen"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              若您原付款方式為信用卡，刷退作業時間仍須以銀行作業時間為主，一般可於當期或下期信用卡帳單看到退款(依信用卡結帳週期而定)。
              若您付款方式為ATM，退款將為匯款退回，處理天數大約2~3天，在查核帳戶是否有收到退款。
            </div>
          </div>
        </li>
      </ul>
      <h3 class="fs-5 fw-bold title text-primary rounded-3 rounded">
        如果您有更進一步的問題，請與我們聯絡將由專人為您服務，我們會儘快回覆您！
      </h3>
      <div class="row">
        <div class="col-12">
          <Form v-slot="{ errors }" @submit="createForm" ref="form">
            <div class="row mb-2">
              <div class="col-sm-4 mb-3 mb-sm-0">
                <label for="name" class="form-label"
                  >姓名<span class="text-danger ms-1">*</span></label
                >
                <Field
                  id="name"
                  name="姓名"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名"
                  rules="required"
                  v-model="form.user.name"
                ></Field>
                <Message name="姓名" class="invalid-feedback"></Message>
              </div>
              <div class="col-sm-4">
                <label for="tel" class="form-label"
                  >電話<span class="text-danger ms-1">*</span></label
                >
                <Field
                  id="tel"
                  name="電話"
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話"
                  rules="required|min:8|max:10|numeric"
                  v-model="form.user.tel"
                ></Field>
                <Message name="電話" class="invalid-feedback"></Message>
              </div>
              <div class="col-sm-4">
                <label for="email" class="form-label"
                  >Email<span class="text-danger ms-1">*</span></label
                >
                <Field
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="請輸入 Email"
                  rules="email|required"
                  v-model="form.user.email"
                ></Field>
                <Message name="email" class="invalid-feedback"></Message>
              </div>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label"
                >詢問內容<span class="text-danger ms-1">*</span></label
              >
              <Field
                name="留言"
                id="message"
                class="form-control"
                :class="{ 'is-invalid': errors['留言'] }"
                rules="required"
                placeholder="請輸入留言"
                v-model="form.user.message"
                as="textarea"
              ></Field>
              <Message name="留言" class="invalid-feedback"></Message>
            </div>
            <div class="d-flex align-items-end">
              <button
                :type="[
                  Object.values(errors).length ||
                  Object.values(form.user).indexOf('') >= 0
                    ? 'button'
                    : 'submit',
                ]"
                class="btn btn-primary"
                :class="[
                  Object.values(errors).length ||
                  Object.values(form.user).indexOf('') >= 0
                    ? 'cursor-allowed'
                    : 'btn-hover',
                ]"
                ref="tooltip"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                :data-bs-original-title="[
                  Object.values(errors).length ||
                  Object.values(form.user).indexOf('') >= 0
                    ? '表單欄位尚未填寫完整'
                    : '',
                ]"
              >
                確認送出
              </button>
              <p class="text text-danger ms-2" v-if="!ask">*為必填欄位</p>
              <p class="text text-success ms-2" v-if="ask">
                <i class="bi bi-check-circle-fill me-1"></i>已成功送出
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from 'bootstrap/js/dist/tooltip';

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          message: '',
        },
        tooltip: '',
      },
      ask: false,
    };
  },
  methods: {
    createForm() {
      this.$refs.form.resetForm();
      this.form.user.message = '';
      this.ask = true;
    },
  },
  mounted() {
    this.tooltip = new Tooltip(this.$refs.tooltip);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';

.accordion-button:hover {
  color: #59732c;
  background-color: #eff2ea;
}

textarea {
  height: 140px;
}

.accordion-item {
  border-right: none;
  border-left: none;
  border-top: none;
}

.accordion-button {
  font-size: 18px !important;
  padding-left: 0;
}

.title {
  font-size: 18px !important;
  background-color: #dee4d4;
  padding: 10px;
}

label,
.text {
  font-size: 18px;
}
</style>
