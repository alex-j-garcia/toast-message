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
  toastDialog.style.top = getPositioning() + "px";
  document.body.appendChild(toastDialog);
  setTimers(toastDialog);
}

function getPositioning() {
  let toasts = document.body.getElementsByClassName("toast");
  let lastToast = toasts[toasts.length - 1];
  return lastToast ? lastToast.getBoundingClientRect().bottom : 0;
}

function setTimers(node) {
  let footer = node.lastElementChild;
  let ms = 25;
  let intervalID = setInterval(() => {
    let width = footer.style.width.slice(0, -1);
    if (Number(width) >= 100) {
      clearInterval(intervalID);
      document.body.removeChild(node);
    } else {
      footer.style.width = ms * 100 / 3000 + "%";
      ms += 25;
    }
  }, 25);
}