// Function to hide elements based on settings
function applyUserSettings() {
  chrome.storage.local.get(
    ["hideRecommendations", "hideComments"],
    function (result) {
      if (result.hideRecommendations) {
        const recommendations = document.querySelectorAll(
          "ytd-watch-next-secondary-results-renderer"
        );
        recommendations.forEach(
          (el) => ((el as HTMLElement).style.display = "none")
        );
      }
      if (result.hideComments) {
        const comments = document.querySelector("#comments");
        if (comments) (comments as HTMLElement).style.display = "none";
      }
    }
  );
}

// Run the function after the page has loaded
window.addEventListener("load", applyUserSettings);
