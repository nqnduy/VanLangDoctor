<template>
  <div class="changeRequest">
    <CustomerManagement
      :active="1"
      isChild="yes"
      childTitle="Thay đổi yêu cầu"
    />
    <div class="wrapMain">
      <form action="" @submit.prevent="changeDoctorRequest">
        <div class="content">
          <div class="content__wrap">
            <div class="changeRequest__requestInfo">
              <h3>Thông tin yêu cầu</h3>
              <div class="changeRequest__requestInfo-inside">
                <div class="changeRequest__requestInfo-inside--title">
                  <p class="changeRequest__requestInfo-inside--title role">
                    Bác sĩ
                  </p>
                  <p class="changeRequest__requestInfo-inside--title date">
                    Ngày và giờ
                  </p>
                  <p class="changeRequest__requestInfo-inside--title symptom">
                    Triệu chứng bệnh
                  </p>
                </div>
                <div class="changeRequest__requestInfo-inside--value">
                  <p class="changeRequest__requestInfo-inside--value role">
                    {{ customerChangeDoctorRequestedData.currentDoctor }}
                  </p>
                  <p class="changeRequest__requestInfo-inside--value role">
                    {{
                      transferDataDate(customerChangeDoctorRequestedData.time)
                    }}
                  </p>
                  <p class="changeRequest__requestInfo-inside--value role">
                    {{ customerChangeDoctorRequestedData.symptom }}
                  </p>
                </div>
              </div>
            </div>
            <div class="changeRequest__consultationInfo">
              <div class="leftArea">
                <div class="consultationArea">
                  <div class="dpInformation">
                    <div class="dpInformation__avt">
                      <img v-if="imageLink()" :src="imageLink()" alt="" />
                      <img
                        v-else
                        :src="
                          require('../../assets/img/user/useravatar_header.png')
                        "
                        alt=""
                      />
                    </div>
                    <div class="dpInformation__text">
                      <h2 class="dpInformation__text-name">
                        {{ this.doctorChosen.fullName }}
                      </h2>
                      <div class="dpInformation__text-info">
                        <div class="dpInformation__text-info--title">
                          <p class="dpInformation__text-info--title role">
                            Vai trò
                          </p>
                          <p class="dpInformation__text-info--title exp">
                            Kinh nghiệm
                          </p>
                          <p class="dpInformation__text-info--title specialist">
                            Chuyên khoa
                          </p>
                          <p class="dpInformation__text-info--title gender">
                            Giới tính
                          </p>
                          <p class="dpInformation__text-info--title rate">
                            Đánh giá
                          </p>
                        </div>
                        <div class="dpInformation__text-info--value">
                          <p class="dpInformation__text-info--value role">
                            {{ this.doctorChosen.role }}
                          </p>
                          <p class="dpInformation__text-info--value exp">
                            {{ this.doctorChosen.exp }} Năm
                          </p>
                          <p class="dpInformation__text-info--value specialist">
                            {{ this.doctorChosen.specialist }}
                          </p>
                          <p
                            class="dpInformation__text-info--value gender"
                            v-if="this.doctorChosen.gender"
                          >
                            Nữ
                          </p>
                          <p
                            class="dpInformation__text-info--value gender"
                            v-else
                          >
                            Nam
                          </p>
                          <star-rating
                            :increment="this.doctorChosen.rating"
                            :show-rating="false"
                            :rating="this.doctorChosen.rating"
                            :round-start-rating="false"
                            :active-on-click="true"
                            :star-size="13"
                            style="pointer-events: none"
                          >
                          </star-rating>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="dpSearch">
                    <p class="dpSearch__label pManagement">
                      Bác sĩ/Dược sĩ bạn muốn được tư vấn
                      <b class="require">*</b>
                    </p>
                    <form
                      action=""
                      class="dpSearch__input"
                      @submit.prevent="searchDoctorResult"
                    >
                      <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        class="dpSearch__input-search inputManagement"
                        v-model="keyword"
                      />
                      <button class="dpSearch__input-icon">
                        <img
                          :src="require('../../assets/img/icons/search.svg')"
                          alt=""
                        />
                      </button>
                    </form>
                  </div>
                  <!-- Max-item: 5 -->
                  <div class="dpList">
                    <div
                      class="dpList__name"
                      v-for="(doctor, index) in doctorFreeList"
                      :key="index"
                    >
                      <label class="dpList__name-item">
                        <input
                          type="radio"
                          name="radio"
                          :value="index"
                          v-model="checked"
                        />
                        <span class="checkmark"></span>
                        <p class="role">{{ translateRole(doctor.role) }}</p>
                        <p class="name">{{ doctor.fullName }}</p>
                      </label>
                    </div>
                    <ul class="dpList__paging"
                        v-if="customerChangeDoctorRequestedData.freeDoctorPharmacists.items.length != 0"
                    >
                      <li
                        v-for="(page, index) in this
                          .customerChangeDoctorRequestedData
                          .freeDoctorPharmacists.totalPages"
                        :key="index"
                        @click="goToPage(index)"
                        :class="{ current: index == pageNumber - 1 }"
                      >
                        <span>{{ index + 1 }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="rightArea">
                <div class="rateArea">
                  <h2 class="rateArea__title">Đánh giá</h2>
                  <div class="rateArea__content">
                    <div
                      :key="key"
                      v-for="(commented, key) in this.doctorChosen.ratings"
                      class="rateArea__content-item"
                    >
                      <div class="rateArea__content-top">
                        <p class="name">{{ commented.customerFullName }}</p>
                        <star-rating
                          :increment="commented.rate"
                          :show-rating="false"
                          :rating="commented.rate"
                          :round-start-rating="false"
                          :active-on-click="true"
                          :star-size="14"
                          style="pointer-events: none"
                        >
                        </star-rating>
                      </div>
                      <div class="rateArea__content-bottom">
                        <!-- Excerpt section -->
                        <div v-show="!commented.Flag">
                          <p class="commentContent">
                            {{ commented.comment }}
                            <!-- {{ commented.comment | summary }} -->
                          </p>
                          <!-- <p class="show-moreBtn" @click="toggler(commented, true)">
                              Đọc tiếp
                            </p> -->
                        </div>
                        <!-- Excerpt section end -->

                        <!-- Content section -->
                        <!-- <div class="contentFull" v-show="commented.Flag">
                            <p class="commentContent" v-html="commented.comment"></p>
                          </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p class="changeRequest__warning">
              <b class="require">*</b> Việc thay đổi này sẽ tạo một yêu cầu mới
              và chuyển yêu cầu cũ sang trạng thái huỷ
            </p>
          </div>
        </div>
        <VButtonSubmit
          :disabled="isDisableBtn"
          title="Thay đổi"
          option="white"
          style="text-align: center"
        />
      </form>
    </div>
  </div>
</template>
<script>
import CustomerManagement from "../Customer/CustomerManagement.vue";
import StarRating from "vue-star-rating";
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import IMAGE_URL from "../../constants/imageConstantsURL.js";

export default {
  computed: {
    ...mapGetters([
      "customerChangeDoctorRequestedData",
      "customerConsultationsRequest",
      "doctorChosen",
    ]),
  },
  components: {
    CustomerManagement,
    StarRating,
    VButtonSubmit,
  },
  data() {
    return {
      pageNumber: 1,
      requestId: this.$route.params.id,
      doctorFreeList: null,
      currentDoctor: null,
      checked: 0,
      keyword: null,
      isDisableBtn: false,
    };
  },
  created() {
    if (!this.customerConsultationsRequest) {
      const query = {
        page: 1,
        sortOrder: "Decsending",
        sortColumn: "time",
      };
      this.customerGetConsultationsRequestList(query);
    }
    const query = {
      id: this.requestId,
    };
    this.customerChangeDoctorRequested(query).then(() => {
      this.dataHandle();
      this.getDoctorInformationSeleted();
    });
  },
  methods: {
    goToPage(index) {
      this.pageNumber = index + 1;
      let params = {
        id: this.requestId,
        page: this.pageNumber,
        search: this.keyword,
      };
      this.customerChangeDoctorRequested(params).then(() => {
        this.dataHandle();
        this.getDoctorInformationSeleted();
      });
    },
    getDoctorInformationSeleted() {
      let selected = this.doctorFreeList.find(
        (doctor) => doctor.order == this.checked
      );
      this.customerGetDoctorInformation(selected.id);
    },
    dataHandle() {
      this.doctorFreeList =
        this.customerChangeDoctorRequestedData.freeDoctorPharmacists.items; // Noted
      this.doctorFreeList.forEach((element, index) => {
        element.order = index;
      });
    },
    transferDataDate(dataDate) {
      const date = moment(dataDate).format("DD/MM/YYYY");
      const hours = moment(dataDate).format("HH:mm");
      return `${date} | ${hours}`;
    },
    searchDoctorResult() {
      let params = {
        id: this.requestId,
        search: this.keyword
      };
      this.customerChangeDoctorRequested(params).then(() => {
        this.dataHandle();
        this.getDoctorInformationSeleted();
      });
    },
    imageLink() {
      if (this.doctorChosen.profilePicture != undefined) {
        return IMAGE_URL.USER_IMAGE_URL + this.doctorChosen.profilePicture;
      } else {
        return null;
      }
    },
    translateRole(role) {
      if (role == "Doctor") {
        return "Bác sĩ";
      } else {
        return "Dược sĩ";
      }
    },
    changeDoctorRequest() {
      this.isDisableBtn = true;
      let data = {
        oldRequestId: this.requestId,
        newDoctorPharmacistId: this.doctorChosen.id,
      };

      this.customerChangeRequest(data)
        .then(() => {
          this.$swal.fire({
            icon: "success",
            title: "Bạn đã thay đổi yêu cầu thành công",
          });
          this.$router.push({ path: "/customer/requestlist" });
        })
        .catch((error) => {
          this.isDisableBtn = false;
          if(error.response.status != 500) {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data,
            });
          } else {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Đã có lỗi xảy ra",
            });
          }
        });
    },
    ...mapActions([
      "customerChangeDoctorRequested",
      "customerGetDoctorInformation",
      "customerGetConsultationsRequestList",
      "customerChangeRequest"
    ]),
  },
  watch: {
    checked() {
      this.getDoctorInformationSeleted();
    },
  },
};
</script>
<style></style>
