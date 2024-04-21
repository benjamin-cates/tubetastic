// Function to hide elements based on settings
function applyUserSettings() {
  chrome.storage.local.get(
    [
      "hideRecommendations",
      "hideComments",
      "hideHomeFeed",
      "hideShorts",
      "hideNotifications",
      "stopAutoplay",
    ],
    function (result) {
      // Hide or show recommendations based on the stored setting
      const recommendations = document.querySelectorAll(
        "#items.ytd-watch-next-secondary-results-renderer"
      );
      Array.from(recommendations).forEach((el) => {
        (el as HTMLElement).style.display = result.hideRecommendations
          ? "none"
          : "block";
      });
      const comments = document.querySelectorAll("#comments");
      Array.from(comments).forEach((el) => {
        (el as HTMLElement).style.display = result.hideComments
          ? "none"
          : "block";
      });
      const home_feed = document.querySelectorAll("#contents.ytd-rich-grid-renderer");
      Array.from(home_feed).forEach((el) => {
        (el as HTMLElement).style.display = result.hideHomeFeed
          ? "none"
          : "block";
      });
      const shorts = document.querySelectorAll("[is-shorts]");
      Array.from(shorts).forEach((el) => {
        (el as HTMLElement).style.display = result.hideShorts
          ? "none"
          : "block";
      });
      const notifications = document.querySelectorAll(
        "#notification-preference"
      );
      Array.from(notifications).forEach((el) => {
        (el as HTMLElement).style.display = result.hideNotifications
          ? "none"
          : "block";
      });
      const autoplay = document.querySelectorAll("#autoplay-checkbox");
      Array.from(autoplay).forEach((el) => {
        (el as HTMLElement).style.display = result.stopAutoplay
          ? "none"
          : "block";
      });
    }
  );
}

// </div>
window.addEventListener("load", applyUserSettings);

// Listen for changes in the storage and apply the user settings if there's a change
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (
      (key === "hideRecommendations" ||
        key === "hideComments" ||
        key === "hideHomeFeed" ||
        key === "hideShorts" ||
        key === "hideNotifications" ||
        key === "stopAutoplay") &&
      oldValue !== newValue
    ) {
      applyUserSettings();
    }
  }
});

applyUserSettings();
