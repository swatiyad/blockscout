import axios from "axios";

// document.querySelector("#add-token-icon").onclick = async function(e){
//     e.preventDefault()
//     const taddress = document.getElementById("taddress").value;
//     const imgUrl = document.getElementById("imgUrl").value;
//     console.log(taddress,imgUrl,"imgUrlimgUrl");
//     try {
//         const id = document.querySelector("#add-token-icon").getAttribute("data-id");
//         const apiUrl = "http://localhost:3000/node-api/add-icon";
//         const requestData = {
//           username:id.toLowerCase(),
//           imageurl: imgUrl.trim(),
//           tokenaddress:taddress.toLowerCase().trim()
//         };
//         const data = await axios.post(apiUrl, requestData);
//         if(data.data.status==true){
//             document.querySelector(".alert-msg").textContent = "Submitted Successfully."
//             document.querySelector(".alert-msg").style.color = "green";
//             document.getElementById("taddress").value="";
//      document.getElementById("imgUrl").value="";
//         }else{
//             document.querySelector(".alert-msg").textContent = "Something went wrong."
//             document.querySelector(".alert-msg").style.color = "red";
//         }

//     } catch (error) {
//         document.querySelector(".alert-msg").textContent = "Something went wrong."
//         document.querySelector(".alert-msg").style.color = "red";
//     }  
// }



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-icon");
  const alertMsg = form.querySelector(".alert-msg");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const tokenAddress = document.getElementById("taddress").value;
    const imageFile = document.getElementById("imgUrl").files[0];
    const id = document.querySelector("#add-token-icon").getAttribute("data-id");

    const formData = new FormData();
    formData.append("tokenaddress", tokenAddress.toLowerCase());
    formData.append("image", imageFile);
    formData.append("username",id)
    try {
       
      const response = await axios.post("https://wyzthscan.org/node-api/add-icon", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.status) {
        alertMsg.textContent = "Icon added successfully.";
      } else {
        alertMsg.textContent = response.data.msg;
      }
    } catch (error) {
      console.error("Error adding icon:", error);
      alertMsg.textContent = "An error occurred while adding the icon.";
    }
  });
});



  
