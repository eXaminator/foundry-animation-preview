Hooks.on('renderFilePicker', (filePicker, html) => {
    html.find('[data-src="icons/svg/video.svg"]:visible').each((idx, img) => {
        const $img = $(img);
        const $parent = $img.closest('[data-path]');
        const path = $parent.data('path');
        const width = $img.attr('width');
        const height = $img.attr('height');
        const $video = $(`<video class="fas video-preview" loop width="${width}" height="${height}"></video>`);
        $img.replaceWith($video);

        const video = $video.get(0);
        let playTimeout = null;
        $parent.addClass('video-parent -loading');

        video.addEventListener('loadeddata', () => {
            $parent.removeClass('-loading');
        }, false);

        $parent.hover(
            () => {
                playTimeout = setTimeout(() => {
                    if (!video.src) video.src = path;
                    video.currentTime = 0;
                    video.play().catch(e => console.error(e));
                }, !!video.src ? 0 : 750);
            },
            () => {
                clearTimeout(playTimeout);
                video.pause();
                video.currentTime = 0;
            },
        );
    });
});