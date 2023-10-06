import axios from "axios";

document.querySelector(".verifybutton").onclick = async function(){
    const verifyButton = document.querySelector(".verifybutton");
    const id = verifyButton.getAttribute("data-id");
    const apiUrl = "https://wyzthscan.org/node-api/verification-status";
    const requestData = {
      username:id,
      isVerified:true,
     
    };
    try {
        const response = await axios.post(apiUrl, requestData);
        console.log("Signup Response:", response.data);
            if(response.data.status==true){
                window.location.href = "/signin"    
            }
    
        // Handle the response or perform further actions
      } catch (error) {
        console.error("Signup Error:", error);
        // Handle the error (display error message, etc.)
      }
}
