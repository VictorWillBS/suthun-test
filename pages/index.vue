<template lang="">
  <div class="p-6 flex flex-col items-center gap-6">
    <H2> Bem-vindo </H2>
  <div class=" flex flex-col items-center  justify-between gap-4 bg-neutral-600 p-8 rounded-lg">
    
    <h4 class="font-bold"> Você deseja começar por: </h4>
    <div class="flex gap-4 justify-center">
      <template v-for="(action, index) in actions" :key="index">
        <CollapsableButton :name="action.name" :icon="action.icon" :href = "action.href" />
      </template>
    </div>
      
  </div>
  </div>
</template>
<script setup>
const actions = [
  {
    name:"Search",
    href:'/search',
    icon:'i-ic-round-search'
  },
  {
    name:"List",
    href:'/list',
    icon:'i-ic-baseline-format-list-bulleted'
  },
  {
    name:"Data Chart",
    href:'/chart',
    icon:'i-ic-outline-stacked-bar-chart'
  }
]
</script>
<style lang="">
  
</style>