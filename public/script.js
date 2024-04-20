

function loadSettings() {
  chrome.storage.local.get(
    ["hideRecommendations", "hideComments"],
    function (result) {
      document.getElementById("hide-recommendations").checked =
        !!result.hideRecommendations;
      document.getElementById("hide-comments").checked = !!result.hideComments;
    }
  );
}

// Function to save the current settings to local storage
function saveSettings() {
  const hideRecommendations = document.getElementById(
    "hide-recommendations"
  ).checked;
  const hideComments = document.getElementById("hide-comments").checked;

  chrome.storage.local.set({
    hideRecommendations: hideRecommendations,
    hideComments: hideComments,
  });
}

// Event listeners for changes in the checkboxes
document
  .getElementById("hide-recommendations")
  .addEventListener("change", saveSettings);
document
  .getElementById("hide-comments")
  .addEventListener("change", saveSettings);

// Load settings when the script is loaded
loadSettings();
