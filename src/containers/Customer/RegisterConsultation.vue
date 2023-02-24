<template>
  <div class="registerConsultation">
    <CustomerManagement :active="0" />
    <div class="wrapMain">
      <form action="" @submit.prevent="getRegistration">
        <div class="content">
          <div class="leftArea">
            <div class="consultationArea">
              <div class="dpInformation">
                <div class="dpInformation__avt">
                  <img v-if="imageLink()"
                    :src="
                      imageLink()
                    "
                    alt=""
                  />
                  <img v-else
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
                      <p class="dpInformation__text-info--value gender" v-else>
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
                  Bác sĩ/Dược sĩ bạn muốn được tư vấn <b class="require">*</b>
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
                  v-for="(doctor, index) in doctorListConsultation"
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
                    <p class="role">{{ translateRole(doctor.role)  }}</p>
                    <p class="name">{{ doctor.fullName }}</p>
                  </label>
                </div>
                <ul class="dpList__paging" v-if="doctorListConsultation.length > 0">
                  <li
                    v-for="(page, index) in totalDoctor"
                    :key="index"
                    @click="goToPage(index)"
                    :class="{ current: index == pageNumber - 1 }"
                  >
                    <span>{{ index + 1 }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="dpRegisterTime">
              <p class="chooseTime pManagement">
                Chọn khung giờ hẹn <b class="require">*</b>
              </p>
              <!-- <div class="dpRegisterTime__dayList-arrow">
                <img
                  :src="require('../../assets/img/icons/nextarrow.svg')"
                  alt=""
                  class="prev"
                />
              </div> -->
              <div class="dpRegisterTime__dayList">
                <div
                  class="dpRegisterTime__dayList-item"
                  v-for="(date, index) in getDateCanRegister(
                    this.doctorChosen.schedule
                  )"
                  :key="index"
                >
                  <div class="day">
                    <p>{{ date.format('DD/MM/YYYY') }}</p>
                  </div>
                </div>
              </div>
              <!-- <div class="dpRegisterTime__dayList-arrow">
                <img
                  :src="require('../../assets/img/icons/nextarrow.svg')"
                  alt=""
                  class="next"
                />
              </div> -->
              <div class="vinh-style-list-time">
                <div
                  class="dpRegisterTime__time "
                  v-for="(date, index) in getTimeCanRegister(
                    this.doctorChosen.schedule
                  )"
                  :key="index"
                >
                  <div class="dpRegisterTime__time-list">
                    <div
                      class="dpRegisterTime__time-list--item"
                      v-for="(time, index) in date.time"
                      :key="index"
                      @click="selectThisTime(time, date.day)"
                      :class="{
                        selected:
                          (time + '-' + date.day == selectTime + '-' + selectDay),
                      }"
                    >
                      {{ time }}
                    </div>
                  </div>
                </div>
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
            <div class="symptomArea">
              <p class="symptomArea__title pManagement">
                Triệu chứng bệnh <b class="require">*</b>
              </p>
              <div class="symptomArea__textarea">
                <textarea
                  name="symptom"
                  placeholder="Triệu chứng"
                  v-model="symptom"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <VButtonSubmit
          :disabled="isDisableBtn"
          title="Gửi đăng ký"
          option="white"
          style="text-align: center"
        />
      </form>
    </div>
  </div>
</template>
<script>
import CustomerManagement from "../Customer/CustomerManagement.vue";
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import StarRating from "vue-star-rating";
import { mapActions, mapGetters } from "vuex";
import IMAGE_URL from "../../constants/imageConstantsURL.js";
import moment from "moment";
export default {
  computed: {
    ...mapGetters(["doctorListConsultation", "totalDoctor", "doctorChosen"]),
  },
  components: {
    CustomerManagement,
    StarRating,
    VButtonSubmit,
  },
  data() {
    return {
      isDisableBtn:false,
      readMore: true,
      pageNumber: 1,
      checked: 0,
      selectTime: null,
      selectDay: null,
      isSelected: false,
      symptom: null,
      keyword: "",
    };
  },
  filters: {
    summary: function (text) {
      return text.substring(0, 120) + " ...";
    },
  },
  created() {
    let params = { page: this.pageNumber, search: this.keyword };
    this.customerGetDoctorConsultation(params).then(() => {
      this.getDoctorInformationSeleted();
    });
  },
  mounted() {
    this.getDoctorInformationSeleted();
  },
  methods: {
    toggler(obj, flag) {
      this.$set(obj, "Flag", flag);
    },
    goToPage(index) {
      this.pageNumber = index + 1;
      let params = { page: this.pageNumber, search: this.keyword };
      this.customerGetDoctorConsultation(params).then(() => {
        this.getDoctorInformationSeleted();
      });
    },
    getDoctorInformationSeleted() {
      let selected = this.doctorListConsultation.find(
        (doctor) => doctor.order == this.checked
      );
      this.customerGetDoctorInformation(selected.id);
    },
    getDateCanRegister() {
      const day1 = moment().add(1,'days');
      const day2 = moment().add(2,'days');
      const day3 = moment().add(3,'days');
      return [day1, day2, day3];
    },
    getTimeCanRegister(scheduled) {
      let listDayWithTime = [];
      let listDay = this.getDateCanRegister();
      for (let index = 0; index < listDay.length; index++) {
        let dayWithTime = { day: null, time: [] };
        dayWithTime.time = this.get24HoursOfDay(listDay[index], index, scheduled);
        dayWithTime.day = listDay[index];
        listDayWithTime.push(dayWithTime);
      }
      listDayWithTime.forEach((ele)=>{
        ele.day = ele.day.format('MM/DD/YYYY');
      })
      return listDayWithTime;
    },
    get24HoursOfDay(dateEnd, index, scheduled) {
      const start = moment().add(index, 'days');
      const end = moment(new Date(dateEnd));
      let durationHourBetween = moment.duration(end.diff(start));
      const hoursBetween = Math.abs(durationHourBetween.asHours());
      const result = [];
      for (let index = 0; index < hoursBetween; index++) {
        if(start.fromNow(true) === 'a few seconds'){
          const time = moment(start).add(index+1,'hours').format('HH:00');
          if(7 < +time.split(':')[0] && +time.split(':')[0] < 22){
            result.push(time)
          } else {
            break;
          }
        } else {
          const startNewTime = moment(start).startOf('day');
          const time = startNewTime.add(index+1,'hours').format('HH:00');
          if(7 < +time.split(':')[0] && +time.split(':')[0] < 22){
            result.push(time)
          }
        }
      }
      if (scheduled.length > 0) {
        let listBusyTimeInDay = [];
        let listBusyDay = [];
        scheduled.forEach((element) => {
          listBusyDay.push(moment(element.split("T")[0]).format('DD/MM/YYYY'));
          listBusyTimeInDay.push(element.split("T")[1].slice(0, 5));
        });
          listBusyTimeInDay.forEach(() => {
            if (listBusyDay.includes(dateEnd.format('DD/MM/YYYY'))) {
            let dayKey = listBusyDay.indexOf(dateEnd.format('DD/MM/YYYY'))
              if (dayKey > -1) {
                let index = result.indexOf(listBusyTimeInDay[dayKey])
                result.splice(index,1)
                listBusyDay.splice(dayKey,1)
                listBusyTimeInDay.splice(dayKey,1)
              }
            }
          });
      }
      return result;
    },
    selectThisTime(time, day) {
      this.selectTime = time;
      this.selectDay = day;
      this.isSelected = !this.isSelected;
    },
    getRegistration() {
      if (this.symptom == null || this.symptom.trim().length == 0) {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bạn chưa ghi các triệu chứng",
        });
      } else if (this.selectTime == null) {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bạn chưa chọn khung giờ",
        });
      } else {
        this.isDisableBtn = true;
        let stringDateTimeSelected =
          this.selectDay + " " + this.selectTime + " UTC";
        let toDateValue = new Date(stringDateTimeSelected).toISOString();
        let data = {
          time: toDateValue,
          symptom: this.symptom,
          doctorPharmacistId: this.doctorChosen.id,
        };

        this.customerRegisConsultation(data)
          .then(() => {
            this.isDisableBtn = false;
            this.$swal.fire({
              icon: "success",
              title: "Bạn đã gửi yêu cầu đăng ký thành công",
            });
            this.$router.push({ path: "RequestList" });
          })
          .catch((error) => {
            this.isDisableBtn = false;
            if (200 < error.response.status < 500) {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hãy thử đăng ký khung giờ khác",
              });
            }
          });
      }
    },
    searchDoctorResult() {
      let params = { page: this.pageNumber, search: this.keyword };
      this.customerGetDoctorConsultation(params).then(() => {
        this.getDoctorInformationSeleted();
      });
    },
    imageLink(){
      if(this.doctorChosen.profilePicture != undefined){
        return IMAGE_URL.USER_IMAGE_URL + this.doctorChosen.profilePicture
      }else{
        return null
      }
    },
    translateRole(role){
      if(role == 'Doctor'){
        return 'Bác sĩ'
      }else{
        return 'Dược sĩ'
      }
    },
    ...mapActions([
      "customerGetDoctorConsultation",
      "customerGetDoctorInformation",
      "customerRegisConsultation",
    ]),
  },
  watch: {
    checked() {
      this.getDoctorInformationSeleted();
    },
  },
};
</script>
<style scoped>
.vinh-style-list-time {
  display: flex;
  justify-content: space-around;
}
.dpRegisterTime__time{
  min-width: 15rem;
}
</style>>

