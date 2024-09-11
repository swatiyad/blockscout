import axios from "axios";

document.addEventListener("DOMContentLoaded", async() => {
    const username = window.sessionStorage.getItem("username");
    const signInTextElement = document.querySelector(".sign-in-text");
  
    if (username !== null && username !== undefined) {
      signInTextElement.textContent = "Logout";
    }
  
    signInTextElement.addEventListener("click", () => {
      if (signInTextElement.textContent === "Logout") {
        window.sessionStorage.removeItem("username");
        window.location.href = "/signin";
      }
    });

    let livePrice = 0;
    const response = await axios.get('https://wyzthscan.org/node-api/get-wyz-live-price');  // Call your server API or proxy endpoint
    console.log("live price of wyz is:::", response.data);
    livePrice = response.data.data.price;

    // document.getElementById("wyz_price").innerText = Number(livePrice).toFixed(4);
    document.getElementById("topNavLivePrice").innerText = Number(livePrice).toFixed(4);
  document.getElementById("valueLivePrice").innerText = Number(livePrice).toFixed(4);

  });