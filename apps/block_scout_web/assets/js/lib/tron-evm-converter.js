


document.addEventListener("DOMContentLoaded", async function () {
  const toolBtn1 = document.getElementById("toolBtn1");
  const toolBtn2 = document.getElementById("toolBtn2");
  const resetBtn = document.getElementById("resetBtn");
  const tron_address = document.getElementById("tron_address");
  const evm_address = document.getElementById("evm_address");

  const bs58 = require("bs58");

  const ethereumToTronAddress =  (ethereumAddress) => {
      // Remove the '0x' prefix from the Ethereum address
      const hex = ethereumAddress.slice(2);
      console.log('I am in');
    
      // Convert the hexadecimal string back into a byte array
      // Prepend the Tron-specific prefix (0x41) to the byte array
      const bytes = Buffer.from('41' + hex, 'hex');
      
      // Encode the byte array into Base58 to get the Tron address
      const tronAddress = bs58.encode(bytes);
      console.log("tron tron", tronAddress);
      
      return tronAddress;

  };

  const tronToEthereumAddress = (tronAddress)=> {
    // Decode the Base58 encoded Tron address
    const decoded = bs58.decode(tronAddress);
    
    // Convert the decoded buffer to a hexadecimal string
    const hex = Array.from(decoded, byte => byte.toString(16).padStart(2, '0')).join('');
    
    // Properly format the hex string as an Ethereum address by adding the '0x' prefix
    const ethereumAddress = '0x' + hex.slice(2); // Slice off the Tron network prefix (0x41)
    console.log('eth eth', ethereumAddress);
    return ethereumAddress;
}

  toolBtn1.addEventListener("click", () => {
    const ethereumAddress = "0x63bD0d5ae4E76AB501E3bD03A03c52Db8D3429CF";
   const result1 = ethereumToTronAddress(ethereumAddress);
   console.log("tron address: ", result1);
      
  });

  toolBtn2.addEventListener("click", () => {
    const tronAddress = "TDUiUScimQNfmD1F76Uq6YaXbofCVuAvxH";
   const result2 = tronToEthereumAddress(tronAddress)
   console.log("eth address: ",result2);
      
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

  resetBtn.addEventListener("click", () => {
    console.log("event reset");
    tron_address.value = "";
    evm_address.value = "";
  });
});
