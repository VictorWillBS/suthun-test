<script setup>
  import { defineProps, ref, onMounted, watch } from "vue";
  import Chart from "chart.js/auto";

  const props = defineProps({
    data: Object,
    label: String,
  });

  const chart = ref(null);
  const chartJS = ref();
  const componentKey = ref(0);

  function makeDatasets() {
    return Object.keys(props.data).map((key, index) => {
      return {
        type: index % 2 === 0 ? "bar" : "line",
        label: key,
        data: props.data[key],
        borderWidth: 2,
        borderSkipped: false,
        yAxisID: "y" + index,
      };
    });
  }
  watch(
    () => props.data,
    (val) => {
      if (chartJS.value) chartJS.value.destroy();
      chartJS.value = new Chart(chart.value, config({ datasets: makeDatasets() }));
    }
  );
  onMounted(() => {
    chartJS.value = new Chart(chart.value, config({ datasets: makeDatasets() }));
  });
</script>
<template lang="">
  <canvas ref="chart" :key="componentKey" />
</template>
<style lang=""></style>
