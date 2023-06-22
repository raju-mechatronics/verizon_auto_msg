export async function readTextFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export async function readLines(file: File) {
  const text = await readTextFile(file);
  return text.split("\n");
}

export async function extractNumbers(file: File) {
  const lines = await readLines(file);
  const numbers = lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  return numbers;
}

export async function extractMessages(file: File) {
  const textString = await readTextFile(file);
  const multipleEqualRegExp = /={3,}/gi;
  const texts = textString.split(multipleEqualRegExp);
  const filteredTexts = texts.map((e) => e.trim()).filter((e) => e.length > 0);
  return filteredTexts;
}

export function makeMessageSets(numbers: string[], messages: string[]) {
  const messageSets = numbers.map((number, index) => ({
    number,
    message: messages[index % messages.length],
  }));
  return messageSets;
}
