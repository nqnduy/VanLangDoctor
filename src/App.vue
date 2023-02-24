<template>
  <div>
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from "./containers/Layout/Layout";
import pageRoute from "./constants/pages";
import { mapGetters, mapActions } from  'vuex'

export default {
  name: "App",
  components: {
    Layout,
  },
  computed:{
    ...mapGetters(['customer'])
  },
  created() {
    if (localStorage.getItem('token')) {
      if(!this.checkTimeoutToDelToken()){
        return this.$router.push({ path: pageRoute.USER_LOGIN });
      }
      this.customerLogged().then(()=>{
        this.checkRole()
      })
    }
  },
  methods: {
    checkTimeoutToDelToken: function () {
      var hours = pageRoute.DEFAULT_TIMES_DELETE_TOKEN;
      let now = new Date().getTime();
      let setupTime = localStorage.getItem("setupTime");
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.clear();
        return false;
      } else {
        return true;
      }
    },
    checkRole(){
      localStorage.setItem('role',this.customer.role)
    },
    ...mapActions(['customerLogged'])
  },
};
</script>

<style lang="scss">
/* // @import "~bootstrap/dist/css/bootstrap.css";
// @import "~bootstrap-icons/font/bootstrap-icons.css"; */

@import "./assets/fonts/fonts.css";
@import "./assets/scss/style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  list-style: none;
}
.cursor {
  cursor: pointer;
}
.text-gray {
  color: gray;
}
</style>
