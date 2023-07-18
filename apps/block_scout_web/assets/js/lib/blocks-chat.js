import axios from "axios";

const messageContainer = document.getElementById('messageContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const unreadCountButton = document.getElementById('unreadCountButton');
const markAsReadButton = document.getElementById('markAsReadButton');
const retrieveMessagesButton = document.getElementById('retrieveMessagesButton');

const localhost = `http://localhost:3000/node-api`

// Function to send a message
async function sendMessage(message, replyToId) {
  try {
    const response = await axios.post(`${localhost}/send-message`, {
      message: message,
      replyToId: replyToId
    });

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
    const response = await axios.post(`${localhost}/mark-as-read/${address}`);

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
      // Display the retrieved messages in the chat container
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
    sendMessage(message);
  }
});

// Event listener for pressing Enter key in the input field
messageInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
      sendMessage(message);
    }
  }
});

// Event listener for getting unread message count
unreadCountButton.addEventListener('click', function () {
  const address = '0x...'; // Replace with the desired address
  getUnreadMessageCount(address);
});

// Event listener for marking all messages as read
markAsReadButton.addEventListener('click', function () {
  const address = '0xf2B86DBCd6cfDA88Afd03cc090dfcA5e008251C9'; // Replace with the desired address
  markAllMessagesAsRead(address);
});

// Event listener for retrieving chat messages
retrieveMessagesButton.addEventListener('click', function () {
  const startId = 0; // Replace with the desired start ID
  const offset = 10; // Replace with the desired offset
  const ctype = 0; // Replace with the desired message type
  retrieveChatMessages(startId, offset, ctype);
});
