import { Content, Part } from "@google/generative-ai";

import make_model from "./gemini";
import { get_captions } from "./captions";

const MODEL_ROLE =
  "You are an agent, do not write any markup information \
    in your responses. Your responses should be short and to the point.";
const get_captions_for_video = async () => {
  const video_id = (
    document.getElementById("video-title-link") as HTMLAnchorElement
  ).href.replace("https://www.youtube.com/watch?v=", "");
  console.log("getting captions for", video_id);
  fetch("https://youtube.com/watch?v=" + video_id + "#heyo").then(
    (response) => {
      response.text().then(console.log);
      console.log("We got a response !");
    }
  );
  const content = get_captions(video_id, console.log);
  console.log(content);
};
const generate_test = async () => {
  const model = make_model();
  model.systemInstruction = { role: "admin", parts: [{ text: MODEL_ROLE }] };
  const out = await model.generateContent("Heyo can you give me a random word");
  console.log(out.response.text());
};

// generate_test();
get_captions_for_video();
