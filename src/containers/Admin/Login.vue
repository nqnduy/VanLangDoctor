<template>
   <div class="adLogin">
      <div class="adLogin__background">
         <img :src="require('../../assets/img/background-login-doctor-pharmacist.png')" alt="" />
      </div>
      <div class="adLogin__content">
         <div class="container">
            <div class="form-login">
               <div class="inform">
                  <a href="" class="logo">
                     <img :src="require('../../assets/img/Logo.svg')" alt="VanLangDoctorLogo" />
                     <p class="role">AD</p>
                  </a>
                  <form action="" @submit.prevent="onSubmitLogin">
                     <div class="title-name">
                        <p>
                            Đăng nhập với tài khoản <br> quản trị viên hoặc quản lý
                        </p>
                     </div>
                     <ValidationProvider name="Tên đăng nhập" rules="required" v-slot="{ errors }">
                        <input class="inputUser" id="username" type="text" placeholder="Tên đăng nhập" v-model="loginForm.userName" />
                        <span>{{ errors[0] }}</span>
                     </ValidationProvider>

                     <ValidationProvider name="Mật khẩu" rules="required" v-slot="{ errors }">
                        <input class="input" type="password" required placeholder="Mật khẩu" v-model="loginForm.password" />
                        <span>{{ errors[0] }}</span>
                     </ValidationProvider>
                     <VButtonSubmit title="Đăng nhập" style="text-align: center; margin-top: 40px" />
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import pageMessage from "../../constants/pageMessageAlert";
import pageRoute from "../../constants/pages";
import { mapActions } from "vuex";
export default {
   components: {
      VButtonSubmit,
   },
   data() {
      return {
         loginForm: {
            userName: "",
            password: "",
         },
      };
   },
   methods: {
      onSubmitLogin: function () {
         var data = JSON.stringify(this.loginForm);
         var dataJSON = JSON.parse(data);
         this.adminLogin(dataJSON)
            .then(() => {
               this.setupTimeToDenyToken();
               if(localStorage.getItem('role') === 'Manager'){
                 this.$router.push({ path: pageRoute.MANAGER_REQUEST_LIST });
               } else {
                 this.$router.push({ path: pageRoute.ADMIN_ACCOUNT_LIST });
               }
               location.reload();
            })
            .catch(() => {
               this.$swal.fire({
                  icon: "error",
                  title: "Oops ...",
                  text: pageMessage.LOGIN_FAILED,
               });
            });
      },
      setupTimeToDenyToken: function () {
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
      ...mapActions(["adminLogin"]),
   },
};
</script>
<style></style>
