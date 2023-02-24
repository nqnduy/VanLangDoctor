import RequestService from "../../services/request";
import EndPoints from "../../constants/endpoints";
import jwt_decode from "jwt-decode";
import paging from "../../constants/paging"

let tokenBearerStr = localStorage.getItem("token");

const state = () => ({
    customerReRenderKey:0,
    customer: "",
    customerConsultationsRequest: null,
    customerSortOrder: "Decsending",
    totalPages: 0,
    customerConsultationsList: null,
    totalConsultation: 0,
    doctorListConsultation: null,
    totalDoctor: 0,
    doctorChosen: null,
    meetingURL: null, 
    customerSelfInformation: null,
    customerMedicalRecord: null,
    customerChangeDoctorRequestedData: null,
    customerNotification: null,
});

const getters = {
    customerReRenderKey: (state) => state.customerReRenderKey,
    //
    customer: (state) => state.customer,
    customerConsultationsRequest: (state) => state.customerConsultationsRequest,
    customerSortOrder: (state) => state.customerSortOrder,
    totalPages: (state) => state.totalPages,
    customerConsultationsList: (state) => state.customerConsultationsList,
    totalConsultation: (state) => state.totalConsultation,
    doctorListConsultation: (state) => state.doctorListConsultation,
    totalDoctor: (state) => state.totalDoctor,
    doctorChosen: (state) => state.doctorChosen,
    meetingURL: (state) => state.meetingURL,
    customerSelfInformation: (state) => state.customerSelfInformation,
    customerMedicalRecord: (state) => state.customerMedicalRecord,
    customerChangeDoctorRequestedData: (state) => state.customerChangeDoctorRequestedData,
    customerNotification: (state) => state.customerNotification,
};

const actions = {
    incrementCustomerRenderKey(context){
        let randomKey = Math.floor(Math.random() * 10000);
        context.commit('setReRenderKey',randomKey)
    },
    //////
    async customerLogin(context, formData) {
        await RequestService.axios.post(EndPoints.customerLogin, formData)
            .then((response) => {
                if(response.data.role == 'Customer'){
                    localStorage.setItem('role',response.data.role)
                    if (
                        response.data.token != localStorage.token ||
                        localStorage.token == null
                    ) {
                        localStorage.setItem("token", response.data.token);
                        let customerInfo = response.data
                        context.commit('setCustomerInfo', customerInfo);
                    }
                }else{
                    return Promise.reject('not Authorization')
                }
            });
    },
    async customerRegister(context, formData) {
        await RequestService.axios
            .post(EndPoints.customerRegister, formData, )
    },
    async sendEmailVerify(context,email){
        await RequestService.axios
          .post(EndPoints.emailVerify,null,{
            params:{
              email: email
            }
          })
    },
    customerLogout(context) {
        context.commit("setEmptyCustomer");
    },
    customerLogged(context) {
        let customerInfo = jwt_decode(localStorage.token);
        context.commit("setCustomerInfo", customerInfo);
    },
    //consultations
    async customerGetConsultationsRequestList(context, query) {
        await RequestService.axios
            .get(EndPoints.getConsultationRequestList, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
                params: {
                    Limit: paging.DEFAULT_PAGE_LIMIT, //default
                    Page: query.page,
                    SortOrder: query.sortOrder,
                    SortColumn: query.sortColumn,
                }
            })
            .then((response) => {
                let consultationsListResponse = response.data.items
                let customerSortOrder = query.sortOrder
                let totalPageResponse = response.data.totalPages

                let data = {
                    "query": consultationsListResponse,
                    "sortType": customerSortOrder,
                    "totalPages": totalPageResponse
                }
                context.commit("setCustomerConsultationRequest", data);
            })
    },
    async customerCancelConsultationsRequest(context, consultationsRequestId) {
        await RequestService.axios
            .get(EndPoints.customerCancelConsultationsRequest, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
                params: {
                    consultationRequestId: consultationsRequestId
                }
            })
    },
    //consultations schedule
    async customerGetSchedule(context, page) {
        await RequestService.axios
            .get(EndPoints.getCustomerAllConsultations, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
                params: {
                    Limit: paging.DEFAULT_PAGE_LIMIT, //default
                    Page: page,
                    SortOrder: paging.DECSENDING
                }
            })
            .then((response) => {
                let data = {
                    "list": response.data.value.items,
                    "totalConsultation": response.data.value.totalPages
                }
                context.commit("setCustomerListConsultation", data);
            });
    },
    //consultation register
    async customerGetDoctorConsultation(context, params) {
        await RequestService.axios
            .get(EndPoints.customerSearchDoctorConsultation, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                },
                params: {
                    Search: params.search,
                    Limit: paging.DEFAULT_DOCTOR_LIMIT, //default
                    Page: params.page, 
                    SortOrder: 'Accsending', 
                    SortColumn: 'fullName' 
                }
            })
            .then((response) => {
                let data = {
                    "list": response.data.items,
                    "totalDoctorPage": response.data.totalPages
                }
                data.list.forEach((element, index) => {
                    element.order = index
                });
                context.commit("setDoctorListConsultation", data);
            });
    },
    async customerGetDoctorInformation(context, doctorId) {
        await RequestService.axios
            .get(EndPoints.customerGetDoctorInformation + doctorId, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                }
            })
            .then((response) => {
                let data = response.data
                context.commit("setDoctorChosenInformation", data);
            });
    },
    async customerRegisConsultation(context, registration) {
        await RequestService.axios
            .post(EndPoints.customerRegisterConsultation, registration, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                }
            })
    },
    async customerGetConsultationMeetingURL(context, consultationId) {
        await RequestService.axios
            .get(EndPoints.getMeetingURL + consultationId, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                }
            })
            .then((response) => {
                context.commit("setMeetingURL", response.data);
            });
    },
    async customerGetSelfInformation(context) {
        await RequestService.axios
            .get(EndPoints.customerGetSelfInformation, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                }
            })
            .then((response) => {
                context.commit("setCustomerSelfInformation", response.data.value);
            });
    },
    async customerUpdateSelfInformation(context, informationUpdated) {
        await RequestService.axios
        .post(EndPoints.customerUpdateSelfInformation,informationUpdated,{
            headers:{
                "Authorization": `Bearer ${tokenBearerStr}`
            }
        })
        .then((response)=>{
            context.commit("setCustomerSelfInformation", response.data.value);
        })
    },
    async customerGetMedicalRecord(context, consultationId) {
        await RequestService.axios
            .get(EndPoints.getCustomerMedicalRecord + consultationId, {
                headers: {
                    "Authorization": `Bearer ${tokenBearerStr}`
                }
            })
            .then((response) => {
                context.commit('setCustomerMedicalRecord',response.data)
            })
            .catch(()=>{
                context.commit('setCustomerMedicalRecord',null)
            })
    },
    async customerRatingConsultation(context, dataRating){
        await RequestService.axios
        .post(EndPoints.customerRating + dataRating.consultationId, dataRating, {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            }
        })
        .then(()=>{
            let randomKey = Math.floor(Math.random() * 10000);
            context.commit("setReRenderKey",randomKey)
        })
    },
    async customerChangeDoctorRequested(context, query){
      await RequestService.axios
        .get(EndPoints.customerChangeDoctorRequested,{
          headers: {
            "Authorization": `Bearer ${tokenBearerStr}`
          },
          params:{
            requestId : query.id,
            Limit: 5,
            Page: query.page ?? 1,
            Search: query.search ?? '',
          }
        })
        .then((response)=>{
          context.commit('setCustomerChangeDoctorRequestedData',response.data)
        })
    },
    async customerChangeRequest(context, data) {
        await RequestService.axios
            .post(EndPoints.customerChangeRequest, data, {
            headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
            }
        });
    },
    // async customerGetNotification(context) {
    //     await RequestService.axios
    //         .post(EndPoints.customerGetNotification,'',{
    //           headers: {
    //             "Authorization": `Bearer ${tokenBearerStr}`
    //           }
    //       })
    //       .then((response) => {
    //           context.commit('setCustomerNotification', response.data)
    //     });
    // },
    // customerAddNotification(context, newNotification) {
    //     context.commit('addCustomerNotification', newNotification);
    // },
    // async customerReadNotification(context,notiId){
    //   await RequestService.axios
    //   .get(EndPoints.doctorGetNotification,{
    //     headers: {
    //       "Authorization": `Bearer ${tokenBearerStr}`
    //     },
    //     params:{
    //       notificationId: notiId
    //     }
    //    })
    // },
};
const mutations = {
    setReRenderKey(state,newKey){
        state.customerReRenderKey = newKey
    },
    //
    setCustomerInfo(state, customerInfo) {
        state.customer = customerInfo;
    },
    setEmptyCustomer(state) {
        state.customer = null;
        localStorage.clear()
    },
    setCustomerConsultationRequest(state, data) {
        state.customerConsultationsRequest = data.query
        state.customerSortOrder = data.sortType
        state.totalPages = data.totalPages
    },
    setCustomerListConsultation(state, data) {
        state.customerConsultationsList = data.list
        state.totalConsultation = data.totalConsultation
    },
    setMeetingURL(state, data) {
        state.meetingURL = data
    },
    setDoctorListConsultation(state, data) {
        state.doctorListConsultation = data.list
        state.totalDoctor = data.totalDoctorPage
    },
    setDoctorChosenInformation(state, data) {
        state.doctorChosen = data
    },
    setCustomerSelfInformation(state,data){
        state.customerSelfInformation = data
    },
    setCustomerMedicalRecord(state,data){
        state.customerMedicalRecord = data
    },
    setCustomerChangeDoctorRequestedData(state,data){
      state.customerChangeDoctorRequestedData = data
    },
    // setCustomerNotification(state, notification) {
    //     state.customerNotification = notification;
    // },
    // addCustomerNotification(notification, newNotification) {
    //     notification.push(newNotification)
    //     state.customerNotification = notification;
    // },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
