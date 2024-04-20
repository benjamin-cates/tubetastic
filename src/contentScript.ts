// Function to hide elements based on settings
function applyUserSettings() {
  chrome.storage.local.get(
    ["hideRecommendations", "hideComments"],
    function (result) {
      // Hide or show recommendations based on the stored setting
      const recommendations = document.querySelectorAll(
        "#items.ytd-watch-next-secondary-results-renderer"
      );
      recommendations.forEach((el) => {
        (el as HTMLElement).style.display = result.hideRecommendations ? "none" : "block";
      });

      // Hide or show comments based on the stored setting
      const comments = document.querySelector("#comments");
      if (comments) {
        (comments as HTMLElement).style.display = result.hideComments ? "none" : "block";
      }
    }
  );
}

window.addEventListener("load", applyUserSettings);

// Listen for changes in the storage and apply the user settings if there's a change
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (
      (key === "hideRecommendations" || key === "hideComments") &&
      oldValue !== newValue
    ) {
      applyUserSettings();
    }
  }
});

// Initialize the settings on load
applyUserSettings();
