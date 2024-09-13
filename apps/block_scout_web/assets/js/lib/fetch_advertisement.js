import axios from "axios";

document.addEventListener("DOMContentLoaded", async function () {
  const home = document.getElementById("home");
  const txnAd = document.getElementById("txnAd");


  try {
    const res = await axios.get("https://wyzthscan.org/node-api/get-adv-banners");
    
    // Filter the array to get objects with desired location
    const homeLocationFilteredData = res.data.filter(obj => obj.location === "home");
        const txnLocationFilteredData = res.data.filter(obj => obj.location === "txn");


    let index = 0;
    const intervalId = setInterval(() => {
      const imageUrl = homeLocationFilteredData[index].file_path; // Assuming the field name is "file_path"
      home.src = imageUrl;
      index = (index + 1) % homeLocationFilteredData.length;
    }, 3000);

    let index2 = 0;
    const intervalId2 = setInterval(() => {
      const imageUrl = txnLocationFilteredData[index2].file_path; // Assuming the field name is "file_path"
      txnAd.src = imageUrl;
      index2 = (index2 + 1) % txnLocationFilteredData.length;
    }, 3000);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

//   console.log("live price of wyz is got bro")

  // async function fetchLivePrice() {
    let livePrice = 0;
    let dil_market_cap = 0;
    const response = await axios.get('https://wyzthscan.org/node-api/get-wyz-live-price');  // Call your server API or proxy endpoint
    console.log("live price of wyz is:::", response.data);
    livePrice = response.data.data.price;
    dil_market_cap = response.data.data.diluted_market_cap


    document.getElementById("wyz_price").innerText = Number(livePrice).toFixed(4);
    document.getElementById("showMarketCap").innerText = Number(dil_market_cap).toFixed(2);

    
    document.getElementById("valueLivePrice").innerText = Number(livePrice).toFixed(4);
    console.log("runned")



    // document.getElementById('live-price').innerText = `Live price: $${data.price}`;
//   }

// fetchLivePrice()



});
