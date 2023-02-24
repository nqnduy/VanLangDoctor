<template>
   <div>
      <TheHeader />
      <div class="register">
         <div class="AccessForm">
            <div class="inform">
               <img
                  :src="require('../../assets/img/Logo.svg')"
                  alt="VanLangDoctor
                Logo"
               />
               <p>
                  Bạn đã có tài khoản
                  <router-link :to="{ name: 'CustomerLogin' }" class="login-link">Đăng nhập</router-link>
               </p>
               <ValidationObserver v-slot="{ handleSubmit }">
                  <form action="" @submit.prevent="handleSubmit(onSubmit)">
                     <!-- input-name -->
                     <ValidationProvider name="Họ và tên" rules="required" v-slot="{ errors }">
                        <input class="inputUser" id="fullName" type="name" placeholder="Họ và tên" v-model="formData.fullName" />
                        <span class="errors">{{ errors[0] }}</span>
                     </ValidationProvider>

                     <!-- input email -->
                     <div class="emailConfirm">
                        <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                           <input class="inputUser" id="email" type="email" placeholder="Email" v-model="formData.email" />
                           <span class="errors">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <button class="btn-submitForm blue" @click.prevent="sendVerifyEmail">Gửi mã</button>
                     </div>

                     <!-- input verification -->
                     <ValidationProvider name="Mã xác nhận" rules="required" v-slot="{ errors }">
                        <input class="inputUser" id="activationCode" type="text" placeholder="Mã xác nhận" v-model="formData.activationCode" />
                        <span class="errors">{{ errors[0] }}</span>
                     </ValidationProvider>

                     <!-- input password -->
                     <ValidationProvider
                        name="Mật khẩu"
                        :rules="{ required: true, min: 6, max: 20, regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/ }"
                        v-slot="{ errors }"
                     >
                        <input class="inputUser" id="password" type="password" placeholder="Mật khẩu" v-model="formData.password" />
                        <span class="errors">{{ errors[0] }}</span>
                     </ValidationProvider>

                     <!-- confirm password -->
                     <ValidationProvider name="Xác nhận mật khẩu" rules="required|confirmed:Mật khẩu" v-slot="{ errors }">
                        <input
                           class="inputUser"
                           id="confirmPassword"
                           type="password"
                           placeholder="Xác nhận mật khẩu"
                           v-model="formData.confirmPassword"
                        />
                        <span class="errors">{{ errors[0] }}</span>
                     </ValidationProvider>

                     <p class="warningPT">
                        Với việc đăng ký, bạn đã đồng ý
                        <b>Chính sách</b> & <b>Điều khoản</b> của chúng tôi
                     </p>
                     <VButtonSubmit title="Đăng ký" style="text-align: center; margin-top: 40px" />
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
import { mapActions } from "vuex";
import pageRoute from "../../constants/pages";
import pageMessage from "../../constants/pageMessageAlert";

export default {
   components: {
      TheHeader,
      VBanner,
      VButtonSubmit,
   },
   data() {
      return {
         formData: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            activationCode: "",
         },
      };
   },
   methods: {
      sendVerifyEmail() {
         if(this.formData.email !== "") {
            if (String(this.formData.email)
               .toLowerCase()
               .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
               this.sendEmailVerify(this.formData.email)
               .then(() => {
                  this.$swal.fire({
                     icon: "success",
                     title: "Mã xác nhận đã được gửi đến email của bạn",
                  });
               })
               .catch((error) => {
                  this.$swal.fire({
                     icon: "error",
                     title: "Oops ...",
                     text: error.response.data,
                  });
               });
            }
         }
      },
      onSubmit() {
         var data = JSON.stringify(this.formData);
         var dataJson = JSON.parse(data);
         this.customerRegister(dataJson)
            .then(() => {
               let login = {
                  email: this.formData.email,
                  password: this.formData.password,
               };
               this.customerLogin(login).then(() => {
                  this.setupTimerToDenyToken();
                  location.reload();
                  this.$router.push({ path: pageRoute.HOME });
                  this.$swal.fire({
                     icon: "success",
                     title: pageMessage.REGISTER_SUCCESS,
                  });
               });
            })
            .catch((error) => {
               if (200 < error.response.status < 500) {
                  if (error.response.status === 400) {
                     this.$swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data,
                     });
                  } else {
                     this.$swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: pageMessage.REGISTER_FAILED,
                     });
                  }
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
      errorClass(rule) {
         return {
            error: this.errors.firstByRule("mật khẩu", rule),
         };
      },
      ...mapActions(["customerRegister", "customerLogin", "sendEmailVerify"]),
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
