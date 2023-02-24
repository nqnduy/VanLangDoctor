<template>
   <div class="ratingRate">
      <div class="ratingRate__title StatisticTitle">Tỉ lệ đánh giá</div>
      <div class="ratingRate__flexWrap">
         <div>
            <div class="ratingRate__flexWrap-title">Tổng quan</div>
            <p>Tỉ lệ đánh giá theo số sao</p>
         </div>
         <RatingRatePieChart />
      </div>
      <RatingRateAreaChart/>
   </div>
</template>

<script>
import RatingRatePieChart from "./RatingRatePieChart.vue";
import RatingRateAreaChart from "./RatingRateAreaChart.vue"
export default {
   components: {
      RatingRatePieChart,
      RatingRateAreaChart,
   },
};
</script>

<style>
</style>
