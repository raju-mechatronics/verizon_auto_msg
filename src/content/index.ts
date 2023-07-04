import $ from "jquery";

function buy() {
  $("[class*=buyButton]").click();
}

function sell() {
  $("[class*=sellButton]").click();
}

// Inject a div with three buttons: close, buy, sell
function injectDiv() {
  const $div = $("<div>", {
    id: "myDiv",
    css: {
      position: "fixed",
      bottom: "50px",
      right: "50px",
      width: "300px",
      height: "fit-content",
      backgroundColor: "#A9A9A9",
      zIndex: "9999",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      paddingTop: "30px",
    },
  });

  const $dragDiv = $("<div>", {
    css: {
      width: "280px",
      height: "20px",
      position: "absolute",
      top: "0",
      left: "0",
      cursor: "move",
    },
  });

  const $crossBtn = $("<button>", {
    id: "closeBtn",
    css: {
      position: "absolute",
      top: "-5px",
      right: "-5px",
      width: "25px",
      height: "25px",
      backgroundColor: "magenta",
      border: "2px solid red",
      borderRadius: "50%",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    text: "X",
  }).click(() => {
    $div.remove();
  });

  const $closeButton = $("<button>", {
    css: {
      width: "80px",
      height: "30px",
      backgroundColor: "orange",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      color: "white",
      fontWeight: "bold",
    },
    text: "Close",
  }).click(() => {
    close();
  });

  const $buyButton = $("<button>", {
    css: {
      width: "80px",
      height: "30px",
      backgroundColor: "green",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      color: "white",
      fontWeight: "bold",
    },
    text: "Buy",
  }).click(() => {
    buy();
  });

  const $sellButton = $("<button>", {
    css: {
      width: "80px",
      height: "30px",
      backgroundColor: "red",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      color: "white",
      fontWeight: "bold",
    },
    text: "Sell",
  }).click(() => {
    sell();
  });

  $div
    .append($crossBtn)
    .append($dragDiv)
    .append($closeButton)
    .append($buyButton)
    .append($sellButton)
    .appendTo("body");

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  $dragDiv.mousedown((event) => {
    isDragging = true;
    offsetX = event.offsetX;
    offsetY = event.offsetY;
  });

  $dragDiv.mouseup(() => {
    isDragging = false;
  });

  $dragDiv.mousemove((event) => {
    if (isDragging) {
      const left = event.clientX - offsetX;
      const top = event.clientY - offsetY;
      $div.css({
        left: left + "px",
        top: top + "px",
      });
    }
  });
}

injectDiv();

$("body").keydown((e) => {
  if (e.altKey && e.key === "x") {
    close();
  }
  if (e.altKey && e.key === "b") {
    buy();
  }
  if (e.altKey && e.key === "s") {
    sell();
  }
});

function openPanel() {
  const btn = document.querySelector(
    '#footer-chart-panel [title="Connected"]'
  )?.parentElement;
  if (btn) {
    const isActive = btn.dataset.active;
    if (isActive === "false") {
      btn.click();
    } else {
      console.log("panel already open");
      return;
    }
  }
}

function closePanel() {
  const btn = document.querySelector(
    '#footer-chart-panel [title="Connected"]'
  )?.parentElement;
  if (btn) {
    const isActive = btn.dataset.active;
    if (isActive === "true") {
      btn.click();
    } else {
      console.log("panel already closed");
      return;
    }
  }
}

function getCloseBtn() {
  return document.querySelector(
    '#bottom-area table > tbody > tr [d="M13.35 5.35a.5.5 0 0 0-.7-.7L9 8.29 5.35 4.65a.5.5 0 1 0-.7.7L8.29 9l-3.64 3.65a.5.5 0 0 0 .7.7L9 9.71l3.65 3.64a.5.5 0 0 0 .7-.7L9.71 9l3.64-3.65z"]'
  )?.parentElement?.parentElement?.parentElement;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function close() {
  openPanel();
  let i = 0;
  while (!getCloseBtn()) {
    await wait(100);
    i++;
    if (i > 20) break;
  }
  getCloseBtn()?.click();
  closePanel();
}
