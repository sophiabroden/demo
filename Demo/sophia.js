let currentUser = '';

function checkPassword() {
    const password = document.getElementById('password').value;
    const userMap = {
        'Sophia': 'sophia',
        'Amanda': 'amanda',
        'Vendela': 'vendela'
    };

    if (userMap[password]) {
        currentUser = userMap[password];
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('chat-screen').style.display = 'block';
        loadMessages();
    } else {
        document.getElementById('error-message').innerText = 'Fel lösenord. Försök igen.';
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message !== '') {
        const chatBox = document.getElementById('chat-box');
        const newMessage = document.createElement('p');
        newMessage.className = `username-${currentUser}`;
        newMessage.innerText = `${currentUser}: ${message}`;
        chatBox.appendChild(newMessage);
        saveMessage(`${currentUser}: ${message}`);
        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;  // Scrolla till botten av chattboxen
    }
}

function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

function loadMessages() {
    const chatBox = document.getElementById('chat-box');
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(message => {
        const newMessage = document.createElement('p');
        const user = message.split(':')[0];
        newMessage.className = `username-${user}`;
        newMessage.innerText = message;
        chatBox.appendChild(newMessage);
    });
    chatBox.scrollTop = chatBox.scrollHeight;  // Scrolla till botten av chattboxen
}
