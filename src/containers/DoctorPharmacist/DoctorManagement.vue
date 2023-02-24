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
import { mapActions} from "vuex"
export default {
   components: {
      TheManagementFrame,
   },
   props: ["active", "childTitle", "isChild", "isInfo"],
   data() {
      return {
         imageLink: localStorage.getItem("imageLink"),
         routeInfo: "DPUpdateAccountInformation",
         listColumn: [
            {
               title: "Tổng quan",
               icon: require("../../assets/img/icons/dashboard.svg"),
               route: {
                  link: "DPDashboard",
               },
            },
            {
               title: "Khách hàng",
               icon: require("../../assets/img/icons/users.svg"),
               route: {
                  link: "DPCustomerList",
               },
            },
            {
               title: "Doanh thu",
               icon: require("../../assets/img/icons/revenue.svg"),
               route: {
                  link: "DPCustomerList",
               },
            },
            {
               title: "Hỗ trợ",
               icon: require("../../assets/img/icons/support.svg"),
               route: {
                  link: "DPSupport",
               },
            },
            {
               title: "Thông tin tài khoản",
               icon: require("../../assets/img/icons/user-primary.svg"),
               route: {
                  link: "DPSupport",
               },
            },
         ],
      };
   },
   created() {
     
  },
  methods:{
     ...mapActions(['doctorLogout'])
  }
};
</script>
<style></style>
