//@ts-ignore
import { getSubtitles } from "youtube-captions-scraper";

/// Returns the captions of a specific video ID asynchronously
const get_captions = async (video_id: string): Promise<string> => {
    return getSubtitles({videoID: video_id, lang: "en"});
}

export default get_captions;
