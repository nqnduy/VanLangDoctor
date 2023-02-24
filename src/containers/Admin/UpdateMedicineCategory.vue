<template>
  <div class="popupUpdateMedicineCategory">
    <div class="bg-black" @click="closedPopup"></div>
    <div class="popupUpdateMedicineCategory__content">
      <div class="btn-close" @click="closedPopup">
        <img :src="require('../../assets/img/icons/close.svg')" alt="" />
      </div>
      <div class="titleConfirm">
        <strong>Cập nhật danh mục</strong>
      </div>
      <ValidationObserver ref="observerRef" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div class="text-field">
            <ValidationProvider
              name="Tên danh mục"
              rules="required"
              v-slot="{ errors }"
            >
              <label for="category"
                >Tên danh mục
                <p class="require">*</p></label
              >
              <input
                autocomplete="off"
                type="text"
                id="category"
                v-model="categoryUpdate.name"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <VButtonSubmit
            title="Lưu thay đổi"
            style="margin-top: 40px; text-align: center"
            :disabled="isDisableBtn"
          />
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import { mapActions } from "vuex";
export default {
  props: ["category"],
  components: {
    VButtonSubmit,
  },
  computed: {
    changeIntoData(){
      return this.category
    }
  },
  data() {
    return {
      categoryUpdate: { name: "" },
      isDisableBtn: false,
      catchOne: true,
    };
  },
  created(){
    this.getCategory();
  },
  methods: {
closedPopup() {
      const value = {
        isPopupOpen: false,
      };
      this.categoryUpdate.name = null;
      this.$refs.observerRef.reset();
      this.$emit("closed-popup-update", value);
    },
    onSubmit() {
      this.isDisableBtn = true;
      this.adminUpdatedMedicineCategory(this.categoryUpdate)
        .then(() => {
          this.$swal.fire({
            icon: "success",
            text: "Cập nhật danh mục thuốc thành công",
          });
          this.isDisableBtn = false;
          this.catchOne = true;
          this.closedPopup();
        }).catch((error) => {
            this.$swal.fire(
                error.response.data,
                "",
                "error"
            );
            this.isDisableBtn = false;
        });
    },
    getCategory(){
      const temp = JSON.parse(JSON.stringify(this.category))
      this.categoryUpdate = temp;
    },
    ...mapActions(["adminUpdatedMedicineCategory"]),
  },
};
</script>

<style >
</style>