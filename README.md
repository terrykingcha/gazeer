# Gazeer - A cli for gaze. 

[![Build Status](https://travis-ci.org/schnittstabil/gazeer.svg?branch=master)](https://travis-ci.org/schnittstabil/gazeer)

**Watch some files, do some things**

## Feature

0. Support multiple patterns.
1. Support multiple commands in order.
2. High performance.

## Installation

```shell
$ npm install gazeer
```

## Usage

```shell
$ gazeer -p '**/*.js' -c 'babel $filepath' 

[src/index.js changes]

> babel src/index.js
```

### Multiple patterns

[gaze](https://github.com/shama/gaze#usage) accepts an array of patterns, so does `gazeer`:

```shell
$ gazeer -p '**/*.js' -p '!node_modules/**/*' -c 'babel $filepath'

[index.js changes]

> babel index.js
```

### Multiple commands

`gazeer` also accepets multiple commands, and there will run in order. Otherwise you can specify some replacement marks.

```shell
$ gazeer -p '**/*.js' -p '!node_modules/**/*' -c 'babel $filepath -o $dirname/../build/$basename' -c 'eslint $filepath'

[src/index.js changes]

> babel src/index.js -o src/../build/index.js
> eslint src/index.js
```


### Arbitrary watch tasks with npm run

If you haven't read substack's [post describing lightweight build steps
with `npm run`](http://substack.net/task_automation_with_npm_run), I'll
give you a moment to get up to speed.

Here's how you might use `gazeer` to run a build task every time a file
changes:

```javascript
{
  "scripts": {
    "lint": "eslint --fix --config .eslintrc *.js src/*.js",
    "watch-test": "./src/gazeer.js -p 'src/*.js' -c 'babel \"$filepath\" -o \"$dirname/../index.js\"' -c 'npm run lint'",
  }
}
```

And then start the watcher:

```shell
$ npm run watch-test
```

## Contributing

Bug reports and pull requests are welcome. Code should follow the existing style and pass lint.

To run lint: `npm run lint`.

## License

(The MIT License)

Copyright (c) 2016 Jin Bo (Terry King)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.