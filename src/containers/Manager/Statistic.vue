<template>
   <div class="statistic">
      <ManagerManagement :active="1" />
      <div class="wrapMain">
         <div class="content">
            <div class="tab">
               <div class="tab__list" v-for="(item, index) in listTab" :key="index" @click="active = index">
                  <div class="tab__list-item" :class="{ active: index == active }" @click="openTabStatics(item.title)">{{ item.title }}</div>
               </div>
            </div>
            <ConsultingHistory v-show="tab.isShowConsultingHistory" />
            <RatingRate v-show="tab.isShowRatingRate"/>
            <DoctorPharmacist v-show="tab.isShowDoctorPharmacist"/>
         </div>
      </div>
   </div>
</template>
<script>
//import { defineComponent } from "vue-demi";
import ManagerManagement from "./ManagerManagement.vue";
import ConsultingHistory from "./ConsultingHistory.vue";
import RatingRate from "./RatingRate.vue";
import DoctorPharmacist from "./DoctorPharmacistStatistic.vue"
export default{
   components: {
      ManagerManagement,
      // VPieChart,
      ConsultingHistory,
      RatingRate,
      DoctorPharmacist,
      //TestChart,
   },
   data() {
      return {
         active: 0,
         tab:{
            isShowConsultingHistory: true,
            isShowRatingRate: false,
            isShowDoctorPharmacist: false,
         },
         listTab: [
            {
               title:"Lịch sử tư vấn",

            },
            {
               title:"Tỉ lệ đánh giá",
            },
            {
               title:"Bác sĩ/dược sĩ",
            }
         ],
      };
   },
   methods: {
      openTabStatics(tab){
         switch (tab) {
            case "Lịch sử tư vấn":
               this.setAllAttributesTab("isShowConsultingHistory")
               break;
            case "Tỉ lệ đánh giá":
               this.setAllAttributesTab("isShowRatingRate")
               break;
            case "Bác sĩ/dược sĩ":
               this.setAllAttributesTab("isShowDoctorPharmacist")
               break;
            default:
               break;
         }
      },
      setAllAttributesTab(keywordTab){
         Object.keys(this.tab).forEach(key => {
           key === keywordTab ? this.tab[key] = true : this.tab[key] = false
         })
      },
   }
}
</script>
<style></style>
