import axios from "axios";
document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document.getElementById("tableBody");
  const topToken = document.getElementById("top-token");

//   let trans = `<div>
//     <div class="media align-items-center mb-1">
//       <div class="media-body">Top  Sender</div>
//       <div class="text-right">Total </div>
//     </div>
//     <div class="media align-items-center mb-1">
//       <div class="media-body">
//         <span
//           class="hash-tag text-truncate"
//           data-toggle="tooltip"
//           title=""
//           data-original-title="0x...000"
//           ><a
//             href="/address/0x...000"
//             >0x...000</a
//           ></span
//         >
//       </div>
//       <div class="text-secondary text-right">
//         <i class="fab fa-binance text-secondary mr-1"></i
//         >0
//       </div>
//     </div>
//     <hr class="pb-1 hr" />
//     <div class="media align-items-center mb-1">
//       <div class="media-body">Top  Receiver</div>
//       <div class="text-right">Total </div>
//     </div>
//     <div class="media align-items-center mb-1">
//       <div class="media-body">
//         <i
//           class="far fa-file-alt text-secondary mr-1"
//           data-toggle="tooltip"
//           title=""
//           data-original-title="Contract"
//         ></i
//         ><span
//           class="hash-tag text-truncate"
//           data-toggle="tooltip"
//           title=""
//           data-original-title="0x...000"
//           ><a
//             href="/address/0x...000"
//             >0x...000</a
//           ></span
//         >
//       </div>
//       <div class="text-secondary text-right">
//         <i class="fab fa-binance text-secondary mr-1"></i
//         >0
//       </div>
//     </div>
//     <hr class="pb-1 hr" />
//     <div class="media align-items-center mb-1">
//       <div class="media-body">Top Txn Count Sent</div>
//       <div class="text-right">Total Txn</div>
//     </div>
//     <div class="media align-items-center mb-1">
//       <div class="media-body">
//         <span
//           class="hash-tag text-truncate"
//           data-toggle="tooltip"
//           title=""
//           data-original-title="0x00"
//           ><a
//             href=/address/0x000
//             >0x...000</a
//           ></span
//         >
//       </div>
//       <div class="text-secondary text-right">0</div>
//     </div>
//     <hr class="pb-1 hr" />
//     <div class="media align-items-center mb-1">
//       <div class="media-body">Top Txn Count Received</div>
//       <div class="text-right">Total Txn</div>
//     </div>
//     <div class="media align-items-center mb-1">
//       <div class="media-body">
//         <i
//           class="far fa-file-alt text-secondary mr-1"
//           data-toggle="tooltip"
//           title=""
//           data-original-title="Contract"
//         ></i
//         ><span
//           class="hash-tag text-truncate"
//           data-toggle="tooltip"
//           title=""
//           data-original-title="0x000"
//           ><a
//             href=/address/0x000
//             >0x000</a
//           ></span
//         >
//       </div>
//       <div class="text-secondary text-right">0</div>
//     </div>
//     </div>
//   </div>`;

//   let token =`<div>
//   <div class="media align-items-center mb-1">
//     <div class="media-body">Top Tokens</div>
//     <div class="text-right">Total Transfer</div>
//   </div>
//   <div class="media align-items-center mb-1">
//     <div class="media-body">
//       <span
//         class="hash-tag text-truncate"
//         data-toggle="tooltip"
//         title=""
//         data-original-title="0x000"
//         ><a
//           href="/address/0x0000"
//           >0x000</a
//         ></span
//       >
//     </div>
//     <div class="text-secondary text-right">
//       <i class="fab fa-binance text-secondary mr-1"></i
//       >0
//     </div>
//   </div>
//   <hr class="pb-1 hr" />
//   <div class="media align-items-center mb-1">
//     <div class="media-body">Top Unique Sender</div>
//     <div class="text-right"></div>
//   </div>
//   <div class="media align-items-center mb-1">
//     <div class="media-body">
//       <i
//         class="far fa-file-alt text-secondary mr-1"
//         data-toggle="tooltip"
//         title=""
//         data-original-title="Contract"
//       ></i
//       ><span
//         class="hash-tag text-truncate"
//         data-toggle="tooltip"
//         title=""
//         data-original-title="0x000"
//         ><a
//           href="/address/0x000"
//           >0x00.000</a
//         ></span
//       >
//     </div>
//     <div class="text-secondary text-right">
//       <i class="fab fa-binance text-secondary mr-1"></i
//       >
//     </div>
//   </div>
//   <hr class="pb-1 hr" />
//   <div class="media align-items-center mb-1">
//     <div class="media-body">Top Unique Reciever</div>
//     <div class="text-right"></div>
//   </div>
//   <div class="media align-items-center mb-1">
//     <div class="media-body">
//       <span
//         class="hash-tag text-truncate"
//         data-toggle="tooltip"
//         title=""
//         data-original-title="0x000"
//         ><a
//           href="/address/0x000"
//           >0x000</a
//         ></span
//       >
//     </div>
//     <div class="text-secondary text-right"></div>
//   </div>
 
//   </div>
// </div>`


let trans= 
`<div>
<div class="table-content-loader my-1 loader-height"></div>
<div class="table-content-loader my-1 loader-height"></div>
<div class="table-content-loader my-1 loader-height"></div>
<div class="table-content-loader my-1 loader-height"></div>
</div>`
let token= 
`<div>
<div class="table-content-loader my-1 loader-height"></div>
<div class="table-content-loader my-1 loader-height"></div>
<div class="table-content-loader my-1 loader-height"></div>
<div class="table-content-loader my-1 loader-height"></div>
</div>`
  document.querySelector("#ContentPlaceHolder1_Div1a_body_1").innerHTML = trans;
  document.querySelector("#ContentPlaceHolder1_Div1a_body_2").innerHTML = token;
  const [topsender, maxRecieverCount, maxSendCount, api, TopTokenApi] =
  await Promise.all([
    axios.get("https://gcscan.io/node-api/topsender"),
    axios.get("https://gcscan.io/node-api/max-count-reciever"),
    axios.get("https://gcscan.io/node-api/max-count-sender"),
    axios.get("https://gcscan.io/node-api/top-stats-data"),
    axios.get("https://gcscan.io/node-api/token-data"),
  ]);

  const apiData = api.data;
  const topSenderData = topsender?.data;
  const maxRecieverCountDAta = maxRecieverCount?.data;
  const maxSendCountData = maxSendCount?.data;
  const TopTokenApiData =  TopTokenApi?.data
  console.log(
    apiData,
    topSenderData,
    maxRecieverCountDAta,
    maxSendCountData,
    "affg"
  );

  console.log(topSenderData.data[0].from_address, topSenderData.data[0],topSenderData.data[0].value / 1e18,TopTokenApiData, "trans12");



  apiData.transactions.forEach((transaction) => {
    const rows= document.createElement("tr");
    rows.innerHTML = `
    <td><a href=/block/${transaction.block_number}/transactions>${
      transaction.block_number
    }</a></td>
    <td><a href=/address/${
      transaction.from_address
    }>${transaction.from_address.slice(
      0,
      6
    )}...${transaction.from_address.slice(-6)}</a></td>
    <td><a href=/address/${
      transaction.to_address
    }>${transaction.to_address.slice(0, 6)}...${transaction.to_address.slice(
      -6
    )}</a></td>
    <td>${
      Number.isInteger(transaction.value / 1e18) == true
        ? transaction.value / 1e18
        : (transaction.value / 1e18).toFixed(2)
    }</td>
  `;
    tableBody.appendChild(rows);
  });
  
  apiData.topToken.forEach((detail) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${detail.symbol}</td>
      <td>${detail.name}</td>
      <td>${detail.type}</td>
      <td><a href=/address/${detail.address}>${detail.address.slice(
      0,
      6
    )}...${detail.address.slice(-6)}</a></td>
    `;
    topToken.appendChild(row);
  });

  trans = 
  `<div>
  <div class="media align-items-center mb-1">
    <div class="media-body">Top XUV Sender</div>
    <div class="text-right">Total XUV </div>
  </div>
  <div class="media align-items-center mb-1">
    <div class="media-body">
      <span
        class="hash-tag text-truncate"
        data-toggle="tooltip"
        title=""
        data-original-title=${topSenderData.data[0].from_address}
        ><a
          href=/address/${topSenderData.data[0].from_address}
          >${topSenderData.data[0].from_address.slice(
            0,
            5
          )}...${topSenderData.data[0].from_address.slice(-5)}</a
        ></span
      >
    </div>
    <div class="text-secondary text-right">
      <i class="fab fa-binance text-secondary mr-1"></i
      >${Number(topSenderData.data[0].value) / 1e18}
    </div>
  </div>
  <hr class="pb-1 hr" />
  <div class="media align-items-center mb-1">
    <div class="media-body">Top XUV Receiver</div>
    <div class="text-right">Total XUV</div>
  </div>
  <div class="media align-items-center mb-1">
    <div class="media-body">
      <i
        class="far fa-file-alt text-secondary mr-1"
        data-toggle="tooltip"
        title=""
        data-original-title="Contract"
      ></i
      ><span
        class="hash-tag text-truncate"
        data-toggle="tooltip"
        title=""
        data-original-title=${topSenderData.data[0].to_address}
        ><a
          href=/address/${topSenderData.data[0].to_address}
          >${topSenderData.data[0].to_address.slice(
            0,
            5
          )}...${topSenderData.data[0].to_address.slice(-5)}</a
        ></span
      >
    </div>
    <div class="text-secondary text-right">
      <i class="fab fa-binance text-secondary mr-1"></i
      >${Number(topSenderData.data[0].value)/1e18}
    </div>
  </div>
  <hr class="pb-1 hr" />
  <div class="media align-items-center mb-1">
    <div class="media-body">Top Txn Count Sent</div>
    <div class="text-right">Total Txn</div>
  </div>
  <div class="media align-items-center mb-1">
    <div class="media-body">
      <span
        class="hash-tag text-truncate"
        data-toggle="tooltip"
        title=""
        data-original-title=${maxSendCountData.data[0].from_address}
        ><a
          href=/address/${maxSendCountData.data[0].from_address}
          >${maxSendCountData.data[0].from_address.slice(
            0,
            5
          )}...${maxSendCountData.data[0].from_address.slice(-5)}</a
        ></span
      >
    </div>
    <div class="text-secondary text-right">${
      maxSendCountData.data[0].count
    }</div>
  </div>
  <hr class="pb-1 hr" />
  <div class="media align-items-center mb-1">
    <div class="media-body">Top Txn Count Received</div>
    <div class="text-right">Total Txn</div>
  </div>
  <div class="media align-items-center mb-1">
    <div class="media-body">
      <i
        class="far fa-file-alt text-secondary mr-1"
        data-toggle="tooltip"
        title=""
        data-original-title="Contract"
      ></i
      ><span
        class="hash-tag text-truncate"
        data-toggle="tooltip"
        title=""
        data-original-title=${maxRecieverCountDAta.data[0].to_address}
        ><a
          href=/address/${maxRecieverCountDAta.data[0].to_address}
          >${maxRecieverCountDAta.data[0].to_address.slice(
            0,
            5
          )}...${maxRecieverCountDAta.data[0].to_address.slice(-5)}</a
        ></span
      >
    </div>
    <div class="text-secondary text-right">${
      maxRecieverCountDAta.data[0].count
    }</div>
  </div>
  </div>
</div>`;


token =`<div>
<div class="media align-items-center mb-1">
<div class="media-body">Top Tokens</div>
<div class="text-right"> Transfer Amount</div>
</div>
<div class="media align-items-center mb-1">
<div class="media-body">
  <span
    class="hash-tag text-truncate"
    data-toggle="tooltip"
    title=${TopTokenApiData.data[0].token_address}
    ><a
      href=/address/${TopTokenApiData.data[0].token_address}
      >${TopTokenApiData.data[0].name}(${TopTokenApiData.data[0].symbol})</a
    ></span
  >
</div>
<div class="text-secondary text-right">
  <i class="fab fa-binance text-secondary mr-1"></i
  >${Number(TopTokenApiData.data[0].amount)/10**Number(TopTokenApiData.data[0].decimals)}
</div>
</div>
<hr class="pb-1 hr" />
<div class="media align-items-center mb-1">
<div class="media-body">Top Unique Sender</div>
<div class="text-right"></div>
</div>
<div class="media align-items-center mb-1">
<div class="media-body">
  <i
    class="far fa-file-alt text-secondary mr-1"
    data-toggle="tooltip"
    title=""
    data-original-title="Contract"
  ></i
  ><span
    class="hash-tag text-truncate"
    data-toggle="tooltip"
    title=""
    data-original-title=${TopTokenApiData.data[0].from_address}
    ><a
      href="/address/${TopTokenApiData.data[0].from_address}"
      >${TopTokenApiData.data[0].from_address}</a
    ></span
  >
</div>
<div class="text-secondary text-right">
  <i class="fab fa-binance text-secondary mr-1"></i
  >
</div>
</div>
<hr class="pb-1 hr" />
<div class="media align-items-center mb-1">
<div class="media-body">Top Unique Reciever</div>
<div class="text-right"></div>
</div>
<div class="media align-items-center mb-1">
<div class="media-body">
  <span
    class="hash-tag text-truncate"
    data-toggle="tooltip"
    title=${TopTokenApiData.data[0].to_address_hash}
    data-original-title=${TopTokenApiData.data[0].to_address_hash}
    ><a
      href=/address/${TopTokenApiData.data[0].to_address_hash}
      >${TopTokenApiData.data[0].to_address_hash}</a
    ></span
  >
</div>
<div class="text-secondary text-right"></div>
</div>

</div>
</div>`;


document.querySelector("#ContentPlaceHolder1_Div1a_body_1").innerHTML = trans;
document.querySelector("#ContentPlaceHolder1_Div1a_body_2").innerHTML = token;
});
