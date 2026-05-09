/**
 * 模板说明（本文件不会被 `npm test` 执行）
 *
 * - `tests/js`、`tests/node`：放真实用例，文件名须为 `*.test.js`
 * - `tests/templates`：
 *      只放可复制的测试骨架、你常用的 Given/When/Then 模板、未来要复用的问答模板；
 *      使用 `*.template.js`，避免被测试运行器发现
 *
 * 创建真实测试：`npm run new:test -- js your-topic-name`
 * 选用其它骨架：`npm run new:test -- js your-topic-name async`（对应 async.template.js）
 */

const test = require("node:test");
const assert = require("node:assert/strict");

test("__TITLE__", () => {
  // Given
  const actual = null;
  const expected = null;

  // When
  // 在这里执行你要验证的代码

  // Then
  assert.equal(actual, expected);
});
