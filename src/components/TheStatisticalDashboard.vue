<template>
   <div class="dpDashboard">
      <div class="statistical">
         <div class="statistical__top">
            <div class="statistical__top-item requestList">
               <h3 class="statistical__top-item--title h3dpDashboard">Yêu cầu cuộc hẹn</h3>
               <h4 class="statistical__top-item--number">
                  {{ doctorDashboardContent.requestCount }} 
               </h4>
               <button class="statistical__top-item--button buttonPopupDetail" @click="openRequestListPopup">
                  <span>Xem</span>
                  <div class="circle">
                     <img :src="require('../assets/img/icons/nextarrow.svg')" alt="" />
                  </div>
               </button>
            </div>
            <div class="statistical__top-item remainingPatient">
               <h3 class="statistical__top-item--title h3dpDashboard">Khách hàng đang chờ trong ngày</h3>
               <h4 class="statistical__top-item--number">
                  {{ doctorDashboardContent.consultationCount }}
               </h4>
               <button class="statistical__top-item--button buttonPopupDetail" @click="showTheConsultationBtn">
                  <span>Xem</span>
                  <div class="circle">
                     <img :src="require('../assets/img/icons/nextarrow.svg')" alt="" />
                  </div>
               </button>
            </div>
         </div>
         <div class="statistical__bot">
            <h3 class="statistical__bot-title h3dpDashboard">Thông tin khách hàng kế tiếp</h3>
            <div class="statistical__bot-basicInfo" v-if="doctorDashboardContent.nextCustomer === undefined">
               <p style="font-style: italic">Không có khác hàng trong hôm nay!</p>
            </div>
            <div class="statistical__bot-basicInfo" v-else>
               <div class="infoWrap">
                  <img :src="require('../assets/img/icons/user.svg')" alt="" />
                  <div class="textWrap">
                     <p class="name">
                        {{ doctorDashboardContent.nextCustomer.fullName }}
                     </p>
                     <span>, </span>
                     <p class="gender" v-if="!doctorDashboardContent.nextCustomer.gender">Nam</p>
                     <p class="gender" v-else>Nữ</p>
                     <span v-if="doctorDashboardContent.nextCustomer.dateOfBirth.split('T')[0] != '0001-01-01'">, </span>
                     <p class="age" v-if="doctorDashboardContent.nextCustomer.dateOfBirth.split('T')[0] != '0001-01-01'">
                        {{ doctorDashboardContent.nextCustomer.age }}
                     </p>
                     <span v-if="doctorDashboardContent.nextCustomer.dateOfBirth.split('T')[0] != '0001-01-01'"> tuổi</span>
                  </div>
               </div>
               <!-- <div class="infoWrap">
                  <img :src="require('../assets/img/icons/next-cus.svg')" alt="" />
                  <div class="textWrap">
                     <p class="phone">
                        {{ displayStartTime() }}
                     </p>
                  </div>
               </div> -->
            </div>
            <button class="statistical__bot-button buttonPopupDetail" v-if="doctorDashboardContent.nextCustomer === undefined">
               <span>Xem</span>
               <div class="circle">
                  <img :src="require('../assets/img/icons/nextarrow.svg')" alt="" />
               </div>
            </button>

            <button
               v-else
               class="statistical__bot-button buttonPopupDetail"
               @click="openConsultationInfo(doctorDashboardContent.nextCustomer.nextConsultationId)"
            >
               <span>Xem</span>
               <div class="circle">
                  <img :src="require('../assets/img/icons/nextarrow.svg')" alt="" />
               </div>
            </button>
         </div>
      </div>
   </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
   computed: {
      ...mapGetters(["doctorSchedule", "doctorDashboardContent"]),
   },
   data() {
      return {
         isOpenRequestList:false,
         nextCustomer: {
            start: "",
         },
      };
   },
   methods: {
      openConsultationInfo(consultationId) {
         let consultationChoosen = {
            isOpen: true,
            consultationId: consultationId,
         };
         this.$emit("show-consultation-info", consultationChoosen);
      },
      showTheConsultationBtn() {
         this.$emit("show-consultation", true);
      },
      openRequestListPopup(){
         this.$emit("request-list", true);
      },
      ...mapActions(["doctorGetDashboardContent"]),
   },
   watch: {
      doctorSchedule() {
         this.doctorGetDashboardContent()
      },
   },
};
</script>
<style></style>
