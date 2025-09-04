---
layout: cover
background: https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
class: text-center
---

# 第2章：ES6 核心特性

<div class="mb-8">
  <div class="text-6xl mb-4">⚡</div>
  <div class="text-xl opacity-80">现代 JavaScript 语法革新</div>
</div>

<div class="grid grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
  <div>
    <h3 class="text-lg font-semibold mb-3">本章内容</h3>
    <ul class="space-y-2 text-sm">
      <li>• 箭头函数语法</li>
      <li>• 解构赋值</li>
      <li>• 模板字符串</li>
      <li>• 默认参数</li>
    </ul>
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-3">学习目标</h3>
    <ul class="space-y-2 text-sm">
      <li>• 掌握 ES6 核心语法</li>
      <li>• 理解箭头函数特点</li>
      <li>• 学会解构赋值</li>
      <li>• 使用模板字符串</li>
    </ul>
  </div>
</div>

---
layout: two-cols
layoutClass: gap-16
---

# 2.1 箭头函数

箭头函数是 ES6 引入的新语法，提供了更简洁的函数写法。

## ✨ 语法特点

- **简洁语法** - 用 `=>` 替代 `function`
- **隐式返回** - 单表达式自动返回
- **词法 this** - 不绑定自己的 this
- **不能作为构造函数** - 不能用 new 调用

::right::

## 箭头函数语法对比

### 传统函数

```javascript
// 普通函数
function add(a, b) {
  return a + b;
}

// 函数表达式
const multiply = function(a, b) {
  return a * b;
};

console.log(add(2, 3));      // 5
console.log(multiply(2, 3)); // 6
```

**问题**: 语法冗长，需要明确 return

### 箭头函数

```javascript
// 箭头函数
const add = (a, b) => a + b;

// 多行箭头函数
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

console.log(add(2, 3));      // 5
console.log(multiply(2, 3)); // 6
```

**优势**: 语法简洁、单表达式隐式返回、适合函数式编程

---
layout: default
---

# 2.2 解构赋值

解构赋值允许从数组或对象中提取数据，赋值给不同的变量。

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## 📦 数组解构

```javascript
// 基本数组解构
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// 跳过元素
const [a, , c] = numbers;
console.log(a, c);   // 1 3

// 默认值
const [x = 0, y = 0] = [10];
console.log(x, y);   // 10 0

// 交换变量
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n);   // 2 1
```

</div>

<div>

## 🎯 对象解构

```javascript
// 基本对象解构
const person = {
  name: '张三',
  age: 25,
  city: '北京'
};

const { name, age } = person;
console.log(name, age); // 张三 25

// 重命名变量
const { name: personName, age: personAge } = person;
console.log(personName, personAge); // 张三 25

// 默认值
const { name: n, height = 170 } = person;
console.log(n, height); // 张三 170

// 嵌套解构
const user = {
  id: 1,
  profile: {
    email: 'user@example.com',
    preferences: { theme: 'dark' }
  }
};

const { profile: { email, preferences: { theme } } } = user;
console.log(email, theme); // user@example.com dark
```

</div>

</div>

---
layout: default
---

# 2.3 模板字符串

模板字符串提供了更强大的字符串处理能力。

## 字符串处理对比

### 传统字符串拼接

```javascript
var name = '李四';
var age = 28;
var city = '上海';

var message = '你好，我是' + name + 
              '，今年' + age + '岁，' +
              '来自' + city + '。';

console.log(message);

// 多行字符串
var html = '<div>' +
           '  <h1>' + name + '</h1>' +
           '  <p>年龄：' + age + '</p>' +
           '</div>';
```

**问题**: 语法复杂、容易出错、多行字符串困难、可读性差

### 模板字符串

```javascript
const name = '李四';
const age = 28;
const city = '上海';

const message = `你好，我是${name}，今年${age}岁，来自${city}。`;

console.log(message);

// 多行字符串
const html = `<div>
  <h1>${name}</h1>
  <p>年龄：${age}</p>
</div>`;

// 表达式计算
const info = `明年我将${age + 1}岁`;
console.log(info);
```

**优势**: 语法简洁、支持多行、可嵌入表达式、可读性强

---
layout: default
---

# 2.4 参数默认值与剩余参数

ES6 为函数参数提供了更多灵活性。

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## 🔧 参数默认值

## 函数参数增强特性

### 参数默认值

```javascript
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

console.log(greet());                    // Hello, Guest!
console.log(greet('Alice'));             // Hello, Alice!
console.log(greet('Bob', 'Hi'));         // Hi, Bob!
```

**说明**: 当参数未传递或为 undefined 时，使用默认值

### 剩余参数

```javascript
function sum(base = 0, ...numbers) {
  return base + numbers.reduce((total, num) => total + num, 0);
}

console.log(sum());           // 0
console.log(sum(10));         // 10
console.log(sum(10, 1, 2, 3)); // 16
```

**说明**: 使用 ...语法收集多余的参数到数组中

### 展开语法

```javascript
const numbers = [1, 2, 3];
const moreNumbers = [4, 5, 6];

// 展开数组
const combined = [...numbers, ...moreNumbers];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 函数调用中展开
console.log(Math.max(...numbers)); // 3
```

**说明**: 展开语法可以将数组元素展开为独立的参数

</div>

<div>

## 🚀 实际应用示例

```javascript
// 配置对象默认值
function createServer(options = {}) {
  const {
    port = 3000,
    host = 'localhost',
    ssl = false
  } = options;
  
  return `Server running on ${ssl ? 'https' : 'http'}://${host}:${port}`;
}

console.log(createServer());
console.log(createServer({ port: 8080 }));
console.log(createServer({ port: 443, ssl: true }));

// 数组操作
function processItems(first, second, ...others) {
  console.log('第一个:', first);
  console.log('第二个:', second);
  console.log('其他的:', others);
  
  return [first, second, ...others.map(item => item * 2)];
}

const result = processItems(1, 2, 3, 4, 5);
console.log('处理结果:', result);
```

</div>

</div>

---
layout: center
class: text-center
---

# 🎯 第2章总结

## ES6 核心特性掌握

<div class="grid grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-blue-800 mb-4">箭头函数</h3>
    <ul class="text-blue-700 text-sm space-y-2">
      <li>• 简洁的语法：(a, b) => a + b</li>
      <li>• 词法 this 绑定</li>
      <li>• 隐式返回单表达式</li>
      <li>• 适合函数式编程</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-green-800 mb-4">解构赋值</h3>
    <ul class="text-green-700 text-sm space-y-2">
      <li>• 数组解构：[a, b] = array</li>
      <li>• 对象解构：{name, age} = obj</li>
      <li>• 默认值与重命名</li>
      <li>• 嵌套解构模式</li>
    </ul>
  </div>
  
  <div class="bg-purple-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-purple-800 mb-4">模板字符串</h3>
    <ul class="text-purple-700 text-sm space-y-2">
      <li>• 反引号语法：`text`</li>
      <li>• 变量插值：${variable}</li>
      <li>• 多行字符串支持</li>
      <li>• 表达式计算</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-orange-800 mb-4">参数增强</h3>
    <ul class="text-orange-700 text-sm space-y-2">
      <li>• 默认参数值</li>
      <li>• 剩余参数：...args</li>
      <li>• 展开语法：...array</li>
      <li>• 参数解构</li>
    </ul>
  </div>
</div>

<div class="mt-8 text-lg text-gray-600">
  💡 <strong>下一章预告</strong>：深入学习 ES6+ 高级特性，包括类、模块、Symbol、迭代器等。
</div>