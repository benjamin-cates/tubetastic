import { get_comments } from "./comments";
import { analyze_video } from "./gemini";
import { getThumbnailUrl } from "./thumbnails";
import VideoData from "./video_data";
import { worker_comms } from "./worker_comms";

function injectButtons() {
  const videoContainers = document.querySelectorAll("#details, .details, div#meta");

  videoContainers.forEach((container) => {
    if (!container.querySelector(".analyze-video-button")) {
      let titleElement = container.querySelector("a#video-title-link, #video-title");
      if(!titleElement) return;
      if((container.parentNode!.parentNode! as HTMLElement).hasAttribute("is-short")) {
        return;
      }
      if((container.parentNode!.parentNode! as HTMLElement).nodeName.toLowerCase()=="ytd-reel-item-renderer") {
        return;
      }
      if (titleElement) {
        const button = document.createElement("button");
        button.innerText = "Analyze Video";
        button.classList.add("analyze-video-button");
        button.style.marginRight = "3px";
        button.style.padding = "8.9673px";
        button.style.border = "none";
        // dark background and light text
        button.style.background = "#295fc0";
        button.style.color = "#FFFFFF";
        button.style.cursor = "pointer";
        button.style.fontSize = "1.2rem";
        button.style.fontWeight = "bold";
        button.style.borderRadius = "8px";
        titleElement.parentNode!.insertBefore(button, titleElement.nextSibling);

        button.addEventListener("click", (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          let anchor = ((e.target as HTMLElement).parentNode!.querySelector("a")) as HTMLAnchorElement;
          if(!anchor) anchor = (e.target as HTMLElement).parentNode!.parentNode! as HTMLAnchorElement;
          const video_id = anchor.href.replace("https://www.youtube.com/watch?v=","");
          const title = titleElement!.parentElement!.querySelector("yt-formatted-string, span")!.textContent!;
          const author = container.querySelector("#channel-name")!.textContent!;
          const popup = document.createElement("div");
          const popup_message = document.createElement("div");
          const rem_size = parseFloat(getComputedStyle(document.documentElement).fontSize);
          popup.classList.add("yt_analyzer_popup");
          if(40*rem_size + e.pageX > window.innerWidth) {
            popup.style.right = (window.innerWidth - e.pageX) + "px";
          }
          else {
            popup.style.left = e.pageX + "px";
          }
          popup.style.top = Math.max(Math.min(e.pageY-20*rem_size,(window.innerHeight+window.scrollY)-40*rem_size),window.scrollY) + "px";
          popup.style.background = "#222222";
          popup.style.color = "#FFFFFF";
          popup.style.fontSize = "1.8rem";
          popup.style.zIndex = "4000";
          popup_message.textContent = title+"\nReading video metadata";
          const close_button = document.createElement("button");
          close_button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
          close_button.classList.add("popup_close");
          close_button.style.background = "#333333";
          close_button.style.borderRadius = "0.5rem";
          close_button.style.marginBottom = "0.3rem";
          close_button.style.border = "none";
          close_button.addEventListener("click", _ => {
            popup.remove();
          });
          popup.appendChild(close_button);
          const loading_circle = document.createElement("div");
          loading_circle.classList.add("lds-dual-ring");
          popup.appendChild(loading_circle);
          popup.appendChild(popup_message);
          document.body.appendChild(popup);
          worker_comms(video_id).then(async data_response => {
            try {
              if(data_response.captions.length > 0) {
                popup_message.textContent = title+"\nTranscript found. \nAnaylzing...";
              }
              else {
                popup_message.textContent = title+"\nTranscript not found. \nAnalyzing description...";
              }
              const video_data: VideoData = {
                thumbnail: await getThumbnailUrl(video_id,0),
                captions: data_response.captions,
                title: title,
                author: author,
                view_count: Number(container.querySelector("#metadata-line")!.children[2].textContent!.split(" view")[0].replace("K","000").replace(","," ").replace("M","000000").replace("B","000000000")),
                top_comments: await get_comments(video_id),
                publish_date: new Date(),
                likes: data_response.likes,
                description: data_response.description,
              };
              console.log(video_data);
              const analysis = await analyze_video(video_data);
              loading_circle.remove();
              const out = document.createElement("div");
              out.classList.add("analysis");
              // Numerics data
              for(let index in analysis.numerics) {
                const item = document.createElement("div");
                item.classList.add("numerics_item");
                const bar = document.createElement("div");
                const bar_inner = document.createElement("div");
                bar_inner.classList.add("numerics_bar_inner");
                bar_inner.style.width = ((analysis.numerics as any)[index] * 20).toString() + "%";
                bar_inner.innerText = index[0].toUpperCase() + index.substring(1);
                bar.appendChild(bar_inner);
                const bar_num = document.createElement("span");
                bar_num.classList.add("numerics_bar_number");
                bar_num.innerText = (analysis.numerics as any)[index];
                bar.classList.add("numerics_bar");
                bar.appendChild(bar_num);
                item.appendChild(bar);
                out.appendChild(item);
              }
              let text_items = [
                ["Suggested title",analysis.sentences.suggested_title],
                ["Summary",analysis.sentences.summary],
                ["Style",analysis.categories.style],
                ["Topics covered", analysis.sentences.topics_covered],
                ["Topic phrase",analysis.sentences.topic_phrase],
                ["Subject", analysis.categories.subject_matter]
              ];
              for(let item of text_items) {
                const el = document.createElement("div");
                el.classList.add("sentences_container");
                const label = document.createElement("span");
                label.innerText = item[0] + ": ";
                label.classList.add("sentences_label");
                const text = document.createElement("span");
                text.innerText = item[1];
                text.classList.add("sentences_content");
                el.appendChild(label);
                el.appendChild(text);
                out.appendChild(el);
              }
              popup_message.textContent = title;
              popup.appendChild(out);
            }
            catch(e) {
              popup_message.textContent = "Error: " + e;
            }
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
