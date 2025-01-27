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
        const input = channelInput.value.trim();

        // Check if the input is a pop-out chat link
        if (input.startsWith("https://www.twitch.tv/popout/")) {
            // Extract the channel name from the pop-out link
            const channel = input.split("/")[4]; // Extract the channel name
            if (channel) {
                // Construct the Twitch embed URL
                const embedUrl = `https://www.twitch.tv/embed/${channel}/chat?parent=${window.location.hostname}`;
                console.log("Twitch Embed URL:", embedUrl); // Debugging: Log the URL
                twitchChat.src = embedUrl;
            } else {
                alert("Invalid pop-out chat link. Please check the URL.");
            }
        } else if (input) {
            // If it's not a pop-out link, assume it's a channel name
            const embedUrl = `https://www.twitch.tv/embed/${input}/chat?parent=${window.location.hostname}`;
            console.log("Twitch Embed URL:", embedUrl); // Debugging: Log the URL
            twitchChat.src = embedUrl;
        } else {
            alert("Please enter a valid Twitch pop-out chat link or channel name.");
        }
    }

    // Refresh chat
    refreshBtn.addEventListener('click', updateChat);

    // Update opacity
    opacitySlider.addEventListener('input', function() {
        floatingWindow.style.opacity = this.value;
    });

    // Initial chat load (optional)
    // updateChat(); // Uncomment if you want to load a default channel on page load
});
