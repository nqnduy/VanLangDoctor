<template>
   <div>
      <TheHeader />
      <div class="login">
         <div class="AccessForm">
            <div class="inform">
               <img
                  :src="require('../../assets/img/Logo.svg')"
                  alt="VanLangDoctor
                Logo"
               />
               <p>
                  Bạn chưa có tài khoản
                  <router-link :to="{ name: 'CustomerRegister' }">Đăng ký</router-link>
               </p>
               <ValidationObserver v-slot="{ handleSubmit }">
                  <form action="" @submit.prevent="handleSubmit(onSubmitLogin)">
                     <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                        <input class="inputUser" id="email" type="email" placeholder="Email" v-model="loginForm.email" />
                        <span class="errors">{{ errors[0] }}</span>
                     </ValidationProvider>
                     <ValidationProvider name="Mật khẩu" rules="required" v-slot="{ errors }">
                        <input class="inputUser" id="password" type="password" placeholder="Mật khẩu" v-model="loginForm.password" />
                        <span class="errors">{{ errors[0] }}</span>
                     </ValidationProvider>
                     <VButtonSubmit style="text-align: center; margin-top: 40px" title="Đăng nhập" />
                  </form>
               </ValidationObserver>
            </div>
         </div>
         <VBanner />
      </div>
   </div>
</template>
<script>
import TheHeader from "../../components/TheHeader.vue";
import VBanner from "../../components/VBanner.vue";
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import pageRoute from "../../constants/pages";
import pageMessage from "../../constants/pageMessageAlert";
import { mapActions, mapGetters } from "vuex";
export default {
   computed: {
      ...mapGetters(["isLogged"]),
   },
   components: {
      TheHeader,
      VBanner,
      VButtonSubmit,
   },
   data() {
      return {
         loginForm: {
            email: "",
            password: "",
         },
      };
   },
   methods: {
      onSubmitLogin: function () {
         var data = JSON.stringify(this.loginForm);
         var dataJson = JSON.parse(data);
         this.customerLogin(dataJson)
            .then(() => {
               this.setupTimerToDenyToken();
               location.reload();
               this.$router.push({ path: pageRoute.HOME });
            })
            .catch((error) => {
               if (error) {
                  this.$swal.fire({
                     icon: "error",
                     title: "Oops...",
                     text: pageMessage.LOGIN_FAILED,
                  });
               }
            });
      },
      setupTimerToDenyToken: function () {
         var hours = pageRoute.DEFAULT_TIMES_DELETE_TOKEN;
         let now = new Date().getTime();
         let setupTime = localStorage.getItem("setupTime");
         if (setupTime == null) {
            localStorage.setItem("setupTime", now);
         } else {
            if (now - setupTime > hours * 60 * 60 * 1000) {
               localStorage.removeItem("setupTime");
               localStorage.setItem("setupTime", now);
            }
         }
      },
      ...mapActions(["customerLogin"]),
   },
};
</script>
<style lang="scss">
.AccessForm {
   margin-left: 120px;
   padding-left: 15px;
   width: 50%;
}
</style>
