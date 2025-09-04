---
layout: cover
background: https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80
class: text-center
---

# 第3章：ES6+ 高级特性

<div class="mb-8">
  <div class="text-6xl mb-4">🏗️</div>
  <div class="text-xl opacity-80">深入现代 JavaScript 高级概念</div>
</div>

<div class="grid grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
  <div>
    <h3 class="text-lg font-semibold mb-3">本章内容</h3>
    <ul class="space-y-2 text-sm">
      <li>• 类与继承</li>
      <li>• 模块系统</li>
      <li>• Symbol 类型</li>
      <li>• 迭代器与生成器</li>
    </ul>
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-3">学习目标</h3>
    <ul class="space-y-2 text-sm">
      <li>• 掌握 ES6 类语法</li>
      <li>• 理解模块化编程</li>
      <li>• 学习 Symbol 使用</li>
      <li>• 了解迭代器概念</li>
    </ul>
  </div>
</div>

---
layout: two-cols
layoutClass: gap-16
---

# 3.1 类与继承

ES6 引入了类语法，提供了更直观的面向对象编程方式。

## 🏛️ 类的特点

- **语法糖** - 基于现有原型链
- **constructor** - 构造函数
- **extends** - 继承关键字
- **super** - 调用父类方法
- **static** - 静态方法

::right::

## 面向对象编程对比

### 构造函数方式

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return '我是' + this.name;
};

Person.prototype.getAge = function() {
  return this.age;
};

var person = new Person('张三', 25);
console.log(person.greet());
```

**问题**: 语法分散、不够直观、继承复杂

### ES6 类语法

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `我是${this.name}`;
  }
  
  getAge() {
    return this.age;
  }
}

const person = new Person('张三', 25);
console.log(person.greet());
```

**优势**: 语法统一、易于理解、继承简单

---
layout: default
---

# 3.2 模块系统

ES6 模块提供了标准化的模块化解决方案。

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## 📦 模块导出

```javascript
// math.js - 模块导出示例
// 命名导出
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// 批量导出
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;

export { subtract, divide };

// 默认导出
export default class Calculator {
  constructor() {
    this.result = 0;
  }
  
  add(value) {
    this.result += value;
    return this;
  }
}

console.log('模块已定义');
```

</div>

<div>

## 📥 模块导入

```javascript
// 导入示例 (在实际环境中使用)

// 命名导入
// import { PI, add, multiply } from './math.js';

// 重命名导入
// import { subtract as minus } from './math.js';

// 全部导入
// import * as MathUtils from './math.js';

// 默认导入
// import Calculator from './math.js';

// 混合导入
// import Calculator, { PI, add } from './math.js';

// 演示用法 (模拟)
const PI = 3.14159;
const add = (a, b) => a + b;

console.log('PI =', PI);
console.log('2 + 3 =', add(2, 3));

// 动态导入 (ES2020)
// const module = await import('./math.js');
```

</div>

</div>

---
layout: default
---

# 3.3 Symbol 原始类型

Symbol 是 ES6 新增的原始数据类型，用于创建唯一标识符。

## Symbol 类型详解

Symbol 是一种新的原始数据类型，主要用于创建对象的私有属性和避免属性名冲突。

### 基本使用

```javascript
// 创建 Symbol
const sym1 = Symbol();
const sym2 = Symbol('description');
const sym3 = Symbol('description');

console.log(sym2 === sym3); // false - 每个 Symbol 都是唯一的
console.log(typeof sym1);   // 'symbol'

// 作为对象属性
const obj = {
  [sym1]: 'private value',
  publicProp: 'public value'
};

console.log(obj[sym1]);        // 'private value'
console.log(Object.keys(obj)); // ['publicProp'] - Symbol 属性不可枚举
```

**说明**: Symbol 创建唯一标识符，常用于对象私有属性

### 全局 Symbol

```javascript
// 全局 Symbol 注册表
const globalSym1 = Symbol.for('shared');
const globalSym2 = Symbol.for('shared');

console.log(globalSym1 === globalSym2); // true

// 获取 Symbol 的 key
console.log(Symbol.keyFor(globalSym1)); // 'shared'

// 内置 Symbol
const arr = [1, 2, 3];
console.log(arr[Symbol.iterator]); // 数组的迭代器
```

**说明**: Symbol.for() 创建全局共享的 Symbol

### 实际应用

```javascript
// 定义类的私有方法
const _calculate = Symbol('calculate');

class Calculator {
  constructor() {
    this.value = 0;
  }
  
  [_calculate](operation, num) {
    switch(operation) {
      case 'add': return this.value + num;
      case 'multiply': return this.value * num;
    }
  }
  
  add(num) {
    this.value = this[_calculate]('add', num);
    return this;
  }
}

const calc = new Calculator();
console.log(calc.add(5).value); // 5
```

**说明**: Symbol 可以用来定义类的私有方法和属性

---
layout: default
---

# 3.4 迭代器与生成器

迭代器提供了统一的遍历接口，生成器简化了迭代器的创建。

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## 🔄 迭代器

```javascript
// 自定义迭代器
function createIterator(items) {
  let index = 0;
  
  return {
    next() {
      const done = index >= items.length;
      const value = done ? undefined : items[index++];
      
      return { value, done };
    }
  };
}

const iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 可迭代对象
const iterable = {
  items: [1, 2, 3],
  [Symbol.iterator]() {
    return createIterator(this.items);
  }
};

// 使用 for...of
for (const item of iterable) {
  console.log(item);
}
```

</div>

<div>

## ⚡ 生成器

```
// 生成器函数
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
  return 'done';
}

const gen = numberGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 'done', done: true }

// 无限序列生成器
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
const first10 = [];
for (let i = 0; i < 10; i++) {
  first10.push(fib.next().value);
}
console.log('前10个斐波那契数:', first10);
```

</div>

</div>

---
layout: center
class: text-center
---

# 🎊 第3章总结

## ES6+ 高级特性精通

<div class="grid grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-blue-800 mb-4">类与继承</h3>
    <ul class="text-blue-700 text-sm space-y-2">
      <li>• class 语法糖</li>
      <li>• constructor 构造函数</li>
      <li>• extends 继承</li>
      <li>• super 调用父类</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-green-800 mb-4">模块系统</h3>
    <ul class="text-green-700 text-sm space-y-2">
      <li>• export/import 语法</li>
      <li>• 命名导出与默认导出</li>
      <li>• 动态导入</li>
      <li>• 模块化编程</li>
    </ul>
  </div>
  
  <div class="bg-purple-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-purple-800 mb-4">Symbol 类型</h3>
    <ul class="text-purple-700 text-sm space-y-2">
      <li>• 唯一标识符</li>
      <li>• 私有属性实现</li>
      <li>• 全局 Symbol 注册表</li>
      <li>• 内置 Symbol</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-orange-800 mb-4">迭代器与生成器</h3>
    <ul class="text-orange-700 text-sm space-y-2">
      <li>• Iterator 接口</li>
      <li>• 生成器函数 function*</li>
      <li>• yield 关键字</li>
      <li>• for...of 循环</li>
    </ul>
  </div>
</div>

<div class="mt-8 text-lg text-gray-600">
  💡 <strong>下一章预告</strong>：学习异步编程，掌握 Promise、async/await 等现代异步处理方式。
</div>