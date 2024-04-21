//@ts-ignore
import { getSubtitles } from "youtube-captions-scraper";
import { DataRequest, Caption, DataResponse } from "./worker_comms";
import { get_video_info } from "./description_api";
/// Returns the captions of a specific video ID asynchronously
const get_captions = async (video_id: string): Promise<Caption[]> => {
  return getSubtitles({ videoID: video_id, lang: "en" });
};


chrome.runtime.onConnect.addListener((port) => {
    if(port.name=="worker_comms") {
      port.onMessage.addListener(async (message: DataRequest, _port) => {
        try {
          // const description = await get_description_api(message.video_url);
          // const statistics = await get_statistics_api(message.video_url);
          const video_info = await get_video_info(message.video_url);
          console.log(video_info);
          port.postMessage({
              captions: await get_captions(message.video_url),
              video_url: message.video_url,
              description: video_info[0].description,
              likes: video_info[0].likes,
          } as DataResponse);
        }
        catch(e) {
          port.postMessage({
              captions: [] as Caption[],
              video_url: message.video_url,
          })
        }
      });
    }
  else if(port.name == "storage_get")
    port.onMessage.addListener(async (message: string) => {
      console.log("Recieved get request");
      const out = await chrome.storage.local.get(message);
      console.log(out);
      port.postMessage(out);
    });
  else if(port.name == "storage_set")
    port.onMessage.addListener(async (message: any) => {
      console.log("Recieved set request for "+JSON.stringify(message));
      await chrome.storage.local.set(message);
      port.postMessage("")
    });

  return false;
});

