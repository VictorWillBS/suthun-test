<script setup>
  import { defineProps } from "vue";
  defineProps({
    data: Object,
  });
</script>
<template lang="">
  <div class="bg-neutral-700 rounded-lg p-4 border flex flex-col gap-4 max-w-sm items-center">
    <h3 class="font-bold text-lg">Your Profile:</h3>
    <div class="flex flex-wrap gap-4">

    <template v-for="(item, index) in data" :key="index">
      <div class="flex flex-col gap-2" v-if="item">
        <p class="capitalize font-bold">{{index.replace('_',' ')}}</p>
        <div class="border border-neutral-300 rounded-lg p-2">
          {{ item }}
        </div>
      </div>
    </template>
  </div>
  </div>
</template>

<style lang=""></style>
