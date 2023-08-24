// Import the Axios library
import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const dataBody = document.getElementById("data-body");
  const username=document.querySelector(".dashboard-username").getAttribute("data-id");


  // Function to fetch and display registration data
  async function displayData() {
    dataBody.innerHTML = ""; // Clear existing data

    try {
      const response = await axios.post(`https://wyzthscan.org/node-api/get-all-user-data/${username}`);
      const data = response.data.data;
      console.log(data, "data");
      if (data.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `<td colspan="7" style="text-align: center;">No data found</td>`;
        dataBody.appendChild(noDataRow);
      }else{

   data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.id}</td>
          <td class="username-cell">
            <span class="username"><a href="/user-dashboard/icon/${item.username}">${item.username}</a></span>
          </td>
          <td class="email-cell">
            <span class="email">${item.email}</span>
          </td>
          <td class="isverify-cell">
            <span class="isverify">${item.isverified}</span>
          </td>
          <td class="isadmin-cell">
            <span class="isadmin">${item.isadmin}</span>
          </td>
          <td>${item.date.slice(0, 10)}</td>
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
        button.addEventListener("click", async () => {
          const id = button.getAttribute("data-id");
          const row = button.parentNode.parentNode; // Get the parent row

          if (!row.classList.contains("editing")) {
            row.classList.add("editing");
            const usernameCell = row.querySelector(".username");
            const emailCell = row.querySelector(".email");
            const isVerifyCell = row.querySelector(".isverify");
            const isAdminCell = row.querySelector(".isadmin");

            // Replace cell contents with input fields
            const usernameInput = document.createElement("input");
            usernameInput.value = usernameCell.textContent;
            usernameCell.innerHTML = "";
            usernameCell.appendChild(usernameInput);

            const emailInput = document.createElement("input");
            emailInput.value = emailCell.textContent;
            emailCell.innerHTML = "";
            emailCell.appendChild(emailInput);

            const isVerifyInput = document.createElement("input");
            isVerifyInput.value = isVerifyCell.textContent;
            isVerifyCell.innerHTML = "";
            isVerifyCell.appendChild(isVerifyInput);

            const isAdminInput = document.createElement("input");
            isAdminInput.value = isAdminCell.textContent;
            isAdminCell.innerHTML = "";
            isAdminCell.appendChild(isAdminInput);

            // Change button to "Save" icon
            button.innerHTML = '<i class="fa-solid fa-save" style="color:green"></i>';
          } else {
            const newUsername = row.querySelector(".username input").value;
            const newEmail = row.querySelector(".email input").value;
            const newIsVerify = row.querySelector(".isverify input").value;
            const newIsAdmin = row.querySelector(".isadmin input").value;

            if (newUsername && newEmail) {
              await updateData(id, newUsername, newEmail, newIsVerify, newIsAdmin);
            }

            // Restore cell contents and change button back to "Edit" icon
            row.classList.remove("editing");
            row.querySelector(".username").textContent = newUsername;
            row.querySelector(".email").textContent = newEmail;
            row.querySelector(".isverify").textContent = newIsVerify;
            row.querySelector(".isadmin").textContent = newIsAdmin;

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

  async function updateData(id, newUsername, newEmail, newIsVerify, newIsAdmin) {
    try {
      const response = await axios.put(`https://wyzthscan.org/node-api/get-all-user-data/${id}`, {
        username: newUsername,
        email: newEmail,
        isverified: newIsVerify,
        isadmin: newIsAdmin
      });

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
      const response = await axios.delete(`https://wyzthscan.org/node-api/get-all-user-data/${id}`);

      if (response.status === 200) {
        displayData();
      } else {
        console.error("Error deleting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  // Initial data display on page load
  displayData();
});
