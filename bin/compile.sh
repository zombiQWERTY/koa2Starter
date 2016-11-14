#!/usr/bin/env bash

(babel --presets es2015-node5,stage-0 --plugins transform-runtime,syntax-async-functions,transform-class-properties ./src/ -d ./dist/)
(cp -r ./src/server/views ./dist/server)
(rm ./dist/index_dev.js)
