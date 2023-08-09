import axios from "axios";

document.addEventListener("DOMContentLoaded", async function () {
  const table = document.querySelector(".int-transactions");
  const pagination = document.querySelector(".pagination");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const loaderHtml = `
    <div class="table-content-loader my-1 loader-height"></div>
    <div class="table-content-loader my-1 loader-height"></div>
    <div class="table-content-loader my-1 loader-height"></div>
    <div class="table-content-loader my-1 loader-height"></div>
    <div class="table-content-loader my-1 loader-height"></div>
    <div class="table-content-loader my-1 loader-height"></div>
    
  `;

  let currentPage = 1;

  const fetchData = async (page) => {
    // Show the loading indicator
    table.innerHTML = loaderHtml;

    try {
      const apiResponse = await axios.get(`https://wyzthscan.org/node-api/internal-transactions?page=${page}&pageSize=50`);
      const apiData = apiResponse.data;
      console.log(apiData, "apiData");

      let transactionsHtml = "";

      apiData.forEach((detail) => {
        transactionsHtml += `<div
        class="tile-- tile-type-transaction fade-in tile-status--success"
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
                <td class="show_for_hompage sno_col">
                  <span class="btn-icon radius-50">
                    <span class="btn-icon-inner"> Tx </span>
                  </span>
                </td>
                <td class="show_for_hompage">
                  <div class="text-truncate width135">
                    <a
                      class="text-truncate text-green"
                      data-test="transaction_hash_link"
                      href="/tx/${"0x"+Buffer.from(detail.transaction_hash).toString("hex")}"
                      >${"0x"+Buffer.from(detail.transaction_hash).toString("hex")}</a
                    >
      
                    <div class="bs-label method ml-1">${detail.call_type}</div>
                  </div>
                  <div>
                    <span
                      class="mr-2 mr-md-0 order-2 text-gray-over fs-12"
                      in-tile=""
                      data-from-now=${detail.inserted_at}"
                      >${detail.inserted_at}</span
                    >
                  </div>
                </td>
      
                <td class="show_for_hompage">
                  <div class="d-flex">
                    <div>
                      <span class="text-dark mr-2">From</span>
                    </div>
                    <div class="text-truncate text-green width135">
                      <a
                        data-test="address_hash_link"
                        href="/address/${"0x"+Buffer.from(detail.from_address_hash).toString("hex")}"
                      >
                        <span
                          class=""
                          data-address-hash=${"0x"+Buffer.from(detail.from_address_hash).toString("hex")}
                        >
                          <span
                            data-toggle="tooltip"
                            data-placement="left"
                            title=${"0x"+Buffer.from(detail.from_address_hash).toString("hex")}
                            data-custom-class=""
                          >
                            <span
                              class="d-none d-md-none d-xl-inline text-green width135"
                              >${"0x"+Buffer.from(detail.from_address_hash).toString("hex")}</span
                            >
                            <span
                              class="d-md-inline-block d-xl-none text-green width135"
                              >${"0x"+Buffer.from(detail.from_address_hash).toString("hex")}</span
                            >
                          </span>
                        </span>
                      </a>
      
                      →
                    </div>
                  </div>
                  <div>
                    <div class="d-flex">
                      <div>
                        <span class="text-dark mr-2">To</span>
                      </div>
                      <div class="text-truncate text-green width135">
                        <span>
                          <a
                            data-test="address_hash_link"
                            href="/address/${"0x"+Buffer.from(detail.to_address_hash).toString("hex")}"
                          >
                            <span
                              class=""
                              data-address-hash=${"0x"+Buffer.from(detail.to_address_hash).toString("hex")}
                            >
                              <span
                                data-toggle="tooltip"
                                data-placement="left"
                                title=${"0x"+Buffer.from(detail.to_address_hash).toString("hex")}
                                data-custom-class=""
                              >
                                <span
                                  class="d-none d-md-none d-xl-inline text-green width135"
                                  >${"0x"+Buffer.from(detail.to_address_hash).toString("hex")}</span
                                >
                                <span
                                  class="d-md-inline-block d-xl-none text-green width135"
                                  >${"0x"+Buffer.from(detail.to_address_hash).toString("hex")}</span
                                >
                              </span>
                            </span>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="show_for_hompage text-right">
                  <span class="border rounded-sm p-1">
                    <span class="fs-10 font-weight-bold"> ${detail.value / 1e18} WYZ </span>
      
                  </span>
                </td>
      
      
                <td class="hide_for_homepage" style="width: 40px">
                  <span
                    class="tile-status-label ml-md-0"
                    data-test="transaction_status"
                  >
                    <span
                      class="text-muted"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title=""
                      data-original-title="Txn is successful"
                      ><strong><i class="fa fa-check-circle"></i></strong
                    ></span>
                  </span>
                </td>
      
                <!-- Transaction Hash  -->
                <td class="hide_for_homepage">
                  <div class="text-truncate d-flex text-success width135">
                    <a
                      class="text-truncate text-green"
                      data-test="transaction_hash_link"
                      href="/tx/${"0x"+Buffer.from(detail.transaction_hash).toString("hex")}"
                      >${"0x"+Buffer.from(detail.transaction_hash).toString("hex")}</a
                    >
                  </div>
      
                  <div class="text-truncate width135"></div>
                </td>
      
                <!-- Method  -->
                <td class="hide_for_homepage">
                  <div class="bs-label method ml-0">${detail.call_type}</div>
                </td>
      
                <!-- Block info -->
                <td class="hide_for_homepage">
                  <span class="">
                    <a href="/block/${detail.block_number}">${detail.block_number}</a>
                  </span>
                  <div class="show_for_hompage">
                    <!-- Transaction IN/OUT -->
                  </div>
                </td>
      
                <!-- Age  -->
                <td class="hide_for_homepage">
                  <div class="d-flex">
                    <div
                      class="mr-2 order-2 text-truncate width100"
                      in-tile=""
                      data-from-now="${detail.updated_at}"
                    >
                    ${detail.updated_at}
                    </div>
                  </div>
                </td>
      
                <!-- From  -->
                <td class="hide_for_homepage">
                  <div class="">
                    <div class="text-truncate width135">
                      <a
                        data-test="address_hash_link"
                        href="/address/${"0x"+Buffer.from(detail.from_address_hash).toString("hex")}"
                      >
                        <span
                          class=""
                          data-address-hash="${"0x"+Buffer.from(detail.from_address_hash).toString("hex")}"
                        >
                          <span
                            data-toggle="tooltip"
                            data-placement="left"
                            title=""
                            data-custom-class=""
                            data-original-title="${"0x"+Buffer.from(detail.from_address_hash).toString("hex")}"
                          >
                            <span
                              class="d-none d-md-none d-xl-inline text-green width135"
                              >${"0x"+Buffer.from(detail.from_address_hash).toString("hex")}</span
                            >
                            <span
                              class="d-md-inline-block d-xl-none text-green width135"
                              >${"0x"+Buffer.from(detail.from_address_hash).toString("hex")}</span
                            >
                          </span>
                        </span>
                      </a>
      
                      →
                    </div>
                  </div>
                  <div></div>
                </td>
      
                <td class="hide_for_homepage" style="width: 70px">
                  <div class="btn btn-xs btn-teal rounded-circle">
                    <span class="fas fa-long-arrow-alt-right"></span>
                  </div>
                </td>
      
                <!-- To  -->
                <td class="hide_for_homepage">
                  <div class="d-flex">
                    <div>
                      <span class="tile-label mr-2" data-test="transaction_type">
                      </span>
                    </div>
                    <div class="text-truncate width135">
                      <span>
                        <a
                          data-test="address_hash_link"
                          href="/address/${"0x"+Buffer.from(detail.to_address_hash).toString("hex")}"
                        >
                          <span
                            class=""
                            data-address-hash="${"0x"+Buffer.from(detail.to_address_hash).toString("hex")}"
                          >
                            <span
                              data-toggle="tooltip"
                              data-placement="left"
                              title="${"0x"+Buffer.from(detail.to_address_hash).toString("hex")}"
                              data-custom-class=""
                            >
                              <span
                                class="d-none d-md-none d-xl-inline text-green width135"
                                >${"0x"+Buffer.from(detail.to_address_hash).toString("hex")}</span
                              >
                              <span
                                class="d-md-inline-block d-xl-none text-green width135"
                                >${"0x"+Buffer.from(detail.to_address_hash).toString("hex")}</span
                              >
                            </span>
                          </span>
                        </a>
                      </span>
                    </div>
                  </div>
                </td>
      
                <!-- Value  -->
                <td class="hide_for_homepage">
                  <span class="">${detail.value / 1e18} WYZ </span>
                </td>
      
                <!-- Tx Fee  -->
      
             <!--   <td class="hide_for_homepage">
                  <div class="text-truncate width100">
                    <span class="text-nowrap text-green"> ${Number(detail.gas)/1e18} </span>
                  </div>
                </td> -->
      
              </tr>
            </tbody>
          </table>
        </div>
      </div>`
      });

      // Replace the loading indicator with transaction data
      table.innerHTML = transactionsHtml;
    } catch (error) {
      // Handle error if API request fails
      console.error("Error fetching API data:", error);
      // You might want to display an error message or handle this in another way
    }
  };

  const updatePaginationButtons = () => {
    pagination.style.display = "block";
    prevPageButton.disabled = currentPage <= 1;
    // You'll need to modify this based on the total number of pages available
    // If there's no more next page, disable the "Next" button
    // nextPageButton.disabled = ?;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      fetchData(currentPage);
      updatePaginationButtons();
    }
  };

  const handleNextPage = () => {
    currentPage++;
    fetchData(currentPage);
    updatePaginationButtons();
  };

  prevPageButton.addEventListener("click", handlePrevPage);
  nextPageButton.addEventListener("click", handleNextPage);

  // Initial data fetch and pagination buttons update
  fetchData(currentPage);
  updatePaginationButtons();
});
document.addEventListener("DOMContentLoaded", async function () {
    const transactionCount = await axios.get(`https://wyzthscan.org/node-api/transaction-count`);
    const transactionC = transactionCount.data[0].total_count;
    console.log(transactionCount,"transactionCount");
 document.querySelector(".update-1000").innerHTML = transactionC;
   
})
document.addEventListener("DOMContentLoaded", async function () {
    const blockCount = await axios.get(`https://wyzthscan.org/node-api/block-count`);
    const blockC = blockCount.data[0].total_count;
    const href = window.location.href;
    console.log(blockCount,"transactionCount");
    if(href.endsWith("/blocks")){
        document.querySelector(".update-block").innerHTML = blockC;
    } else{
        document.querySelector(".t-desc").style.display = "none";
    }
})

