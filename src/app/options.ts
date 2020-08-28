let page = document.getElementById("buttonDiv");
const kButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

function constructOptions(kButtonColors) {
  kButtonColors.forEach((buttonColor) => {
    let button = document.createElement("button");
    button.style.backgroundColor = buttonColor;
    button.addEventListener("click", () => {
      chrome.storage.sync.set({ color: buttonColor }, () => {
        console.log(`color is ${buttonColor}`);
      });
    });
    page.appendChild(button);
  });
}

constructOptions(kButtonColors);
