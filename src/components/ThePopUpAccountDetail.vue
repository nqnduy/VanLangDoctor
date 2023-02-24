<template>
    <div class="popupAccountDetail">
        <div class="bg-black"></div>
        <div class="popupAccountDetail__content">
            <div class="btn-close" @click="closedPopup">
                <img :src="require('../assets/img/icons/close.svg')" alt="" />
            </div>
            <div class="avt">
                <img :src="getUserImage(getAdminDPAccountDetail.profilePicture)" alt="" @error="replaceByDefaultUser">
            </div>
            <div class="fullName">
                <strong>{{ getAdminDPAccountDetail.fullName }}</strong>
            </div>
            <div class="popupAccountDetail__content-informationList">
                 <div class="informationItem">
                    <p class="informationItem-label">Tên đăng nhập</p>
                    <p class="informationItem-value" v-if="true">{{ getAdminDPAccountDetail.userName }}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Ngày sinh</p>
                    <p class="informationItem-value">{{ this.convertDateOfBirth(getAdminDPAccountDetail.dateOfBirth) }}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Giới tính</p>
                    <p class="informationItem-value">{{ this.getGender(getAdminDPAccountDetail.gender) }}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Vai trò</p>
                    <p class="informationItem-value">{{ this.getRole(getAdminDPAccountDetail.role) }}</p>
                </div>
                   <div class="informationItem">
                    <p class="informationItem-label">Số điện thoại</p>
                    <p class="informationItem-value">{{ getAdminDPAccountDetail.phoneNumber }}</p>
                </div>
                   <div class="informationItem">
                    <p class="informationItem-label">Email</p>
                    <p class="informationItem-value">{{ getAdminDPAccountDetail.email }}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Chuyên khoa</p>
                    <p class="informationItem-value">{{ getAdminDPAccountDetail.specialist }}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Kinh nghiệm</p>
                    <p class="informationItem-value">{{ this.getExp(getAdminDPAccountDetail.exp) }}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Đánh giá</p>
                    <p class="informationItem-value">{{ getAdminDPAccountDetail.rating }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserImageLink,
    convertDateOfBirth,
    replaceByDefaultUser,
    getGender,
    getRole } from "../utils/helper";
    export default {
        computed: {
            ...mapGetters(["getAdminDPAccountDetail"]),
        },
        methods: {
            closedPopup() {
                this.$emit("closed-popup", false);
            },
            getUserImage: getUserImageLink,
            replaceByDefaultUser: replaceByDefaultUser,
            convertDateOfBirth: convertDateOfBirth,
            getGender: getGender,
            getRole: getRole,
            checkIfData(data) {
                return !data || data == '';
            },
            getExp(exp) {
                return exp ? `${exp} năm` : '';
            }
        },
        watch: {
            getAdminDPAccountDetail() {}
        }
    }
</script>

<style scoped>

</style>