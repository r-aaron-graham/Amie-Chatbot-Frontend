import { retrieve } from "./retrieval.mjs";

const form = document.querySelector("#chatForm");
const input = document.querySelector("#userInput");
const log = document.querySelector("#chatWindow");

function addMessage(role, text) {
  const message = document.createElement("div");
  message.classList.add("chat-message", role);
  message.textContent = text;
  log.appendChild(message);
  log.scrollTop = log.scrollHeight;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) return;
  addMessage("user", question);
  const card = retrieve(question);
  addMessage("assistant", card
    ? `${card.excerpt} [${card.id} · ${card.title}]`
    : "I couldn't match that to one sample activity card. Try one of the example questions.");
  input.value = "";
  input.focus();
});

form.addEventListener("reset", () => {
  log.replaceChildren();
});
