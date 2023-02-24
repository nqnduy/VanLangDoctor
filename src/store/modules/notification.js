
import RequestService from "../../services/request";
import EndPoints from "../../constants/endpoints";
let tokenBearerStr = localStorage.getItem("token");

const state = () => ({
    requestListPopupOpenRerenderKey: 0,
    dateOfRequestNotification: null,
    targetNoti: null,
    listNotification: null,
});

const getters = {
    getRequestListPopupOpenRerenderKey: (state) => state.requestListPopupOpenRerenderKey,
    getDateOfRequestNotification: (state) => state.dateOfRequestNotification,
    getTargetNoti: (state) => state.targetNoti,
    listNotification: (state) => state.listNotification,
};

const actions = {
    openRequestListPopup(context,targetNoti){
      let data = {
        target: targetNoti,
        randomNumber: Math.random()*100000,
      }
      context.commit('setRequestListPopupOpenRerenderKey',data)
    },
    deleteTargetNoti(context){
      context.commit('setEmptyTargetNoti')
    },
    async getNotification(context) {
        await RequestService.axios
            .post(EndPoints.getNotification,'',{
              headers: {
                "Authorization": `Bearer ${tokenBearerStr}`
              }
          })
          .then((response) => {
              context.commit('setNotification', response.data)
        });
    },
    addNotification(context, newNotification) {
        context.commit('setAddNotification', newNotification);
    },
    async ReadNotification(context, notiId){
      await RequestService.axios.get(`${EndPoints.getNotification}/${notiId} `,{
        headers: {
          "Authorization": `Bearer ${tokenBearerStr}`
        }
      });
    },
};
const mutations = {
    setRequestListPopupOpenRerenderKey(state,data) {
      state.requestListPopupOpenRerenderKey = data.randomNumber
      state.targetNoti = data.target
    },
    setRequestListPopupOpenRerenderKeyWithMutationOnly(data) {
      state.requestListPopupOpenRerenderKey = data.randomNumber
      state.targetNoti = data.target
    },
    setEmptyTargetNoti(state){
      state.targetNoti = null
    },
    setNotification(state, notification) {
      state.listNotification = notification;
    },
    setAddNotification(notification, newNotification) {
        notification.unshift(newNotification)
        state.listNotification = notification;
    },
    markAsRead(notification, notificationId) {
      notification.find(n => n.id == notificationId).isRead = true;
      state.listNotification = notification;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
