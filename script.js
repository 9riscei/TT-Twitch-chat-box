document.addEventListener('DOMContentLoaded', function() {
    const floatingWindow = document.getElementById('floating-window');
    const settingsBtn = document.getElementById('settings-btn');
    const slidebarContainer = document.getElementById('slidebar-container');
    const opacitySlider = document.getElementById('opacity-slider');
    const twitchChat = document.getElementById('twitch-chat');

    // Make the window draggable
    let isDragging = false;
    let offsetX, offsetY;

    floatingWindow.addEventListener('mousedown', function(e) {
        if (e.target === settingsBtn) return;
        isDragging = true;
        offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
        offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;
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

    // Toggle slidebar visibility
    settingsBtn.addEventListener('click', function() {
        slidebarContainer.style.display = slidebarContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Adjust window opacity
    opacitySlider.addEventListener('input', function() {
        floatingWindow.style.opacity = opacitySlider.value;
    });

    // Function to load Twitch chat
    function loadTwitchChat(channel) {
        twitchChat.src = `https://www.twitch.tv/embed/${channel}/chat?parent=${window.location.hostname}`;
    }

    // Example: Load a default channel (you can replace this with a user input)
    loadTwitchChat('twitch');
});