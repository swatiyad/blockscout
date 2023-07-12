import Web3 from "web3";
const web3 = new Web3('https://rpc-mainnet3.wyzthchain.org');


web3.eth.getBlockNumber().then((blockNumber) => {
    console.log('Latest Block Number:', blockNumber);
  });

document.querySelector("#ContentPlaceHolder1_btnSubmit").onclick =async function(){
    console.log("hello")
    
     const rawTxHash = document.querySelector("#ContentPlaceHolder1_txtRawTx").value;
     const transactionReceipt = await web3.eth.sendSignedTransaction(rawTxHash);
     console.log(transactionReceipt,"transactionReceipt")

}