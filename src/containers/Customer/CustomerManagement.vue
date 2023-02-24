<template>
   <div>
      <TheManagementFrame
         :listColumn="listColumn"
         :active="active"
         :childTitle="childTitle"
         :isChild="isChild"
         :isInfo="isInfo"
         :routeInfo="routeInfo"
      />
      <div>
         <router-view></router-view>
      </div>
   </div>
</template>
<script>
import TheManagementFrame from "../../components/TheManagementFrame.vue";

export default {
   components: {
      TheManagementFrame,
   },
   props: ["active", "childTitle", "isChild", "isInfo"],
   data() {
      return {
         imageLink: localStorage.getItem("imageLink"),
         routeInfo: "CustomerUpdateAccountInformation",
         listColumn: [
            {
               title: "Đăng ký tư vấn",
               icon: require("../../assets/img/icons/users.svg"),
               route: {
                  link: "CustomerRegisterConsultation",
               },
            },
            {
               title: "Danh sách yêu cầu",
               icon: require("../../assets/img/icons/requestlist.svg"),
               route: {
                  link: "CustomerRequestList",
               },
            },
            {
               title: "Xem lịch hẹn",
               icon: require("../../assets/img/icons/seeconsultation.svg"),
               route: {
                  link: "CustomerAllConsultations",
               },
            },
            {
               title: "Thông tin tài khoản",
               icon: require("../../assets/img/icons/user-primary.svg"),
               route: {
                  link: "CustomerUpdateAccountInformation",
               },
            },
         ],
      };
   },
};
</script>
<style></style>
