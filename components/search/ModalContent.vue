<script setup>
  import axios from "axios";
  import { defineProps, onMounted, ref } from "vue";

  const props = defineProps({
    language: String,
  });

  const countries = ref([]);
  const states = ref({
    loading: false,
  });

  async function fetchCountries() {
    states.value.loading = true;
    const { data } = await axios.get(`https://restcountries.com/v3.1/lang/${props.language}?fields=name`);

    states.value.loading = false;

    return (countries.value = data);
  }

  onMounted(async () => {
    await fetchCountries();
  });
</script>
<template lang="">
  <div class="p-4 flex gap-6 flex-col">
    <h5 class="text-xl font-bold text-center">
      Countries that speaks
      <span class="text-green-500 underline">{{ language }}</span> :
    </h5>
    <div class="flex flex-wrap gap-2 justify-center max-h-80 overflow-auto" v-if="!states.loading">
      <template v-for="(country, index) in countries" :key="index" >
        <div class="bg-green-900 w-fit p-2 rounded-lg hover:bg-green-800">
          {{ country.name.common }}
        </div>
      </template>
    </div>
    <Loading v-else/>
  </div>
</template>
<style lang=""></style>
