import { makeMessageSets } from "../popup/service";
export const setNumbers = async (numbers: string[]) => {
  await chrome.storage.local.set({ numbers });
};

export const setMessages = async (messages: string[]) => {
  await chrome.storage.local.set({ messages });
};

export const setQueue = async (queue: MessageSet[]) => {
  await chrome.storage.local.set({ queue });
};

export const setRunningState = async (runningState: RunningState) => {
  await chrome.storage.local.set({ runningState });
};

export const setSent = async (sent: MessageSet[]) => {
  await chrome.storage.local.set({ sent });
};

export const setFailed = async (failed: MessageSet[]) => {
  await chrome.storage.local.set({ failed });
};

export const setAllState = async (state: TExtensionState) => {
  await chrome.storage.local.set(state);
};

export const initialize = async (numbers: string[], messages: string[]) => {
  const queue = makeMessageSets(numbers, messages);
  await setAllState({
    numbers,
    messages,
    queue,
    runningState: "ready",
    sent: [],
    failed: [],
  });
};

export const getAllState = async () => {
  const state = await chrome.storage.local.get(null);
  return state as TExtensionState;
};

export const clear = async () => {
  await setNumbers([]);
  await setMessages([]);
  await setQueue([]);
  await setRunningState("idle");
};

export const start = async () => {
  await setRunningState("running");
};

export const stop = async () => {
  await setRunningState("stopped");
};

export const resume = async () => {
  await setRunningState("running");
};

export const getNumbers = async () => {
  const { numbers } = await chrome.storage.local.get("numbers");
  return numbers;
};

export const getMessages = async () => {
  const { messages } = await chrome.storage.local.get("messages");
  return messages;
};

export const getQueue = async () => {
  const { queue } = await chrome.storage.local.get("queue");
  return queue as MessageSet[];
};

export const getRunningState = async () => {
  const { runningState } = await chrome.storage.local.get("runningState");
  return runningState;
};

export const addToSent = async (messageSet: MessageSet) => {
  const { sent } = await chrome.storage.local.get("sent");
  await chrome.storage.local.set({ sent: [...sent, messageSet] });
};

export const addToFailed = async (messageSet: MessageSet) => {
  const { failed } = await chrome.storage.local.get("failed");
  await chrome.storage.local.set({ failed: [...failed, messageSet] });
};

export const stateChangeListeners = (
  key: keyof TExtensionState,
  listner: (newValue?: unknown, oldValue?: unknown) => void
) => {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace !== "local") return;
    if (changes[key]) {
      listner(changes[key].newValue, changes[key].oldValue);
    }
  });
};

export async function getFirstSetFromQueue() {
  const queue = await getQueue();
  const firstSet = queue.shift();
  await setQueue(queue);
  return firstSet;
}
