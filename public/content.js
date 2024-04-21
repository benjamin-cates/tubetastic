chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "disableWebcam") {
    stopWebcam();
  }
});

function startWebcam() {
  (function () {
    let videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.style.position = "fixed";
    videoElement.style.bottom = "50px";
    videoElement.style.right = "50px";
    videoElement.style.zIndex = "10000";
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("stream", stream);
        videoElement.srcObject = stream;
        document.body.appendChild(videoElement);
        initWebcamAndModel().then(() => {
        });
      })
      .catch((error) => {
        console.error("Error accessing the webcam: ", error);
      });
  })();
  // Logic to start the webcam goes here
}

function stopWebcam() {
  // Logic to stop the webcam goes here
  document.querySelector("webcam-container").style.display = "none";
}
let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam

startWebcam();
