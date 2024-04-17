import axios from "axios";
document.addEventListener("DOMContentLoaded", async function () {

  const home = document.getElementById("home");

  try {
    const res = await axios.get("http://localhost:3000/node-api/get-adv-banners");
    
    // Filter the array to get objects with desired location
  
    // const homeLocationFilteredData = res.data.filter(obj => obj.location === "home");
    // const txnLocationFilteredData = res.data.filter(obj => obj.location === "txn");
    // const contractLocationFilteredData = res.data.filter(obj => obj.location === "contract");

    // console.log("---xxxxxx---->",homeLocationFilteredData,txnLocationFilteredData,contractLocationFilteredData)



    // let index = 0;
    // const intervalId = setInterval(() => {
    //   const imageUrl = filteredData[index].imageUrl; // Assuming the field name is "imageUrl"
    //   home.src = imageUrl;
    //   index = (index + 1) % filteredData.length;
    // }, 5000);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
