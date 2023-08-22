import axios from "axios";
document.querySelector("#add-token-icon").onclick = async function(e){
    e.preventDefault()
    const taddress = document.getElementById("taddress").value;
    const imgUrl = document.getElementById("imgUrl").value;
    console.log(taddress,imgUrl,"imgUrlimgUrl");
    try {
        const id = document.querySelector("#add-token-icon").getAttribute("data-id");
        const apiUrl = "http://localhost:3000/node-api/add-icon";
        const requestData = {
          username:id,
          imageurl: imgUrl.trim(),
          tokenaddress:taddress.trim()
        };
        const data = await axios.post(apiUrl, requestData);
        if(data.data.status==true){
            document.querySelector(".alert-msg").textContent = "Submitted Successfully."
            document.querySelector(".alert-msg").style.color = "green";
            document.getElementById("taddress").value="";
     document.getElementById("imgUrl").value="";
        }else{
            document.querySelector(".alert-msg").textContent = "Something went wrong."
            document.querySelector(".alert-msg").style.color = "red";
        }

    } catch (error) {
        document.querySelector(".alert-msg").textContent = "Something went wrong."
        document.querySelector(".alert-msg").style.color = "red";
    }

  
}



  
