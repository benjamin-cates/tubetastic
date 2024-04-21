import { GenerativeModel, GoogleGenerativeAI, Content } from "@google/generative-ai";
import VideoData from "./video_data";
import { get_storage } from "./worker_comms";


const make_model = async (): Promise<GenerativeModel> => {
    return new GoogleGenerativeAI((await get_storage("GEMINI_API_KEY") as any).GEMINI_API_KEY).getGenerativeModel({model: "gemini-1.5-pro-latest"});
}

interface GeminiAnalysis {
    sentences: GeminiSentences
    categories: GeminiCategories
    numerics: GeminiNumerics
}

interface GeminiSentences {
    summary: string
    suggested_title: string
    topics_covered: string
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
    + "Please follow the prompts exactly with newlines between answers, "
    + "do not put the prompt name, just your answer on each line";

const ASK_FOR_OUTPUT = `Based on the information you have, answer the following questions, do not rewrite the prompt.`
    + `Rate the following on a scale of one to five\n`
    + `Index of informative as a number one to five\n`
    + `Coherency as a number one to five\n`
    + `Entertainment as a number one to five\n`
    + `Complexity as a number one to five\n`
    + `Index of clickbait as a number one to five\n`
    + `Accuracy as a number one to five\n`

    + `Write the word SPLIT on this line. Answer the following questions\n`
    + `Answer with either informative, narrative, essay, gameplay, music, or vlog based on the style of the video\n`
    + `Answer with the subject matter of the video (two words)\n`

    + `Write the word SPLIT on this line. Answer the following questions\n`
    + `Write short summary of the video\n`
    + `Write the word GENERATIVE on this line\n`
    + `Write a new title you suggest for the video\n`
    + `Write the word GENERATIVE on this line\n`
    + `Write the topics covered that are required to understand the video\n`
    + `Write the word GENERATIVE on this line\n`
    + `Write a topic phrase in less than four words\n`;
const analyze_video = async (data: VideoData): Promise<GeminiAnalysis> => {
    const model = await make_model();
    model.systemInstruction = { role: "user", parts: [{text: MODEL_ROLE}]};
    const chat = model.startChat({history: [{role: "user", parts: [
        {text: `The following is the transcript of a YouTube video titled "${data.title}".`
        + `It was authored by ${data.author} and published on ${data.publish_date.toString()}.\n`
        + `Based on the viewer reception, it has ${data.view_count} views and ${data.likes} likes.`
        + `The top comments are: \n${data.top_comments.map(comment=>comment.username+": "+comment.text).join("\n")}\n`
        + `The following is the description of the video: ${data.description}`},
        {text: `Here are the captions for the video: ${data.captions.map(caption => caption.text).join("\n")}`} ]}]});
    const output = (await chat.sendMessage(ASK_FOR_OUTPUT)).response.text();
    console.log("Gemini's analysis:\n"+output);
    const areas = output.split("SPLIT").map(area=>area.split("\n").map(line=>line.trim()).filter(line=>line.length!=0));
    const sentences = output.split("SPLIT")[2].split("GENERATIVE").map(response=>response.trim()).filter(line=>line.length!=0);
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
            summary: sentences[0],
            suggested_title: sentences[1],
            topics_covered: sentences[2],
            topic_phrase: sentences[3],
        },
    };
}

export { make_model, analyze_video };
