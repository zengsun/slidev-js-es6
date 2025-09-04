// #region snippet
// ES6 箭头函数示例

// 传统函数
function traditionalAdd(a, b) {
  return a + b;
}

// 箭头函数 - 基本语法
const arrowAdd = (a, b) => a + b;

// 单参数可省略括号
const double = x => x * 2;

// 无参数需要括号
const greet = () => '你好！';

// 多行箭头函数需要花括号和 return
const calculate = (a, b) => {
  const sum = a + b;
  const product = a * b;
  return { sum, product };
};

// this 绑定差异演示
const obj = {
  name: '对象',
  traditional: function() {
    return `传统函数：${this.name}`;
  },
  arrow: () => {
    return `箭头函数：${this.name}`; // this 指向外层作用域
  }
};

export { arrowAdd, double, greet, calculate, obj };
// #endregion snippet