<template>
    <div class="popupCreateMedicineCategory">
        <div class="bg-black" @click="closedPopup"></div>
        <div class="popupCreateMedicineCategory__content">
            <div class="btn-close" @click="closedPopup">
                <img :src="require('../../assets/img/icons/close.svg')" alt="" />
            </div>
            <div class="titleConfirm">
                <strong>Tạo danh mục</strong>
            </div>
            <ValidationObserver ref="observerRef" v-slot="{ handleSubmit }">
                <form 
                    @submit.prevent="handleSubmit(onSubmit)"
                >
                    <div class="text-field">
                        <ValidationProvider name="Tên danh mục" rules="required" v-slot="{ errors }">
                            <label for="category"
                                >Tên danh mục
                                <p class="require">*</p></label
                            >
                            <input autocomplete="off" type="text" id="category" v-model="category" @focus="resetErrorMess" ref="inputCate" />
                            <span v-if="isShowError" ref="errorDisplay">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <VButtonSubmit title="Tạo danh mục" style="margin-top: 40px; text-align: center" 
                        :disabled="isDisableBtn"
                    />
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import {mapActions,mapGetters} from 'vuex';
export default {
    props: ['show'],
    components: {
        VButtonSubmit,
    },
    computed: {
        ...mapGetters(['getAdminCategoryQuery'])
    },
    data() {
        return {
            isDisableBtn:false,
            category: "",
            isShowError: true,
        };
    },
    methods: {
        resetErrorMess(){
            if(this.$refs.observerRef.errors['Tên danh mục'][0] !== undefined){
                this.$refs.errorDisplay.innerHTML = this.$refs.observerRef.errors['Tên danh mục'][0];
            }
        },
        closedPopup() {
            const value = {
                isPopupOpen: false,
                hiddenError: true,
            }
            this.$refs.observerRef.reset();
            this.$emit("closed-popup", value);
        },
        onSubmit(){
            this.category === undefined ? this.category = "" : this.category;
            this.isDisableBtn = true;
            const newCategory = {Name: this.category}
            this.adminCreateNewCategory(newCategory)
                .then(() => {
                    this.$swal.fire({
                        icon: "success",
                        title: "Tạo danh mục thuốc mới thành công",
                    });
                    this.category = undefined;
                    this.closedPopup();
                    this.isDisableBtn = false;
                }).catch((error) => {
                    this.$swal.fire(
                        error.response.data,
                        "",
                        "error"
                    );
                    this.isDisableBtn = false;
                });
        },
        reloadTheCategory(){
            const query = this.getAdminCategoryQuery;
            this.adminGetCategory(query);
        },
        ...mapActions(['adminCreateNewCategory','adminGetCategory'])
    },
};
</script>

<style scoped></style>
