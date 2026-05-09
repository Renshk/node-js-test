const test = require("node:test");
const assert = require("node:assert/strict");

test("nextTick 和 Promise 都早于 setTimeout", async () => {
  const logs = [];

  process.nextTick(() => logs.push("nextTick"));
  Promise.resolve().then(() => logs.push("promise"));
  setTimeout(() => logs.push("timeout"), 0);

  await new Promise((resolve) => setTimeout(resolve, 10));

  // 在不同执行上下文中，nextTick 与 Promise 的先后可能有差异，
  // 这里仅验证二者都在 setTimeout 之前完成。
  assert.equal(logs.includes("promise"), true);
  assert.equal(logs.includes("nextTick"), true);
  assert.equal(logs.at(-1), "timeout");
});
