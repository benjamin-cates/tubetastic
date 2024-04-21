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
}

// This function will be called whenever the checkbox is toggled
function toggleFaceCam(isChecked) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id;
    if (isChecked) {
      // If the checkbox is checked, inject the content script
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ["public/content.js"], // Make sure the path is correct
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(
              `Error injecting script: ${chrome.runtime.lastError.message}`
            );
          }
        }
      );
    } else {
a      chrome.tabs.sendMessage(tabId, { action: "disableWebcam" });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("face-cam").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleWebcam" });
    });
  });
});
