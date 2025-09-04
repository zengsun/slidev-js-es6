// #region snippet
// JavaScript 变量声明示例

// var - 函数作用域，变量提升
console.log(a); // undefined (不是错误，因为变量提升)
var a = 1;

function testVar() {
  if (true) {
    var b = 2;
  }
  console.log(b); // 2 (函数作用域)
}

// let - 块级作用域，无变量提升
let c = 3;
function testLet() {
  if (true) {
    let d = 4;
  }
  // console.log(d); // ReferenceError (块级作用域)
}

// const - 常量，必须初始化，不可重新赋值
const e = 5;
// e = 6; // TypeError

export { testVar, testLet };
// #endregion snippet