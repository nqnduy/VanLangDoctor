<template>
  <div class="dropdown">
    <router-link
      :to="{ name: this.customer.role === roles.CUSTOMER ? 'CustomerUpdateAccountInformation' : 'DPUpdateAccountInformation' }"
      href=""
      class="account-info"
    >
      <img ref="previewImg" :src="imageLink" alt="" v-if="imageLink" />
      <img ref="previewImg" :src="require('../assets/img/user/useravatar_header.png')" alt="" v-else />
      <div class="text-wrap">
        <p>{{ this.customer.role === roles.CUSTOMER ? customerSelfInformation.fullName : doctor.fullName }}</p>
        <span>Thông tin tài khoản</span>
      </div>
    </router-link>
    <ul>
      <div v-for="(item,index) in listSubMenu" :key="index">
        <li>
          <router-link
            :to="{ name: item.name }"
            class="dropdown__item"
            >{{ item.slug }}</router-link
          >
        </li>
      </div>
      <li class="logout">
        <a class="dropdown__item" @click="logout">Đăng xuất<i><img :src="require('../assets/img/icons/logout.svg')" alt="" /></i></a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import pageRoute from "../constants/pages";
import IMAGE_URL from "../constants/imageConstantsURL.js";
import Roles from "../constants/roles";

export default {
  computed: {
    ...mapGetters(["customer","customerSelfInformation","customerReRenderKey", "doctor"]),
  },
  data() {
    return {
      imageLink: null,
      listSubMenu: null,
      roles: Roles
    };
  },
  created() {
    if (localStorage.token && !['Admin','Manager'].includes( localStorage.role)) {
      this.customerLogged()
      .then(()=>{
        this.customerGetSelfInformation()
        .then(()=>{
          this.setAvatar()
          this.setMenuDropdown()
        })
      })
    }
  },
  methods: {
    logout: function () {
      const role = this.customer.role
      this.customerLogout().then(() => {
        if(role == 'Doctor' || role === 'Pharmacist'){
          this.$router.push({ path: pageRoute.DOCTOR_PHARMACIST_LOGIN });
        }else {
          this.$router.push({ path: pageRoute.HOME });
        }
        location.reload();
      });
    },
    setAvatar(){
      if (this.customerSelfInformation.profilePicture != null) {
            this.imageLink = IMAGE_URL.USER_IMAGE_URL + this.customerSelfInformation.profilePicture;
            localStorage.setItem('imageLink',this.imageLink)
         }
    },
    setMenuDropdown(){
      if(localStorage.getItem('role') == 'Customer'){
        let customerServiceList = [
          { name: 'CustomerRegisterConsultation' , slug: 'Đăng ký tư vấn'},
          { name:'CustomerAllConsultations' , slug: 'Xem lịch hẹn'},
        ]
        this.listSubMenu = customerServiceList
      }else{
        let doctorService = [
          { name: 'DPCustomerList' , slug: 'Danh sách khách hàng'},
          { name:'DPDashboard' , slug: 'Xem lịch hẹn'},
        ]
        this.listSubMenu = doctorService
      }
    },
    ...mapActions(["customerLogout","customerGetSelfInformation","customerLogged"]),
  },
  watch:{
    customerReRenderKey(){
      this.imageLink = localStorage.getItem('imageLink')
    }
  }
};
</script>
<style></style>
