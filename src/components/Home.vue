<template>
  <div class="wrapper">
    <h1>Trade or View Your Portfolio</h1>
    <p>You may Save & Load your Data</p>
    <p>Click on 'End Day' to begin a new day!</p>
    <hr>
    <h2>Your Funds: {{ funds | currency }}</h2>
  </div>
</template>

<script>
export default {
  computed: {
    funds() {
      return this.$store.getters.funds
    },
  }
}
</script>

<style scoped>
.wrapper {
  background: var(--panel-color);
  margin-top: 20px;
  padding: 20px;
  border: 1px solid var(--border-color);

}
</style>
