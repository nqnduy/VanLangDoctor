<template>
  <div class="notitable">
    <h3>Thông báo mới</h3>
    <div class="notitable__list">
      <div v-for="(noti, index) in listNotification" :key="index">
        <a
          class="notitable__list-item"
          @click.prevent="readAndGotoRequest(noti)"
        >
          <div class="contentTop">
            <div>
              <div class="contentTop__avt">
                <img
                  :src="getImageLink(noti.userProfilePicture)"
                  alt="profilePicture"
                  v-if="noti.userProfilePicture"
                />
                <img
                  src="../assets/img/user/useravatar_header.png"
                  alt="profilePicturePlaceHolder"
                  v-else
                />
              </div>
              <p class="contentTop__peopleSend">{{ noti.userFullName }}</p>
            </div>
            <div class="contentTop__sendTime">
              <p class="value">
                {{ sendAtHoursBefore(noti.dateTime) }}
              </p>
              <span>trước</span>
            </div>
          </div>
          <div class="contentBottom">
            <p class="predicate">{{ noti.title }}</p>
            <span class="readBtn" v-if="!noti.isRead"></span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import notificationHub from "../hubPlugins/notificationHub";
import store from "../store/modules/notification";
import urlImage from "../constants/imageConstantsURL.js";
import { getRouteFromNotificationType } from "../utils/getLinkFromNotificationType";
import pages from "../constants/pages";

export default {
  computed: {
    ...mapGetters(["listNotification"]),
  },
  data() {
    return {
    };
  },
  created() {
    const vueComponent = this;
    this.getNotification().then(() => {
      let notification = this.listNotification;
      notificationHub.client.on("NewNotification", function (newNotification) {
        store.mutations.setAddNotification(notification, newNotification);
        if(newNotification) {
          if(newNotification.type == 3) {
            const content = newNotification.title;
            vueComponent.forceLogout(content);
          }
        }
      });
      notificationHub.client.on("MarkAsRead", function (notificationId) {
        store.mutations.markAsRead(notification, notificationId);
      });
      
      if (notificationHub.client.state == "Disconnected") {
        notificationHub.start();
      }
    });
  },
  methods: {
    forceLogout(content){
      this.$swal.fire({
        icon: "info",
        title: "Không còn quyền truy cập",
        text: content,
      }).then(() => {
        this.doctorLogout();
        this.$router.push({ path: pages.DOCTOR_PHARMACIST_LOGIN });
      })
    },
    sendAtHoursBefore(dataDate) {
      let startTime = moment(dataDate);
      let endTime = moment();
      if (
        endTime.diff(startTime, "hours") < 24 &&
        endTime.diff(startTime, "hours") > 1
      ) {
        return `${endTime.diff(startTime, "hours")} giờ`;
      } else if (endTime.diff(startTime, "hours") > 24) {
        return `${endTime.diff(startTime, "days")} ngày`;
      }
      return `${endTime.diff(startTime, "minutes")} phút`;
    },
    getImageLink(image) {
      return urlImage.USER_IMAGE_URL + image;
    },
    readAndGotoRequest(noti) {
      if (localStorage.getItem("role") === "Customer") {
        this.ReadNotification(noti.id).then(() => {
          if (noti.title.toLowerCase().includes("từ chối")) {
            this.$router.push({ path: pages.CUSTOME_REQUEST_LIST });
          } else if (noti.title.toLowerCase().includes("cập nhật")) {
            this.$router.push({ path: pages.CUSTOME_MEDICINE_RESULT });
          } else {
            this.$router.push(getRouteFromNotificationType(noti.type));
          }
        });
      } else {
        this.ReadNotification(noti.id).then(() => {
          if (this.$route.path != pages.DOCTOR_LOGIN_SUCCESS) {
            this.$router
              .push(getRouteFromNotificationType(noti.type))
              .then(() => {
                if (noti.type == "NewRequest" || noti.type == "CancelRequest") {
                  this.openRequestListPopup(noti.requestTime);
                }
              });
          } else {
            if (noti.type == "NewRequest" || noti.type == 0 || noti.type == 4 || noti.type == "CancelRequest") {
              this.openRequestListPopup(noti.requestTime);
            }
          }
        });
      }
    },
    ...mapActions([
      "openRequestListPopup",
      "getNotification",
      "ReadNotification",
      "doctorLogout"
    ]),
  },
};
</script>
<style></style>
