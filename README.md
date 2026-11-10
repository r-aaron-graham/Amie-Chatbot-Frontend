# AMIE classroom activity lookup demo

This browser prototype demonstrates a chat interface that looks up short
classroom activity cards, cites the selected card, and abstains when the
query has no unique match. The three cards are fictional examples.

## Run locally

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. Try `active listening` for a response citing
`SEL-01`, or `weather forecast` to see abstention. Reset clears the
conversation. Keep input synthetic.

```bash
node --test retrieval.test.mjs
```

The demo runs in the browser with deterministic phrase matching. It makes no
model or backend requests and stores no messages. It is an engineering demo
for educational content lookup. The separate
[Python prototype](https://github.com/r-aaron-graham/Amie-Chatbot/tree/68bf25bce8d839cbee91a99364aba83c088e2186)
has its own Flask and model integration code.
