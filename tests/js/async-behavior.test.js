const test = require("node:test");
const assert = require("node:assert/strict");

test("Promise 微任务优先于 setTimeout 宏任务", async () => {
  const order = [];

  setTimeout(() => {
    order.push("timeout");
  }, 0);

  Promise.resolve().then(() => {
    order.push("promise");
  });

  await new Promise((resolve) => setTimeout(resolve, 10));

  assert.deepEqual(order, ["promise", "timeout"]);
});

test("async/await 返回 Promise", async () => {
  async function answer() {
    return 42;
  }

  const value = await answer();
  assert.equal(value, 42);
});
