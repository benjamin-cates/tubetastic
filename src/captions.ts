
interface CaptionResponse {
    video_url: string
    captions: Caption[]
};

interface CaptionRequest {
    video_url: string
}

interface Caption {
    start: number
    dur: number
    text: string
}

/// Returns the captions of a specific video ID asynchronously
const get_captions = (video_id: string): Promise<Caption[]> => {
    return new Promise((resolve, _reject) => {
        const port = chrome.runtime.connect({name: video_id});
        port.postMessage({video_url: video_id} as CaptionRequest);
        port.onMessage.addListener((message: CaptionResponse, _port) => {
            resolve(message.captions)
        });
    });
}

export {get_captions};
export type {CaptionRequest, Caption, CaptionResponse};
