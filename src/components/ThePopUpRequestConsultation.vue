<template>
    <div class="dpDashboard">
        <VPopupConfirm v-if="showIgnoreReason" option="refuseRequest" :requestId="ignoreRequestId" @closed-popup-confirm-cancel="closeConfirmPopup" @closed-confirm-ignore-popup='closeConfirmPopupAfterConfirmSuccess'/>
        <div class="popupRequestConsultation">
            <div class="bg-black"></div>
            <div class="popupRequestConsultation__content">
                <div class="popupRequestConsultation__content-title">
                    <h3 class="h3dpDashboard">Yêu cầu cuộc hẹn</h3>
                    <button class="closePopup" @click="closedPopup">
                        <img :src="require('../assets/img/icons/close.svg')" alt="" />
                    </button>
                </div>
                <div class="popupRequestConsultation__content-time">
                    <button class="arrow prev" @click="getFirst">
                        <img :src="require('../assets/img/icons/arrowline.svg')" alt="" />
                    </button>
                    <button class="arrow prev" @click="getPrevDay">
                        <img :src="require('../assets/img/icons/nextarrow.svg')" alt="" />
                    </button>
                    <div class="time">
                        <p >Ngày: {{ transferDataDateWithoutHour() }}</p>
                    </div>
                    <button class="arrow next" @click="getNextDay">
                        <img :src="require('../assets/img/icons/nextarrow.svg')" alt="" />
                    </button>
                    <button class="arrow next" @click="getLast">
                        <img :src="require('../assets/img/icons/arrowline.svg')" alt="" />
                    </button>
                </div>
                <div class="popupRequestConsultation__content-list">
                    <div class="popupRequestConsultation__content-list--item" v-for="(request,index) in doctorConsultationRequestList" :key="index">
                        <div class="infoRequest">
                            <div class="avt">
                                <img v-if="!request.profilePicture" :src="require('../assets/img/user/useravatar_header.png')" alt="" />
                                <img v-else :src="imageLink(request.profilePicture)" alt="" />
                            </div>
                            <div class="text">
                                <div class="textWrap">
                                    <div class="name">{{ request.customerName }}</div>
                                    <p class="time">{{transferDataDate(request.time)}}</p>
                                </div>
                                <div class="symptom">{{ request.symptom }}</div>
                            </div>
                        </div>
                        <div class="selectRequest" v-if="request.state != 'Cancelled'">
                            <button class="selectRequest__btn approve" v-if="!request.isPast" @click="approveRequest(request)">Chấp nhận</button>
                            <button class="selectRequest__btn refuse" @click="ignoreRequest(request.id)">Từ chối</button>
                        </div>
                        <div class="selectRequest" v-else>
                            {{ translatedRequestState(request.state) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VPopupConfirm from "../components/VPopupConfirm.vue"
import {mapGetters,mapActions} from 'vuex'
import URL from '../constants/imageConstantsURL.js'
import moment from 'moment'
import { translatedRequestState } from "../utils/helper";
export default {
    computed:{
        ...mapGetters(['doctorConsultationRequestList','reRenderKey','getTargetNoti'])
    },
    components:{
        VPopupConfirm,
    },
    data() {
        return {
            date: null,
            showIgnoreReason: false,
            ignoreRequestId: null,
            dateRequest: new Date(Date.now()).toISOString(),
        }
    },
    created(){
      if(this.getTargetNoti){
        let query = {
          date: new Date(this.getTargetNoti).toISOString(),
        }
        this.doctorGetConsultationRequest(query).then(()=>{
            this.dateRequest = query.date
            this.deleteTargetNoti()
        })
      } else {
        this.doctorGetConsultationRequest({}).then(()=>{
            this.checkPastRequest()
        })
      }
    },
    methods:{
        closeConfirmPopup(value){
            this.showIgnoreReason = value
        },
        closeConfirmPopupAfterConfirmSuccess(value){
            const query = {
                date: this.dateRequest ?? moment().toISOString()
            }
            this.doctorGetConsultationRequest(query).then(()=>{
                this.showIgnoreReason = value
            })
        },
        closedPopupWhenConfirmIgnore() {
            this.$emit("closed-confirm-ignore-popup", false);
        },
        closedPopup() {
            this.$emit("closed-request-list-popup", false);
        },
        imageLink(profilePictureName){
            return URL.USER_IMAGE_URL+profilePictureName
        },
        transferDataDate(dateData){
            return moment(dateData).format('DD/MM/YYYY HH:mm')
        },
        transferDataDateWithoutHour(){
            return moment(this.dateRequest).format('DD/MM/YYYY')
        },
        approveRequest(request){
            if(request.sameTimeRequests){
                this.warningWithSameTimeRequest(request)
            }else{
                this.$swal.fire({
                    showDenyButton: true,
                    icon: "info",
                    title: "Thông báo",
                    text: `Danh sách cuộc hẹn sẽ được bổ sung nếu đồng ý yêu cầu này`,
                    confirmButtonText: "Chấp nhận",
                    denyButtonText: "Quay lại",
                    dangerMode: true,
                }).then((result) => {
                        if (result.isConfirmed) {
                            const data = {
                                id: request.id,
                                sameTimeRequests: request.sameTimeRequests ?? [ ]
                            }
                            this.doctorApproveConsultationRequest(data)
                                .then(()=>{
                                    const query = {
                                        date: this.dateRequest ?? moment().toISOString()
                                    }
                                    this.doctorGetConsultationRequest(query)
                                    this.$swal.fire("Đã lên lịch hẹn thành công", "", "success");
                                })
                                .catch(()=>{
                                    this.$swal.fire("Có lỗi không thể lên lịch hẹn", "", "error");
                            })
                        }
                    });
            }
        },
        warningWithSameTimeRequest(request){
            // let groupCustomerSameTimeRequest = ''
            // if(request.sameTimeRequests){
            //     request.sameTimeRequests.forEach(element => {
            //         groupCustomerSameTimeRequest += element.customerName +', '
            //     });
            //     groupCustomerSameTimeRequest = groupCustomerSameTimeRequest.substring(0,groupCustomerSameTimeRequest.length - 2)
            // }
            this.$swal.fire({
                showDenyButton: true,
                icon: "info",
                title: "Thông báo",
                text: `Đồng ý yêu cầu của ${request.customerName} sẽ đồng nghĩa với việc từ chối các yêu cầu khác từ những người khác`,
                confirmButtonText: "Chấp nhận",
                denyButtonText: "Quay lại",
                dangerMode: true,
            }).then((result) => {
                    if (result.isConfirmed) {
                        const data = {
                            id: request.id,
                            sameTimeRequests: request.sameTimeRequests ?? [ ]
                        }
                        this.doctorApproveConsultationRequest(data)
                            .then(()=>{
                                const query = {
                                    date: this.dateRequest ?? moment().toISOString()
                                }
                                this.doctorGetConsultationRequest(query).then(()=>{
                                    this.incrementRenderKey()
                                })
                                this.$swal.fire("Đã lên lịch hẹn thành công", "", "success");
                            })
                            .catch(()=>{
                                this.$swal.fire("Có lỗi không thể lên lịch hẹn", "", "error");
                            })
                    }
                });
        },
        ignoreRequest(requestId){
            this.showIgnoreReason = true
            this.ignoreRequestId = requestId
        },
        getNextDay(){
            const startDate = this.dateRequest ?? new Date(Date.now()).toISOString()
            const nextDate = moment(startDate).add(1,'days').toISOString()
            this.dateRequest = nextDate
            const query = {
                date: nextDate
            }
            this.doctorGetConsultationRequest(query)
        },
        getPrevDay(){
            const startDate = this.dateRequest ?? new Date(Date.now()).toISOString()
            const prevDate = moment(startDate).subtract(1,'days').toISOString()
            this.dateRequest = prevDate
            const query = {
                date: prevDate
            }
            this.doctorGetConsultationRequest(query)
        },
        getLast(){
            const query = {
                PagingEnum: 'Last'
            }
            this.doctorGetConsultationRequest(query).then(()=>{
                this.dateRequest = this.doctorConsultationRequestList[0].time
            })
        },
        getFirst(){
            const query = {
                PagingEnum: 'First'
            }
            this.doctorGetConsultationRequest(query).then(()=>{
                this.dateRequest = this.doctorConsultationRequestList[0].time
            })
        },
        checkPastRequest(){
            this.doctorConsultationRequestList.forEach((request)=>(
                request.isPast = moment(request.time).isBefore(new Date(Date.now()),'hh:mm')
            ))
        },
        translatedRequestState: translatedRequestState,
        ...mapActions(['doctorGetConsultationRequest','doctorApproveConsultationRequest','incrementRenderKey','doctorGetDashboardContent','deleteTargetNoti'])
    },
    watch:{
        doctorConsultationRequestList(){
            this.checkPastRequest()
        }
    }
};
</script>
<style></style>
