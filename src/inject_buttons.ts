import { get_captions } from "./captions";

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
        titleElement.parentNode!.insertBefore(button, titleElement.nextSibling);

        button.addEventListener("click", function (e: MouseEvent) {
          e.preventDefault();
          e.stopPropagation();
          const video_id = ((e.target as HTMLElement).parentNode as HTMLAnchorElement).href.replace("https://www.youtube.com/watch?v=","");
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
          get_captions(video_id).then(captions => {
            popup.textContent = "Analyzing captions for " + video_id;
            if(captions.length > 0) {
              popup.textContent += ". Starts with: \"" + captions[0].text + "\"";
              // Continue with analysis
            }
            else {
              popup.textContent += ". No captions found";
              // Do analysis without captions
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
