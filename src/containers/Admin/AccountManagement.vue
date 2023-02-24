<template>
  <div class="adminAccountManagement">
    <AdminManagement :active="0" />
    <ThePopUpAccountDetail
      v-if="isShowPopupDetails"
      @closed-popup="closeDPAccountDetailsPopup"
    />
    <div class="wrapMain">
      <div class="content">
        <div class="tableManager">
          <p class="headline">Bác sĩ/dược sĩ</p>
          <div class="flexWrap">
            <router-link :to="{ name: 'AdminCreateAccount' }" class="createAccount">Tạo tài khoản</router-link>
            <div class="filterWrap">
              <div class="filter status">
                <div
                  class="filter__filterBy"
                  @click="isCheckBoxesStatus = !isCheckBoxesStatus"
                >
                  <input class="inputManagement" value="Trạng thái" readonly />
                  <!-- <i><img :src="require('../../assets/img/icons/dropdown.svg')" alt="" /></i> -->
                </div>
                <div class="filter__checkboxes" v-show="isCheckBoxesStatus">
                  <div class="filter__checkboxes-option">
                    <label>
                      <input
                        type="checkbox"
                        v-model="sortWithMultiStatus.NotBlocked"
                      />Bình thường
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="filter__checkboxes-option">
                    <label>
                      <input
                        type="checkbox"
                        v-model="sortWithMultiStatus.Blocked"
                      />Đã khoá
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="filter role">
                <div
                  class="filter__filterBy"
                  @click="isCheckBoxesRole = !isCheckBoxesRole"
                >
                  <input class="inputManagement" value="Vai trò" readonly />
                  <!-- <i><img :src="require('../../assets/img/icons/dropdown.svg')" alt="" /></i> -->
                </div>
                <div class="filter__checkboxes" v-show="isCheckBoxesRole">
                  <div class="filter__checkboxes-option">
                    <label>
                      <input
                        type="checkbox"
                        v-model="sortWithMultiRole.Doctor"
                      />Bác sĩ<span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="filter__checkboxes-option">
                    <label>
                      <input
                        type="checkbox"
                        v-model="sortWithMultiRole.Pharmacist"
                      />Dược sĩ<span class="checkmark"></span>
                    </label>
                  </div>
                </div>
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
          </div>
          <table class="table-scroll small-second-col">
            <thead>
              <tr>
                <div class="detailGroup">
                  <th scope="col">
                  <a prevent class="sort-by" @click="filterByUserName"
                    >Tên đăng nhập</a
                  >
                </th>
                <th scope="col">
                  <a prevent class="sort-by" @click="filterByName">Họ và tên</a>
                </th>
                <th scope="col">
                  <a prevent class="sort-by" @click="filterByBirthDay"
                    >Ngày sinh</a
                  >
                </th>
                <th scope="col">
                  <a prevent class="sort-by" @click="filterByRole">Vai trò</a>
                </th>
                <th scope="col">
                  <a prevent class="sort-by" @click="filterByStatus"
                    >Trạng thái</a
                  >
                </th>
                </div>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody class="body-half-screen">
              <tr
                class="clickable-row"
                v-for="(account, index) in getAdminListAccount.items"
                :key="index"
              >
              <div class="detailGroup" @click="showDetails(account.id)">
                <td class="userName">{{ account.userName }}</td>
                <td class="fullName">{{ account.fullName }}</td>
                <td class="dateOfBirth">
                  {{ transferDataDate(account.dateOfBirth) }}
                </td>
                <td class="role">{{ transferDataRoles(account.role) }}</td>
                <td class="status">
                  {{ transferDataStatus(account.isDisabled) }}
                </td>
              </div>
                <td @click.prevent="">
                  <div class="action">
                    <router-link :to="{ name: 'AdminUpdateAccount', params: { id: account.id } }" class="action-editAccount">
                      <img
                        :src="
                          require('../../assets/img/icons/edit-account.svg')
                        "
                        alt=""
                      />
                    </router-link>
                    <div>
                      <!-- Block account option icon -->
                      <div
                        class="action-blockAccount z-index-greater"
                        v-if="!account.isDisabled"
                        @click="manageAccount(account)"
                      >
                        <img
                          :src="
                            require('../../assets/img/icons/block-account.svg')
                          "
                          alt=""
                        />
                      </div>
                      <!-- Unblock account option icon -->
                      <div
                        class="action-unblockAccount z-index-greater"
                        v-else
                        @click="manageAccount(account)"
                      >
                        <img
                          :src="
                            require('../../assets/img/icons/unblock-account.svg')
                          "
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <ul class="paging">
            <li
              v-for="(page, index) in getAdminListAccount.totalPages"
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
import ThePopUpAccountDetail from "../../components/ThePopUpAccountDetail.vue";
import { mapActions, mapGetters } from "vuex";
import paging from "../../constants/paging";
import { convertDateOfBirth, getRole } from "../../utils/helper";

export default {
  components: {
    AdminManagement,
    ThePopUpAccountDetail,
  },
  computed: {
    ...mapGetters([
      "getAdminListAccount",
      "getAdminStaticsQueryFilter",
      "adminReRenderKey",
    ]),
  },
  data() {
    return {
      pageNumber: 1,
      isCheckBoxesStatus: false,
      isCheckBoxesRole: false,
      sortWithMultiRole: {
        Doctor: false,
        Pharmacist: false,
      },
      sortWithMultiStatus: {
        Blocked: false,
        NotBlocked: false,
      },
      keyword: null,
      isShowPopupDetails: false,
      render: 0,
    };
  },
  created() {
    let query = this.getAdminStaticsQueryFilter;
    this.adminGetListAccountDP(query);
  },
  methods: {
    goToPage(index) {
      let query = this.getAdminStaticsQueryFilter;
      query.page = index + 1;
      this.pageNumber = index + 1;
      this.queryFilterBy(query);
      this.adminGetListAccountDP(query);
    },
    transferDataDate: convertDateOfBirth,
    transferDataRoles: getRole,
    transferDataStatus(dataStatus) {
      return dataStatus ? "Đã Khóa" : "Bình thường";
    },
    filterByName() {
      let query = this.getAdminStaticsQueryFilter;
      if (query.sortColumn != "fullName") {
        query.sortColumn = "fullName";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.adminGetListAccountDP(this.getAdminStaticsQueryFilter);
    },
    filterByUserName() {
      let query = this.getAdminStaticsQueryFilter;
      if (query.sortColumn != "userName") {
        query.sortColumn = "userName";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.adminGetListAccountDP(this.getAdminStaticsQueryFilter);
    },
    filterByRole() {
      let query = this.getAdminStaticsQueryFilter;
      if (query.sortColumn != "role") {
        query.sortColumn = "role";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.adminGetListAccountDP(this.getAdminStaticsQueryFilter);
    },
    filterByStatus() {
      let query = this.getAdminStaticsQueryFilter;
      if (query.sortColumn != "isDisabled") {
        query.sortColumn = "isDisabled";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.adminGetListAccountDP(this.getAdminStaticsQueryFilter);
    },
    filterByBirthDay() {
      let query = this.getAdminStaticsQueryFilter;
      if (query.sortColumn != "dateOfBirth") {
        query.sortColumn = "dateOfBirth";
      }
      if (query.sortOrder == paging.DECSENDING) {
        query.sortOrder = paging.ACCSENDING;
      } else {
        query.sortOrder = paging.DECSENDING;
      }
      this.queryFilterBy(query);
      this.adminGetListAccountDP(this.getAdminStaticsQueryFilter);
    },
    queryListWithMultiRole() {
      let roleArray = [];
      for (const key in this.sortWithMultiRole) {
        if (Object.hasOwnProperty.call(this.sortWithMultiRole, key)) {
          const element = this.sortWithMultiRole[key];
          if (element) {
            roleArray.push(key);
          }
        }
      }
      let query = this.getAdminStaticsQueryFilter;
      query.Role = roleArray;
      this.adminGetListAccountDP(this.getAdminStaticsQueryFilter);
    },
    queryListWithMultiStatus() {
      let sttArray = [];
      for (const key in this.sortWithMultiStatus) {
        if (Object.hasOwnProperty.call(this.sortWithMultiStatus, key)) {
          const element = this.sortWithMultiStatus[key];
          if (element) {
            sttArray.push(key);
          }
        }
      }
      let query = this.getAdminStaticsQueryFilter;
      query.Status = sttArray;
      this.adminGetListAccountDP(this.getAdminStaticsQueryFilter);
    },
    searchByName() {
      let query = this.getAdminStaticsQueryFilter;
      query.search = this.keyword;
      this.adminGetListAccountDP(query);
    },
    showDetails(id) {
      this.adminGetDPAccountDetails(id).then(() => {
        this.isShowPopupDetails = true;
      });
    },
    closeDPAccountDetailsPopup() {
      this.isShowPopupDetails = false;
    },
    manageAccount(account) {
      if (account.isDisabled) {
        this.$swal
          .fire({
            showDenyButton: true,
            title: "Bạn có chắc chắn muốn Mở tài khoản này?",
            icon: "warning",
            confirmButtonText: "Mở khóa",
            denyButtonText: "Hủy",
            dangerMode: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.adminGetManageDPAccount(account.id).then(() => {
                let query = this.getAdminStaticsQueryFilter;
                this.adminGetListAccountDP(query);
              });
            }
          });
      } else {
        this.$swal
          .fire({
            showDenyButton: true,
            title: "Bạn có chắc chắn muốn khóa tài khoản này?",
            icon: "warning",
            confirmButtonText: "Khóa tài khoản",
            denyButtonText: "Hủy",
            dangerMode: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.adminGetManageDPAccount(account.id).then(() => {
                let query = this.getAdminStaticsQueryFilter;
                this.adminGetListAccountDP(query);
              });
            }
          });
      }
    },
    ...mapActions([
      "adminGetListAccountDP",
      "queryFilterBy",
      "adminGetDPAccountDetails",
      "adminGetManageDPAccount",
      "incrementAdminRenderKey",
    ]),
  },
  watch: {
    sortWithMultiRole: {
      handler: function () {
        this.queryListWithMultiRole();
      },
      deep: true,
    },
    sortWithMultiStatus: {
      handler: function () {
        this.queryListWithMultiStatus();
      },
      deep: true,
    },
    isShowPopupDetails: {},
  },
};
</script>
<style>
</style>
