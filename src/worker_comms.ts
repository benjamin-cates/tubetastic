//import { DataResponse } from "./worker";

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
        const port = chrome.runtime.connect({name: video_id});
        port.postMessage({video_url: video_id} as DataResponse);
        port.onMessage.addListener((message: DataResponse, _port) => {
            resolve(message)
        });
    });
}

export {worker_comms};
export type {Caption};
export {DataRequest};
export {DataResponse};
