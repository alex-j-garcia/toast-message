document.getElementById("toast").addEventListener("change", displayToast);

function displayToast(event) {
  let {checked} = event.target;
  let toastDialog = document.createElement("div");
  toastDialog.innerHTML = `
    <div class="header">☑️</div>
    <p>${checked ? "You checked the box" : "You unchecked the box"}</p>
    <div class="footer"></div>
  `;
  if (!checked) toastDialog.setAttribute("data-uncheck", "true");
  toastDialog.classList.add("toast");
  toastDialog.style.top = getInitialPosition();
  document.body.appendChild(toastDialog);
  setTimers(toastDialog.lastElementChild);
}

function getInitialPosition() {
  let toasts = document.body.getElementsByClassName("toast");
  let lastToast = toasts[toasts.length - 1];
  return lastToast ? lastToast.getBoundingClientRect().bottom + "px" : 0;
}

function getNewPosition(node) {
  let prevSibling = node.previousElementSibling;
  if (prevSibling.nodeName != "SCRIPT") {
    node.style.top = prevSibling.getBoundingClientRect().bottom + "px";
  } else {
    node.style.top = 0;
  }
}

function setTimers(progressBar) {
  let currentWidth = getComputedStyle(progressBar).width;
  let intervalID = setInterval(() => {
    let widthNum = currentWidth.slice(0, -2);
    if (widthNum < 1.67) {
      clearInterval(intervalID);
      document.body.removeChild(progressBar.offsetParent);
    } else {
      getNewPosition(progressBar.offsetParent);
      currentWidth = progressBar.style.width = (widthNum - 1.67) + "px";
    }
  }, 25);
}