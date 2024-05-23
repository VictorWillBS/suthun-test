<script setup>
  import { ref } from "vue";
  import axios from "axios";

  const countries = ref();
  const states = ref({ loading: false });
  const columns = [
    {
      key: "name.common",
      label: "Name",
    },
    {
      key: "capital",
      label: "Capital",
    },
    {
      key: "actions",
      label: "Actions",
      class: "text-end",
    },
  ];

  async function fetchCountries() {
    console.log("searching...");
    try {
      const { data } = await axios.get(`https://restcountries.com/v3.1/all?fields=name,capital`);

      localStorage.setItem("countries_list", JSON.stringify(data));

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async function getCountries() {
    states.value.loading = true;

    const countriesList = localStorage.getItem("countries_list");

    if (countriesList) {
      return (countries.value = JSON.parse(countriesList));
    }

    await fetchCountries();
  }
  onMounted(async () => {
    getCountries().finally(() => {
      states.value.loading = false;
    });
  });
</script>

<template lang="">
  <div class="p-6 flex flex-col gap-4 items-center">
    <h4 class="text-3xl font-bold text-center">Countries List</h4>
    <div class="bg-neutral-700 rounded-lg  sm:max-h-96 overflow-auto [&>.teste]hover:bg-neutral-500 max-w-screen-lg w-full">
      <UTable
        :columns="columns"
        :rows="countries"
        :loading="states.loading"
        :ui="{
          wrapper: 'border-0',
          td: { color: 'text-white ' },
          tr: { color: 'bg-sky-500 text-center' },
          th: { font: 'uppercase ', size: 'text-sm' },
          tbody: 'divide-y divide-neutral-600 dark:divide-neutral-600 odd:bg-neutral-600 even:bg-neutral-700 ',
          divide: 'divide-y-2  divide-neutral-600 dark:divide-neutral-500 ',
        }"
      >
        <template #capital-data="{ row }">
          <span>
            {{ row.capital?.join(", ") }}
          </span>
        </template>
        <template #actions-data="{ row }">
          <div class="flex justify-end" >
          <div class="flex justify-end sm:w-40">
            <CollapsableButton 
            name="See in Google Maps"
            icon="i-ic-outline-location-on"
            :href="`https://www.google.com/maps/place/${row.name.common}`"
            target="_blank"
            />
            
          </div>
          </div>
        </template>
      </UTable>
    </div>
  </div>
</template>

<style>
  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  tbody tr:hover {
    background-color: #525252;
  }
</style>
