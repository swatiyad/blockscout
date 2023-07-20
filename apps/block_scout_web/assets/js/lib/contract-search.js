import axios from "axios";
const inner = document.querySelector(".contract-list-search");

console.log("hello");
// document.querySelector("#txtSearchContract-1").onchange = function () {
//   if (
//     document.querySelector("#txtSearchContract-1").value.startsWith("0x") ==
//     false
//   ) {
//     document.querySelector(".msg-smart").textContent = "*Enter Valid Address";
//     document.querySelector(".msg-smart").style.color = "red";
//   }
// };

document.querySelector("#heroSubscribeButton").onclick = async function () {
  let input = document.querySelector("#txtSearchContract-1").value;
  inner.textContent=""

  if (input.length != 0 || input.startsWith("0x")==true) {
    document.querySelector(".input_section_contract_search").style.display =
      "none";
    document.querySelector(".Output_section_contract_search").style.display =
      "block";
    const apiData = await axios.get(
      `https://testnet.xuvscan.com/node-api/search-in-code?query=${input}`
    );

    apiData.data.data==0?
    inner.textContent="No Data Found.":apiData.data.data.forEach((detail) => {
      const row = document.createElement("div");
      row.innerHTML = ` <div class="card mb-4">
      <div class="card-body p-4">
        <div class="d-md-flex align-items-center mb-2">
          <div
            class="d-flex align-items-center text-truncate me-1 mb-1 mb-md-0"
          >
            <i class="fa fa-file-alt text-muted me-1"></i
            ><a
              class="text-truncate text-primary"
              href="/address/0x${Buffer.from(detail.address_hash).toString(
                "hex"
              )}#code"
              >0x${Buffer.from(detail.address_hash).toString("hex")}</a>
          </div>
        </div>
        <pre class="text-break text-wrap my-3">
        ${detail.matching_line}
        >
        <div class="d-md-flex mt-2">
          <div class="mb-2 mb-md-0 text-truncate">
            <span data-bs-toggle="tooltip" data-bs-placement="top"
              ><i class="fa fa-file-user text-muted"></i>
              ${detail.name}</span
            >
          </div>
          <span class="d-none d-md-inline-block text-muted mx-3"
            >|</span
          >

          <div class="mb-2 mb-md-0">
          <span data-bs-toggle="tooltip" data-bs-placement="top"
            ><i class="fa fa-calendar-day text-muted"></i>
            ${detail.inserted_at?.slice(0,10)}</span
          >
         
          <span class="d-none d-md-inline-block text-muted mx-3"
            >|</span
          >
          </div>
          <div class="me-3">
            <span data-bs-toggle="tooltip" data-bs-placement="top"
              ><i class="fa fa-exchange-alt text-muted"></i>
              <a
                href="/txs?a=0x${Buffer.from(detail.address_hash).toString(
                  "hex"
                )}"
                >${detail.transaction_count}</a
              ></span
            >
          </div>
        </div>
      </div>
    </div>`;
      inner.appendChild(row);
      inner.classList.remove("text-center")
     
    });
  }
  
};


document.querySelector("#heroSubscribeButton-2").onclick = async function () {
    let input = document.querySelector("#txtSearchContract-2").value;
  
    if (input.length != 0 || input.startsWith("0x")==true) {
      inner.textContent=""
      document.querySelector(".input_section_contract_search").style.display =
        "none";
      document.querySelector(".Output_section_contract_search").style.display =
        "block";
      const apiData = await axios.get(
        `https://testnet.xuvscan.com/node-api/search-in-code?query=${input}`
      );
  
      apiData.data.data==0?
      inner.textContent="No Data Found.":apiData.data.data.forEach((detail) => {
        const row = document.createElement("div");
        row.innerHTML = ` <div class="card mb-4">
        <div class="card-body p-4">
          <div class="d-md-flex align-items-center mb-2">
            <div
              class="d-flex align-items-center text-truncate me-1 mb-1 mb-md-0"
            >
              <i class="fa fa-file-alt text-muted me-1"></i
              ><a
                class="text-truncate text-primary"
                href="/address/0x${Buffer.from(detail.address_hash).toString(
                  "hex"
                )}#code"
                >0x${Buffer.from(detail.address_hash).toString("hex")}</a>
            </div>
          </div>
          <pre class="text-break text-wrap my-3">
          ${detail.matching_line}
          >
          <div class="d-md-flex mt-2">
            <div class="mb-2 mb-md-0 text-truncate">
              <span data-bs-toggle="tooltip" data-bs-placement="top"
                ><i class="fa fa-file-user text-muted"></i>
                ${detail.name}</span
              >
            </div>
            <span class="d-none d-md-inline-block text-muted mx-3"
              >|</span
            >
            <div class="mb-2 mb-md-0">
            <span data-bs-toggle="tooltip" data-bs-placement="top"
              ><i class="fa fa-calendar-day text-muted"></i>
              ${detail.inserted_at}</span
            >
            </div>
            <span class="d-none d-md-inline-block text-muted mx-3"
              >|</span
            >
            <div class="me-3">
              <span data-bs-toggle="tooltip" data-bs-placement="top"
                ><i class="fa fa-exchange-alt text-muted"></i>
                <a
                  href="/txs?a=0x${Buffer.from(detail.address_hash).toString(
                    "hex"
                  )}"
                  >${detail.transaction_count}</a
                ></span
              >
            </div>
          </div>
        </div>
      </div>`;
        inner.appendChild(row);
        inner.classList.remove("text-center")
      });
    }
   
  };

{
  /* <div class="mb-2 mb-md-0">
<span data-bs-toggle="tooltip" data-bs-placement="top"
  ><i class="fa fa-calendar-day text-muted"></i>
  12/04/2022</span
>
</div> */
}
