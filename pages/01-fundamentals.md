---
layout: cover
background: /cover.avif

class: text-center
---

# 第1章：JavaScript 基础知识

<div class="mb-8">
  <div class="text-6xl mb-4">🏗️</div>
  <div class="text-xl opacity-80">掌握 JavaScript 核心概念</div>
</div>

<div class="grid grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
  <div>
    <h3 class="text-lg font-semibold mb-3">本章内容</h3>
    <ul class="space-y-2 text-sm">
      <li>• 变量声明与作用域</li>
      <li>• 数据类型与类型转换</li>
      <li>• 函数定义与调用</li>
      <li>• 对象与数组操作</li>
    </ul>
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-3">学习目标</h3>
    <ul class="space-y-2 text-sm">
      <li>• 理解 JS 基础语法</li>
      <li>• 掌握变量作用域</li>
      <li>• 学会函数使用</li>
      <li>• 熟悉原型概念</li>
    </ul>
  </div>
</div>

---
layout: two-cols
layoutClass: gap-16
---

# 1.1 变量声明与作用域

JavaScript 中有三种变量声明方式，每种都有不同的特点和使用场景。

## 📝 变量声明关键字

- **var** - 函数作用域，存在变量提升
- **let** - 块级作用域，不存在变量提升
- **const** - 块级作用域，不可重新赋值

## 🔍 作用域类型

- **全局作用域** - 整个程序中都可访问
- **函数作用域** - 仅在函数内部可访问
- **块级作用域** - 仅在代码块内部可访问

::right::

```javascript
// var：函数作用域，存在变量提升
console.log(a); // undefined (不是报错!)
var a = 1;

function testVar() {
  if (true) {
    var b = 2;
  }
  console.log(b); // 2 (可以访问)
}

// let：块级作用域，无变量提升
// console.log(c); // ReferenceError
let c = 3;

function testLet() {
  if (true) {
    let d = 4;
  }
  // console.log(d); // ReferenceError
}

// const：常量，必须初始化
const e = 5;
// e = 6; // TypeError

testVar();
testLet();
```

---
layout: default
---

# 1.2 数据类型详解

JavaScript 有两大类数据类型：原始类型和引用类型。

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## 🎯 原始类型 (Primitive Types)

<div class="space-y-4">
  <div class="bg-blue-50 p-4 rounded-lg">
    <h4 class="font-bold text-blue-800">Number</h4>
    <p class="text-blue-600 text-sm">整数、浮点数、特殊值(NaN、Infinity)</p>
  </div>
  
  <div class="bg-green-50 p-4 rounded-lg">
    <h4 class="font-bold text-green-800">String</h4>
    <p class="text-green-600 text-sm">文本数据，用引号包围</p>
  </div>
  
  <div class="bg-purple-50 p-4 rounded-lg">
    <h4 class="font-bold text-purple-800">Boolean</h4>
    <p class="text-purple-600 text-sm">true 或 false</p>
  </div>
  
  <div class="bg-gray-50 p-4 rounded-lg">
    <h4 class="font-bold text-gray-800">undefined / null</h4>
    <p class="text-gray-600 text-sm">未定义值 / 空值</p>
  </div>
</div>

</div>

<div>

## 📦 引用类型 (Reference Types)

```javascript
// 类型检测
console.log(typeof 42);          // 'number'
console.log(typeof 'hello');     // 'string'
console.log(typeof true);        // 'boolean'
console.log(typeof undefined);   // 'undefined'
console.log(typeof null);        // 'object' (这是个历史bug)

// 数组和对象都是 object
console.log(typeof [1,2,3]);     // 'object'
console.log(typeof {a: 1});      // 'object'

// 更精确的类型检测
console.log(Array.isArray([1,2,3])); // true
console.log(Object.prototype.toString.call([])); // '[object Array]'

// 类型转换
console.log(Number('123'));   // 123
console.log(String(123));     // '123'
console.log(Boolean(0));      // false
console.log(Boolean(''));     // false
```

</div>

</div>

---
layout: default
---

# 1.3 函数定义与使用

函数是 JavaScript 的第一等公民，有多种定义和使用方式。

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## 📋 函数定义方式

### 函数声明

```javascript
function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('World'));
```

**说明**: 函数声明会被提升，可以在定义前调用

### 函数表达式

```javascript
const greet = function(name) {
  return 'Hello, ' + name + '!';
};

console.log(greet('World'));
```

**说明**: 函数表达式不会被提升，必须先定义后使用

### 立即执行函数

```javascript
(function(name) {
  console.log('Hello, ' + name + '!');
})('World');
```

**说明**: 定义后立即执行，常用于创建独立作用域

</div>

<div>

## ⚡ 函数特性演示

```javascript
// 函数提升
console.log(hoisted()); // 'This works!'

function hoisted() {
  return 'This works!';
}

// 参数默认值 (ES6)
function greetWithDefault(name = 'Guest') {
  return 'Hello, ' + name + '!';
}

console.log(greetWithDefault());        // 'Hello, Guest!'
console.log(greetWithDefault('Alice')); // 'Hello, Alice!'

// 剩余参数
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

// 函数作为参数
function operate(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
console.log(operate(5, 3, add)); // 8
```

</div>

</div>

---
layout: default
---

# 1.4 对象与数组基础

对象和数组是 JavaScript 中最重要的数据结构。

## 对象字面量对比

### 传统对象创建

```javascript
// 使用 new Object()
var person = new Object();
person.name = '张三';
person.age = 25;
person.greet = function() {
  return '你好，我是' + this.name;
};

console.log(person.greet());
```

**问题**: 代码冗长、不够直观、容易出错

### 对象字面量语法

```javascript
// 对象字面量
const person = {
  name: '张三',
  age: 25,
  greet() {
    return `你好，我是${this.name}`;
  }
};

console.log(person.greet());
```

**优势**: 语法简洁、易于阅读、支持方法简写

## 数组操作对比

### 传统数组遍历

```javascript
var numbers = [1, 2, 3, 4, 5];
var doubled = [];

for (var i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

console.log(doubled); // [2, 4, 6, 8, 10]
```

**问题**: 代码冗长、容易出错、可读性差

### 数组方法链式调用

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 链式调用
const result = numbers
  .filter(num => num % 2 === 0)  // 过滤偶数
  .map(num => num * 3)           // 乘以3
  .reduce((sum, num) => sum + num, 0); // 求和

console.log(result); // 18
```

**优势**: 代码简洁、语义清晰、支持链式调用、函数式编程

---
layout: default
---

# 1.5 对象原型与原型链

理解原型是掌握 JavaScript 面向对象编程的关键。

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## 🔗 原型概念

<div class="space-y-4">
  <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
    <h4 class="font-bold text-blue-800">什么是原型？</h4>
    <p class="text-blue-700 text-sm mt-2">
      每个 JavaScript 对象都有一个内部属性 [[Prototype]]，指向其原型对象。
      原型对象包含可被该对象继承的属性和方法。
    </p>
  </div>
  
  <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
    <h4 class="font-bold text-green-800">原型链</h4>
    <p class="text-green-700 text-sm mt-2">
      当访问对象属性时，如果对象本身没有该属性，JavaScript 会沿着原型链向上查找，
      直到找到属性或到达原型链顶端 (null)。
    </p>
  </div>
  
  <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
    <h4 class="font-bold text-purple-800">继承机制</h4>
    <p class="text-purple-700 text-sm mt-2">
      JavaScript 使用原型链实现继承，这是一种基于对象的继承，
      而不是基于类的继承（ES6 之前）。
    </p>
  </div>
</div>

</div>

<div>

```javascript
// 构造函数和原型
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 在原型上添加方法
Person.prototype.greet = function() {
  return `我是${this.name}，今年${this.age}岁`;
};

Person.prototype.species = '人类';

// 创建实例
const alice = new Person('Alice', 25);
const bob = new Person('Bob', 30);

console.log(alice.greet());    // 我是Alice，今年25岁
console.log(alice.species);    // 人类

// 原型链查找
console.log(alice.hasOwnProperty('name'));    // true
console.log(alice.hasOwnProperty('species')); // false

// 检查原型关系
console.log(alice.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(alice)); // true

// 原型链
console.log(alice.__proto__.__proto__ === Object.prototype); // true
```

</div>

</div>

---
layout: default
---

# 1.6 实践练习

通过实际练习巩固 JavaScript 基础概念。

## 练习题

### 1. 变量声明

**问题**: 以下关于 var、let、const 的描述，哪个是正确的？

- A. var 声明的变量有块级作用域
- B. let 声明的变量会被提升
- C. const 声明的变量不能重新赋值 ✅
- D. let 和 const 都有函数作用域

**解析**: const 声明的变量是常量，一旦赋值就不能修改。var 有函数作用域和变量提升，let 和 const 有块级作用域且无变量提升。

### 2. 类型检测

**问题**: typeof null 的结果是什么？

- A. "null"
- B. "undefined"
- C. "object" ✅
- D. "boolean"

**解析**: typeof null 返回 "object"，这是 JavaScript 的一个历史遗留 bug，但为了兼容性一直保留至今。

### 3. 函数提升

**问题**: 请补全代码，使其能正确输出 "Hello World"：

```
console.log(greet());

// 在这里定义 greet 函数
function greet() {
  return "Hello World";
}
```

**解析**: 函数声明会被提升，所以可以在定义前调用。需要使用 function 关键字定义函数。

### 4. 原型链

**问题**: 对象通过原型链查找属性，如果在原型链中找不到属性会返回什么？

- A. null
- B. undefined ✅
- C. 抛出错误
- D. 空字符串

**解析**: 当沿着原型链查找属性但找不到时，JavaScript 返回 undefined。只有在原型链的顶端才是 null。

---
layout: center
class: text-center
---

# 🎉 第1章总结

## 主要知识点回顾

<div class="grid grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-blue-800 mb-4">变量与作用域</h3>
    <ul class="text-blue-700 text-sm space-y-2">
      <li>• var：函数作用域，有变量提升</li>
      <li>• let：块级作用域，无变量提升</li>
      <li>• const：块级作用域，不可重新赋值</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-green-800 mb-4">数据类型</h3>
    <ul class="text-green-700 text-sm space-y-2">
      <li>• 原始类型：number, string, boolean, null, undefined</li>
      <li>• 引用类型：object, array, function</li>
      <li>• 类型转换与检测方法</li>
    </ul>
  </div>
  
  <div class="bg-purple-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-purple-800 mb-4">函数</h3>
    <ul class="text-purple-700 text-sm space-y-2">
      <li>• 函数声明与函数表达式</li>
      <li>• 参数默认值与剩余参数</li>
      <li>• 函数作为一等公民的特性</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-orange-800 mb-4">对象与原型</h3>
    <ul class="text-orange-700 text-sm space-y-2">
      <li>• 对象字面量语法</li>
      <li>• 数组方法与函数式编程</li>
      <li>• 原型链与继承机制</li>
    </ul>
  </div>
</div>

<div class="mt-8 text-lg text-gray-600">
  💡 <strong>下一章预告</strong>：学习 ES6 的核心特性，包括箭头函数、解构赋值、模板字符串等现代 JavaScript 语法。
</div>