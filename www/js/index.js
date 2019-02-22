/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/core/checker.js":
/*!****************************!*\
  !*** ./js/core/checker.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//  检查数独解决方案

function checkArray(array) {
  var len = array.length;
  var marks = new Array(len);
  marks.fill(true);

  for (var i = 0; i < len; i++) {
    if (!marks[i]) {
      continue;
    }

    var v = array[i];
    // 检查是否有效 0--无效 1-9--有效
    if (!v) {
      marks[i] = false;
      continue;
    }

    // 是否重复
    for (var j = i + 1; j < len; j++) {
      if (v === array[j]) {
        marks[i] = marks[j] = false;
      }
    }
  }
  return marks;
}

var Toolkit = __webpack_require__(/*! ./toolkit */ "./js/core/toolkit.js");

// 输入: matrix, 用户完成的数独数据: 9 × 9
// 处理: 对 matrix 的行、列、宫进行检查，并填写marks
// 输出: 检查是否成功、marks
module.exports = function () {
  function Checker(matrix) {
    _classCallCheck(this, Checker);

    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  _createClass(Checker, [{
    key: 'check',
    value: function check() {
      this.checkRows();
      this.checkCols();
      this.checkBoxes();

      // 检查是否成功
      this._success = this._matrixMarks.every(function (row) {
        return row.every(function (mark) {
          return mark;
        });
      });
      return this._success;
    }
  }, {
    key: 'checkRows',
    value: function checkRows() {
      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        var row = this._matrix[rowIndex];
        var marks = checkArray(row);

        for (var colIndex = 0; colIndex < marks.length; colIndex++) {
          if (!marks[colIndex]) {
            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'checkCols',
    value: function checkCols() {
      for (var colIndex = 0; colIndex < 9; colIndex++) {
        var cols = [];
        for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
          cols[rowIndex] = this._matrix[rowIndex][colIndex];
        }

        var marks = checkArray(cols);
        for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
          if (!marks[_rowIndex]) {
            this._matrixMarks[_rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'checkBoxes',
    value: function checkBoxes() {
      for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
        var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
        var marks = checkArray(boxes);

        for (var cellIndex = 0; cellIndex < marks.length; cellIndex++) {
          if (!marks[cellIndex]) {
            var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
                rowIndex = _Toolkit$box$convertF.rowIndex,
                colIndex = _Toolkit$box$convertF.colIndex;

            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'matrixMarks',
    get: function get() {
      return this._matrixMarks;
    }
  }, {
    key: 'isSuccess',
    get: function get() {
      return this._success;
    }
  }]);

  return Checker;
}();

/***/ }),

/***/ "./js/core/generator.js":
/*!******************************!*\
  !*** ./js/core/generator.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独解决方案

var Toolkit = __webpack_require__(/*! ./toolkit */ "./js/core/toolkit.js");

module.exports = function () {
  function Generator() {
    _classCallCheck(this, Generator);
  }

  _createClass(Generator, [{
    key: 'generate',
    value: function generate() {
      while (!this.internalGenerate()) {
        console.warn('try again');
      }
    }
  }, {
    key: 'internalGenerate',
    value: function internalGenerate() {
      this.matrix = Toolkit.matrix.makeMatrix();
      this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
        return row.map(function (v, i) {
          return i;
        });
      }).map(function (row) {
        return Toolkit.matrix.shuffle(row);
      });

      for (var n = 1; n <= 9; n++) {
        if (!this.fillNumber(n)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'fillNumber',
    value: function fillNumber(n) {
      return this.fillRow(n, 0);
    }
  }, {
    key: 'fillRow',
    value: function fillRow(n, rowIndex) {
      if (rowIndex > 8) {
        return true;
      }

      var row = this.matrix[rowIndex];
      var orders = this.orders[rowIndex];
      for (var i = 0; i < 9; i++) {
        var colIndex = orders[i];
        // 如果这个位置有值， 跳过
        if (row[colIndex]) {
          continue;
        }

        // 检查这个位置是否可以填 n
        if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
          continue;
        }

        row[colIndex] = n;

        // 去下一行填写， 如果填写失败， 寻找本行下一个
        if (!this.fillRow(n, rowIndex + 1)) {
          row[colIndex] = 0;
          continue;
        }

        return true;
      }
      return false;
    }
  }]);

  return Generator;
}();

/***/ }),

/***/ "./js/core/sodoku.js":
/*!***************************!*\
  !*** ./js/core/sodoku.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独游戏
// 1.生成完成的解决方案: Genreator
// 2.随机去除部分数据: 按比例

var Genreator = __webpack_require__(/*! ./generator */ "./js/core/generator.js");

module.exports = function () {
  function Soduku() {
    _classCallCheck(this, Soduku);

    // 生成完成的解决方案
    var genreator = new Genreator();
    genreator.generate();
    this.solutionMatrix = genreator.matrix;
  }

  _createClass(Soduku, [{
    key: 'make',
    value: function make() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

      // const shouldRid = Math.random() * 9 < level
      // 生成谜盘
      this.puzzleMatrix = this.solutionMatrix.map(function (row) {
        return row.map(function (cell) {
          return Math.random() * 9 < level ? 0 : cell;
        });
      });
    }
  }]);

  return Soduku;
}();

/***/ }),

/***/ "./js/core/toolkit.js":
/*!****************************!*\
  !*** ./js/core/toolkit.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 矩阵和数组相关工具
 */

var matrixToolKit = {
  makeRow: function makeRow() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var array = new Array(9);
    array.fill(v);
    return array;
  },
  makeMatrix: function makeMatrix() {
    var _this = this;

    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return Array.from({ length: 9 }, function () {
      return _this.makeRow(v);
    });
  },


  /**
  *  Fisher-Yates 洗牌算法
  * 对传入数组进行随机排序，然后把这个数组返回出来
  */
  shuffle: function shuffle(array) {
    var endIndex = array.length - 2;
    for (var i = 0; i <= endIndex; i++) {
      var j = i + Math.floor(Math.random() * (array.length - i));
      var _ref = [array[j], array[i]];
      array[i] = _ref[0];
      array[j] = _ref[1];
    }
    return array;
  },


  /**
   * 检查指定位置可以填写数字 n
   */
  checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
    var row = matrix[rowIndex];
    var column = this.makeRow().map(function (v, i) {
      return matrix[i][colIndex];
    });

    var _boxToolkit$converToB = boxToolkit.converToBoxIndex(rowIndex, colIndex),
        boxIndex = _boxToolkit$converToB.boxIndex;

    var box = boxToolkit.getBoxCells(matrix, boxIndex);

    for (var i = 0; i < 9; i++) {
      if (row[i] === n || column[i] === n || box[i] === n) {
        return false;
      }
    }
    return true;
  }
};

/**
 * 宫坐标系工具
 */
var boxToolkit = {
  getBoxCells: function getBoxCells(matrix, boxIndex) {
    var startRowIndex = Math.floor(boxIndex / 3) * 3;
    var startColIndex = boxIndex % 3 * 3;
    var result = [];
    for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
      var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      var colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }
    return result;
  },
  converToBoxIndex: function converToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },
  convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  }
};
// 工具集
module.exports = function () {
  function Toolkit() {
    _classCallCheck(this, Toolkit);
  }

  _createClass(Toolkit, null, [{
    key: "matrix",

    /**
     * 矩阵和数组相关的工具
     */
    get: function get() {
      return matrixToolKit;
    }

    /**
     * 宫坐标系相关的工具
     */

  }, {
    key: "box",
    get: function get() {
      return boxToolkit;
    }
  }]);

  return Toolkit;
}();

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _grid = __webpack_require__(/*! ./ui/grid.js */ "./js/ui/grid.js");

var _grid2 = _interopRequireDefault(_grid);

var _popupnumbers = __webpack_require__(/*! ./ui/popupnumbers.js */ "./js/ui/popupnumbers.js");

var _popupnumbers2 = _interopRequireDefault(_popupnumbers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grid = new _grid2.default($('#container'));
grid.build();
grid.layout();

var popupNumbers = new _popupnumbers2.default($('#popupNumbers'));
grid.bindPopup(popupNumbers);

$('#check').on('click', function (e) {
  if (grid.check()) {
    alert('成功');
  }
});
$('#reset').on('click', function (e) {
  grid.reset();
});
$('#clear').on('click', function (e) {
  grid.clear();
});
$('#rebuild').on('click', function (e) {
  grid.rebuild();
});

/***/ }),

/***/ "./js/ui/grid.js":
/*!***********************!*\
  !*** ./js/ui/grid.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Soduko = __webpack_require__(/*! ../core/sodoku */ "./js/core/sodoku.js");
var Checker = __webpack_require__(/*! ../core/checker */ "./js/core/checker.js");

var Grid = function () {
  function Grid(container) {
    _classCallCheck(this, Grid);

    this._$container = container;
  }

  _createClass(Grid, [{
    key: 'build',
    value: function build() {
      var soduko = new Soduko();
      soduko.make();
      var matrix = soduko.puzzleMatrix;
      // const generator = new Generator()
      // generator.generate()
      // const matrix = generator.matrix

      var rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
      var colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right'];

      var $cells = matrix.map(function (rowValues) {
        return rowValues.map(function (cellValue, colIndex) {
          return $('<span>').addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? 'fixed' : 'empty').text(cellValue);
        });
      });

      var $divArray = $cells.map(function ($spanArray, rowIndex) {
        return $('<div>').addClass('row').addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
      });

      this._$container.append($divArray);
    }
  }, {
    key: 'layout',
    value: function layout() {
      var width = $('span:first', this._$container).width();
      $('span', this._$container).height(width).css({
        'line-height': width + 'px',
        'font-size': width < 32 ? width / 2 + 'px' : ''
      });
    }

    /**
     * 检查用户解密的结果，
     * 如果成功则提示，
     * 失败则标记错误位置
     */

  }, {
    key: 'check',
    value: function check() {
      // 从页面获取需要检查的数据
      var $rows = this._$container.children();
      var data = $rows.map(function (rowIndex, div) {
        return $(div).children().map(function (colIndex, span) {
          return parseInt($(span).text()) || 0;
        });
      }).toArray().map(function ($data) {
        return $data.toArray();
      });

      var checker = new Checker(data);
      if (checker.check()) {
        return true;
      }

      // 检查不成功， 进行标记
      var marks = checker.matrixMarks;
      this._$container.children().each(function (rowIndex, div) {
        $(div).children().each(function (colIndex, span) {
          var $span = $(span);
          if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
            $span.removeClass('error');
          } else {
            $span.addClass('error');
          }
        });
      });
    }

    /**
     * 重置当前谜盘到初始状态
     */

  }, {
    key: 'reset',
    value: function reset() {
      this._$container.find('span:not(.fixed)').removeClass('error mark1 mark2').addClass('empty').text(0);
    }

    /**
     * 清理错误标记
     */

  }, {
    key: 'clear',
    value: function clear() {
      this._$container.find('span.error').removeClass('error');
    }

    /**
     * 重新开始一局新游戏
     */

  }, {
    key: 'rebuild',
    value: function rebuild() {
      this._$container.empty();
      this.build();
      this.layout();
    }
  }, {
    key: 'bindPopup',
    value: function bindPopup(popupNumbers) {
      this._$container.on('click', 'span', function (e) {
        var $cell = $(e.target);
        if ($cell.is('.fixed')) {
          return;
        }
        popupNumbers.popup($cell);
      });
    }
  }]);

  return Grid;
}();

module.exports = Grid;

/***/ }),

/***/ "./js/ui/popupnumbers.js":
/*!*******************************!*\
  !*** ./js/ui/popupnumbers.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 处理弹出的操作面板

module.exports = function () {
  function PopupNumbers($panel) {
    var _this = this;

    _classCallCheck(this, PopupNumbers);

    this._$panel = $panel.hide().removeClass('hidden');

    this._$panel.on('click', 'span', function (e) {
      var $cell = _this._$targetCell;

      var $span = $(e.target);
      if ($span.hasClass('mark1')) {
        // 回填样式
        if ($cell.hasClass('mark1')) {
          $cell.removeClass('mark1');
        } else {
          $cell.removeClass('mark2').addClass('mark1');
        }
      } else if ($span.hasClass('mark2')) {
        // 回填样式
        if ($cell.hasClass('mark2')) {
          $cell.removeClass('mark2');
        } else {
          $cell.removeClass('mark1').addClass('mark2');
        }
      } else if ($span.hasClass('empty')) {
        // 取消数字填写 取消mark
        $cell.text(0).addClass('empty');
      } else {
        // 1-9 回填数字
        $cell.removeClass('empty').text($span.text());
      }
      _this.hide();
    });
  }

  _createClass(PopupNumbers, [{
    key: 'popup',
    value: function popup($cell) {
      this._$targetCell = $cell;

      var _$cell$position = $cell.position(),
          left = _$cell$position.left,
          top = _$cell$position.top;

      this._$panel.css({
        left: left + 'px',
        top: top + 'px'
      }).show();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._$panel.hide();
    }
  }]);

  return PopupNumbers;
}();

/***/ })

/******/ });
//# sourceMappingURL=index.js.map