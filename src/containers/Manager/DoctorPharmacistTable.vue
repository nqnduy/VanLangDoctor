<template>
  <div class="doctorPharmacistTable">
    <div class="d-flex">
      <div class="filterDate">
        <input type="date" v-model="sortByDateFrom" class="inputManagement" />
      </div>
      <div>
        <h5 style="margin: 0.5rem 0px">đến</h5>
      </div>
      <div class="filterDate">
        <input type="date" v-model="sortByDateTo" class="inputManagement" />
      </div>
      <button class="vs-btn" @click="filterByDateFromTo">Lọc</button>
    </div>
    <DoctorPharmacistChart/>
    <div class="doctorPharmacistTable__table">
      <div class="doctorPharmacistTable__header">
      <div class="doctorPharmacistTable__header-title">
        Danh sách chi tiết buổi tư vấn của bác sĩ/dược sĩ
      </div>
      <div class="searchArea">
        <form
          action=""
          class="searchArea__search"
          @submit.prevent="searchByName"
        >
          <input
            type="text"
            placeholder="Tìm kiếm..."
            class="searchArea__search-input inputManagement"
            v-model="keyword"
          />
          <button class="searchArea__search-icon" type="submit">
            <img :src="require('../../assets/img/icons/search.svg')" />
          </button>
        </form>
      </div>
    </div>
      <table class="table-scroll small-first-col">
        <thead>
          <tr>
            <th scope="col">
              <a prevent class="sort-by" @click="filterByName">
                Bác sĩ/dược sĩ</a
              >
            </th>
            <th scope="col">
              <a prevent class="sort-by" @click="filterByUsername">Tên đăng nhập</a>
            </th>
            <th scope="col">
              <a prevent class="sort-by" @click="filterByDoneConsultation">Hoàn thành</a>
            </th>
            <th scope="col">
              <a prevent class="sort-by" @click="filterByWaitingConsultation">Đang chờ</a>
            </th>
            <th scope="col">
              <a prevent class="sort-by" @click="filterByCancelledConsultation">Bị huỷ</a>
            </th>
            <th scope="col">
              <a prevent class="sort-by" @click="filterByRating">Đánh giá</a>
            </th>
          </tr>
        </thead>
        <tbody class="body-half-screen">
          <tr
            v-for="(doctor, index) in getManagerStaticsAllConsultation.items"
            :key="index"
          >
            <td class="name">{{ doctor.fullName }}</td>
            <td class="userName">{{ doctor.userName }}</td>
            <td class="completed">{{ doctor.doneConsultation }}</td>
            <td class="waiting">{{ doctor.waitingConsultation }}</td>
            <td class="canceled">{{ doctor.cancelledConsultation }}</td>
            <td class="canceled">{{ doctor.rating }}</td>
          </tr>
        </tbody>
      </table>
      <ul class="paging">
        <li
          v-for="(page, index) in this.getManagerStaticsAllConsultation
            .totalPages"
          :key="index"
          @click="goToPage(index)"
          :class="{ current: index == pageNumber - 1 }"
        >
          <span>{{ index + 1 }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import paging from "../../constants/paging";
import DoctorPharmacistChart from "./DoctorPharmacistChart.vue";

export default {
  components:{
    DoctorPharmacistChart
  },
  computed: {
    ...mapGetters([
      "getManagerStaticsAllConsultation",
      "getManagerStaticsQueryFilter",
    ]),
  },
  data() {
    return {
      pageNumber: 0,
      sortByDateFrom: null,
      sortByDateTo: null,
      keyword: null,
    };
  },
  created() {
    let query = this.getManagerStaticsQueryFilter;
    this.managerGetStaticsAllConsultation(query)
  },
  methods: {
    goToPage(index) {
      let query = this.getManagerStaticsQueryFilter;
      query.page = index + 1;
      this.pageNumber = index + 1;
      this.queryFilterBy(query);
      this.managerGetStaticsAllConsultation(this.getManagerStaticsQueryFilter);
    },
    searchByName() {
      let query = {
        page: 1,
        sortColumn: "fullName",
        sortOrder: paging.DECSENDING,
        search: this.keyword,
        Limit: 10,
      };
      this.managerGetStaticsAllConsultation(query);
    },
    filterByName() {
      let query = this.getManagerStaticsQueryFilter;
      if (query.sortColumn != "fullName") {
        query.sortColumn = "fullName";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.managerGetStaticsAllConsultation(this.getManagerStaticsQueryFilter);
    },
    filterByDoneConsultation() {
      let query = this.getManagerStaticsQueryFilter;
      if (query.sortColumn != "doneConsultation") {
        query.sortColumn = "doneConsultation";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.managerGetStaticsAllConsultation(this.getManagerStaticsQueryFilter);
    },
    filterByCancelledConsultation() {
      let query = this.getManagerStaticsQueryFilter;
      if (query.sortColumn != "cancelledConsultation") {
        query.sortColumn = "cancelledConsultation";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.managerGetStaticsAllConsultation(this.getManagerStaticsQueryFilter);
    },
    filterByWaitingConsultation() {
      let query = this.getManagerStaticsQueryFilter;
      if (query.sortColumn != "waitingConsultation") {
        query.sortColumn = "waitingConsultation";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.managerGetStaticsAllConsultation(this.getManagerStaticsQueryFilter);
    },
    filterByRating() {
      let query = this.getManagerStaticsQueryFilter;
      if (query.sortColumn != "rating") {
        query.sortColumn = "rating";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.managerGetStaticsAllConsultation(this.getManagerStaticsQueryFilter);
    },
    filterByUsername() {
      let query = this.getManagerStaticsQueryFilter;
      if (query.sortColumn != "userName") {
        query.sortColumn = "userName";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.managerGetStaticsAllConsultation(this.getManagerStaticsQueryFilter);
    },
    filterByDateFromTo() {
      let query = this.getManagerStaticsQueryFilter;
      query.fromDate = this.sortByDateFrom
        ? this.sortByDateFrom
        : null;
      query.toDate = this.sortByDateTo ? this.sortByDateTo : null;
      const reflectDate = {
        fromDate: query.fromDate,
        toDate: query.toDate
      }
      this.setReflectByFollowingDate(reflectDate);
      this.queryFilterBy(query);
      this.managerGetStaticsAllConsultation(this.getManagerStaticsQueryFilter);
    },
    ...mapActions(["managerGetStaticsAllConsultation", "queryFilterBy",'setReflectByFollowingDate']),
  },
};
</script>

<style>
.d-flex {
  display: flex;
  justify-content: flex-end;
}
.d-flex > div {
  margin-left: 1rem;
}
.vs-btn {
  display: inline-block;
  padding: 0 1rem;
  margin-left: 1rem;
  border-radius: 0.2rem;
  border: 1px solid #50c4cf;
  background-color: #fff;
  color: #50c4cf;
  font-weight: bold;
}
.vs-btn:hover {
  background-color: #50c4cf;
  color: #fff;
  transition: 0.3s;
  cursor: pointer;
}
</style>