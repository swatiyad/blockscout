import axios from "axios";

document.querySelector("#admin-reset").onclick = async function(e){
    e.preventDefault()
    const email = document.getElementById("reset-email").value;
    const newPassword = document.getElementById("reset-password").value;
    const apiUrl = "https://wyzthscan.org/node-api/forgot-password";
    const requestData = {
        email:email.toLowerCase(),
        newPassword: newPassword,
    };
    const data = await axios.post(apiUrl, requestData);
    console.log(data.data.status,"data")
    if(data.data.status==false){
        document.querySelector(".alert-msg").style.color = "red";
        document.querySelector(".alert-msg").style.marginBottom = "10px";
        document.querySelector(".alert-msg").textContent = data.data.message;
        
    }else{
        document.querySelector(".alert-msg").style.color = "green";
        document.querySelector(".alert-msg").textContent = data.data.message;
        window.location.href = `/signin`;
    }
}


