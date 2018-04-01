// Stock on the Portfolio Page

<template>
  <div class="stock">
    <div class="heading">
      <span class="name">{{ stock.name }}</span>
      <span class="price">(Price: {{ stock.price | currency }} | Quantity: {{ stock.quantity }})</span>
    </div>
    <div class="content">
      <input type="number" v-model.number="quantity" placeholder="Quantity" :class="{ danger: insufficientQuantity }">
      <button @click="sellStock" :disabled="isDisabled" :class="{ disabled: isDisabled }">
        {{ insufficientQuantity ? 'Not enough stocks' : 'Sell' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'stock' ],   // stock is { name, price, quantity }
  data() {
    return {
      quantity: 0
    }
  },
  methods: {
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      }
      this.$store.dispatch('sellStock', order)
      this.quantity = 0
    }
  },
  computed: {
    funds() {
      return this.$store.getters.funds
    },
    isDisabled() {
      return this.quantity <= 0 || !Number.isInteger(this.quantity) || this.insufficientQuantity
    },
    insufficientQuantity() {
      return this.quantity > this.stock.quantity
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
  background: var(--portfolio-stock-heading-color);
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
  background: var(--portfolio-stock-button-color);
}

button:not(.disabled):hover {
  background: red;
}

.disabled {
  background: grey;
  cursor: not-allowed;
}

.danger {
  border: 2px solid red;
}
</style>
