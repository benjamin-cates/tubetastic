import { analyze_video } from "./gemini";
import { getThumbnailUrl } from "./thumbnails";
import { get_description_api } from "./description_api";
import { getDescriptions, getViewsAndPublishedDate } from "./description";

const generate_test = async () => {
  console.log("Testing generate ");
  analyze_video({
    description:
      "This is a silly video, completely humorous. Anyway, make sure to like and subscribe",
    top_comments: [
      {
        text: "This video sucks, he doesn't know what he's talking about",
        username: "expert",
      },
    ],
    likes: 1000,
    view_count: 5000,
    publish_date: new Date(),
    author: "stupid guy 3",
    title: "Why you should not but grape nuts",
    captions: [
      {
        text: "Hello! Today I will be going over why you should not buy grape nuts. First of all, grape nuts are super unhealthy because they have preservatives. Second, Grape Nuts are extremely bad for you because they change your digestive health with their very low levels of fiber. Finally, I don't think grape nuts taste that good",
        dur: 100,
        start: 0,
      },
    ],
    thumbnail: "imadje",
  }).then(console.log);
  // const model = make_model();
  // model.systemInstruction = { role: "admin", parts: [{text: MODEL_ROLE}]};
  // const out = await model.generateContent("Heyo can you give me a random word");
  // console.log(out.response.text());
};

const get_thumbnail = async () => {
  const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const thumbnailUrl = await getThumbnailUrl(videoUrl, 0);
  console.log(thumbnailUrl);
};
get_thumbnail();

//get_description_api("jF5QiD7uxdc");

const observer = new MutationObserver(() => {
    const { views, published_date } = getViewsAndPublishedDate();
    const description = getDescriptions();

    const data = { views, published_date, description };

    let hasChanged = false;
    Object.entries(data).forEach(([key, value]) => {
        const localValue = localStorage.getItem(key);
        // skip null or undefined values
        if (value == null) return;

        if (localValue !== value) {
            localStorage.setItem(key, value);
            console.log(`Updated ${key} to: `, value);
            hasChanged = true;
        }
    });

    if (!hasChanged) {
        console.log('No changes detected');
    }
});

observer.observe(document, { childList: true, subtree: true });
