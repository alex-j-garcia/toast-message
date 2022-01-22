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

function getNewPosition(node) {
  let prevSibling = node.previousElementSibling;
  if (prevSibling.nodeName != "SCRIPT") {
    node.style.top = prevSibling.getBoundingClientRect().bottom + "px";
  } else {
    node.style.top = 0;
  }
}

// This function should use forEach to iterate over all the toasts
// on the board and assign their new positions.

// check/uncheck checkbox --> toast is added to the document.
// it could be the only toast, in which case it won't return anything.
// its position should be assigned to the next toast and every subsequent
// toast should have its position assigned to that of the element before it.
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