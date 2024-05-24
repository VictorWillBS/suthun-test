<script setup>
import axios from 'axios';
import { defineProps,onMounted, ref } from 'vue';

const props = defineProps({
  language: String
})

console.log(props);
const countries = ref()

async function fetchCountries() {
  const {data} =  await axios.get(`https://restcountries.com/v3.1/lang/${props.language}?field=name`)
  return countries.value = data
}

onMounted(async()=>{
  await fetchCountries()
})
</script>
<template lang="">
  <div>
    sou um modal em {{language}}
    <template v-for="(name, index) in countries" :key="index">
      <div>
        {{name.common}}
      </div>
    </template>
  </div>
</template>
<style lang="">
  
</style>