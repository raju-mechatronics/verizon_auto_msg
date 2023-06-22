import {
  addToFailed,
  addToSent,
  getFirstSetFromQueue,
  getRunningState,
  setRunningState,
} from "../common/storage";

import { wait, waitForElement, waitForValue } from "./services";

function getMessageField() {
  return document.querySelector(".message") as HTMLInputElement;
}

function getNumberField() {
  return document.querySelector(".number") as HTMLInputElement;
}

function getSendBtn() {
  return document.querySelector(".send") as HTMLButtonElement;
}

function getCreateNewMessageBtn() {
  return document.querySelector(".create-new-message") as HTMLButtonElement;
}

function getSelectAllBtn() {
  return document.querySelector(".select-all") as HTMLButtonElement;
}

function getDeleteBtn() {
  return document.querySelector(".delete") as HTMLButtonElement;
}

function isReady() {
  return true;
}

function isLoadingComplete() {
  return true;
}

async function waitToLoadingFinish() {
  await waitForValue(isLoadingComplete);
}

function checkSuccess(): "success" | "fail" {
  return "success";
}

async function deleteAllMessages() {
  const selectAllBtn = getSelectAllBtn();
  if (selectAllBtn) {
    selectAllBtn.click();
    const deleteBtn = getDeleteBtn();
    await wait(500);
    if (deleteBtn) {
      deleteBtn.click();
    }
  }
}

async function sendMessage(s: MessageSet) {
  await wait(1000);
  return "success";
  const messageField = getMessageField();
  const numberField = getNumberField();
  const sendBtn = getSendBtn();
  if (messageField && numberField && sendBtn) {
    messageField.value = s.message;
    numberField.value = s.number;
    sendBtn.click();
    await waitToLoadingFinish();
    return checkSuccess();
  } else {
    await wait(100);
    return sendMessage(s);
  }
}

async function main() {
  await isReady();
  let runningState = await getRunningState();
  let msgSet = await getFirstSetFromQueue();
  while (msgSet && runningState === "running") {
    const result = await sendMessage(msgSet);
    if (result === "success") {
      await addToSent(msgSet);
    } else {
      await addToFailed(msgSet);
    }
    msgSet = await getFirstSetFromQueue();
    runningState = await getRunningState();
    await wait(100);
    // getCreateNewMessageBtn()?.click();
  }
  if (msgSet === undefined) {
    await setRunningState("finished");
    await deleteAllMessages();
  }
}

chrome.storage.onChanged.addListener(async (changes, namespace) => {
  if (namespace !== "local") return;
  if (changes.runningState) {
    if (changes.runningState.newValue === "running") {
      main();
    }
  }
});

console.log("content script loaded");
