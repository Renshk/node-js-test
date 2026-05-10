const test = require("node:test");
const assert = require("node:assert/strict");

/**
 * 基础理论
 * 
 * Math.round() 的判断逻辑并不完全是我们常规数学意义上的“四舍五入”，
 * 它在计算机底层的严格规则是：将数字加上 0.5，然后向下取整（即等同于 Math.floor(x + 0.5)）。
 * 如果是正数这可以总结为以下三条白话规则：
 * - 如果小数部分 小于 0.5，直接舍去小数。
 * - 如果小数部分 大于 0.5，向上进一位。
 * - 如果小数部分 等于 0.5，向正无穷方向（更大的方向）取整。 
 *
 * 注意：计算机底层的核心规则
 * 在计算机（如 JavaScript）底层，Math.round(x) 根本不关心什么“小数部分”，
 * 它只认唯一的一条死磕公式：Result = Math.floor(x + 0.5)
 *
 * 补充：向下取整函数 floor(x) 的严格定义
 * 在数学和计算机中，向下取整函数 floor(x) 的严格定义是：返回小于或等于（≤）给定数字(x)的最大整数。
 * 这里的关键在于“等于”。对于 -2.1，比它小或等于它的整数有 -3, -4, -5... 取最大的，就是 -3。
 * 对于 -2.0，因为它本身已经是一个整数，所以满足“小于或等于 -2.0”的最大整数，就是它自己，即 -2。
 * 规律总结：任何一个纯整数（无论正负），它的向下取整、向上取整、四舍五入，永远都是它自己。Math.floor(2.0) 是 2，Math.floor(-2.0) 是 -2
 */

test("验证问题: math-round", () => {
  // Given
  const pi = 3.14159;

  // When
  // 在这里执行你要验证的代码

  // Then
  // Math.floor() 向下取整 (向负无穷方向，即找更小的整数)
  assert.equal(Math.round(-2.5), Math.floor(-2.5 + 0.5)); // 返回 -2,因为 -2.5 + 0.5 = -2，小于等于-2的最大整数是-2
  assert.equal(Math.round(-2.1), Math.floor(-2.1 + 0.5)); // 返回 -2,因为 -2.1 + 0.5 = -1.6，比-1.6更小的最近整数是-2
  assert.equal(Math.round(-2.6), Math.floor(-2.6 + 0.5)); // 返回 -3,因为 -2.6 + 0.5 = -2.1，比-2.1更小的最近整数是-3

  assert.equal(Math.round(2.1), 2); // 返回 2 (小于0.5，舍去)
  assert.equal(Math.round(2.4), 2); // 返回 2 (小于0.5，舍去)
  assert.equal(Math.round(2.5), 3); // 返回 3 (等于0.5，向正无穷进位 2.5 -> 3)
  assert.equal(Math.round(2.6), 3); // 返回 3 (大于0.5，进位)

  assert.equal(Math.round(-2.1), -2); // 返回 -2 
  assert.equal(Math.round(-2.6), -3); // 返回 -3 
  // ⚠️ 极其容易出错的边界情况：
  assert.equal(Math.round(-2.5), -2); // 返回 -2！而不是 -3。因为 -2 比 -3 大（向正无穷方向）。
    
  // 使用 Math.round 和 toFixed 验证pi保留两位小数，变成 3.14
  assert.equal(Math.round(pi*100)/100, 3.14);
  assert.equal(pi.toFixed(2), "3.14"); // 注意：toFixed返回的是字符串
});
