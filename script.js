document.getElementById("toast").addEventListener("change", createToast);

function createToast(event) {
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
  setTimers(toastDialog);
}

function getInitialPosition() {
  let toasts = document.body.getElementsByClassName("toast");
  let lastToast = toasts[toasts.length - 1];
  return lastToast ? lastToast.getBoundingClientRect().bottom + "px" : 0;
}

function calculatePositions() {
  let toasts = Array.from(document.body.getElementsByClassName("toast"));
  let top;
  toasts.forEach((toast, index) => { // [0, 60, 120]
    let currentTop = getComputedStyle(toast).top;
    if (index != 0) toast.style.top = top;
    top = currentTop;
  });
}

function setTimers(node) {
  let progressBar = node.lastElementChild;
  let currentWidth = getComputedStyle(progressBar).width;
  let intervalID = setInterval(() => {
    let widthNum = currentWidth.slice(0, -2);
    if (widthNum < 1.67) {
      clearInterval(intervalID);
      calculatePositions();
      document.body.removeChild(node);
    } else {
      currentWidth = progressBar.style.width = (widthNum - 1.67) + "px";
    }
  }, 25);
}