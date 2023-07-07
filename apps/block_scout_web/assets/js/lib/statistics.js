import axios from "axios"
document.addEventListener("DOMContentLoaded",async function() {
    const tableBody = document.getElementById('tableBody');
    const topToken = document.getElementById('top-token');
    const api = await axios.get(`https://wyzthscan.org/node-api/top-stats-data`)
    const apiData = api.data
    console.log(apiData,"affg");
apiData.transactions.forEach((transaction) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><a href=/block/${transaction.block_number}/transactions>${transaction.block_number}</a></td>
    <td><a href=/address/${transaction.from_address}>${transaction.from_address.slice(0,6)}...${transaction.from_address.slice(-6)}</a></td>
    <td><a href=/address/${transaction.to_address}>${transaction.to_address.slice(0,6)}...${transaction.to_address.slice(-6)}</a></td>
    <td>${Number.isInteger(transaction.value/1e18)==true?transaction.value/1e18:(transaction.value/1e18).toFixed(2)}</td>
  `;
  tableBody.appendChild(row);
});
apiData.topToken.forEach((detail) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${detail.symbol}</td>
      <td>${detail.name}</td>
      <td>${detail.type}</td>
      <td><a href=/address/${detail.address}>${detail.address.slice(0,6)}...${detail.address.slice(-6)}</a></td>
    `;
    topToken.appendChild(row);
});


});