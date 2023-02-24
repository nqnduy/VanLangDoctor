<template>
   <div class="dpDashboard">
      <VPopupConfirm option="cancelConsultation" v-show="showPopupCancelConsultation" @closed-popup-confirm-cancel='closePopupConfirmCancel' :consultationId='this.doctorDashboardContent.nextCustomer.nextConsultationId'/>
      <div class="popupNextCustomer">
         <div class="bg-black"></div>
         <div class="popupNextCustomer__content">
            <div class="popupNextCustomer__content-title">
               <h3 class="h3dpDashboard">Thông tin cuộc hẹn kế tiếp, {{ displayTimeConsultation() }}</h3>
               <button class="closePopup" @click="closedPopup">
                  <img :src="require('../assets/img/icons/close.svg')" alt="" />
               </button>
            </div>
            <div class="popupNextCustomer__content-topContent">
               <div class="popupNextCustomer__content-topContent--left">
                  <div class="avt">
                     <img v-if="doctorDashboardContent.nextCustomer.profilePicture" :src='imageLink' alt="" />
                     <img v-else :src="require('../assets/img/user/useravatar_header.png')" alt="" />
                  </div>
                  <div class="textWrap">
                     <p class="name">
                        {{ doctorDashboardContent.nextCustomer.fullName }}
                     </p>
                  </div>
               </div>
               <div class="popupNextCustomer__content-topContent--right">
                  <div class="consultationSelectBtnWrap">
                     <button
                        v-if="!doctorDashboardContent.nextCustomer.alreadyStarted"
                        class="popupNextCustomer__content-topContent--right-button createConsultation"
                        @click="openMeeting"
                     >
                        Mở cuộc hẹn
                     </button>
                     <button v-else class="popupNextCustomer__content-topContent--right-button createConsultation btnClose" @click="closeMeeting">
                        Kết thúc tư vấn
                     </button>
                     <button v-if="!doctorDashboardContent.nextCustomer.alreadyStarted" 
                        class="popupNextCustomer__content-topContent--right-button cancelConsultation" @click="cancelConsultation" >Huỷ cuộc hẹn</button>
                  </div>
                  <div class="medicalRecordBtnWrap vinhStyle">
                     <router-link :to="{ name: 'DPCustomerInformation',params: { id: doctorDashboardContent.nextCustomer.id } }" class="popupNextCustomer__content-topContent--right-button createMedicalRecord" >
                        Xem chi tiết
                     </router-link>
                  </div>
               </div>
            </div>
            <div class="popupNextCustomer__content-midContent">
               <h3 class="h3Popup">Thông tin cơ bản</h3>
               <div class="popupNextCustomer__content-midContent--infoWrap">
                  <div class="columnWrap">
                     <div class="rowItem">
                        <p class="rowItem__title">Giới tính</p>
                        <p class="rowItem__value" v-if="!doctorDashboardContent.nextCustomer.gender">Nam</p>
                        <p class="rowItem__value" v-else>Nữ</p>
                     </div>
                     <div class="rowItem">
                        <p class="rowItem__title">Ngày sinh</p>
                        <p class="rowItem__value" v-if="doctorDashboardContent.nextCustomer.dateOfBirth.split('T')[0] != '0001-01-01'">
                           {{ transferDataDate(doctorDashboardContent.nextCustomer.dateOfBirth) }}
                        </p>
                        <p class="rowItem__value" v-else>Chưa cập nhật</p>
                     </div>
                     <div class="rowItem">
                        <p class="rowItem__title">Tuổi</p>
                        <p class="rowItem__value" v-if="doctorDashboardContent.nextCustomer.dateOfBirth.split('T')[0] != '0001-01-01'">
                           {{ doctorDashboardContent.nextCustomer.age }}
                        </p>
                        <p class="rowItem__value" v-else>Chưa cập nhật</p>
                     </div>
                  </div>
                  <div class="columnWrap">
                     <div class="rowItem">
                        <p class="rowItem__title">Chiều cao</p>
                        <p class="rowItem__value" v-if="doctorDashboardContent.nextCustomer.height !== 0">{{ doctorDashboardContent.nextCustomer.height }} cm</p>
                        <p class="rowItem__value" v-else>Chưa cập nhật</p>
                     </div>
                     <div class="rowItem">
                        <p class="rowItem__title">Cân nặng</p>
                        <p class="rowItem__value" v-if="doctorDashboardContent.nextCustomer.weight !== 0">{{ doctorDashboardContent.nextCustomer.weight }} kg</p>
                        <p class="rowItem__value" v-else>Chưa cập nhật</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import IMAGE_URL from "../constants/imageConstantsURL.js";
import moment from 'moment';

import VPopupConfirm from "../components/VPopupConfirm.vue";
export default {
   props: ["consultation"],
   components: {
      VPopupConfirm,
   },
   computed: {
      ...mapGetters(["doctorDashboardContent", "doctorSchedule", "hostURL"]),
   },
   data() {
      return {
         imageLink: null,
         consultationStartTime: null,
         showPopupCancelConsultation: false,
      };
   },
   mounted(){
      this.setCustomerAvatar()
   },
   methods: {
      transferDataDate(date){
         return moment(date).format("DD/MM/yyyy");
      },
      getConsultationInfo() {
         const customerConsultation = this.doctorSchedule.find(
            (consultation) => consultation.id == this.doctorDashboardContent.nextCustomer.nextConsultationId
         );
         return customerConsultation;
      },
      setCustomerAvatar(){
         this.imageLink = IMAGE_URL.USER_IMAGE_URL + this.doctorDashboardContent.nextCustomer.profilePicture
      },
      displayTimeConsultation() {
         const customerConsultation = this.getConsultationInfo();
         let date = this.transferDataDate(customerConsultation.startTime.split("T")[0]);
         let time = customerConsultation.startTime.split("T")[1];
         return `lúc ${time} ngày ${date} `;
      },
      closedPopup() {
         this.$emit("closed-popup", false);
      },
      closePopupConfirmCancel(value){
         this.showPopupCancelConsultation = value
         this.closedPopup();
      },
      openMeeting() {
         const before10minutes = 10 * 60000;
         const now = new Date(Date.now()).getTime();
         const today = new Date(Date.now()).toLocaleDateString();
         const customerConsultation = this.getConsultationInfo();
         const getScheduleDay = Date.parse(customerConsultation.startTime);
         const scheduleDay = new Date(getScheduleDay).toLocaleDateString();
         if (now + before10minutes < Date.parse(customerConsultation.startTime)) {
            this.$swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Chưa đến giờ hẹn, vui lòng quay lại sau",
            });
            return;
         }
         if (scheduleDay == today) {
            this.$swal.fire({
               title: "Đang mở cuộc hẹn...",
               timer: 5000,
               timerProgressBar: true,
               willOpen: () => {
                  this.doctorOpenMeeting(customerConsultation.id);
               },
               didOpen: () => {
                  this.$swal.showLoading();
               },
               didClose: () => {
                  if (this.hostURL === null) {
                     this.$swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Có lỗi khi mở cuộc hẹn, hãy thử lại",
                     });
                  } else {
                     window.open(this.hostURL, "_blank").focus();
                     this.doctorDashboardContent.nextCustomer.alreadyStarted = true;
                  }
               },
            });
         }
      },
      closeMeeting() {
         this.doctorCloseMeeting(this.doctorDashboardContent.nextCustomer.nextConsultationId).then(() => {
            this.incrementRenderKey();
            this.closedPopup();
         });
      },
      cancelConsultation(){
         this.showPopupCancelConsultation = true
      },
      ...mapActions(["doctorOpenMeeting", "doctorCloseMeeting", "incrementRenderKey"]),
   },
};
</script>
<style>
   .vinhStyle{
      text-align: center !important;
   }
</style>
