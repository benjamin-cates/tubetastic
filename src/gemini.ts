import { GenerativeModel, GoogleGenerativeAI, Content, StartChatParams } from "@google/generative-ai";
import API_KEY from "./api_key";
import VideoData from "./video_data";


const make_model = (): GenerativeModel => {
    return new GoogleGenerativeAI(API_KEY).getGenerativeModel({model: "gemini-1.5-pro-latest"});
}

interface GeminiAnalysis {
    sentences: GeminiSentences
    categories: GeminiCategories
    numerics: GeminiNumerics
}

interface GeminiSentences {
    summary: string
    suggested_title: string
    background_knowledge: string
    topic_phrase: string
}
interface GeminiCategories {
    // Informative, narrative, essay, gameplay, music, or vlog
    style: string
    // Examples: Computer programming
    subject_matter: string
}
// All numbers rated on a scale of one to five
interface GeminiNumerics {
    informativeness: number
    coherency: number
    entertainment: number
    complexity: number
    clickbaitness: number
    accuracy: number
}

const MODEL_ROLE = "You are an agent, do not write any markup or markdown information "
    + "in your responses. Your responses should be short and to the point. "
    + "Please follow the prompts exactly with newlines between answers, do not put the prompt name, just your answer on each line";

const ASK_FOR_OUTPUT = `Based on the information you have, answer the following questions by filling out the same format with your own answers.`
    + `Rate the following on a scale of one to five\n`
    + `Index of informative: [number]\n`
    + `Coherency: [number]\n`
    + `Entertainment: [number]\n`
    + `Complexity: [number]\n`
    + `Index of clickbait: [number]\n`
    + `Accuracy: [number]\n`

    + `Write the word SPLIT on this line. Answer the following questions\n`
    + `Answer with either informative, narrative, essay, gameplay, music, or vlog based on the style of the video: [your answer]\n`
    + `Answer with the subject matter of the video (two words): [your answer]\n`

    + `Write the word SPLIT on this line. Answer the following questions\n`
    + `Write short summary of the video: [sentence]\n`
    + `Write a new title you suggest for the video: [your answer]\n`
    + `Write the minimum background topics that are required to understand the video: [your answer]\n`
    + `Write a topic phrase in less than four words: [your answer]\n`;
const analyze_video = async (data: VideoData): Promise<GeminiAnalysis> => {
    const model = make_model();
    model.systemInstruction = { role: "user", parts: [{text: MODEL_ROLE}]};
    const chat = model.startChat({history: [{role: "user", parts: [
        {text: `The following is the transcript of a YouTube video titled "${data.title}".`
        + `It was authored by ${data.author} and published on ${data.publish_date.toString()}.\n`
        + `Based on the viewer reception, it has ${data.view_count} views and ${data.likes} likes.`
        + `The top comments are: \n${data.top_comments.map(comment=>comment.username+": "+comment.text).join("\n")}\n`
        + `The following is the description of the video: ${data.description}`},
        {text: `Here are the captions for the video: ${data.captions.map(caption => caption.text).join("\n")}`} ]}]});
    console.log("Making chat");
    const output = (await chat.sendMessage(ASK_FOR_OUTPUT)).response.text();
    const areas = output.split("SPLIT").map(area=>area.split("\n"));
    return {
        numerics: {
            informativeness: Number(areas[0][0]),
            coherency: Number(areas[0][1]),
            entertainment: Number(areas[0][2]),
            complexity: Number(areas[0][3]),
            clickbaitness: Number(areas[0][4]),
            accuracy: Number(areas[0][5]),
        },
        categories: {
            style: areas[1][0],
            subject_matter: areas[1][1],
        },
        sentences: {
            summary: areas[2][0],
            suggested_title: areas[2][1],
            background_knowledge: areas[2][2],
            topic_phrase: areas[2][3]
        },
    };
}

export { make_model, analyze_video };
