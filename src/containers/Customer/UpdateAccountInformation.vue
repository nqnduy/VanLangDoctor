<template>
   <div class="updateAccountInformation">
      <CustomerManagement :active="3" isInfo="true" />
      <div class="wrapMain">
         <div class="content">
            <ValidationObserver v-slot="{ handleSubmit }">
               <form action="" class="formUpdate" @submit.prevent="handleSubmit(updateSelfInformation)">
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
                        <div class="columnLeft">
                           <div class="text-field">
                              <ValidationProvider name="Họ và tên" rules="required" v-slot="{ errors }">
                                 <label for="fullName">Họ và tên <span style="color:red">*</span></label>
                                 <input
                                    autocomplete="off"
                                    type="text"
                                    id="fullName"
                                    placeholder="Nhập họ và tên của bạn"
                                    v-model="updateForm.fullName"
                                 />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                           <div class="text-field">
                              <label for="email">Email</label>
                              <input
                                 autocomplete="off"
                                 type="email"
                                 id="email"
                                 placeholder="Nhập email của bạn"
                                 v-model="updateForm.email"
                                 disabled
                              />
                           </div>
                           <div class="text-field">
                              <ValidationProvider name="phone" :rules="{ regex: /^[0-9]+$/ }" v-slot="{ errors }">
                                 <label for="phone">Số điện thoại</label>
                                 <input
                                    autocomplete="off"
                                    type="text"
                                    id="phoneNumber"
                                    placeholder="Nhập số điện thoại của bạn"
                                    v-model="updateForm.phoneNumber"
                                 />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                        </div>
                        <div class="columnRight">
                           <div class="text-field">
                              <ValidationProvider name="Ngày sinh" rules="required" v-slot="{ errors }">
                                 <label for="dateOfBirth">Ngày sinh <span style="color: 'red'">*</span></label>
                                 <input autocomplete="off" type="date" id="dateOfBirth" v-model="updateForm.dateOfBirth" />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                           <div class="text-field">
                              <label for="gender">Giới tính <span style="color: 'red'">*</span></label>
                              <select v-model="updateForm.gender" class="decorated">
                                 <option :value="false" style="background-color: #d0eff2">Nam</option>
                                 <option :value="true" style="background-color: #d0eff2">Nữ</option>
                              </select>
                           </div>
                           <div class="text-field">
                              <ValidationProvider name="Cân nặng" rules="" v-slot="{ errors }">
                                 <label for="weight">Cân nặng (kg)</label>
                                 <input
                                    autocomplete="off"
                                    type="number"
                                    max="500"
                                    min="1"
                                    id="weight"
                                    placeholder="Nhập cân nặng của bạn"
                                    v-model="updateForm.weight"
                                 />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                           <div class="text-field">
                              <ValidationProvider name="Chiều cao" rules="" v-slot="{ errors }">
                                 <label for="height">Chiều cao (cm)</label>
                                 <input
                                    autocomplete="off"
                                    type="number"
                                    max="250"
                                    min="10"
                                    id="height"
                                    placeholder="Nhập chiều cao của bạn"
                                    v-model="updateForm.height"
                                 />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                        </div>
                     </div>
                  </div>
                  <VButtonSubmit :option="'white'" title="Cập nhật" style="text-align: center" />
               </form>
            </ValidationObserver>
         </div>
      </div>
   </div>
</template>
<script>
import CustomerManagement from "./CustomerManagement.vue";
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import { mapGetters, mapActions } from "vuex";
import IMAGE_URL from "../../constants/imageConstantsURL.js";
import moment from "moment";
export default {
   computed: {
      ...mapGetters(["customerSelfInformation"]),
   },
   components: {
      CustomerManagement,
      VButtonSubmit,
   },
   data() {
      return {
         updateForm: {
            fullName: "",
            email: "",
            dateOfBirth: "",
            weight: "",
            height: "",
            gender: true,
            phoneNumber: "",
         },
         imageLink: null,
         fileImage: null,
      };
   },
   created() {
      this.customerGetSelfInformation().then(() => {
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
         this.updateForm.fullName = this.customerSelfInformation.fullName;
         this.updateForm.email = this.customerSelfInformation.email;
         this.updateForm.dateOfBirth = this.customerSelfInformation.dateOfBirth === "0001-01-01T00:00:00" 
                                          ? null 
                                          : moment(this.customerSelfInformation.dateOfBirth).format("YYYY-MM-DD");
         this.updateForm.gender = this.customerSelfInformation.gender;
         this.updateForm.height = this.customerSelfInformation.height === 0 ? "" : this.customerSelfInformation.height;
         this.updateForm.weight = this.customerSelfInformation.weight === 0 ? "" : this.customerSelfInformation.weight;
         this.updateForm.profilePicture = this.customerSelfInformation.profilePicture ?? null;
         this.updateForm.gender = this.customerSelfInformation.gender;
         this.updateForm.phoneNumber = this.customerSelfInformation.phoneNumber;
         if (this.updateForm.profilePicture != null) {
            this.imageLink = IMAGE_URL.USER_IMAGE_URL + this.updateForm.profilePicture;
            localStorage.setItem("imageLink", this.imageLink);
         }
      },
      updateSelfInformation() {
         let formData = new FormData();
         formData.append("FullName", this.updateForm.fullName);
         if(moment(this.updateForm.dateOfBirth, "YYYY-MM-DD", false).isValid()) {
            formData.append("DateOfBirth", new Date(this.updateForm.dateOfBirth).toISOString());
         }
         formData.append("Gender", this.updateForm.gender);
         formData.append("Height", this.updateForm.height == "" ? 0 : this.updateForm.height);
         formData.append("Weight", this.updateForm.weight == "" ? 0 : this.updateForm.weight);
         formData.append("PhoneNumber", this.updateForm.phoneNumber == undefined ? "" : this.updateForm.phoneNumber);
         formData.append("ProfilePicture", this.fileImage ?? null);
         this.customerUpdateSelfInformation(formData)
            .then(() => {
               let updatedAvatar = IMAGE_URL.USER_IMAGE_URL + this.customerSelfInformation.profilePicture;
               localStorage.setItem("imageLink", updatedAvatar);
               this.incrementCustomerRenderKey();
               this.$swal.fire({
                  icon: "success",
                  title: "Thông tin đã được lưu lại thành công",
               });
            })
            .catch((error) => {
               if (200 < error.response.status < 500) {
                  this.$swal.fire({
                     icon: "error",
                     title: "Oops...",
                     text: "Lưu thông tin thất bại",
                  });
               }
            });
      },
      ...mapActions(["customerGetSelfInformation", "customerUpdateSelfInformation", "incrementCustomerRenderKey"]),
   },
   watch: {
      customerSelfInformation() {},
   },
};
</script>
<style></style>
