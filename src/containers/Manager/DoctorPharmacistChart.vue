<template>
  <PieChart
    v-bind="config"
    :data="data"
    style="width: 70%"
    :key="reRenderAfterGetData"
  />
</template>

<script>
import Vue from "vue";
import { PieChart } from "@opd/g2plot-vue";
import { mapActions, mapGetters } from "vuex";

Vue.use(PieChart);
export default {
  component: {
    PieChart,
  },
  data() {
    return {
      reRenderAfterGetData: 0,
      data: [
        { type: "Hoàn thành", value: 0 },
        { type: "Đang chờ", value: 0 },
        { type: "Bị hủy", value: 0 },
      ],
      config: {
        appendPadding: 10,
        angleField: "value",
        colorField: "type",
        radius: 0.8,
        innerRadius: 0.64,
        color: ["#50C4CF", "#D0D2DA", "#FF8181"],
        meta: {
          angleField: "Tổng cộng",
          style: {
            fontFamily: "GR",
          },
          value: {
            formatter: (v) => `${v} buổi`,
          },
        },
        label: {
          type: "spider",
          labelLine: true,
          style: {
            fill: "black",
            textAlign: "center",
            fontFamily: "GR-B",
            shadowColor: "#c3c3c3",
            shadowBlur: "2",
            shadowOffsetX: 1,
            shadowOffsetY: 1,
          },
          autoRotate: false,
          formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        },
        legend: {
          position: "left-top",
          marker: {
            spacing: 20,
            style: {
              fontSize: 18,
            },
          },
          title: {
            text: "Tỉ lệ trạng thái buổi tư vấn toàn thời gian",
            spacing: 80,
            style: {
              fontFamily: "GR-B",
              fontSize: 15,
              fillOpacity: 0.5,
            },
          },
          itemName: {
            style: {
              fontFamily: "GR",
              fontSize: 18,
              letterSpacing: -0.5,
            },
            spacing: 30,
          },
          itemValue: {
            formatter: (text, item) => {
              const items = this.data.filter((d) => d.type === item.value);
              return items.length
                ? items.reduce((a, b) => a + b.value, 0) / items.length
                : "-";
            },
            style: {
              fontFamily: "GR",
              fontSize: 15,
              opacity: 0.65,
            },
          },
          itemMarginBottom: 20,
          label: {
            align: "rail",
          },
        },
        statistic: {
          title: {
            content: "Tổng cộng",
            style: {
              fontFamily: "GR",
              fontSize: 18,
            },
          },
          content: {
            offsetY: 10,
            style: {
              fontFamily: "GR-B",
              fontSize: 25,
            },
          },
        },
        interactions: [
          { type: "element-selected" },
          { type: "element-active" },
          {
            type: "pie-statistic-active",
            cfg: {
              start: [
                {
                  trigger: "element:mouseenter",
                  action: "pie-statistic:change",
                },
                {
                  trigger: "legend-item:mouseenter",
                  action: "pie-statistic:change",
                },
              ],
              end: [
                {
                  trigger: "element:mouseleave",
                  action: "pie-statistic:reset",
                },
                {
                  trigger: "legend-item:mouseleave",
                  action: "pie-statistic:reset",
                },
              ],
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["getManagerStaticsAllConsultationRatio", "getReflectDate"]),
  },
  created() {
    this.managerGetStaticsAllConsultationRatio().then(() => {
      this.staticsHandler();
      this.reRenderAfterGetData = Math.random() * 10000;
    });
  },
  methods: {
    staticsHandler() {
      const { cancelConsultation, doneConsultation, waitingConsultation } =
        this.getManagerStaticsAllConsultationRatio;
      this.data.forEach((item) => {
        switch (item.type) {
          case "Hoàn thành":
            item.value = doneConsultation;
            break;
          case "Đang chờ":
            item.value = waitingConsultation;
            break;
          case "Bị hủy":
            item.value = cancelConsultation;
            break;
        }
      });
    },
    ...mapActions(["managerGetStaticsAllConsultationRatio"]),
  },
  watch: {
    getReflectDate() {
      this.managerGetStaticsAllConsultationRatio(this.getReflectDate).then(() => {
        this.staticsHandler();
        this.reRenderAfterGetData = Math.random() * 10000;
      });
    },
  },
};
</script>

<style scoped>
</style>