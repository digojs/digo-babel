# digo-babel
[digo](https://github.com/digojs/digo) 插件：使用 [Babel](http://babeljs.io) 编译 ES6/JSX。

## 安装
```bash
npm install digo-babel -g
```

## 用法
### 编译 ES6/JSX 并重命名为 JS
```js
digo.src("*.js", "*.jsx").pipe("digo-babel");
```

### 源映射(Source Map)
本插件支持生成源映射，详见 [源映射](https://github.com/digojs/digo/wiki/源映射)。

## 选项
```js
digo.src("*.js", "*.jsx").pipe("digo-babel", {
	strict: false,			            // 是否禁止生成 "use strict" 语句。[2]
    jsx: {					            // 是否支持 jsx 语法。设为 false 表示不支持。[2]
        "pragma": "React.createElement"	// jsx 语法中解析 <node> 的函数。如 "React.createElement"。
    },
    filename: "unknown",                // 指定文件名。[1]
	filenameRelative: "",               // 用法文件名的跟路径。[1]
	presets: [],                        // 预处理插件集。[1]
	plugins: [],                        // 加载的插件列表。
	highlightCode: true,                // 在输出中高亮代码。
	only: null,                         // 一个正则或通配符，只有匹配的文件才会编译。
	ignore: null,                       // 忽略的路径。
	auxiliaryCommentBefore: null,       // 在输出文件前插入的注释。
	auxiliaryCommentAfter: null,        // 在输出文件后插入的注释。
	sourceMaps: false,                  // 是否生成源映射。[1]
	inputSourceMap: null,               // 输入源映射。[1]
	sourceMapTarget: "",                // 设置源映射的目标字段。用法相对文件名。[1]
	sourceFileName: "",                 // 设置源映射的文件字段。用法相对文件名。[1]
	sourceRoot: (moduleRoot),           // 设置源映射的跟地址。[1]
	moduleRoot: (sourceRoot),           // 解析 AMD 模块时用法的模块跟路径。
	moduleIds: false,                   // 是否在每个模块前插入模块 ID。如果未插入则所有模块都是匿名模块。
	moduleId: null,                     // 指定模块 ID。
	getModuleId: null,                  // 获取模块 ID 的回调函数。函数原型为 getModuleId(moduleName)，如果函数返回 false，则用法默认模块 ID 名。
	resolveModuleSource: null,          // 解析模块源码。如 import "SOURCE"。函数原型为 resolveModuleSource(source, filename).
	code: true,                         // 启用代码生成。
	babelrc: false,                     // 是否加载 .babelrc 和 .babelignore 文件。[1]
	ast: true,                          // 是否在返回对象包含 AST 语法树节点。
	compact: false,                     // 不要包含空白字符。如果设置为 "auto", 则文件超过 100KB 大小后不包含。[1]
	comments: true,                     // 是否输出注释。
	shouldPrintComment: null,           // 回调函数，用于区分是否打印指定的注释。函数原型： shouldPrintComment(commentContents). 注意: 如果指定了 shouldPrintComment，则 comments 选项无效。
	env: {},                            // 生成的环境变量。如： { env: { production: { /* specific options */ } } }`。如果环境变量 BABEL_ENV 的值为 "production"，则用法对应的环境变量选项。如果环境变量 BABEL_ENV 未设置，则用法 NODE_ENV，如果全部未设置，则默认为 "development"。
	retainLines: false,                 // 包含行号。
	extends: null,                      // 手动指定 .babelrc 路径。
});
```

> [1]: 此选项已在插件内部自动设置。
> [2]: 此选项由插件提供。

另参考: http://babeljs.io/docs/usage/options/
