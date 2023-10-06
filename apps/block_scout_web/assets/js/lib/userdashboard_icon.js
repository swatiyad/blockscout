import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const dataBody = document.getElementById("data-body");
  const username = document.querySelector(".user-id").getAttribute("data-id");

  // Function to fetch and display user icon data
  async function displayData() {
    dataBody.innerHTML = ""; // Clear existing data

    try {
      const response = await axios.post("https://wyzthscan.org/node-api/get-user-icon-data/"+username);
      const data = response.data.data;

      if (data.length == 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `<td colspan="3" style="text-align: center;">No data found</td>`;
        dataBody.appendChild(noDataRow);
      }else{
      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.username}</td>
          <td><img src="${item.imageurl}" alt="${item.username}" width="20"></td>
          <td>${item.tokenaddress}</td>
          <td>
            <button class="update-btn btn" data-id="${item.id}">
            <i class="fa-solid fa-file-pen" style="color: grey"></i>
            </button>
            <button class="delete-btn btn" data-id="${item.id}">
            <i class="fa-solid fa-trash" style="color: red"></i>
            </button>
          </td>
        `;
        dataBody.appendChild(row);
      });
    }

      const updateButtons = document.querySelectorAll(".update-btn");
      const deleteButtons = document.querySelectorAll(".delete-btn");
      
      updateButtons.forEach(button => {
        button.addEventListener("click", () => {
          const id = button.getAttribute("data-id");
          const row = button.parentNode.parentNode; // Get the parent row
      
          if (!row.classList.contains("editing")) {
            row.classList.add("editing");
            const usernameCell = row.querySelector("td:nth-child(2)"); // Username cell
            const imageCell = row.querySelector("td:nth-child(3)"); // Image cell
            const tokenAddressCell = row.querySelector("td:nth-child(4)"); // Token address cell
      
            // Store current cell contents
            const currentUsername = usernameCell.textContent;
            const currentImage = imageCell.querySelector("img").getAttribute("src");
            const currentTokenAddress = tokenAddressCell.textContent;
      
            // Replace cell contents with input fields
            usernameCell.innerHTML = `<input type="text" class="username-input" value="${currentUsername}" />`;
            imageCell.innerHTML = `<input type="text" class="image-input" value="${currentImage}" />`;
            tokenAddressCell.innerHTML = `<input type="text" class="tokenaddress-input" value="${currentTokenAddress}" />`;
      
            // Change button to "Save" icon
            button.innerHTML = '<i class="fa-solid fa-save" style="color:green"></i>';
          } else {
            const newUsername = row.querySelector(".username-input").value;
            const newImage = row.querySelector(".image-input").value;
            const newTokenAddress = row.querySelector(".tokenaddress-input").value;
      
            if (newUsername && newImage && newTokenAddress) {
              const newData = {
                username: newUsername,
                imageurl: newImage,
                tokenaddress: newTokenAddress
              };
              updateData(id, newData);
            }
      
            // Restore cell contents and change button back to "Edit" icon
            row.classList.remove("editing");
            usernameCell.textContent = newUsername;
            imageCell.innerHTML = `<img src="${newImage}" alt="${newUsername}" width="20" />`;
            tokenAddressCell.textContent = newTokenAddress;
      
            button.innerHTML = '<i class="fa-solid fa-file-pen" style="color:grey"></i>';
          }
        });
      });

      deleteButtons.forEach(button => {
        button.addEventListener("click", async () => {
          const id = button.getAttribute("data-id");
          await deleteData(id);
        });
      });
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function updateData(id, newData) {
    try {
      const response = await axios.put(`https://wyzthscan.org/node-api/update-user-icon-data/${id}`, newData);

      if (response.status === 200) {
        displayData();
      } else {
        console.error("Error updating data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  async function deleteData(id) {
    try {
      const response = await axios.delete(`https://wyzthscan.org/node-api/delete-user-icon-data/${id}`);

      if (response.status === 200) {
        displayData();
      } else {
        console.error("Error deleting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  displayData();
});
