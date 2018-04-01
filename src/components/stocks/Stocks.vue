<template>
  <div class="grid">
    <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock"></app-stock>
  </div>
</template>

<script>
import Stock from './stock'

export default {
  components: {
    appStock: Stock
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks
    }
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
