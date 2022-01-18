document.getElementById("toast").addEventListener("change", displayToast);

function displayToast(event) {
  const toastDialog = document.createElement("div");
  toastDialog.textContent = event.target.checked ? "You checked the box!" :
    "You unchecked the box!";
  toastDialog.classList.add("toast");
  toastDialog.style.top = setPositioning();
  document.body.appendChild(toastDialog);
  setTimer(toastDialog);
}

function setPositioning() {
  let toasts = document.body.getElementsByClassName("toast");
  let lastToast = toasts[toasts.length - 1];
  if (lastToast) {
    let bottom = lastToast.getBoundingClientRect().bottom;
    return bottom + "px";
  }
  return 0;
}

function setTimer(node) {
  setTimeout(() => {
    document.body.removeChild(node);
  }, 3300);
}