<template>
   <div class="consultingHistory">
      <div class="consultingHistory__header">
         <div class="consultingHistory__header-title StatisticTitle">Lịch sử tư vấn</div>
         <div class="consultingHistory__header-viewBy">
            <select v-model="dataBySelected" class="inputManagement">
               <option>Theo tháng</option>
               <option>Theo ngày</option>
            </select>
         </div>
      </div>
      <LineChart v-bind="config" :data="data" />
   </div>
</template>
<script>
import Vue from "vue";
import { LineChart } from "@opd/g2plot-vue";
import { mapActions, mapGetters } from "vuex"
import moment from 'moment';
Vue.use(LineChart);
export default {
   components: {
      LineChart,
   },
   computed: {
      ...mapGetters(['getManagerStaticsPrescriptionConsultation'])
   },
   data() {
      return {
         dataBySelected:'Theo tháng',
         data: [],
         config: {
            width: 300,
            xField: "time",
            yField: "value",
            seriesField: "type",
            smooth: true,
            color: ["#51c3cf", "#92959e79"],
            lineStyle: {
               lineWidth: 3,
               strokeOpacity: 0.7,
               shadowBlur: 10,
               shadowOffsetX: 5,
               shadowOffsetY: 5,
               cursor: "pointer",
            },
            xAxis: {
               tickCount: 6,
               // type: "time",
               // mask: "MM/YYYY",
               range: [0, 1],
               label: {
                  offset: 20,
                  style: {
                     fontFamily: "GR-SB",
                     color: "#6B7280",
                     fontSize: 13,
                  },
                  formatter: (name) => name,
               },
            },
            yAxis: {
               label: {
                  offset: 20,
                  style: {
                     fontFamily: "GR-SB",
                     color: "#6B7280",
                     fontSize: 13,
                  },
                  formatter: (name) => name,
               },
            },
            tooltip: {
               position: "top",
               domStyles: {
                  fontFamily: "GR",
               },
            },
            legend: {
               itemName: {
                  style: {
                     fontFamily: "GR-SB",
                     fontSize: 14,
                  },
               },
            },
            animation: {
               appear: {
                  animation: "path-in",
                  duration: 2000,
               },
            },
         },
      };
   },
   created(){
      const query = this.createQueryForStaticsByMonth()
      this.managerGetStaticsPrescriptionConsultation(query)
         .then(()=>{
            this.staticsHandler()
         })
   },
   methods:{
      createQueryForStaticsByMonth(fromDate,toDate){ // default: 7 months to current
         const query = {
            FromDate: fromDate ?? moment().subtract(7, 'months').format('MM/DD/YYYY'),
            ToDate: toDate ?? moment().subtract(1, 'months').format('MM/DD/YYYY'),
            OrderBy: 'month',
         }
         return query;
      },
      createQueryForStaticsByDate(fromDate,toDate){
         const query = {
            FromDate: fromDate ?? moment().subtract(30, 'days').format('MM/DD/YYYY'),
            ToDate: toDate ?? moment().subtract(1, 'days').format('MM/DD/YYYY'),
            OrderBy: 'date',
         }
         return query;
      },
      staticsHandler(){
         /** data-response
          * consultations: 8
            prescriptions: 0
            statisticByTime: "3"
            ** data-config
            {
               time: "02/2022",
               value: 55,
               type: "Đơn thuốc" || "Buổi tư vấn",
            },
         */ 
        this.data = [];
         this.getManagerStaticsPrescriptionConsultation.forEach(item => {
            this.destructorResponseData(item.consultations ?? 0,0,'Buổi tư vấn',item.statisticByTime)
            this.destructorResponseData(0,item.prescriptions ?? 0,'Đơn thuốc',item.statisticByTime)
         });
      },
      destructorResponseData(consultations,prescriptions,type,time){
         const dataConfig = {
            time: null,
            value: null,
            type: null,
         }
         dataConfig.value = consultations ? consultations : prescriptions;
         dataConfig.type = type;
         dataConfig.time = `${time}` // TODO
         this.data.push(dataConfig);
      },
      ...mapActions(['managerGetStaticsPrescriptionConsultation'])
   },
   watch: {
      dataBySelected(){
         if(this.dataBySelected === 'Theo tháng'){
            const query = this.createQueryForStaticsByMonth()
            this.managerGetStaticsPrescriptionConsultation(query)
               .then(()=>{
                  this.staticsHandler()
               })
         } else {
            const query = this.createQueryForStaticsByDate()
            this.managerGetStaticsPrescriptionConsultation(query)
               .then(()=>{
                  this.staticsHandler()
               })
         }
      }
   }
};
</script>
<style >

</style>
