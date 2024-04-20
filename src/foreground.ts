import { Content, Part } from "@google/generative-ai";

import make_model from "./gemini";
import {get_captions} from "./captions";
import { getThumbnailUrl} from "./thumbnails";

const MODEL_ROLE =
  "You are an agent, do not write any markup information \
    in your responses. Your responses should be short and to the point.";
const get_captions_for_video = async () => {
}
const generate_test = async () => {
  const model = make_model();
  model.systemInstruction = { role: "admin", parts: [{ text: MODEL_ROLE }] };
  const out = await model.generateContent("Heyo can you give me a random word");
  console.log(out.response.text());
};

const get_thumbnail = async () => {
    const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const thumbnailUrl = await getThumbnailUrl(videoUrl, 0);
    console.log(thumbnailUrl);
}
get_thumbnail();
get_captions_for_video();
