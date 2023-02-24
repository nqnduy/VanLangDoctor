<template>
   <div class="popupWriteMedicalRecord">
      <div class="bg-black"></div>
      <div class="popupWriteMedicalRecord__content">
         <!-- HEADLINE -->
         <div class="popupWriteMedicalRecord__content-title">
            <h3 class="h3dpDashboard">Thêm kết quả tư vấn</h3>
            <button class="closePopup" @click="closedPopup">
               <img :src="require('../assets/img/icons/close.svg')" alt="" />
            </button>
         </div>
         <!-- END HEADLINE -->
         <!-- CONTENT -->
         <div class="popupWriteMedicalRecord__content-inputForm">
            <!-- Symptom display -->
            <div class="inputItem symptom">
               <div class="inputItem__title">Triệu chứng <span style="color:red">*</span></div>
               <div class="inputItem__value">{{symptom}}</div>
            </div>
            <!-- Medical Record Form -->
            <ValidationObserver ref="observerRef" v-slot="{handleSubmit}">
               <form action="" @submit.prevent="handleSubmit(submitMedicalRecord)">
                  <!-- Pathological input -->
                  <div class="inputItem validation pathological">
                     <div class="inputItem__title">Bệnh lý <span style="color:red">*</span></div>
                     <ValidationProvider name="Bệnh lý" rules="required" v-slot="{ errors }">
                        <textarea
                           autocomplete="off"
                           type="text"
                           class="inputItem__textarea textareaManagement"
                           v-model="theMedicalRecord.pathological"
                        ></textarea>
                        <span>{{ errors[0] }}</span>
                     </ValidationProvider>
                  </div>
                  <!-- Diagnose input -->
                  <div class="inputItem validation">
                     <div class="inputItem__title">Chuẩn đoán <span style="color:red">*</span></div>
                     <ValidationProvider name="Chuẩn đoán" rules="required" v-slot="{ errors }">
                        <input autocomplete="off" type="text" class="inputItem__input inputManagement"
                           v-model="theMedicalRecord.diagnose"
                        />
                        <span>{{ errors[0] }}</span>
                     </ValidationProvider>
                  </div>
                  <!-- Treatment input -->
                  <div class="inputItem validation">
                     <div class="inputItem__title">Hướng điều trị <span style="color:red">*</span></div>
                     <ValidationProvider name="Hướng điều trị" rules="required" v-slot="{ errors }">
                        <input autocomplete="off" type="text" class="inputItem__input inputManagement"
                           v-model="theMedicalRecord.treatment"
                        />
                        <span>{{ errors[0] }}</span>
                     </ValidationProvider>
                  </div>
                  <!-- Medicine input -->
                  <div class="medicineInputWrap">
                     <!-- Medicine name input -->
                     <div class="inputItem medicineName">
                        <div class="inputItem__title">Tên thuốc</div>
                        <!-- <VInputAutoComplete />
                        <VButtonSubmit title="Test" /> -->
                        <VInputAutoComplete
                           style="width: 93%"
                           @get-medicine="addMedicine"
                           :renderKey="isAsync"
                        />
                     </div>
                     <!-- Medicine quantity input -->
                     <div class="inputItem">
                        <div class="inputItem__title quantity">SL</div>
                        <input
                           autocomplete="off"
                           type="number"
                           min="1"
                           v-model="theMedicine.quantity"
                           class="inputItem__input quantity inputManagement"
                           ref="quantity"
                        />
                        <!-- Medicine unit input -->
                        <input
                           autocomplete="off"
                           type="text"
                           class="inputItem__input inputManagement"
                           v-model="theMedicine.quantityType"

                        />
                     </div>
                  </div>
                  <div class="noteInputWrap">
                     <!-- Note input -->
                     <div class="inputItem">
                        <div class="inputItem__title">Ghi chú</div>
                        <input
                           autocomplete="off"
                           type="text"
                           class="inputItem__input inputManagement"
                           v-model="theMedicine.note"
                        />
                     </div>
                     <!-- Button add medicine-->
                     <div class="btn-plus" @click="addMedicineToList"><img :src="require('../assets/img/icons/plus-medicine.svg')" alt="" /></div>
                  </div>
                  <div class="prescriptionTable">
                     <table class="table-scroll small-first-col">
                        <thead>
                           <tr>
                              <th></th>
                              <th></th>
                              <th></th>
                           </tr>
                        </thead>
                        <tbody class="body-half-screen">
                           <tr v-for="(item, index) in listMedicine" :key="index">
                              <td>
                                 <div class="nameAndNote">
                                    <p class="name">{{ item.medicineName }}</p>
                                    <p class="note">Ghi chú: {{ item.note }}</p>
                                 </div>
                              </td>
                              <td>
                                 <div class="quantityAndUnit">
                                    <p class="quantity">{{ item.quantity }}</p>
                                    <p class="unit">{{ item.quantityType }}</p>
                                 </div>
                              </td>
                              <td>
                                 <button class="btn-close" @click.prevent="delMedicine(item)">
                                    <img :src="require('../assets/img/icons/close.svg')" alt="" />
                                 </button>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <VButtonSubmit title="Lưu" option="white" style="text-align: right" prevent/>
               </form>
            </ValidationObserver>
            <!-- End Medical Record Form -->
         </div>
         <!-- END CONTENT -->
      </div>
   </div>
</template>
<script>
import VInputAutoComplete from "../components/VInputAutoComplete.vue";
import VButtonSubmit from "../components/VButtonSubmit.vue";
import { mapActions } from 'vuex'
export default {
   props:['symptom','consultationIdChosen'],
   components: {
      VInputAutoComplete,
      VButtonSubmit,
   },
   data() {
      return {
         theMedicine: {
            medicine: null,
            note: null,
            quantityType: null,
            quantity:null,
         },
         listMedicine: [],
         theMedicalRecord:{
            consultationId: null,
            pathological:null,
            treatment:null,
            diagnose:null,
            prescriptionMedicineWriteDtos:null,
         },
         isAsync: null,
      };
   },
   methods: {
      addMedicine(value) {
         this.theMedicine.medicine = value
         this.theMedicine.quantityType = value.unit
      },
      addMedicineToList(){
         try {
            const medicineRequest = {
               quantity: this.theMedicine.quantity,
               quantityType: this.theMedicine.quantityType,
               note:this.theMedicine.note,
               medicineId: this.theMedicine.medicine.id,
               medicineName: this.theMedicine.medicine.name
            }
            if(!medicineRequest.quantity){
               throw "quantity error required"
            } else if(!medicineRequest.note || !medicineRequest.note.replace(/\s/g, '').length){
               throw "note error required"
            } else if(!medicineRequest.quantityType || !medicineRequest.quantityType.replace(/\s/g, '').length){
               throw "quantity type error required"
            } else if(!medicineRequest.medicineName.replace(/\s/g, '').length || !medicineRequest.medicineName ){
               throw "medicine name not allow null"
            } else {
               let isExitsMedicine= false;
               this.listMedicine.find((medicineInList)=>{
                  if (medicineInList.medicineName === medicineRequest.medicineName){
                     isExitsMedicine = true;
                     this.$swal.fire({
                        title: "Không thể thêm thuốc giống nhau",
                     })
                     return;
                  }
               })
               if (!isExitsMedicine) {
                  this.listMedicine.push(medicineRequest)
               }
               this.theMedicine = {
                  medicine: null,
                  note: null,
                  quantityType: null,
                  quantity:null,
               }
               this.isAsync = Math.random()*1000000
            }
         } catch (error) {
            if(error === 'quantity error required'){
               this.$swal.fire({
                  icon: "error",
                  title: 'Đơn thuốc phải bao gồm số lượng',
               });
            } else if(error === 'note error required'){
               this.$swal.fire({
                  icon: "error",
                  title: 'Đơn thuốc phải bao gồm ghi chú',
               });
            } else if(error === 'quantity type error required'){
               this.$swal.fire({
                  icon: "error",
                  title: 'Đơn thuốc phải bao gồm đơn vị',
               });
            } else {
               this.$swal.fire({
                  icon: "error",
                  title: 'Đơn thuốc phải bao gồm thuốc',
               });
            }
         }
      },
      delMedicine(medicine) {
         this.listMedicine.splice(this.listMedicine.indexOf(medicine), 1);
      },
      closedPopup(){
        this.$swal
            .fire({
               showDenyButton: true,
               title: "Bạn có chắc chắn muốn hủy kết quả ghi này?",
               icon: "warning",
               confirmButtonText: "Hủy",
               denyButtonText: "Quay lại",
               dangerMode: true,
            })
            .then((result) => {
               if (result.isConfirmed) {
                  this.removeOldValueObject(this.theMedicine)
                  this.removeOldValueObject(this.theMedicalRecord)
                  this.listMedicine = [];
                  this.$refs.observerRef.reset();
                 this.$emit('close-write-medical-popup',false)
               } else if (result.isDenied) {
                  return null;
               }
            });
      },
      removeOldValueObject(object){
         Object.keys(object).forEach(key => {
            object[key] = null;
         });
      },
      submitMedicalRecord(){
         this.theMedicalRecord.prescriptionMedicineWriteDtos = this.listMedicine
         this.theMedicalRecord.consultationId = this.consultationIdChosen
         this.doctorSubmitMedicalRecord(this.theMedicalRecord)
            .then(()=>{
               this.$emit('write-medical-success',false)
               this.$swal.fire({
                  icon: "success",
                     title: 'Ghi lại kết quả khám thành công',
               });
               this.removeOldValueObject(this.theMedicine)
               this.removeOldValueObject(this.theMedicalRecord)
               this.listMedicine = []
               this.$refs.observerRef.reset();
               })
            .catch(()=>{
               this.$swal.fire({
                  icon: "error",
                     title: 'Ghi lại không thành công',
                  });
            })
      },
      ...mapActions(['doctorSubmitMedicalRecord','doctorGetCustomerMedicalRecord'])
   }
};
</script>
<style></style>
