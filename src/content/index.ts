import {
  addToFailed,
  addToSent,
  getFirstSetFromQueue,
  getInterval,
  getRunningState,
  setRunningState,
} from "../common/storage";
import {
  confirmDeleteConversation,
  getCreateNewMessageBtn,
  getDeleteBtn,
  getDeleteBtnInit,
  getMessageField,
  getNumberField,
  getSelectAllBtn,
  getSendBtn,
  isButtonActive,
  returnToConversationList,
  waitForReady,
} from "./elements";

import { wait, waitForValue } from "./services";

function checkSuccess(msgSet: MessageSet): "success" | "fail" {
  msgSet;
  return "success";
}

async function waitForSending() {
  const loadingEl = document.querySelector(
    "#vma-composerSpinner"
  ) as HTMLDivElement;
  let isVisible = loadingEl?.style.display !== "none";
  while (!isVisible) {
    await wait(100);
    isVisible = loadingEl?.style.display !== "none";
  }
  return isVisible;
}

async function deleteAllMessages() {
  getDeleteBtnInit()?.click();
  await wait(500);
  const selectAllBtn = await waitForValue(getSelectAllBtn);
  selectAllBtn?.click();
  await wait(500);
  const deleteBtn = await waitForValue(getDeleteBtn);
  isButtonActive(deleteBtn) && deleteBtn.click();
  await wait(500);
  await confirmDeleteConversation();
  await wait(500);
  returnToConversationList();
}

async function fillSet(msgSet: MessageSet) {
  await waitForReady();
  await wait(500);
  getNumberField().value = msgSet.number;
  await wait(200);
  getMessageField().blur();
  getMessageField().focus();
  await wait(200);
  getMessageField().innerText = msgSet.message;
  console.log(getMessageField().innerText);
  getMessageField().blur();
  getMessageField().focus();
  document.body.click();
  await wait(1000);
}

async function sendMessage(s: MessageSet) {
  await wait(100);
  getCreateNewMessageBtn()?.click();
  await wait(500);
  console.log("new message clicked");
  await fillSet(s);
  const sendBtn = getSendBtn();
  isButtonActive(sendBtn) && sendBtn.click();
  await wait(1000);
}

async function main() {
  let runningState = await getRunningState();
  let msgSet = await getFirstSetFromQueue();
  const interval = await getInterval();
  while (msgSet && runningState === "running") {
    await waitForValue(() => document.hasFocus());
    await sendMessage(msgSet);
    await waitForSending();
    await wait(interval * 1000);
    const result = checkSuccess(msgSet);
    if (result === "success") {
      await addToSent(msgSet);
    } else {
      await addToFailed(msgSet);
    }
    getCreateNewMessageBtn()?.click();

    await wait(500);
    msgSet = await getFirstSetFromQueue();
    runningState = await getRunningState();
    await wait(100);
  }
  if (msgSet === undefined) {
    await setRunningState("finished");
    await deleteAllMessages();
  }
}

if (location.pathname === "/vma/web2/Message.do") {
  chrome.storage.onChanged.addListener(async (changes, namespace) => {
    if (namespace !== "local") return;
    console.log(Object.keys(changes));
    if (changes.runningState) {
      if (changes.runningState.newValue === "running") {
        main();
      }
    }
  });
}
console.log("content script loaded");
