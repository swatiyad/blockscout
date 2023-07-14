
import axios from "axios"

console.log("hello")
document.querySelector("#txtSearchContract-1").onchange = function() {
    console.log("hello")
        
    if (document.querySelector("#txtSearchContract-1").value.startsWith("0x") == false) {
      document.querySelector(".msg-smart").textContent = "Enter Valid Address";
    }
  }

  document.querySelector("#heroSubscribeButton").onclick = async function(){
    let input = document.querySelector("#txtSearchContract-1").value
const data  = await axios.get(`http://localhost:3000/node-api/search-in-code?query=${input}`)

const html= `
<div class="card mb-4">
  <div class="card-body p-4">
    <div class="d-md-flex align-items-center mb-2">
      <div
        class="d-flex align-items-center text-truncate me-1 mb-1 mb-md-0"
      >
        <i class="far fa-file-alt text-muted me-1"></i
        ><a
          class="text-truncate text-primary"
          href="/address/0xc33d23aa4b8a3dd2a3c539276ab57363cc927202#code"
          >0xc33d23aa4b8a3dd2a3c539276ab57363cc927202</a
        >
      </div>
    </div>
    <pre class="text-break text-wrap my-3">
ETHER = TetherToken(<mark>0xdAC17F958D2ee523a2206206994597C13D831ec7</mark>);\r\n    IERC20 public constant SPELL =</pre
    >
    <div class="d-md-flex">
      <div class="mb-2 mb-md-0 text-truncate">
        <span data-bs-toggle="tooltip" data-bs-placement="top"
          ><i class="far fa-file-user text-muted"></i>
          CauldronV3</span
        >
      </div>
      <span class="d-none d-md-inline-block text-muted mx-3"
        >|</span
      >
      <div class="mb-2 mb-md-0">
        <span data-bs-toggle="tooltip" data-bs-placement="top"
          ><i class="far fa-calendar-day text-muted"></i>
          12/04/2022</span
        >
      </div>
      <span class="d-none d-md-inline-block text-muted mx-3"
        >|</span
      >
      <div class="me-3">
        <span data-bs-toggle="tooltip" data-bs-placement="top"
          ><i class="far fa-exchange-alt text-muted"></i>
          <a
            href="/txs?a=0xc33d23aa4b8a3dd2a3c539276ab57363cc927202"
            >5 txns</a
          ></span
        >
      </div>
    </div>
  </div>
</div>`;
  }