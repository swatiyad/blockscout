






document.addEventListener("DOMContentLoaded", async function () {

  const toolBtn1 = document.getElementById("toolBtn1");
  const toolBtn2 = document.getElementById("toolBtn2");
  const resetBtn = document.getElementById("resetBtn");
  const tron_address = document.getElementById("tron_address");
  const evm_address = document.getElementById("evm_address");
  var crypto = require('crypto');

 

  const ethereumToTronAddress =async (ethereumAddress) => {
    // Remove '0x' prefix if present
    ethereumAddress = ethereumAddress.replace(/^0x/i, '');

    // Decode the Ethereum address from hexadecimal to bytes
    const ethereumBytes = Buffer.from(ethereumAddress, 'hex');

    // Hash the Ethereum address using Keccak-256 algorithm
    const hash =await crypto.createHash('keccak256').update(ethereumBytes).digest();

    // Take the last 20 bytes of the hash
    const tronAddressBytes = hash.slice(-20);

    // Prepend 'T' to indicate Tron mainnet address
    const tronAddressPrefix = 'T';
    const tronAddressWithPrefix = tronAddressPrefix + tronAddressBytes.toString('hex');

    // Base58 encode the Tron address
    const tronAddress = base58.encode(Buffer.from(tronAddressWithPrefix, 'hex'));

    return tronAddress;
};

const ethereumAddress = '0x1234567890123456789012345678901234567890';
const tronAddress = ethereumToTronAddress(ethereumAddress);
console.log('Tron Address:', tronAddress);



  
  
  
  
  toolBtn1.addEventListener("click", () => {
    const convertedEvm = TronEvmconverter.trcToEvm(tron_address.value);
    console.log('TRC to EVm and Evm to Trc:', `${convertedEvm}`);

    console.log("tool bton 1 clicked!");
  });

  toolBtn2.addEventListener("click", () => {
    console.log("tool bton 2 clicked!");
  });

  tron_address.addEventListener("click", () => {
    toolBtn1.style.backgroundColor = "#DCFFB7";
    toolBtn2.style.backgroundColor = "";

  });

  evm_address.addEventListener("click", () => {
    console.log("fkdsjlfkalk");
    toolBtn1.style.backgroundColor = "";
    toolBtn2.style.backgroundColor = "#DCFFB7";

  });

resetBtn.addEventListener("click",()=>{
    console.log('event reset')
    tron_address.value = ''; 
    evm_address.value = '';
})

});
