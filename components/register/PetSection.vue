<script setup>
  import { format } from "date-fns";
  import { useVuelidate } from "@vuelidate/core";

  const props = defineProps({
    modelValue: Object,
    validation: Object,
  });

  const emits = defineEmits(["update:modelValue"]);
  const petOptions = getPetOptions();

  function updateValue(value, key) {
    const newValue = { ...props.modelValue, [key]: value };
    emits("update:modelValue", newValue);
  }
</script>
<template lang="">
  <div class="flex flex-col gap-4 items-start w-full">
    <h3 class="font-bold text-lg">About your pet:</h3>
    <div class="flex flex-wrap gap-8 items-start w-full px-2">
      <UFormGroup :error="validation.animal.$error && 'Fill the field correctly'">
        <template #label>
          <span class="font-bold text-base">Which pet do you have:</span>
        </template>
        <URadio
          v-for="animal of petOptions.animals"
          :key="animal.value"
          :modelValue="modelValue.animal"
          v-bind="animal"
          @update:modelValue="(value) => updateValue(value, 'animal')"
        />
      </UFormGroup>
      <UFormGroup label="Choose your pet breed:" :error="validation.breed.$error && 'Fill the field correctly'">
        <template #label>
          <span class="font-bold text-base">Which pet do you have:</span>
        </template>
        <USelect
          v-model="modelValue.breed"
          :options="petOptions.breeds[modelValue.animal]"
          class="min-w-20"
          :disabled="!modelValue.animal"
          @update:modelValue="(value) => updateValue(value, 'breed')"
        />
      </UFormGroup>
      <UFormGroup
        :error="validation.monthly_income.$error && 'Fill the field correctly'"
        v-if="modelValue.breed === 'other'"
      >
        <Input
          :modelValue="modelValue.otherBreed"
          inputClass="border border-neutral-100 rounded-lg"
          label="Another Breed"
          placeholder="Type your pet Breed..."
          @update:modelValue="(value) => updateValue(value, 'otherBreed')"
        />
      </UFormGroup>
    </div>
  </div>
</template>

<style lang=""></style>
