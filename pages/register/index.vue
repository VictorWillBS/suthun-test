<script setup>
  import { ref, onMounted } from "vue";

  const profile = ref();
  function getProfileFromLocal() {
    const profileJson = localStorage.getItem("profile");
    return profileJson ? JSON.parse(profileJson) : null;
  }

  function updateProfile(){
    profile.value = getProfileFromLocal();
  }

  onMounted(() => {
    profile.value = getProfileFromLocal();
  });
</script>
<template lang="">
  <div class="p-6 flex flex-col gap-4 items-center">
    <Form v-if="!profile" @submited="updateProfile"  />
    <Profile :data="profile" v-else />
  </div>
</template>
<style lang=""></style>
