
import paging from '../../constants/paging'
const state = () => ({
    queryFilter: {
        page: 1,
        sortOrder: paging.DECSENDING,
        sortColumn: "time",
        search: "",
    },
    doctorQueryFilter: {
        page: 1,
        sortOrder: paging.DECSENDING,
        sortColumn: "startTime",
        search: "",
    },
    managerStaticsQueryFilter: {
        page: 1,
        sortOrder: paging.DECSENDING,
        sortColumn: "fullName",
        search: null,
        toDate: null,
        fromDate: null,
        Limit: 10,
    },
    adminStaticsQueryFilter: {
        page: 1,
        sortOrder: paging.ACCSENDING,
        sortColumn: "userName",
        search: null,
        Limit: 10,
        Role: null,
        Status: null,
    },
})

const getters = {
    getQueryFilter: (state) => state.queryFilter,
    getDoctorQueryFilter: (state) => state.doctorQueryFilter,
    getManagerStaticsQueryFilter: (state) => state.managerStaticsQueryFilter,
    getAdminStaticsQueryFilter: (state) => state.adminStaticsQueryFilter,
}

const actions = {
    queryFilterBy(context, query){
        context.commit('setQueryFilter',query);
    },
    queryFilterReset(context){
        let queryReset = {
            page: 1,
            sortOrder: paging.DECSENDING,
            sortColumn: "time",
         }
        context.commit('setQueryFilter',queryReset)
    }
}
const mutations = {
    setQueryFilter(state, query){
        state.queryFilter = query
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}