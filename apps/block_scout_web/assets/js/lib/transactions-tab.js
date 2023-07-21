// function getAddressHashFromURL(url) {
//   var regex = /\/tx\/(0x[0-9a-fA-F]+)/;
//   var match = url.match(regex);
  
//   if (match) {
//     return match[1];
//   } else {
//     return null;
//   }
// }

// function getLastPartFromURL(url) {
//   if (url.endsWith("/state")) {
//     return "state";
//   } else if (url.endsWith("/disqus")) {
//     return "disqus";
//   } else {
//     return "";
//   }
// }
// // Get references to the tab elements
// const tab1 = document.querySelector(".tab-1-id");
// const tab2 = document.querySelector(".tab-2-id");
// const tab3 = document.querySelector(".tab-3-id");
// window.onload =  async function () {
//   let url = window.location.href;
//   // const addressHash = getAddressHashFromURL(url);


// var lastPart = getLastPartFromURL(url);

// if (lastPart === "disqus") {

// document.querySelector(".nav-link1").classList.remove("active");
// document.querySelector(".nav-link2").classList.remove("active")
// document.querySelector(".nav-link3").classList.add("active");

// } else if (lastPart === "state") {

//   document.querySelector(".nav-link1").classList.remove("active");
//   document.querySelector(".nav-link2").classList.add("active")
//   document.querySelector(".nav-link3").classList.remove("active") 
//   document.querySelector(".transaction_display_id").style.display == "none";

// } else {
//   document.querySelector(".nav-link1").classList.add("active");
//   document.querySelector(".nav-link2").classList.remove("active")
//   document.querySelector(".nav-link3").classList.remove("active")
// }
// };

// // Click event listeners for the tabs
// tab1.onclick = function() {
// document.querySelector("#tab-1-id .nav-link1").classList.add("active");
// document.querySelector("#tab-2-id .nav-link2").classList.remove("active");
// document.querySelector("#tab-3-id .nav-link3").classList.remove("active");

// let url = window.location.href;
// const addressHash = getAddressHashFromURL(url)

// window.location.href = `/tx/${addressHash}`
// }

// tab2.onclick = function() {
// document.querySelector("#tab-1-id .nav-link1").classList.remove("active");
// document.querySelector("#tab-2-id .nav-link2").classList.add("active");
// document.querySelector("#tab-3-id .nav-link3").classList.remove("active");
// document.querySelector(".transaction_detail_id").style.display=="none";
// let url = window.location.href;
// const addressHash = getAddressHashFromURL(url)
// window.location.href = `/tx/${addressHash}/state`
// }

// tab3.onclick = function() {
// document.querySelector("#tab-1-id .nav-link1").classList.remove("active");
// document.querySelector("#tab-2-id .nav-link2").classList.remove("active");
// document.querySelector("#tab-3-id .nav-link3").classList.add("active");
// let url = window.location.href;
// const addressHash = getAddressHashFromURL(url)
// window.location.href = `/tx/${addressHash}/disqus`
// }


// My commit
function getAddressHashFromURL(url) {
    var regex = /\/tx\/(0x[0-9a-fA-F]+)/;
    var match = url.match(regex);
  
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }
  
  function getLastPartFromURL(url) {
    if (url.endsWith("/state")) {
      return "state";
    } else if (url.endsWith("/disqus")) {
      return "disqus";
    } else {
      return "";
    }
  }
  
  function handleTabClick(tabId, targetUrl) {
    document.querySelector("#tab-1-id .nav-link1").classList.remove("active");
    document.querySelector("#tab-2-id .nav-link2").classList.remove("active");
    document.querySelector("#tab-3-id .nav-link3").classList.remove("active");
  
    document.querySelector(tabId).classList.add("active");
    
    const addressHash = getAddressHashFromURL(window.location.href);
    window.location.href = `/tx/${addressHash}${targetUrl}`;
  }
  
 window.onload = async function() {
    let url = window.location.href;
    var lastPart = getLastPartFromURL(url);
    console.log(lastPart, "lastPart");
  
    if (lastPart === "disqus") {
      handleTabClick(".nav-link3", "/disqus");
    } else if (lastPart === "state") {
      handleTabClick(".nav-link2", "/state");
      document.querySelector(".transaction_detail_id").style.display = "none";
    } else {
      handleTabClick(".nav-link1", "");
    }
  };
  
  // Click event listeners for the tabs
  document.querySelector(".nav-link1").onclick = function() {
    handleTabClick(".nav-link1", "");
  };
  
  document.querySelector(".nav-link2").onclick = function() {
    handleTabClick(".nav-link2", "/state");
  };
  
  document.querySelector(".nav-link3").onclick = function() {
    handleTabClick(".nav-link3", "/disqus");
  };
  
  
  // My commit