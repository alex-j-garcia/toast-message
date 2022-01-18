document.getElementById("toast").addEventListener("change", displayToast);

function displayToast(event) {
  const toastDialog = document.createElement("div");
  toastDialog.textContent = event.target.checked ? "You checked the box!" :
    "You unchecked the box!";
  toastDialog.classList.add("toast");
  toastDialog.style.top = getPositioning() + "px";
  document.body.appendChild(toastDialog);
  setTimer(toastDialog);
}

function getPositioning() {
  let toasts = document.body.getElementsByClassName("toast");
  let lastToast = toasts[toasts.length - 1];
  return lastToast ? lastToast.getBoundingClientRect().bottom : 0;
}

function setTimer(node) {
  setTimeout(() => {
    document.body.removeChild(node);
  }, 3300);
}