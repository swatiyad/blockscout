import axios from "axios";

document.querySelector("#admin-login").onclick = async function(e){
    e.preventDefault()
    console.log("hello");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const apiUrl = "https://wyzthscan.org/node-api/login";
    const requestData = {
      username:username,
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
        window.localStorage.setItem("username", username);
        window.location.href = `/add-icon/${username}`;
    }
}


