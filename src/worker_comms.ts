
interface Caption {
    start: number
    dur: number
    text: string
}

interface DataResponse {
    video_url: string
    captions: Caption[]
    description: string
    likes: number
};

interface DataRequest {
    video_url: string
}

/// Returns the captions of a specific video ID asynchronously
/// If no captions exist, returns CaptionResponse with empty array
const worker_comms = (video_id: string): Promise<DataResponse> => {
    return new Promise((resolve, _reject) => {
        const port = chrome.runtime.connect({name: "worker_comms"});
        port.postMessage({video_url: video_id} as DataResponse);
        port.onMessage.addListener((message: DataResponse, _port) => {
            resolve(message)
        });
    });
}

const get_storage = async (item: string): Promise<any> => {
  return new Promise((resolve, _reject) => {
    const port = chrome.runtime.connect({name: "storage_get"});
    port.postMessage(item)
    port.onMessage.addListener((message: any) => {
      resolve(message as any);
    });
  });
}

const set_storage = async (item: string, value: any): Promise<void> => {
  return new Promise((resolve, _reject) => {
    const port = chrome.runtime.connect({name: "storage_set"});
    port.postMessage({[item]: value})
    port.onMessage.addListener((_message: any) => {
      resolve();
    });
  });
}

export {worker_comms, get_storage, set_storage};
export type {Caption};
export {DataRequest};
export {DataResponse};
