// fetch the youtube comments using youtube api key
const YOUTUBE_API_KEY = "your-youtube-api-key"; // Replace with real API key

const get_comments = async (video_id: string) => {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${video_id}&key=${YOUTUBE_API_KEY}&order=relevance`);
    const data = await response.json();
    return data;
}

export default get_comments;
