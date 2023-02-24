<template>
   <div class="popupConfirm">
      <div class="bg-black"></div>
      <div class="popupConfirm__content" v-if="option == 'cancelConsultation'">
         <div class="btn-close">
            <img :src="require('../assets/img/icons/close.svg')" alt="" @click="closedPopup"/>
         </div>
         <div class="titleConfirm">
            <strong>Bạn có chắc chắn muốn huỷ?</strong>
            Huỷ cuộc hẹn đột xuất có thể ảnh hưởng xấu đến trải nghiệm của khách hàng.
         </div>
         <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(cancelConsultation)">
               <ValidationProvider name="Lí do" rules="required|max:500" v-slot="{ errors }">
                  <textarea class="textareaManagement" placeholder="Điền lí do" name="" v-model="reason"></textarea>
                  <span>{{ errors[0] }}</span>
               </ValidationProvider>
               <VButtonSubmit title="Huỷ cuộc hẹn" style="margin-top: 20px; text-align: center" />
            </form>
         </ValidationObserver>
      </div>
       <div class="popupConfirm__content" v-if="option == 'refuseRequest'">
         <div class="btn-close">
            <img :src="require('../assets/img/icons/close.svg')" alt="" @click="closedPopup"/>
         </div>
         <div class="titleConfirm refuseRequest">
            <strong>Xin vui lòng cho biết lí do từ chối cuộc hẹn!</strong>
         </div>
         <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(cancelRequest)">
               <ValidationProvider name="Lí do" rules="max:500" v-slot="{ errors }">
                  <textarea class="textareaManagement" placeholder="Điền lí do" name="" v-model="reason"></textarea>
                  <span>{{ errors[0] }}</span>
               </ValidationProvider>
               <VButtonSubmit title="Xác nhận" style="margin-top: 20px; text-align: center" />
            </form>
         </ValidationObserver>
      </div>
   </div>
</template>
<script>
import VButtonSubmit from "../components/VButtonSubmit.vue";
import { mapActions} from 'vuex'
export default {
   props:['consultationId',"option",'requestId'],
   components: {
      VButtonSubmit,
   },
   data() {
      return {
         reason: "",
      };
   },
   methods:{
      closedPopupWhenConfirmIgnore() {
            this.$emit("closed-confirm-ignore-popup", false);
        },
      closedPopup() {
         this.$emit("closed-popup-confirm-cancel", false);
      },
      cancelConsultation(){
         let cancelConsultation = {
            id: this.consultationId,
            reason: this.reason.trim(),
         }
         this.doctorCancelConsultation(cancelConsultation).then(() => {
            this.incrementRenderKey();
            this.closedPopup();
            this.$swal.fire({
                  icon: "success",
                  title: 'Hủy cuộc hẹn thành công',
               });
         })
         .catch(()=>{
            this.$swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Có lỗi khi hủy cuộc hẹn, hãy thử lại",
            });
         })
      },
      cancelRequest(){
         const request = {
            id: this.requestId,
            reason: this.reason,
         }
         this.doctorIgnoreConsultationRequest(request).then(()=>{
            this.closedPopupWhenConfirmIgnore()
            this.$swal.fire({
              icon: "success",
              title: "Đã từ chối yêu cầu cuộc hẹn",
            });
         })
         .catch(()=>{
            this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Có lỗi đã xảy ra, hãy thử lại",
              });
         })
      },
      ...mapActions(['doctorCancelConsultation','incrementRenderKey','doctorIgnoreConsultationRequest'])
   }
};
</script>
<style></style>
