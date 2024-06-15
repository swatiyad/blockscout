import axios from "axios";

document.querySelector("#admin-login").onclick = async function(e){
    e.preventDefault()
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const apiUrl = "https://zakscan.io/node-api/admin-login";
    const requestData = {
      username:username.toLowerCase(),
      password: password,
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
        window.sessionStorage.setItem("username", username);
        window.location.href = `/admin-dashboard/${username}`;
    }
}


