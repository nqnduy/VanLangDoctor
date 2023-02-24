<template>
  <div class="medicineList">
    <AdminManagement :active="2" />
    <ThePopUpMedicineDetail 
      :medicine="medicineChoose" 
      v-if="isOpenMedicineDetailsPopup"
      @closed-popup-medicine-details="closePopupMedicineDetails"
    />
    <div class="wrapMain">
      <div class="content">
        <div class="tableManager">
          <div class="flexWrap">
            <div class="createAccount" @click="goToCreateMedicine">Tạo thông tin thuốc</div>
            <div class="filterWrap">
              <div class="searchArea">
                <form action="" class="searchArea__search" @submit.prevent="searchByName">
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
          </div>
          <table class="table-scroll medicineList">
            <thead>
              <tr>
                <div class="detailGroup">
                  <th scope="col">
                    <a prevent class="sort-by"
                        @click="sortByColumnTitle('name')"
                    > Tên thuốc </a>
                  </th>
                  <th scope="col">
                    <a prevent class="sort-by"
                        @click="sortByColumnTitle('categoryName')"
                    > Danh mục thuốc </a>
                  </th>
                  <th scope="col">
                    <a prevent class="sort-by"
                        @click="sortByColumnTitle('unit')"
                    > Đơn vị tính </a>
                  </th>
                  <th scope="col">
                    <a prevent class="sort-by"
                        @click="sortByColumnTitle('registeredNumber')"
                    > Số đăng ký </a>
                  </th>
                </div>
                <th></th>
              </tr>
            </thead>
            <tbody class="body-half-screen">
              <tr
                class="clickable-row"
                v-for="(medicine, index) in getAdminMedicineList.items"
                :key="index"
              >
                <div class="detailGroup" @click="showMedicineDetails(medicine.id)">
                  <td class="medicineName">{{medicine.name}}</td>
                  <td class="category">{{medicine.categoryName}}</td>
                  <td class="unit">{{medicine.unit}}</td>
                  <td class="registrationID">{{medicine.registeredNumber}}</td>
                </div>
                <td>
                  <div class="action">
                    <router-link :to="{ name: 'AdminUpdateMedicine', params: { id: medicine.id } }"  class="action-editMedicine">
                      <img
                        :src="
                          require('../../assets/img/icons/edit-account.svg')
                        "
                        alt=""
                      />
                    </router-link>

                    <div
                      :class="
                        !medicine.isAbleToDelete
                          ? 'action-deleteCategory z-index-greater disabled'
                          : 'action-deleteCategory z-index-greater'
                      "
                    >
                      <img
                        :src="require('../../assets/img/icons/delete.svg')"
                        alt=""
                        @click="deleteMedicine(medicine.id)"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <ul class="paging">
            <li
              v-for="(page, index) in getAdminMedicineList.totalPages"
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
  </div>
</template>

<script>
import AdminManagement from "./AdminManagement.vue";
import ThePopUpMedicineDetail from '../../components/ThePopUpMedicineDetail.vue'
import { mapActions, mapGetters } from "vuex";
import paging from "../../constants/paging";
export default {
  components: {
    AdminManagement,
    ThePopUpMedicineDetail,
  },
  computed: {
    ...mapGetters(["getAdminMedicineListQuery", "getAdminMedicineList","getAdminDetailsMedicine"]),
  },
  data() {
    return {
      pageNumber: 1,
      keyword: null,
      medicineChoose: null,
      isOpenMedicineDetailsPopup: false,
    };
  },
  created() {
    if(!this.getAdminMedicineList.items){
      let query = this.getAdminMedicineListQuery;
      query.sortColumn = 'name';
      query.sortOrder = paging.ACCSENDING;
      this.adminGetMedicineList(query);
    }
  },
  methods: {
    goToCreateMedicine(){
      this.$router.push({ path: 'createmedicine' })
    },
    goToPage(index) {
      let query = this.getAdminMedicineListQuery;
      query.page = index + 1;
      this.pageNumber = index + 1;
      this.adminGetMedicineList(query);
    },
    sortByColumnTitle(column) {
      let query = this.getAdminMedicineListQuery;
      if(query.sortColumn == column) {
        if (query.sortOrder == paging.ACCSENDING) {
          query.sortOrder = paging.DECSENDING;
        } else {
          query.sortOrder = paging.ACCSENDING;
        }
      } else {
        query.sortColumn = column;
        query.sortOrder = paging.ACCSENDING;
      }
      
      this.adminGetMedicineList(query);
    },
    searchByName() {
      let query = this.getAdminMedicineListQuery;
      query.search = this.keyword;
      this.adminGetMedicineList(query);
    },
    showMedicineDetails(medicineId){
      this.adminGetDetailsMedicine(medicineId)
        .then(()=>{
          this.isOpenMedicineDetailsPopup = true;
          this.medicineChoose = this.getAdminDetailsMedicine;
        })
    },
    closePopupMedicineDetails(){
      this.isOpenMedicineDetailsPopup = false;
      this.medicineChoose = null;
    },
    deleteMedicine(medicineId){
      this.$swal
        .fire({
          showDenyButton: true,
          title: "Bạn có chắc muốn xóa thông tin thuốc này?",
          icon: "warning",
          confirmButtonText: "Xóa thông tin",
          denyButtonText: "Hủy",
          dangerMode: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.adminDeleteMedicine(medicineId).then(()=>{
              this.$swal.fire("Xóa thông tin thuốc thành công", "", "success");
            })
            .catch((error) => {
                  this.$swal.fire(error.response.data, "", "error");
            });
          }
        });
    },
    ...mapActions(["adminGetMedicineList","adminGetDetailsMedicine",'adminDeleteMedicine']),
  },
};
</script>

<style scoped>
</style>
