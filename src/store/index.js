import Vue from 'vue'
import Vuex from 'vuex'
import customer from './modules/customer'
import blog from './modules/blog'
import doctor from './modules/doctor'
import administrator from './modules/administrator'
import manager from './modules/manager'
import notification from './modules/notification'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        customer,
        blog,
        doctor,
        administrator,
        manager,
        notification,
        common,
    },
})