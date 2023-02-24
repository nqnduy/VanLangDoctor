<template>
  <div class="adminCreateAccount">
    <AdminManagement :active="0" isChild="yes" childTitle="Tạo tài khoản" />
    <div class="wrapMain">
      <div class="content">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            action=""
            class="formUpdate"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <div class="informUpdate info-update-new-style">
              <div class="upLoadAvtGroup">
                <div class="upLoadAvtGroup__img">
                  <img ref="previewImg" alt="" v-if="imageLink" />
                  <img
                    ref="previewImg"
                    :src="
                      require('../../assets/img/user/useravatar_header.png')
                    "
                    alt=""
                    v-else
                  />
                </div>
                <input
                  prevent
                  ref="input"
                  id="fileUpload"
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  hidden
                  @change="onUpload"
                />
                <button
                  class="upLoadAvtGroup__btn"
                  @click.prevent="onFileSelected"
                >
                  Tải ảnh
                </button>
              </div>
              <div class="col-right">
                <div class="inputGroup">
                  <div>
                    <div class="text-field">
                      <ValidationProvider
                        name="Họ và tên"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <label for="fullName"
                          >Họ và tên
                          <p class="require">*</p></label
                        >
                        <input
                          autocomplete="off"
                          type="text"
                          id="fullName"
                          placeholder="Nhập họ và tên"
                          v-model="createAccountDP.fullName"
                        />
                        <span>{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="text-field">
                      <ValidationProvider
                        name="Ngày sinh"
                        rules="checkAge:20|required"
                        v-slot="{ errors }"
                      >
                        <label for="dateOfBirth"
                          >Ngày sinh
                          <p class="require">*</p></label
                        >
                        <input
                          autocomplete="off"
                          type="date"
                          id="dateOfBirth"
                          v-model="createAccountDP.dateOfBirth"
                        />
                        <span>{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="text-field">
                      <ValidationProvider
                        name="Vai trò"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <label for="role"
                          >Vai trò
                          <p class="require">*</p></label
                        >
                        <select
                          v-model="createAccountDP.role"
                          class="decorated"
                        >
                          <option
                            style="background-color: #d0eff2"
                            value="Doctor"
                          >
                            Bác sĩ
                          </option>
                          <option
                            style="background-color: #d0eff2"
                            value="Pharmacist"
                          >
                            Dược sĩ
                          </option>
                        </select>
                        <span>{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div>
                    <div class="text-field">
                      <ValidationProvider
                        name="Chuyên khoa"
                        rules=""
                        v-slot="{ errors }"
                      >
                        <label for="specialist">Chuyên khoa</label>
                        <input
                          autocomplete="off"
                          type="text"
                          placeholder="Nhập chuyên môn"
                          v-model="createAccountDP.specialist"
                        />
                        <span>{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="text-field">
                      <ValidationProvider
                        name="Email"
                        rules="email"
                        v-slot="{ errors }"
                      >
                        <label for="email">Email</label>
                        <input
                          autocomplete="off"
                          id="email"
                          type="email"
                          placeholder="Nhập email"
                          v-model="createAccountDP.email"
                        />
                        <span>{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="text-field">
                      <ValidationProvider
                        name="Số điện thoại"
                        rule="required"
                        rules="phoneNumber"
                        v-slot="{ errors }"
                      >
                        <label for="tel">Số điện thoại</label>
                        <input
                          autocomplete="off"
                          type="text"
                          id="tel"
                          placeholder="Nhập số điện thoại"
                          v-model="createAccountDP.tel"
                        />
                        <span>{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="text-field zoom-zone-fields">
                    <ValidationProvider
                      name="Email Zoom"
                      rule="required"
                      rules="email|required"
                      v-slot="{ errors }"
                    >
                      <label for="tel"
                        >Tài khoản liên kết Zoom
                        <p class="require">*</p></label
                      >
                      <input
                        autocomplete="off"
                        type="text"
                        id="tel"
                        placeholder="Nhập email tài khoản Zoom"
                        v-model="createAccountDP.emailZoom"
                        class="zoom-field"
                      />
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Zoom API Key"
                      rule="required"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <input
                        autocomplete="off"
                        type="password"
                        id="tel"
                        placeholder="Nhập Zoom API Key"
                        v-model="createAccountDP.APIKeyZoom"
                        class="zoom-field"
                      />
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Zoom API Secret"
                      rule="required"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <input
                        autocomplete="off"
                        type="password"
                        id="tel"
                        placeholder="Nhập Zoom API Secret Key"
                        v-model="createAccountDP.APISecretZoom"
                        class="zoom-field"
                      />
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <VButtonSubmit
                :disabled="isDisableBtn"
                :option="'white'"
                title="Tạo tài khoản"
                style="text-align: center"
              />
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import AdminManagement from "./AdminManagement.vue";
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import { extend } from "vee-validate/dist/vee-validate.full.esm";
import { getAge } from "../../constants/helpers.js";
import { mapActions } from "vuex";
import moment from "moment";

extend("checkAge", {
  params: ["age"],
  validate: (value, { age }) => {
    return getAge(value) >= age;
  },
  message: "Tài khoản phải từ {age} tuổi trở lên",
});

extend("phoneNumber", {
  validate: (value) => {
    return /^[0-9]+$/.test(value);
  },
  message: "Số điện thoại không hợp lệ",
});

export default {
  components: {
    AdminManagement,
    VButtonSubmit,
  },
  data() {
    return {
      isDisableBtn: false,
      createAccountDP: {
        fullName: "",
        email: "",
        tel: "",
        dateOfBirth: "",
        specialist: "",
        role: "",
        emailZoom: "",
        APIKeyZoom: "",
        APISecretZoom: "",
      },
      fileImage: null,
      imageLink: "",
    };
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
    onSubmit() {
      this.isDisableBtn = true;
      const newAccount = {
        FullName: this.createAccountDP.fullName,
        DateOfBirth: moment(this.createAccountDP.dateOfBirth).format(
          "MM/DD/YYYY"
        ),
        Role: this.createAccountDP.role,
        Specialist: this.createAccountDP.specialist,
        PhoneNumber: this.createAccountDP.tel,
        APIKey: this.createAccountDP.APIKeyZoom,
        APISecret: this.createAccountDP.APISecretZoom,
        ZoomAccount: this.createAccountDP.emailZoom,
        Email: this.createAccountDP.email,
        ProfilePicture: this.fileImage,
      };
      this.adminCreateNewDPAccount(newAccount).then(() => {
        this.$swal.fire({
          icon: "success",
          title: "Tạo tài khoản thành công",
        });
        for (const key of Object.keys(this.createAccountDP)) {
          this.createAccountDP[key] = "";
        }
        this.isDisableBtn = false;
        this.$router.push({ path: "/admin/accountmanagement" });
      });
    },
    ...mapActions(["adminCreateNewDPAccount"]),
  },
};
</script>
<style>
.zoom-zone-fields {
  border: 1px solid #50c4cf;
  padding: 1rem;
  border-radius: 4px;
}
.zoom-zone-fields .zoom-field {
  margin: 0.5rem 0;
}
</style>
