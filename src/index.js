Hooks.on('renderFilePicker', (filePicker, html) => {
    // Supported video formats
    const videoFormats = ['.webm', '.mp4', '.ogg', '.ogv', '.avi', '.mov', '.wmv', '.flv', '.mkv'];

    // Function to check if a path ends with a video format
    const isVideoFile = (path) => {
        if (!path) return false;
        return videoFormats.some(format => path.toLowerCase().endsWith(format));
    };

    // Find all elements with data-path attribute
    const allElements = html.querySelectorAll('.file[data-path]');
    console.log('Elements with data-path:', allElements);

    allElements.forEach((element) => {
        // Check if element is visible
        if (element.offsetParent === null) return;

        const path = element.dataset.path;
        if (!isVideoFile(path)) return;

        // Find the image element within this container
        const img = element.querySelector('img');
        if (!img) return;

        const width = img.getAttribute('width');
        const height = img.getAttribute('height');

        // Create video element
        const video = document.createElement('video');
        video.className = 'video-preview';
        video.loop = true;
        video.width = width;
        video.height = height;

        // Replace img with video
        img.parentNode.replaceChild(video, img);

        let playTimeout = null;
        element.classList.add('video-parent', '-loading');

        video.addEventListener('loadeddata', () => {
            element.classList.remove('-loading');
        }, false);

        // Add hover event listeners
        element.addEventListener('mouseenter', () => {
            if (element.parentNode.classList.contains('details')) return;
            playTimeout = setTimeout(() => {
                if (!video.src) video.src = path;
                video.currentTime = 0;
                video.play().catch(e => console.error(e));
            }, video.src ? 0 : 750);
        });

        element.addEventListener('mouseleave', () => {
            clearTimeout(playTimeout);
            video.pause();
            video.currentTime = 0;
        });
    });
});
