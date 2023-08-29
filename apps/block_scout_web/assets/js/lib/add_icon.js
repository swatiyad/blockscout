import axios from "axios";
import Web3 from "web3";

async function connectWallet() {
  // Check if Web3 is available
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      return { success: true, web3, userAddress };
    } catch (error) {
      return { success: false, error: "User denied account access" };
    }
  } else {
    return { success: false, error: "Web3 is not available" };
  }
}

async function getAdminAddress(tokenAddress, contractAddress) {
  try {
    const response = await axios.post(
      "https://wyzthscan.org/node-api/get-token-creator",
      { tokenAddress }
    );
    if (response.data.status) {
      return (
        contractAddress.toLowerCase() ==
        response.data.creatorAddress.toLowerCase()
      );
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-icon");
  const alertMsg = form.querySelector(".alert-msg");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const connectionResult = await connectWallet();

    if (connectionResult.success) {
      const { web3, userAddress } = connectionResult;
      console.log("Connected to wallet with address:", userAddress);
      const tokenAddress = document.getElementById("taddress").value;
      const imageFile = document.getElementById("imgUrl").files[0];
      // const id = document
      //   .querySelector("#add-token-icon")
      //   .getAttribute("data-id");
     const id= window.sessionStorage.getItem("username")
      if (tokenAddress.startsWith("0x")) {
        const adminStatus = await getAdminAddress(tokenAddress, userAddress);

        if (adminStatus) {
          const formData = new FormData();
          formData.append("tokenaddress", tokenAddress.toLowerCase());
          formData.append("image", imageFile);
          formData.append("username", id);
          try {
            const response = await axios.post(
              "https://wyzthscan.org/node-api/add-icon",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (response.data.status) {
              alertMsg.textContent = "Icon added successfully.";
              setTimeout(() => {
                alertMsg.textContent = "";
              }, 10000);
            } else {
              alertMsg.textContent = response.data.msg;
            }
          } catch (error) {
            console.error("Error adding icon:", error);
            alertMsg.textContent = "An error occurred while adding the icon.";
          }
        } else {
          alertMsg.textContent = "Only token Creator can add image.";
          setTimeout(() => {
            alertMsg.textContent = "";
          }, 10000);
        }
      } else {
        window.alert("Enter Valid token Address.");
      }
    } else {
      console.error("Failed to connect to wallet:", connectionResult.error);
    }
  });
});
