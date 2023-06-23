import { waitForValue } from "./services";

function getMessageField() {
  return document.querySelector("#sendMessage") as HTMLDivElement;
}

function getNumberField() {
  return document.querySelector("#sendTo") as HTMLInputElement;
}

function getSendBtn() {
  return document.querySelector("#composer-submit") as HTMLButtonElement;
}

function getCreateNewMessageBtn() {
  return document.querySelector(
    "#conversation-new-message"
  ) as HTMLButtonElement;
}

function getSelectAllBtn() {
  return document.querySelector(
    "#conversation-select-all"
  ) as HTMLButtonElement;
}

async function confirmDeleteConversation() {
  const confirmBtn = await waitForValue(() =>
    document.querySelector("#confirmDeleteConversationsButtonYes")
  );
  if (confirmBtn) {
    confirmBtn.click();
  }
}

function returnToConversationList() {
  const returnBtn = document.querySelector(
    "#conversation-edit-done"
  ) as HTMLButtonElement;
  if (returnBtn) {
    returnBtn.click();
  }
}

function isButtonActive(btn: HTMLButtonElement) {
  return !btn.disabled;
}

function getDeleteBtnInit() {
  return document.querySelector("#conversation-delete") as HTMLButtonElement;
}
function getDeleteBtn() {
  return document.querySelector("#composer-submit") as HTMLButtonElement;
}

async function waitForReady() {
  const messageField = await waitForValue(getMessageField);
  console.log({ messageField });
  const numberField = await waitForValue(getNumberField);
  console.log({ numberField });
  return messageField && numberField;
}

function isReady() {
  return getMessageField() && getNumberField();
}

export {
  getMessageField,
  getNumberField,
  getSendBtn,
  getCreateNewMessageBtn,
  getSelectAllBtn,
  confirmDeleteConversation,
  returnToConversationList,
  isButtonActive,
  getDeleteBtnInit,
  getDeleteBtn,
  waitForReady,
  isReady,
};
