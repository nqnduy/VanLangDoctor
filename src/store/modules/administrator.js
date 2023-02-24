import RequestService from "../../services/request";
import EndPoints from "../../constants/endpoints";
import jwt_decode from "jwt-decode";
import paging from "../../constants/paging";

let tokenBearerStr = localStorage.getItem("token");

const state = () => ({
    adminReRenderKey:0,
    //
    admin: null,
    adminListAccount: null,
    adminDPAccountDetail: {},
    adminCategoryQuery: {
        page: 1,
        sortOrder: paging.ACCSENDING,
        sortColumn: "name",
        search: null,
        Limit: 10,
    },
    adminListCategory: [],
    adminMedicineList: [],
    adminMedicineListQuery:{
        page: 1,
        sortOrder: paging.ACCSENDING,
        sortColumn: "name",
        search: null,
        Limit: 10,
    },
    adminDetailsMedicine: null,
});

const getters = {
    adminReRenderKey: (state) => state.adminReRenderKey,
    admin: state => state.admin,
    getAdminListAccount: (state) => state.adminListAccount,
    getAdminDPAccountDetail: (state) => state.adminDPAccountDetail,
    getAdminCategoryQuery: (state) => state.adminCategoryQuery,
    getAdminListCategory: (state) => state.adminListCategory,
    getAdminMedicineList: (state) => state.adminMedicineList,
    getAdminMedicineListQuery: (state) => state.adminMedicineListQuery,
    getAdminDetailsMedicine: (state) => state.adminDetailsMedicine,
};

const actions = {
    incrementAdminRenderKey(context){
        let newKey = Math.random()*100000
        context.commit('setReRenderKey',newKey)
    },
    //////
    async adminLogin(context, formData) {
        state.token = await RequestService.axios
            .post(EndPoints.adminLogin, formData)
            .then((response) => {
                if(response.data.role === 'Admin' || response.data.role === 'Manager'){
                    localStorage.setItem('role',response.data.role)
                    if (
                        response.data.token != localStorage.token ||
                        localStorage.token == null
                    ) {
                        localStorage.setItem("token", response.data.token);
                        let adminInfo = jwt_decode(localStorage.token);
                        context.commit("setAdminInfo", adminInfo);
                    }
                }else{
                    return Promise.reject('not Authorization')
                }
            });
    },
    adminLogout(context) {
        context.commit("setEmptyAdmin");
    },
    adminLogged(context) {
        let adminInfo = jwt_decode(localStorage.token);
        context.commit("setAdminInfo", adminInfo);
    },
    async adminGetListAccountDP(context,query) {
        const searchParams = new URLSearchParams();
        if(query.Role && query.Role.length > 1) {
            query.Role.forEach(element => {
                searchParams.append('Role', element);
            });
        } else if(query.Role && query.Role.length === 1) {
            searchParams.append('Role', query.Role[0]);
        }
        if(query.Status && query.Status.length > 1) {
            query.Status.forEach(element => {
                searchParams.append('State', element);
            });
        } else if(query.Status && query.Status.length === 1) {
            searchParams.append('State', query.Status[0]);
        }
        searchParams.append('Limit',query.Limit)
        searchParams.append('Page',query.page)
        searchParams.append('SortOrder',query.sortOrder)
        searchParams.append('SortColumn',query.sortColumn)
        if(query.search){
            searchParams.append('Search',query.search)
        }
        await RequestService.axios
            .get(EndPoints.adminListDPAccount,{
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
            params: searchParams
            })
            .then((response)=>{
                context.commit('setAdminListDPAccount',response.data)
            })
    },
    async adminGetDPAccountDetails(context, id) {
        await RequestService.axios.get(EndPoints.adminDPAccountDetails(id), {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            }
        }).then((response)=> {
            context.commit('setAdminDPAccountDetail', response.data.value)
        });
    },
    async adminGetManageDPAccount(context, id) { // block or unblock
        await RequestService.axios.post(EndPoints.adminManageAccount, null , {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
            params: {
                userId: id
            }
        })
    },
    async adminCreateNewDPAccount(context, account) {
        const formData = new FormData();
        formData.append("ProfilePicture",account.ProfilePicture)
        delete account.ProfilePicture
        await RequestService.axios.post(EndPoints.adminCreateNewDPAccount,formData , {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
            params: account
        })
    },
    async adminUpdateNewDPAccount(context, account) {
        const formData = new FormData();
        formData.append("ProfilePicture",account.ProfilePicture)
        delete account.ProfilePicture
        await RequestService.axios.post(EndPoints.adminUpdateDPAccount,formData , {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
            params: account
        })
    },
    async adminGetCategory(context, query) {
        context.commit('setAdminCategoryQuery', query);
        const searchParams = new URLSearchParams();
        searchParams.append('Limit', query.Limit)
        searchParams.append('Page', query.page)
        searchParams.append('SortOrder', query.sortOrder)
        searchParams.append('SortColumn', query.sortColumn)
        if(query.search) {
            searchParams.append('Search', query.search)
        }
        await RequestService.axios.get(EndPoints.adminListcategory, {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
            params: searchParams
        }).then((response) => {
            context.commit('setAdminListCategory', response.data);
        });
    },
    async adminCreateNewCategory(context, newMedicineCategory) {
        await RequestService.axios.post(EndPoints.adminCreateCategory, null , {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
            params: newMedicineCategory
        })
        .then((response) => {
            const newMedicine = response.data;
            context.commit('setFirstNew',newMedicine);
        })
    },
    async adminUpdatedMedicineCategory(context, medicineCategoryUpdate) {
        await RequestService.axios.post(EndPoints.adminUpdatedNameMedicineCategory, null , {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
            params: medicineCategoryUpdate
        })
        .then((response) => {
            const newMedicine = response.data;
            context.commit('updatedListMedicineCategoryState',newMedicine);
        })
    },
    async adminDeleteCategory(context, medicineCategoryId) {
        await RequestService.axios.post(`${EndPoints.adminDeleteCategory}id=${medicineCategoryId}`, null, {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
        })
        .then(() => {
            context.commit('setNewListStateAfterDelete',medicineCategoryId)
        })
    },
    async adminGetMedicineList(context, query) {
        context.commit('setAdminMedicineListQuery', query);
        const searchParams = new URLSearchParams();
        searchParams.append('Limit', query.Limit)
        searchParams.append('Page', query.page)
        searchParams.append('SortOrder', query.sortOrder)
        searchParams.append('SortColumn', query.sortColumn)
        if(query.search) {
            searchParams.append('Search', query.search)
        }
        await RequestService.axios.get(EndPoints.adminGetMedicineList, {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
            params: searchParams
        }).then((response) => {
            context.commit('setAdminMedicineList', response.data);
        });
    },
    async adminGetDetailsMedicine(context, medicineId) {
        await RequestService.axios.get(`${EndPoints.adminGetMedicineList}/${medicineId}`, {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
        })
        .then((response) => {
            context.commit('setMedicineDetails',response.data)
        })
    },
    async adminCreateMedicine(context, newMedicine) {
        await RequestService.axios.post(EndPoints.adminCreateMedicine, newMedicine, {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
        })
        .then((response) => {
            context.commit('setNewListMedicineStateAfter',response.data)
        })
    },
    async adminUpdateMedicine(context, newMedicine) {
        await RequestService.axios.post(`${EndPoints.adminUpdateMedicine}id=${newMedicine.id}`, newMedicine, {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            },
        })
        .then((response) => {
            context.commit('setNewListMedicineStateAfterUpdateMedicine',response.data)
        })
    },
    async adminDeleteMedicine(context, medicineId) {
        await RequestService.axios.delete(`${EndPoints.adminDeleteMedicine}?id=${medicineId}`, {
            headers: {
                Authorization: `Bearer ${tokenBearerStr}`
            },
        })
        .then(() => {
            context.commit('setNewListStateAfterDeleteMedicine',medicineId)
        })
    },
};
const mutations = {
    setReRenderKey(state,newKey){
        state.adminReRenderKey = newKey
    },
    //
    setAdminInfo(state, adminInfo) {
        state.admin = adminInfo;
    },
    setEmptyAdmin(state) {
        state.admin = null;
        localStorage.clear();
    },
    setAdminListDPAccount(state,data) {
        state.adminListAccount = data
    },
    setAdminDPAccountDetail(state, details) {
        state.adminDPAccountDetail = details;
    },
    setAdminListCategory(state, categories) {
        state.adminListCategory = categories;
    },
    setAdminCategoryQuery(state, query) {
        state.adminCategoryQuery = query;
    },
    setFirstNew(state,newMedicine){
        state.adminListCategory.items.unshift(newMedicine);
    },
    updatedListMedicineCategoryState(state,newMedicine){
        state.adminListCategory.items.forEach((medicine,index)=>{
            if(medicine.id === newMedicine.id){
                state.adminListCategory.items.splice(index,1);
            }
        })
        state.adminListCategory.items.unshift(newMedicine);
    },
    setNewListStateAfterDelete(state,medicineId){
        state.adminListCategory.items.forEach((medicine,index)=>{
            if(medicine.id === medicineId){
                state.adminListCategory.items.splice(index,1);
            }
        })
    },
    setAdminMedicineListQuery(state, query) {
        state.adminMedicineListQuery = query;
    },
    setAdminMedicineList(state, data) {
        state.adminMedicineList = data;
    },
    setMedicineDetails(state, data){
        state.adminDetailsMedicine = data;
    },
    setNewListMedicineStateAfter(state,data) {
        state.adminMedicineList.items.unshift(data);
    },
    setNewListMedicineStateAfterUpdateMedicine(state,data) {  
        state.adminMedicineList.items.forEach((medicine,index)=>{
            if(medicine.id === data.id){
                state.adminMedicineList.items.splice(index,1);
            }
        })
        state.adminMedicineList.items.unshift(data);
    },
    setNewListStateAfterDeleteMedicine(state,medicineId){
        state.adminMedicineList.items.forEach((medicine,index)=>{
            if(medicine.id === medicineId){
                state.adminMedicineList.items.splice(index,1);
            }
        })
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
