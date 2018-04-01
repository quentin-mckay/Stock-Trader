<template>
  <div class="container">
    <app-header></app-header>
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  components: {
    appHeader: Header
  },
  created() {
    this.$store.dispatch('initStocks')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato');

:root {
  --bg-color: #888;
  --border-radius: 4px;
  --border-color: #ccc;
  
  --header-color: #eee;
  --header-link-hover-color: #ddd;
  --dropdown-hover-color: rgb(245, 225, 198);

  --panel-color: #eee;

  --stocks-stock-heading-color: rgb(211, 243, 211);
  --stocks-stock-button-color: rgb(131, 179, 152);

  --portfolio-stock-heading-color: rgb(184, 238, 241);
  --portfolio-stock-button-color: rgb(167, 102, 102);

  /* --grid-columns: 1fr 1fr; */
}

body {
  background: var(--bg-color);
  font-family: Lato;
}

.container {
  max-width: 1000px;
  margin: 20px auto;
}

input {
  padding: 5px 8px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  font-size: 1rem;
}

button {
  color: white;
  padding: 7px 10px;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
}

hr {
  border-bottom: 1px solid var(--border-color);
}

/* ==== Transition ==== */
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* this is a slide in from left exit to the right
/* .slide-fade-enter {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .2s linear;
}

</style>
