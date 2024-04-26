let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    document.getElementById("startStop").innerText = "Stop";
    document.getElementById("pause").disabled = false;
    isRunning = true;
  } else {
    clearInterval(timer);
    document.getElementById("startStop").innerText = "Start";
    isRunning = false;
  }
}

function pause() {
  clearInterval(timer);
  document.getElementById("startStop").innerText = "Start";
  document.getElementById("pause").disabled = true;
  isRunning = false;
}

function restart() {
  clearInterval(timer);
  elapsedTime = 0;
  displayTime(elapsedTime);
  document.getElementById("startStop").innerText = "Start";
  document.getElementById("pause").disabled = false;
  isRunning = false;
  document.getElementById("laps").innerHTML = "";
}

function lapReset() {
  if (isRunning) {
    const lapTime = Date.now() - startTime;
    const lapsContainer = document.getElementById("laps");
    const lap = document.createElement("div");
    lap.innerText = lapsContainer.children.length + 1 + ". " + formatTime(Math.floor(lapTime / 1000)) + ":" + formatTime(Math.floor((lapTime % 1000) / 10));
    lapsContainer.appendChild(lap);
  } else {
    clearInterval(timer);
    elapsedTime = 0;
    displayTime(elapsedTime);
    document.getElementById("laps").innerHTML = "";
  }
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  displayTime(elapsedTime);
}

function displayTime(time) {
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time % 1000) / 10);
  document.getElementById("display").innerText = 
    formatTime(minutes) + ":" + formatTime(seconds) + ":" + formatTime(milliseconds);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}
