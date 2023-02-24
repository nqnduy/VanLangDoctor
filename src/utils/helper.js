import IMAGE_URL from '../constants/imageConstantsURL';
import moment from 'moment';

export const getRole = (role) => {
    return role === "Doctor" ? "Bác sĩ" : "Dược sĩ";
}

export const getBlogImageLink = (image) => {
    return IMAGE_URL.BLOG_IMAGE_URL + image;
}

export const getUserImageLink = (image) => {
    return IMAGE_URL.USER_IMAGE_URL + image;
}

export const convertDateOfBirth = (date) => {
    let temp = moment(date).format('DD/MM/YYYY');
    return temp == '01/01/0001' ? '' : temp;
}

export const replaceByDefaultUser = (e) => {
    e.target.src = require('../assets/img/user/useravatar_header.png');
}

export const getGender = (gender) => {
    return gender ? "Nữ" : "Nam";
}

export const translatedRequestState = (state) => {
    if (state == "Cancelled") {
       return "Đã huỷ";
    } else if (state == "Waiting") {
       return "Đang chờ xác nhận";
    } else if (state == "Confirmed") {
       return "Đã xác nhận";
    } else if (state == "Ignored") {
       return "Người tư vấn từ chối";
    } else if (state == "Done") {
       return "Đã hoàn thành";
    } else {
       return "Không trạng thái";
    }
 }