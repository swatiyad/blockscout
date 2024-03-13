
document.addEventListener("DOMContentLoaded", async function () {
  const toolBtn1 = document.getElementById("toolBtn1");
  const toolBtn2 = document.getElementById("toolBtn2");
  const resetBtn = document.getElementById("resetBtn");
  const tron_address = document.getElementById("tron_address");
  const evm_address = document.getElementById("evm_address");

  const bs58 = require("bs58");

  const ethereumToTronAddress = async (ethereumAddress) => {
      // Remove the '0x' prefix from the Ethereum address
      const hex = ethereumAddress.slice(2);
    
      // Convert the hexadecimal string back into a byte array
      // Prepend the Tron-specific prefix (0x41) to the byte array
      const bytes = Buffer.from('41' + hex, 'hex');
      
      // Encode the byte array into Base58 to get the Tron address
      const tronAddress = bs58.encode(bytes);
      
      return tronAddress;

  };

  toolBtn1.addEventListener("click", () => {
    const ethereumAddress = "0x63bD0d5ae4E76AB501E3bD03A03c52Db8D3429CF";
    ethereumToTronAddress(ethereumAddress)
      .then((tronAddress) => console.log("tronAddresssss", tronAddress))
      .catch((err) => console.log("err", err));

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

  resetBtn.addEventListener("click", () => {
    console.log("event reset");
    tron_address.value = "";
    evm_address.value = "";
  });
});
