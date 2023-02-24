<template>
   <div class="dpDashboard">
      <div class="consultationList">
         <h3 class="consultationList__title h3dpDashboard">Danh sách cuộc hẹn</h3>
         <div>
            <form action="" class="consultationList__search">
               <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  class="consultationList__search-input inputManagement"
                  v-model="text"
               />
               <button class="consultationList__search-icon" @click="searchInSchedule">
                  <img :src="require('../assets/img/icons/search.svg')" alt="" />
               </button>
            </form>
         </div>
         <div class="consultationList__table">
            <table class="table-scroll small-first-col">
               <thead>
                  <tr>
                     <th scope="col">
                        <a prevent class="sort-by" @click="filterByName">Họ và tên</a>
                     </th>
                     <th scope="col">
                        <a prevent class="sort-by" @click="filterByTime">Ngày và giờ</a>
                     </th>
                     <th scope="col">
                        <a prevent class="sort-by" @click="filterByState"> Trạng thái </a>
                     </th>
                  </tr>
               </thead>
               <tbody class="body-half-screen">
                  <tr v-for="(consultation, index) in doctorSchedule" :key="index">
                     <td class="name">
                        <p>{{ consultation.customer }}</p>
                     </td>
                     <td class="time">
                        {{transferDataDate(consultation.startTime)}}
                     </td>
                     <td>
                        <!-- state id: 0: waitng, 1:done , 2:cancel -->
                        <div v-if="consultation.state == 'Waiting'" class="status waiting">
                           <img :src="require('../assets/img/icons/status-waiting.svg')" alt="" />
                        </div>
                        <div class="status done" v-else-if="consultation.state == 'Done'">
                           <img :src="require('../assets/img/icons/status-done.svg')" alt="" />
                        </div>
                        <div class="status done" v-else-if="consultation.state == 'Cancelled'">
                           <img :src="require('../assets/img/icons/status-cancel.svg')" alt="" />
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
            <ul class="paging">
               <li
                  v-for="(page, index) in totalSchedule"
                  :key="index"
                  @click="goToPage(index)"
                  :class="{ current: index == pageNumber - 1 }"
               >
                  <span>{{ index + 1 }}</span>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
<script>
import moment from 'moment';
import { mapActions, mapGetters } from "vuex";
import paging from "../../src/constants/paging";
export default {
   computed: {
      ...mapGetters(["doctorSchedule", "totalSchedule","getDoctorQueryFilter"]),
   },
   data() {
      return {
         pageNumber: 1,
         sortColumn: "startTime",
         sortOrder: paging.DECSENDING,
         text: null,
      };
   },
   created() {
      let query = {
         page: this.pageNumber,
         sortColumn: this.sortColumn,
         sortOrder: this.sortOrder,
      };
      this.doctorGetSchedule(query);
   },
   methods: {
      transferDataDate(dataDate){
         return moment(dataDate).format('DD/MM/YYYY HH:mm')
      },
      goToPage(index) {
         let query = this.getDoctorQueryFilter
         query.page = index+1
         this.pageNumber = index+1
         this.queryFilterBy(query)
         this.doctorGetSchedule(this.getDoctorQueryFilter);
      },
      searchInSchedule() {
        let query = { page: 1, sortColumn: "startTime", sortOrder: paging.DECSENDING, search: this.text };
        this.doctorGetSchedule(query);
      },
      filterByName(){
         let query = this.getDoctorQueryFilter
         if(query.sortColumn != 'customer'){
            query.sortColumn = 'customer'
         }
         if(query.sortOrder == paging.DECSENDING){
            query.sortOrder = paging.ACCSENDING
         } else {
            query.sortOrder = paging.DECSENDING
         }
         this.queryFilterBy(query)
         this.doctorGetSchedule(this.getDoctorQueryFilter);
      },
      filterByTime(){
         let query = this.getDoctorQueryFilter
         if(query.sortColumn != 'startTime'){
            query.sortColumn = 'startTime'
         }
         if(query.sortOrder == paging.DECSENDING){
            query.sortOrder = paging.ACCSENDING
         } else {
            query.sortOrder = paging.DECSENDING
         }
         this.queryFilterBy(query)
         this.doctorGetSchedule(this.getDoctorQueryFilter);
      },
      filterByState(){
         let query = this.getDoctorQueryFilter
         if(query.sortColumn != 'state'){
            query.sortColumn = 'state'
         }
         if(query.sortOrder == paging.DECSENDING){
            query.sortOrder = paging.ACCSENDING
         } else {
            query.sortOrder = paging.DECSENDING
         }
         this.queryFilterBy(query)
         this.doctorGetSchedule(this.getDoctorQueryFilter);
      },
      ...mapActions(["doctorGetSchedule","queryFilterBy"]),
   },
};
</script>
<style scoped></style>
