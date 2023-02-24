import { notificationType }  from "../constants/notificationType"

export const getRouteFromNotificationType = (notiType) => {
    return notificationType.find(item => item.Type === notiType)?.Route ?? notificationType.find(item => item.TypeNumber === notiType)?.Route;
}