<template>
  <header>
    <router-link to="/" id="logo">Stock Trader</router-link>
    <router-link to="portfolio">Portfolio</router-link>
    <router-link to="stocks">Stocks</router-link>
    
    <div id="end-day" class="align-right" @click="endDay">End Day</div>

    <div id="save-load" class="dropdown" ref="dropdown">
      <div @click="toggleDropdownOpen">Save & Load <span class="triangle">&#9660;</span></div>
      <div class="dropdown-content" v-show="isDropdownOpen">
        <div @click="saveData" class="item">Save Data</div>
        <div @click="loadData" class="item">Load Data</div>
      </div>
    </div>
    
    <div>Funds: {{ funds | currency }}</div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isDropdownOpen: false
    }
  },
  computed: {
    funds() {
      return this.$store.getters.funds
    }
  },
  methods: {
    // ...mapActions([
    //   'randomizeStocks',
    //   'loadData'
    // ]),
    ...mapActions({
      randomizeStocks: 'randomizeStocks',
      loadFirebaseData: 'loadData'
    }),
    endDay() {
      this.randomizeStocks()
    },
    toggleDropdownOpen() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    documentClick(e) {
      if ( (this.$refs.dropdown !== e.target)  && (!this.$refs.dropdown.contains(e.target)) ){
        this.isDropdownOpen = false
      }
    },
    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks
      }
      
      fetch(this.$firebase_url + 'data.json', {
        method: 'PUT',
        body: JSON.stringify(data)
      })
      .catch(err => console.error('Error:', err))
      // .then(res => console.log('Success:', res))

      this.isDropdownOpen = false
    },
    loadData() {
      this.loadFirebaseData()  // maps to action 'loadData'
      this.isDropdownOpen = false
    }
  },
  created() {
    document.addEventListener('click', this.documentClick)
  },
  destroyed() {
    document.removeEventListener('click', this.documentClick)  // not sure why we need this but vue core member said we need it
  }
}
</script>

<style scoped>
header {
  background: #eee;
  border: 1px solid var(--border-color);
  display: flex;
  border-radius: var(--border-radius);

  /* overflow: hidden; */
}

header > * {
  padding: 10px 15px;
}

#logo  {
  font-weight: bold;
  background: black;
  color: white;
}

.align-right {
  margin-left: auto;
}

a {
  text-decoration: none;
  color: #888;
}

a:not(.logo):hover {
  background: var(--header-link-hover-color);
}

a.router-link-active {
  color: #000;
}

#end-day, #save-load {
  cursor: pointer;
}

#end-day:hover, #save-load:hover {
  background: var(--header-link-hover-color);
}


/* === dropdown menu === */
.dropdown {
  position: relative;
}

.dropdown-content {    
  position: absolute;
  z-index: 1;
  background: var(--header-color);
  top: 100%;   /* this aligns the top of the dropdown menu to the bottom left of the parent div.  Perfect!! */
  left: 0;

  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3)
}

.dropdown-content .item {
  padding: 5px 15px;
}

.dropdown-content .item:hover {
  background: var(--dropdown-hover-color);
}

.triangle {
  font-size: .7rem;
}

</style>
