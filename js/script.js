//select Elements  && defining variables
const url = "https://bitpay.com/api/rates";
const BTC = document.getElementById("BTC");
const USD = document.getElementById("USD");
const EUR = document.getElementById("EUR");
const GBP = document.getElementById("GBP");
const JPY = document.getElementById("JPY");
const CAD = document.getElementById("CAD");
const refresh = document.getElementById("refresh");
const search = document.getElementById("country-code");
let newConversion = document.getElementById("new-conversion");
let newPrice = document.getElementById("new-price");

//define functions and classes
class Bitcoin {
  constructor() {
    this.getPrices();
  }

  getPrices() {
    $.ajax({
      url: url,
      dataType: "json",
      success: data => {
        this.prices = data;
        this.setPrices(this.prices);
      },
      error: error => {
        console.log("There was an error getting data from the API");
      }
    });
  }

  setPrices(prices) {
    BTC.textContent = prices[0].rate.toFixed(2);
    USD.textContent = prices[2].rate.toFixed(2);
    EUR.textContent = prices[3].rate.toFixed(2);
    GBP.textContent = prices[4].rate.toFixed(2);
    JPY.textContent = prices[5].rate.toFixed(2);
    CAD.textContent = prices[6].rate.toFixed(2);
  }

  refresh() {
    this.getPrices();
  }
}

//adding event listeners, calling functions, and creating instances of classes

const bitcoin = new Bitcoin();

newConversion.style.display = "none";
newPrice.style.display = "none";

refresh.addEventListener("click", () => {
  bitcoin.refresh();
  console.log("Refreshing Bit Coin Prices");
});

search.addEventListener("click", () => {
  newConversion.innerHTML = "";
  newPrice.innerHTML = "";
  let countryCode = window.prompt("Input Curreny Code to Search").toUpperCase();
  console.log(bitcoin.prices);
  console.log(bitcoin.prices.length);
  for(let i = 7; i < bitcoin.prices.length; i++ ){
    if (countryCode === bitcoin.prices[i].code) {
      newConversion.innerHTML = `<h3>BTC/${countryCode}</h3>`;
      newPrice.innerHTML = bitcoin.prices[i].rate.toFixed(2);
      newConversion.style.display = "flex";
      newPrice.style.display = "flex";
    }
  }
  return;
});
