<template>
  <div class="grid">
    <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock"></app-stock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Stock from './stock'

export default {
  components: {
    appStock: Stock
  },
  computed: {
    // using mapGetters just to show how we can (not needed as there's only one). same as writing code below
    ...mapGetters({   
      stocks: 'stockPortfolio'
    })
    // stocks() {
    //   return this.$store.getters.stockPortfolio
    // }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px 20px; 
  
  padding: 20px 10px;
}

@media screen and (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
