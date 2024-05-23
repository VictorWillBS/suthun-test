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


<template lang="">
  <div class="bg-black px-4 py-2 h-16 flex justify-between items-center">
    <div class="flex gap-4">

      <template v-for="(action, index) in actions" :key="index">
        <CollapsableButton :name="action.name" :icon="action.icon" :href = "action.href" />
      </template>
      
    </div>
    <div class="text-2xl font-bold">
      Country <span class="text-green-600">Finder</span>
    </div>
    <a href="/register" class="bg-green-800 p-2 rounded-lg font-bold">Junte-se</a>
  </div>
</template>
<style lang=""></style>
