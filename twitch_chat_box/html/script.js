let isDragging = false;
let offsetX, offsetY;

const chatBox = document.getElementById('chat-box');
const chatContainer = document.getElementById('chat-container');

// Toggle visibility when the NUI sends a message
window.addEventListener('message', (event) => {
    if (event.data.action === 'toggleVisibility') {
        chatContainer.classList.toggle('hidden');
    }
});

// Make the chat box draggable
chatBox.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - chatContainer.offsetLeft;
    offsetY = e.clientY - chatContainer.offsetTop;
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        chatContainer.style.left = `${e.clientX - offsetX}px`;
        chatContainer.style.top = `${e.clientY - offsetY}px`;
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// Change transparency
function setTransparency(value) {
    chatBox.style.backgroundColor = `rgba(0, 0, 0, ${value})`;
}

// Listen for Lua events to change transparency
window.addEventListener('message', (event) => {
    if (event.data.action === 'setTransparency') {
        setTransparency(event.data.transparency);
    }
});
