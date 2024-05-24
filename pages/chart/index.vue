<script setup>
  import { onMounted, ref } from "vue";
  import axios from "axios";

  const regions = ref();
  const states = ref({
    loading: false,
  });
  const regionSelected = ref("europe");

  function selectRegion(name) {
    states.value.loading = true;
    regionSelected.value = name.toLowerCase();
  }

  function getRegions() {
    const localRegions = localStorage.getItem("regions");

    if (localRegions) return JSON.parse(localRegions);

    return fetchRegions().then((data) => data);
  }

  async function fetchRegions() {
    const { data } = await axios.get(`https://restcountries.com/v3.1/all?fields=region`);

    const regions = {};

    data.map((country) => {
      if (regions[country.region]) return;
      regions[country.region] = true;
    });

    localStorage.setItem("regions", JSON.stringify(regions));

    return regions;
  }

  function setLoaded(){
    states.value.loading = false;

  }

  onMounted(async () => {
    regions.value = await getRegions();
  });
</script>
<template>
  <div class="flex flex-col items-center p-8 gap-8">
    <div>
      <h4 class="text-3xl font-bold text-center">Country Demographic Data</h4>
    </div>
    <div class="flex gap-4">
      <template v-for="(item, key) in regions" :key="key">
        <button
          @click="selectRegion(key)"
          :disabled="states.loading"
          class="hover:bg-green-800 p-2 rounded-lg transition duration-100 ease-in-out shadow-sm disabled:bg-opacity-50 disabled:cursor-wait"
          :class="{
            'bg-green-900': key.toLowerCase() === regionSelected,
            'bg-neutral-600': key.toLowerCase() !== regionSelected,
          }"
        >
          {{ key }}
        </button>
      </template>
    </div>
    <RegionChart :region="regionSelected" @loaded="setLoaded" />
  </div>
</template>
<style></style>
