import axios from "axios";
const topNft = document.querySelector("#top-nft");
const latestNftTransactions = document.querySelector("#latest-nft-transactions");
const topMint = document.querySelector("#latest-nft-mint");

document.addEventListener("DOMContentLoaded", async function () {
    const topNftApi = await axios.get(`https://wyzthscan.org/node-api/top-nft`);
    console.log(topNftApi.data.data,"topNft");

    topNftApi.data.data.forEach((detail) => {
        const row = document.createElement("div");
        row.innerHTML = `
        <div
        class="tile-- tile-type-transaction fade-in tile-status--success"
        data-test="transaction"
        data-identifier-hash="0xdd13b53ff322a74c3a168c050da22e903b0f607869f34f554fd5302a519e2a17"
      >
        <div
          class=""
          data-selector="token-transfers-toggle"
          data-test="chain_transaction"
        >
          <table class="table fixed-layout mb-0">
            <tbody class="table-group-divider validated_txns---">
              <!-- Color Block Transaction -->
              <tr>
               
                <td class="hide_for_hompage">
                  <div class="text-truncate width135">
                    <a
                      class="text-truncate text-bgreenlue"
                      data-test="transaction_hash_link"
                      href="/address/0x${Buffer.from(detail.contract_address_hash).toString("hex")}"
                      >0x${Buffer.from(detail.contract_address_hash).toString("hex")}</a
                    >
                  </div>
                
                </td>
  
                <td class="hide_for_hompage">
                <span class=" rounded-sm p-1">
                  <span class="fs-12">${detail.name} (${detail.symbol}) </span>
                 
                </span>
              </td>

                <td class="hide_for_hompage">
                  <span class=" rounded-sm p-1">
                    <span class="fs-12"> ${detail.type=="ERC-721"?"WRC-721":"WRC-20"} </span>
                   
                  </span>
                </td>
                <td class="hide_for_homepage text-center">
                  <div class="bs-label method ml-0 text-center">${detail.holder_count}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        `;
        topNft.appendChild(row);
      });
    
});


document.addEventListener("DOMContentLoaded", async function () {
  const latestNftTransactionsApi = await axios.get(`https://wyzthscan.org/node-api/latest-nft-transfer`);
  console.log(latestNftTransactionsApi.data.data,"topNft");

  latestNftTransactionsApi.data.data.forEach((detail) => {
      const row = document.createElement("div");
      row.innerHTML = `
      <div
      class="tile-- tile-type-transaction fade-in tile-status--success"
      data-test="transaction"
      data-identifier-hash="0xdd13b53ff322a74c3a168c050da22e903b0f607869f34f554fd5302a519e2a17"
    >
      <div
        class=""
        data-selector="token-transfers-toggle"
        data-test="chain_transaction"
      >
        <table class="table fixed-layout mb-0">
          <tbody class="table-group-divider validated_txns---">
            <!-- Color Block Transaction -->
            <tr>
            


              <!-- Transaction Hash  -->
              <td class="hide_for_homepage">
                <div class="text-truncate d-flex text-success">
                  <a
                    class="text-truncate text-green"
                    data-test="transaction_hash_link"
                    href="/tx/0x${Buffer.from(detail.transaction_hash).toString("hex")}"
                    >0x${Buffer.from(detail.transaction_hash).toString("hex")}</a
                  >
                </div>

              </td>

              <!-- Method  -->
              <td class="hide_for_homepage">
                <div class="bs-label method">Transfer</div>
              </td>

              <!-- Block info -->
              <td class="hide_for_homepage">
                <span class="">
                  <a href="/block/${detail.block_number}">${detail.block_number}</a>
                </span>

              </td>

              <!-- Age  -->
              <td class="hide_for_homepage">
                <div class="d-flex">
                  <div
                    class="mr-2 order-2 text-truncate"
                    in-tile=""
                    data-from-now="2023-07-10T20:07:33.000000Z"
                  >
                    ${detail.inserted_at}
                  </div>
              </td

              <!-- From  -->
              <td class="hide_for_homepage">
                <div class="">
                  <div class="text-truncate">
                    <a
                      data-test="address_hash_link"
                      href="/address/0x${Buffer.from(detail.from_address_hash).toString("hex")}"
                    >
                      <span
                        class=""
                        data-address-hash=0x${Buffer.from(detail.from_address_hash).toString("hex")}
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="left"
                          title=0x${Buffer.from(detail.from_address_hash).toString("hex")}
                          data-custom-class=""
                        >
                          <span
                            class="d-none d-md-none d-xl-inline text-green"
                            >0x${Buffer.from(detail.from_address_hash).toString("hex")}</span
                          >
                          <span
                            class="d-md-inline-block d-xl-none text-green"
                            >0x${Buffer.from(detail.from_address_hash).toString("hex")}</span
                          >
                        </span>
                      </span>
                    </a>
                    →
                  </div>
                </div>
                <div></div>
              </td>

              <td class="hide_for_homepage">
                <div class="">
                  <div class="text-truncate">
                    <a
                      data-test="address_hash_link"
                      href="/address/0x${Buffer.from(detail.to_address_hash).toString("hex")}"
                    >
                      <span
                        class=""
                        data-address-hash=0x${Buffer.from(detail.to_address_hash).toString("hex")}
                      >
                        <span
                          data-toggle="tooltip"
                          data-placement="left"
                          title=0x${Buffer.from(detail.to_address_hash).toString("hex")}
                          data-custom-class=""
                        >
                          <span
                            class="d-none d-md-none d-xl-inline text-green"
                            >0x${Buffer.from(detail.to_address_hash).toString("hex")}</span
                          >
                          <span
                            class="d-md-inline-block d-xl-none text-green"
                            >0x${Buffer.from(detail.to_address_hash).toString("hex")}</span
                          >
                        </span>
                      </span>
                    </a>
                  
                  </div>
                </div>
                <div></div>
              </td>
              
              <td class="hide_for_homepage" >
                <div class="btn btn-xs btn-teal rounded-circle">
                 ${detail.symbol}
                </div>
              </td>     
              <td class="hide_for_homepage">
              <div class="btn btn-xs btn-teal rounded-circle">
               ${detail.amount==null?0:detail.amount}
              </div>
            </td>      
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      `;
      latestNftTransactions.appendChild(row);
    });
  
});


document.addEventListener("DOMContentLoaded", async function () {
  const topMintApi = await axios.get(`https://wyzthscan.org/node-api/top-nft-transfer`);
  console.log(topMintApi.data.data,"topNft");

  topMintApi.data.data.forEach((detail) => {
      const row = document.createElement("div");
      row.innerHTML = `
      <div
      class="tile-- tile-type-transaction fade-in tile-status--success"
      data-test="transaction"
      data-identifier-hash="0xdd13b53ff322a74c3a168c050da22e903b0f607869f34f554fd5302a519e2a17"
    >
      <div
        class=""
        data-selector="token-transfers-toggle"
        data-test="chain_transaction"
      >
        <table class="table fixed-layout mb-0">
          <tbody class="table-group-divider validated_txns---">
            <!-- Color Block Transaction -->
            <tr>
             
              <td class="hide_for_hompage">
                <div class="text-truncate width135">
                  <a
                    class="text-truncate text-green"
                    data-test="transaction_hash_link"
                    href="/address/0x${Buffer.from(detail.contract_address_hash).toString("hex")}"
                    >0x${Buffer.from(detail.contract_address_hash).toString("hex")}</a
                  >
                </div>
              
              </td>

              <td class="hide_for_hompage">
              <span class=" rounded-sm p-1">
                <span class="fs-12">${detail.name} (${detail.symbol}) </span>
               
              </span>
            </td>

              <td class="hide_for_hompage">
                <span class=" rounded-sm p-1">
                  <span class="fs-12"> ${detail.type=="ERC-721"?"WRC-721":"WRC-20"} </span>
                 
                </span>
              </td>
              <td class="hide_for_homepage">
              <div class="d-flex">
                <div
                  class="mr-2 order-2 text-truncate"
                  in-tile=""
                  data-from-now="2023-07-10T20:07:33.000000Z"
                >
                  ${detail.inserted_at}
                </div>
            </td>
              <td class="hide_for_homepage text-center">
                <div class="bs-label method ml-0 text-center">${detail.holder_count}</div>
              </td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      `;
      topMint.appendChild(row);
    });
  
});