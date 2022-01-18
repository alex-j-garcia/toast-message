document.getElementById("toast").addEventListener("change", displayToast);

function displayToast(event) {
  const toastDialog = document.createElement("div");
  toastDialog.innerText = event.target.checked ? "You checked the box!" :
    "You unchecked the box!";
  toastDialog.classList.add("toast");
  document.body.appendChild(toastDialog);
  setTimer(toastDialog);
}

function setTimer(node) {
  setTimeout(() => {
    document.body.removeChild(node);
  }, 1300);
}