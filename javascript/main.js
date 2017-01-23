'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blocks = function () {
  function Blocks(width, height, ctx, drawBackground, callingClass) {
    _classCallCheck(this, Blocks);

    this.ctx = ctx;
    this.x = 3;
    this.y = -1;
    this.removeMe = false;
    this.setting = {
      width: width,
      height: height,
      cols: 4,
      rows: 4
    };
    this.drawBackground = drawBackground.bind(callingClass);
    this.id = Math.floor(Math.random() * Blocks.blockPatterns().length);
    this.pattern = this.newBlocks();
    this.setKeyEvent();
  }

  _createClass(Blocks, [{
    key: 'newBlocks',
    value: function newBlocks() {
      var pattern = [];
      for (var y = 0; y < this.setting.cols; y += 1) {
        pattern[y] = [];
        for (var x = 0; x < this.setting.rows; x += 1) {
          if (Blocks.blockPatterns()[this.id][y]) {
            pattern[y][x] = Blocks.blockPatterns()[this.id][y][x];
          } else {
            pattern[y][x] = 0;
          }
        }
      }
      return pattern;
    }
  }, {
    key: 'move',
    value: function move() {
      this.y += 1;
    }
  }, {
    key: 'draw',
    value: function draw() {
      for (var y = 0; y < this.setting.cols; y += 1) {
        for (var x = 0; x < this.setting.rows; x += 1) {
          this.drawBlock(this.x + x, this.y + y, this.pattern[y][x]);
        }
      }
    }
  }, {
    key: 'drawBlock',
    value: function drawBlock(x, y, block) {
      if (!block) {
        return;
      }
      this.ctx.fillRect(x * this.setting.width, y * this.setting.height, this.setting.width - 1, this.setting.height - 1);
      this.ctx.strokeRect(x * this.setting.width, y * this.setting.height, this.setting.width - 1, this.setting.height - 1);
    }
  }, {
    key: 'setKeyEvent',
    value: function setKeyEvent() {
      var _this = this;

      document.body.onkeydown = function (e) {
        switch (e.keyCode) {
          case 37:
            _this.x -= 1;
            break;
          case 39:
            _this.x += 1;
            break;
        }
        _this.drawBackground();
        _this.draw();
      };
    }
  }], [{
    key: 'blockPatterns',
    value: function blockPatterns() {
      var patterns = [[[1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 1, 0], [0, 1, 1, 0]], [[0, 1, 1, 0], [1, 1, 0, 0]], [[1, 1, 0, 0], [0, 1, 1, 0]], [[1, 0, 0, 0], [1, 1, 1, 0]], [[0, 0, 1, 0], [1, 1, 1, 0]], [[0, 1, 0, 0], [1, 1, 1, 0]]];
      return patterns;
    }
  }]);

  return Blocks;
}();

window.onload = function () {
  new Tetris('field');
};

var Tetris = function () {
  function Tetris(id) {
    _classCallCheck(this, Tetris);

    this.gameObjects = [];
    this.setting = {
      width: 300,
      height: 600,
      cols: 10,
      rows: 20
    };
    this.initCanvas(id);
    this.play();
  }

  _createClass(Tetris, [{
    key: 'initCanvas',
    value: function initCanvas(selector) {
      this.canvas = document.getElementById(selector);
      this.canvas.width = this.setting.width;
      this.canvas.height = this.setting.height;
      this.ctx = this.canvas.getContext('2d');
      this.drawBackground();
    }
  }, {
    key: 'play',
    value: function play() {
      var _this2 = this;

      setInterval(function () {
        var gameObjectsFresh = [];
        _this2.handleGame();
        _this2.drawBackground();
        _this2.gameObjects.forEach(function (gameObject) {
          gameObject.move();
          gameObject.draw();
          if (gameObject.removeMe === false) {
            gameObjectsFresh.push(gameObject);
          }
        });
        _this2.gameObjects = gameObjectsFresh;
      }, 500);
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#000';
      this.ctx.strokeRect(0, 0, this.setting.width, this.setting.height);
    }
  }, {
    key: 'handleGame',
    value: function handleGame() {
      if (this.gameObjects.length) {
        return;
      }
      var blocks = new Blocks(this.setting.width / this.setting.cols, this.setting.height / this.setting.rows, this.ctx, this.drawBackground, this);
      this.gameObjects.push(blocks);
    }
  }]);

  return Tetris;
}();