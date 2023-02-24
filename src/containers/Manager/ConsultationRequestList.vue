<template>
   <div class="consultationRequest">
      <ManagerManagement :active="0" />
      <div class="wrapMain">
         <div class="content">
           <div class="tableManager">
              <div class="filterWrap">
               <div class="filterDate">
                  <input type="date" v-model="sortByDate" class="inputManagement" />
               </div>
               <div class="filter status">
                  <div class="filter__filterBy" @click="isCheckBoxes = !isCheckBoxes">
                    <input class="inputManagement" value="Trạng thái" readonly />
                    <!-- <i><img :src="require('../../assets/img/icons/dropdown.svg')" alt="" /></i> -->
                  </div>
                  <div class="filter__checkboxes" v-show="isCheckBoxes">
                     <div class="filter__checkboxes-option">
                        <label> <input type="checkbox" v-model="sortWithMultiState.Confirmed" />Đã xác nhận <span class="checkmark"></span> </label>
                     </div>
                     <div class="filter__checkboxes-option">
                        <label> <input type="checkbox" v-model="sortWithMultiState.Cancelled" />Đã huỷ <span class="checkmark"></span> </label>
                     </div>
                     <div class="filter__checkboxes-option">
                        <label> <input type="checkbox" v-model="sortWithMultiState.Done" />Đã hoàn thành <span class="checkmark"></span> </label>
                     </div>
                     <div class="filter__checkboxes-option">
                        <label> <input type="checkbox" v-model="sortWithMultiState.Waiting" />Đang chờ xác nhận<span class="checkmark"></span> </label>
                     </div>
                     <div class="filter__checkboxes-option">
                        <label> <input type="checkbox" v-model="sortWithMultiState.Ignored" />Đã từ chối tư vấn<span class="checkmark"></span> </label>
                     </div>
                  </div>
               </div>
               <div class="searchArea">
                  <form action="" class="searchArea__search" @submit.prevent="searching">
                     <input type="text" placeholder="Tìm kiếm..." class="searchArea__search-input inputManagement" v-model="keyword" />
                     <button class="searchArea__search-icon" type="submit">
                        <img :src="require('../../assets/img/icons/search.svg')" />
                     </button>
                  </form>
               </div>
            </div>
            <table class="table-scroll consultationRequestList">
               <thead>
                  <tr>
                     <th scope="col">
                        <a prevent class="sort-by" v-on:click="sortListByCustomer"> Khách hàng </a>
                     </th>
                     <th scope="col">
                        <a prevent class="sort-by" v-on:click="sortListByDay">Thời gian tư vấn</a>
                     </th>
                     <th scope="col">
                        <a prevent class="sort-by" v-on:click="sortListByDoctor">Bác sĩ/dược sĩ</a>
                     </th>
                     <th scope="col">
                        <a prevent class="sort-by" v-on:click="sortListByState"> Trạng thái </a>
                     </th>
                  </tr>
               </thead>
               <tbody class="body-half-screen">
                <tr v-for="(item,index) in listRequest" :key="index">
                     <td class="customer">
                        <div class="wrapInfo">
                           <p class="name">{{item.customer}}</p>
                           <p class="email">{{item.customerEmail}}</p>
                        </div>
                     </td>
                     <td class="time">{{transferDataDate(item.time)}}</td>
                     <td class="doctor">
                        <div class="wrapInfo">
                           <p class="name">{{item.doctorPharmacist}}</p>
                           <p class="userName">{{item.doctorPharmacistUsername}}</p>
                        </div>
                     </td>
                     <td>
                        <p class="status">{{translateState(item.state)}}</p>
                     </td>
                </tr>
               </tbody>
            </table>
            <ul class="paging">
               <li v-for="(page, index) in totalPages" :key="index" @click="goToPage(index)" :class="{ current: index == pageNumber - 1 }">
                  <span>{{ index + 1 }}</span>
               </li>
            </ul>
           </div>
         </div>
      </div>
   </div>
</template>
<script>
import ManagerManagement from "../Manager/ManagerManagement.vue";
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment';
import paging from '../../constants/paging'

export default {
   components: {
      ManagerManagement,
   },
   computed:{
     ...mapGetters(['managerRequestList'])
   },
   data() {
      return {
         pageNumber: 1,
         isCheckBoxes: false,
         keyword:null,
         listRequest: null,
         totalPages: 1,
         sortByDate: null,
         sortOrderDate: paging.DECSENDING,
         sortOrderCustomerName: paging.DECSENDING,
         sortOrderDoctorName: paging.DECSENDING,
         sortOrderState: paging.DECSENDING,
         sortWithMultiState: {
           Waiting: false,
           Cancelled: false,
           Done: false,
           Confirmed: false,
           Ignored: false
         }
      };
   },
   mounted(){
     const query = {
       page: this.pageNumber,
     }
     this.managerGetRequestList(query)
     .then(()=>{
       this.listRequest = this.managerRequestList.query
       this.totalPages = this.managerRequestList.totalPages ?? 1
     })
   },
   methods: {
      goToPage(index) {
        this.pageNumber = index + 1;
        let query = this.checkIfListSorting(index);
        this.managerGetRequestList(query)
          .then(()=>{
            this.listRequest = this.managerRequestList.query
            this.totalPages = this.managerRequestList.totalPages ?? 1
          })
      },
      checkIfListSorting(){
        const query = {
          page: this.pageNumber,
          time: this.sortByDate ? this.sortByDate : '',
        }
        let statesArray = []
        for (const key in this.sortWithMultiState) {
          if (Object.hasOwnProperty.call(this.sortWithMultiState, key)) {
            const element = this.sortWithMultiState[key];
            if(element){
              statesArray.push(key)
            }
          }
        }
        if(statesArray){
          query['states'] = statesArray
        }
        if(this.sortOrderCustomerName === paging.ACCSENDING){
          query['sortOrder'] = paging.ACCSENDING
          query['sortColumn'] = 'customer'
        } else if(this.sortOrderDate === paging.ACCSENDING){
          query['sortOrder'] = paging.ACCSENDING
          query['sortColumn'] = 'time'
        } else if(this.sortOrderDoctorName === paging.ACCSENDING){
          query['sortOrder'] = paging.ACCSENDING
          query['sortColumn'] = 'doctorPharmacist'
        } else if(this.sortOrderState === paging.ACCSENDING){
          query['sortOrder'] = paging.ACCSENDING
          query['sortColumn'] = 'state'
        }
        return query;
      },
      transferDataDate(dataDate){
        const date = moment(dataDate).format('DD/MM/YYYY');
        const hours = moment(dataDate).format('HH:mm')
        return `${hours} | ${date}`
      },
      translateState(state){
        switch (state) {
          case 'Waiting':
            return 'Đang chờ xác nhận'
          case 'Cancelled':
            return 'Đã huỷ'
          case 'Done':
            return 'Đã hoàn thành'
          case 'Confirmed':
            return 'Đã xác nhận'
          case 'Ignored':
            return 'Đã từ chối tư vấn'
          default:
            return 'undefine'
        }
      },
      sortListByCustomer(){
        const query = {
          sortOrder: null,
          sortColumn: null,
        }
        if(this.sortOrderCustomerName === paging.DECSENDING){
          query.sortOrder = paging.ACCSENDING
          query.sortColumn = 'customer'
          this.sortOrderCustomerName = paging.ACCSENDING
        } else {
          query.sortOrder = paging.DECSENDING
          query.sortColumn = 'customer'
          this.sortOrderCustomerName = paging.DECSENDING
        }
        this.managerGetRequestList(query)
          .then(()=>{
            this.listRequest = this.managerRequestList.query
            this.totalPages = this.managerRequestList.totalPages ?? 1
          })
      },
      sortListByDay(){
        const query = {
          sortOrder: null
        }
        if(this.sortOrderDate === paging.DECSENDING){
          query.sortOrder = paging.ACCSENDING
          this.sortOrderDate = paging.ACCSENDING
        } else {
          query.sortOrder = paging.DECSENDING
          this.sortOrderDate = paging.DECSENDING
        }
        this.managerGetRequestList(query)
          .then(()=>{
            this.listRequest = this.managerRequestList.query
            this.totalPages = this.managerRequestList.totalPages ?? 1
          })
      },
      searching(){
        const query = {
          keyword: this.keyword
        }
        this.managerGetRequestList(query)
          .then(()=>{
            this.listRequest = this.managerRequestList.query
            this.totalPages = this.managerRequestList.totalPages ?? 1
          })
      },
      sortListByDoctor(){
        const query = {
          sortOrder: null,
          sortColumn: null,
        }
        if(this.sortOrderDoctorName === paging.DECSENDING){
          query.sortOrder = paging.ACCSENDING
          query.sortColumn = 'doctorPharmacist'
          this.sortOrderDoctorName = paging.ACCSENDING
        } else {
          query.sortOrder = paging.DECSENDING
          query.sortColumn = 'doctorPharmacist'
          this.sortOrderDoctorName = paging.DECSENDING
        }
        this.managerGetRequestList(query)
          .then(()=>{
            this.listRequest = this.managerRequestList.query
            this.totalPages = this.managerRequestList.totalPages ?? 1
          })
      },
      sortListByState(){
        const query = {
          sortOrder: null,
          sortColumn: null,
        }
        if(this.sortOrderState === paging.DECSENDING){
          query.sortOrder = paging.ACCSENDING
          query.sortColumn = 'state'
          this.sortOrderState = paging.ACCSENDING
        } else {
          query.sortOrder = paging.DECSENDING
          query.sortColumn = 'state'
          this.sortOrderState = paging.DECSENDING
        }
        this.managerGetRequestList(query)
          .then(()=>{
            this.listRequest = this.managerRequestList.query
            this.totalPages = this.managerRequestList.totalPages ?? 1
          })
      },
      filterListByDaySelected(){
        const query = {
          time: this.sortByDate
        }
        this.managerGetRequestList(query)
          .then(()=>{
            this.listRequest = this.managerRequestList.query
            this.totalPages = this.managerRequestList.totalPages ?? 1
          })
      },
      filerListByState(){
        const query = this.checkIfListSorting()
        this.managerGetRequestList(query)
          .then(()=>{
            this.listRequest = this.managerRequestList.query
            this.totalPages = this.managerRequestList.totalPages ?? 1
          })
      },
      ...mapActions(['managerGetRequestList'])
   },
   watch: {
     sortByDate(){
      this.filterListByDaySelected();
     },
     sortWithMultiState: {
       handler: function(){
         this.filerListByState()
       },
       deep: true
     }
   }
};
</script>
<style></style>
