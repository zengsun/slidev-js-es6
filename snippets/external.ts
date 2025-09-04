/* eslint-disable no-console */

// #region snippet
// JavaScript 与 ES 基础知识示例代码

// 定义一个简单的类
export class ExampleClass {
  private value: number = 0;
  
  constructor(initialValue: number = 0) {
    this.value = initialValue;
  }
  
  // ES6 箭头函数
  increment = (): number => {
    return ++this.value;
  }
  
  // 异步方法
  async fetchData(): Promise<string> {
    // 模拟异步操作
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`Data for value: ${this.value}`);
      }, 1000);
    });
  }
  
  // getter
  get currentValue(): number {
    return this.value;
  }
}

// 工具函数
export function emptyArray<T>(length: number) {
  return Array.from<T>({ length })
}
// #endregion snippet

export function sayHello(name: string = '世界') {
  console.log(`你好，${name}！`);
}

// ES6+ 特性示例
export const modernFeatures = {
  // 解构赋值
  destructuring: () => {
    const [a, b, ...rest] = [1, 2, 3, 4, 5];
    const {name, age} = {name: '张三', age: 25};
    return {a, b, rest, name, age};
  },
  
  // 模板字符串
  templateString: (name: string, age: number) => {
    return `我叫${name}，今年${age}岁`;
  },
  
  // Promise 示例
  promiseExample: async () => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(100);
    return '异步操作完成';
  }
};
