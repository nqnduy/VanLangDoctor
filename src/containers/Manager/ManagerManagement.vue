<template>
   <div>
      <TheMangementFrame
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
import TheMangementFrame from "../../components/TheManagementFrame.vue";
export default {
   props: ["active", "childTitle", "isChild", "isInfo"],
   components: {
      TheMangementFrame,
   },
   data() {
      return {
         routeInfo: "CustomerUpdateAccountInformation",
         listColumn: [
            {
               title: "Yêu cầu tư vấn",
               icon: require("../../assets/img/icons/requestlist.svg"),
               route: {
                  link: "ManagerConsultationRequestList",
               },
            },
            {
               title: "Thống kê",
               icon: require("../../assets/img/icons/dashboard.svg"),
               route: {
                  link: "ManagerStatistic",
               },
            },
            {
               title: "Thông tin tài khoản",
               icon: require("../../assets/img/icons/user-primary.svg"),
               route: {
                  link: "",
               },
            },
         ],
      };
   },
};
</script>
<style></style>
