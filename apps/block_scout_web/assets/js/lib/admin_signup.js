import axios from "axios";

document.getElementById("admin-signup").onclick = async function(e) {
  e.preventDefault();
  const user = document.getElementById("new-username").value;
  const email = document.getElementById("new-email").value;
  const pass = document.getElementById("new-password").value;
  const confirmEmail = document.getElementById("comfirm-email").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  
  console.log(user, email, pass, confirmEmail, confirmPassword, "confirmpassword");
  
  if (email !== confirmEmail) {
    document.querySelector(".confirm-email-alert").innerHTML = "<sup>*</sup> Incorrect Email.";
    document.querySelector(".confirm-email-alert").style.color = "red";
    document.querySelector(".confirm-email-alert").style.marginBottom = "20px";
    return; // Exit the function early if email doesn't match
  }else if(pass!==confirmPassword){
    document.querySelector(".confirm-password-alert").innerHTML = "<sup>*</sup> Incorrect password.";
    document.querySelector(".confirm-password-alert").style.color = "red";
    document.querySelector(".confirm-password-alert").style.marginBottom = "20px";
  }else{

  const apiUrl = "https://wyzthscan.org/node-api/register";
  const requestData = {
    username:user.toLowerCase(),
    email:email.toLowerCase(),
    password: pass,
  };
  
  try {
    const response = await axios.post(apiUrl, requestData);
    console.log("Signup Response:", response.data);
        if( response.data.message=='User registered successfully'){

        document.querySelector(".signup-form").style.display="none";
        document.querySelector(".signup-notification").innerHTML="Check Email for Verification.";

        }else if(response.data.status==false){
          document.querySelector(".signup-error").style.color="red"
          document.querySelector(".signup-error").innerHTML=response.data.message;
        }

    // Handle the response or perform further actions
  } catch (error) {
    console.error("Signup Error:", error);
    // Handle the error (display error message, etc.)
  }

  }
  
  // You can add more validation logic here
  



};
