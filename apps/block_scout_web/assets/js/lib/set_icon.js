import axios from "axios"
document.addEventListener("DOMContentLoaded", async function () {
    const dynamicIcon = document.getElementById("token-icon-updated");
    const currentIcon = document.getElementById("token-icon");
  
    const addrs = dynamicIcon.getAttribute("data-address-hash");
  
    let apiUrl = "http://localhost:3000/node-api/get-token-image";
    let requestData = {
      address: addrs
    };
  
    try {
      const response = await axios.post(apiUrl, requestData);

      const data = response.data;
      console.log(data.data[0].imageurl, "data");
      if(data.status==true){
      const imgElement = document.createElement("img");
      imgElement.src = `${data.data[0].imageurl}`; // Replace with your image URL
      imgElement.alt = "token";
      imgElement.width = 20;
      imgElement.height = 20;
      dynamicIcon.appendChild(imgElement);
      // currentIcon.setAttribute("data-display-token-icons","false");
      currentIcon.style.display = "none"
      }else{
        currentIcon.setAttribute("data-display-token-icons","true")
      }
    } catch (error) {
      console.error("Error fetching token image:", error);
    }
  });