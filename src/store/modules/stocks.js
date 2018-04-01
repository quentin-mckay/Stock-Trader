import dummy_stocks from '../../data/dummy_stocks.js'

// each stock is { id: , name: , price: }

const state = {
  stocks: []
}


const mutations = {
  'SET_STOCKS'(state, new_stocks) {
    state.stocks = new_stocks
  },
  // randomize stocks on End Day
  'RANDOMIZE_STOCKS'(state) {
    state.stocks.forEach(stock => {
      stock.price = Math.round(stock.price * (Math.random() + 0.5))  // we multiply by random number between 0.5 and 1.5
    })
  }
}


const actions = {
  initStocks({commit}) {
    commit('SET_STOCKS', dummy_stocks)
  },
  randomizeStocks({commit}) {
    commit('RANDOMIZE_STOCKS')
  },
  buyStock({commit}, order) {
    commit('BUY_STOCK', order)  // will be a portfolio.js mutation
  },
}


const getters = {
  stocks(state) {
    return state.stocks
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}