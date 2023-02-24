<template>
  <div class="DPInfo">
    <TheHeader />
    <div class="DPInfo__banner">
      <h2 class="h2Home">Chúng tôi tạo ra giá trị lớn hơn lợi nhuận</h2>
      <p class="pHome">
        Van Lang Doctor định hình là một trung tâm chăm sóc sức khoẻ trực tuyến
        trông đơn giản bằng cách phát triển và triển khai công nghệ trong từng
        cuộc họp tư vấn, nhưng chúng tôi luôn mong muốn tạo ra giá trị to lớn
        cho cộng đồng và xã hội. <br /><br />
        Chúng tôi đang định hình hoạt động kinh doanh nhân sự cũng như phát
        triển trong tương lai bằng cách kết hợp những người giỏi nhất trong lĩnh
        vực y tế mang lại giá trị cho cuộc sống của các bạn.
      </p>
    </div>
    <div class="DPInfo__img">
      <div class="img1">
        <img :src="require('../../assets/img/doctorinfo-img1.jpg')" alt="" />
      </div>
      <div class="img2">
        <img :src="require('../../assets/img/doctorinfo-img2.jpg')" alt="" />
      </div>
    </div>
    <div class="container">
      <div class="wrapper">
        <h2 class="DPInfo__ourTeam h2Home">Đội ngũ của chúng tôi</h2>
        <div class="DPInfo__list">
          <div
            class="DPInfo__list-item"
            v-for="(doctor, index) in doctorList"
            :key="index"
          >
            <div class="left">
              <div class="dpAvt">
                <img
                  :src="getUserImage(doctor.profilePicture)"
                  :alt="doctor.ProfilePicture"
                  @error="replaceByDefaultUser"
                />
              </div>
            </div>
            <div class="right">
              <p class="dpName">{{ doctor.fullName }}</p>
              <div class="dpInfo">
                <div class="dpInfo__title">
                  <p class="dpInfo__title exp">Kinh nghiệm</p>
                  <p class="dpInfo__title specialist">Chuyên khoa</p>
                  <p class="dpInfo__title rating">Đánh giá</p>
                  <p class="dpInfo__title gender">Giới tính</p>
                </div>
                <div class="dpInfo__value">
                  <p class="dpInfo__value exp">{{ doctor.exp }} Năm</p>
                  <p class="dpInfo__value specialist">
                    {{ doctor.specialist }}
                  </p>
                  <star-rating
                    :increment="doctor.rating"
                    :show-rating="false"
                    :rating="doctor.rating"
                    :round-start-rating="false"
                    :active-on-click="true"
                    :star-size="13"
                    style="pointer-events: none"
                  ></star-rating>
                  <p class="dpInfo__value gender" v-if="doctor.gender">Nữ</p>
                  <p class="dpInfo__value gender" v-else>Nam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<script>
import TheHeader from "../../components/TheHeader.vue";
import TheFooter from "../../components/TheFooter.vue";
import StarRating from "vue-star-rating";
import { mapActions, mapGetters } from "vuex";
import { getUserImageLink } from "../../utils/helper.js";

export default {
  components: {
    TheHeader,
    TheFooter,
    StarRating,
  },
  computed: {
    ...mapGetters(["doctorList"]),
  },
  async created() {
    this.getDoctorList();
  },
  methods: {
    getUserImage(image) {
      return getUserImageLink(image);
    },
    replaceByDefaultUser(e) {
      e.target.src = require('../../assets/img/user/useravatar_header.png');
    },
    ...mapActions(["getDoctorList"]),
  },
};
</script>
<style></style>
