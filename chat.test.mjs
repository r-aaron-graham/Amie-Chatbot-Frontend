import assert from "node:assert/strict";
import test from "node:test";

test("chat form shows citations, abstains, and clears the transcript", async () => {
  const form = new EventTarget();
  const input = { value: "", focus() {} };
  const log = {
    children: [],
    appendChild(element) { this.children.push(element); },
    replaceChildren() { this.children = []; },
  };
  const elements = { "#chatForm": form, "#userInput": input, "#chatWindow": log };
  const previousDocument = globalThis.document;
  globalThis.document = {
    querySelector: (selector) => elements[selector],
    createElement: () => ({ classList: { add() {} } }),
  };

  try {
    await import("./chat.mjs");
    for (const [question, expected] of [
      ["active listening", /SEL-01/],
      ["weather forecast", /couldn't match/],
      ["active listening and group roles", /couldn't match/],
    ]) {
      input.value = question;
      const submit = new Event("submit", { cancelable: true });
      form.dispatchEvent(submit);
      assert.equal(submit.defaultPrevented, true);
      assert.equal(log.children.at(-2).textContent, question);
      assert.match(log.children.at(-1).textContent, expected);
      assert.equal(input.value, "");
    }

    form.dispatchEvent(new Event("reset"));
    assert.deepEqual(log.children, []);
  } finally {
    globalThis.document = previousDocument;
  }
});
