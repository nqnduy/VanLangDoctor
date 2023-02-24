<template>
   <div class="rateForm">
      <ValidationObserver v-slot="{ handleSubmit }">
         <form action="" @submit.prevent="handleSubmit(submitRating)">
            <ValidationProvider name="mức độ hài lòng bằng cách chọn số sao tương ứng" rules="required_if" v-slot="{ errors }">
               <star-rating
                  :increment="1"
                  :show-rating="false"
                  inactive-color="#ADADAD"
                  :active-on-click="false"
                  :star-size="25"
                  :active-color="['#F62', '#FD4', '#FD4', '#FD4', '#FD4']"
                  :glow="5"
                  :padding="5"
                  glow-color="FE7"
                  @rating-selected="setRating"
                  class="ratingStar"
                  v-model="star"
               >
               </star-rating>
               <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider name="Góp ý" rules="max:500" v-slot="{ errors }">
               <textarea class="textareaManagement" placeholder="Viết góp ý" name="" v-model="comments"></textarea>
               <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <VButtonSubmit title="Gửi" style="text-align: center; margin-top: 30px" />
         </form>
      </ValidationObserver>
   </div>
</template>
<script>
import StarRating from "vue-star-rating";
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import { mapActions } from "vuex";

export default {
   props: ["consultationId"],
   components: {
      StarRating,
      VButtonSubmit,
   },
   data() {
      return {
         comments: "",
         rating: 0,
      };
   },
   methods: {
      setRating: function (rating) {
         this.rating = rating;
      },

      submitRating() {
         let data = {
            consultationId: this.consultationId,
            rate: this.rating,
            comment: this.comments,
         };
         this.customerRatingConsultation(data);
         this.$emit("submit-rating", false);
         this.$swal.fire({
            icon: "success",
            title: "Đánh giá buổi tư vấn thành công",
         });
      },
      ...mapActions(["customerRatingConsultation"]),
   },
};
</script>
<style></style>
