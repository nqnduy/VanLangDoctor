<template>
    <div class="HomePage">
        <TheHeader />
        <section class="banner">
            <div class="banner__left">
                <h2 class="banner__left-h2title h2Home">
                    Chúng tôi <b>quyết tâm</b> mang <br />
                    <b>cuộc sống tốt đẹp hơn</b> cho bạn
                </h2>
                <p class="banner__left-desc">
                    Dịch vụ chăm sóc sức khoẻ trực tuyến 24/7 bất cứ khi nào bạn
                    cần. <br />
                    Đặt lịch ngay để được các bác sĩ chuyên khoa tận tình điều
                    trị.
                </p>
                <VButtonHome
                    :route="'CustomerRegisterConsultation'"
                    class="scheduleNow"
                    title="Đặt lịch ngay"
                />
            </div>
            <VBanner />
        </section>
        <section class="OurValue">
            <div class="container">
                <div class="shape-circle"></div>
                <div class="OurValue__contentWrap">
                    <h2 class="h2Home">
                        Các giá trị của chúng tôi <br />
                        định hình cách chúng tôi làm việc
                    </h2>
                    <div class="OurValue__contentWrap-details">
                        <div>
                            <h4>Chính xác</h4>
                            <p class="pHome">
                                Chúng tôi cố gắng phục vụ khách hàng thông qua
                                chất lượng dịch vụ cao
                            </p>
                            <h4>Nhanh chóng</h4>
                            <p class="pHome">
                                Loại bỏ sự chờ đợi. Đặt lịch tư vấn sức khoẻ với
                                bác sĩ ngay chỉ với một cú nhấp chuột
                            </p>
                            <h4>Suy nghĩ tích cực</h4>
                            <p class="pHome">
                                Chúng tôi đề cao một môi trường làm việc tích
                                cực, tràn đầy năng lượng, lạc quan, vui vẻ.
                            </p>
                        </div>
                        <div id="left">
                            <h4>Minh bạch</h4>
                            <p class="pHome">
                                Chi phí mọi dịch vụ đều được niêm yết. Bạn không
                                cần trả bất kỳ khoản phí nào cho bác sĩ.
                            </p>
                            <h4>Tận tâm</h4>
                            <p class="pHome">
                                Cam kết làm tròn trách nhiệm và khả năng của
                                mình để trở thành điểm tựa sức khoẻ cho bạn
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="OurService">
            <div class="OurService__left">
                <h3 class="h3Home">DỊCH VỤ</h3>
                <h2 class="h2Home">Tư vấn<br />sức khoẻ trực tuyến</h2>
                <p class="pHome">
                    Không tốn thời gian tìm kiếm, đăng ký và xếp hàng, chúng tôi
                    mang những bác sĩ uy tín tại Việt Nam đến với bạn chỉ qua
                    một vài thao tác đơn giản trên website. Các bác sĩ Van Lang
                    Doctor có thể chẩn đoán và điều trị nhiều bệnh lý phổ biến ở
                    mọi lứa tuổi, kê đơn thuốc, cấp giấy chứng nhận sức khỏe
                    hoặc giấy giới thiệu tới các cơ sở y tế chuyên môn khác
                    trong hệ thống.
                    <br /><br />
                    Bạn cũng có thể đặt lịch hẹn với bác sĩ bạn ưa thích cho
                    những lần tái khám hoặc tư vấn sau này.
                </p>
                <VButtonHome title="Tìm hiểu ngay" />
            </div>
            <div class="OurService__right">
                <img
                    :src="require('../../assets/img/home/home_ourservice.jpg')"
                    alt=""
                />
            </div>
        </section>
        <section class="HowItWork">
            <div class="container">
                <div class="HowItWork__left">
                    <img
                        :src="require('../../assets/img/home/home_howitwork.jpg')"
                        alt=""
                    />
                </div>
                <div class="HowItWork__right">
                    <h3 class="h3Home">CÁCH NÓ HOẠT ĐỘNG</h3>
                    <h2 class="h2Home">
                        Một hệ thống chăm sóc<br />sức khoẻ xung quanh bạn
                    </h2>
                    <p class="pHome">
                        Chúng tôi nghĩ rằng mọi người nên dễ dàng tiếp cận với
                        dịch vụ chăm sóc sức khỏe tuyệt vời. Mục đích của chúng
                        tôi là thực hiện các thủ tục một cách đơn giản nhất có
                        thể cho bệnh nhân và cung cấp phương pháp điều trị bất
                        kể ở đâu mà họ cảm thấy thuận lợi.
                        <br /><br />
                        Trải nghiệm dịch vụ tư vấn sức khỏe trực tuyến với đội
                        ngũ bác sĩ tận tâm và dày dặn kinh nghiệm tại Van Lang
                        Doctor chỉ sau vài thao tác đơn giản.
                    </p>
                    <VButtonHome title="Tìm hiểu ngay" />
                </div>
            </div>
        </section>
        <section
            class="Listen"
            :style="{ backgroundImage: 'url(' + image + ')' }"
        >
            <div class="blackFilter"></div>
            <h2 class="h2Home" style="color: white">
                "Hãy lắng nghe để hiểu những điều cơ thể đang cố nói với bạn"
            </h2>
        </section>
        <section class="WeDo">
            <div class="container">
                <div class="WeDo__left">
                    <h3 class="h3Home">ĐIỀU CHÚNG TÔI THỰC HIỆN</h3>
                    <h2 class="h2Home">
                        Chúng tôi tạo ra giá trị lớn hơn lợi nhuận
                    </h2>
                </div>
                <div class="WeDo__right">
                    <p class="pHome">
                        Van Lang Doctor định hình là một trung tâm chăm sóc sức
                        khoẻ trực tuyến trông đơn giản bằng cách phát triển và
                        triển khai công nghệ trong từng cuộc gọi, nhưng chúng
                        tôi luôn mong muốn tạo ra giá trị to lớn cho cộng đồng
                        và xã hội. <br /><br />
                        Có rất nhiều bước trên hành trình này, và chúng tôi nhận
                        ra rằng chúng tôi chưa có tất cả các câu trả lời. Tuy
                        nhiên, chúng tôi giữ cho nó đơn giản và không bao giờ
                        ngừng là trở thành con người thật của mình.
                        <br /><br />
                        Chúng tôi đang định hình hoạt động kinh doanh nhân sự
                        cũng như phát triển trong tương lai bằng cách kết hợp
                        những người giỏi nhất trong lĩnh vực y tế mang lại giá
                        trị cho cuộc sống của các bạn.
                    </p>
                </div>
            </div>
        </section>
        <section class="FAQ">
            <div class="container">
                <div class="FAQ__left">
                    <h2 class="h2Home">Câu hỏi thường gặp</h2>
                    <p class="pHome">Thông tin chung</p>
                    <div class="container-accordion">
                        <div
                            class="FAQ__left-accordion"
                            v-for="(faq, i) in faqs"
                            :key="i"
                            @click="open = i"
                            :class="{ open: i == open }"
                        >
                            <div class="question">
                                <p>{{ faq.question }}</p>
                                <img
                                    :src="
                                        require('../../assets/img/icons/accordiona-arrow.svg')
                                    "
                                    alt=""
                                />
                            </div>
                            <div class="answer">
                                <p class="pHome" v-html="faq.answer"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="FAQ__right">
                    <div class="FAQ__right-form">
                        <p class="FAQ__right-form-headline">
                            Bạn vẫn chưa thấy thông tin mình cần
                        </p>
                        <p class="FAQ__right-form-subheadline pHome">
                            Để lại số điện thoại, chúng tôi sẽ tư vấn nhanh nhất
                            cho bạn
                        </p>
                        <form action="">
                            <input
                                type="name"
                                placeholder="Nhập tên"
                                class="FAQ__right-form-username"
                                name="name"
                            />
                            <input
                                type="tel"
                                placeholder="Nhập số điện thoại"
                                class="FAQ__right-form-phone"
                                name="tel"
                            />
                            <textarea
                                name="content"
                                placeholder="Nội dung"
                                class="FAQ__right-form-content"
                                cols="30"
                                rows="10"
                            ></textarea>
                            <VButtonSubmit title="Gửi ngay" />
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <TheFooter />
    </div>
</template>

<script>
import TheHeader from "../../components/TheHeader.vue";
import VButtonHome from "../../components/VButtonHome.vue";
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import VBanner from "../../components/VBanner.vue";
import TheFooter from "../../components/TheFooter.vue";
import { mapActions, mapGetters } from "vuex";
import IMAGE_URL from "../../constants/imageConstantsURL.js";
export default {
    computed: {
    ...mapGetters(["customerSelfInformation"]),
    },
    components: {
        TheHeader,
        VButtonHome,
        VButtonSubmit,
        VBanner,
        TheFooter,
    },
    props: {
        answer: String,
    },
    data() {
        return {
            imageLink: null,
            open: 0,
            image: require("../../assets/img/home/home_bn.jpg"),
            faqs: [
                {
                    question: "Van Lang Doctor cung cấp dịch vụ ở khu vực nào?",
                    answer: "Dịch vụ của Van Lang Doctor duy trì với hình thức trực tuyến, vì vậy việc kết nối cũng như sử dụng dịch vụ sẽ được diễn ra ở bất kỳ đâu. Chỉ cần bạn là sinh viên trong cuộc đồng Văn Lang, bạn đã có thể sử dụng dịch vụ của Van Lang Doctor.",
                },
                {
                    question: "Làm sao để được bác sĩ tư vấn online?",
                    answer: "Bạn có thể gửi thắc mắc miễn phí và đội ngũ Bác sĩ Van Lang Doctor sẽ trả lời. Hoặc đăng ký tư vấn để trao đổi trực tiếp với Bác sĩ.<br> <br> Để đăng ký tư vấn, bạn cần đăng ký và đăng nhập tài khoản Van Lang Doctor.<br> <br> Vào mục 'Đăng ký tư vấn' - Nhập thời gian tư vấn trước 1 ngày, triệu chứng và chọn bác sĩ trong danh sách.<br> <br> Bạn sẽ được quản trị viên xếp lịch hẹn phù hợp nhất ngay sau đó. Ấn nút 'Tham gia' và bắt đầu trò chuyện cùng Bác Sĩ đã chọn khi tới giờ đã được hẹn.",
                },
                {
                    question:
                        "Làm sao để đăng ký nhận tin mới nhất từ Van Lang Doctor?",
                    answer: "   Hãy để lại email và số điện thoại, Van Lang Doctor sẽ cập nhật những thông tin mới nhất về dịch vụ và các chương trình chăm sóc sức khoẻ sắp tới một cách nhanh chóng đến cho bạn!",
                },
            ],
        };
    },
    created(){
     this.customerGetSelfInformation()
        .then(()=>{
          this.setAvatar()
        })
    },
    methods:{
        setAvatar(){
            if (this.customerSelfInformation.profilePicture != null) {
                this.imageLink = IMAGE_URL.USER_IMAGE_URL + this.customerSelfInformation.profilePicture;
                localStorage.setItem('imageLink',this.imageLink)
            }
    },
      ...mapActions(["customerGetSelfInformation"]),
    }
};
</script>

<style scoped lang="scss">
TheHeader {
    z-index: 100;
}
</style>
