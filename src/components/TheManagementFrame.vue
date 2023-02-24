<template>
   <div class="ManagementFrame">
      <div class="columnTab">
         <router-link :to="{ name: 'home' }" v-if="role == 'Customer'">
            <img
               :src="require('../assets/img/Logo.svg')"
               alt="VanLangDoctor
                    Logo"
               class="columnTab__logo"
            />
         </router-link>
         <router-link :to="{ name: 'DPDashboard' }" v-else-if="role == 'Doctor' || role === 'Pharmacist'">
            <img
               :src="require('../assets/img/Logo.svg')"
               alt="VanLangDoctor
                    Logo"
               class="columnTab__logo"
            />
         </router-link>
         <div v-else>
            <img
               :src="require('../assets/img/Logo.svg')"
               alt="VanLangDoctor
                    Logo"
               class="columnTab__logo"
            />
         </div>
         <ul class="columnTab__list">
            <li v-for="(item, index) in listColumn" :key="index" @click="active">
               <router-link :to="{ name: item.route.link }" class="columnTab__list-item" :class="{ active: index == active }">
                  <i
                     ><img
                        :src="item.icon"
                        alt="VanLangDoctor
				Logo" /></i
                  >{{ item.title }}
               </router-link>
            </li>
         </ul>
         <router-link :to="{ name: routeInfo }" class="columnTab__accountInfo" v-if="role === 'Admin' || role === 'Manager'" v-show="false">
            <img ref="previewImg" :src="imageLink" alt="" v-if="imageLink" />
            <img ref="previewImg" :src="require('../assets/img/user/useravatar_header.png')" alt="" v-else />
            Thông tin tài khoản</router-link
         >
         <router-link
            :to="{ name: routeInfo }"
            class="columnTab__accountInfo active"
            v-else-if="(role === 'Doctor' || role === 'Customer') && info == 'true'"
         >
            <img ref="previewImg" :src="imageLink" alt="" v-if="imageLink" />
            <img ref="previewImg" :src="require('../assets/img/user/useravatar_header.png')" alt="" v-else />
            Thông tin tài khoản</router-link
         >
         <router-link :to="{ name: routeInfo }" class="columnTab__accountInfo" v-else>
            <img ref="previewImg" :src="imageLink" alt="" v-if="imageLink" />
            <img ref="previewImg" :src="require('../assets/img/user/useravatar_header.png')" alt="" v-else />
            Thông tin tài khoản</router-link
         >
      </div>
      <div class="contentManagement">
         <div class="contentManagement__header">
            <div class="contentManagement__header-left">
               <img :src="listColumn[active].icon" alt="" />
               <h2 v-if="child == 'yes'">{{ childTitle }}</h2>
               <h2 v-else>{{ listColumn[active].title }}</h2>
            </div>
            <div class="contentManagement__header-right">
               <!-- Manager/Admin header logout -->
               <div class="notiBtn" @click="isShowNotification = !isShowNotification" v-if="role === 'Doctor' || role === 'Pharmacist'">
                  <img :src="require('../assets/img/icons/Notification.svg')" alt="" />
                  <div class="noti-badger" v-show="notificationCount">
                     <span>{{ notificationCount }}</span>
                  </div>
               </div>
               <div class="contentManagement__header-right--AM" v-if="role === 'Admin' || role === 'Manager'">
                  <div class="textWrap">
                     <div class="icon"><img :src="require('../assets/img/icons/manager.svg')" alt="" /></div>
                     <p class="name">{{ admin.userName }}</p>
                  </div>
                  <a class="logout-btn" @click="logout">
                     <div class="logout-btn__icon"><img :src="require('../assets/img/icons/logout.svg')" alt="" /></div>
                  </a>
               </div>
               <!-- Close Manager/Admin header logout -->
               <div class="notiBtn" @click="isShowNotification = !isShowNotification" v-if="role === 'Customer'">
                  <img :src="require('../assets/img/icons/Notification.svg')" alt="" />
                  <div class="noti-badger" v-show="notificationCount">
                     <span>{{ notificationCount }}</span>
                  </div>
               </div>
               <div class="contentManagement__header-right yes" @click="isShowDropDown = !isShowDropDown" v-if="role !== 'Admin' && role !== 'Manager'">
                  <img class="user-avatar" ref="previewImg" :src="imageLink" alt="" v-if="imageLink" />
                  <img class="user-avatar" ref="previewImg" :src="require('../assets/img/user/useravatar_header.png')" alt="" v-else />
                  <i><img :src="require('../assets/img/icons/dropdown.svg')" alt="" /></i>
               </div>
            </div>
         </div>
      </div>
      <TheNotification v-show="isShowNotification" />
      <VDropdown v-show="isShowDropDown" />
   </div>
</template>
<script>
import VDropdown from "../components/VDropdown.vue";
import { mapActions, mapGetters } from "vuex";
import TheNotification from "../components/TheNotification";
import pageRoute from "../constants/pages";

export default {
   computed: {
      ...mapGetters([
         "customerSelfInformation",
         "customerReRenderKey",
         "listNotification",
         "admin",
      ]),
   },
   components: {
      VDropdown,
      TheNotification,
   },
   props: ["listColumn", "active", "childTitle", "isChild", "isInfo", "routeInfo"],
   data() {
      return {
         isShowDropDown: false,
         isShowNotification: false,
         isActive: true,
         child: this.isChild,
         info: this.isInfo,
         imageLink: localStorage.getItem("imageLink"),
         role: localStorage.getItem("role"),
         notificationCount: 0,
      };
   },
   mounted() {
      if (!this.imageLink) {
         setTimeout(() => {
            this.imageLink = localStorage.getItem("imageLink");
         }, 500);
      }
      this.adminLogged();
   },
   watch: {
      customerReRenderKey() {
         this.imageLink = localStorage.getItem("imageLink");
      },
      imageLink() {},
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
   methods: {
      logout: function () {
         this.adminLogout().then(() => {
            this.$router.push({ path: pageRoute.ADMIN_MANAGER_LOGIN });
            location.reload();
         });
      },
      ...mapActions(["adminLogout", "adminLogged"]),
   },
};
</script>
<style></style>
