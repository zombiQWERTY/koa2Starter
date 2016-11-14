#!/usr/bin/env bash

(rimraf ./dist)
(yarn run compile)
(node ./dist/index.js)
