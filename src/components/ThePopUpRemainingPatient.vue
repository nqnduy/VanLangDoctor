<template>
  <div class="dpDashboard">
    <div class="popupRemainingPatient">
      <div class="bg-black"></div>
      <div class="popupRemainingPatient__content">
        <div class="popupRemainingPatient__content-title">
          <h3 class="h3dpDashboard">Bệnh nhân còn lại trong ngày</h3>
          <button class="closePopup" @click="closedPopup">
            <img :src="require('../assets/img/icons/close.svg')" alt="" />
          </button>
        </div>
        <div class="popupRemainingPatient__content-list">
          <div
            class="popupRemainingPatient__content-list--item"
            v-for="(consultation, index) in listScheduleToday()"
            :key="index"
          >
            <div class="infoWrap">
              <div class="inWrap">
                <p class="time">{{consultation.startTime.split("T")[1].slice(0, 5)}}</p>
                <p class="name">{{consultation.customer}}</p>
              </div>
              <p class="symptom">{{consultation.symptom}}</p>
            </div>
            <div class="avt">
              <img
                :src="require('../assets/img/user/useravatar_header.png')"
                alt=""
              />
              <img v-if="consultation.profilePictureCustomer" :src='setAvatar(consultation.profilePictureCustomer)' alt="" />
            </div>
          </div>
          <div class="noti-none-customer" v-if="listScheduleToday === null">
              <h2>Hôm nay, không có cuộc hẹn nào</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import IMAGE_URL from "../constants/imageConstantsURL.js";
export default {
  computed: {
    ...mapGetters(["doctorSchedule"]),
  },
  methods: {
    listScheduleToday(){
        let now = new Date(Date.now()).toISOString().split("T")[0]
        let todaySchedule = this.doctorSchedule.filter(consultation => (
            consultation.startTime.split("T")[0] == now &&
            consultation.state == 'Waiting' //state id = waiting
        ))
        this.customer = todaySchedule;
        return todaySchedule
    },
    closedPopup() {
      this.$emit("closed-popup", false);
    },
    setAvatar(profilePictureCustomer){
      return IMAGE_URL.USER_IMAGE_URL + profilePictureCustomer
    }
  },
};
</script>
<style scoped>
.noti-none-customer h2{
    text-align: center;
    font-weight: bold;
    font-size: 24px;
}
</style>
