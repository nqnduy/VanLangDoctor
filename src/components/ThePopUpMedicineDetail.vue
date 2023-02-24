<template>
    <div class="popupMedicineDetail">
        <div class="bg-black"></div>
            <div class="popupMedicineDetail__content">
            <div class="btn-close" @click="closedPopup">
                <img :src="require('../assets/img/icons/close.svg')" alt="" />
            </div>
            <div class="title">
                <strong>Chi tiết</strong>
            </div>
            <div class="popupMedicineDetail__content-informationList">
                 <div class="informationItem">
                    <p class="informationItem-label">Tên thuốc</p>
                    <p class="informationItem-value">{{medicine.name}}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Danh mục thuốc</p>
                    <p class="informationItem-value">{{medicine.medicineCategory}}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Hoạt chất</p>
                    <p class="informationItem-value">{{medicine.active }}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Đường dùng</p>
                    <p class="informationItem-value">{{medicine.route}}</p>
                </div>
                   <div class="informationItem">
                    <p class="informationItem-label">Hàm lượng</p>
                    <p class="informationItem-value">{{medicine.content}}</p>
                </div>
                   <div class="informationItem">
                    <p class="informationItem-label">Đóng gói</p>
                    <p class="informationItem-value">{{medicine.packing}}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Đơn vị tính</p>
                    <p class="informationItem-value">{{medicine.unit}}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Số đăng ký</p>
                    <p class="informationItem-value">{{medicine.registeredNumber}}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Thành phần</p>
                    <p class="informationItem-value">{{medicine.ingredients}}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Tác dụng phụ</p>
                    <p class="informationItem-value">{{medicine.sideEffects}}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Chỉ định</p>
                    <p class="informationItem-value">{{medicine.indications}}</p>
                </div>
                <div class="informationItem">
                    <p class="informationItem-label">Chống chỉ định</p>
                    <p class="informationItem-value">{{medicine.contraindication}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['medicine'],
        methods: {
            closedPopup() {
                this.$emit("closed-popup-medicine-details", false);
            },
        }
    }
</script>

<style scoped>

</style>