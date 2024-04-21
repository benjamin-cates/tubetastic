const getThumbnailUrl = async (video_id: string, order: number): Promise<string> => {
  return `http://img.youtube.com/vi/${video_id}/${order}.jpg`;
};

const getAllThumbnails = async (video_id: string): Promise<string[]> => {
  // Maxium 4 thumbnails for a video
  const urls = [];
  for (let i = 0; i < 4; i++) {
    urls.push(await getThumbnailUrl(video_id, i));
  }
  return urls;
};

export { getThumbnailUrl, getAllThumbnails };
