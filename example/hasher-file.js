var CryptoApi =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Rotate x to n bits left
 *
 * @param {number} x
 * @param {number} n
 * @returns {number}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
function rotateLeft(x, n) {
  return x << n | x >>> 32 - n | 0;
}

/**
 * Rotate x to n bits right
 * @param {number} x
 * @param {number} n
 * @returns {number}
 */
function rotateRight(x, n) {
  return x >>> n | x << 32 - n | 0;
}

/**
 * Rotate 64bit to n bits right and return hi
 *
 * @param {number} hi
 * @param {number} lo
 * @param {number} n
 * @returns {number}
 */
function rotateRight64hi(hi, lo, n) {
  if (n === 32) {
    return lo;
  }
  if (n > 32) {
    return rotateRight64hi(lo, hi, n - 32);
  }
  return (hi >>> n | lo << 32 - n) & 0xFFFFFFFF;
}

/**
 * Rotate 64bit to n bits right and return lo
 *
 * @param {number} hi
 * @param {number} lo
 * @param {number} n
 * @returns {number}
 */
function rotateRight64lo(hi, lo, n) {
  if (n === 32) {
    return hi;
  }
  if (n > 32) {
    return rotateRight64lo(lo, hi, n - 32);
  }
  return (lo >>> n | hi << 32 - n) & 0xFFFFFFFF;
}

exports.rotateLeft = rotateLeft;
exports.rotateRight = rotateRight;
exports.rotateRight64lo = rotateRight64lo;
exports.rotateRight64hi = rotateRight64hi;

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hasher = __webpack_require__(3);

var _hasher2 = _interopRequireDefault(_hasher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Hasher for 32 bit big endian blocks
 * @interface
 */
var Hasher32be = function (_Hasher) {
  _inherits(Hasher32be, _Hasher);

  /**
   * @param {Object} [options]
   */
  function Hasher32be(options) {
    _classCallCheck(this, Hasher32be);

    /**
     * Reverse order of bytes
     * @type {number}
     */
    var _this = _possibleConstructorReturn(this, (Hasher32be.__proto__ || Object.getPrototypeOf(Hasher32be)).call(this, options));

    _this.unitOrder = 1;
    /**
     * Current block (only for speed optimization)
     * @private
     * @type {number[]}
     */
    _this.blockUnits = [];
    return _this;
  }

  /**
   * Process ready blocks
   *
   * @protected
   */


  _createClass(Hasher32be, [{
    key: 'process',
    value: function process() {
      while (this.state.message.length >= this.blockSizeInBytes) {
        this.blockUnits = [];
        for (var b = 0; b < this.blockSizeInBytes; b += 4) {
          this.blockUnits.push(this.state.message.charCodeAt(b) << 24 | this.state.message.charCodeAt(b + 1) << 16 | this.state.message.charCodeAt(b + 2) << 8 | this.state.message.charCodeAt(b + 3));
        }
        this.state.message = this.state.message.substr(this.blockSizeInBytes);
        this.processBlock(this.blockUnits);
      }
    }

    /**
     * Process ready blocks
     *
     * @protected
     * @param {number[]} M
     */

  }, {
    key: 'processBlock',
    value: function processBlock(M) {}

    /**
     * Get hash from state
     *
     * @protected
     * @param {number} [size=this.state.hash.length] - Limit hash size (in chunks)
     * @returns {string}
     */

  }, {
    key: 'getStateHash',
    value: function getStateHash(size) {
      size = size || this.state.hash.length;
      var hash = '';
      for (var i = 0; i < size; i++) {
        hash += String.fromCharCode(this.state.hash[i] >> 24 & 0xff) + String.fromCharCode(this.state.hash[i] >> 16 & 0xff) + String.fromCharCode(this.state.hash[i] >> 8 & 0xff) + String.fromCharCode(this.state.hash[i] & 0xff);
      }
      return hash;
    }

    /**
     * Add to message cumulative size of message in bits
     *
     * @protected
     */

  }, {
    key: 'addLengthBits',
    value: function addLengthBits() {
      // @todo fix length to 64 bit
      this.state.message += "\x00\x00\x00\x00";
      var lengthBits = this.state.length << 3;
      for (var i = 3; i >= 0; i--) {
        this.state.message += String.fromCharCode(lengthBits >> (i << 3));
      }
    }
  }]);

  return Hasher32be;
}(_hasher2.default);

exports.default = Hasher32be;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Base hasher class
 * @interface
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hasher = function () {
  /**
   * @param {Object} options
   * @constructor
   */
  function Hasher(options) {
    _classCallCheck(this, Hasher);

    /**
     * Size of unit in bytes (4 = 32 bits)
     * @type {number}
     */
    this.unitSize = 4;
    /**
     * Bytes order in unit
     *   0 - normal
     *   1 - reverse
     * @type {number}
     */
    this.unitOrder = 0;
    /**
     * Size of block in units
     * @type {number}
     */
    this.blockSize = 16;
    /**
     * Size of block in bytes
     * @type {number}
     */
    this.blockSizeInBytes = this.blockSize * this.unitSize;
    /**
     * All algorithm variables that changed during process
     * @protected
     * @type {Object}
     * @property {string} state.message - Unprocessed Message
     * @property {number} state.length - Length of message
     */
    this.state = {};
    this.state.message = '';
    this.state.length = 0;
    /**
     * Options from initialization
     * @protected
     * @type {Object}
     */
    this.options = options || {};
  }

  /**
   * Reset hasher to initial state
   */


  _createClass(Hasher, [{
    key: 'reset',
    value: function reset() {
      this.state = {};
      this.constructor(this.options);
    }

    /**
     * Return current state
     *
     * @returns {Object}
     */

  }, {
    key: 'getState',
    value: function getState() {
      return JSON.parse(JSON.stringify(this.state));
    }

    /**
     * Set current state
     *
     * @param {Object} state
     */

  }, {
    key: 'setState',
    value: function setState(state) {
      this.state = state;
    }

    /**
     * Update message from binary string
     *
     * @param {string} message
     */

  }, {
    key: 'update',
    value: function update(message) {
      this.state.message += message;
      this.state.length += message.length;
      this.process();
    }

    /**
     * Process ready blocks
     *
     * @protected
     */

  }, {
    key: 'process',
    value: function process() {}

    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: 'finalize',
    value: function finalize() {
      return '';
    }

    /**
     * Get hash from state
     *
     * @protected
     * @param {number} [size=this.state.hash.length] - Limit hash size (in chunks)
     * @returns {string}
     */

  }, {
    key: 'getStateHash',
    value: function getStateHash(size) {
      return '';
    }

    /**
     * Add PKCS7 padding to message
     *
     * @protected
     * @param {number} length
     */

  }, {
    key: 'addPaddingPKCS7',
    value: function addPaddingPKCS7(length) {
      this.state.message += new Array(length + 1).join(String.fromCharCode(length));
    }

    /**
     * Add ISO7816 padding to message
     *
     * @protected
     * @param {number} length
     */

  }, {
    key: 'addPaddingISO7816',
    value: function addPaddingISO7816(length) {
      this.state.message += "\x80" + new Array(length).join("\x00");
    }

    /**
     * Add zero padding to message
     *
     * @protected
     * @param {number} length
     */

  }, {
    key: 'addPaddingZero',
    value: function addPaddingZero(length) {
      this.state.message += new Array(length + 1).join("\x00");
    }
  }]);

  return Hasher;
}();

exports.default = Hasher;

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sha = __webpack_require__(6);

var _sha2 = _interopRequireDefault(_sha);

var _hex = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sliceSize = 4096;

var fileElement = document.getElementById('file');
fileElement.addEventListener("change", function (e) {
  var file = e.target.files[0];
  var hasher = new _sha2.default();
  var fReader = new FileReader();
  var i = 0;
  var progress = document.getElementById('hash-progress');
  /**
   * @param {ProgressEvent|Event} evt
   */
  fReader.onloadend = function (evt) {
    if (evt.target.readyState === FileReader.DONE) {
      hasher.update(evt.target.result);
      var state = hasher.getState();
      document.getElementById('hash').innerHTML = (0, _hex.toHex)(hasher.finalize());

      progress.setAttribute('aria-valuenow', (Math.round(1000 * Math.min(i + sliceSize, file.size) / file.size) / 10).toString());
      progress.style.width = (Math.round(1000 * Math.min(i + sliceSize, file.size) / file.size) / 10).toString() + '%';
      progress.innerHTML = (Math.round(1000 * Math.min(i + sliceSize, file.size) / file.size) / 10).toString() + '%';
      hasher.setState(state);
      if (i < file.size) {
        i += sliceSize;
        var _blob = file.slice(i, Math.min(i + sliceSize, file.size));
        fReader.readAsBinaryString(_blob);
      } else {
        progress.setAttribute('class', progress.getAttribute('class').replace(/ active/, ''));
      }
    }
  };
  progress.setAttribute('class', progress.getAttribute('class') + ' active');
  var blob = file.slice(i, Math.min(i + sliceSize, file.size));
  fReader.readAsBinaryString(blob);
});

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Convert binary result of hash to hex
 *
 * @param {string} raw
 * @returns {string}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
function toHex(raw) {
  var str = '';
  for (var i = 0, l = raw.length; i < l; i++) {
    str += (raw.charCodeAt(i) < 16 ? '0' : '') + raw.charCodeAt(i).toString(16);
  }
  return str;
}

exports.toHex = toHex;

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hasher32be = __webpack_require__(1);

var _hasher32be2 = _interopRequireDefault(_hasher32be);

var _tools = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Transform constants
/** @type {number[]} */
var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

/**
 * Calculates [SHA256 (SHA224)](https://tools.ietf.org/html/rfc4634) hash
 *
 * @example <caption>Calculates SHA256 hash from string "message" - ES6 style</caption>
 * import Sha256 from "crypto-api/hasher/sha256";
 * import {toHex} from "crypto-api/encoder/hex";
 *
 * let hasher = new Sha256();
 * hasher.update('message');
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA256 hash from UTF string "message" - ES6 style</caption>
 * import Sha256 from "crypto-api/hasher/sha256";
 * import {toHex} from "crypto-api/encoder/hex";
 * import {fromUtf} from "crypto-api/encoder/utf";
 *
 * let hasher = new Sha256();
 * hasher.update(fromUtf('message'));
 * console.log(toHex(hasher.finalize()));
 *
 * @example <caption>Calculates SHA256 hash from string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   var hasher = CryptoApi.getHasher('sha256');
 *   hasher.update('message');
 *   console.log(CryptoApi.encoder.toHex(hasher.finalize()));
 * </script>
 *
 * @example <caption>Calculates SHA256 hash from UTF string "message" - ES5 style</caption>
 * <script src="https://nf404.github.io/crypto-api/crypto-api.min.js"></script>
 * <script>
 *   console.log(CryptoApi.hash('sha256', 'message'));
 * </script>
 */

var Sha256 = function (_Hasher32be) {
  _inherits(Sha256, _Hasher32be);

  /**
   * @param {Object} [options]
   * @param {number} [options.rounds=64] - Number of rounds (Must be greater than 16)
   * @param {number} [options.length=256] - Length of hash result
   *
   * | Hash type | Length |
   * |-----------|--------|
   * | sha224    | 224    |
   * | sha256    | 256    |
   */
  function Sha256(options) {
    _classCallCheck(this, Sha256);

    var _this = _possibleConstructorReturn(this, (Sha256.__proto__ || Object.getPrototypeOf(Sha256)).call(this, options));

    _this.options.length = _this.options.length || 256;
    _this.options.rounds = _this.options.rounds || 64;

    switch (_this.options.length) {
      case 224:
        _this.state.hash = [0xc1059ed8 | 0, 0x367cd507 | 0, 0x3070dd17 | 0, 0xf70e5939 | 0, 0xffc00b31 | 0, 0x68581511 | 0, 0x64f98fa7 | 0, 0xbefa4fa4 | 0];
        break;
      default:
        _this.state.hash = [0x6a09e667 | 0, 0xbb67ae85 | 0, 0x3c6ef372 | 0, 0xa54ff53a | 0, 0x510e527f | 0, 0x9b05688c | 0, 0x1f83d9ab | 0, 0x5be0cd19 | 0];
    }
    /**
     * Working variable (only for speed optimization)
     * @private
     * @ignore
     * @type {number[]}
     */
    _this.W = new Array(64);
    return _this;
  }

  /**
   * Process ready blocks
   *
   * @protected
   * @ignore
   * @param {number[]} block - Block
   */


  _createClass(Sha256, [{
    key: "processBlock",
    value: function processBlock(block) {
      // Working variables
      var a = this.state.hash[0] | 0;
      var b = this.state.hash[1] | 0;
      var c = this.state.hash[2] | 0;
      var d = this.state.hash[3] | 0;
      var e = this.state.hash[4] | 0;
      var f = this.state.hash[5] | 0;
      var g = this.state.hash[6] | 0;
      var h = this.state.hash[7] | 0;

      // Calculate hash
      for (var i = 0; i < this.options.rounds; i++) {
        if (i < 16) {
          this.W[i] = block[i] | 0;
        } else {
          this.W[i] = this.W[i - 16] + ((0, _tools.rotateRight)(this.W[i - 15], 7) ^ (0, _tools.rotateRight)(this.W[i - 15], 18) ^ this.W[i - 15] >>> 3) + this.W[i - 7] + ((0, _tools.rotateRight)(this.W[i - 2], 17) ^ (0, _tools.rotateRight)(this.W[i - 2], 19) ^ this.W[i - 2] >>> 10) | 0;
        }

        var t1 = h + ((0, _tools.rotateRight)(e, 6) ^ (0, _tools.rotateRight)(e, 11) ^ (0, _tools.rotateRight)(e, 25)) + (e & f ^ ~e & g) + K[i] + this.W[i] | 0;
        var t2 = ((0, _tools.rotateRight)(a, 2) ^ (0, _tools.rotateRight)(a, 13) ^ (0, _tools.rotateRight)(a, 22)) + (a & b ^ a & c ^ b & c) | 0;
        h = g;
        g = f;
        f = e;
        e = d + t1 | 0;
        d = c;
        c = b;
        b = a;
        a = t1 + t2 | 0;
      }

      this.state.hash[0] = this.state.hash[0] + a | 0;
      this.state.hash[1] = this.state.hash[1] + b | 0;
      this.state.hash[2] = this.state.hash[2] + c | 0;
      this.state.hash[3] = this.state.hash[3] + d | 0;
      this.state.hash[4] = this.state.hash[4] + e | 0;
      this.state.hash[5] = this.state.hash[5] + f | 0;
      this.state.hash[6] = this.state.hash[6] + g | 0;
      this.state.hash[7] = this.state.hash[7] + h | 0;
    }

    /**
     * Finalize hash and return result
     *
     * @returns {string}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      this.addPaddingISO7816(this.state.message.length < 56 ? 56 - this.state.message.length | 0 : 120 - this.state.message.length | 0);
      this.addLengthBits();
      this.process();
      return this.getStateHash(this.options.length / 32 | 0);
    }
  }]);

  return Sha256;
}(_hasher32be2.default);

exports.default = Sha256;

/***/ })

/******/ })["default"];