<template>
  <div class="BlogDetail">
    <TheHeader />
    <div class="container">
      <div class="wrapper">
        <div class="BlogDetail__img">
          <div class="img">
            <img
              :src="getBlogImage(blogDetails.imageNames[0].name)"
              :alt="blogDetails.imageNames[0].name"
              @error="replaceByDefault"
            />
          </div>
        </div>
        <div class="BlogDetail__title">
          <h2 class="BlogDetail__title-h2 h2Home">
            {{ blogDetails.title }}
          </h2>
          <div class="BlogDetail__title-date">
            {{ new Date(Date.parse(blogDetails.date_Created)).toLocaleDateString() }}
          </div>
        </div>
        <div class="BlogDetail__desc">
          {{ blogDetails.sapo }}
        </div>
        <div class="BlogDetail__content">
          <div
            class="BlogDetail__content-entry"
            v-html="blogDetails.content"
          ></div>
        </div>
        <div class="BlogDetail__author">
          <div class="BlogDetail__author-img">
            <img
              :src="getUserImage(blogDetails.profilePicture)"
              :alt="blogDetails.imageNames[0].name"
              @error="replaceByDefaultUser"
            />
            <!-- <img
              v-else
              :src="require('../../assets/img/user/useravatar_header.png')"
              :alt="image-holder"
            /> -->
          </div>
          <div class="BlogDetail__author-name">
            {{ blogDetails.author }}
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<script>
import TheFooter from "../../components/TheFooter.vue";
import TheHeader from "../../components/TheHeader.vue";
import { mapGetters, mapActions } from "vuex";
import { getBlogImageLink, getUserImageLink } from "../../utils/helper.js";

export default {
  computed: {
    ...mapGetters(["blogDetails"]),
  },
  components: {
    TheFooter,
    TheHeader,

  },
  data() {
    return {};
  },
  created() {
    this.getBlogDetails(this.$route.params.blogId);
  },

  methods: {
    checkExistsImg(nameImg) {
      try {
        require("../../assets/img/blog/" + nameImg);
        return true;
      } catch (error) {
        return false;
      }
    },
    getBlogImage(image) {
      return getBlogImageLink(image);
    },
    getUserImage(image) {
      return getUserImageLink(image);
    },
    replaceByDefault(e) {
      e.target.src = require('../../assets/img/blog/blog1.jpg');
    },
    replaceByDefaultUser(e) {
      e.target.src = require('../../assets/img/user/useravatar_header.png');
    },
    ...mapActions(["getBlogDetails"]),
  },
};
</script>
<style>
</style>
