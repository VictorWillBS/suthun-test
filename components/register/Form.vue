<script setup>
  import { ref, watch ,defineEmits } from "vue";
  import { useVuelidate } from "@vuelidate/core";

  const emits = defineEmits(['submited'])

  const initialForm = {
    name: "",
    birthDate: new Date(),
    animal: "",
  };

  const form = ref(initialForm);
  const rules = ref(validationsRules());

  const v = useVuelidate(rules, form);

  async function validateWithVuelidate() {
    v.value.$touch();
    await v.value.$validate();
    return v.value.$errors.map((error) => ({
      message: error.$message,
      path: error.$propertyPath,
    }));
  }

  defineExpose({
    validate: async () => {
      await form.value.validate();
    },
  });

  function submit() {
    localStorage.setItem("profile", JSON.stringify(form.value));
    emits('submited')
  }
</script>
<template lang="">
  <UForm
    @submit="submit"
    class="bg-neutral-700 rounded-lg border flex flex-col gap-4 max-w-5xl"
    :validate="validateWithVuelidate"
  >
  <div class="px-6 py-4 border-b-2 border-neutral-600">
    <H2>Register</H2>
  </div>

    <div class="flex flex-col gap-8 items-center  p-4">
      <PersonalSection v-model="form" :validation="v" />
      <PetSection v-model="form" :validation="v" />
      <AddressSection v-model="form" :validation="v" />
    </div>
    <div class="flex justify-end border-t-2 border-neutral-600 px-6 py-4">
      <button type="submit" class="bg-green-800 py-2 max-w-40 w-full rounded-lg font-bold">Submit</button>
    </div>
  </UForm>
</template>
<style lang=""></style>
