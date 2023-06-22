export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const waitForElement = async (selector: string) => {
  while (!document.querySelector(selector)) {
    await wait(100);
  }
  return document.querySelector(selector);
};

export const waitForValue = async (func: () => any) => {
  while (!func()) {
    await wait(100);
  }
  return func();
};
