<template>
    <section class="Footer">
        <div class="Meetyou">
            <div class="Meetyou__left">
                <h3 class="h3Home">RẤT VUI ĐƯỢC GẶP BẠN</h3>
                <h2 class="h2Home">Hãy cùng trải nghiệm nhé!</h2>
                <p class="pHome">
                    Bạn có thể gửi câu hỏi, góp ý hoặc liên hệ với chúng tôi
                    thông qua các phương tiện truyền thông dưới đây. Chúng tôi
                    sẽ rất vui nếu nhận được lời nhắn từ các bạn!
                </p>
                <VButtonHome
                    route="CustomerRegister"
                    title="Trải nghiệm ngay"
                />
            </div>
            <div class="Meetyou__right">
                <img :src="require('../assets/img/home/hand.png')" alt="" />
            </div>
        </div>
        <div class="Info">
            <div class="Info__text">
                <p class="Info__text-title pFooter">EMAIL</p>
                <p class="Info__text-desc pFooter">info@vldoctor.com</p>
            </div>
            <div class="Info__text">
                <p class="Info__text-title pFooter">ĐIỆN THOẠI</p>
                <p class="Info__text-desc pFooter">+84 0123456789</p>
            </div>
            <div class="Info__social">
                <div class="img">
                    <img
                        :src="require('../assets/img/icons/instagram.svg')"
                        alt=""
                    />
                </div>
                <div class="img">
                    <img
                        :src="require('../assets/img/icons/facebook.svg')"
                        alt=""
                    />
                </div>
                <div class="img">
                    <img
                        :src="require('../assets/img/icons/linkedin.svg')"
                        alt=""
                    />
                </div>
            </div>
        </div>
        <div class="Project">
            <div class="container-fluid">
                <p class="Project__info">
                    © K24 Capstone Project 2021 | Van Lang Doctor
                </p>
                <div class="Project__TaC">
                    <p class="TaC">Terms & Conditions</p>
                    <p class="Privacy">Privacy Policy and GDPR</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import VButtonHome from "./VButtonHome.vue";
export default {
    components: {
        VButtonHome,
    },
};
</script>
<style lang="scss"></style>
