<template>
   <header class="header">
      <div class="container-fluid">
         <a href="/" class="header__logo">
            <img
               :src="require('../assets/img/Logo.svg')"
               alt="VanLangDoctor
                Logo"
            />
         </a>
         <ul class="header__menu">
            <li class="header__menu-item"><a href="/">Trang chủ</a></li>
            <li class="header__menu-item"><router-link :to="{ name: 'doctorPharmacistInfo' }">Dịch vụ</router-link></li>
            <li class="header__menu-item"><router-link :to="{ name: 'doctorPharmacistInfo' }">Đội ngũ</router-link></li>
            <li class="header__menu-item"><router-link :to="{ name: 'doctorPharmacistInfo' }">Về chúng tôi</router-link></li>
            <router-link :to="{ name: 'blogPage' }" class="header__menu-item">Bài viết</router-link>
         </ul>
         <div class="header__toggleLogin">
            <div class="notiBtn" @click="isShowNotification = !isShowNotification" v-if="isLogin && role === 'Customer'">
               <img :src="require('../assets/img/icons/Notification.svg')" alt="" />
               <div class="noti-badger" v-show="notificationCount">
                  <span>{{ notificationCount }}</span>
               </div>
            </div>
            <div class="header__toggleLogin-yes" @click="isShowDropDown = !isShowDropDown" v-if="isLogin && isDPAtHomePage()">
               <img class="user-avatar" ref="previewImg" :src="imageLink" alt="" v-if="imageLink" />
               <img class="user-avatar" ref="previewImg" :src="require('../assets/img/user/useravatar_header.png')" alt="" v-else />
               <i><img :src="require('../assets/img/icons/dropdown.svg')" alt="" /></i>
            </div>
            <router-link :to="{ name: 'CustomerLogin' }" class="header__toggleLogin-no" v-else-if="!isLogin"> Đăng nhập/Đăng ký </router-link>
         </div>
      </div>
      <TheNotification v-show="isShowNotification" />
      <VDropdown v-show="isShowDropDown" />
   </header>
</template>

<script>
import VDropdown from "../components/VDropdown.vue";
import { mapActions, mapGetters } from "vuex";
import IMAGE_URL from "../constants/imageConstantsURL.js";
import TheNotification from "./TheNotification.vue";
import pageRoute from "../constants/pages.js";

export default {
   computed: {
      ...mapGetters(["customerSelfInformation", "listNotification"]),
   },
   components: {
      VDropdown,
      TheNotification,
   },
   props: ["toggleLogin"],
   data() {
      return {
         imageLink: localStorage.getItem("imageLink"),
         isShowDropDown: false,
         isLogin: false,
         isShowNotification: false,
         role: localStorage.getItem("role"),
         notificationCount: 0,
      };
   },
   created() {
      if (localStorage.token) {
         this.isLogin = true;
         this.customerGetSelfInformation().then(() => {
            this.setAvatar();
         });
      } else {
         this.isLogin = false;
      }
   },
   methods: {
      setAvatar() {
         if (this.customerSelfInformation.profilePicture != null) {
            this.imageLink = IMAGE_URL.USER_IMAGE_URL + this.customerSelfInformation.profilePicture;
            localStorage.setItem("imageLink", this.imageLink);
         }
      },
      isDPAtHomePage: function() {
         return !(this.$route.path === pageRoute.HOME && (this.role === 'Doctor' || this.role === 'Pharmacist'));
      },
      ...mapActions(["customerGetSelfInformation"]),
   },
   watch: {
      listNotification() {
         let count = 0;
         if (this.listNotification instanceof Array) {
            this.listNotification.forEach((element) => {
               if (!element.isRead) {
                  count += 1;
               }
            });
         }
         this.notificationCount = count;
      },
   },
};
</script>

<style></style>
