import Vue from "vue";
import pageRoute from "../constants/pages";
import Router from "vue-router";
// Component adding
/*** Guest */
import LandingPage from "../containers/Home/HomePage.vue";
import BlogPage from "../containers/Blog/BlogPage.vue";
import BlogDetail from "../containers/Blog/BlogDetail.vue";
import DoctorPharmacistInfo from "../containers/DoctorPharmacist/DoctorList.vue";
/*** Customer */
import CustomerRegister from "../containers/Customer/Register.vue";
import CustomerLogin from "../containers/Customer/Login.vue";
import CustomerManagement from "../containers/Customer/CustomerManagement.vue";
import CustomerRequestList from "../containers/Customer/RequestList.vue";
import CustomerAllConsultations from "../containers/Customer/AllConsultations.vue";
import CustomerRegisterConsultation from "../containers/Customer/RegisterConsultation.vue";
import CustomerUpdateAccountInformation from "../containers/Customer/UpdateAccountInformation.vue";
import CustomerChangeRequest from "../containers/Customer/ChangeRequest.vue";

/*** Doctor/Pharmacist*/
import DoctorPharmacistLogin from "../containers/DoctorPharmacist/Login.vue";
import DoctorPharmacistManagement from "../containers/DoctorPharmacist/DoctorManagement.vue";
import DPCustomerList from "../containers/DoctorPharmacist/CustomerList.vue";
import DPDashboard from "../containers/DoctorPharmacist/Dashboard.vue";
import DPSupport from "../containers/DoctorPharmacist/Support.vue";
import DPCustomerInformation from "../containers/DoctorPharmacist/CustomerInformation.vue";
import DPUpdateAccountInformation from "../containers/DoctorPharmacist/ChangePasswordUpdateAccountInformation.vue";

/*** Admin/Manager*/
import AdminManagerLogin from "../containers/Admin/Login.vue";
import AdminManagement from "../containers/Admin/AdminManagement";
import AdminAccountManagement from "../containers/Admin/AccountManagement.vue";
import AdminMedicineCategory from "../containers/Admin/MedicineCategory.vue";
import AdminCreateAccount from "../containers/Admin/CreateAccount.vue";
import AdminUpdateAccount from "../containers/Admin/UpdateAccount.vue"
import AdminMedicineList from "../containers/Admin/MedicineList.vue"
import AdminCreateMedicine from "../containers/Admin/CreateMedicine.vue"
import AdminUpdateMedicine from "../containers/Admin/UpdateMedicine.vue"

/*** Manager*/
import ManagerManagement from "../containers/Manager/ManagerManagement.vue";
import ManagerConsultationRequestList from "../containers/Manager/ConsultationRequestList.vue";
import ManagerStatistic from "../containers/Manager/Statistic.vue";

Vue.use(Router);

export default new Router({
    mode: "hash",
    base: __dirname,
    routes: [
        {
            path: pageRoute.HOME,
            name: "home",
            component: LandingPage,
        },
        {
            path: pageRoute.BLOG,
            name: "blogPage",
            component: BlogPage,
            meta: {
                guest: true,
            },
        },
        {
            path: pageRoute.BLOG_DETAILS_ID,
            component: BlogDetail,
            name: "blogDetail",
        },
        {
            path: pageRoute.USER_REGISTER,
            name: "CustomerRegister",
            component: CustomerRegister,
            meta: {
                guest: true,
                disallowAuthed: true,
            },
        },
        {
            path: pageRoute.USER_LOGIN,
            name: "CustomerLogin",
            component: CustomerLogin,
            meta: {
                guest: true,
                disallowAuthed: true,
            },
        },
        {
            path: pageRoute.ADMIN_MANAGER_LOGIN,
            name: "AdminManagerLogin",
            component: AdminManagerLogin,
            meta: {
                guest: true,
                disallowAuthed: true,
            },
        },
        {
            path: pageRoute.DOCTOR_PHARMACIST_LOGIN,
            name: "DoctorPharmacistLogin",
            component: DoctorPharmacistLogin,
            meta: {
                guest: true,
                disallowAuthed: true,
            },
        },
        {
            path: pageRoute.DOCTOR_PHARMACIST_INFO,
            name: "doctorPharmacistInfo",
            component: DoctorPharmacistInfo,
            meta: {
                guest: true,
            },
        },
        {
            path: pageRoute.DOCTOR_PHARMACIST,
            component: DoctorPharmacistManagement,
            meta: {
                doctor: true,
            },
            children: [
                {
                    path: "dashboard",
                    component: DPDashboard,
                    props: true,
                    name: "DPDashboard",
                },
                {
                    path: "customerlist",
                    component: DPCustomerList,
                    props: true,
                    name: "DPCustomerList",
                },
                {
                    path: "support",
                    component: DPSupport,
                    props: true,
                    name: "DPSupport",
                },
                {
                    path: "updateaccount",
                    component: DPUpdateAccountInformation,
                    props: true,
                    name: "DPUpdateAccountInformation",
                },
                {
                    path: "customerinfo/:id",
                    component: DPCustomerInformation,
                    props: true,
                    name: "DPCustomerInformation",
                },
            ],
        },
        {
            path: pageRoute.MANAGER,
            component: ManagerManagement,
            meta: {
                manager: true,
            },
            children: [
                {
                    path: "consultationrequest",
                    component: ManagerConsultationRequestList,
                    props: true,
                    name: "ManagerConsultationRequestList",
                },
                {
                    path: "statistic",
                    component: ManagerStatistic,
                    props: true,
                    name: "ManagerStatistic",
                },
            ],
        },
        {
            path: pageRoute.CUSTOMER,
            component: CustomerManagement,
            meta: {
                customer: true,
            },
            children: [
                {
                    path: "updateaccount",
                    component: CustomerUpdateAccountInformation,
                    props: true,
                    name: "CustomerUpdateAccountInformation",
                },
                {
                    path: "requestlist",
                    component: CustomerRequestList,
                    props: true,
                    name: "CustomerRequestList",
                },
                {
                    path: "consultations",
                    component: CustomerAllConsultations,
                    props: true,
                    name: "CustomerAllConsultations",
                },
                {
                    path: "registerconsultation",
                    component: CustomerRegisterConsultation,
                    props: true,
                    name: "CustomerRegisterConsultation",
                },
                {
                    path: "changerequest/:id",
                    component: CustomerChangeRequest,
                    props: true,
                    name: "CustomerChangeRequest",
                },
            ],
        },
        {
            path: pageRoute.ADMIN,
            component: AdminManagement,
            meta: {
                admin: true,
            },
            children: [
                {
                    path: "createaccount",
                    component: AdminCreateAccount,
                    props: true,
                    name: "AdminCreateAccount",
                },
                {
                    path: "accountmanagement",
                    component: AdminAccountManagement,
                    props: true,
                    name: "AdminAccountManagement",
                },
                {
                    path: "medicinecategory",
                    component: AdminMedicineCategory,
                    props: true,
                    name: "AdminMedicineCategory",
                },
                {
                    path: "updateaccount/:id",
                    component: AdminUpdateAccount,
                    props: true,
                    name: "AdminUpdateAccount",
                },
                {
                    path: "medicinelist",
                    component: AdminMedicineList,
                    props: true,
                    name: "AdminMedicineList",
                },
                {
                    path: "createmedicine",
                    component: AdminCreateMedicine,
                    props: true,
                    name: "AdminCreateMedicine",
                },
                {
                    path: "updatemedicine/:id",
                    component: AdminUpdateMedicine,
                    props: true,
                    name: "AdminUpdateMedicine",
                },
            ],
        },
    ],
});
