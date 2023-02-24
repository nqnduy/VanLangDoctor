<template>
   <div class="dpDashboard" :key="reRenderKey">
      <ThePopUpRemainingPatient v-if="showConsultationPopup" @closed-popup="showConsultation" />
      <ThePopUpRequestConsultation v-if="showRequestListPopup" @closed-request-list-popup="isOpenRequestListPopup" />
      <ThePopUpNextCustomer :consultation="consultationInfoPopup" v-if="showConsultationInfoPopup" @closed-popup="showConsultationInfo" />
      <DoctorManagement :active="0" />
      <div class="wrapMain" :class="{ disable: showConsultationPopup, disable: showConsultationInfoPopup }">
         <div class="content">
            <div class="leftArea">
               <TheConsultationList :key="reRenderKey" />
            </div>
            <div class="rightArea">
               <TheStatisticalDashboard
                  @show-consultation="showConsultation"
                  @show-consultation-info="showConsultationInfo"
                  @request-list="isOpenRequestListPopup"
               />
               <div class="greeting">
                  <div class="text">
                     <strong>Ngày mới tốt lành, </strong>
                     <p class="doctorName">{{ doctor.fullName }}</p>
                     <span>.</span>
                  </div>
                  <div class="img">
                     <img :src="require('../../assets/img/greetingdashboard.png')" alt="" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import DoctorManagement from "../../containers/DoctorPharmacist/DoctorManagement.vue";
import TheConsultationList from "../../components/TheConsultationList.vue";
import TheStatisticalDashboard from "../../components/TheStatisticalDashboard.vue";
import ThePopUpRemainingPatient from "../../components/ThePopUpRemainingPatient.vue";
import ThePopUpRequestConsultation from "../../components/ThePopUpRequestConsultation.vue";
import ThePopUpNextCustomer from "../../components/ThePopUpNextCustomer.vue";

import { mapGetters, mapActions } from "vuex";
export default {
   computed: {
      ...mapGetters(["doctor", "reRenderKey", "getRequestListPopupOpenRerenderKey"]),
   },
   components: {
      DoctorManagement,
      TheConsultationList,
      TheStatisticalDashboard,
      ThePopUpRemainingPatient,
      ThePopUpRequestConsultation,
      ThePopUpNextCustomer,
   },
   data() {
      return {
         showConsultationPopup: false,
         showConsultationInfoPopup: false,
         consultationInfoPopup: null,
         showRequestListPopup: false,
      };
   },
   created() {
      this.doctorLogged();
   },
   methods: {
      showConsultation(value) {
         this.showConsultationPopup = value;
      },
      showConsultationInfo(value) {
         this.showConsultationInfoPopup = value.isOpen;
         this.consultationInfoPopup = value.consultationId;
      },
      isOpenRequestListPopup(value) {
         this.incrementRenderKey();
         this.doctorGetDashboardContent().then(() => {
            this.showRequestListPopup = value;
         });
      },
      ...mapActions(["doctorLogged", "doctorGetDashboardContent", "incrementRenderKey"]),
   },
   watch: {
      getRequestListPopupOpenRerenderKey() {
         this.showRequestListPopup = true;
      }
   }
};
</script>
