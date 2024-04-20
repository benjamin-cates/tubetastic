//@ts-ignore
import { getSubtitles } from "youtube-captions-scraper";
import { CaptionRequest, Caption, CaptionResponse } from "./captions";
/// Returns the captions of a specific video ID asynchronously
const get_captions = async (video_id: string): Promise<Caption[]> => {
  return getSubtitles({ videoID: video_id, lang: "en" });
};

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(async (message: CaptionRequest, _port) => {
        try {
            port.postMessage({
                captions: await get_captions(message.video_url),
                video_url: message.video_url,
            } as CaptionResponse);
        }
        catch(e) {
            port.postMessage({
                captions: [] as Caption[],
                video_url: message.video_url,
            })

        }
    });
})
