// 定义全局类型声明
declare module 'my-module' {
    interface MyType {
      // ...
    }
  }
  
  // 将声明放到模块中
  declare global {
    interface Window {
      myVar: number;
    }
  }