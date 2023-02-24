<template>
   <div class="requestList">
      <CustomerManagement :active="1" />
      <div class="wrapMain">
         <div class="content">
            <table class="table-scroll small-first-col">
               <thead>
                  <tr>
                     <th scope="col">
                        <a prevent class="sort-by" v-on:click="sortListByDoctor">Bác sĩ/dược sĩ</a>
                     </th>
                     <th scope="col">
                        <a prevent class="sort-by" v-on:click="sortListByDay">Ngày và giờ</a>
                     </th>
                     <th scope="col">
                        <a prevent class="sort-by" v-on:click="sortListByState"> Trạng thái </a>
                     </th>
                     <th></th>
                  </tr>
               </thead>
               <tbody class="body-half-screen">
                  <tr v-for="(request, index) in customerConsultationsRequest" :key="index">
                     <td class="name">
                        <div class="wrapName">
                           <span></span>
                           <p>{{ request.doctorPharmacist }}</p>
                        </div>
                     </td>
                     <td class="time">
                        {{ splitDataToHour(new Date(Date.parse(request.time))) }}
                     </td>
                     <td>
                        <p class="status status-done">
                           {{ translatedState(request.state) }}
                        </p>
                     </td>
                     <td class="button">
                        <div class="fixed-style">
                          <Button
                            class="Button btn-submitManagement"
                            v-if="request.state == 'Waiting'"
                            v-on:click="cancelRequest(request.id)"
                          >Huỷ</Button>
                          <router-link
                            class="Button btn-submitManagement"
                            v-if="checkConditionToChangeDoctor(request)"
                            :to="{ name: 'CustomerChangeRequest',params: { id: request.id } }"
                          >Thay đổi bác sĩ</router-link>
                          <Button
                            class="Button btn-submitManagement"
                            v-if="request.state == 'Ignored' && request.reason"
                            v-on:click="showReasonIgnored(request)"
                          >Xem lý do</Button>
                        </div>
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
</template>
<script>
import CustomerManagement from "../Customer/CustomerManagement.vue";
import { mapActions, mapGetters } from "vuex";
import paging from "../../constants/paging";
import moment from 'moment';
// import { getRole } from "../../utils/helper";

export default {
   computed: {
      ...mapGetters([
         "customerConsultationsRequest", 
         "customerSortOrder", 
         "totalPages",
         "getQueryFilter",
         ]),
   },
   components: {
      CustomerManagement,
   },
   data() {
      return {
         pageNumber: 1,
      };
   },
   created() {
      this.customerGetConsultationsRequestList(this.getQueryFilter);
   },
   methods: {
      cancelRequest(consultationsRequestId) {
         this.$swal
            .fire({
               showDenyButton: true,
               title: "Bạn có chắc chắn muốn hủy?",
               text: "Bạn sẽ không thể khôi phục lại yêu cầu này nếu hủy bỏ",
               icon: "warning",
               confirmButtonText: "Chấp nhận hủy",
               denyButtonText: "Quay lại",
               dangerMode: true,
            })
            .then((result) => {
               if (result.isConfirmed) {
                  this.customerCancelConsultationsRequest(consultationsRequestId);
                  this.$swal.fire("Đã hủy yêu cầu", "", "info");
                  this.$router.go();
               }
            });
      },
      sortListByDay() {
         let query = this.getQueryFilter
         if(query.sortColumn != 'time'){
            query.sortColumn = 'time'
         }
         if(query.sortOrder == paging.DECSENDING){
            query.sortOrder = paging.ACCSENDING
         } else {
            query.sortOrder = paging.DECSENDING
         }
         this.queryFilterBy(query)
         this.customerGetConsultationsRequestList(this.getQueryFilter);
      },
      sortListByState() {
         let query = this.getQueryFilter
         if(query.sortColumn != 'state'){
            query.sortColumn = 'state'
         }
         if(query.sortOrder == paging.DECSENDING){
            query.sortOrder = paging.ACCSENDING
         } else {
            query.sortOrder = paging.DECSENDING
         }
         this.queryFilterBy(query)
         this.customerGetConsultationsRequestList(this.getQueryFilter);
      },
      sortListByDoctor() {
         let query = this.getQueryFilter
         if(query.sortColumn != 'doctorPharmacist'){
            query.sortColumn = 'doctorPharmacist'
         }
         if(query.sortOrder == paging.DECSENDING){
            query.sortOrder = paging.ACCSENDING
         } else {
            query.sortOrder = paging.DECSENDING
         }
         this.queryFilterBy(query)
         this.customerGetConsultationsRequestList(this.getQueryFilter);
      },
      goToPage(index) {
         let query = this.getQueryFilter
         query.page = index+1
         this.pageNumber = index+1
         this.queryFilterBy(query)
         this.customerGetConsultationsRequestList(this.getQueryFilter);
      },
      translatedState(state) {
         if (state == "Cancelled") {
            return "Đã huỷ";
         } else if (state == "Waiting") {
            return "Đang chờ xác nhận";
         } else if (state == "Confirmed") {
            return "Đã xác nhận";
         } else if (state == "Ignored") {
            return "Người tư vấn từ chối";
         } else if (state == "Done") {
            return "Đã hoàn thành";
         } else {
            return "Không trạng thái";
         }
      },
      splitDataToHour(dataTime) {
         return moment(dataTime).format('DD/MM/YYYY HH:mm');
      },
      checkConditionToChangeDoctor(request){
        const now = moment();
        const requestDay = moment(request.time);
        return request.state == 'Ignored' && (now.diff(requestDay,'days')<= -1);
      },
      showReasonIgnored(request){
        this.$swal.fire({
          title: 'Lý do',
          text: request.reason
        })
      },
      ...mapActions([
         "customerGetConsultationsRequestList", 
         "customerCancelConsultationsRequest",
         "queryFilterBy",
      ]),
   },
};
</script>
<style>
  .fixed-style{
    display: flex;
    flex-direction: column !important;
  }
</style>
