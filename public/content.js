chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "disableWebcam") {
    stopWebcam();
  }
  if (request.action === "enableWebcam") {
    startWebcam();
  }
  if (request.action === "toggleWebcam") {
    if (document.querySelector(".webcam").style.display === "none") {
      startWebcam();
    } else {
      stopWebcam();
    }
  }
});

function startWebcam() {
  (function () {
    if (document.querySelector(".webcam")) {
      document.querySelector(".webcam").style.display = "block";
      return;
    }
    let videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.style.position = "fixed";
    videoElement.style.bottom = "50px";
    videoElement.style.right = "50px";
    videoElement.className = "webcam";
    videoElement.style.width = "200px";
    videoElement.style.height = "150px";
    videoElement.style.zIndex = "10000";
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      console.log("stream", stream);
      videoElement.srcObject = stream;
      document.body.appendChild(videoElement);
    });
  })();
  // Logic to start the webcam goes here
}

function stopWebcam() {
  // Logic to stop the webcam goes here
  document.querySelector(".webcam").style.display = "none";
}
let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam

startWebcam();
stopWebcam();
