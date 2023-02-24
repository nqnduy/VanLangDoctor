<template>
   <div class="changePasswordUpdateInformation">
      <DoctorManagement :active="4" isInfo="true" />
      <div class="wrapMain">
         <div class="content">
            <ValidationObserver v-slot="{}">
               <form action="" class="formUpdate" @submit.prevent="updateDPInformation">
                  <div class="informUpdate">
                     <div class="upLoadAvtGroup">
                        <div class="upLoadAvtGroup__img">
                           <img ref="previewImg" :src="imageLink" alt="" v-if="imageLink" />
                           <img ref="previewImg" :src="require('../../assets/img/user/useravatar_header.png')" alt="" v-else />
                        </div>
                            <input prevent ref="input" id="fileUpload" type="file" accept="image/jpg, image/jpeg, image/png" hidden @change="onUpload" />
                        <button class="upLoadAvtGroup__btn" @click.prevent="onFileSelected">Tải ảnh</button>
                     </div>
                     <div class="inputGroup">
                        <div class="text-field">
                           <ValidationProvider name="Họ và tên" rules="required" v-slot="{ errors }">
                              <label for="fullName">Họ và tên *</label>
                              <input
                                 autocomplete="off"
                                 type="text"
                                 id="fullName"
                                 placeholder="Nhập họ và tên của bạn"
                                 v-model="updateFormDP.fullName"
                              />
                              <span>{{ errors[0] }}</span>
                           </ValidationProvider>
                        </div>
                        <div class="text-field">
                           <label for="email">Email</label>
                           <ValidationProvider name="Email" rules="email" v-slot="{ errors }">
                              <input id="email" type="email" placeholder="Nhập email của bạn" v-model="updateFormDP.email" />
                              <span>{{ errors[0] }}</span>
                           </ValidationProvider>
                        </div>

                        <div class="text-field">
                           <ValidationProvider name="phone" :rules="{ regex: /^[0-9]+$/ }" v-slot="{ errors }">
                              <label for="tel">Số điện thoại</label>
                              <input autocomplete="off" type="text" id="tel" placeholder="Nhập số điện thoại của bạn" v-model="updateFormDP.tel" />
                              <span>{{ errors[0] }}</span>
                           </ValidationProvider>
                        </div>
                        <ValidationProvider name="Ngày sinh" rules="" v-slot="{ errors }">
                           <div class="text-field">
                              <label for="dateOfBirth">Ngày sinh</label>
                              <input autocomplete="off" type="date" id="dateOfBirth" v-model="updateFormDP.dateOfBirth" />
                           </div>
                           <span>{{ errors[0] }}</span>
                        </ValidationProvider>
                        <div class="text-field">
                           <label for="specialist">Chuyên khoa</label>
                           <input
                              autocomplete="off"
                              type="text"
                              id="fullName"
                              placeholder="Nhập chuyên môn của bạn"
                              v-model="updateFormDP.specialist"
                           />
                        </div>
                        <div class="text-field">
                           <label for="role">Vai trò</label>
                           <input autocomplete="off" id="role" placeholder="" v-model="updateFormDP.role" disabled />
                        </div>
                        <div class="text-field">
                           <ValidationProvider name="Kinh nghiệm" :rules="{ checkExp: '@Ngày sinh' }" v-slot="{ errors }">
                              <label for="exp">Kinh nghiệm (năm)</label>
                              <input
                                 autocomplete="off"
                                 type="number"
                                 min="0"
                                 id="height"
                                 placeholder="Nhập kinh nghiệm của bạn"
                                 v-model="updateFormDP.exp"
                              />
                              <span>{{ errors[0] }}</span>
                           </ValidationProvider>
                        </div>
                        <div class="text-field">
                           <label for="rating">Đánh giá</label>
                           <input autocomplete="off" id="rating" placeholder="" v-model="updateFormDP.rating" disabled />
                        </div>
                     </div>
                  </div>
                  <VButtonSubmit :option="'white'" title="Cập nhật" style="text-align: center" />
               </form>
            </ValidationObserver>
            <ValidationObserver v-slot="{}" class="formChangePassword">
               <form action="" @submit.prevent="changePassword">
                  <div class="informUpdate">
                     <div class="text-field">
                        <ValidationProvider
                           name="Mật khẩu cũ"
                           :rules="{ required: true }"
                           v-slot="{ errors }"
                        >
                           <label for="oldPassword">Mật khẩu cũ</label>
                           <input autocomplete="off" type="password" id="oldPassword" v-model="changePasswordForm.oldPassword" />
                           <span>{{ errors[0] }}</span>
                        </ValidationProvider>
                     </div>
                     <div class="text-field">
                        <ValidationProvider
                           name="Mật khẩu mới"
                           :rules="{ required: true, min: 6, max: 20, regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/, samePassword: '@Mật khẩu cũ'}"
                           v-slot="{ errors }"
                           :custom-messages="{
                              min: 'Mật khẩu phải có từ 6 đến 20 ký tự, bao gồm chữ thường, chữ in hoa và số.',
                              max: 'Mật khẩu phải có từ 6 đến 20 ký tự, bao gồm chữ thường, chữ in hoa và số.',
                              regex: 'Mật khẩu phải có từ 6 đến 20 ký tự, bao gồm chữ thường, chữ in hoa và số.' }"
                        >
                           <label for="newPassword">Mật khẩu mới</label>
                           <input autocomplete="off" type="password" id="newPassword" v-model="changePasswordForm.newPassword" />
                           <span>{{ errors[0] }}</span>
                        </ValidationProvider>
                     </div>
                     <div class="text-field">
                        <ValidationProvider name="Mật khẩu xác nhận" :rules="{ required: true, confirmed: 'Mật khẩu mới' }" v-slot="{ errors }">
                           <label for="newPasswordConfirm">Xác nhận lại mật khẩu mới</label>
                           <input autocomplete="off" type="password" id="newPasswordConfirm" v-model="changePasswordForm.newPasswordConfirm" />
                           <span>{{ errors[0] }}</span>
                        </ValidationProvider>
                     </div>
                     <VButtonSubmit :option="'white'" title="Đổi mật khẩu" style="text-align: center; margin-top: 30px" />
                  </div>
               </form>
            </ValidationObserver>
         </div>
      </div>
   </div>
</template>
<script>
import DoctorManagement from "./DoctorManagement.vue";
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import { mapGetters, mapActions } from "vuex";
import IMAGE_URL from "../../constants/imageConstantsURL.js";
import moment from "moment";
import pageRoute from "../../constants/pages";
import { extend } from "vee-validate/dist/vee-validate.full.esm"
import { getAge } from "../../constants/helpers.js"

extend("samePassword", {
   params: ["target"],
   validate(value, { target }) {
      return value !== target;
   },
   message: "Mật khẩu mới không được giống với mật khẩu cũ."
});

extend("checkExp", {
   params: ["target"],
   validate(value, { target }) {
      var age = getAge(target);
      return value < age - 19;
   },
   message: "Số năm kinh nghiệm không hợp lệ."
});

export default {
   computed: {
      ...mapGetters(["doctorInformation"]),
   },
   components: {
      DoctorManagement,
      VButtonSubmit,
   },
   data() {
      return {
         updateFormDP: {
            fullName: "",
            email: "",
            tel: "",
            dateOfBirth: "",
            specialist: "",
            role: "",
            exp: "",
            rating: "",
         },
         changePasswordForm: {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
         },
         imageLink: null,
         fileImage: null
      };
   },
   created() {
      this.doctorGetOwnedInformation().then(() => {
         this.setInfo();
      });
   },
   methods: {
      onFileSelected() {
         this.$refs.input.click();
      },
      onUpload() {
         let file = this.$refs.input.files[0];
         this.$refs.previewImg.src = URL.createObjectURL(file);
         this.fileImage = file;
      },
      setInfo() {
         this.updateFormDP.fullName = this.doctorInformation.fullName;
         this.updateFormDP.email = this.doctorInformation.email ?? "";
         this.updateFormDP.tel = this.doctorInformation.phoneNumber;
         this.updateFormDP.dateOfBirth = this.doctorInformation.dateOfBirth === "0001-01-01T00:00:00" ? null : moment(this.doctorInformation.dateOfBirth).format("YYYY-MM-DD");
         this.updateFormDP.specialist = this.doctorInformation.specialist;
         this.updateFormDP.role = this.doctorInformation.role;
         this.updateFormDP.exp = this.doctorInformation.exp === 0 ? null : this.doctorInformation.exp;
         this.updateFormDP.rating = this.doctorInformation.rating;
         this.updateFormDP.profilePicture = this.doctorInformation.profilePicture ?? null;
         if (this.updateFormDP.profilePicture != null) {
            this.imageLink = IMAGE_URL.USER_IMAGE_URL + this.updateFormDP.profilePicture;
            localStorage.setItem("imageLink", this.imageLink);
         }
      },
      updateDPInformation() {
         let formData = new FormData();
         formData.append("FullName", this.updateFormDP.fullName);
         formData.append("Email", this.updateFormDP.email);
         formData.append("PhoneNumber", this.updateFormDP.tel == undefined ? "" : this.updateFormDP.tel);
         if(moment(this.updateFormDP.dateOfBirth, "YYYY-MM-DD", false).isValid()) {
            formData.append("DateOfBirth", new Date(this.updateFormDP.dateOfBirth).toISOString());
         }
         formData.append("Specialist", this.updateFormDP.specialist ?? "");
         formData.append("Role", this.updateFormDP.role);
         formData.append("EXP", this.updateFormDP.exp ?? 0);
         formData.append("ProfilePicture", this.fileImage ?? null);
         this.doctorUpdateInformation(formData)
            .then(() => {
               let updatedAvatar = IMAGE_URL.USER_IMAGE_URL + this.doctorInformation.profilePicture;
               localStorage.setItem("imageLink", updatedAvatar);
               this.incrementCustomerRenderKey();
               this.$swal.fire({
                  icon: "success",
                  title: "Thông tin đã được lưu lại thành công",
               });
            })
            .catch((error) => {
               if (error.status !== 200) {
                  this.$swal.fire({
                     icon: "error",
                     title: "Oops...",
                     text: "Lưu thông tin thất bại",
                  });
               }
            });
      },
      logout () {
         const role = this.doctorInformation.role
         this.doctorLogout().then(() => {
         if(role == 'Doctor' || role === 'Pharmacist') {
            this.$router.push({ path: pageRoute.DOCTOR_PHARMACIST_LOGIN });
         } else {
            this.$router.push({ path: pageRoute.HOME });
         }
            location.reload();
         });
      },
      changePassword() {
         let data = {
            OldPassword: this.changePasswordForm.oldPassword,
            NewPassword: this.changePasswordForm.newPassword,
            ConfirmPassword: this.changePasswordForm.newPasswordConfirm
         };

         this.doctorChangePassword(data)
            .then(() => {
               this.$swal.fire({
                  icon: "success",
                  title: "Đổi mật khẩu thành công, bạn sẽ được đăng xuất",
               }).then(() => {
                  this.logout();
               });
            })
            .catch((error) => {
               if (error.status !== 200) {
                  if(error.response.data === 'Old password is not right'){
                     this.$swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Mật khẩu không đúng",
                     });
                  }else{
                     this.$swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Đổi mật khẩu thất bại, vui lòng thử lại",
                     });
                  }
               }
            });
      },
      ...mapActions(["doctorGetOwnedInformation", "doctorUpdateInformation", "incrementCustomerRenderKey", "doctorChangePassword", "doctorLogout"]),
   },
   watch: {
      doctorInformation() {},
   },
};
</script>
<style></style>
