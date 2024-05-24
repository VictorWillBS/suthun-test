<script setup>
  import axios from "axios";

  const props = defineProps({
    modelValue: Object,
    validation: Object,
  });

  const emits = defineEmits(["update:modelValue"]);

  async function getAddress(newValue, oldValue) {
    if (props.modelValue.cep.length !== 8 || newValue.cep === oldValue.cep) return;

    const { data } = await axios.get(`https://viacep.com.br/ws/${props.modelValue.cep}/json`);

    const newModelValue = {
      ...props.modelValue,
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    };
    emits("update:modelValue", newModelValue);

  }

  function updateValue(value, key) {
    const newValue = { ...props.modelValue, [key]: value };
    emits("update:modelValue", newValue);
  }

  watch(() => { return { cep: props.modelValue.cep }; }, getAddress);
</script>
<template lang="">
    <div class="flex flex-col gap-4 items-start w-full">
    <h3 class="font-bold text-lg">Your Address:</h3>
  <div class="flex flex-wrap gap-4 items-start w-full px-2">
    <UFormGroup :error="validation.cep.$error && 'Fill the field correctly'">
      <Input
        :modelValue="modelValue.cep"
        type="number"
        label="CEP:"
        placeholder="ex: 123456-789"
        inputClass="border border-neutral-100 rounded-lg"
        @update:modelValue="(value) => updateValue(value, 'cep')"
      />
    </UFormGroup>
    <UFormGroup :error="validation.street.$error && 'Fill the field correctly'">
      <Input
        :modelValue="modelValue.street"
        label="street:"
        inputClass="border border-neutral-100 rounded-lg"
        @update:modelValue="(value) => updateValue(value, 'street')"
      />
    </UFormGroup>

    <UFormGroup :error="validation.neighborhood.$error && 'Fill the field correctly'">
      <Input
        :modelValue="modelValue.neighborhood"
        label="neighborhood:"
        inputClass="border border-neutral-100 rounded-lg"
        @update:modelValue="(value) => updateValue(value, 'neighborhood')"
      />
    </UFormGroup>
    <UFormGroup :error="validation.state.$error && 'Fill the field correctly'">
      <Input
        :modelValue="modelValue.state"
        label="state:"
        inputClass="border border-neutral-100 rounded-lg"
        @update:modelValue="(value) => updateValue(value, 'state')"
      />
    </UFormGroup>
    <UFormGroup :error="validation.city.$error && 'Fill the field correctly'">
      <Input
        :modelValue="modelValue.city"
        label="city:"
        inputClass="border border-neutral-100 rounded-lg"
        @update:modelValue="(value) => updateValue(value, 'city')"
      />
    </UFormGroup>
  </div>
  </div>
</template>

<style lang=""></style>
