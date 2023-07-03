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
      backgroundColor: "red",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      color: "white",
      fontWeight: "bold",
    },
    text: "Close",
  }).click(() => {
    closeTrade();
  });

  const $buyButton = $("<button>", {
    css: {
      width: "80px",
      height: "30px",
      backgroundColor: "blue",
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
      backgroundColor: "green",
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
  if (e.altKey && e.key === "c") {
    closeTrade();
  }
  if (e.altKey && e.key === "b") {
    buy();
  }
  if (e.altKey && e.key === "s") {
    sell();
  }
});

//function get stamp
function getStamp() {
  let stamp = "BYBIT:BTCUSDT";
  document.querySelectorAll("script").forEach((e) => {
    const text = e.innerText;
    const m = text.match(/(?<=initdata.defsymbol = ").*(?=")/gi);
    if (m) {
      stamp = m[0];
    }
  });
  if (stamp) return stamp;
  const mainTitle = document.querySelector('[class*="mainTitle"]')?.textContent;
  const exchangeTitle = document.querySelector(
    '[class*="exchangeTitle"]'
  )?.textContent;
  return `${exchangeTitle || "BYBIT"}:${mainTitle || "BTCUSDT"}`;
}

async function getTrades() {
  const res = await fetch(
    "https://papertrading.tradingview.com/trading/get_trades/",
    {
      body: JSON.stringify({ symbol: getStamp() }),
      method: "POST",
      credentials: "include",
    }
  );
  const trades = await res.json();
  let buy = 0;
  let sell = 0;
  trades.forEach((e: any) => {
    if (e.side === "buy") buy += e.qty;
    if (e.side === "sell") sell += e.qty;
  });
  console.log(buy, sell);
  return { buy, sell };
}

async function closeTrade() {
  const body = {
    symbol: "BITSTAMP:BTCUSDT",
    side: "buy",
    type: "market",
    qty: 2,
  };
  const stamp = getStamp();
  if (stamp) {
    body.symbol = stamp;
  }
  const trades = await getTrades();
  if (trades.buy > trades.sell) {
    body.side = "sell";
    body.qty = trades.buy - trades.sell;
  } else {
    body.qty = trades.sell - trades.buy;
    body.side = "buy";
  }
  console.log(body);
  fetch("https://papertrading.tradingview.com/trading/place/", {
    body: JSON.stringify(body),
    method: "POST",
    credentials: "include",
  });
}
