<template>
   <div class="popupConsultationResult">
      <div class="bg-black">
         <div class="popupConsultationResult__content">
            <div class="popupConsultationResult__content-title">
               <h3>Kết quả tư vấn</h3>
               <button class="closePopup" @click="closedPopup">
                  <img :src="require('../assets/img/icons/close.svg')" alt="" />
               </button>
            </div>
            <div class="popupConsultationResult__content-result" v-if="!customerMedicalRecord && !medicalRecordResult">
               <div class="resultTextItem">
                  <h1>Chưa có kết quả tư vấn</h1>
               </div>
            </div>
            <div v-else-if="medicalRecordResult">
               <div class="popupConsultationResult__content-result">
                  <div class="resultTextItem">
                     <div class="resultTextItem__title">Bệnh lý <span style="color:red">*</span></div>
                     <div class="resultTextItem__value"> {{medicalRecordResult.pathological}} </div>
                  </div>
                  <div class="resultTextItem">
                     <div class="resultTextItem__title">Hướng điều trị <span style="color:red">*</span></div>
                     <div class="resultTextItem__value">{{medicalRecordResult.treatment}}</div>
                  </div>
                  <div class="resultTextItem">
                     <div class="resultTextItem__title">Chuẩn đoán <span style="color:red">*</span></div>
                     <div class="resultTextItem__value">{{medicalRecordResult.diagnose}}</div>
                  </div>
               </div>
               <div class="popupConsultationResult__content-prescription">
                  <p class="popupConsultationResult__content-prescription-title">Đơn thuốc</p>
                  <div class="popupConsultationResult__content-prescription-list">
                     <div class="popupConsultationResult__content-prescription-list--item"
                        v-for="(medicine,index) in medicalRecordResult.prescriptionMedicine"
                        :key="index"
                     >
                     <div class="prescriptionLeft">
                        <p class="prescriptionLeft__name"> {{medicine.medicineName}} </p>
                        <p class="prescriptionLeft__specifyDosage"><span>Ghi chú: </span>{{medicine.note}}</p>
                     </div>
                     <p class="prescriptionRight"><span class="quantity">{{medicine.quantity}}</span> {{medicine.quantityType}}</p>
                  </div>
               </div>
             </div>
            </div>
            <div v-else>
               <div class="popupConsultationResult__content-result">
                  <div class="resultTextItem">
                     <div class="resultTextItem__title">Bệnh lý</div>
                     <div class="resultTextItem__value"> {{customerMedicalRecord.pathological}} </div>
                  </div>
                  <div class="resultTextItem">
                     <div class="resultTextItem__title">Hướng điều trị</div>
                     <div class="resultTextItem__value">{{customerMedicalRecord.treatment}}</div>
                  </div>
                  <div class="resultTextItem">
                     <div class="resultTextItem__title">Chuẩn đoán</div>
                     <div class="resultTextItem__value">{{customerMedicalRecord.diagnose}}</div>
                  </div>
               </div>
               <div class="popupConsultationResult__content-prescription">
                  <p class="popupConsultationResult__content-prescription-title">Đơn thuốc</p>
                  <div class="popupConsultationResult__content-prescription-list">
                     <div class="popupConsultationResult__content-prescription-list--item"
                        v-for="(medicine,index) in customerMedicalRecord.prescriptionMedicine"
                        :key="index"
                     >
                     <div class="prescriptionLeft">
                        <p class="prescriptionLeft__name"> {{medicine.medicineName}} </p>
                        <p class="prescriptionLeft__specifyDosage"><span>Ghi chú: </span>{{medicine.note}}</p>
                     </div>
                     <p class="prescriptionRight"><span class="quantity">{{medicine.quantity}}</span> {{medicine.quantityType}}</p>
                  </div>
               </div>
             </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
   props:['record'],
   computed:{
      ...mapGetters(['customerMedicalRecord','medicalRecordResult'])
   },
   data(){
      return{

      }
   },
   methods:{
      closedPopup() {
         this.$emit("close-popup-medical-record", false);
      },
      ...mapActions(['doctorGetCustomerMedicalRecord'])
   },
   watch:{
      record(){
         this.doctorGetCustomerMedicalRecord(this.record)
      },
      medicalRecordResult(){

      }
   }
};
</script>
<style></style>
