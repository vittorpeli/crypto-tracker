const api = "https://api.coinranking.com/v2/coins"
const apiKey = "coinranking8be1b9915d9f2338404077e91278d7face49636dbb768991"
  
const coinContainer = document.querySelector(".coin")
const searchInput = document.getElementById("search-input")
  
function fetchCoins() {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      setCoins(data.data.coins)
    })
    .catch(error => console.log(error))
}
  
function setCoins(coins) {
  coinContainer.innerHTML = ""
  
  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(searchInput.value.toLowerCase()))
    filteredCoins.forEach(coin => {
      const coinElement = createCoin(coin)
      coinContainer.appendChild(coinElement)
  })
    
}
  
function createCoin(coin) {
  const coinElement = document.createElement("div")
  coinElement.className = "coin-container"
  
  coinElement.innerHTML = `
    <div class="coin-row">
      <div class="coin-coin">
        <img src="${coin.iconUrl}" alt="coin">
        <h1>${coin.name}</h1>
        <p class="coin-symbol">${coin.symbol}</p>
      </div>
      <div class="coin-data">
        <p class="coin-price">$${coin.price}</p>
        <p class="coin-volume">$${coin["24hVolume"].toLocaleString()}</p>
        <p class="coin-percent ${coin.change < 0 ? "red" : "green"}">
          ${coin.change} %
        </p>
        <p class="coin-marketcap">Mkt Cap: $ ${coin.marketCap.toLocaleString()}</p>
      </div>
    </div>
  `
    return coinElement
  }
  
function inputHandler() {
    fetchCoins()
}
searchInput.addEventListener("input", inputHandler)  

fetchCoins()