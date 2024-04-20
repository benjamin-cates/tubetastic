
const YOUTUBE_API_KEY = "AIzaSyD3x-GATNpXBT4oPsSJr2XbLyEHS7lEZnc";

const get_description_api = async (video_id: string) => {
    const videoId = "YOUR_VIDEO_ID";
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}&fields=items(snippet(description))`);  
    const data = await response.json();
    console.log('description api', response);
    if(data.error) return [];
    return data.items.map((item: any) => {
        return item.snippet.description;
    });
  
}

export { get_description_api };
