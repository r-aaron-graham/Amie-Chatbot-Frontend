import assert from "node:assert/strict";
import test from "node:test";
import { retrieve } from "./retrieval.mjs";

test("returns a source card for a supported question", () => {
  assert.equal(retrieve("Can we try ACTIVE LISTENING?").id, "SEL-01");
  assert.equal(retrieve("group roles").id, "SEL-02");
  assert.equal(retrieve("exit ticket").id, "SEL-03");
});

test("abstains for unsupported or ambiguous input", () => {
  for (const query of ["", "weather forecast", "paraphrased", "active listening and group roles"]) {
    assert.equal(retrieve(query), null);
  }
});
