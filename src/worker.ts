//@ts-ignore
import { getSubtitles } from "youtube-captions-scraper";
import { DataRequest, Caption, DataResponse as DataResponse } from "./worker_comms";
import { worker_comms } from "./worker_comms";
/// Returns the captions of a specific video ID asynchronously
const get_captions = async (video_id: string): Promise<Caption[]> => {
  return getSubtitles({ videoID: video_id, lang: "en" });
};


chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(async (message: DataRequest, _port) => {
        try {
            port.postMessage({
                captions: await get_captions(message.video_url),
                video_url: message.video_url,
                description: "desc",
                likes: 0,
            } as DataResponse);
        }
        catch(e) {
            port.postMessage({
                captions: [] as Caption[],
                video_url: message.video_url,
            })

        }
    });
})

export type { DataResponse };
export{get_captions};