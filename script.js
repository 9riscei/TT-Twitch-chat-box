document.addEventListener('DOMContentLoaded', function() {
    const floatingWindow = document.getElementById('floating-window');
    const settingsBtn = document.getElementById('settings-btn');
    const controls = document.getElementById('controls');
    const channelInput = document.getElementById('channel-input');
    const refreshBtn = document.getElementById('refresh-btn');
    const opacitySlider = document.getElementById('opacity-slider');
    const twitchChat = document.getElementById('twitch-chat');

    let isDragging = false;
    let offsetX, offsetY;

    // Make the window draggable
    floatingWindow.addEventListener('mousedown', function(e) {
        if (e.target === settingsBtn) return;
        isDragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            floatingWindow.style.left = `${e.clientX - offsetX}px`;
            floatingWindow.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Toggle controls visibility
    settingsBtn.addEventListener('click', function() {
        controls.style.display = controls.style.display === 'flex' ? 'none' : 'flex';
    });

    // Update Twitch chat URL
    function updateChat() {
        const channel = channelInput.value.trim();
        if (channel) {
            twitchChat.src = `https://www.twitch.tv/embed/${channel}/chat?parent=${window.location.hostname}`;
        }
    }

    // Refresh chat
    refreshBtn.addEventListener('click', updateChat);

    // Update opacity
    opacitySlider.addEventListener('input', function() {
        floatingWindow.style.opacity = this.value;
    });

    // Initial chat load
    updateChat();
});