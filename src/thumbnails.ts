
const getThumbnailUrl = async (url: string, order: number): Promise<string> => {
    const videoId = url.split("v=")[1];
    return `http://img.youtube.com/vi/${videoId}/${order}.jpg`;
}

const getAllThumbnails = async (url: string): Promise<string[]> => {
    // Maxium 4 thumbnails for a video
    const urls = [];
    for (let i = 0; i < 4; i++) {
        urls.push(await getThumbnailUrl(url, i));
    }
    return urls;
}

export { getThumbnailUrl, getAllThumbnails };
