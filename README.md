## Jasmine 及 Karma
前端的单元测试是模块化开发下不可或缺的一部分，我们通过 es6 的 class import\export 或者原本 es5 的 require 的方式，可以做到模块化的开发，同时在测试时也更为方便。

[Jasmine](https://jasmine.github.io/) 是一个前端测试的框架，可以通过运行 Jasmine 来测试我们某一模块或者某一个函数的功能。而 [Karma](https://karma-runner.github.io/2.0/index.html) 则是用来自动化运行单元测试的工具，可以帮我们执行 Jasmine 的测试案例，不用一个个手动执行或者放到前端代码中测试。

因为如今开发中通常都会使用到 ES6 的写法，然后需要通过 Gulp 和 Webpack 等构建工具来打包编译。其中将 ES6 语法编译成 ES5 所需要的插件是 browserify + babelify。通常我们开发前端时会一边编写一边透过 Gulp 和 Webpack 实时编译，那 Karma 本质上也是打开浏览器通过浏览器运行我们编写的 Jasmine 测试案例，同样也需要做 ES6 至 ES5 的编译。

## 安装
我们需要以下node module来运行单元测试:

 - jasmine-core: jasmine核心模块
 - karma karma-jasmine: karma以及karma jasmine相关模块
 - karma-chrome-launcher: 自动launch Chrome
 - karma-jasmine-html-reporter: 运行单元测试后生成报告的插件。

```
npm install --save-dev jasmine-core karma   karma-chrome-launcher karma-jasmine  karma-jasmine-html-reporter
```
为了将 ES6 转换为 ES5，我们还需要安装以下模块:

 - karma-browserify watchify: karma-browserify 将ES6转换为ES5， watchify 可以加快转换的速度。
 - babel-core babelify： babel 的核心插件以及配合browserify使用的 babelify。
 - babel-preset-es2015: babel 转换时的presets.
 - babel-plugin-transform-class-properties: calss 相关的转换插件。
```
npm install --save-dev karma-browserify watchify babel-core babelify babel-plugin-transform-class-properties babel-preset-es2015
```
最终我们的 `package.json`:
```
{
  "name": "es6-unit-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "karma start"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-preset-es2015": "^6.24.1",
    "babelify": "^8.0.0",
    "jasmine-core": "^2.9.0",
    "karma": "^2.0.0",
    "karma-browserify": "^5.1.3",
    "karma-chrome-launcher": "^2.2.0",
    "karma-jasmine": "^1.1.1",
    "karma-jasmine-html-reporter": "^0.2.2",
    "watchify": "^3.9.0"
  },
  "dependencies": {}
}
```
## karma.conf.js
接着我们需要配置 karma.conf.js：
```
// karma.conf.js
module.exports = function(config) {
    config.set({
        //自动launch chrome，需要 chrome 插件
        browsers: ['Chrome'],
        // 使用到的  framework
        frameworks: ['jasmine', 'browserify'],
        // unit test 文件
        files: [
            'store-test.js'
        ],
        //预处理，转换ES6
        preprocessors: {
            'store-test.js': [ 'browserify' ]
        },
        //karma-browserify 配置，配置为使用 babelify
        browserify: {
            debug: true,
            transform: [['babelify', {presets: ['es2015'], plugins: ['transform-class-properties']}]]
        },
        //用 karma-jasmine-html-reporter 生成report
        reporters: ['kjhtml']
    })
};
```
## 单元测试文件及被测试模块
首先我们写一个简单的 `store.js` 来做测试，只是获取 store 的名字然后验证是否为 "store"。
```javascript
export default class Store{
    getName() {
        return "store";
    }
}
```
然后我们需要一个对应的测试文件，放在同一目录下:
```javascript
// First argument to 'describe' (which is defined by Jasmine) is the testing module that will
// appear in test reports. The second argument is a callback containing the individual tests.

import Store from "./store";

describe("Store Test", function () {
// The 'it' function of Jasmine defined an individual test. The first argument is
// a description of the test that's appended to the module name. Because a module name
// is typically a noun, like the name of the function being tested, the description for
// an individual test is typically written in an action-data format.

    it("Get store name", () => {
        const store = new Store();
        console.log(store);
        const name = store.getName();
        expect(name).toEqual("store");
    });
});
```

## 运行

我们在上述的 `pacakage.json` 中已经定义了测试时的script
```
"scripts": {
    "test": "karma start"
  },
```
因此只需要运行以下命令即可打开浏览器并运行测试文件。
```
npm run test
```