import { Caption } from "./captions"
interface Comment {
    text: string
    username: string
}

interface VideoData {
    // Metadata
    title: string
    description: string
    author: string
    publish_date: Date
    thumbnail: string

    // Video content
    captions: Caption[]

    // Viewer responses
    top_comments: Comment[]
    likes: number
    view_count: number
}

export default VideoData;


