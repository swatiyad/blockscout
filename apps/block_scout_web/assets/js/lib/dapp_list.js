document.addEventListener("DOMContentLoaded", async function () {
  const axios = require("axios");

  const punchIt = document.getElementById("punchIt");

  const products = [
    {
      image: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
      title: "pods",
      description:
        "1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
      link: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
    },
    {
      image: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
      title: "pods",
      description:
        "1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
      link: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
    },
    {
      image: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
      title: "pods",
      description:
        "1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
      link: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
    },
    {
      image: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
      title: "pods",
      description:
        "1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
      link: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
    },
    {
      image: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
      title: "pods",
      description:
        "1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
      link: "https://blockscout-content.s3.amazonaws.com/PodsYield.png",
    },
  ];
  const getProductsList = async () => {
    try {
        const res = await axios.get(
            "https://raw.githubusercontent.com/PranjalNadCab/wyscaleApi/master/wyz.json", {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
                }});
          console.log("------------->",res.data);
    } catch (error) {
        console.log("->>>>>>>error",error)
    }

  };
  getProductsList();

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.textContent = product.title; // Example: Render product name
    document.getElementById("product-list").appendChild(productElement);
  });

  punchIt.addEventListener("click", () => {
    console.log("hit me hard");
  });
});
