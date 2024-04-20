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
      updateLockedIn();
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

  updateLockedIn();
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

document.getElementById("locked-in").addEventListener("change", function () {
  const lockedIn = this.checked;
  const checkboxes = document.querySelectorAll(
    '.setting input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.checked = lockedIn;
  });
  saveSettings();

  if (lockedIn) {
    // Perform the dramatic display
    const display = document.getElementById("locked-in-display");
    display.style.display = "block";
    display.textContent = "LOCKED IN";

    // Start the animation, then hide after a few seconds
    setTimeout(() => {
      display.style.display = "none";
    }, 2000); // Adjust time as needed
  }

  // Trigger the save settings function or logic here if needed
});

function updateLockedIn() {
  const checkboxes = document.querySelectorAll(
    '.setting input[type="checkbox"]'
  );
  const lockedInCheckbox = document.getElementById("locked-in");
  let allChecked = true;

  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      allChecked = false;
      return;
    }
  });

  lockedInCheckbox.checked = allChecked;
}
