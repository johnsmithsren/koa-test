/**
 * 初始化报错信息
 */
'use strict';
const fs = require('fs');
const path = require('path');
let exception = function () {
    const file = path.join(__dirname, '/exception.json');
    const json = require(file);
    return json
}
module.exports = exception()