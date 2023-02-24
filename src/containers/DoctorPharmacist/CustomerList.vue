<template>
   <div class="dpCustomerList">
      <DoctorManagement :active="1" />
      <div class="wrapMain">
         <div class="content">
            <div class="dpCustomerList__bar">
               <div class="sortArea">
                  <div class="sortArea__sortBy">
                     <p class="h3dpCustomerList">Lọc danh sách</p>
                     <select class="inputManagement" v-model="optionalSortList">
                        <option :value="'IsSortedByNextConsultation'" style="background-color: #d0eff2">Cuộc hẹn tiếp theo</option>
                        <option :value="'IsSortedByPreviousConsultation'" style="background-color: #d0eff2">Cuộc hẹn gần nhất</option>
                     </select>
                  </div>
               </div>
               <div class="searchArea">
                  <form action="" class="searchArea__search" @submit.prevent="searching">
                     <input type="text" placeholder="Tìm kiếm..." class="searchArea__search-input inputManagement" v-model="keyword" />
                     <button class="searchArea__search-icon">
                        <img :src="require('../../assets/img/icons/search.svg')" />
                     </button>
                  </form>
               </div>
            </div>
            <div class="dpCustomerList__table">
               <table class="table-scroll small-first-col">
                  <thead>
                     <tr>
                        <th></th>
                        <th scope="col" class="h3dpCustomerList">Khách hàng</th>
                        <th scope="col" class="h3dpCustomerList">Số điện thoại</th>
                        <th scope="col" class="h3dpCustomerList">Cuộc hẹn tiếp theo</th>
                        <th scope="col" class="h3dpCustomerList">Cuộc hẹn gần nhất</th>
                     </tr>
                  </thead>
                  <tbody class="body-half-screen">
                     <div v-for="(customer,index) in listCustomerConsultation.list" :key="index">
                     <router-link :to="{ name: 'DPCustomerInformation',params: { id: customer.id } }" class="customerItem" >
                        <tr>
                           <td>
                              <div class="avt">
                                 <img :src="getImageLink(customer)" alt="" v-if="customer.profilePicture"/>
                                 <img :src="require('../../assets/img/user/useravatar_header.png')" alt="" v-else/>
                              </div>
                           </td>
                           <td class="information">
                              <div class="wrapInformation">
                                 <p class="name">{{customer.fullName}} </p>
                                 <p class="email">{{customer.email}}</p>
                              </div>
                           </td>
                           <td class="tel">{{customer.phoneNumber}}</td>
                           <td class="nextConsultation">{{transferDataToDate(customer.nextConsultation)}}</td>
                           <td class="latestConsultation" style="text-align: center">
                              {{transferDataToDate(customer.previousConsultation)}}
                           </td>
                        </tr>
                     </router-link>
                     </div>
                  </tbody>
               </table>
            </div>
            <ul class="dpCustomerList__paging">
               <li v-for="(page, index) in listCustomerConsultation.totalPages" :key="index" @click="goToPage(index)" :class="{ current: index == pageNumber - 1 }">
                  <span>{{ index + 1 }}</span>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
<script>
import DoctorManagement from "../../containers/DoctorPharmacist/DoctorManagement.vue";
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import urlImage from '../../constants/imageConstantsURL.js'

export default {
   computed:{
      ...mapGetters(['listCustomerConsultation'])
   },
   components: {
      DoctorManagement,
   },
   data() {
      return {
         keyword: "",
         pageNumber: 1,
         optionalSortList: null,
         imageLink: null,
      };
   },
   created(){
      this.getImageLink()
   },
   mounted(){
      const query = {
         
      }
      this.doctorGetListCustomerConsultation(query)
   },
   methods:{
      transferDataToDateWithHours(dataDate){
         return `${moment(dataDate).format('HH:mm')} || ${moment(dataDate).format('DD-MM-YYYY')}`
      },
      transferDataToDate(dataDate){
         if(dataDate === '0001-01-01T00:00:00'){
            return 'Chưa có thông tin cuộc hẹn'
         }
         return moment(dataDate).format('DD-MM-YYYY')
      },
      countList(){
         if(this.listCustomerConsultation.list){
            return Object.keys(this.listCustomerConsultation.list).length
         }
         return 0
      },
      goToPage(index) {
         this.pageNumber = index + 1;
         const query = {
            optionalSortList: this.optionalSortList ?? '',
            page: this.pageNumber,
         }
         this.customerGetSchedule(query);
      },
      sortByOptional(){
         const query = {
            optionalSortList: this.optionalSortList,
            page: this.pageNumber,
         }
         this.doctorGetListCustomerConsultation(query)
      },
      searching(){
         const query = {
            optionalSortList: this.optionalSortList ?? '',
            search: this.keyword
         }
         this.doctorGetListCustomerConsultation(query)
      },
      getCustomerInformation(customerId){
         this.doctorGetInformationCustomer(customerId)
      },
      getImageLink(customer){
         return urlImage.USER_IMAGE_URL + customer.profilePicture
      },
      ...mapActions(['doctorGetListCustomerConsultation','doctorGetInformationCustomer'])
   },
   watch:{
      optionalSortList(){
         this.sortByOptional()
      }
   }
}; 
</script>
