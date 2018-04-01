export const loadData = ({commit}) => {
  fetch('https://stock-trader-1234.firebaseio.com/data.json')
  .then(res => res.json())
  .then(data => {
    if (data) {
      const funds = data.funds
      const stocks = data.stocks
      const stockPortfolio = data.stockPortfolio

      const portfolio = {
        funds,
        stockPortfolio
      }

      commit('SET_STOCKS', stocks)
      commit('SET_PORTFOLIO', portfolio)
    }
  })
  .catch(err => console.error('Error:', err))
  // .then(res => console.log('Success:', res))
}