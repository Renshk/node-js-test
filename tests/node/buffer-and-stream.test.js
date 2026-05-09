const test = require("node:test");
const assert = require("node:assert/strict");
const { Readable } = require("node:stream");

test("Buffer 可以在字符串和字节间转换", () => {
  const text = "Node.js";
  const buf = Buffer.from(text, "utf8");

  assert.equal(buf.length > 0, true);
  assert.equal(buf.toString("utf8"), text);
});

test("Readable.from 可以逐项读取数组内容", async () => {
  const input = ["A", "B", "C"];
  const stream = Readable.from(input);
  const received = [];

  for await (const chunk of stream) {
    received.push(chunk);
  }

  assert.deepEqual(received, input);
});
