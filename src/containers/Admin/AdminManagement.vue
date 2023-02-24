<template>
   <div>
      <TheManagementFrame
         :listColumn="listColumn"
         :active="active"
         :childTitle="childTitle"
         :isChild="isChild"
         :isInfo="isInfo"
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
         listColumn: [
            {
               title: "Quản lý tài khoản",
               icon: require("../../assets/img/icons/users.svg"),
               route: {
                  link: "AdminAccountManagement",
               },
            },
            {
               title: "Quản lý danh mục thuốc",
               icon: require("../../assets/img/icons/medicine-category.svg"),
               route: {
                  link: "AdminMedicineCategory",
               },
            },
            {
               title: "Quản lý thuốc",
               icon: require("../../assets/img/icons/medicine-management.svg"),
               route: {
                  link: "AdminMedicineList",
               },
            },
            {
               title: "Tài khoản",
               icon: require("../../assets/img/icons/users.svg"),
               route: {
                  link: "CustomerRegisterConsultation",
               },
            },
         ],
      };
   },
};
</script>
<style></style>
