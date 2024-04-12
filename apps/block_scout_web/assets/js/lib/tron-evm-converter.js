document.addEventListener("DOMContentLoaded", async function () {
  const toolBtn1 = document.getElementById("toolBtn1");
  const toolBtn2 = document.getElementById("toolBtn2");
  const resetBtn = document.getElementById("resetBtn");
  const invalidInput1 = document.getElementById("invalidInput1");
  const invalidInput2 = document.getElementById("invalidInput2");
  const tron_address = document.getElementById("tron_address");
  const evm_address = document.getElementById("evm_address");
  const bs58 = require("bs58");
  const crypto = require('crypto');


  tron_address.value = "";
  evm_address.value = "";

  const ethereumToTronAddress = (ethereumAddress) => {
    console.log("Converting to Tron address");
    try {
        if (!ethereumAddress || typeof ethereumAddress !== "string" || ethereumAddress.length !== 42 || !ethereumAddress.startsWith('0x')) {
            throw new Error("Invalid input: Ethereum address must be a non-empty string starting with '0x' and have a length of 42 characters");
        }

        const hex = ethereumAddress.slice(2); // Remove the '0x' prefix
        if (hex.length !== 40) {
            throw new Error("Invalid input: Ethereum address must be a valid hexadecimal string with length of 40 characters (excluding '0x' prefix)");
        }

        // Convert the hex string into a byte array and prepend the Tron-specific prefix '41'
        const addressBytes = Buffer.from('41' + hex, 'hex');

        // Double SHA-256 hash
        const hashOne = crypto.createHash('sha256').update(addressBytes).digest();
        const hashTwo = crypto.createHash('sha256').update(hashOne).digest();

        // Take the first 4 bytes of the second hash as the checksum
        const checksum = hashTwo.slice(0, 4);

        // Append the checksum to the original byte array
        const fullAddress = Buffer.concat([addressBytes, checksum]);

        // Base58 encode the result
        const tronAddress = bs58.encode(fullAddress);

        return tronAddress;
    } catch (error) {
        console.error("Error converting Ethereum address to Tron address:", error.message);
        throw error;
    }
};



  const tronToEthereumAddress = (tronAddress) => {
    try {
        if (!tronAddress || typeof tronAddress !== "string" || tronAddress.length !== 34 || !tronAddress.startsWith('T')) {
            throw new Error("Invalid input: Tron address must be a non-empty string starting with 'T' and have a length of 34 characters");
        }

        const decoded = bs58.decode(tronAddress);
        let hex = Buffer.from(decoded).toString('hex');

        // Remove the first 2 characters (1 byte network prefix) from the hexadecimal string
        hex = hex.slice(2);

        // We want only the address part which typically comes after the first byte and is 20 bytes long
        // As each byte translates to two hex characters, take the next 40 characters
        hex = hex.slice(0, 40);

        // Properly format the hex string as an Ethereum address by adding the '0x' prefix and converting to lowercase
        const ethereumAddress = "0x" + hex.toLowerCase();

        return ethereumAddress;
    } catch (error) {
        console.error("Error converting TRON address to Ethereum address:", error.message);
        throw error; 
    }
};

  toolBtn1.addEventListener("click", () => {
    // const tronAddress = "TDUiUScimQNfmD1F76Uq6YaXbofCVuAvxH";
    const tronAddress = tron_address.value;
    const result1 = tronToEthereumAddress(tronAddress);
    evm_address.value = "";
    if (result1 === undefined) {
      return null
    } else {
      evm_address.value = result1;
    }
    console.log("eth address: ", result1);
  });

  toolBtn2.addEventListener("click", () => {
    // const ethereumAddress = "0x63bD0d5ae4E76AB501E3bD03A03c52Db8D3429CF";
    const ethereumAddress = evm_address.value;
    const result2 = ethereumToTronAddress(ethereumAddress);
    tron_address.value = "";
    if (result2 === undefined) {
      return null;
    } else {
      tron_address.value = result2;
    }

    console.log("tron address: ", result2);
  });

  tron_address.addEventListener("click", () => {
    toolBtn1.style.backgroundColor = "#294B29";
    toolBtn1.style.color = "#fff"
    toolBtn2.style.backgroundColor = "";
    toolBtn2.style.color = "black"
  });

  evm_address.addEventListener("click", () => {
    console.log("fkdsjlfkalk");
    toolBtn1.style.backgroundColor = "";
    toolBtn2.style.backgroundColor = "#294B29";
    toolBtn2.style.color = "#fff"
    toolBtn1.style.color = "black"

  });

  resetBtn.addEventListener("click", () => {
    console.log("event reset");
    tron_address.style.borderColor = "";
    evm_address.style.borderColor = "";
    invalidInput1.style.display = "none";
    invalidInput2.style.display = "none";
    tron_address.value = "";
    evm_address.value = "";
  });
});
