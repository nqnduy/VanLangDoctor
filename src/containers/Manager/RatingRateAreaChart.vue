<template>
  <div class="areaChart">
    <div class="areaChart__viewBy">
      <select v-model="dataBySelected" class="inputManagement">
        <option>Theo tháng</option>
        <option>Theo ngày</option>
      </select>
    </div>
    <AreaChart v-bind="config" :data="data" :key="render" />
  </div>
</template>

<script>
import Vue from "vue";
import { AreaChart } from "@opd/g2plot-vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
Vue.use(AreaChart);
export default {
  component: {
    AreaChart,
  },
  data() {
    return {
      render:0,
      dataBySelected:'Theo tháng',
      data: [],
      config: {
        xField: "time",
        yField: "Trung bình",
        smooth: "true",
        color: "#50c4cf",
        xAxis: {
          range: [0, 1],
          tickCount: 6,
          max: 0,
          label: {
            offset: 20,
            style: {
              fontFamily: "GR-SB",
              color: "#6B7280",
              fontSize: 13,
            },
          },
        },
        yAxis: {
          max: 5,
          label: {
            offset: 20,
            style: {
              fontFamily: "GR-SB",
              color: "#6B7280",
              fontSize: 13,
            },
            formatter: (time) => `${time} sao`,
          },
          line: {
            style: {
              stroke: "#c3c3c3",
              fillOpacity: "0.5",
              lineWidth: 1,
            },
          },
          grid: {
            line: {
              style: {
                stroke: "transparent",
                cursor: "pointer",
              },
            },
          },
        },
        areaStyle: () => {
          return {
            fill: "l(270) 0:#ffffff 0.5:#F1EDFF 1:#50C4CF",
            shadowColor: "white",
            shadowBlur: 10,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
          };
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getManagerStaticsAllRating"]),
  },
  created() {
    const query = this.createQueryForStaticsByMonth();
    this.managerGetStaticsAllRating(query).then(() => {
      this.staticsHandler();
    });
  },
  methods: {
    createQueryForStaticsByMonth() {
      // default: 7 months to current
      const query = {
        FromDate: moment().subtract(7, "months").format("MM/DD/YYYY"),
        ToDate: moment().subtract(1, "months").format("MM/DD/YYYY"),
        OrderBy: "month",
      };
      this.config.xAxis.max = 7
      this.render = Math.random() * 1000
      return query;
    },
    createQueryForStaticsByDate() {
      const query = {
        FromDate:  moment().subtract(30, 'days').format('MM/DD/YYYY'),
        ToDate:  moment().subtract(1, 'days').format('MM/DD/YYYY'),
        OrderBy: "date",
      };
      this.config.xAxis.max = 31
      this.render = Math.random() * 1000
      return query;
    },
    staticsHandler() {
    /**
     * {
          time: "08/2021",
          "Trung bình": 3.5,
        },
     */
      this.data = [];
      this.getManagerStaticsAllRating.value.forEach((item) => {
        this.destructorResponseData(
          item.ratingStatistic,
          item.statisticByTime
        );
      });
    },
    destructorResponseData(ratingStatistic, time) {
      const dataConfig = {
        time: null,
        "Trung bình": 0,
      };
      dataConfig.time = `${time}`;
      dataConfig["Trung bình"] = ratingStatistic;
      this.data.push(dataConfig);
    },
    ...mapActions(["managerGetStaticsAllRating"]),
  },
  watch: {
    dataBySelected() {
      if (this.dataBySelected == "Theo tháng") {
        const query = this.createQueryForStaticsByMonth();
        this.managerGetStaticsAllRating(query).then(() => {
          this.staticsHandler();
        });
      } else {
        const query = this.createQueryForStaticsByDate();
        this.managerGetStaticsAllRating(query).then(() => {
          this.staticsHandler();
        });
      }
    },
  },
};
</script>

<style>
</style>