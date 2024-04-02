import axios from "axios";

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".dash-menu");
  const tableBody = document.getElementById("bannerTableBody");

  const getBannerData = async ()=>{
    const res = await axios.get("http://localhost:3000/node-api/get-adv-banners");
    if(res.status === 200){
      let banners = res.data;
      banners.forEach((banner, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${index + 1}</td>
          <td><img src="${banner.file_path}" alt="Banner" style="max-width: 100px;" /></td>
          <td>${banner.banner_name}</td>
          <td>${banner.location}</td>
          <td><button class="btn btn-danger btn-sm py-2 px-3" onclick="deleteBanner(${banner.id})"><i class="fas fa-trash-alt "></i></button></td>
        `;
        tableBody.appendChild(newRow);
      });

    }
    
  }
  getBannerData();

  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      menuItems.forEach(function (item) {
        item.classList.remove("active");
      });

      this.classList.add("active");

      if (this.textContent.trim() === "Advertisement") {
        const currentURL = window.location.href;

        const newURL = currentURL.endsWith("/advertisement")
          ? currentURL
          : currentURL.endsWith("/")
          ? currentURL + "advertisement"
          : currentURL + "/advertisement";

        window.location.href = newURL;
      }
      if (this.textContent.trim() === "Registration Data") {
        const currentURL = window.location.href;
        const newURL = currentURL.replace(/\/advertisement$/, "");
        window.location.href = newURL;
      }
    });
  });

  const uploadBanner = async () => {
    const advImgFile = document.getElementById("advImg").files[0];
    const bannerName = document.getElementById("bannerName").value;
    const link = document.getElementById("link").value;
    const location = document.getElementById("location").value;

    if(!advImgFile){
      alert("select image first")
    }

    const formData = new FormData();
    formData.append("image", advImgFile);
    formData.append("bannerName", bannerName);
    formData.append("link", link);
    formData.append("location", location);

    try {
      const res = await axios.post(
        "http://localhost:3000/node-api/upload-banner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Banner uploaded successfully:", res.data);
    } catch (error) {
      console.log("Error uploading banner:", error);
    }
  };

  document
    .getElementById("upload-banner-button")
    .addEventListener("click", uploadBanner);
});
