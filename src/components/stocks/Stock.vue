// Stock on the Stocks Page


<template>
  <div class="stock">
    <div class="heading">
      <span class="name">{{ stock.name }}</span>
      <span class="price">(Price: ${{ stock.price }})</span>
    </div>
    <div class="content">
      <input type="number" v-model.number="quantity" placeholder="Quantity" :class="{ danger: insufficientFunds }">
      <button @click="buyStock" :disabled="isDisabled" :class="{ disabled: isDisabled }">
        {{ insufficientFunds ? 'Insufficient Funds' : 'Buy'}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'stock' ],
  data() {
    return {
      quantity: 0
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      }
      this.$store.dispatch('buyStock', order)
      this.quantity = 0
    }
  },
  computed: {
    funds() {
      return this.$store.getters.funds
    },
    isDisabled() {
      return this.quantity <= 0 || !Number.isInteger(this.quantity) || this.insufficientFunds
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds
    }
  }
}
</script>

<style scoped>
.stock {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.heading {
  background: var(--stocks-stock-heading-color);
  padding: 10px 14px;
}

.name {
  font-weight: bold;
}

.price {
  font-size: 13px;
}

.content {
  padding: 14px;
}

.content {
  display: flex;
  justify-content: space-between;
}

button {
  background: var(--stocks-stock-button-color);
}

button:not(.disabled):hover {
  background: lightgreen;
}

.disabled {
  background: grey;
  cursor: not-allowed;
}

.danger {
  border: 2px solid red;
}
</style>
