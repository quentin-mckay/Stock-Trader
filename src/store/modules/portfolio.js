// each portfolio stock is an object with { id: , quantity: }
// the id (sent from the view when created) is used to find the stocks-stock


export default {
  state: {
    funds: 10000,
    stocks: []   // { id, quantity }
  },
  mutations: {
    // using Flux concept (constant string as mutation) + destructuring shorthand (for the 'order' payload)
    'BUY_STOCK'(state, {stockId, stockPrice, quantity}) {
      // check if we already have the stock (in which case we add to the quantity) or else add a new stock (id + quantity)
      const record = state.stocks.find(el => el.id === stockId)  // returns first found element  or  undefined if nothing returns true

      if (record) {
        record.quantity += quantity
      } else {
        state.stocks.push({
          id: stockId,
          quantity: quantity
        })
      }

      state.funds -= stockPrice * quantity
    },
    'SELL_STOCK'(state, {stockId, stockPrice, quantity}) {
      const record = state.stocks.find(el => el.id === stockId)  // retrieve stock  (much like a database)
      
      if (quantity >= record.quantity) {
        state.stocks.splice(state.stocks.indexOf(record), 1)  // remove from array if quantity would be 0 or less
      } else {
        record.quantity -= quantity
      }

      state.funds += stockPrice * quantity
    },
    'SET_PORTFOLIO'(state, portfolio) {
      state.funds = portfolio.funds
      state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : []
    }
  },
  actions: {
    sellStock({commit}, order) {
      commit('SELL_STOCK', order)
    }
  },
  getters: {
    stockPortfolio(state, getters) {
      // return an array using the id's from porfolio stocks here to retrieve the stocks from stocks.js  
      return state.stocks.map(portfolio_stock => {
        const record = getters.stocks.find(el => el.id == portfolio_stock.id)  // getters.stocks is the stocks.js getter (confusingly named)
        return {
          id: portfolio_stock.id,
          quantity: portfolio_stock.quantity,
          name: record.name,
          price: record.price
        }
      })
    },
    funds(state) {
      return state.funds
    }
  }
}