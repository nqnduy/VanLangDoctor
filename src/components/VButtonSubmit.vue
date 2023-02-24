<template>
   <div>
      <!-- Submit Access Button -->
      <button type="submit" v-if="option == 'white'" class="btn-submitForm white" :disabled="disabled">
         {{ title }}
      </button>
      <button type="submit" v-else class="btn-submitForm blue" :disabled="disabled">
         {{ title }}
      </button>
   </div>
</template>

<script>
export default {
   props: ["title", "option", "disabled"],
};
</script>

<style></style>
