import RequestService from "../../services/request";
import EndPoints from "../../constants/endpoints";
import jwt_decode from "jwt-decode";
import paging from "../../constants/paging"

let tokenBearerStr = localStorage.getItem("token");

const state = () => ({
    reRenderKey:0,
    doctor: "",
    doctorList: null,
    doctorSchedule: null,
    totalSchedule: 0,
    doctorDashboardContent:null,
    hostURL: null, 
    totalRequest:0,
    listCustomerConsultation:{
        list:null,
        totalPages:0,
    },
    doctorConsultationRequestList:null,
    customerInformation: null,
    listMedicine: null,
    medicalRecordResult: null,
    doctorInformation: null,
    doctorNotification: [],
    countNotification: 0,
});

const getters = {
    reRenderKey: (state) => state.reRenderKey,
    doctor: state => state.doctor,
    doctorList: state => state.doctorList,
    doctorSchedule: (state) => state.doctorSchedule,
    totalSchedule: (state) => state.totalSchedule,
    doctorDashboardContent: (state) => state.doctorDashboardContent,
    hostURL: (state) => state.hostURL,
    listCustomerConsultation: (state) => state.listCustomerConsultation,
    doctorConsultationRequestList: (state) => state.doctorConsultationRequestList,
    customerInformation: (state) => state.customerInformation,
    listMedicine: (state) => state.listMedicine,
    medicalRecordResult: (state) => state.medicalRecordResult,
    doctorInformation: (state) => state.doctorInformation,
    getDoctorNotification: (state) => state.doctorNotification,
    doctorGetCountNotification: (state) => state.countNotification,
};



const actions = {
    incrementRenderKey(context){
        let newKey = Math.random()*100000
        context.commit('setReRenderKey',newKey)
    },
    //////
    async doctorLogin(context, formData) {
        state.token = await RequestService.axios
            .post(EndPoints.doctorLogin, formData)
            .then((response) => {
                if(response.data.role == 'Doctor' || response.data.role === 'Pharmacist'){
                    localStorage.setItem('role',response.data.role)
                    if (
                        response.data.token != localStorage.token ||
                        localStorage.token == null
                    ) {
                        localStorage.setItem("token", response.data.token);
                        let doctorInfo = jwt_decode(localStorage.token);
                        context.commit("setDoctorInfo", doctorInfo);
                    }
                }else{
                    return Promise.reject('not Authorization')
                }
            });
    },
    doctorLogout(context) {
        context.commit("setEmptyDoctor");
    },
    doctorLogged(context) {
        let doctorInfo = jwt_decode(localStorage.token);
        context.commit("setDoctorInfo", doctorInfo);
    },
    /**View Doctor Information*/
    async getDoctorList(context) {
        await RequestService.axios
            .get(EndPoints.getDoctorList)
            .then((response) => {
                context.commit("setDoctorList", response.data.value);
            });
    },
    /* Doctor consultation */
    async doctorGetSchedule(context, query) {
        await RequestService.axios
            .get(EndPoints.doctorSchedule, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
                params: {
                    Limit: paging.DEFAULT_PAGE_LIMIT, //default
                    Page: query.page,
                    SortOrder: query.sortOrder,
                    SortColumn: query.sortColumn,
                    Search: query.search,
                }
            })
            .then((response) => {
                let doctorSchedule = response.data.value.items
                let totalPageResponse = response.data.value.totalPages
                let totalToday = response.data.value.totalItems

                let data = {
                    "query": doctorSchedule,
                    "totalPages": totalPageResponse,
                    "totalToday": totalToday
                }
                context.commit("setDoctorSchedule", data);
            })
    },
    async doctorGetDashboardContent(context) {
        await RequestService.axios
            .get(EndPoints.doctorGetNextCustomer, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
            })
            .then((response) => {
                let totalRequestConsultationNumber = response.data.totalRequestConsultationNumber
                let totalIncomingConsultationNumber = response.data.totalIncomingConsultationNumber
                let nextCustomer = response.data.nextCustomer
                let data = {
                    "requestCount": totalRequestConsultationNumber,
                    "consultationCount": totalIncomingConsultationNumber,
                    "nextCustomer": nextCustomer,
                }
                context.commit("setDoctorDashboard", data);
            })
    },
    async doctorOpenMeeting(context,consultationId){
        await RequestService.axios
            .get(EndPoints.doctorOpenMeetingZoom + consultationId, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
            })
            .then((response) => {
                let link = response.data.value.hostUrl
                context.commit("setDoctorHostLink", link);
            })
    },
    async doctorCloseMeeting(context,consultationId){
        await RequestService.axios
            .get(EndPoints.doctorCloseMeetingZoom + consultationId, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
            })
    },
    async doctorCancelConsultation(context,cancelConsultation){
        await RequestService.axios
            .post(EndPoints.doctorCancelConsultation + cancelConsultation.id,cancelConsultation, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
            })
    },
    async doctorGetListCustomerConsultation(context, query) {
        if(query.optionalSortList){
            if(query.optionalSortList === 'IsSortedByNextConsultation'){
                await RequestService.axios
                    .get(EndPoints.doctorGetListCustomerConsultation, {
                        headers: {
                            "Authorization": `Bearer ${tokenBearerStr}`
                        },
                        params: {
                            Limit: paging.DEFAULT_PAGE_LIMIT, //default
                            Page: query.page ?? 1,
                            IsSortedByNextConsultation: true,
                            Search: query.search ?? null
                        }
                    })
                    .then((response) => {
                        let data = {
                            "list": response.data.items,
                            "totalPages": response.data.totalPages
                        }
                        context.commit("setCustomerListConsultation", data);
                    });
            }else{
                await RequestService.axios
                    .get(EndPoints.doctorGetListCustomerConsultation, {
                        headers: {
                            "Authorization": `Bearer ${tokenBearerStr}`
                        },
                        params: {
                            Limit: paging.DEFAULT_PAGE_LIMIT, //default
                            Page: query.page ?? 1,
                            IsSortedByPreviousConsultation: true,
                            Search: query.search ?? null
                        }
                    })
                    .then((response) => {
                        let data = {
                            "list": response.data.items,
                            "totalPages": response.data.totalPages
                        }
                        context.commit("setCustomerListConsultation", data);
                    });
            }
        }else{
            await RequestService.axios
                .get(EndPoints.doctorGetListCustomerConsultation, {
                    headers: {
                        "Authorization": `Bearer ${tokenBearerStr}`
                    },
                    params: {
                        Limit: paging.DEFAULT_PAGE_LIMIT, //default
                        Page: query.page ?? 1,
                        Search: query.search ?? null
                    }
                })
                .then((response) => {
                    let data = {
                        "list": response.data.items,
                        "totalPages": response.data.totalPages
                    }
                    context.commit("setCustomerListConsultation", data);
                });
        }
    },
    async doctorGetConsultationRequest(context,queryParams ){
        let date = queryParams.date ?? new Date(Date.now()).toISOString()
        if(queryParams.PagingEnum){
            date = null
        }
        await RequestService.axios
            .get(EndPoints.doctorGetConsultationRequestList, {
                headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
                },
                params:{
                    Date: date ,
                    PagingEnum: queryParams.PagingEnum ?? 'Default',
                }
        })
        .then((response)=>{
            context.commit('setDoctorConsultationRequestList',response.data)
        })
    },
    async doctorApproveConsultationRequest(context,request){
        const sameTimeRequestPost = { sameTimeRequests: request.sameTimeRequests }
        await RequestService.axios
            .post(EndPoints.doctorApproveConsultationRequest+request.id, sameTimeRequestPost,{
                headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
                }
        })
    },
    async doctorIgnoreConsultationRequest(context,request){
        const reason = { reason: request.reason }
        await RequestService.axios
            .post(EndPoints.doctorIgnoreConsultationRequest+request.id, reason,{
                headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
                }
        })
    },
    async doctorGetInformationCustomer(context,customerId){
        await RequestService.axios
            .get(EndPoints.doctorGetInformationCustomer+customerId,{
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                }
            })
            .then((response)=>{
                context.commit('setCustomerInformation',response.data)
            })
    },
    async doctorGetMedicine(context,keyword){
        const search = keyword ?? ''
        await RequestService.axios
            .get(EndPoints.doctorGetMedicine,{
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
                params:{
                    search: search
                }
            })
            .then((response)=>{
                context.commit('setListMedicine',response.data)
            })
    },
    async doctorSubmitMedicalRecord(context,medicalRecord){
        await RequestService.axios
            .post(EndPoints.doctorSubmitMedicalRecord,medicalRecord,{
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
            })
    },
    async doctorGetCustomerMedicalRecord(context,medicalRecordId){
        await RequestService.axios
            .get(`${EndPoints.doctorGetCustomerMedicalRecord}${medicalRecordId}`,{
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
            })
            .then((response)=>{
                context.commit('setMedicalRecordResult',response.data)
            })
    },
    async doctorGetOwnedInformation(context) {
        await RequestService.axios
            .get(EndPoints.doctorGetOwnedInformation, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                }
            })
            .then((response) => {
                context.commit('setDoctorInformation', response.data)
            });
    },
    async doctorUpdateInformation(context, updatedInformation) {
        await RequestService.axios
            .post(EndPoints.doctorUpdateOwnedInformation, updatedInformation, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                }
            })
            .then((response) => {
                context.commit("setDoctorInformation", response.data);
            });
    },
    async doctorChangePassword(context, changedPassword) {
        await RequestService.axios
            .post(EndPoints.doctorUpdatePassword, changedPassword, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                }
            });
    },
};
const mutations = {
    setReRenderKey(state,newKey){
        state.reRenderKey = newKey
    },
    //
    setDoctorInfo(state, doctorInfo) {
        state.doctor = doctorInfo;
    },
    /**View Doctor Information*/
    setDoctorList(state, doctorListResponse) {
        state.doctorList = doctorListResponse;
    },
    /**=======*/
    setEmptyDoctor(state) {
        state.doctor = null;
        localStorage.clear()
    },
    setDoctorSchedule(state, data) {
        state.doctorSchedule = data.query
        state.doctorSortOrder = data.sortType
        state.totalSchedule = data.totalPages
        state.totalCustomerToday = data.totalToday
    },
    setDoctorDashboard(state,data){
        state.doctorDashboardContent = data
    },
    setDoctorHostLink(state,link){
        state.hostURL = link
    },
    setCustomerListConsultation(state,data){
        state.listCustomerConsultation.list = data.list
        state.listCustomerConsultation.totalPages = data.totalPages
    },
    setDoctorConsultationRequestList(state,data){
        state.doctorConsultationRequestList = data
    },
    setCustomerInformation(state,information){
        state.customerInformation = information
    },
    setListMedicine(state,data){
        state.listMedicine = data
    },
    setMedicalRecordResult(state,data){
        state.medicalRecordResult = data
    },
    setDoctorInformation(state, docInfor) {
        state.doctorInformation = docInfor;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
