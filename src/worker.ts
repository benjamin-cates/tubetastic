//@ts-ignore
import { getSubtitles } from "youtube-captions-scraper";
import { DataRequest, Caption, DataResponse as DataResponse } from "./worker_comms";
/// Returns the captions of a specific video ID asynchronously
const get_captions = async (video_id: string): Promise<Caption[]> => {
  return getSubtitles({ videoID: video_id, lang: "en" });
};


chrome.runtime.onConnect.addListener((port) => {
  console.log("Opened port on: "+port);
  if(port.name == "worker_comms")
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
  else if(port.name == "storage_get")
    port.onMessage.addListener(async (message: string) => {
      console.log("Recieved get request");
      port.postMessage(await chrome.storage.local.get(message));
    });
  else if(port.name == "storage_set")
    port.onMessage.addListener(async (message: any) => {
      console.log("Recieved set request for "+JSON.stringify(message));
      await chrome.storage.local.set(message);
      port.postMessage("")
    });

  return false;
})

export type { DataResponse };
