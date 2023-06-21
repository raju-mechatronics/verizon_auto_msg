// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "../global.css";

console.log("content");
// contentScript.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "init") {
        console.log("first");
        // document.body.innerHTML += `<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">`;
        // Access the DOM and send it back to the popup
        sendResponse("hello world!");
    }

    if (request.action === "sending") {
        Toastify({
            text: "Message is sending...",
            className: "bg-info",
            position: "left",
        }).showToast();
        sendResponse("modified!");
    }
    if (request.action === "sent") {
        Toastify({
            text: "Message sent!",
            className: "bg-accent",
            position: "left",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
        sendResponse("modified!");
    }
    if (request.action === "failed") {
        Toastify({
            text: "Message send failed!",
            className: "bg-error",
            position: "left",
            style: {
                background: "linear-gradient(to right, tomato, crimson)",
            },
        }).showToast();
        sendResponse("modified!");
    }
});
