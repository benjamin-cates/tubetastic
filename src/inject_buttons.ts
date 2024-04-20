import { get_captions } from "./captions";
import { get_comments } from "./comments";
import { analyze_video } from "./gemini";
import { getThumbnailUrl } from "./thumbnails";
import VideoData from "./video_data";

function injectButtons() {
  const videoContainers = document.querySelectorAll("#details");

  videoContainers.forEach((container) => {
    if (!container.querySelector(".clickbait-detector-button")) {
      const titleElement = container.querySelector("#video-title");

      if (titleElement) {
        const button = document.createElement("button");
        button.innerText = "Detect Clickbait";
        button.classList.add("clickbait-detector-button");
        button.style.marginLeft = "5px";
        button.style.padding = "5px";
        button.style.border = "none";
        // dark background and light text
        button.style.background = "#121a1f";
        button.style.color = "#FFFFFF";
        button.style.cursor = "pointer";
        button.style.fontSize = "1.2rem";
        button.style.fontWeight = "bold";
        button.style.borderRadius = "8px";
        titleElement.parentNode!.insertBefore(button, titleElement.nextSibling);

        button.addEventListener("click", (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          const video_id = ((e.target as HTMLElement).parentNode as HTMLAnchorElement).href.replace("https://www.youtube.com/watch?v=","");
          const title = (e.target as HTMLElement).parentNode!.children[0].innerHTML;
          const metadata = (e.target as HTMLElement).parentNode!.parentNode!.parentNode!.children[1].children[0];
          const author = metadata.children[0].children[0].children[0].children[0].children[0].children[0].textContent!;
          const popup = document.createElement("div");
          popup.classList.add("yt_analyzer_popup");
          popup.style.left = e.pageX+"px";
          popup.style.top = e.pageY+"px";
          popup.style.background = "#222222";
          popup.style.color = "#FFFFFF";
          popup.style.fontSize = "1.8rem";
          popup.style.zIndex = "4000";
          popup.textContent = "Getting captions for "+video_id;
          document.body.appendChild(popup);
          get_captions(video_id).then(async captions => {
            popup.textContent = "Analyzing captions for " + video_id;
            if(captions.length > 0) {
              popup.textContent += ". Starts with: \"" + captions[0].text + "\"";
              // Continue with analysis
            }
            else {
              popup.textContent += ". No captions found";
              // Do analysis without captions
            }
            const video_data: VideoData = {
              thumbnail: await getThumbnailUrl(video_id,0),
              captions: captions,
              title: title,
              author: author,
              view_count: Number(metadata.children[1].children[2].textContent!.split(" view")[0].replace("K","000").replace(","," ").replace("M","000000").replace("B","000000000")),
              top_comments: await get_comments(video_id),
              publish_date: new Date(),
              likes: 0,
              description: "",
            };
            console.log(video_data);
            popup.textContent = JSON.stringify(await analyze_video(video_data));
          })
        });
      }
    }
  });
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      injectButtons();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

injectButtons();
