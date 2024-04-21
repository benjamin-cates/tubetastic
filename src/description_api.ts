
const YOUTUBE_API_KEY = "AIzaSyD3x-GATNpXBT4oPsSJr2XbLyEHS7lEZnc";

const get_description_api = async (video_id: string): Promise<string[]> => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video_id}&key=${YOUTUBE_API_KEY}&fields=items(snippet(description))`);  
    console.log("Response is ", response);
    const data = await response.json();
    if(data.error) return [];
    return data.items.map((item: any) => {
        return item.snippet.description;
    });
  
}

export { get_description_api };
