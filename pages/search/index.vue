<script setup>
  import { ref } from "vue";
  import { debounce } from "lodash";
  import axios from "axios";

  const searchName = ref("");
  const countries = ref();
  const modal = ref({
    props:{
      isOpen:false,
      language:''
    }
  })

  function openModal(language) {
    modal.value.props.isOpen = true;
    modal.value.props.language = language;
  }
  function close() {
    modal.value.props.isOpen = false;
  }

  async function search() {
    try {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${searchName.value}?fields=name,languages,cca2`
      );

      countries.value = data;
    } catch (error) {
      countries.value = [];
    }
  }
</script>

<template>
  <div class="h-full flex flex-col items-center p-6">
    <form class="py-4 flex flex-col gap-4 items-center justify-center" @submit.prevent="search">
      <h4 class="text-3xl font-bold text-center">Search Countries</h4>
      <div class="rounded-lg bg-white/25 w-full border border-white/30 flex focus:outline focus:outline-indigo-400">
        <input
          type="text"
          placeholder="Search by name..."
          v-model="searchName"
          class="bg-transparent placeholder:text-white placeholder:font-semibold font-semibold w-full focus:outline-0 py-2 px-4"
        />

        <button class="py-1 px-4 flex-none font-bold hover:scale-105 transition duration-150 ease-in-out" type="submit">
          search
        </button>
      </div>
    </form>

    <div class="flex flex-wrap gap-4 justify-center w-full">
      <template v-for="(country, index) in countries" :key="index">
        <div class="bg-neutral-700 p-4 rounded-lg border border-white w-full max-w-80 sm:min-w-64">
          <div class="flex flex-col gap-4 justify-center h-full">
            <div class="flex gap-4 justify-between">
              <div class="max-w-[70%]">
                <h4 class="text-xl font-bold">{{ country.name.common }}</h4>
                <h4 class="font-semibold">{{ country.name.official }}</h4>
              </div>
              <img
                :src="`https://flagsapi.com/${country.cca2}/flat/64.png`"
                class="w-16 h-16"
                :alt="`${country.name.common} flag`"
              />
            </div>
            <div class="flex flex-col gap-2">
              <h4 class="font-bold">Languages:</h4>
              <div class="flex flex-row flex-wrap gap-2">
                <template v-for="(language, index) in country.languages" :key="index">
                  <button class="bg-lime-800 rounded-xl font-bold p-1 text-center w-fit px-2" @click="openModal(language)">
                    {{ language }}
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>

      <UModal v-model="modal.props.isOpen" :ui="{}">
        <ModalContent :language="modal.props.language"/>
      </UModal>
    </div>
  </div>
</template>
