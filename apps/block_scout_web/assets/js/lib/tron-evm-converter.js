document.addEventListener("DOMContentLoaded", async function () {
  const toolBtn1 = document.getElementById("toolBtn1");
  const toolBtn2 = document.getElementById("toolBtn2");
  const resetBtn = document.getElementById("resetBtn");
  const invalidInput1 = document.getElementById("invalidInput1");
  const invalidInput2 = document.getElementById("invalidInput2");
  const tron_address = document.getElementById("tron_address");
  const evm_address = document.getElementById("evm_address");
  const bs58 = require("bs58");

  tron_address.value = "";
  evm_address.value = "";

  const ethereumToTronAddress = (ethereumAddress) => {
    try {
      if (
        !ethereumAddress ||
        typeof ethereumAddress !== "string" ||
        !ethereumAddress.startsWith("0x") ||
        ethereumAddress.length !== 42
      ) {
        throw new Error(
          'Invalid input: Ethereum address must be a valid hexadecimal string with "0x" prefix and length of 42 characters'
        );
      }
      // Remove the '0x' prefix from the Ethereum address
      console.log("------------ethtotron-->", ethereumAddress);
      const hex = ethereumAddress.slice(2);
      if (hex.length !== 40) {
        throw new Error(
          'Invalid input: Ethereum address must be a valid hexadecimal string with length of 40 characters (excluding "0x" prefix)'
        );
      }

      // Prepend the Tron-specific prefix (0x41) to the byte array
      const bytes = Buffer.from("41" + hex, "hex");

      // Encode the byte array into Base58 to get the Tron address
      const tronAddress = bs58.encode(bytes);
      console.log("tron tron", tronAddress);

      return tronAddress;
    } catch (error) {
      evm_address.style.outline = "none";
      evm_address.style.borderColor = "red";
      invalidInput2.style.display = "block";

      console.log(error);
      console.error(
        "Error converting Ethereum address to Tron address:",
        error.message
      );
      
    }
  };

  const tronToEthereumAddress = (tronAddress) => {
    try {
      if (
        !tronAddress ||
        typeof tronAddress !== "string" ||
        tronAddress.length !== 34
      ) {
        throw new Error(
          "Invalid input: Tron address must be a non-empty string with length of 34 characters"
        );
      }
      // Decode the Base58 encoded Tron address
      console.log("------------------", tronAddress);
      const decoded = bs58.decode(tronAddress);

      // Convert the decoded buffer to a hexadecimal string
      const hex = Array.from(decoded, (byte) =>
        byte.toString(16).padStart(2, "0")
      ).join("");

      // Properly format the hex string as an Ethereum address by adding the '0x' prefix
      const ethereumAddress = "0x" + hex.slice(2); // Slice off the Tron network prefix (0x41)
      console.log("eth eth", ethereumAddress);
      return ethereumAddress;
    } catch (error) {
      tron_address.style.outline = "none";
      tron_address.style.borderColor = "red";
      invalidInput1.style.display = "block";

      console.log(error);
      console.error(
        "Error converting Ethereum address to Tron address:",
        error.message
      );
      
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
