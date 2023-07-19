import axios from "axios";
import Web3 from "web3";


const messageContainer = document.getElementById('messageContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const unreadCountButton = document.getElementById('unreadCountButton');
const markAsReadButton = document.getElementById('markAsReadButton');
const retrieveMessagesButton = document.getElementById('retrieveMessagesButton');

const localhost = `https://wyzthscan.org/node-api`
if (typeof window.ethereum !== 'undefined') {
  const web3 = new Web3(window.ethereum);

function displayMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = `${sender}: ${message}`;
  messageContainer.appendChild(messageElement);
}

// Function to send a message
async function sendChatMessage( message,to,replyToId) {
  try {
    const url = `${localhost}/send-message`;
    const params = {
      message: message,
      replyToId: replyToId,
      to:to
    };

    const response = await axios.get(url, { params });

    if (response.status === 200) {
      console.log('Message sent successfully.');
      displayMessage('You', message);
      messageInput.value = '';
    } else {
      console.error('Failed to send message.');
    }
  } catch (error) {
    console.error('An error occurred while sending the message:', error);
  }
}

// Function to get the unread message count for a given address
async function getUnreadMessageCount(address) {
  try {
    const response = await axios.get(`${localhost}/unread-count/${address}`);

    if (response.status === 200) {
      const count = response.data.count;
      console.log(`Unread message count for ${address}: ${count}`);
    } else {
      console.error('Failed to retrieve unread message count.');
    }
  } catch (error) {
    console.error('An error occurred while retrieving the unread message count:', error);
  }
}

// Function to mark all messages as read for a given address
async function markAllMessagesAsRead(address) {
  try {
    const url = `${localhost}/mark-as-read/${address}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      console.log('All messages marked as read.');
    } else {
      console.error('Failed to mark messages as read.');
    }
  } catch (error) {
    console.error('An error occurred while marking messages as read:', error);
  }
}


// Function to retrieve chat messages for a wallet
async function retrieveChatMessages(startId, offset, ctype) {
  try {
    const response = await axios.get(`${localhost}/retrieve-messages/${startId}/${offset}/${ctype}`);

    if (response.status === 200) {
      const messages = response.data.messages;
      console.log('Retrieved chat messages:', messages);
      
      messages.forEach(message => {
        displayMessage(message.sender, message.text);
      });
    } else {
      console.error('Failed to retrieve chat messages.');
    }
  } catch (error) {
    console.error('An error occurred while retrieving chat messages:', error);
  }
}

// Event listener for sending a message
sendButton.addEventListener('click', function () {
  const message = messageInput.value.trim();
  if (message !== '') {
    const toAddress = '0xf2B86DBCd6cfDA88Afd03cc090dfcA5e008251C9'; // Replace with the recipient's address
    const replyToId = 0; // Replace with the replytoid (if applicable)
    sendChatMessage(message, toAddress, replyToId);
  }
});

// Event listener for pressing Enter key in the input field
messageInput.addEventListener('keydown', async function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];
  const address = walletAddress;
      const toAddress = address; 
      const replyToId = 0; 
      sendChatMessage(message, toAddress, replyToId);
    }
  }
});

// Event listener for getting unread message count
unreadCountButton.addEventListener('click',async function () {
  await window.ethereum.request({ method: 'eth_requestAccounts' });

      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];
  const address = walletAddress; // Replace with the desired address
  getUnreadMessageCount(address);
});

// Event listener for marking all messages as read
markAsReadButton.addEventListener('click',async function () {
  const accounts = await web3.eth.getAccounts();
  const walletAddress = accounts[0];
const address = walletAddress;
  markAllMessagesAsRead(address);
});

// Event listener for retrieving chat messages
retrieveMessagesButton.addEventListener('click', function () {
  const startId = 0; // Replace with the desired start ID
  const offset = 10; // Replace with the desired offset
  const ctype = 0; // Replace with the desired message type
  retrieveChatMessages(startId, offset, ctype);
});
}