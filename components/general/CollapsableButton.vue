<script setup>
  import { defineProps } from "vue";

  defineProps({
    type: {
      type: String,
      default: "a",
    },
    icon: {
      type: String,
    },
    iconClass: {
      type: String,
      default: "h-6 w-6 flex-none",
    },
    name: {
      type: String,
    },
  });
</script>

<template lang="">
  <component
  :is="type"
    href="/search"
    class="p-1.5 rounded-full bg-neutral-200/20 hover:bg-green-700/80 hover:text-green-50 group flex justify-center items-center sm:hover:gap-1 sm:gap-0 gap-2 transition-all duration-100 delay-100 ease-in-out"
  >
    <UIcon :name="icon" dynamic :class="iconClass" />

    <div
      class="w-full sm:max-w-0 overflow-hidden transition-all duration-500 delay-100 ease-in-out sm:group-hover:max-w-80 truncate group-hover:px-1 sm:block hidden"
    >
      {{ name }}
    </div>
  </component>
</template>

<style lang=""></style>
