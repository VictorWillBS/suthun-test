<script setup>
import { defineProps, onMounted } from 'vue';
const props = defineProps({
  iconClass:{
    type:String,
    default: 'h-8 w-8'
  }
})

const loadingText = ref({
  quote:'',
  index:0
})

function changeText(){
  const quotes = [
    'Japan consists of over 6,800 islands, but only around 430 are inhabited.',
    "Australia is home to the world's longest fence, the Dingo Fence, stretching over 5,600 kilometers.",
    "The Amazon Rainforest in Brazil produces about 20% of the world's oxygen",
    "Norway boasts some of the world's deepest underwater tunnels, with several exceeding 5 kilometers in length",
    "Canada has the longest coastline of any country in the world, stretching over 200,000 kilometers."
  ]

  if(quotes.length-1 === loadingText.value.index ){
    return loadingText.value.index = 0
  }
  loadingText.value.quote = quotes[loadingText.value.index]
  
  loadingText.value.index++
  return 
}

onMounted(() => {
  changeText()
  setInterval(changeText,10000)
})
</script>
<template lang="">
  <div class="w-full flex flex-col justify-center items-center gap-4">
    <UIcon name="i-svg-spinners-blocks-shuffle-2" dynamic class="flex-none" :class="iconClass"/>
    <div class="w-5/6 flex flex-col gap-1">
      <h5 class="font-bold text-center text-lg"> Did you know ?</h5>
      <p class="font-bold text-center"> {{loadingText.quote}}</p>
    </div>
  </div>
</template>
<style lang=""></style>
