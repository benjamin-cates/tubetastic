// fetch the youtube comments using youtube api key
const YOUTUBE_API_KEY = "AIzaSyD3x-GATNpXBT4oPsSJr2XbLyEHS7lEZnc"; // Replace with real API key

interface Comment {
    text: string
    username: string
}

const get_comments = async (video_id: string): Promise<Comment[]> => {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${video_id}&key=${YOUTUBE_API_KEY}&order=relevance`);
    const data = await response.json();
    if(data.error) return [];
    return data.items.map((item: any) => {
      const comment = item.snippet.topLevelComment.snippet;
      return {text: comment.textOriginal, username: comment.authorDisplayName};
    });
}

export { get_comments };
export type { Comment };
