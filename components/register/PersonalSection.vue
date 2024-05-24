<script setup>
  import { format } from "date-fns";

  const props = defineProps({
    modelValue: Object,
    validation: Object,
  });
  const emits = defineEmits(["update:modelValue"]);

  function updateValue(value, key) {
    const newValue = { ...props.modelValue, [key]: value };
    emits("update:modelValue", newValue);
  }
</script>
<template lang="">
  <div class="flex flex-col gap-4 items-start w-full">
    <h3 class="font-bold text-lg">About you:</h3>
    <div class="flex flex-wrap gap-4 items-start w-full px-2">
      <UFormGroup label="" :error="validation.name.$error && 'Fill the field correctly'">
        <Input
          :modelValue="modelValue.name"
          inputClass="border border-neutral-100 rounded-lg"
          label="Name"
          @update:modelValue="(value) => updateValue(value, 'name')"
        />
      </UFormGroup>
      <UFormGroup
        class="max-w-40"
        help="You need to be between 18 year and 65 years."
        :error="validation.birthDate.$error && 'Fill the field correctly'"
      >
        <div class="flex flex-col justify-between gap-2">
          <p class="font-bold">Birth date</p>

          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(modelValue.birthDate, 'dd/MM/yyyy')" />

            <template #panel="{ close }">
              <DatePicker
                :modelValue="modelValue.birthDate"
                is-required
                @close="close"
                label="Birth date"
                @update:modelValue="(value) => updateValue(value, 'birthDate')"
              />
            </template>
          </UPopover>
        </div>
      </UFormGroup>
      <UFormGroup help="Numbers only." :error="validation.cpf.$error && 'Fill the field correctly'">
        <Input
          :modelValue="modelValue.cpf"
          type="number"
          inputClass="border border-neutral-100 rounded-lg"
          label="CPF"
          placeholder="Type your CPF..."
          @update:modelValue="(value) => updateValue(value, 'cpf')"
        />
      </UFormGroup>
      <UFormGroup help="Minimal R$1.000,00 ." :error="validation.monthly_income.$error && 'Fill the field correctly'">
        <Input
          :modelValue="modelValue.monthly_income"
          type="number"
          inputClass="border border-neutral-100 rounded-lg"
          label="Monthly Income"
          placeholder="Type your Monthly income..."
          @update:modelValue="(value) => updateValue(value, 'monthly_income')"
        />
      </UFormGroup>
    </div>
  </div>
</template>

<style lang=""></style>
