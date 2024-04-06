document.addEventListener("DOMContentLoaded", async function () {
  const axios = require("axios");

  const punchIt = document.getElementById("punchIt");
  const product_list = document.getElementById("product-list");

  // const products = [
  //   {
  //     image: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
  //     title: "pods",
  //     description:
  //       "1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
  //     link: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
  //   },
  //   {
  //     image: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
  //     title: "pods",
  //     description:
  //       "1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
  //     link: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
  //   },
  //   {
  //     image: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
  //     title: "pods",
  //     description:
  //       "1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
  //     link: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
  //   },
  //   {
  //     image: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
  //     title: "pods",
  //     description:
  //       "1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
  //     link: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
  //   },
  //   {
  //     image: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
  //     title: "pods",
  //     description:
  //       "1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
  //     link: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
  //   },
  // ];
  const getProductsList = async () => {
    try {
        const res = await axios.get(
            "https://raw.githubusercontent.com/PranjalNadCab/wyscaleApi/master/wyz.json"
            // , {
            //     headers: {
            //       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
            //     }
            //   }
              );
          console.log("---------->",res.data);

          return res.data;
    } catch (error) {
        console.log("->>>>>>>error",error);
        return null;
    }

  };
  // getProductsList().then((productList)=>{
  //   productList.forEach((product) => {
  //     const productElement = document.createElement("div");
  //     productElement.textContent = product.title; // Example: Render product name
  //     document.getElementById("product-list").appendChild(productElement);
  //   });
  // }).catch(err=>console.log(err));

  getProductsList().then((productList)=>{
    const parentContainer = document.createElement("div");
    parentContainer.classList.add("cardContainer", "container");


    productList.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card-content", "p-4", "rounded-lg");
      const cardImage = document.createElement("div");
      cardImage.classList.add("card-image");
      const image = document.createElement("img");
      image.classList.add("card-img");
      image.setAttribute("alt", "Product Image");
        image.setAttribute("src", product.image);
        cardImage.appendChild(image);
      
        //Creating card details
        const cardDetails = document.createElement("div");
        cardDetails.classList.add("card-details");
        const title = document.createElement("h3");
        title.classList.add("card-title");
        const titleLink = document.createElement("a");
        titleLink.setAttribute("href", product.link);
        titleLink.textContent = product.title; 
        title.appendChild(titleLink);
        const category = document.createElement("div");
        category.classList.add("card-category");
        category.textContent = product.category;
        const description = document.createElement("div");
        description.classList.add("card-description");
        description.textContent = product.description; 
        const cardActions = document.createElement("div");
        cardActions.classList.add("card-actions");
        const moreInfoBtn = document.createElement("a");
        moreInfoBtn.classList.add("moreInfoBtn");
        moreInfoBtn.setAttribute("href", "https://www.google.com/");
        moreInfoBtn.setAttribute("target", "_blank");
        moreInfoBtn.textContent = "More info";

        cardActions.appendChild(moreInfoBtn);
        cardDetails.appendChild(title);
        cardDetails.appendChild(category);
        cardDetails.appendChild(description);
        cardDetails.appendChild(cardActions);

        // Append card image and details to card container
        card.appendChild(cardImage);
        card.appendChild(cardDetails);
        product_list.appendChild(card);
        
    });
  }).catch(err=>console.log(err));


  punchIt.addEventListener("click", () => {
    console.log("hit me hard");
  });
});
