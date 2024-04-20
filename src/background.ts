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

        button.addEventListener("click", function (e) {
          alert("Clickbait detection for: " + titleElement.textContent!.trim());
          e.stopPropagation();
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
