import RequestService from "../../services/request"
import EndPoints from "../../constants/endpoints"
// import jwt_decode from "jwt-decode";
const state = () => ({
    blogDetails: "",
    blogList: null,
})

const getters = {
    blogDetails: state => state.blogDetails,
    blogList: state => state.blogList,
}

const actions = {
    async getBlogList(context) {
        await RequestService.axios.get(EndPoints.getBlogList)
            .then((response) => {
                context.commit('setBlogList', response.data.value)
            });
    },
    async searchBlog(context, keyword) {
        await RequestService.axios.get(EndPoints.getBlogList, {
                params: {
                    keyword: keyword
                }
            })
            .then((response) => {
                context.commit('setBlogList', response.data.value)
            });
    },
    async getBlogDetails(context, blogId) {
        await RequestService.axios.get(EndPoints.getBlogDetails + blogId)
            .then((response) => {
                context.commit('setBlogDetails', response.data.value)
            });
    },
}
const mutations = {
    setBlogList(state, blogListResponse) {
        state.blogList = blogListResponse
    },
    setBlogDetails(state, blogListResponse) {
        state.blogDetails = blogListResponse
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}