<template>
    <div class="medicineCategoryList">
        <AdminManagement :active="1" isChild="yes" childTitle="Danh mục thuốc" :key="adminReRenderKey"/>
        <CreateMedicineCategory v-if="showCreateMedicine" @closed-popup="closeCreateMedicine" :show="isOpenPopup"/>
        <UpdateMedicineCategory v-if="showUpdateMedicine" @closed-popup-update="closeUpdateMedicine" :show="isOpenPopup" :category="editCategory"/>
        <div class="wrapMain" >
            <div class="content">
                <div class="tableManager">
                    <div class="flexWrap">
                        <div class="createAccount" @click="openCreateMedicinePopup">Tạo danh mục</div>
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
                    <table class="table-scroll small-second-col">
                        <thead>
                            <tr>
                                <div class="detailGroup">
                                    <th scope="col">
                                        <a prevent
                                            class="sort-by medicine-category"
                                            @click="sortByColumnTitle('name')">
                                            Tên danh mục
                                        </a>
                                    </th>
                                </div>
                                 <th ></th>
                            </tr>
                        </thead>
                        <tbody class="body-half-screen">
                            <tr class="clickable-row"
                                v-for="(category, index) in getAdminListCategory.items"
                                :key="index">
                                <div class="detailGroup">
                                    <td class="userName">{{ category.name }}</td>
                                </div>
                                <td @click.prevent="">
                                    <div class="action">
                                        <div class="action-editCategory" @click="openUpdateMedicinePopup(category)">
                                            <img :src="require('../../assets/img/icons/edit-account.svg')" alt="" />
                                        </div>

                    <div
                      :class="
                        !category.isAbleToDelete
                          ? 'action-deleteCategory z-index-greater disabled'
                          : 'action-deleteCategory z-index-greater'
                      "
                      @click="adminDeleted(category.id)"
                    >
                      <img
                        :src="require('../../assets/img/icons/delete.svg')"
                        alt=""
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <ul class="paging">
            <li
              v-for="(page, index) in getAdminListCategory.totalPages"
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
import CreateMedicineCategory from "./CreateMedicineCategory.vue";
import UpdateMedicineCategory from "./UpdateMedicineCategory.vue"
import { mapActions, mapGetters } from "vuex";
import paging from "../../constants/paging";

export default {
    components: {
        AdminManagement,
        CreateMedicineCategory,
        UpdateMedicineCategory,
    },
    computed: {
        ...mapGetters([
            "getAdminCategoryQuery",
            "getAdminListCategory",
            'adminReRenderKey'
        ]),
    },
    data() {
        return {
            pageNumber: 1,
            keyword: null,
            showCreateMedicine: false,
            showUpdateMedicine: false,
            isOpenPopup: false,
            editCategory: null,
        }
    },
    created() {
        let query = this.getAdminCategoryQuery;
        this.adminGetCategory(query)
    },
    methods: {
      openCreateMedicinePopup(){
        this.showCreateMedicine = !this.showCreateMedicine
        this.isOpenPopup = !this.isOpenPopup
      },
      openUpdateMedicinePopup(category){
        this.editCategory = category;
        this.showUpdateMedicine = !this.showUpdateMedicine
        this.isOpenPopup = !this.isOpenPopup
      },
      goToPage(index) {
        let query = this.getAdminCategoryQuery;
        query.page = index + 1;
        this.pageNumber = index + 1;
        this.adminGetCategory(query);
      },
      closeCreateMedicine(value) {
        this.showCreateMedicine = value.isPopupOpen;
        this.isOpenPopup = value.hiddenError;
      },
      closeUpdateMedicine(value) {
        this.showUpdateMedicine = value.isPopupOpen;
        this.isOpenPopup = value.hiddenError;
      },
      sortByColumnTitle(column) {
        let query = this.getAdminCategoryQuery;
        if (query.sortColumn != column) {
          query.sortColumn = column;
        }
        if (query.sortOrder == paging.DECSENDING) {
          query.sortOrder = paging.ACCSENDING;
        } else {
          query.sortOrder = paging.DECSENDING;
        }
        this.adminGetCategory(query);
      },
      searchByName() {
        let query = this.getAdminCategoryQuery;
        query.search = this.keyword;
        this.adminGetCategory(query);
      },
      adminDeleted(medicineId) {
        this.$swal
          .fire({
            showDenyButton: true,
            title: "Bạn có chắc muốn xóa danh mục này?",
            icon: "warning",
            confirmButtonText: "Xóa danh mục",
            denyButtonText: "Hủy",
            dangerMode: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.adminDeleteCategory(medicineId);
            }
          });
      },
      ...mapActions(["adminGetCategory", "adminDeleteCategory"]),
  },
};
</script>

<style></style>
