// 各画質のサムネイルURLを取得する関数
function fetchThumbnails() {
    const urlInput = document.getElementById('youtube-url').value;
    const videoId = getYouTubeVideoID(urlInput);

    if (videoId) {
        const qualities = ['default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'];
        const container = document.getElementById('thumbnails-container');
        container.innerHTML = '';

        qualities.forEach(quality => {
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
            displayThumbnail(thumbnailUrl, quality);
        });
    } else {
        alert('有効なYouTubeのURLを入力してください');
    }
}

// YouTubeのURLから動画IDを取得する関数
function getYouTubeVideoID(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// サムネイルを表示する関数
function displayThumbnail(thumbnailUrl, quality) {
    const container = document.getElementById('thumbnails-container');
    const img = document.createElement('img');
    img.src = thumbnailUrl;
    img.alt = `${quality} thumbnail`;
    img.className = 'responsive-img thumbnail';
    img.onerror = () => {
        img.src = 'https://via.placeholder.com/480x360?text=No+Image';
        img.alt = 'No Image';
    };

    const downloadLink = document.createElement('a');
    downloadLink.href = thumbnailUrl;
    downloadLink.download = `${quality}.jpg`;
    downloadLink.className = 'btn waves-effect waves-light';
    downloadLink.innerText = `${quality} ダウンロード`;

    const div = document.createElement('div');
    div.className = 'thumbnail';
    div.appendChild(img);
    div.appendChild(document.createElement('br'));
    div.appendChild(downloadLink);

    container.appendChild(div);
}
