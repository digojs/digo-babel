var babel = require("babel-core");

module.exports = function Babel(file, options) {

    // 设置默认值。
    options = Object.assign({
        filename: file.srcPath,
        sourceMaps: file.sourceMap,
        inputSourceMap: file.sourceMapObject,
        babelrc: false,
        compact: false,
        strict: false,
        jsx: /x$/.test(file.srcPath)
    }, options);

    if (!options.presets) {
        options.presets = require("babel-preset-latest");
    }

    // 更改扩展名。
    file.ext = ".js";

    // 禁止生成 use strict 语句。
    if (!options.strict) {
        if (typeof options.presets === "function") {
            options.presets = options.presets();
        }
        options.presets.presets[0] = options.presets.presets[0][0]();
        var commonJs = require("babel-plugin-transform-es2015-modules-commonjs");
        for (var i = 0; i < options.presets.presets[0].plugins.length; i++) {
            if (commonJs === options.presets.presets[0].plugins[i][0]) {
                options.presets.presets[0].plugins[i][1] = Object.assign({ strict: false }, options.presets.presets[0].plugins[i][1]);
                break;
            }
        }
    }
    delete options.strict;

    // 支持 jsx 语法。
    if (options.jsx !== false) {
        if (options.jsx === true) {
            options.jsx = {};
        }
        if (typeof options.presets === "function") {
            options.presets = options.presets();
        }
        options.presets.plugins = options.presets.plugins || [];
        options.presets.plugins.push([require("babel-plugin-transform-react-jsx"), options.jsx]);
    }
    delete options.jsx;

    // 生成。
    try {
        var result = babel.transform(file.content, options);
    } catch (e) {
        var log = {
            plugin: Babel.name,
            source: e.codeFrame,
            error: e
        };
        try {
            var m = /^(.*?): (.*)\s*\(\d+:\d+\)$/.exec(e.message);
            log.message = m[2];
            log.fileName = m[1];
            log.line = e.loc && e.loc.line - 1;
            log.column = e.loc && e.loc.column;
        } catch (e2) { }
        
        return file.error(log);
    }

    // 保存。
    file.content = result.code;
    if (result.map) {
        file.sourceMapObject = result.map;
    }
    file.ast = result.ast;
};
