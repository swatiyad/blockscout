import $ from 'jquery'
import omit from 'lodash.omit'
import humps from 'humps'
import numeral from 'numeral'
import socket from '../socket'
import { createStore, connectElements } from '../lib/redux_helpers.js'
import '../lib/transaction_input_dropdown'
import '../lib/async_listing_load'
import '../app'
import Swal from 'sweetalert2'
import { compareChainIDs, formatError } from '../lib/smart_contract/common_helpers'

export const initialState = {
  blockNumber: null,
  confirmations: null
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case 'ELEMENTS_LOAD': {
      return Object.assign({}, state, omit(action, 'type'))
    }
    case 'RECEIVED_NEW_BLOCK': {
      if ((action.msg.blockNumber - state.blockNumber) > state.confirmations) {
        return Object.assign({}, state, {
          confirmations: action.msg.blockNumber - state.blockNumber
        })
      } else return state
    }
    default:
      return state
  }
}

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
// Get references to the tab elements
const tab1 = document.querySelector(".tab-1-id");
const tab2 = document.querySelector(".tab-2-id");
const tab3 = document.querySelector(".tab-3-id");
window.onload =  async function () {
  let url = window.location.href;
  // const addressHash = getAddressHashFromURL(url);


var lastPart = getLastPartFromURL(url);
console.log(lastPart,"lastPart")

if (lastPart === "disqus") {

document.querySelector(".nav-link1").classList.remove("active");
document.querySelector(".nav-link2").classList.remove("active")
document.querySelector(".nav-link3").classList.add("active");

} else if (lastPart === "state") {

  document.querySelector(".nav-link1").classList.remove("active");
  document.querySelector(".nav-link2").classList.add("active")
  document.querySelector(".nav-link3").classList.remove("active") 
  // document.querySelector(".transaction_display_id").style.display == "none";

} else {
  document.querySelector(".nav-link1").classList.add("active");
  document.querySelector(".nav-link2").classList.remove("active")
  document.querySelector(".nav-link3").classList.remove("active")
}
};

// Click event listeners for the tabs
tab1.onclick = function() {
  // alert("hello1")
document.querySelector(".nav-link1").classList.add("active");
document.querySelector(".nav-link2").classList.remove("active");
document.querySelector(".nav-link3").classList.remove("active");

const url = window.location.href;
const addressHash = getAddressHashFromURL(url)

window.location.href = `/tx/${addressHash}`
}

tab2.onclick = function() {
//  alert("hello2")
document.querySelector(".nav-link1").classList.remove("active");
document.querySelector(".nav-link2").classList.add("active");
document.querySelector(".nav-link3").classList.remove("active");
let url = window.location.href;
const addressHash = getAddressHashFromURL(url)
window.location.href = `/tx/${addressHash}/state`
}

tab3.onclick = function() {
  // alert("hello3")
document.querySelector(".nav-link1").classList.remove("active");
document.querySelector(".nav-link2").classList.remove("active");
document.querySelector(".nav-link3").classList.add("active");
const url = window.location.href;
const addressHash = getAddressHashFromURL(url)
window.location.href = `/tx/${addressHash}/disqus`
}

// My commit



const elements = {
  '[data-selector="block-number"]': {
    load ($el) {
      return { blockNumber: parseInt($el.text(), 10) }
    }
  },
  '[data-selector="block-confirmations"]': {
    render ($el, state, oldState) {
      if (oldState.confirmations !== state.confirmations) {
        $el.empty().append(numeral(state.confirmations).format())
      }
    }
  }
}

const $transactionDetailsPage = $('[data-page="transaction-details"]')
if ($transactionDetailsPage.length) {
  const store = createStore(reducer)
  connectElements({ store, elements })

  const pathParts = window.location.pathname.split('/')
  const shouldScroll = pathParts.includes('internal-transactions') ||
  pathParts.includes('token-transfers') ||
  pathParts.includes('logs') ||
  pathParts.includes('token-transfers') ||
  pathParts.includes('raw-trace') ||
  pathParts.includes('state')
  if (shouldScroll) {
    document.getElementById('transaction-tabs').scrollIntoView()
  }

  const blocksChannel = socket.channel('blocks:new_block', {})
  blocksChannel.join()
  blocksChannel.on('new_block', (msg) => store.dispatch({
    type: 'RECEIVED_NEW_BLOCK',
    msg: humps.camelizeKeys(msg)
  }))

  const transactionHash = $transactionDetailsPage[0].dataset.pageTransactionHash
  const transactionChannel = socket.channel(`transactions:${transactionHash}`, {})
  transactionChannel.join()
  transactionChannel.on('collated', () => window.location.reload())

  $('.js-cancel-transaction').on('click', (event) => {
    const btn = $(event.target)
    if (!window.ethereum) {
      btn
        .attr('data-original-title', `Please unlock ${btn.data('from')} account in Metamask`)
        .tooltip('show')

      setTimeout(() => {
        btn
          .attr('data-original-title', null)
          .tooltip('dispose')
      }, 3000)
      return
    }
    const { chainId: walletChainIdHex } = window.ethereum
    compareChainIDs(btn.data('chainId'), walletChainIdHex)
      .then(() => {
        const txParams = {
          from: btn.data('from'),
          to: btn.data('from'),
          value: 0,
          nonce: btn.data('nonce').toString()
        }
        window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [txParams]
        })
          .then(function (txHash) {
            const successMsg = `<a href="/tx/${txHash}">Canceling transaction</a> successfully sent to the network. The current one will change the status once canceling transaction will be confirmed.`
            Swal.fire({
              title: 'Success',
              html: successMsg,
              icon: 'success'
            })
              .then(() => {
                window.location.reload()
              })
          })
          .catch(_error => {
            btn
              .attr('data-original-title', `Please unlock ${btn.data('from')} account in Metamask`)
              .tooltip('show')

            setTimeout(() => {
              btn
                .attr('data-original-title', null)
                .tooltip('dispose')
            }, 3000)
          })
      })
      .catch((error) => {
        Swal.fire({
          title: 'Warning',
          html: formatError(error),
          icon: 'warning'
        })
      })
  })
}

$(function () {
  const $collapseButton = $('[button-collapse-input]')
  const $expandButton = $('[button-expand-input]')

  $collapseButton.on('click', event => {
    const $button = event.target
    const $parent = $button.parentElement
    const $collapseButton = $parent.querySelector('[button-collapse-input]')
    const $expandButton = $parent.querySelector('[button-expand-input]')
    const $hiddenText = $parent.querySelector('[data-hidden-text]')
    const $placeHolder = $parent.querySelector('[data-placeholder-dots]')
    $collapseButton.classList.add('d-none')
    $expandButton.classList.remove('d-none')
    $hiddenText.classList.add('d-none')
    $placeHolder.classList.remove('d-none')
  })

  $expandButton.on('click', event => {
    const $button = event.target
    const $parent = $button.parentElement
    const $collapseButton = $parent.querySelector('[button-collapse-input]')
    const $expandButton = $parent.querySelector('[button-expand-input]')
    const $hiddenText = $parent.querySelector('[data-hidden-text]')
    const $placeHolder = $parent.querySelector('[data-placeholder-dots]')
    $expandButton.classList.add('d-none')
    $collapseButton.classList.remove('d-none')
    $hiddenText.classList.remove('d-none')
    $placeHolder.classList.add('d-none')
  })
})


// function getAddressHashFromURL() {
//   var url = window.location.href;

// // Split the URL by '/'
// var urlParts = url.split('/');

// // The address hash should be the last part of the URL
// var addressHash = urlParts[urlParts.length - 1];

// return addressHash;
// }

// function getLastPartFromURL() {
//   var url = window.location.href;
//   var stateIndex = url.lastIndexOf("/state");
//   var disqusIndex = url.lastIndexOf("/disqus");

//   if (stateIndex !== -1 && stateIndex === url.length - "/state".length) {
//       var lastPart = url.substr(stateIndex + "/state".length);
//       return lastPart;
//   } else if (disqusIndex !== -1 && disqusIndex === url.length - "/disqus".length) {
//       var lastPart = url.substr(disqusIndex + "/disqus".length);
//       return lastPart;
//   } else {
//       return "";
//   }
// }

// document.addEventListener("DOMContentLoaded",function () {
// document.querySelector(".state_page_second").style.display ="flex"

// const address = getAddressHashFromURL();
// console.log(address,"address",window.location.href);
// var lastPart = getLastPartFromURL();

// if (lastPart === "disqus") {
//     // Your code for handling "/disqus" case here
//     console.log("URL contains /disqus");
// } else if (lastPart === "state") {
//     // Your code for handling "/state" case here
//     document.querySelector("#tab-4-id a").classList.remove("active");
//     document.querySelector("#tab-5-id a").classList.add("active");
//     document.querySelector("#tab-6-id a").classList.remove("active");
// } else {
//     // Your code for handling other cases (empty string) here
//     console.log("URL does not match /state or /disqus");
// }
// })


// const tab4 = document.querySelector("#tab-4-id");
// const tab5 = document.querySelector("#tab-5-id");
// const tab6 = document.querySelector("#tab-6-id");


// tab4.onclick = function() {
// document.querySelector("#tab-4-id a").classList.add("active");
// document.querySelector("#tab-5-id a").classList.remove("active");
// document.querySelector("#tab-6-id a").classList.remove("active");
// var addressHash = getAddressHashFromURL();
// console.log(addressHash,"addressHash")
// window.location.href = `http://localhost:4000/tx/${addressHash}`

// }

// tab5.onclick = function() {
// console.log("hello12")
// document.querySelector("#tab-4-id a").classList.remove("active");
// document.querySelector("#tab-5-id a").classList.add("active");
// document.querySelector("#tab-6-id a").classList.remove("active");
// document.querySelector("#transaction_detail_id").style.display=="none !important";
// var addressHash = getAddressHashFromURL();
// console.log(addressHash,"addressHash")
// window.location.href = `http://localhost:4000/tx/${addressHash}/state`
// if(last!=""){
//   document.querySelector("#tab-5-id a").classList.add("active");
// }
// }

// tab6.onclick = function() {
// document.querySelector("#tab-4-id a").classList.remove("active");
// document.querySelector("#tab-5-id a").classList.remove("active");
// document.querySelector("#tab-6-id a").classList.add("active");
// var addressHash = getAddressHashFromURL();
// console.log(addressHash,"addressHash")
// console.log("Address Hash:", addressHash);
// window.location.href = `http://localhost:4000/tx/${addressHash}/discus`
// }
