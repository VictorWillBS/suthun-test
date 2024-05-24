<script setup>
  import { defineProps, ref, watch } from "vue";

  const emits = defineEmits(["update:modelValue"]);
  const props = defineProps({
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "Type here...",
    },
    label:String,
    modelValue: String,
    inputClass:String,
  });
</script>
<template lang="">
  <div class="flex flex-col gap-2">
    <label class="font-bold">{{label}}</label>
    <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    class="bg-transparent placeholder:text-white placeholder:font-semibold font-semibold w-full focus:outline-0 py-2 px-4"
    :class="inputClass"
    @input="emits('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<style lang=""></style>
