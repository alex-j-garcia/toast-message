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
  toastDialog.style.top = getPosition() + "px";
  document.body.appendChild(toastDialog);
  setTimers(toastDialog.lastElementChild);
}

function getPosition() {
  let toasts = document.body.getElementsByClassName("toast");
  let lastToast = toasts[toasts.length - 1];
  return lastToast ? lastToast.getBoundingClientRect().bottom : 0;
}

// function parseWidth({width}) {
//   width = Number(width.slice(0, -2));
//   if (width < 0) {
//     console.log("It's a decimal");
//   } else {
//     return width;
//   }
// }

function setTimers(progressBar) {
  let currentWidth = getComputedStyle(progressBar).width;
  let intervalID = setInterval(() => {
    let widthNum = currentWidth.slice(0, -2);
    console.time();
    if (widthNum < 1.67) {
      console.timeEnd();
      clearInterval(intervalID);
      document.body.removeChild(progressBar.offsetParent);
    } else {
      currentWidth = progressBar.style.width = (widthNum - 1.67) + "px";
    }
  }, 25);
}