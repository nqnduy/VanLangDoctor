<template>
   <div class="allConsultations">
      <CustomerManagement :active="2" />
      <ThePopupConsultationResult v-if="seeMedicalRecord" @close-popup-medical-record="closeMedicalRecord" />
      <div class="wrapMain" :class="{ disable: seeMedicalRecord }">
         <div class="content">
            <h3>Lịch hẹn</h3>
            <div class="bgTable">
               <div class="consultationList">
                  <div v-for="(consultation, index) in customerConsultationsList" :key="index">
                     <!-- new GUI  -->
                     <div class="consultationList__item active">
                        <div>
                           <div class="consultationList__item-dateTime">
                              <p class="date">
                                 {{ transferDataDate(consultation.startTime) }}
                              </p>
                              <p class="time">{{ consultation.startTime.split("T")[1].slice(0, 5) }}</p>
                           </div>
                           <div class="consultationList__item-symptoms">
                              <p class="title">Triệu chứng</p>
                              <p class="detail">{{ consultation.symptom }}</p>
                           </div>
                           <div class="consultationList__item-consultant">
                              <p class="title">Bác sĩ</p>
                              <p class="detail">{{ consultation.consultant }}</p>
                           </div>
                           <div v-if="consultation.state == 'Waiting'" class="consultationList__item-buttonGroup">
                              <!-- cuộc họp chưa hoàn thành -->
                              <button class="consultationList__item-button join">
                                 <img :src="require('../../assets/img/icons/join.svg')" alt="" />
                                 <span @click="joinConsultation(consultation.id)">Tham gia</span>
                              </button>
                           </div>
                           <!-- cuộc họp đã hoàn thành chưa rating -->
                           <div v-else-if="consultation.state == 'Done'" class="consultationList__item-buttonGroup">
                              <div
                                 v-if="consultation.isRated === false"
                                 class="consultationList__item-button rating"
                                 @click="(isShowRateForm = !isShowRateForm), (visible = visible === index ? null : index)"
                              >
                                 <img :src="require('../../assets/img/icons/rating-blue.svg')" alt="" />
                                 <span>Đánh giá</span>
                              </div>
                              <div class="consultationList__item-button result" @click="openMedicalRecord(consultation.id)">
                                 <img :src="require('../../assets/img/icons/paper.svg')" alt="" />
                                 <span>Kết quả</span>
                              </div>
                           </div>
                           <!-- cuộc họp đã bị hủy -->
                           <div v-else class="consultationList__item-buttonGroup">
                              <!-- cuộc họp chưa hoàn thành -->
                              <button class="consultationList__item-button join disableBtn" prevent>
                                 <span>Đã bị hủy</span>
                              </button>
                              <div class="consultationList__item-button result"
                                @click="showTheReason(consultation)">
                                <span>Xem lý do</span>
                              </div>
                           </div>
                        </div>
                        <RateConsultation
                           :consultationId="consultation.id"
                           v-show="isShowRateForm && visible === index"
                           @submit-rating="submitRating"
                        />
                     </div>
                     <!-- Warning: Have button prescription  -->
                     <!--   <div class="consultationList__item-buttonGroup">
                <button class="consultationList__item-button prescription">
                  <img
                    :src="require('../../assets/img/icons/prescription.svg')"
                    alt=""
                  />
                  <span>Đơn thuốc</span>
                </button>
            </div> -->
                  </div>
               </div>
            </div>
            <ul class="paging">
               <li v-for="(page, index) in totalConsultation" :key="index" @click="goToPage(index)" :class="{ current: index == pageNumber - 1 }">
                  <span>{{ index + 1 }}</span>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
<script>
import CustomerManagement from "./CustomerManagement.vue";
import RateConsultation from "../../containers/Customer/RateConsultation.vue";
import ThePopupConsultationResult from "../../components/ThePopupConsultationResult.vue";
import { mapActions, mapGetters } from "vuex";
import moment from 'moment'

export default {
   computed: {
      ...mapGetters(["customerConsultationsList", "totalConsultation", "meetingURL", "reRenderKey"]),
   },
   components: {
      CustomerManagement,
      RateConsultation,
      ThePopupConsultationResult,
   },
   data() {
      return {
         pageNumber: 1,
         isShowRateForm: false,
         seeMedicalRecord: false,
         visible: null,
      };
   },
   mounted() {
      this.customerGetSchedule(this.pageNumber);
   },
   methods: {
     showTheReason(consultation) {
       this.$swal.fire({
          title: 'Lý do',
          text: consultation.reason
        })
     },
     transferDataDate(dataDate){
       return moment(dataDate).format('DD/MM/YYYY')
     },
      openMedicalRecord(consultationId) {
         this.customerGetMedicalRecord(consultationId);
         this.seeMedicalRecord = true;
      },
      closeMedicalRecord(value) {
         this.seeMedicalRecord = value;
      },
      submitRating(value) {
         this.isShowRateForm = value;
      },
      goToPage(index) {
         this.pageNumber = index + 1;
         this.customerGetSchedule(this.pageNumber);
      },
      joinConsultation(meetingId) {
         let meetingUrl;
         this.customerGetConsultationMeetingURL(meetingId).then(() => {
            meetingUrl = this.meetingURL;
            if (meetingUrl != null && meetingUrl.length > 0) {
               this.$swal
                  .fire({
                     icon: "warning",
                     title: "Vui lòng không tự ý thoát khỏi cuộc trò chuyện.",
                  })
                  .then(() => {
                     window.open(meetingUrl, "_blank").focus();
                  });
            } else {
               this.$swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Bạn không thể tham gia tư vấn khi chưa tới giờ chỉ định.\n Xin vui lòng kiểm tra và quay lại sau!",
               });
            }
         });
      },
      ...mapActions(["customerGetSchedule", "customerGetConsultationMeetingURL", "customerGetMedicalRecord"]),
   },
   watch: {
      reRenderKey() {
         this.customerGetSchedule(this.pageNumber);
      },
   },
};
</script>
<style></style>
