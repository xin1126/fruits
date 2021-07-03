<template>
  <div class="content">
    <div class="activity-banner d-flex-center text-dark fs-2 mb-lg-4 mb-3">
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
          <span>歡慶十週年加碼活動 </span
          ><span class="ms-5">玩遊戲試手氣拿優惠</span>
        </p>
      </div>
    </div>
    <div class="container pb-5">
      <nav
        aria-label="breadcrumb"
        id="topProduct"
        class="bg-transparent mb-lg-3"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-gray">首頁</li>
          <li class="breadcrumb-item text-secondary">優惠活動</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-6 mb-4 mb-md-0">
          <h3 class="text-center fw-bold">四選一猜水果</h3>
          <p class="text-center mb-2">連續答對三題即可獲得幸運轉盤抽獎券</p>
          <div class="d-flex-center mb-3">
            <img class="game" src="@/assets/images/guessing.png" alt="" />
          </div>
          <button
            type="button"
            class="btn btn-primary mx-auto d-block"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            @click="play(1, true)"
          >
            開始遊戲
          </button>
          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" ref="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    class="modal-title fw-bold fs-4 ms-auto"
                    id="staticBackdropLabel"
                  >
                    第{{ game.num }}題
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body d-flex flex-column">
                  <div v-html="game?.title"></div>
                  <img
                    :src="allProducts[randomNum[0]]?.imgUrl"
                    :alt="allProducts[randomNum[0]]?.title"
                    class="blurry"
                    :class="{ blurryRemove: blurryRemove }"
                  />
                  <div v-html="game?.answer"></div>
                </div>
                <div class="modal-footer px-0 pb-0 pt-3">
                  <div class="row w-100">
                    <div
                      class="col-6"
                      v-for="item in randomOptions"
                      :key="item"
                    >
                      <button
                        type="button"
                        class="btn w-100 mb-3"
                        :class="[
                          game?.targetProduct === allProducts[item]?.title
                            ? ['bg-dark', 'text-white']
                            : 'btn-outline-dark',
                        ]"
                        :disabled="
                          game?.targetProduct !== allProducts[item]?.title &&
                          game?.targetProduct !== undefined
                        "
                        @click="target(allProducts[item].title)"
                      >
                        {{ allProducts[item].title }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="modal-footer py-3">
                  <div v-if="game?.continue" class="w-100">
                    <button
                      v-if="game?.answerBtn && game.num !== 3"
                      type="button"
                      class="btn btn-primary d-block w-100"
                      @click="updateTopic"
                    >
                      下一題
                    </button>
                    <p
                      v-else-if="game.num === 3 && game.answerBtn"
                      class="text-success text-center fw-bold fs-5"
                    >
                      <i class="bi bi-award"></i>恭喜獲得幸運轉盤抽獎券一張
                    </p>
                    <div class="d-flex" v-else>
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        class="btn btn-primary d-block w-100 me-2"
                        @click="$router.push('/products')"
                      >
                        查看更多水果圖片
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary d-block w-100"
                        @click="play(1, true)"
                      >
                        再玩一次
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h3 class="fw-bold text-center position-relative">
            幸運轉盤抽折扣卷<span
              v-if="lotteryTicketNum > 0"
              class="
                position-absolute
                bottom-0
                text-gray
                fs-6
                ms-2
                d-none d-xl-inline
              "
              >目前共有{{ lotteryTicketNum }}張抽獎券</span
            >
          </h3>
          <p class="text-center mb-2">有機會抽中下殺一折優惠券</p>
          <p
            class="text-gray fs-6 d-xl-none text-center mb-2"
            v-if="lotteryTicketNum > 0"
          >
            目前共有{{ lotteryTicketNum }}張抽獎券
          </p>
          <div class="relative game mx-auto mb-3">
            <div
              class="turntable game"
              :style="{ transform: 'rotate(' + rotate + 'deg)' }"
            >
              <ul class="fw-bold text-white me-auto">
                <li>一折優惠券</li>
                <li>二折優惠券</li>
                <li>三折優惠券</li>
                <li>四折優惠券</li>
                <li>五折優惠券</li>
                <li>六折優惠券</li>
                <li>七折優惠券</li>
                <li>八折優惠券</li>
              </ul>
            </div>
            <i class="bi bi-caret-up-fill text-white"></i>
          </div>
          <div class="text-center">
            <button
              class="btn btn-dark me-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
            >
              查看折扣優惠券
            </button>
            <button
              class="btn btn-primary"
              :disabled="Number(lotteryTicketNum) === 0"
              @click="turn"
            >
              開始轉盤
            </button>
            <div
              class="modal fade"
              id="exampleModal2"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered w-auto">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4
                      class="modal-title fw-bold ms-auto"
                      id="exampleModalLabel"
                    >
                      優惠券
                    </h4>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div
                    class="modal-body pb-0"
                    v-if="Object.keys(couponNum).length"
                  >
                    <ul class="p-0">
                      <li
                        class="
                          coupon
                          d-flex
                          flex-column flex-sm-row
                          align-items-center
                          justify-content-center
                          mb-4
                        "
                        v-for="(item, key) in couponNum"
                        :key="key"
                      >
                        <div
                          class="
                            position-relative
                            coupon-style
                            bg-danger
                            d-inline-block
                            me-sm-5
                            mb-1 mb-sm-0
                            px-4
                            py-4
                          "
                        >
                          <span
                            class="
                              border
                              w-auto
                              fs-5
                              px-3
                              py-2
                              text-warning
                              fw-bold
                            "
                            >{{ key }}折優惠折扣券</span
                          >
                        </div>
                        <p class="fs-4">x{{ item }}</p>
                      </li>
                    </ul>
                  </div>
                  <div class="modal-body" v-else>
                    <h2 class="fw-bold">目前無折扣優惠券</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Subscription />
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Subscription from '@/components/frontend/Subscription.vue';

export default {
  data() {
    return {
      modal: '',
      startRotate: '',
      rotate: 0,
      speed: 0,
      num: 8,
      game: {},
      products: [],
      randomNum: [],
      randomOptions: [],
      tempProducts: [],
      blurryRemove: false,
      lotteryTicketNum: localStorage.getItem('lotteryTicketNum') || 0,
      couponNum: JSON.parse(localStorage.getItem('couponNum')) || {},
    };
  },
  components: {
    Subscription,
  },
  methods: {
    turn() {
      if (this.lotteryTicketNum) {
        this.num = 8;
        this.startRotate = setInterval(this.rotateTurntable, 15);
        setTimeout(() => {
          clearInterval(this.startRotate);
          for (let i = 0; i <= 360; i += 45) {
            if (this.rotate > i && this.rotate < i + 45) {
              this.lotteryTicketNum -= 1;
              this.num = this.num === 0 ? 8 : this.num;
              this.couponNum[this.num] = this.couponNum[this.num] + 1 || 1;
              localStorage.setItem('couponNum', JSON.stringify(this.couponNum));
              localStorage.setItem('lotteryTicketNum', this.lotteryTicketNum);
              this.$swal({ title: `恭喜獲得${this.num}折優惠券`, icon: 'success' });
            }
            this.num -= 1;
          }
        }, Math.floor(Math.random() * (1800 - 1200 + 1)) + 1200);
      }
    },
    rotateTurntable() {
      if (this.speed <= 15) {
        this.speed += 0.3;
      }
      if (this.rotate < 360) {
        this.rotate += this.speed;
      } else {
        this.rotate -= 360;
      }
    },
    play(num, status) {
      this.blurryRemove = false;
      this.game = { num };
      if (status) {
        this.tempProducts = [];
      }
      this.randomProducts();
    },
    getAllProducts() {
      this.$store.dispatch('getAllProducts');
    },
    randomProducts() {
      const count = this.allProducts.length - 1;
      for (let i = 0; i < count; i += 1) {
        this.randomNum[i] = i + 1;
      }
      this.randomNum.sort(() => 0.5 - Math.random());
      this.randomNum.splice(4);
      this.randomOptions = [...this.randomNum].sort(() => 0.5 - Math.random());
      if (this.tempProducts.length) {
        this.tempProducts.forEach((tempProductsNum) => {
          this.randomOptions.forEach((randomOptionsNum) => {
            if (tempProductsNum === randomOptionsNum) {
              this.randomProducts();
            }
          });
        });
      }
    },
    target(title) {
      this.game.targetProduct = title;
      this.blurryRemove = true;
      setTimeout(() => {
        if (title === this.allProducts[this.randomNum[0]].title) {
          this.game.answer = '<p class="text-center text-success fs-5 fw-bold"><i class="bi bi-check-circle-fill me-1"></i>恭喜正確答案</p>';
          this.game.answerBtn = true;
        } else {
          this.game.answer = '<p class="text-center text-danger fs-5 fw-bold"><i class="bi bi-x-circle-fill me-1"></i>很可惜答錯了</p>';
          this.game.answerBtn = false;
        }
        this.game.title = `<p class="text-center fs-3 fw-bold">${this.allProducts[this.randomNum[0]].title}</p>`;
        this.game.continue = true;
        if (this.game.num === 3 && this.game.answerBtn) {
          this.lotteryTicketNum = Number(this.lotteryTicketNum) + 1;
          localStorage.setItem('lotteryTicketNum', this.lotteryTicketNum);
        }
      }, 1000);
    },
    updateTopic() {
      this.game.num += 1;
      this.tempProducts.push(this.randomNum[0]);
      this.play(this.game.num);
    },
  },
  computed: {
    allProducts() {
      return this.$store.getters.allProducts;
    },
  },
  mounted() {
    this.getAllProducts();
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';

.game {
  height: 300px;
  width: 300px;
}

.relative {
  position: relative;
  .bi-caret-up-fill {
    position: absolute;
    bottom: -20px;
    right: 43.3%;
    font-size: 40px;
  }
}

.turntable {
  transform: rotate(360deg);
  position: relative;
  background: linear-gradient(45deg, $danger 50%, transparent 50%),
    linear-gradient(90deg, $warning 100%, transparent 100%),
    linear-gradient(135deg, $danger 50%, transparent 50%) 100% 0%,
    linear-gradient(180deg, $warning 100%, transparent 100%) 100% 0%,
    linear-gradient(225deg, $danger 50%, transparent 50%) 100% 100%,
    linear-gradient(270deg, $warning 100%, transparent 100%) 100% 100%,
    linear-gradient(315deg, $danger 50%, transparent 50%) 0% 100%,
    linear-gradient(360deg, $warning 100%, transparent 100%) 0% 100%;
  background-repeat: no-repeat;
  background-size: 50% 50%;
  border-radius: 50%;
  border: 15px solid $dark;
  ul {
    position: relative;
    margin: 0 !important;
    padding: 0 !important;
    margin-top: 50% !important;
    margin-left: 50% !important;
    li {
      writing-mode: vertical-lr;
      position: absolute;
      transform-origin: 0 0;
    }
    @for $i from 1 through 8 {
      li:nth-child(#{$i}) {
        transform: rotate(#{((360 / 8) * $i) + 335}deg)
          translateX(-15px)
          translateY(50%);
      }
    }
  }
}

.blurry {
  filter: blur(30px);
}
.blurryRemove {
  transition: 1s;
  filter: blur(0);
}

.turntable {
  writing-mode: vertical-lr;
  padding: 50px 50px;
}

.coupon:last-child {
  margin-bottom: 0 !important;
}
</style>
