import RequestService from "../../services/request";
import EndPoints from "../../constants/endpoints";
import paging from "../../constants/paging"


let tokenBearerStr = localStorage.getItem("token");

const state = () => ({
    managerRequestList: null,
    managerStaticsPrescriptionConsultation: null,
    managerStaticsAllRating: null,
    managerStaticsAllRatio: null,
    managerStaticsAllConsultationRatio: null,
    managerStaticsAllConsultation: null,
    reflectDate: null,
});

const getters = {
    managerRequestList: state => state.managerRequestList,
    getManagerStaticsPrescriptionConsultation: (state) => state.managerStaticsPrescriptionConsultation,
    getManagerStaticsAllRating: (state) => state.managerStaticsAllRating,
    getManagerStaticsAllRatio: (state) => state.managerStaticsAllRatio,
    getManagerStaticsAllConsultationRatio: (state) => state.managerStaticsAllConsultationRatio,
    getManagerStaticsAllConsultation: (state) => state.managerStaticsAllConsultation,
    getReflectDate: (state) => state.reflectDate,
};

const actions = {
    async managerGetRequestList(context, query) {
      const searchParams = new URLSearchParams();
      if(query.states && query.states.length >1){
        query.states.forEach(element => {
          searchParams.append('RequestState', element);
        });
      } else if(query.states && query.states.length === 1) {
        searchParams.append('RequestState', query.states[0]);
      }
      searchParams.append('Limit',paging.DEFAULT_PAGE_LIMIT)
      searchParams.append('Page',query.page ?? 1)
      searchParams.append('Time',query.time ?? '')
      searchParams.append('SortOrder',query.sortOrder ?? paging.DECSENDING)
      searchParams.append('SortColumn',query.sortColumn ?? 'time')
      if(query.keyword){
        searchParams.append('Search',query.keyword)
      }

      await RequestService.axios
      .get(EndPoints.managerRequestList, {
          headers: {
              "Authorization": `Bearer ${tokenBearerStr}`
          },
          params: searchParams
      })
      .then((response) => {
          let consultationsListResponse = response.data.items
          let totalPageResponse = response.data.totalPages

          let data = {
              "query": consultationsListResponse,
              "totalPages": totalPageResponse
          }
          context.commit("setManagerRequestList", data);
      })
    },
    async managerGetStaticsPrescriptionConsultation(context,query) {
      await RequestService.axios
        .get(EndPoints.managerStaticsPrescriptionConsultation,{
          headers: {
            "Authorization": `Bearer ${tokenBearerStr}`
        },
          params: query
        })
        .then((response)=>{
          context.commit('setManagerStaticsPrescriptionConsultation',response.data)
        })
    },
    async managerGetStaticsAllRating(context,query) {
      await RequestService.axios
        .get(EndPoints.managerStaticsAllRating,{
          headers: {
            "Authorization": `Bearer ${tokenBearerStr}`
        },
          params: query
        })
        .then((response)=>{
          context.commit('setManagerGetStaticsAllRating',response.data)
        })
    },
    async managerGetStaticsAllRatio(context) {
      await RequestService.axios
        .get(EndPoints.managerStaticsAllRatio,{
          headers: {
            "Authorization": `Bearer ${tokenBearerStr}`
          }
        })
        .then((response)=>{
          context.commit('setManagerGetStaticsAllRatio',response.data.value)
        })
    },
    async managerGetStaticsAllConsultationRatio(context,byDate) {
      await RequestService.axios
        .get(EndPoints.managerStaticsAllConsultationRatio,{
          headers: {
            "Authorization": `Bearer ${tokenBearerStr}`
          },
          params: byDate
        })
        .then((response)=>{
          context.commit('setStaticsAllConsultationRatio',response.data.value)
        })
    },
    async managerGetStaticsAllConsultation(context,query) {
      await RequestService.axios
        .get(EndPoints.managerStaticsAllConsultationStatistic,{
          headers: {
            "Authorization": `Bearer ${tokenBearerStr}`
          },
          params: query
        })
        .then((response)=>{
          context.commit('setManagerStaticsAllConsultation',response.data.value)
        })
    },
    setReflectByFollowingDate(context,date){ // set Date for consultation ratio when table filter by date
      context.commit('setReflectByDate',date);
    }

};
const mutations = {
    setManagerRequestList(state, data) {
        state.managerRequestList = data
    },
    setManagerStaticsPrescriptionConsultation(state,data){
      state.managerStaticsPrescriptionConsultation = data
    },
    setManagerGetStaticsAllRating(state,data){
      state.managerStaticsAllRating = data
    },
    setManagerGetStaticsAllRatio(state,data){
      state.managerStaticsAllRatio = data
    },
    setStaticsAllConsultationRatio(state,data){
      state.managerStaticsAllConsultationRatio = data
    },
    setManagerStaticsAllConsultation(state,data){
      state.managerStaticsAllConsultation = data
    },
    setReflectByDate(state,date){
      state.reflectDate = date;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
