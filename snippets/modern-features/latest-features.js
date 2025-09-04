// #region snippet
// ES2020+ 现代特性示例

// 可选链操作符
const user = {
  profile: {
    address: {
      city: '北京'
    }
  }
};

// 安全访问嵌套属性
const city = user?.profile?.address?.city;
const phone = user?.profile?.contact?.phone; // undefined

// 空值合并操作符
const config = {
  theme: null,
  timeout: 0,
  debug: false
};

const theme = config.theme ?? 'default';     // 'default'
const timeout = config.timeout ?? 5000;     // 0 (保留假值)
const debug = config.debug ?? true;         // false (保留假值)

// 逻辑赋值运算符 (ES2021)
let count = 0;
count ||= 10;  // count = count || 10

let value = null;
value ??= 'default';  // value = value ?? 'default'

// 数字分隔符
const million = 1_000_000;
const binary = 0b1010_0001;
const hex = 0xFF_EC_DE_5E;

// String.replaceAll (ES2021)
const text = 'hello world hello';
const replaced = text.replaceAll('hello', 'hi');

export { user, config, theme, timeout, debug, million, replaced };
// #endregion snippet