const test = require("node:test");
const assert = require("node:assert/strict");

test("验证问题: array-index-start", () => {
  // Given
  const arr = ["zero", "one", "two"];

  // When
  const firstByZero = arr[0];
  const firstByOne = arr[1];
  const indexOfZero = arr.indexOf("zero");
  const indexOfOne = arr.indexOf("one");

  // Then
  assert.equal(firstByZero, "zero");
  assert.equal(firstByOne, "one");
  assert.equal(indexOfZero, 0);
  assert.equal(indexOfOne, 1);
  assert.equal(arr.length, 3);
  assert.equal(arr[3], undefined);
});
