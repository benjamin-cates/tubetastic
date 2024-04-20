import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import API_KEY from "./api_key";

const make_model = (): GenerativeModel => {
    return new GoogleGenerativeAI(API_KEY).getGenerativeModel({model: "gemini-1.5-pro-latest"});
}

export default make_model;
