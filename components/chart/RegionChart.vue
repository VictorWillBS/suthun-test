<script setup>
  import axios from "axios";
  import { defineEmits, defineProps, watch } from "vue";

  const props = defineProps({
    region: String,
  });
  const emits = defineEmits(["loaded"]);

  const data = ref({
    population: {},
    area: {},
  });

  async function getRegionData() {
    const regionDataJson = localStorage.getItem(`${props.region}_data`);
    if (regionDataJson) return (data.value = JSON.parse(regionDataJson));

    const response = await fetchRegionData();
    const transformedData = prepareDataToChart(response.data);

    localStorage.setItem(`${props.region}_data`, JSON.stringify(transformedData));

    return (data.value = transformedData);
  }

  async function fetchRegionData() {
    try {
      const regionData = await axios.get(
        `https://restcountries.com/v3.1/region/${props.region}?fields=area,population,name`
      );

      return regionData;
    } catch (error) {
    }
  }

  watch(
    () => {
      return { region: props.region };
    },
    async (val) => {
      await getRegionData();
      emits("loaded");
    }
  );

  onMounted(async () => {
    await getRegionData();
  });
</script>
<template lang="">
  <div class="w-full gap-4 flex flex-wrap justify-center">
    <template v-for="(regionChunk, index) in data" :key="index">
      <div class="bg-neutral-700 p-4 rounded border border-neutral-100 w-3/5">
        <Chart :data="regionChunk" />
      </div>
    </template>
  </div>
</template>
<style lang=""></style>
