#!/usr/bin/env node

const fs = require("fs");
const { program } = require('commander');
const yarmToJSON = require('yamljs');
const OBJECT_EXTEND = require("object-extend");

program.requiredOption('--files <files>', '文件列表用,隔开')
program.parse(process.argv);

let files = program.files.split(",");

let jsons = [];

for (let file of files) {
    let yarmContent = fs.readFileSync(file).toString();
    let json = yarmToJSON.parse(yarmContent);
    jsons.push(json);
}

let target = {};
for (let json of jsons) {
    OBJECT_EXTEND(target, json);
}

let propeties = deflate(target);

for (let property of propeties) {
    console.log(property)
}


function deflate (json, prefix) {
    let result = [];
    let keys = Object.keys(json);
    keys.forEach(function (key) {
        let _prefix;
        if (json[key] && typeof json[ key ] === 'object') {
            var _currPrefix = key.concat('.');
            _prefix = prefix ? prefix.concat(_currPrefix) : _currPrefix;
            result = result.concat(deflate(json[ key ], _prefix));
        } else {
            _prefix = prefix ? prefix.concat(key) : key;
            result.push(_prefix.concat('=').concat(json[ key ]));
        }
    });

    return result;
};