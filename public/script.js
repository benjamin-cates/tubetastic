document.getElementById("applySettings").addEventListener("click", () => {
  // Fetch checkbox values
  const hideRecommendations = document.getElementById(
    "hide-recommendations"
  ).checked;
  const hideComments = document.getElementById("hide-comments").checked;

  // Store the settings in local storage
  chrome.storage.local.set(
    {
      hideRecommendations,
      hideComments,
    },
    () => {
      console.log("Settings saved.");
    }
  );
});
