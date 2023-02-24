<template>
  <div class="adminUpdateAccount">
    <AdminManagement
      :active="0"
      isChild="yes"
      childTitle="Cập nhật tài khoản"
    />
    <div class="wrapMain">
      <div class="content">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            action=""
            class="formUpdate"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <div class="informUpdate">
              <div class="upLoadAvtGroup">
                <div class="upLoadAvtGroup__img">
                  <img
                    :src="
                      getUserImageLink(getAdminDPAccountDetail.profilePicture)
                    "
                    alt="profilePicture"
                    @error="replaceByDefaultUser"
                    ref="previewImg"
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
              <div class="inputGroup">
                <div>
                  <div class="text-field">
                    <label for="userName">Tên đăng nhập</label>
                    <input
                      autocomplete="off"
                      type="text"
                      id="userName"
                      placeholder=""
                      v-model="updateAccountDP.userName"
                      disabled="disable"
                    />
                  </div>
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
                        v-model="updateAccountDP.fullName"
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
                        v-model="updateAccountDP.dateOfBirth"
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
                      <select v-model="updateAccountDP.role" class="decorated">
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
                  <div class="text-field">
                      <label for="specialist"
                        >Chuyên khoa
                      </label
                      >
                      <input
                        autocomplete="off"
                        type="text"
                        placeholder="Nhập chuyên môn"
                        v-model="updateAccountDP.specialist"
                      />
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
                        v-model="updateAccountDP.email"
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
                      <label for="tel"
                        >Số điện thoại
                      </label
                      >
                      <input
                        autocomplete="off"
                        type="text"
                        id="tel"
                        placeholder="Nhập số điện thoại"
                        v-model="updateAccountDP.tel"
                      />
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
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
                        v-model="updateAccountDP.emailZoom"
                        class="zoom-field"
                      />
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Zoom API Key"
                      rule=""
                      rules=""
                      v-slot="{ errors }"
                    >
                      <input
                        autocomplete="off"
                        type="password"
                        id="tel"
                        placeholder="Nhập Zoom API Key"
                        v-model="updateAccountDP.APIKeyZoom"
                        class="zoom-field"
                      />
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Zoom API Secret"
                      rule=""
                      rules=""
                      v-slot="{ errors }"
                    >
                      <input
                        autocomplete="off"
                        type="password"
                        id="tel"
                        placeholder="Nhập Zoom API Secret Key"
                        v-model="updateAccountDP.APISecretZoom"
                        class="zoom-field"
                      />
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <p class="warningAPI"> <img :src="require('../../assets/img/icons/warning-primary.svg')" alt="">
                    API Key và API secret sẽ chỉ cập nhật nếu bạn nhập giá trị mới vào 2 trường trên. Nếu để trống, dữ liệu sẽ được giữ nguyên.
                  </p>
                </div>
              </div>
              <VButtonSubmit
                :disabled="isDisableBtn"
                :option="'white'"
                title="Lưu thay đổi"
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
import { getUserImageLink, replaceByDefaultUser } from "../../utils/helper";
import { mapActions, mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["getAdminDPAccountDetail"]),
  },
  data() {
    return {
      isDisableBtn: false,
      updateAccountDP: {
        userName: "",
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
    };
  },
  created() {
    this.adminGetDPAccountDetails(this.$route.params.id).then(() => {
      this.setDetailInfo();
    });
  },
  methods: {
    getUserImageLink: getUserImageLink,
    replaceByDefaultUser: replaceByDefaultUser,
    onFileSelected() {
      this.$refs.input.click();
    },
    onUpload() {
      let file = this.$refs.input.files[0];
      this.$refs.previewImg.src = URL.createObjectURL(file);
      this.fileImage = file;
    },
    setDetailInfo() {
      this.updateAccountDP = {
        userName: this.getAdminDPAccountDetail.userName,
        fullName: this.getAdminDPAccountDetail.fullName,
        email: this.getAdminDPAccountDetail.email,
        tel: this.getAdminDPAccountDetail.phoneNumber,
        dateOfBirth: this.getAdminDPAccountDetail.dateOfBirth === "0001-01-01T00:00:00" 
                      ? null : moment(this.getAdminDPAccountDetail.dateOfBirth).format("YYYY-MM-DD"),                                          
        specialist: this.getAdminDPAccountDetail.specialist,
        role: this.getAdminDPAccountDetail.role,
        emailZoom: this.getAdminDPAccountDetail.zoomAccount
      };
    },
    onSubmit() {
      this.isDisableBtn = true;
      const newAccount = {
        id: this.$route.params.id,
        FullName: this.updateAccountDP.fullName,
        DateOfBirth: moment(this.updateAccountDP.dateOfBirth).format(
          "MM/DD/YYYY"
        ),
        Role: this.updateAccountDP.role,
        Specialist: this.updateAccountDP.specialist,
        PhoneNumber: this.updateAccountDP.tel,
        APIKey: this.updateAccountDP.APIKeyZoom ?? this.getAdminDPAccountDetail.apiKey,
        APISecret: this.updateAccountDP.APISecretZoom ?? this.getAdminDPAccountDetail.apiSecret,
        ZoomAccount: this.updateAccountDP.emailZoom,
        Email: this.updateAccountDP.email,
        ProfilePicture: this.fileImage,
      };
      this.adminUpdateNewDPAccount(newAccount).then(() => {
        this.$swal.fire({
          icon: "success",
          title: "Cập nhật tài khoản thành công",
        });
        this.updateAccountDP.APIKeyZoom = null;
        this.updateAccountDP.APISecretZoom = null;
        this.isDisableBtn = false;
      });
    },
    ...mapActions(["adminUpdateNewDPAccount", "adminGetDPAccountDetails"]),
  },
};
</script>
<style lang="scss">
.zoom-zone-fields {
  border: 1px solid #50c4cf;
  padding: 1rem;
  border-radius: 4px;
}
.zoom-zone-fields .zoom-field {
  margin: 0.5rem 0;
}
</style>
