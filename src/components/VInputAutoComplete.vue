<template>
   <div class="autocomplete">
      <div class="autocomplete-input">
         <input
            type="text"
            v-model="search"
            @keydown.down="onArrowDown"
            @keydown.up="onArrowUp"
            @keydown.enter="onEnter"
            class=""
         /> 
         <div class="iconDropdown">
            <img :src="require('../assets/img/icons/dropdown.svg')" alt="" />
         </div>
      </div>
      <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
         <li
            v-for="(medicine,index) in listMedicine"
            :key="medicine.id"
            @click="setResult(medicine)"
            class="autocomplete-result"
            :class="{ 'is-active': index === arrowCounter }"
         >
            {{ medicine.name }}
         </li>
      </ul>
   </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
   name: "SearchAutocomplete",
   props: ['renderKey'],
   computed:{
      ...mapGetters(['listMedicine'])
   },
   data() {
      return {
         isOpen: false,
         search: "",
         isLoading: false,
         arrowCounter: -1,
      };
   },
   watch: {
      search(){
         this.autoComplete()
      },
      renderKey(){
         this.search = ""
      }
   },
   mounted() {
      document.addEventListener("click", this.handleClickOutside);
   },
   destroyed() {
      document.removeEventListener("click", this.handleClickOutside);
   },
   methods: {
      autoComplete(){
         const lenghtCondition = this.search.length ?? 0
         if(lenghtCondition%3 === 0 && lenghtCondition > 0){
            this.doctorGetMedicine(this.search).then(()=>{
               this.isOpen = true
            })
         }
      },
      setResult(result) {
         this.search = result.name;
         this.isOpen = false;
         this.$emit('get-medicine',result)
      },
      handleClickOutside(event) {
         if (!this.$el.contains(event.target)) {
            this.isOpen = false;
            this.arrowCounter = -1;
         }
      },
      onArrowDown() {
         if (this.arrowCounter < this.listMedicine.length) {
            this.arrowCounter = this.arrowCounter + 1;
         }
         if(this.arrowCounter >= this.listMedicine.length -1){
            this.arrowCounter = this.listMedicine.length -1
         }
      },
      onArrowUp() {
         if (this.arrowCounter > 0) {
            this.arrowCounter = this.arrowCounter - 1;
         }
      },
      onEnter() {
         this.search = this.listMedicine[this.arrowCounter].name;
         this.isOpen = false;
         this.arrowCounter = -1;
         this.$emit('get-medicine',this.listMedicine[this.arrowCounter])
      },
      ...mapActions(['doctorGetMedicine'])
   },
};
</script>

<style></style>
