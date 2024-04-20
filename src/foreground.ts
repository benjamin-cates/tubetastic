import { Content, Part } from "@google/generative-ai";

import make_model from "./gemini";


const MODEL_ROLE = "You are an agent, do not write any markup information \
    in your responses. Your responses should be short and to the point.";
const generate_test = async () => {
    const model = make_model();
    model.systemInstruction = { role: "admin", parts: [{text: MODEL_ROLE}]};
    const out = await model.generateContent("Heyo can you give me a random word");
    console.log(out.response.text());
}

generate_test();
