
const YOUTUBE_API_KEY = "AIzaSyD3x-GATNpXBT4oPsSJr2XbLyEHS7lEZnc";

const get_description_api = async (video_id: string): Promise<string[]> => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video_id}&key=${YOUTUBE_API_KEY}&fields=items(snippet(description))`);  
    const data = await response.json();
    if(data.error) return [];
    return data.items.map((item: any) => {
        return item.snippet.description;
    });
}

const get_statistics_api = async (video_id: string): Promise<any[]> => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video_id}&key=${YOUTUBE_API_KEY}`);
    const data = await response.json();
    if(data.error) return [];
    return data.items.map((item: any) => {
        return item.statistics;
    });
  
}

//  Use the youtube api to get info of a video, combining the statistics and the description apis above
const get_video_info = async (video_id: string): Promise<any[]> => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${video_id}&key=${YOUTUBE_API_KEY}&fields=items(snippet(description,publishedAt),statistics(viewCount,likeCount))`);
    const data = await response.json();
    if(data.error) return [];
    return data.items.map((item: any) => {
        return {
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            likes: item.statistics.likeCount,
            views: item.statistics.viewCount
        };
    });
}



export { get_description_api, get_statistics_api, get_video_info };
