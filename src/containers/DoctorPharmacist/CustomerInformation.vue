<template>
   <div class="dpCustomerInformation">
      <ThePopupConsultationResult v-show="isOpenMedicalRecordResultPopup" :record="isHaveRecord" 
         @close-popup-medical-record='closeMedicalRecordResultPopup'
      />
      <DoctorManagement :active="1" isChild="yes" :childTitle="this.customerInformation.fullName" />
      <ThePopupWriteMedicalRecord v-show="isOpenPopupWriteMedicalRecord" @write-medical-success="writeMedicalSuccess" @close-write-medical-popup="closeWriteMedicalPopup" 
         :symptom="symptom" 
         :consultationIdChosen="consultationIdChosen"
      />
      <div class="wrapMain">
         <div class="content">
            <div class="dpCustomerInformation__totalInfo">
               <div class="dpCustomerInformation__totalInfo-left">
                  <div class="avt">
                     <img :src="imageLink" alt="" v-if="this.customerInformation.profilePicture"/>
                     <img :src="require('../../assets/img/user/useravatar_header.png')" alt="" v-else/>
                  </div>
                  <div class="name">{{this.customerInformation.fullName}}</div>
                  <div class="email"> {{this.customerInformation.email}} </div>
               </div>
               <div class="dpCustomerInformation__totalInfo-right">
                  <!-- show gender -->
                  <div class="wrapTextInfo">
                     <div class="wrapTextInfo__title">Giới tính</div>
                     <div class="wrapTextInfo__value" v-if="this.customerInformation.gender">Nữ</div>
                     <div class="wrapTextInfo__value" v-else>Nam</div>
                  </div>
                  <!-- show DOB -->
                  <div class="wrapTextInfo">
                     <div class="wrapTextInfo__title">Ngày sinh</div>
                     <div class="wrapTextInfo__value"> {{transferDataDate(this.customerInformation.dateOfBirth)}}</div>
                  </div>
                  <!-- show phone -->
                  <div class="wrapTextInfo">
                     <div class="wrapTextInfo__title">Số điện thoại</div>
                     <div class="wrapTextInfo__value"> {{this.customerInformation.phoneNumber}} </div>
                  </div>
                  <!-- show height -->
                  <div class="wrapTextInfo">
                     <div class="wrapTextInfo__title">Chiều cao</div>
                     <div class="wrapTextInfo__value" v-if="this.customerInformation.height === 0">{{ 'Chưa cập nhật' }}</div>
                     <div class="wrapTextInfo__value" v-else >{{ this.customerInformation.height }} cm</div>
                  </div>
                  <!-- show weight -->
                  <div class="wrapTextInfo">
                     <div class="wrapTextInfo__title">Cân nặng</div>
                     <div class="wrapTextInfo__value" v-if="this.customerInformation.weight === 0">{{'Chưa cập nhật'}}</div>
                     <div class="wrapTextInfo__value" v-else >{{this.customerInformation.weight}} kg</div>
                  </div>
               </div>
            </div>
            <div class="dpCustomerInformation__profileConsultation">
               <div class="dpCustomerInformation__profileConsultation-title">Hồ sơ tư vấn</div>
               <div class="dpCustomerInformation__profileConsultation-table">
                  <div class="consultationList">
                     <div>
                        <div class="consultationList__item" v-for="(consultation, index) in this.customerInformation.consultations" :key="index">
                           <div>
                              <div class="consultationList__item-dateTime">
                                 <p class="date">{{transferDataDate(consultation.startTime)}}</p>
                                 <p class="time">{{transferDataDateToHours(consultation.startTime)}}</p>
                              </div>
                              <div class="consultationList__item-symptoms">
                                 <p class="title">Triệu chứng</p>
                                 <p class="detail">{{consultation.symptom}}</p>
                              </div>
                              <div class="consultationList__item-consultant">
                                 <p class="title">Bác sĩ</p>
                                 <p class="detail">{{consultation.consultantName}}</p>
                              </div>
                              <div class="consultationList__item-buttonGroup">
                                 <button class="consultationList__item-button add" v-if="checkConsultant(consultation)" @click="openPopupWriteMedicalRecord(consultation)">
                                    <img :src="require('../../assets/img/icons/paper.svg')" alt="" />
                                    <span>Thêm kết quả</span>
                                 </button>
                                 <button class="consultationList__item-button result" v-else-if="consultation.isResult" @click="openMedicalRecordResult(consultation)">
                                    <img :src="require('../../assets/img/icons/paper.svg')" alt="" />
                                    <span>Kết quả</span>
                                 </button>
                                 <button class="consultationList__item-button notYet" v-else>
                                    <span>Chưa có kết quả</span>
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import DoctorManagement from "../../containers/DoctorPharmacist/DoctorManagement.vue";
import ThePopupConsultationResult from "../../components/ThePopupConsultationResult.vue";
import ThePopupWriteMedicalRecord from '../../components/ThePopUpWriteMedicalRecord.vue'

import { mapGetters,mapActions } from 'vuex'
import moment from 'moment';
import urlImage from '../../constants/imageConstantsURL.js'
export default {
   components: {
      DoctorManagement,
      ThePopupConsultationResult,
      ThePopupWriteMedicalRecord,
   },
   computed:{
      ...mapGetters(['customerInformation','doctor'])
   },
   data(){
      return{
         imageLink: null,
         isOpenPopupWriteMedicalRecord: false,
         symptom: null,
         consultationIdChosen: null,
         isHaveRecord: null,
         isOpenMedicalRecordResultPopup: false,
      }
   },
   created(){
      this.getData()
   },
   methods:{
      checkConsultant(consultation){
         if(consultation.isResult === false && consultation.consultantName === this.doctor.fullName){
            return true
         }
         return false;
      },
      transferDataDate(dataDate){
         return moment(dataDate).format('DD/MM/YYYY')
      },
      transferDataDateToHours(dataDate){
         return moment(dataDate).format('HH:mm')
      },
      getImageLink(){
         this.imageLink = urlImage.USER_IMAGE_URL + this.customerInformation.profilePicture
      },
      openPopupWriteMedicalRecord(consultation){
         this.symptom = consultation.symptom
         this.consultationIdChosen = consultation.id
         this.isOpenPopupWriteMedicalRecord = true
      },
      closeWriteMedicalPopup(){
         this.isOpenPopupWriteMedicalRecord = false
      },
      closeMedicalRecordResultPopup(){
         this.isOpenMedicalRecordResultPopup = false
      },
      writeMedicalSuccess(value){
         this.isOpenPopupWriteMedicalRecord = value ?? false
         this.getData()
      },
      getData(){
         this.doctorGetInformationCustomer(this.$route.params.id).then(()=>{
            this.getImageLink()
            this.doctorLogged()
         })
      },
      openMedicalRecordResult(consultation){
         this.isHaveRecord = consultation.medicalRecordId ?? ''
         this.isOpenMedicalRecordResultPopup = true
      },
      ...mapActions(['doctorLogged','doctorGetInformationCustomer'])
   }
};
</script>
<style></style>
