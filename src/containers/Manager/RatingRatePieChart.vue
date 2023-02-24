<template>
   <PieChart v-bind="config" :data="data" style="width: 70%" :key="reRenderAfterGetData"/>
</template>
<script>
//import { defineComponent } from "vue-demi";

import Vue from "vue";
import { PieChart } from "@opd/g2plot-vue";
Vue.use(PieChart);
import { mapActions, mapGetters } from "vuex"
export default {
   component: {
      PieChart,
   },
   data() {
      return {
         reRenderAfterGetData: 0,
         data: [
            { type: "5", value: 0 },
            { type: "4", value: 0 },
            { type: "3", value: 0 },
            { type: "2", value: 0 },
            { type: "1", value: 0 },
         ],
         config: {
            angleField: "value",
            colorField: "type",
            color: ["#003249","#0e536c", "#20778f","#369db0","#50c4cf" ],
            radius: 0.75,
            legend: {
               offsetY: 60,
               offsetX: 10,
               position: "left-top",
               flipPage: "false",
               itemName: {
                  spacing: 20,
                  style: {
                     fontFamily: "GR",
                     fontSize: 15,
                  },
               formatter: (type) => `${(type)} sao`,
               },
            itemMarginBottom: 15,
            },
            pieStyle: {
               cursor: "pointer",
               // fillOpacity: 0.8,
               strokeOpacity: 0.7,
               shadowBlur: 10,
               shadowOffsetX: 5,
               shadowOffsetY: 5,
            },
            tooltip: {
               showContent: false,
               domStyles: {
                  style: {
                     fontFamily: "GR",
                  },
               },
            },
            label: {
               type: "spider",
               autoRotate: false,
               style: { textAlign: "center", fontWeight: "bold", fontFamily: "GR-B", fontSize: 13 },
               formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
              // content: "{value} | ({percentage})",
            },
            interactions: [{ type: "element-selected" }, { type: "element-active" }],
            state: {
               active: {
                  animate: { duration: 100, easing: "easeLinear" },
                  style: {
                     lineWidth: 2,
                     stroke: "#51c3cf",
                  },
               },
            },
         },
      };
   },
   computed: {
      ...mapGetters(['getManagerStaticsAllRatio'])
   },
   created(){
      this.managerGetStaticsAllRatio()
         .then(()=>{
            this.staticsHandler()
            this.reRenderAfterGetData = Math.random() * 10000;
         })
   },
   methods:{
      staticsHandler(){
         this.data.forEach(item => {
            this.getManagerStaticsAllRatio.ratingStatistics.forEach(rateType =>{
               if(item.type == rateType.rating){
                  item.value = +rateType.ratingStatistic
               }
            })
         });
      },
      ...mapActions(['managerGetStaticsAllRatio'])
   },
};
</script>
<style>
</style>
