Hooks.on('renderFilePicker', (filePicker, html) => {
    html.find('[data-src="icons/svg/video.svg"]').each((idx, img) => {
        const $img = $(img);
        const $parent = $img.closest('[data-path]');
        const path = $parent.data('path');
        const width = $img.attr('width');
        const height = $img.attr('height');
        const $video = $(`<video preload="metadata" class="fas video-preview" src="${path}" loop width="${width}" height="${height}"></video>`);
        $img.replaceWith($video);

        const video = $video.get(0);

        video.addEventListener('durationchange', () => {
            video.currentTime = Math.round(video.duration / 2);
        }, false);

        $parent.addClass('video-parent');

        $parent.hover(
            () => {
                video.currentTime = 0;
                video.play().catch(() => null);
            },
            () => {
                video.pause();
                video.currentTime = Math.round(video.duration / 2);
            },
        );
    });
});