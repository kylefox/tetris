# Tetris!

A generic Tetris engine, in JavaScript, just for fun. The idea is to create a game engine that runs the logic while keeping the interface decoupled. I've no doubt solved some of the problems in a boneheaded fashion — suggestions & improvements welcome!

You can view a (probably outdated) demo at [tetris.kylefox.ca](http://tetris.kylefox.ca/).

## Setup

```bash
git clone git@github.com:kylefox/tetris.git
cd tetris
npm install
gulp
```

The `gulp` task watches, compiles, and runs a live-reload server at [http://localhost:9000/](http://localhost:9000/)

## Notes & Resources

* Tetris rules for [Super Rotation System](http://tetris.wikia.com/wiki/SRS)
* Gulp project based on [vintem/gulp-babel-demo](https://github.com/vintem/gulp-babel-demo)
* Some ideas inspired by [Javascript Tetris](http://codeincomplete.com/posts/2011/10/10/javascript_tetris/)


## License

The game, name, and all associated works of Tetris are owned and trademarked by [The Tetris Company.](http://tetris.com/)

This source code is released under The MIT License (MIT)

Copyright (c) 2016 Kyle Fox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
