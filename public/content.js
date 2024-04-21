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
          loop();
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
async function initWebcamAndModel() {
  const URL = "https://teachablemachine.withgoogle.com/models/kyDscBDaI/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();

  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }

  // Start the prediction loop
  window.requestAnimationFrame(loop);
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleWebcam") {
    // Check if the webcam is already inject

    const labelContainer = document.createElement("div");
    labelContainer.style.position = "fixed";
    labelContainer.style.bottom = "50px";
    labelContainer.style.right = "50px";
    labelContainer.style.zIndex = "10011";
    labelContainer.style.fontSize = "36px";
    labelContainer.style.height = "200px";
    labelContainer.style.width = "200px";
    labelContainer.style.display = "block";
    labelContainer.id = "label-container";
    document.body.appendChild(labelContainer);
    // Initialize the webcam and model here (similar to the initWebcamAndModel function)
    initWebcamAndModel();
  } else {
    // Toggle the webcam visibility or remove it
    const webcamContainer = document.getElementById("webcam-container");
    webcamContainer.style.display =
      webcamContainer.style.display === "none" ? "block" : "none";
    const labelContainer = document.getElementById("label-container");
    labelContainer.style.display =
      labelContainer.style.display === "none" ? "block" : "none";
  }
});

async function initWebcamAndModel() {
  const URL = "https://teachablemachine.withgoogle.com/models/kyDscBDaI/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  console.log("modelURL", modelURL);
  console.log("metadataURL", metadataURL);
console.log("tmImage", tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  console.log("model", model);
  maxPredictions = model.getTotalClasses();
    console.log("maxPredictions", maxPredictions);
  webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
  console.log("webcam", webcam);
  await webcam.setup(); // request access to the webcam
  await webcam.play();

  document.getElementById("webcam-container").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    console.log("maxPredictions", maxPredictions);
    labelContainer.appendChild(document.createElement("div"));
  }

  // Start the prediction loop
  window.requestAnimationFrame(loop);
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  // Predict the current frame.
  const prediction = await model.predict(webcam.canvas);
  console.log(prediction);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].textContent = classPrediction;
  }
}

// Add event listeners when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initWebcamAndModel);

startWebcam();
loop();
