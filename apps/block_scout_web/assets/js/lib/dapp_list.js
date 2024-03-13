
document.addEventListener("DOMContentLoaded", async function () {

    const punchIt = document.getElementById('punchIt');

    const products = [
    {
        image:"https://blockscout-content.s3.amazonaws.com/PodsYield.png",
        title:"pods",
        description:"1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
        link:"https://blockscout-content.s3.amazonaws.com/PodsYield.png"
    },
    {
        image:"https://blockscout-content.s3.amazonaws.com/PodsYield.png",
        title:"pods",
        description:"1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
        link:"https://blockscout-content.s3.amazonaws.com/PodsYield.png"
    },
    {
        image:"https://blockscout-content.s3.amazonaws.com/PodsYield.png",
        title:"pods",
        description:"1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
        link:"https://blockscout-content.s3.amazonaws.com/PodsYield.png"
    },
    {
        image:"https://blockscout-content.s3.amazonaws.com/PodsYield.png",
        title:"pods",
        description:"1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
        link:"https://blockscout-content.s3.amazonaws.com/PodsYield.png"
    },
    {
        image:"https://blockscout-content.s3.amazonaws.com/PodsYield.png",
        title:"pods",
        description:"1-click-deposit investment product, making it easy to invest in complex derivatives strategies",
        link:"https://blockscout-content.s3.amazonaws.com/PodsYield.png"
    }
      ]

      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.textContent = product.title; // Example: Render product name
        document.getElementById('product-list').appendChild(productElement);
      });




    punchIt.addEventListener('click', ()=>{
        console.log('hit me hard')
    })


});
