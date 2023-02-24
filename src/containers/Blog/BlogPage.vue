<template>
  <div class="BlogPage">
    <TheHeader />
    <div class="banner">
      <div class="banner__img">
        <img :src="require('../../assets/img/blog/blog_banner.png')" alt="" />
      </div>
      <div class="container">
        <div class="banner__text">
          <h2 class="h2Home">Bài viết</h2>
          <p class="pHome">
            "Làm thế nào chúng ta có thể sống tốt hơn?" <br />
            Van Lang Doctor muốn viết về những cách dựa trên cơ sở khoa học để
            giải quyết các vấn đề thực tế. Đưa cho bạn những bài viết hay về các
            chủ đề như sức khỏe, hạnh phúc, sáng tạo, năng suất và hơn thế nữa.
          </p>
        </div>
      </div>
    </div>
    <div class="searchWrap">
      <form @submit.prevent>
        <input
          v-model="keyWord"
          type="text"
          class="searchBlog"
          placeholder="Tìm kiếm..."
        />
        <button class="iconSearch" v-on:click="searching">
          <img :src="require('../../assets/img/icons/search.svg')" alt="" />
        </button>
      </form>
    </div>
    <div class="content">
      <div class="allBlogs">
        <div class="container">
          <div class="allBlogs__list">
            <div
              class="allBlogs__list-item"
              v-for="(blog, index) in blogList"
              :key="index"
            >
              <router-link
                :to="{ name: 'blogDetail', params: { blogId: blog.id } }"
                ><!-- link to details -->
                <div class="img">
                  <img
                    :src="getImage(blog.thumbnails)"
                    :alt="blog.thumbnails"
                    @error="replaceByDefault"
                  />
                </div>
                <div class="title">
                  <p>
                    {{ blog.title }}
                  </p>
                </div>
                <div class="desc">
                  <p>
                    {{ blog.previewContent }}
                  </p>
                </div>
                <div class="date">
                  <p>
                    {{
                      new Date(
                        Date.parse(blog.date_Created)
                      ).toLocaleDateString()
                    }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- <button class="loadMore">Tải thêm</button> -->
    </div>
    <TheFooter />
  </div>
</template>
<script>
import TheHeader from "../../components/TheHeader.vue";
import TheFooter from "../../components/TheFooter.vue";
import { mapActions, mapGetters } from "vuex";
import { getBlogImageLink } from "../../utils/helper.js";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  computed: {
    ...mapGetters(["blogList"]),
  },
  data() {
    return {
      keyWord: null,
    };
  },
  async created() {
    this.getBlogList();
  },
  methods: {
    searching: function () {
      this.searchBlog(this.keyWord);
    },
    getImage(image) {
      return getBlogImageLink(image);
    },
    replaceByDefault(e) {
      e.target.src = require('../../assets/img/blog/blog1.jpg');
    },
    ...mapActions(["getBlogList", "searchBlog"]),
  },
};
</script>
<style></style>
