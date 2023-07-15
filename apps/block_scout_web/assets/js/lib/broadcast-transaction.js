import Web3 from "web3";
const web3 = new Web3('https://rpc-mainnet3.wyzthchain.org');


document.querySelector("#ContentPlaceHolder1_btnSubmit").onclick =async function(){
try{
    document.querySelector("#ContentPlaceHolder1_btnSubmit").value ="Loading...";
     const rawTxHash = document.querySelector("#ContentPlaceHolder1_txtRawTx").value;
       await web3.eth.sendSignedTransaction(rawTxHash).on('receipt', function(receipt) {
            console.log(receipt);
            document.querySelector(".success-message").style.color = "green";
            document.querySelector(".success-message").textContent = receipt.transactionHash;
            document.querySelector("#ContentPlaceHolder1_btnSubmit").value ="Send Transaction";
          })
          .on('error', function(error) {
            console.error("Something went wrong while submitting your transaction:", error);
            document.querySelector(".err-msg").style.color = "red"
            document.querySelector(".err-msg").textContent = error;
            document.querySelector("#ContentPlaceHolder1_btnSubmit").value ="Send Transaction";

          });
    
}catch(error){
    console.log(error,"transactionReceipt");
    document.querySelector(".err-msg").style.color = "red"
    document.querySelector(".err-msg").textContent = error;
    document.querySelector("#ContentPlaceHolder1_btnSubmit").value ="Send Transaction";

}

}