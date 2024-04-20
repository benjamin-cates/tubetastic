(function () {
  let videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.style.position = "fixed";
  videoElement.style.bottom = "10px";
  videoElement.style.right = "10px";
  videoElement.style.zIndex = "10000";
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      videoElement.srcObject = stream;
      document.body.appendChild(videoElement);
    })
    .catch((error) => {
      console.error("Error accessing the webcam: ", error);
    });
})();
