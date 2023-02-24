<template>
   <div>
      <!-- HomePage Main Button -->
      <router-link :to="{ name: linkAddress }" class="btn-homePage white" v-if="option == 'white'">
         {{ title }}
      </router-link>
      <router-link :to="{ name: linkAddress }" v-else class="btn-homePage">
         {{ title }}
      </router-link>
   </div>
</template>

<script>
export default {
   props: ["title", "route", "index", "option"],
   data() {
      return {
         linkAddress: this.route,
      };
   },
};
</script>

<style></style>
