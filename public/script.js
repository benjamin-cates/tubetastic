function loadSettings() {
  chrome.storage.local.get(
    ["hideRecommendations", "hideComments"],
    function (result) {
      document.getElementById("hide-recommendations").checked =
        result.hideRecommendations;
      document.getElementById("hide-comments").checked = result.hideComments;
      document.getElementById("hide-home-feed").checked = result.hideComments;
      document.getElementById("hide-shorts").checked = result.hideComments;
      document.getElementById("hide-notifications").checked =
        result.hideComments;
      document.getElementById("stop-autoplay").checked = result.hideComments;
    }
  );
}

// Function to save the current settings to local storage
function saveSettings() {
  const hideRecommendations = document.getElementById(
    "hide-recommendations"
  ).checked;
  const hideComments = document.getElementById("hide-comments").checked;
  const hideHomeFeed = document.getElementById("hide-home-feed").checked;
  const hideShorts = document.getElementById("hide-shorts").checked;
  const hideNotifications =
    document.getElementById("hide-notifications").checked;
  const stopAutoplay = document.getElementById("stop-autoplay").checked;

  chrome.storage.local.set({
    hideRecommendations: hideRecommendations,
    hideComments: hideComments,
    hideHomeFeed: hideHomeFeed,
    hideShorts: hideShorts,
    hideNotifications: hideNotifications,
    stopAutoplay: stopAutoplay,
  });
}

// Event listeners for changes in the checkboxes
document
  .getElementById("hide-recommendations")
  .addEventListener("change", saveSettings);
document
  .getElementById("hide-comments")
  .addEventListener("change", saveSettings);
document
  .getElementById("hide-home-feed")
  .addEventListener("change", saveSettings);
document.getElementById("hide-shorts").addEventListener("change", saveSettings);
document
  .getElementById("hide-notifications")
  .addEventListener("change", saveSettings);
document
  .getElementById("stop-autoplay")
  .addEventListener("change", saveSettings);
// Load settings when the script is loaded
loadSettings();
