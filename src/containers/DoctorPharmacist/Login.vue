<template>
   <div class="dpLogin">
      <div class="dpLogin__background">
         <img :src="require('../../assets/img/background-login-doctor-pharmacist.png')" alt="" />
      </div>
      <div class="dpLogin__content">
         <div class="container">
            <div class="title">
               <h1>Chúc bạn một ngày tốt lành!</h1>
            </div>
            <div class="form-login">
               <div class="inform">
                  <a href="" class="logo">
                     <img :src="require('../../assets/img/Logo.svg')" alt="VanLangDoctorLogo" />
                     <p class="role">BS</p>
                  </a>
                  <form action="" @submit.prevent="onSubmitLogin">
                     <div class="title-name">
                        <p>
                           (Đăng nhập với
                           <span class="title-name-warning">tài khoản bác sĩ</span> được cấp)
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
         this.doctorLogin(dataJSON)
            .then(() => {
              this.setupTimeToDenyToken();
              this.$router.push({ path: pageRoute.DOCTOR_LOGIN_SUCCESS });
              location.reload();
            })
            .catch((error) => {
               if(error.response.status == 401) {
                  this.$swal.fire({
                     icon: "error",
                     title: "Oops ...",
                     text:  error.response.data
                  });
               }else{
                  this.$swal.fire({
                     icon: "error",
                     title: "Oops ...",
                     text:  Object.keys(error.response.data.errors).length >= 1 
                        ? `Tên đăng nhập và mật khẩu không đúng` 
                        : error.response.data
                  });
               }
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
      ...mapActions(["doctorLogin",'incrementRenderKey']),
   },
};
</script>
<style></style>
