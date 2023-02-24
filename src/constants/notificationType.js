import pageRoute from "../constants/pages";

export const notificationType = [
    { Type: "NewRequest", TypeNumber: 0, Route: { path: pageRoute.DOCTOR_LOGIN_SUCCESS } },
    { Type: "DPResponseRequest", TypeNumber: 1, Route: { path: pageRoute.CUSTOMER_CONSULTATION_LIST } }
]
