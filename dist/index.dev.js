var DrageeWidgets = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    return function () {
      var Super = _getPrototypeOf(Derived),
          result;

      if (_isNativeReflectConstruct()) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o) {
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var it,
        normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  function setStyle(element, style) {
    style = style || {};
    var cssText = '';

    for (var key in style) {
      if (style.hasOwnProperty(key)) {
        cssText += key + ': ' + style[key] + '; ';
      }
    }

    element.style.cssText = cssText;
  }

  function appendFirstChild(element, node) {
    if (element.firstChild) {
      element.insertBefore(node, element.firstChild);
    } else {
      element.appendChild(node);
    }
  }

  function createCanvas(area, rectagle) {
    var canvas = document.createElement('canvas');

    if (window.getComputedStyle(area).position === 'static') {
      area.style.position = 'relative';
    }

    canvas.setAttribute('width', rectagle.size.x + 'px');
    canvas.setAttribute('height', rectagle.size.y + 'px');
    setStyle(canvas, {
      position: 'absolute',
      left: rectagle.position.y + 'px',
      top: rectagle.position.y + 'px',
      width: rectagle.size.x + 'px',
      height: rectagle.size.y + 'px'
    });
    appendFirstChild(area, canvas);
    return canvas;
  }

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf$1(subClass, superClass);
  }

  function _getPrototypeOf$1(o) {
    _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$1(o);
  }

  function _setPrototypeOf$1(o, p) {
    _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$1(o, p);
  }

  function _isNativeReflectConstruct$1() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct$1()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf$1(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn$1(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$1(self);
  }

  function _createSuper$1(Derived) {
    return function () {
      var Super = _getPrototypeOf$1(Derived),
          result;

      if (_isNativeReflectConstruct$1()) {
        var NewTarget = _getPrototypeOf$1(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn$1(this, result);
    };
  }

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray$1(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit$1(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper$1(o) {
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray$1(o))) {
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var it,
        normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  function getSumValueOfStyleRules(element, rules) {
    return rules.reduce(function (sum, rule) {
      return sum + parseInt(window.getComputedStyle(element)[rule] || 0);
    }, 0);
  }
  /** Class representing a point. */


  var Point = /*#__PURE__*/function () {
    /**
    * Create a point.
    * @param {number} x - The x value.
    * @param {number} y - The y value.
    */
    function Point(x, y) {
      _classCallCheck$1(this, Point);

      this.x = x;
      this.y = y;
    }

    _createClass$1(Point, [{
      key: "add",
      value: function add(p) {
        return new Point(this.x + p.x, this.y + p.y);
      }
    }, {
      key: "sub",
      value: function sub(p) {
        return new Point(this.x - p.x, this.y - p.y);
      }
    }, {
      key: "mult",
      value: function mult(k) {
        return new Point(this.x * k, this.y * k);
      }
    }, {
      key: "negative",
      value: function negative() {
        return new Point(-this.x, -this.y);
      }
    }, {
      key: "compare",
      value: function compare(p) {
        return this.x === p.x && this.y === p.y;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new Point(this.x, this.y);
      }
    }, {
      key: "toString",
      value: function toString() {
        return "{x=".concat(this.x, ",y=").concat(this.y);
      }
    }], [{
      key: "elementOffset",
      value: function elementOffset(element, parent) {
        parent = parent || element.parentNode;
        var elementRect = element.getBoundingClientRect();
        var parentRect = parent.getBoundingClientRect();
        return new Point(elementRect.left - parentRect.left, elementRect.top - parentRect.top);
      }
    }, {
      key: "elementSize",
      value: function elementSize(element) {
        var isContentBoxSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var width = parseInt(window.getComputedStyle(element)['width']);
        var height = parseInt(window.getComputedStyle(element)['height']);

        if (!isContentBoxSize) {
          width += getSumValueOfStyleRules(element, ['padding-left', 'padding-right', 'border-left-width', 'border-right-width']);
          height += getSumValueOfStyleRules(element, ['padding-top', 'padding-bottom', 'border-top-width', 'border-bottom-width']);
        }

        return new Point(width, height);
      }
    }]);

    return Point;
  }();

  var Rectangle = /*#__PURE__*/function () {
    function Rectangle(position, size) {
      _classCallCheck$1(this, Rectangle);

      this.position = position;
      this.size = size;
    }

    _createClass$1(Rectangle, [{
      key: "getP1",
      value: function getP1() {
        return this.position;
      }
    }, {
      key: "getP2",
      value: function getP2() {
        return new Point(this.position.x + this.size.x, this.position.y);
      }
    }, {
      key: "getP3",
      value: function getP3() {
        return this.position.add(this.size);
      }
    }, {
      key: "getP4",
      value: function getP4() {
        return new Point(this.position.x, this.position.y + this.size.y);
      }
    }, {
      key: "getCenter",
      value: function getCenter() {
        return this.position.add(this.size.mult(0.5));
      }
    }, {
      key: "or",
      value: function or(rect) {
        var position = new Point(Math.min(this.position.x, rect.position.x), Math.min(this.position.y, rect.position.y));
        var size = new Point(Math.max(this.position.x + this.size.x, rect.position.x + rect.size.x), Math.max(this.position.y + this.size.y, rect.position.y + rect.size.y)).sub(position);
        return new Rectangle(position, size);
      }
    }, {
      key: "and",
      value: function and(rect) {
        var position = new Point(Math.max(this.position.x, rect.position.x), Math.max(this.position.y, rect.position.y));
        var size = new Point(Math.min(this.position.x + this.size.x, rect.position.x + rect.size.x), Math.min(this.position.y + this.size.y, rect.position.y + rect.size.y)).sub(position);

        if (size.x <= 0 || size.y <= 0) {
          return null;
        }

        return new Rectangle(position, size);
      }
    }, {
      key: "includePoint",
      value: function includePoint(p) {
        return !(this.position.x > p.x || this.position.x + this.size.x < p.x || this.position.y > p.y || this.position.y + this.size.y < p.y);
      }
    }, {
      key: "includeRectangle",
      value: function includeRectangle(rectangle) {
        return this.includePoint(rectangle.position) && this.includePoint(rectangle.getP3());
      }
    }, {
      key: "moveToBound",
      value: function moveToBound(rect, axis) {
        var selAxis, crossRectangle;

        if (axis) {
          selAxis = axis;
        } else {
          crossRectangle = this.and(rect);

          if (!crossRectangle) {
            return rect;
          }

          selAxis = crossRectangle.size.x > crossRectangle.size.y ? 'y' : 'x';
        }

        var thisCenter = this.getCenter();
        var rectCenter = rect.getCenter();
        var sign = thisCenter[selAxis] > rectCenter[selAxis] ? -1 : 1;
        var offset = sign > 0 ? this.position[selAxis] + this.size[selAxis] - rect.position[selAxis] : this.position[selAxis] - (rect.position[selAxis] + rect.size[selAxis]);
        rect.position[selAxis] = rect.position[selAxis] + offset;
        return rect;
      }
    }, {
      key: "getSquare",
      value: function getSquare() {
        return this.size.x * this.size.y;
      }
    }, {
      key: "styleApply",
      value: function styleApply(el) {
        el = el || document.querySelector('ind');
        el.style.left = this.position.x + 'px';
        el.style.top = this.position.y + 'px';
        el.style.width = this.size.x + 'px';
        el.style.height = this.size.y + 'px';
      }
    }, {
      key: "growth",
      value: function growth(size) {
        this.size = this.size.add(size);
        this.position = this.position.add(size.mult(-0.5));
      }
    }, {
      key: "getMinSide",
      value: function getMinSide() {
        return Math.min(this.size.x, this.size.y);
      }
    }], [{
      key: "fromElement",
      value: function fromElement(element) {
        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : element.parentNode;
        var isContentBoxSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var isConsiderTranslate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var position = Point.elementOffset(element, parent, isConsiderTranslate);
        var size = Point.elementSize(element, isContentBoxSize);
        return new Rectangle(position, size);
      }
    }]);

    return Rectangle;
  }();

  function hasClass(element, c) {
    var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
    return re.test(element.className);
  }
  function addClass(element, c) {
    if (!hasClass(element, c)) {
      element.className = (element.className + ' ' + c).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
    }
  }
  function removeClass(element, c) {
    var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
    element.className = element.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
  }

  function getDefaultContainer(element) {
    var container = element.parentNode;

    while (container.parentNode && window.getComputedStyle(container)['position'] === 'static' && container.tagName !== 'BODY') {
      container = container.parentNode;
    }

    return container;
  }

  var EventEmitter = /*#__PURE__*/function () {
    function EventEmitter() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$1(this, EventEmitter);

      this.events = {};

      if (options && options.on) {
        for (var _i = 0, _Object$entries = Object.entries(options.on); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray$1(_Object$entries[_i], 2),
              eventName = _Object$entries$_i[0],
              fn = _Object$entries$_i[1];

          this.on(eventName, fn);
        }
      }
    }

    _createClass$1(EventEmitter, [{
      key: "emit",
      value: function emit(eventName) {
        this.interrupted = false;
        var args = [].slice.call(arguments, 1);
        if (!this.events[eventName]) return;

        var _iterator = _createForOfIteratorHelper$1(this.events[eventName]),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var func = _step.value;
            func.apply(void 0, _toConsumableArray$1(args));

            if (this.interrupted) {
              return;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "interrupt",
      value: function interrupt() {
        this.interrupted = true;
      }
    }, {
      key: "on",
      value: function on(eventName, fn) {
        if (!this.events[eventName]) {
          this.events[eventName] = [];
        }

        this.events[eventName].push(fn);
      }
    }, {
      key: "prependOn",
      value: function prependOn(eventName, fn) {
        if (!this.events[eventName]) {
          this.events[eventName] = [];
        }

        this.events[eventName].unshift(fn);
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe(eventName, fn) {
        if (this.events[eventName]) {
          var index = this.events[eventName].indexOf(fn);
          this.events[eventName].splice(index, 1);
        }
      }
    }, {
      key: "resetEmitter",
      value: function resetEmitter() {
        this.events = {};
      }
    }, {
      key: "resetOn",
      value: function resetOn(eventName) {
        this.events[eventName] = [];
      }
    }]);

    return EventEmitter;
  }();

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var getStyleProperty = createCommonjsModule(function (module, exports) {
  /*!
   * getStyleProperty v1.0.4
   * original by kangax
   * http://perfectionkills.com/feature-testing-css-properties/
   * MIT license
   */

  /*jshint browser: true, strict: true, undef: true */
  /*global define: false, exports: false, module: false */

  ( function( window ) {

  var prefixes = 'Webkit Moz ms Ms O'.split(' ');
  var docElemStyle = document.documentElement.style;

  function getStyleProperty( propName ) {
    if ( !propName ) {
      return;
    }

    // test standard property first
    if ( typeof docElemStyle[ propName ] === 'string' ) {
      return propName;
    }

    // capitalize
    propName = propName.charAt(0).toUpperCase() + propName.slice(1);

    // test vendor specific properties
    var prefixed;
    for ( var i=0, len = prefixes.length; i < len; i++ ) {
      prefixed = prefixes[i] + propName;
      if ( typeof docElemStyle[ prefixed ] === 'string' ) {
        return prefixed;
      }
    }
  }

  // transport
  {
    // CommonJS for Component
    module.exports = getStyleProperty;
  }

  })();
  });

  function getDistance(p1, p2) {
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function transformedSpaceDistanceFactory(options) {
    return function (p1, p2) {
      return Math.sqrt(Math.pow(options.x * Math.abs(p1.x - p2.x), 2) + Math.pow(options.y * Math.abs(p1.y - p2.y), 2));
    };
  }
  function indexOfNearestPoint(arr, val, radius) {
    var getDistanceFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getDistance;
    var size,
        index = 0,
        i,
        temp;

    if (arr.length === 0) {
      return -1;
    }

    size = getDistanceFunc(arr[0], val);

    for (i = 0; i < arr.length; i++) {
      temp = getDistanceFunc(arr[i], val);

      if (temp < size) {
        size = temp;
        index = i;
      }
    }

    if (radius >= 0 && size > radius) {
      return -1;
    }

    return index;
  }

  function directCrossing(L1P1, L1P2, L2P1, L2P2) {
    var temp, k1, k2, b1, b2, x, y;

    if (L2P1.x === L2P2.x) {
      temp = L2P1;
      L2P1 = L1P1;
      L1P1 = temp;
      temp = L2P2;
      L2P2 = L1P2;
      L1P2 = temp;
    }

    if (L1P1.x === L1P2.x) {
      k2 = (L2P2.y - L2P1.y) / (L2P2.x - L2P1.x);
      b2 = (L2P2.x * L2P1.y - L2P1.x * L2P2.y) / (L2P2.x - L2P1.x);
      x = L1P1.x;
      y = x * k2 + b2;
      return new Point(x, y);
    } else {
      k1 = (L1P2.y - L1P1.y) / (L1P2.x - L1P1.x);
      b1 = (L1P2.x * L1P1.y - L1P1.x * L1P2.y) / (L1P2.x - L1P1.x);
      k2 = (L2P2.y - L2P1.y) / (L2P2.x - L2P1.x);
      b2 = (L2P2.x * L2P1.y - L2P1.x * L2P2.y) / (L2P2.x - L2P1.x);
      x = (b1 - b2) / (k2 - k1);
      y = x * k1 + b1;
      return new Point(x, y);
    }
  }
  function boundToLine(A, B, P) {
    var AP = new Point(P.x - A.x, P.y - A.y),
        AB = new Point(B.x - A.x, B.y - A.y),
        ab2 = AB.x * AB.x + AB.y * AB.y,
        ap_ab = AP.x * AB.x + AP.y * AB.y,
        t = ap_ab / ab2;
    return new Point(A.x + AB.x * t, A.y + AB.y * t);
  }
  function getPointOnLineByLenght(LP1, LP2, lenght) {
    var dx = LP2.x - LP1.x;
    var dy = LP2.y - LP1.y;
    var percent = lenght / getDistance(LP1, LP2);
    return new Point(LP1.x + percent * dx, LP1.y + percent * dy);
  }
  function addPointToBoundPoints(boundpoints, point, isRight) {
    var result = boundpoints.filter(function (bPoint) {
      return bPoint.y > point.y || (isRight ? bPoint.x < point.x : bPoint.x > point.x);
    });

    for (var i = 0; i < result.length; i++) {
      if (point.y < result[i].y) {
        result.splice(i, 0, point);
        return result;
      }
    }

    result.push(point);
    return result;
  }

  function getAngleDiff(alpha, beta) {
    var minAngle = Math.min(alpha, beta);
    var maxAngle = Math.max(alpha, beta);
    return Math.min(maxAngle - minAngle, minAngle + Math.PI * 2 - maxAngle);
  }
  function getAngle(p1, p2) {
    var diff = p2.sub(p1);
    return normalizeAngle(Math.atan2(diff.y, diff.x));
  }
  function boundAngle(min, max, val) {
    var dmin, dmax;

    if (min < max && val > min && val < max) {
      return val;
    } else if (max < min && (val < max || val > min)) {
      return val;
    } else {
      dmin = getAngleDiff(min, val);
      dmax = getAngleDiff(max, val);

      if (dmin < dmax) {
        return min;
      } else {
        return max;
      }
    }
  }
  function normalizeAngle(val) {
    while (val < 0) {
      val += 2 * Math.PI;
    }

    while (val > 2 * Math.PI) {
      val -= 2 * Math.PI;
    }

    return val;
  }
  function getPointFromRadialSystem(angle, length, center) {
    center = center || new Point(0, 0);
    return center.add(new Point(length * Math.cos(angle), length * Math.sin(angle)));
  }

  var Bound = /*#__PURE__*/function () {
    function Bound() {
      _classCallCheck$1(this, Bound);
    }

    _createClass$1(Bound, [{
      key: "bound",
      value: function bound(point, _size) {
        return point;
      }
    }, {
      key: "refresh",
      value: function refresh() {}
    }], [{
      key: "bounding",
      value: function bounding() {
        var instance = _construct(this, Array.prototype.slice.call(arguments));

        return instance.bound.bind(instance);
      }
    }]);

    return Bound;
  }();
  var BoundToRectangle = /*#__PURE__*/function (_Bound) {
    _inherits$1(BoundToRectangle, _Bound);

    var _super = _createSuper$1(BoundToRectangle);

    function BoundToRectangle(rectangle) {
      var _this;

      _classCallCheck$1(this, BoundToRectangle);

      _this = _super.call(this);
      _this.rectangle = rectangle;
      return _this;
    }

    _createClass$1(BoundToRectangle, [{
      key: "bound",
      value: function bound(point, size) {
        var calcPoint = point.clone();
        var rectP2 = this.rectangle.getP3();

        if (this.rectangle.position.x > calcPoint.x) {
          calcPoint.x = this.rectangle.position.x;
        }

        if (this.rectangle.position.y > calcPoint.y) {
          calcPoint.y = this.rectangle.position.y;
        }

        if (rectP2.x < calcPoint.x + size.x) {
          calcPoint.x = rectP2.x - size.x;
        }

        if (rectP2.y < calcPoint.y + size.y) {
          calcPoint.y = rectP2.y - size.y;
        }

        return calcPoint;
      }
    }]);

    return BoundToRectangle;
  }(Bound);
  var BoundToElement = /*#__PURE__*/function (_BoundToRectangle) {
    _inherits$1(BoundToElement, _BoundToRectangle);

    var _super2 = _createSuper$1(BoundToElement);

    function BoundToElement(element, container) {
      var _this2;

      _classCallCheck$1(this, BoundToElement);

      _this2 = _super2.call(this, Rectangle.fromElement(element, container));
      _this2.element = element;
      _this2.container = container;
      return _this2;
    }

    _createClass$1(BoundToElement, [{
      key: "refresh",
      value: function refresh() {
        this.rectangle = Rectangle.fromElement(this.element, this.container);
      }
    }]);

    return BoundToElement;
  }(BoundToRectangle);
  var BoundToLine = /*#__PURE__*/function (_Bound4) {
    _inherits$1(BoundToLine, _Bound4);

    var _super5 = _createSuper$1(BoundToLine);

    function BoundToLine(startPoint, endPoint) {
      var _this5;

      _classCallCheck$1(this, BoundToLine);

      _this5 = _super5.call(this);
      _this5.startPoint = startPoint;
      _this5.endPoint = endPoint;
      var alpha = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
      var beta = alpha + Math.PI / 2;
      _this5.someK = 10;
      _this5.cosBeta = Math.cos(beta);
      _this5.sinBeta = Math.sin(beta);
      return _this5;
    }

    _createClass$1(BoundToLine, [{
      key: "bound",
      value: function bound(point, size) {
        var point2 = new Point(point.x + this.someK * this.cosBeta, point.y + this.someK * this.sinBeta);
        var newEndPoint = getPointOnLineByLenght(this.endPoint, this.startPoint, size.x);
        var pointCrossing = directCrossing(this.startPoint, this.endPoint, point, point2);
        return boundToLine(this.startPoint, newEndPoint, pointCrossing);
      }
    }]);

    return BoundToLine;
  }(Bound);
  var BoundToCircle = /*#__PURE__*/function (_Bound5) {
    _inherits$1(BoundToCircle, _Bound5);

    var _super6 = _createSuper$1(BoundToCircle);

    function BoundToCircle(center, radius) {
      var _this6;

      _classCallCheck$1(this, BoundToCircle);

      _this6 = _super6.call(this);
      _this6.center = center;
      _this6.radius = radius;
      return _this6;
    }

    _createClass$1(BoundToCircle, [{
      key: "bound",
      value: function bound(point, _size) {
        return getPointOnLineByLenght(this.center, point, this.radius);
      }
    }]);

    return BoundToCircle;
  }(Bound);
  var BoundToArc = /*#__PURE__*/function (_BoundToCircle) {
    _inherits$1(BoundToArc, _BoundToCircle);

    var _super7 = _createSuper$1(BoundToArc);

    function BoundToArc(center, radius, startAngle, endAngle) {
      var _this7;

      _classCallCheck$1(this, BoundToArc);

      _this7 = _super7.call(this, center, radius);
      _this7._startAngle = startAngle;
      _this7._endAngle = endAngle;
      return _this7;
    }

    _createClass$1(BoundToArc, [{
      key: "startAngle",
      value: function startAngle() {
        return typeof this._startAngle === 'function' ? this._startAngle() : this._startAngle;
      }
    }, {
      key: "endAngle",
      value: function endAngle() {
        return typeof this._endAngle === 'function' ? this._endAngle() : this._endAngle;
      }
    }, {
      key: "bound",
      value: function bound(point, _size) {
        var angle = getAngle(this.center, point);
        angle = normalizeAngle(angle);
        angle = boundAngle(this.startAngle(), this.endAngle(), angle);
        return getPointFromRadialSystem(angle, this.radius, this.center);
      }
    }]);

    return BoundToArc;
  }(BoundToCircle);

  function removeItem (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === val) {
        array.splice(i, 1);
        i--;
      }
    }

    return array;
  }

  function range(start, stop, step) {
    var result = [];

    if (typeof stop === 'undefined') {
      stop = start;
      start = 0;
    }

    if (typeof step === 'undefined') {
      step = 1;
    }

    if (step > 0 && start >= stop || step < 0 && start <= stop) {
      return [];
    }

    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  }

  var BasicStrategy = /*#__PURE__*/function () {
    function BasicStrategy(rectangle) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck$1(this, BasicStrategy);

      this.rectangle = rectangle;
      this.options = options;
    }

    _createClass$1(BasicStrategy, [{
      key: "boundRect",
      get: function get() {
        return typeof this.rectangle === 'function' ? this.rectangle() : this.rectangle;
      }
    }]);

    return BasicStrategy;
  }();

  var FloatLeftStrategy = /*#__PURE__*/function (_BasicStrategy2) {
    _inherits$1(FloatLeftStrategy, _BasicStrategy2);

    var _super2 = _createSuper$1(FloatLeftStrategy);

    function FloatLeftStrategy(rectangle) {
      var _this2;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck$1(this, FloatLeftStrategy);

      _this2 = _super2.call(this, rectangle, options);
      _this2.options = Object.assign({
        removable: true
      }, options);
      _this2.radius = options.radius || 80;
      _this2.paddingTopLeft = options.paddingTopLeft || new Point(0, 0);
      _this2.paddingBottomRight = options.paddingBottomRight || new Point(0, 0);
      _this2.yGapBetweenDraggables = options.yGapBetweenDraggables || 0;
      _this2.getDistance = options.getDistance || getDistance;

      _this2.getPosition = options.getPosition || function (draggable) {
        return draggable.position;
      };

      return _this2;
    }

    _createClass$1(FloatLeftStrategy, [{
      key: "positioning",
      value: function positioning(rectangleList, _indexesOfNews) {
        var _this3 = this;

        var boundRect = this.boundRect;
        var rectP2 = boundRect.getP2();
        var boundaryPoints = [boundRect.position];
        rectangleList.forEach(function (rect, rectIndex) {
          var position,
              isValid = false;

          for (var i = 0; i < boundaryPoints.length; i++) {
            position = new Point(boundaryPoints[i].x + _this3.paddingTopLeft.x, i > 0 ? boundaryPoints[i - 1].y + _this3.yGapBetweenDraggables : boundRect.position.y + _this3.paddingTopLeft.y);
            isValid = position.x + rect.size.x < rectP2.x;

            if (isValid) {
              break;
            }
          }

          if (!isValid) {
            position = new Point(boundRect.position.x + _this3.paddingTopLeft.x, boundaryPoints[boundaryPoints.length - 1].y + (rectIndex > 0 ? _this3.yGapBetweenDraggables : _this3.paddingTopLeft.y));
          }

          rect.position = position;

          if (_this3.options.removable && rect.getP3().y > boundRect.getP3().y) {
            rect.removable = true;
          }

          boundaryPoints = addPointToBoundPoints(boundaryPoints, rect.getP3().add(_this3.paddingBottomRight));
        });
        return rectangleList;
      }
    }, {
      key: "sorting",
      value: function sorting(odlDraggablesList, newDraggables, indexOfNews) {
        var _this4 = this;

        var newList = odlDraggablesList.concat();
        var listOldPosition = odlDraggablesList.map(function (draggable) {
          return draggable.getPosition();
        });
        newDraggables.forEach(function (newDraggable) {
          var index = indexOfNearestPoint(listOldPosition, _this4.getPosition(newDraggable), _this4.radius, _this4.getDistance);

          if (index === -1) {
            index = newList.length;
          } else {
            index = newList.indexOf(odlDraggablesList[index]);
          }

          newList.splice(index, 0, newDraggable);
        });
        newDraggables.forEach(function (newDraggable) {
          indexOfNews.push(newList.indexOf(newDraggable));
        });
        return newList;
      }
    }]);

    return FloatLeftStrategy;
  }(BasicStrategy);

  var addToDefaultScope = function addToDefaultScope(target) {
    defaultScope.addTarget(target);
  };

  var Target = /*#__PURE__*/function (_EventEmitter) {
    _inherits$1(Target, _EventEmitter);

    var _super = _createSuper$1(Target);

    function Target(element, draggables) {
      var _this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck$1(this, Target);

      _this = _super.call(this, options);

      var target = _assertThisInitialized$1(_this);

      _this.options = Object.assign({
        timeEnd: 200,
        timeExcange: 400
      }, options);
      _this.positioningStrategy = options.strategy || new FloatLeftStrategy(_this.getRectangle.bind(_assertThisInitialized$1(_this)), {
        radius: 80,
        getDistance: transformedSpaceDistanceFactory({
          x: 1,
          y: 4
        }),
        removable: true
      });
      _this.element = element;
      draggables.forEach(function (draggable) {
        return draggable.targets.push(target);
      });
      _this.draggables = draggables;
      Target.emitter.emit('target:create', _assertThisInitialized$1(_this));

      _this.startBounding();

      _this.init();

      return _this;
    }

    _createClass$1(Target, [{
      key: "startBounding",
      value: function startBounding() {
        this.bound = this.options.bound || BoundToElement.bounding(this.element);
      }
    }, {
      key: "positioning",
      value: function positioning(draggables, indexesOfNew) {
        return this.positioningStrategy.positioning(draggables, indexesOfNew);
      }
    }, {
      key: "sorting",
      value: function sorting(oldDraggables, newDraggables, indexOfNews) {
        return this.positioningStrategy.sorting(oldDraggables, newDraggables, indexOfNews);
      }
    }, {
      key: "init",
      value: function init() {
        var _this2 = this;

        var rectangles, indexesOfNew;
        this.innerDraggables = this.draggables.filter(function (draggable) {
          var element = draggable.element.parentNode;

          while (element) {
            if (element === _this2.element) {
              return true;
            }

            element = element.parentNode;
          }

          return false;
        });

        if (this.innerDraggables.length) {
          indexesOfNew = range(this.innerDraggables.length);
          rectangles = this.positioning(this.innerDraggables.map(function (draggable) {
            return draggable.getRectangle();
          }), indexesOfNew);
          this.setPosition(rectangles, indexesOfNew);
          this.innerDraggables.forEach(function (draggable) {
            return _this2.emit('target:add', draggable);
          });
        }
      }
    }, {
      key: "getRectangle",
      value: function getRectangle() {
        return Rectangle.fromElement(this.element, this.container, this.options.isContentBoxSize, true);
      }
    }, {
      key: "catchDraggable",
      value: function catchDraggable(draggable) {
        if (this.options.catchDraggable) {
          return this.options.catchDraggable(this, draggable);
        } else {
          var targetRectangle = this.getRectangle();
          var draggableSquare = draggable.getRectangle().getSquare();
          return draggableSquare < targetRectangle.getSquare() && targetRectangle.includePoint(draggable.getCenter());
        }
      }
    }, {
      key: "getPosition",
      value: function getPosition() {
        return this.getRectangle().position;
      }
    }, {
      key: "getSize",
      value: function getSize() {
        return this.getRectangle().size;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this3 = this;

        scopes.forEach(function (scope) {
          return removeItem(scope.targets, _this3);
        });
      }
    }, {
      key: "refresh",
      value: function refresh() {
        var rectangles = this.positioning(this.innerDraggables.map(function (draggable) {
          return draggable.getRectangle();
        }), []);
        this.setPosition(rectangles, [], 0);
      }
    }, {
      key: "onEnd",
      value: function onEnd(draggable) {
        var newDraggablesIndex = [];

        if (this.getRectangle().includePoint(draggable.getCenter())) {
          draggable.position = this.bound(draggable.position, draggable.getSize());
        } else {
          return false;
        }

        this.emit('target:beforeAdd', draggable);
        this.innerDraggables = this.sorting(this.innerDraggables, [draggable], newDraggablesIndex);
        var rectangles = this.positioning(this.innerDraggables.map(function (draggable) {
          return draggable.getRectangle();
        }), newDraggablesIndex);
        this.setPosition(rectangles, newDraggablesIndex);

        if (this.innerDraggables.indexOf(draggable) !== -1) {
          this.addRemoveOnMove(draggable);
        }

        return true;
      }
    }, {
      key: "setPosition",
      value: function setPosition(rectangles, indexesOfNew, time) {
        var _this4 = this;

        this.innerDraggables.slice(0).forEach(function (draggable, i) {
          var rect = rectangles[i],
              timeEnd = time || time === 0 ? time : indexesOfNew.indexOf(i) !== -1 ? _this4.options.timeEnd : _this4.options.timeExcange;

          if (rect.removable) {
            draggable.move(draggable.initialPosition, timeEnd, true, true);
            removeItem(_this4.innerDraggables, draggable);

            _this4.emit('target:remove', draggable);
          } else {
            draggable.move(rect.position, timeEnd, true, true);
          }
        });
      }
    }, {
      key: "add",
      value: function add(draggable, time) {
        var newDraggablesIndex = this.innerDraggables.length;
        this.emit('target:beforeAdd', draggable);
        this.pushInnerDraggable(draggable);
        var rectangles = this.positioning(this.innerDraggables.map(function (draggable) {
          return draggable.getRectangle();
        }), newDraggablesIndex, draggable);
        this.setPosition(rectangles, [newDraggablesIndex], time || 0);

        if (this.innerDraggables.indexOf(draggable) !== -1) {
          this.addRemoveOnMove(draggable);
        }
      }
    }, {
      key: "pushInnerDraggable",
      value: function pushInnerDraggable(draggable) {
        if (this.innerDraggables.indexOf(draggable) === -1) {
          this.innerDraggables.push(draggable);
        }
      }
    }, {
      key: "addRemoveOnMove",
      value: function addRemoveOnMove(draggable) {
        var _this5 = this;

        draggable.on('drag:move', this.removeHandler = function () {
          _this5.remove(draggable);
        });
        this.emit('target:add', draggable);
      }
    }, {
      key: "remove",
      value: function remove(draggable) {
        draggable.unsubscribe('drag:move', this.removeHandler);
        var index = this.innerDraggables.indexOf(draggable);

        if (index === -1) {
          return;
        }

        this.innerDraggables.splice(index, 1);
        var rectangles = this.positioning(this.innerDraggables.map(function (draggable) {
          return draggable.getRectangle();
        }), []);
        this.setPosition(rectangles, []);
        this.emit('target:remove', draggable);
      }
    }, {
      key: "reset",
      value: function reset() {
        var _this6 = this;

        this.innerDraggables.forEach(function (draggable) {
          draggable.move(draggable.initialPosition, 0, true, true);

          _this6.emit('target:remove', draggable);
        });
        this.innerDraggables = [];
      }
    }, {
      key: "getSortedDraggables",
      value: function getSortedDraggables() {
        this.innerDraggables.slice();
      }
    }, {
      key: "container",
      get: function get() {
        return this._container = this._container || this.options.container || this.options.parent || getDefaultContainer(this.element);
      }
    }]);

    return Target;
  }(EventEmitter);
  Target.emitter = new EventEmitter();
  Target.emitter.on('target:create', addToDefaultScope);

  var scopes = [];

  var Scope = /*#__PURE__*/function (_EventEmitter) {
    _inherits$1(Scope, _EventEmitter);

    var _super = _createSuper$1(Scope);

    function Scope(draggables, targets) {
      var _this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck$1(this, Scope);

      _this = _super.call(this, options);
      scopes.forEach(function (scope) {
        if (draggables) {
          draggables.forEach(function (draggable) {
            removeItem(scope.draggables, draggable);
          });
        }

        if (targets) {
          targets.forEach(function (target) {
            removeItem(scope.targets, target);
          });
        }
      });
      _this.draggables = draggables || [];
      _this.targets = targets || [];
      scopes.push(_assertThisInitialized$1(_this));
      _this.options = {
        timeEnd: options.timeEnd || 400
      };

      _this.init();

      return _this;
    }

    _createClass$1(Scope, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.draggables.forEach(function (draggable) {
          draggable.dragEndAction = function () {
            return _this2.onEnd(draggable);
          };
        });
      }
    }, {
      key: "addDraggable",
      value: function addDraggable(draggable) {
        var _this3 = this;

        this.draggables.push(draggable);

        draggable.dragEndAction = function () {
          return _this3.onEnd(draggable);
        };
      }
    }, {
      key: "addTarget",
      value: function addTarget(target) {
        this.targets.push(target);
      }
    }, {
      key: "onEnd",
      value: function onEnd(draggable) {
        var shotTargets = this.targets.filter(function (target) {
          return target.draggables.indexOf(draggable) !== -1;
        }).filter(function (target) {
          return target.catchDraggable(draggable);
        }).sort(function (a, b) {
          return a.getRectangle().getSquare() - b.getRectangle().getSquare();
        });

        if (shotTargets.length) {
          shotTargets[0].onEnd(draggable);
        } else if (draggable.targets.length) {
          draggable.pinPosition(draggable.initialPosition, this.options.timeEnd);
        }

        this.emit('scope:change');
      }
    }, {
      key: "reset",
      value: function reset() {
        this.targets.forEach(function (target) {
          return target.reset();
        });
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.draggables.forEach(function (draggable) {
          return draggable.refresh();
        });
        this.targets.forEach(function (target) {
          return target.refresh();
        });
      }
    }, {
      key: "positions",
      get: function get() {
        var _this4 = this;

        return this.targets.map(function (target) {
          return target.innerDraggables.map(function (draggable) {
            return _this4.draggables.indexOf(draggable);
          });
        });
      },
      set: function set(positions) {
        var _this5 = this;

        var message = 'wrong array length';

        if (positions.length === this.targets.length) {
          this.targets.forEach(function (target) {
            return target.reset();
          });
          positions.forEach(function (targetIndexes, i) {
            targetIndexes.forEach(function (index) {
              _this5.targets[i].add(_this5.draggables[index]);
            });
          });
        } else {
          throw message;
        }
      }
    }]);

    return Scope;
  }(EventEmitter);

  var defaultScope = new Scope();

  var isTouch = ('ontouchstart' in window);
  var mouseEvents = {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup'
  };
  var touchEvents = {
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend'
  };
  var draggables = [];
  var transformProperty = getStyleProperty('transform');
  var transitionProperty = getStyleProperty('transition');

  function getTouchByID(element, touchId) {
    for (var i = 0; i < element.changedTouches.length; i++) {
      if (element.changedTouches[i].identifier === touchId) {
        return element.changedTouches[i];
      }
    }

    return false;
  }

  function preventDoubleInit(draggable) {
    var message = "for this element Dragee.Draggable is already exist, don't create it twice ";

    if (draggables.some(function (existing) {
      return draggable.element === existing.element;
    })) {
      throw message;
    }

    draggables.push(draggable);
  }

  function addToDefaultScope$1(draggable) {
    defaultScope.addDraggable(draggable);
  }

  function copyStyles(source, destination) {
    var cs = window.getComputedStyle(source);

    for (var i = 0; i < cs.length; i++) {
      var key = cs[i];

      if (key.indexOf('transition') < 0 && key.indexOf('transform') < 0) {
        destination.style[key] = cs[key];
      }
    }

    for (var _i = 0; _i < source.children.length; _i++) {
      copyStyles(source.children[_i], destination.children[_i]);
    }
  }

  var Draggable = /*#__PURE__*/function (_EventEmitter) {
    _inherits$1(Draggable, _EventEmitter);

    var _super = _createSuper$1(Draggable);

    function Draggable(element) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck$1(this, Draggable);

      _this = _super.call(this, options);
      _this.targets = [];
      _this.options = options;
      _this.element = element;
      preventDoubleInit(_assertThisInitialized$1(_this));
      Draggable.emitter.emit('draggable:create', _assertThisInitialized$1(_this));
      _this._enable = true;

      _this.startBounding();

      _this.startPositioning();

      _this.startListening();

      return _this;
    }

    _createClass$1(Draggable, [{
      key: "startBounding",
      value: function startBounding() {
        this.bound = this.options.bound || BoundToElement.bounding(this.container, this.container);
      }
    }, {
      key: "startPositioning",
      value: function startPositioning() {
        this._setDefaultTransition();

        this.offset = Point.elementOffset(this.element, this.container, true);
        this.pinnedPosition = this.offset;
        this.position = this.offset;
        this.initialPosition = this.options.position || this.offset;
        this.pinPosition(this.initialPosition);

        if (this.bound.refresh) {
          this.bound.refresh();
        }
      }
    }, {
      key: "startListening",
      value: function startListening() {
        var _this2 = this;

        this._dragStart = function (event) {
          return _this2.dragStart(event);
        };

        this._dragMove = function (event) {
          return _this2.dragMove(event);
        };

        this._dragEnd = function (event) {
          return _this2.dragEnd(event);
        };

        this._nativeDragStart = function (event) {
          return _this2.nativeDragStart(event);
        };

        this._nativeDragOver = function (event) {
          return _this2.nativeDragOver(event);
        };

        this._nativeDragEnd = function (event) {
          return _this2.nativeDragEnd(event);
        };

        this._nativeDrop = function (event) {
          return _this2.nativeDrop(event);
        };

        this._scroll = function (event) {
          return _this2.onScroll(event);
        };

        this.handler.addEventListener(touchEvents.start, this._dragStart,  false);
        this.handler.addEventListener(mouseEvents.start, this._dragStart,  false);
        this.element.addEventListener('dragstart', this._nativeDragStart);
      }
    }, {
      key: "getSize",
      value: function getSize() {
        return Point.elementSize(this.element, this.options.isContentBoxSize);
      }
    }, {
      key: "getPosition",
      value: function getPosition() {
        this.position = this.offset.add(this._transformPosition || new Point(0, 0));
        return this.position;
      }
    }, {
      key: "getCenter",
      value: function getCenter() {
        return this.position.add(this.getSize().mult(0.5));
      }
    }, {
      key: "_setDefaultTransition",
      value: function _setDefaultTransition() {
        this.element.style[transitionProperty] = window.getComputedStyle(this.element)[transitionProperty];
      }
    }, {
      key: "_setTransition",
      value: function _setTransition(time) {
        var transition = this.element.style[transitionProperty];
        var transitionCss = "transform ".concat(time, "ms");

        if (!/transform \d*m?s/.test(transition)) {
          if (transition) {
            transition += ", ".concat(transitionCss);
          } else {
            transition = transitionCss;
          }
        } else {
          transition = transition.replace(/transform \d*m?s/, transitionCss);
        }

        this.element.style[transitionProperty] = transition;
      }
    }, {
      key: "_setTranslate",
      value: function _setTranslate(point) {
        this._transformPosition = point;
        var translateCss = "translate3d(".concat(point.x, "px, ").concat(point.y, "px, 0px)");
        var transform = this.element.style[transformProperty];

        if (this.shouldRemoveZeroTranslate && point.x === 0 && point.y === 0) {
          transform = transform.replace(/translate3d\([^)]+\)/, '');
        } else if (!/translate3d\([^)]+\)/.test(transform)) {
          if (transform) {
            transform += ' ';
          }

          transform += translateCss;
        } else {
          transform = transform.replace(/translate3d\([^)]+\)/, translateCss);
        }

        this.element.style[transformProperty] = transform;
      }
    }, {
      key: "move",
      value: function move(point) {
        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var isSilent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        point = point.clone();
        this.determineDirection(point);
        this.position = point;

        this._setTransition(time);

        this._setTranslate(point.sub(this.offset));

        if (!isSilent) {
          this.emit('drag:move');
        }
      }
    }, {
      key: "pinPosition",
      value: function pinPosition(point) {
        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        this.pinnedPosition = point.clone();
        this.move(this.pinnedPosition, time, silent);
      }
    }, {
      key: "resetPositionToInitial",
      value: function resetPositionToInitial() {
        this.pinPosition(this.initialPosition);
      }
    }, {
      key: "refreshPosition",
      value: function refreshPosition() {
        this.setPosition(this.getPosition());
      }
    }, {
      key: "setPosition",
      value: function setPosition(point) {
        point = point.clone();
        this.position = point;

        this._setTransition(0);

        this._setTranslate(point.sub(this.offset));
      }
    }, {
      key: "determineDirection",
      value: function determineDirection(point) {
        this.leftDirection = this.position.x < point.x;
        this.rightDirection = this.position.x > point.x;
        this.upDirection = this.position.y > point.y;
        this.downDirection = this.position.y < point.y;
      }
    }, {
      key: "dragStart",
      value: function dragStart(event) {
        this.currentEvent = event;

        if (!this._enable) {
          return;
        }

        var isTouchEvent = isTouch && event instanceof window.TouchEvent;
        this.touchPoint = this._startTouchPoint = new Point(isTouchEvent ? event.changedTouches[0].pageX : event.clientX, isTouchEvent ? event.changedTouches[0].pageY : event.clientY);
        this._startPosition = this.getPosition();

        if (isTouchEvent) {
          this._touchId = event.changedTouches[0].identifier;
        }

        this._startScrollPoint = new Point(window.scrollX, window.scrollY);
        event.stopPropagation();

        if (event.target instanceof window.HTMLInputElement || event.target instanceof window.HTMLInputElement) {
          event.target.focus();
        }

        if (!(this.nativeDragAndDrop || event.target instanceof window.HTMLInputElement || event.target instanceof window.HTMLInputElement)) {
          event.preventDefault();
        }

        if (this.nativeDragAndDrop) {
          var isSafari = /version\/(\d+).+?safari/i.test(window.navigator.userAgent);

          if (isTouchEvent && this.emulateNativeDragAndDropOnTouch || isSafari || this.emulateNativeDragAndDropForAll) {
            this.emulateNativeDragAndDrop(event);
          } else {
            this.element.draggable = true;
            document.addEventListener(mouseEvents.end, this._nativeDragEnd,  false);
          }
        } else {
          document.addEventListener(touchEvents.move, this._dragMove,  false);
          document.addEventListener(mouseEvents.move, this._dragMove,  false);
          document.addEventListener(touchEvents.end, this._dragEnd,  false);
          document.addEventListener(mouseEvents.end, this._dragEnd,  false);
        }

        window.addEventListener('scroll', this._scroll);
        this.isDragging = true;
        this.emit('drag:start');
        addClass(this.element, 'dragee-active');
        this.emit('drag:move');
      }
    }, {
      key: "stopDragging",
      value: function stopDragging() {
        document.removeEventListener(touchEvents.move, this._dragMove);
        document.removeEventListener(mouseEvents.move, this._dragMove);
        document.removeEventListener(touchEvents.end, this._dragEnd);
        document.removeEventListener(mouseEvents.end, this._dragEnd);
        document.removeEventListener('dragover', this._nativeDragOver);
        document.removeEventListener('dragend', this._nativeDragEnd);
        document.removeEventListener(mouseEvents.end, this._nativeDragEnd);
        document.removeEventListener('drop', this._nativeDrop);
        document.removeEventListener('drop', this._nativeDrop);
        window.removeEventListener('scroll', this._scroll);
        this.element.draggable = false;
        this.isDragging = false;
        removeClass(this.element, 'dragee-active');
      }
    }, {
      key: "dragMove",
      value: function dragMove(event) {
        this.currentEvent = event;
        var touch;
        var isTouchEvent = isTouch && event instanceof window.TouchEvent;

        if (isTouchEvent) {
          touch = getTouchByID(event, this._touchId);

          if (!touch) {
            return;
          }
        }

        event.stopPropagation();
        event.preventDefault();
        this.touchPoint = new Point(isTouchEvent ? touch.pageX : event.clientX, isTouchEvent ? touch.pageY : event.clientY);

        var point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.scrollPoint.sub(this._startScrollPoint));

        point = this.bound(point, this.getSize());
        this.move(point);
      }
    }, {
      key: "dragEnd",
      value: function dragEnd(event) {
        var isTouchEvent = isTouch && event instanceof window.TouchEvent;

        if (isTouchEvent && !getTouchByID(event, this._touchId)) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();
        this.dragEndAction();
        this.emit('drag:end');
        document.removeEventListener(touchEvents.move, this._dragMove);
        document.removeEventListener(mouseEvents.move, this._dragMove);
        document.removeEventListener(touchEvents.end, this._dragEnd);
        document.removeEventListener(mouseEvents.end, this._dragEnd);
        window.removeEventListener('scroll', this._scroll);
        this.isDragging = false;
        this.element.removeAttribute('draggable');
        removeClass(this.element, 'dragee-active');
      }
    }, {
      key: "onScroll",
      value: function onScroll(_event) {
        var point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.scrollPoint.sub(this._startScrollPoint));

        point = this.bound(point, this.getSize());

        if (!this.nativeDragAndDrop) {
          this.move(point);
        }
      }
    }, {
      key: "nativeDragStart",
      value: function nativeDragStart(event) {
        event.dataTransfer.setData('text', 'FireFox fix');
        event.dataTransfer.effectAllowed = 'move';
        document.addEventListener('dragover', this._nativeDragOver);
        document.addEventListener('dragend', this._nativeDragEnd);
        document.addEventListener('drop', this._nativeDrop);
      }
    }, {
      key: "nativeDragOver",
      value: function nativeDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        addClass(this.element, 'dragee-placeholder');
        this.currentEvent = event;

        if (event.clientX === 0 && event.clientY === 0) {
          return;
        }

        this.touchPoint = new Point(event.clientX, event.clientY);

        var point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.scrollPoint.sub(this._startScrollPoint));

        point = this.bound(point, this.getSize());
        this.position = point;
        this.emit('drag:move');
      }
    }, {
      key: "nativeDragEnd",
      value: function nativeDragEnd(_event) {
        removeClass(this.element, 'dragee-placeholder');
        this.dragEndAction();
        this.emit('drag:end');
        document.removeEventListener('dragover', this._nativeDragOver);
        document.removeEventListener('dragend', this._nativeDragEnd);
        document.removeEventListener(mouseEvents.end, this._nativeDragEnd);
        document.removeEventListener('drop', this._nativeDrop);
        window.removeEventListener('scroll', this._scroll);
        this.isDragging = false;
        this.element.removeAttribute('draggable');
        removeClass(this.element, 'dragee-active');
      }
    }, {
      key: "nativeDrop",
      value: function nativeDrop(event) {
        event.stopPropagation();
        event.preventDefault();
      }
    }, {
      key: "emulateNativeDragAndDrop",
      value: function emulateNativeDragAndDrop(event) {
        var _this3 = this;

        var containerRect = this.container.getBoundingClientRect();
        var clonedElement = this.element.cloneNode(true);
        clonedElement.style[transformProperty] = '';
        copyStyles(this.element, clonedElement);
        clonedElement.style.position = 'absolute';
        document.body.appendChild(clonedElement);
        addClass(this.element, 'dragee-placeholder');
        var emulationDraggable = new Draggable(clonedElement, {
          container: document.body,
          bound: function bound(point) {
            return point;
          },
          on: {
            'drag:move': function dragMove() {
              var containerRectPoint = new Point(containerRect.left, containerRect.top);
              _this3.position = emulationDraggable.position.sub(containerRectPoint).sub(_this3._startScrollPoint);

              _this3.emit('drag:move');
            },
            'drag:end': function dragEnd() {
              emulationDraggable.destroy();
              document.body.removeChild(clonedElement);
              removeClass(_this3.element, 'dragee-placeholder');
              removeClass(_this3.element, 'dragee-active');
            }
          }
        });
        var containerRectPoint = new Point(containerRect.left, containerRect.top);
        emulationDraggable._startScrollPoint = this._startScrollPoint;
        emulationDraggable.move(this.pinnedPosition.add(containerRectPoint).add(new Point(window.scrollX, window.scrollY)));
        emulationDraggable.dragStart(event);
      }
    }, {
      key: "dragEndAction",
      value: function dragEndAction() {
        this.pinPosition(this.position);
      }
    }, {
      key: "getRectangle",
      value: function getRectangle() {
        return new Rectangle(this.position, this.getSize());
      }
    }, {
      key: "refresh",
      value: function refresh() {
        if (this.bound.refresh) {
          this.bound.refresh();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.handler.removeEventListener(touchEvents.start, this._dragStart);
        this.handler.removeEventListener(mouseEvents.start, this._dragStart);
        this.element.removeEventListener('dragstart', this._nativeDragStart);
        document.removeEventListener(touchEvents.move, this._dragMove);
        document.removeEventListener(mouseEvents.move, this._dragMove);
        document.removeEventListener(touchEvents.end, this._dragEnd);
        document.removeEventListener(mouseEvents.end, this._dragEnd);
        document.removeEventListener('dragover', this._nativeDragOver);
        document.removeEventListener('dragend', this._nativeDragEnd);
        document.removeEventListener(mouseEvents.end, this._nativeDragEnd);
        document.removeEventListener('drop', this._nativeDrop);
        this.resetEmitter();
        var index = draggables.indexOf(this);

        if (index > -1) {
          draggables.splice(index, 1);
        }
      }
    }, {
      key: "container",
      get: function get() {
        return this._container = this._container || this.options.container || this.options.parent || getDefaultContainer(this.element);
      }
    }, {
      key: "handler",
      get: function get() {
        if (!this._handler) {
          if (typeof this.options.handler === 'string') {
            this._handler = this.element.querySelector(this.options.handler) || this.element;
          } else {
            this._handler = this.options.handler || this.element;
          }
        }

        return this._handler;
      }
    }, {
      key: "nativeDragAndDrop",
      get: function get() {
        return this.options.nativeDragAndDrop || false;
      }
    }, {
      key: "emulateNativeDragAndDropOnTouch",
      get: function get() {
        return this.options.emulateNativeDragAndDropOnTouch || true;
      }
    }, {
      key: "emulateNativeDragAndDropForAll",
      get: function get() {
        return this.options.emulateNativeDragAndDropForAll || false;
      }
    }, {
      key: "shouldRemoveZeroTranslate",
      get: function get() {
        return this.options.shouldRemoveZeroTranslate || false;
      }
    }, {
      key: "scrollPoint",
      get: function get() {
        return new Point(window.scrollX, window.scrollY);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(enable) {
        if (enable) {
          removeClass(this.element, 'dragee-disable');
        } else {
          addClass(this.element, 'dragee-disable');
        }

        return this._enable = enable;
      }
    }]);

    return Draggable;
  }(EventEmitter);
  Draggable.emitter = new EventEmitter();
  Draggable.emitter.on('draggable:create', addToDefaultScope$1);

  function getAngle$1(p1, p2) {
    var diff = p2.sub(p1);
    return normalizeAngle$1(Math.atan2(diff.y, diff.x));
  }
  function toRadian(angle) {
    return angle % 360 * Math.PI / 180;
  }
  function normalizeAngle$1(val) {
    while (val < 0) {
      val += 2 * Math.PI;
    }

    while (val > 2 * Math.PI) {
      val -= 2 * Math.PI;
    }

    return val;
  }
  function getPointFromRadialSystem$1(angle, length, center) {
    center = center || new Point(0, 0);
    return center.add(new Point(length * Math.cos(angle), length * Math.sin(angle)));
  }

  var Spider = /*#__PURE__*/function () {
    function Spider(area, elements) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, Spider);

      var areaRectangle = Rectangle.fromElement(area, area);
      this.options = Object.assign({
        angle: 0,
        dAngle: 2 * Math.PI / elements.length,
        center: areaRectangle.getCenter(),
        startRadius: 50,
        endRadius: areaRectangle.getMinSide() / 2,
        lineWidth: 2,
        strokeStyle: '#ff5577',
        fillStyle: 'rgba(150,255,50,0.8)'
      }, options);
      this.area = area;
      this.areaRectangle = areaRectangle;
      this.init(elements);
    }

    _createClass(Spider, [{
      key: "init",
      value: function init(elements) {
        var _this = this;

        this.canvas = createCanvas(this.area, this.areaRectangle);
        this.context = this.canvas.getContext('2d');
        this.draggables = elements.map(function (element, i) {
          var angle = _this.options.angle + i * _this.options.dAngle;
          var halfSize = Point.elementSize(element).mult(0.5);
          var start = getPointFromRadialSystem$1(angle, _this.options.startRadius, _this.options.center).sub(halfSize);
          var end = getPointFromRadialSystem$1(angle, _this.options.endRadius, _this.options.center).sub(halfSize);
          return new Draggable(element, {
            container: _this.area,
            bound: BoundToLine.bounding(start, end),
            position: start,
            on: {
              'drag:move': function dragMove() {
                return _this.draw();
              }
            }
          });
        });
        this.isInit = true;
        this.draw();
      }
    }, {
      key: "draw",
      value: function draw() {
        if (!this.isInit) {
          return;
        }

        this.context.clearRect(0, 0, this.areaRectangle.size.x, this.areaRectangle.size.y);
        this.context.beginPath();
        var point = this.draggables[0].getCenter();
        this.context.moveTo(point.x, point.y);

        for (var i = 0; i < this.draggables.length; i++) {
          point = this.draggables[i].getCenter();
          this.context.lineTo(point.x, point.y);
        }

        this.context.closePath();
        this.context.lineWidth = this.options.lineWidth;
        this.context.strokeStyle = this.options.strokeStyle;
        this.context.stroke();
        this.context.fillStyle = this.options.fillStyle;
        this.context.fill();
      }
    }]);

    return Spider;
  }();

  var EventEmitter$1 = /*#__PURE__*/function () {
    function EventEmitter() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, EventEmitter);

      this.events = {};

      if (options && options.on) {
        for (var _i = 0, _Object$entries = Object.entries(options.on); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              eventName = _Object$entries$_i[0],
              fn = _Object$entries$_i[1];

          this.on(eventName, fn);
        }
      }
    }

    _createClass(EventEmitter, [{
      key: "emit",
      value: function emit(eventName) {
        this.interrupted = false;
        var args = [].slice.call(arguments, 1);
        if (!this.events[eventName]) return;

        var _iterator = _createForOfIteratorHelper(this.events[eventName]),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var func = _step.value;
            func.apply.apply(func, _toConsumableArray(args));

            if (this.interrupted) {
              return;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "interrupt",
      value: function interrupt() {
        this.interrupted = true;
      }
    }, {
      key: "on",
      value: function on(eventName, fn) {
        if (!this.events[eventName]) {
          this.events[eventName] = [];
        }

        this.events[eventName].push(fn);
      }
    }, {
      key: "prependOn",
      value: function prependOn(eventName, fn) {
        if (!this.events[eventName]) {
          this.events[eventName] = [];
        }

        this.events[eventName].unshift(fn);
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe(eventName, fn) {
        if (this.events[eventName]) {
          var index = this.events[eventName].indexOf(fn);
          this.events[eventName].splice(index, 1);
        }
      }
    }, {
      key: "resetEmitter",
      value: function resetEmitter() {
        this.events = {};
      }
    }, {
      key: "resetOn",
      value: function resetOn(eventName) {
        this.events[eventName] = [];
      }
    }]);

    return EventEmitter;
  }();

  var ArcSlider = /*#__PURE__*/function (_EventEmitter) {
    _inherits(ArcSlider, _EventEmitter);

    var _super = _createSuper(ArcSlider);

    function ArcSlider(area, element) {
      var _this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, ArcSlider);

      _this = _super.call(this, options);
      var areaRectangle = Rectangle.fromElement(area, area);
      _this.options = Object.assign({
        center: areaRectangle.getCenter(),
        radius: areaRectangle.getMinSide() / 2,
        startAngle: Math.PI,
        endAngle: 0,
        angles: [Math.PI, -Math.PI / 4, 0, Math.PI / 4, Math.PI / 2],
        time: 500
      }, options);
      _this.shiftedCenter = _this.options.center;
      _this.area = area;

      _this.init(element);

      return _this;
    }

    _createClass(ArcSlider, [{
      key: "init",
      value: function init(element) {
        var _this2 = this;

        var angle = this.options.startAngle;
        var position = getPointFromRadialSystem$1(angle, this.options.radius, this.shiftedCenter);
        this.angle = angle;
        this.draggable = new Draggable(element, {
          container: this.area,
          bound: BoundToArc.bounding(this.shiftedCenter, this.options.radius, this.options.startAngle, this.options.endAngle),
          position: position,
          on: {
            'drag:move': function dragMove() {
              return _this2.change();
            }
          }
        });
      }
    }, {
      key: "updateAngle",
      value: function updateAngle() {
        this.angle = getAngle$1(this.shiftedCenter, this.draggable.position);
      }
    }, {
      key: "change",
      value: function change() {
        this.updateAngle(); //      var angle = Geometry.getNearestAngle(this.options.angles, this.angle);
        //      this.setAngle(angle,this.options.time);

        this.emit('arcslider:change', {
          angle: this.angle
        });
      }
    }, {
      key: "setAngle",
      value: function setAngle(angle, time) {
        var position = getPointFromRadialSystem$1(this.angle, this.options.radius, this.shiftedCenter);
        this.angle = normalizeAngle$1(angle);
        this.draggable.pinPosition(position, time || 0);
        this.emit('arcslider:change', this.angle);
      }
    }]);

    return ArcSlider;
  }(EventEmitter$1);

  function range$1(start, stop, step) {
    var result = [];

    if (typeof stop === 'undefined') {
      stop = start;
      start = 0;
    }

    if (typeof step === 'undefined') {
      step = 1;
    }

    if (step > 0 && start >= stop || step < 0 && start <= stop) {
      return [];
    }

    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  }

  var rnd = function rnd() {
    return Math.round(Math.random() * 255);
  };

  var toHexString = function toHexString(digit) {
    var str = digit.toString(16);

    while (str.length < 2) {
      str = '0' + str;
    }

    return str;
  };

  function randomColor() {
    return "#".concat(toHexString(rnd())).concat(toHexString(rnd())).concat(toHexString(rnd()));
  }

  function getArrayWithBoundIndexes(index, length) {
    var retIndexes = [];

    if (index !== -1) {
      retIndexes.push(index);
      retIndexes.push((index + 1) % length);
    }

    return retIndexes;
  }

  var Chart = /*#__PURE__*/function (_EventEmitter) {
    _inherits(Chart, _EventEmitter);

    var _super = _createSuper(Chart);

    function Chart(area, elements) {
      var _this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, Chart);

      _this = _super.call(this, options);
      var areaRectangle = Rectangle.fromElement(area, area);
      _this.options = Object.assign({
        center: areaRectangle.getCenter(),
        radius: areaRectangle.getMinSide() / 2,
        touchRadius: areaRectangle.getMinSide() / 2,
        boundAngle: Math.PI / 9,
        fillStyles: range$1(0, elements.length).map(function () {
          return randomColor();
        }),
        initAngles: range$1(-90, 270, 360 / elements.length).map(function (angle) {
          return toRadian(angle);
        }),
        limitImg: null,
        limitImgOffset: new Point(0, 0)
      }, options);
      _this.area = area;
      _this.areaRectangle = areaRectangle;

      _this.init(elements);

      return _this;
    }

    _createClass(Chart, [{
      key: "init",
      value: function init(elements) {
        var _this2 = this;

        this.canvas = createCanvas(this.area, this.areaRectangle);
        this.context = this.canvas.getContext('2d');
        this.draggables = elements.map(function (element, i) {
          var angle = _this2.options.initAngles[i];
          var halfSize = Point.elementSize(element).mult(0.5);
          var position = getPointFromRadialSystem$1(angle, _this2.options.touchRadius, _this2.options.center.sub(halfSize));
          return new Draggable(element, {
            container: _this2.area,
            bound: BoundToArc.bounding(_this2.options.center.sub(halfSize), _this2.options.touchRadius, _this2.getBoundAngle(i, false), _this2.getBoundAngle(i, true)),
            position: position,
            on: {
              'drag:move': function dragMove() {
                return _this2.draw();
              }
            }
          });
        });
        this.isInit = true;
        this.draw();
      }
    }, {
      key: "updateAngles",
      value: function updateAngles() {
        var _this3 = this;

        this.angles = this.draggables.map(function (draggable) {
          var halfSize = draggable.getSize().mult(0.5);
          return getAngle$1(_this3.options.center.sub(halfSize), draggable.position);
        });
      }
    }, {
      key: "getBoundAngle",
      value: function getBoundAngle(index, isClossing) {
        var _this4 = this;

        var sign = isClossing ? 1 : -1;
        return function () {
          var i = (index + sign) % _this4.angles.length;

          if (i < 0) {
            i += _this4.angles.length;
          }

          return normalizeAngle$1(_this4.angles[i] - sign * _this4.options.boundAngle);
        };
      }
    }, {
      key: "draw",
      value: function draw() {
        var _this5 = this;

        if (!this.isInit) {
          return;
        }

        this.updateAngles();
        this.context.clearRect(0, 0, this.areaRectangle.size.x, this.areaRectangle.size.y);
        this.draggables.forEach(function (_draggable, index) {
          _this5.drawArc(_this5.context, _this5.options.center, _this5.options.radius, index);
        });
        this.draggables.forEach(function (_draggable, index) {
          _this5.drawLimitImg(index);
        });
        this.emit('chart:draw');
      }
    }, {
      key: "createClone",
      value: function createClone(element) {
        var _this6 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!this.isInit) {
          return;
        }

        var rectangle = Rectangle.fromElement(element, element);
        var opts = Object.assign({
          center: rectangle.getCenter(),
          radius: rectangle.getMinSide() / 2,
          fillStyles: this.options.fillStyles
        }, options);
        var canvas = createCanvas(element, rectangle);
        var context = canvas.getContext('2d');
        var cloneObj = {
          draw: function draw() {
            context.clearRect(0, 0, rectangle.size.x, rectangle.size.y);

            _this6.draggables.forEach(function (_draggable, index) {
              _this6.drawArc(context, opts.center, opts.radius, index);
            });
          }
        };
        cloneObj.draw();
        return cloneObj;
      }
    }, {
      key: "getFillStyle",
      value: function getFillStyle(index) {
        if (typeof this.options.fillStyles[index] === 'function') {
          this.options.fillStyles[index] = this.options.fillStyles[index].call(this);
        }

        return this.options.fillStyles[index];
      }
    }, {
      key: "drawArc",
      value: function drawArc(context, center, radius, index) {
        var startAngle = this.angles[index];
        var endAngle = this.angles[(index + 1) % this.angles.length];
        var color = this.getFillStyle(index);
        context.beginPath();
        context.moveTo(center.x, center.y);
        context.arc(center.x, center.y, radius, startAngle, endAngle, false);
        context.lineTo(center.x, center.y);
        context.closePath();
        context.fillStyle = color;
        context.fill();
      }
    }, {
      key: "drawLimitImg",
      value: function drawLimitImg(index) {
        var point, img;

        if (this.options.limitImg) {
          img = this.options.limitImg instanceof Array ? this.options.limitImg[index] : this.options.limitImg;
        }

        if (img) {
          var angle = normalizeAngle$1(this.angles[index]);
          point = new Point(0, -img.height / 2);
          point = point.add(this.options.limitImgOffset);
          this.context.translate(this.areaRectangle.size.x / 2, this.areaRectangle.size.y / 2);
          this.context.rotate(angle);
          this.context.drawImage(img, point.x, point.y);
          this.context.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    }, {
      key: "getAnglesDiff",
      value: function getAnglesDiff() {
        var angles = this.angles.slice(1);
        var baseAngle = this.angles[0];
        angles.push(baseAngle);
        return angles.map(function (angle) {
          var diffAngle = normalizeAngle$1(angle - baseAngle);
          baseAngle = angle;
          return diffAngle;
        });
      }
    }, {
      key: "getPercent",
      value: function getPercent() {
        return this.getAnglesDiff().map(function (diffAngle) {
          return diffAngle / (2 * Math.PI);
        });
      }
    }, {
      key: "getArcBisectrixs",
      value: function getArcBisectrixs() {
        var _this7 = this;

        return this.getAnglesDiff().map(function (diffAngle, i) {
          return normalizeAngle$1(_this7.angles[i] + diffAngle / 2);
        });
      }
    }, {
      key: "getArcOnPoint",
      value: function getArcOnPoint(point) {
        var angle = getAngle$1(this.options.center, point);
        var radius = getDistance(this.options.center, point);

        if (radius > this.options.radius) {
          return -1;
        }

        var offset = -1,
            i,
            j;

        for (i = 0; i < this.angles.length; i++) {
          if (offset === -1 || this.angles[offset] > this.angles[i]) {
            offset = i;
          }
        }

        for (i = 0, j = offset; i < this.angles.length; i++, j = (i + offset) % this.angles.length) {
          if (angle < this.angles[j]) {
            break;
          }
        }

        if (--j < 0) {
          j += this.angles.length;
        }

        return j;
      }
    }, {
      key: "setAngles",
      value: function setAngles(angles) {
        var _this8 = this;

        this.angles = angles;
        this.draggables.forEach(function (draggable, i) {
          var angle = _this8.angles[i];
          var halfSize = draggable.getSize().mult(0.5);
          var position = getPointFromRadialSystem$1(angle, _this8.options.touchRadius, _this8.options.center.sub(halfSize));
          draggable.moveAndSave(position);
        });
        this.draw();
      }
    }, {
      key: "setActiveArc",
      value: function setActiveArc(index) {
        var enableIndexes = getArrayWithBoundIndexes(index, this.draggables.length);
        this.activeArcIndex = index;
        this.draggables.forEach(function (draggable, i) {
          draggable.enable = enableIndexes.indexOf(i) !== -1;
        });
        this.draw();
      }
    }]);

    return Chart;
  }(EventEmitter$1);

  exports.ArcSlider = ArcSlider;
  exports.Chart = Chart;
  exports.Spider = Spider;

  return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZGV2LmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvY3JlYXRlLWNhbnZhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9kcmFnZWUvZGlzdC9pbmRleC5lc20uanMiLCIuLi9zcmMvZ2VvbWV0cnkvYW5nbGVzLmpzIiwiLi4vc3JjL3NwaWRlci5qcyIsIi4uL3NyYy9FdmVudEVtaXR0ZXIuanMiLCIuLi9zcmMvYXJjc2xpZGVyLmpzIiwiLi4vc3JjL3V0aWxzL3JhbmdlLmpzIiwiLi4vc3JjL2NoYXJ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gIHN0eWxlID0gc3R5bGUgfHwge31cbiAgbGV0IGNzc1RleHQgPSAnJ1xuICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZSkge1xuICAgIGlmIChzdHlsZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjc3NUZXh0ICs9IGtleSArICc6ICcgKyBzdHlsZVtrZXldICsgJzsgJ1xuICAgIH1cbiAgfVxuXG4gIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGNzc1RleHRcbn1cblxuZnVuY3Rpb24gYXBwZW5kRmlyc3RDaGlsZChlbGVtZW50LCBub2RlKSB7XG4gIGlmIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50Lmluc2VydEJlZm9yZShub2RlLCBlbGVtZW50LmZpcnN0Q2hpbGQpXG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChub2RlKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyhhcmVhLCByZWN0YWdsZSkge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUoYXJlYSkucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgYXJlYS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgfVxuXG4gIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgcmVjdGFnbGUuc2l6ZS54ICsgJ3B4JylcbiAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgcmVjdGFnbGUuc2l6ZS55ICsgJ3B4JylcbiAgc2V0U3R5bGUoY2FudmFzLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgbGVmdDogcmVjdGFnbGUucG9zaXRpb24ueSArICdweCcsXG4gICAgdG9wOiByZWN0YWdsZS5wb3NpdGlvbi55ICsgJ3B4JyxcbiAgICB3aWR0aDogcmVjdGFnbGUuc2l6ZS54ICsgJ3B4JyxcbiAgICBoZWlnaHQ6IHJlY3RhZ2xlLnNpemUueSArICdweCdcbiAgfSlcbiAgYXBwZW5kRmlyc3RDaGlsZChhcmVhLCBjYW52YXMpXG4gIHJldHVybiBjYW52YXNcbn1cbiIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlO1xuXG4gIHRyeSB7XG4gICAgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgaWYgKF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkge1xuICAgIF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdDtcbiAgfSBlbHNlIHtcbiAgICBfY29uc3RydWN0ID0gZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gICAgICB2YXIgYSA9IFtudWxsXTtcbiAgICAgIGEucHVzaC5hcHBseShhLCBhcmdzKTtcbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoUGFyZW50LCBhKTtcbiAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgICAgaWYgKENsYXNzKSBfc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksXG4gICAgICAgIHJlc3VsdDtcblxuICAgIGlmIChfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkpIHtcbiAgICAgIHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7XG5cbiAgICAgIHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIF9zdXBlclByb3BCYXNlKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgd2hpbGUgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICBvYmplY3QgPSBfZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICBpZiAob2JqZWN0ID09PSBudWxsKSBicmVhaztcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59XG5cbmZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIFJlZmxlY3QuZ2V0KSB7XG4gICAgX2dldCA9IFJlZmxlY3QuZ2V0O1xuICB9IGVsc2Uge1xuICAgIF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICB2YXIgYmFzZSA9IF9zdXBlclByb3BCYXNlKHRhcmdldCwgcHJvcGVydHkpO1xuXG4gICAgICBpZiAoIWJhc2UpIHJldHVybjtcbiAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBwcm9wZXJ0eSk7XG5cbiAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICByZXR1cm4gZGVzYy5nZXQuY2FsbChyZWNlaXZlcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlciB8fCB0YXJnZXQpO1xufVxuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTtcbn1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG4pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcblxuICByZXR1cm4gYXJyMjtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIobykge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvW1N5bWJvbC5pdGVyYXRvcl0gPT0gbnVsbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChvID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSkge1xuICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzOiBGLFxuICAgICAgICBuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7XG4gICAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogb1tpKytdXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9LFxuICAgICAgICBmOiBGXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbiAgfVxuXG4gIHZhciBpdCxcbiAgICAgIG5vcm1hbENvbXBsZXRpb24gPSB0cnVlLFxuICAgICAgZGlkRXJyID0gZmFsc2UsXG4gICAgICBlcnI7XG4gIHJldHVybiB7XG4gICAgczogZnVuY3Rpb24gKCkge1xuICAgICAgaXQgPSBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICB9LFxuICAgIG46IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGVwID0gaXQubmV4dCgpO1xuICAgICAgbm9ybWFsQ29tcGxldGlvbiA9IHN0ZXAuZG9uZTtcbiAgICAgIHJldHVybiBzdGVwO1xuICAgIH0sXG4gICAgZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGRpZEVyciA9IHRydWU7XG4gICAgICBlcnIgPSBlO1xuICAgIH0sXG4gICAgZjogZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFub3JtYWxDb21wbGV0aW9uICYmIGl0LnJldHVybiAhPSBudWxsKSBpdC5yZXR1cm4oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChkaWRFcnIpIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFN1bVZhbHVlT2ZTdHlsZVJ1bGVzKGVsZW1lbnQsIHJ1bGVzKSB7XG4gIHJldHVybiBydWxlcy5yZWR1Y2UoZnVuY3Rpb24gKHN1bSwgcnVsZSkge1xuICAgIHJldHVybiBzdW0gKyBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVtydWxlXSB8fCAwKTtcbiAgfSwgMCk7XG59XG4vKiogQ2xhc3MgcmVwcmVzZW50aW5nIGEgcG9pbnQuICovXG5cblxudmFyIFBvaW50ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICogQ3JlYXRlIGEgcG9pbnQuXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeCB2YWx1ZS5cbiAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5IHZhbHVlLlxuICAqL1xuICBmdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBvaW50KTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQb2ludCwgW3tcbiAgICBrZXk6IFwiYWRkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChwKSB7XG4gICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHAueCwgdGhpcy55ICsgcC55KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3ViXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN1YihwKSB7XG4gICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCAtIHAueCwgdGhpcy55IC0gcC55KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibXVsdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtdWx0KGspIHtcbiAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54ICogaywgdGhpcy55ICogayk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm5lZ2F0aXZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5lZ2F0aXZlKCkge1xuICAgICAgcmV0dXJuIG5ldyBQb2ludCgtdGhpcy54LCAtdGhpcy55KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcGFyZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wYXJlKHApIHtcbiAgICAgIHJldHVybiB0aGlzLnggPT09IHAueCAmJiB0aGlzLnkgPT09IHAueTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xvbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidG9TdHJpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gXCJ7eD1cIi5jb25jYXQodGhpcy54LCBcIix5PVwiKS5jb25jYXQodGhpcy55KTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJlbGVtZW50T2Zmc2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVsZW1lbnRPZmZzZXQoZWxlbWVudCwgcGFyZW50KSB7XG4gICAgICBwYXJlbnQgPSBwYXJlbnQgfHwgZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgdmFyIGVsZW1lbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBwYXJlbnRSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgcmV0dXJuIG5ldyBQb2ludChlbGVtZW50UmVjdC5sZWZ0IC0gcGFyZW50UmVjdC5sZWZ0LCBlbGVtZW50UmVjdC50b3AgLSBwYXJlbnRSZWN0LnRvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImVsZW1lbnRTaXplXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVsZW1lbnRTaXplKGVsZW1lbnQpIHtcbiAgICAgIHZhciBpc0NvbnRlbnRCb3hTaXplID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcbiAgICAgIHZhciB3aWR0aCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpWyd3aWR0aCddKTtcbiAgICAgIHZhciBoZWlnaHQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVsnaGVpZ2h0J10pO1xuXG4gICAgICBpZiAoIWlzQ29udGVudEJveFNpemUpIHtcbiAgICAgICAgd2lkdGggKz0gZ2V0U3VtVmFsdWVPZlN0eWxlUnVsZXMoZWxlbWVudCwgWydwYWRkaW5nLWxlZnQnLCAncGFkZGluZy1yaWdodCcsICdib3JkZXItbGVmdC13aWR0aCcsICdib3JkZXItcmlnaHQtd2lkdGgnXSk7XG4gICAgICAgIGhlaWdodCArPSBnZXRTdW1WYWx1ZU9mU3R5bGVSdWxlcyhlbGVtZW50LCBbJ3BhZGRpbmctdG9wJywgJ3BhZGRpbmctYm90dG9tJywgJ2JvcmRlci10b3Atd2lkdGgnLCAnYm9yZGVyLWJvdHRvbS13aWR0aCddKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQb2ludCh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUG9pbnQ7XG59KCk7XG5cbnZhciBSZWN0YW5nbGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBSZWN0YW5nbGUocG9zaXRpb24sIHNpemUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVjdGFuZ2xlKTtcblxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFJlY3RhbmdsZSwgW3tcbiAgICBrZXk6IFwiZ2V0UDFcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UDEoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UDJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UDIoKSB7XG4gICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS54LCB0aGlzLnBvc2l0aW9uLnkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRQM1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQMygpIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnNpemUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRQNFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQNCgpIHtcbiAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUueSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldENlbnRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDZW50ZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy5zaXplLm11bHQoMC41KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9yKHJlY3QpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IG5ldyBQb2ludChNYXRoLm1pbih0aGlzLnBvc2l0aW9uLngsIHJlY3QucG9zaXRpb24ueCksIE1hdGgubWluKHRoaXMucG9zaXRpb24ueSwgcmVjdC5wb3NpdGlvbi55KSk7XG4gICAgICB2YXIgc2l6ZSA9IG5ldyBQb2ludChNYXRoLm1heCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCwgcmVjdC5wb3NpdGlvbi54ICsgcmVjdC5zaXplLngpLCBNYXRoLm1heCh0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUueSwgcmVjdC5wb3NpdGlvbi55ICsgcmVjdC5zaXplLnkpKS5zdWIocG9zaXRpb24pO1xuICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUocG9zaXRpb24sIHNpemUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYW5kKHJlY3QpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IG5ldyBQb2ludChNYXRoLm1heCh0aGlzLnBvc2l0aW9uLngsIHJlY3QucG9zaXRpb24ueCksIE1hdGgubWF4KHRoaXMucG9zaXRpb24ueSwgcmVjdC5wb3NpdGlvbi55KSk7XG4gICAgICB2YXIgc2l6ZSA9IG5ldyBQb2ludChNYXRoLm1pbih0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCwgcmVjdC5wb3NpdGlvbi54ICsgcmVjdC5zaXplLngpLCBNYXRoLm1pbih0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUueSwgcmVjdC5wb3NpdGlvbi55ICsgcmVjdC5zaXplLnkpKS5zdWIocG9zaXRpb24pO1xuXG4gICAgICBpZiAoc2l6ZS54IDw9IDAgfHwgc2l6ZS55IDw9IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHBvc2l0aW9uLCBzaXplKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5jbHVkZVBvaW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluY2x1ZGVQb2ludChwKSB7XG4gICAgICByZXR1cm4gISh0aGlzLnBvc2l0aW9uLnggPiBwLnggfHwgdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLnggPCBwLnggfHwgdGhpcy5wb3NpdGlvbi55ID4gcC55IHx8IHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS55IDwgcC55KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5jbHVkZVJlY3RhbmdsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmNsdWRlUmVjdGFuZ2xlKHJlY3RhbmdsZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5jbHVkZVBvaW50KHJlY3RhbmdsZS5wb3NpdGlvbikgJiYgdGhpcy5pbmNsdWRlUG9pbnQocmVjdGFuZ2xlLmdldFAzKCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJtb3ZlVG9Cb3VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlVG9Cb3VuZChyZWN0LCBheGlzKSB7XG4gICAgICB2YXIgc2VsQXhpcywgY3Jvc3NSZWN0YW5nbGU7XG5cbiAgICAgIGlmIChheGlzKSB7XG4gICAgICAgIHNlbEF4aXMgPSBheGlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3Jvc3NSZWN0YW5nbGUgPSB0aGlzLmFuZChyZWN0KTtcblxuICAgICAgICBpZiAoIWNyb3NzUmVjdGFuZ2xlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxBeGlzID0gY3Jvc3NSZWN0YW5nbGUuc2l6ZS54ID4gY3Jvc3NSZWN0YW5nbGUuc2l6ZS55ID8gJ3knIDogJ3gnO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGhpc0NlbnRlciA9IHRoaXMuZ2V0Q2VudGVyKCk7XG4gICAgICB2YXIgcmVjdENlbnRlciA9IHJlY3QuZ2V0Q2VudGVyKCk7XG4gICAgICB2YXIgc2lnbiA9IHRoaXNDZW50ZXJbc2VsQXhpc10gPiByZWN0Q2VudGVyW3NlbEF4aXNdID8gLTEgOiAxO1xuICAgICAgdmFyIG9mZnNldCA9IHNpZ24gPiAwID8gdGhpcy5wb3NpdGlvbltzZWxBeGlzXSArIHRoaXMuc2l6ZVtzZWxBeGlzXSAtIHJlY3QucG9zaXRpb25bc2VsQXhpc10gOiB0aGlzLnBvc2l0aW9uW3NlbEF4aXNdIC0gKHJlY3QucG9zaXRpb25bc2VsQXhpc10gKyByZWN0LnNpemVbc2VsQXhpc10pO1xuICAgICAgcmVjdC5wb3NpdGlvbltzZWxBeGlzXSA9IHJlY3QucG9zaXRpb25bc2VsQXhpc10gKyBvZmZzZXQ7XG4gICAgICByZXR1cm4gcmVjdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U3F1YXJlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNxdWFyZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNpemUueCAqIHRoaXMuc2l6ZS55O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdHlsZUFwcGx5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0eWxlQXBwbHkoZWwpIHtcbiAgICAgIGVsID0gZWwgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5kJyk7XG4gICAgICBlbC5zdHlsZS5sZWZ0ID0gdGhpcy5wb3NpdGlvbi54ICsgJ3B4JztcbiAgICAgIGVsLnN0eWxlLnRvcCA9IHRoaXMucG9zaXRpb24ueSArICdweCc7XG4gICAgICBlbC5zdHlsZS53aWR0aCA9IHRoaXMuc2l6ZS54ICsgJ3B4JztcbiAgICAgIGVsLnN0eWxlLmhlaWdodCA9IHRoaXMuc2l6ZS55ICsgJ3B4JztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3Jvd3RoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3d0aChzaXplKSB7XG4gICAgICB0aGlzLnNpemUgPSB0aGlzLnNpemUuYWRkKHNpemUpO1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYWRkKHNpemUubXVsdCgtMC41KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldE1pblNpZGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TWluU2lkZSgpIHtcbiAgICAgIHJldHVybiBNYXRoLm1pbih0aGlzLnNpemUueCwgdGhpcy5zaXplLnkpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcImZyb21FbGVtZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIHZhciBwYXJlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIHZhciBpc0NvbnRlbnRCb3hTaXplID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgICAgIHZhciBpc0NvbnNpZGVyVHJhbnNsYXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcbiAgICAgIHZhciBwb3NpdGlvbiA9IFBvaW50LmVsZW1lbnRPZmZzZXQoZWxlbWVudCwgcGFyZW50LCBpc0NvbnNpZGVyVHJhbnNsYXRlKTtcbiAgICAgIHZhciBzaXplID0gUG9pbnQuZWxlbWVudFNpemUoZWxlbWVudCwgaXNDb250ZW50Qm94U2l6ZSk7XG4gICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShwb3NpdGlvbiwgc2l6ZSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFJlY3RhbmdsZTtcbn0oKTtcblxuZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudCwgYykge1xuICB2YXIgcmUgPSBuZXcgUmVnRXhwKCcoXnxcXFxccyknICsgYyArICcoXFxcXHN8JCknLCAnZycpO1xuICByZXR1cm4gcmUudGVzdChlbGVtZW50LmNsYXNzTmFtZSk7XG59XG5mdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCBjKSB7XG4gIGlmICghaGFzQ2xhc3MoZWxlbWVudCwgYykpIHtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IChlbGVtZW50LmNsYXNzTmFtZSArICcgJyArIGMpLnJlcGxhY2UoL1xccysvZywgJyAnKS5yZXBsYWNlKC8oXiB8ICQpL2csICcnKTtcbiAgfVxufVxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgYykge1xuICB2YXIgcmUgPSBuZXcgUmVnRXhwKCcoXnxcXFxccyknICsgYyArICcoXFxcXHN8JCknLCAnZycpO1xuICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UocmUsICckMScpLnJlcGxhY2UoL1xccysvZywgJyAnKS5yZXBsYWNlKC8oXiB8ICQpL2csICcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdENvbnRhaW5lcihlbGVtZW50KSB7XG4gIHZhciBjb250YWluZXIgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgd2hpbGUgKGNvbnRhaW5lci5wYXJlbnROb2RlICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcilbJ3Bvc2l0aW9uJ10gPT09ICdzdGF0aWMnICYmIGNvbnRhaW5lci50YWdOYW1lICE9PSAnQk9EWScpIHtcbiAgICBjb250YWluZXIgPSBjb250YWluZXIucGFyZW50Tm9kZTtcbiAgfVxuXG4gIHJldHVybiBjb250YWluZXI7XG59XG5cbnZhciBFdmVudEVtaXR0ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50RW1pdHRlcik7XG5cbiAgICB0aGlzLmV2ZW50cyA9IHt9O1xuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vbikge1xuICAgICAgZm9yICh2YXIgX2kgPSAwLCBfT2JqZWN0JGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhvcHRpb25zLm9uKTsgX2kgPCBfT2JqZWN0JGVudHJpZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBfT2JqZWN0JGVudHJpZXMkX2kgPSBfc2xpY2VkVG9BcnJheShfT2JqZWN0JGVudHJpZXNbX2ldLCAyKSxcbiAgICAgICAgICAgIGV2ZW50TmFtZSA9IF9PYmplY3QkZW50cmllcyRfaVswXSxcbiAgICAgICAgICAgIGZuID0gX09iamVjdCRlbnRyaWVzJF9pWzFdO1xuXG4gICAgICAgIHRoaXMub24oZXZlbnROYW1lLCBmbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEV2ZW50RW1pdHRlciwgW3tcbiAgICBrZXk6IFwiZW1pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbWl0KGV2ZW50TmFtZSkge1xuICAgICAgdGhpcy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHJldHVybjtcblxuICAgICAgdmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pLFxuICAgICAgICAgIF9zdGVwO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKF9pdGVyYXRvci5zKCk7ICEoX3N0ZXAgPSBfaXRlcmF0b3IubigpKS5kb25lOykge1xuICAgICAgICAgIHZhciBmdW5jID0gX3N0ZXAudmFsdWU7XG4gICAgICAgICAgZnVuYy5hcHBseSh2b2lkIDAsIF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG5cbiAgICAgICAgICBpZiAodGhpcy5pbnRlcnJ1cHRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9pdGVyYXRvci5lKGVycik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBfaXRlcmF0b3IuZigpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbnRlcnJ1cHRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW50ZXJydXB0KCkge1xuICAgICAgdGhpcy5pbnRlcnJ1cHRlZCA9IHRydWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByZXBlbmRPblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwZW5kT24oZXZlbnROYW1lLCBmbikge1xuICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS51bnNoaWZ0KGZuKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidW5zdWJzY3JpYmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5zdWJzY3JpYmUoZXZlbnROYW1lLCBmbikge1xuICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5pbmRleE9mKGZuKTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXNldEVtaXR0ZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzZXRFbWl0dGVyKCkge1xuICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVzZXRPblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldE9uKGV2ZW50TmFtZSkge1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBFdmVudEVtaXR0ZXI7XG59KCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZuLCBtb2R1bGUpIHtcblx0cmV0dXJuIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfSwgZm4obW9kdWxlLCBtb2R1bGUuZXhwb3J0cyksIG1vZHVsZS5leHBvcnRzO1xufVxuXG52YXIgZ2V0U3R5bGVQcm9wZXJ0eSA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcbi8qIVxuICogZ2V0U3R5bGVQcm9wZXJ0eSB2MS4wLjRcbiAqIG9yaWdpbmFsIGJ5IGthbmdheFxuICogaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vZmVhdHVyZS10ZXN0aW5nLWNzcy1wcm9wZXJ0aWVzL1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlICovXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBleHBvcnRzOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG5cbnZhciBwcmVmaXhlcyA9ICdXZWJraXQgTW96IG1zIE1zIE8nLnNwbGl0KCcgJyk7XG52YXIgZG9jRWxlbVN0eWxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG5mdW5jdGlvbiBnZXRTdHlsZVByb3BlcnR5KCBwcm9wTmFtZSApIHtcbiAgaWYgKCAhcHJvcE5hbWUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdGVzdCBzdGFuZGFyZCBwcm9wZXJ0eSBmaXJzdFxuICBpZiAoIHR5cGVvZiBkb2NFbGVtU3R5bGVbIHByb3BOYW1lIF0gPT09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBwcm9wTmFtZTtcbiAgfVxuXG4gIC8vIGNhcGl0YWxpemVcbiAgcHJvcE5hbWUgPSBwcm9wTmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BOYW1lLnNsaWNlKDEpO1xuXG4gIC8vIHRlc3QgdmVuZG9yIHNwZWNpZmljIHByb3BlcnRpZXNcbiAgdmFyIHByZWZpeGVkO1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBwcmVmaXhlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICBwcmVmaXhlZCA9IHByZWZpeGVzW2ldICsgcHJvcE5hbWU7XG4gICAgaWYgKCB0eXBlb2YgZG9jRWxlbVN0eWxlWyBwcmVmaXhlZCBdID09PSAnc3RyaW5nJyApIHtcbiAgICAgIHJldHVybiBwcmVmaXhlZDtcbiAgICB9XG4gIH1cbn1cblxuLy8gdHJhbnNwb3J0XG57XG4gIC8vIENvbW1vbkpTIGZvciBDb21wb25lbnRcbiAgbW9kdWxlLmV4cG9ydHMgPSBnZXRTdHlsZVByb3BlcnR5O1xufVxuXG59KSgpO1xufSk7XG5cbmZ1bmN0aW9uIGdldERpc3RhbmNlKHAxLCBwMikge1xuICB2YXIgZHggPSBwMS54IC0gcDIueCxcbiAgICAgIGR5ID0gcDEueSAtIHAyLnk7XG4gIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xufVxuZnVuY3Rpb24gZ2V0WERpZmZlcmVuY2UocDEsIHAyKSB7XG4gIHJldHVybiBNYXRoLmFicyhwMS54IC0gcDIueCk7XG59XG5mdW5jdGlvbiBnZXRZRGlmZmVyZW5jZShwMSwgcDIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKHAxLnkgLSBwMi55KTtcbn1cbmZ1bmN0aW9uIHRyYW5zZm9ybWVkU3BhY2VEaXN0YW5jZUZhY3Rvcnkob3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24gKHAxLCBwMikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3cob3B0aW9ucy54ICogTWF0aC5hYnMocDEueCAtIHAyLngpLCAyKSArIE1hdGgucG93KG9wdGlvbnMueSAqIE1hdGguYWJzKHAxLnkgLSBwMi55KSwgMikpO1xuICB9O1xufVxuZnVuY3Rpb24gaW5kZXhPZk5lYXJlc3RQb2ludChhcnIsIHZhbCwgcmFkaXVzKSB7XG4gIHZhciBnZXREaXN0YW5jZUZ1bmMgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IGdldERpc3RhbmNlO1xuICB2YXIgc2l6ZSxcbiAgICAgIGluZGV4ID0gMCxcbiAgICAgIGksXG4gICAgICB0ZW1wO1xuXG4gIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgc2l6ZSA9IGdldERpc3RhbmNlRnVuYyhhcnJbMF0sIHZhbCk7XG5cbiAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIHRlbXAgPSBnZXREaXN0YW5jZUZ1bmMoYXJyW2ldLCB2YWwpO1xuXG4gICAgaWYgKHRlbXAgPCBzaXplKSB7XG4gICAgICBzaXplID0gdGVtcDtcbiAgICAgIGluZGV4ID0gaTtcbiAgICB9XG4gIH1cblxuICBpZiAocmFkaXVzID49IDAgJiYgc2l6ZSA+IHJhZGl1cykge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gZGlyZWN0Q3Jvc3NpbmcoTDFQMSwgTDFQMiwgTDJQMSwgTDJQMikge1xuICB2YXIgdGVtcCwgazEsIGsyLCBiMSwgYjIsIHgsIHk7XG5cbiAgaWYgKEwyUDEueCA9PT0gTDJQMi54KSB7XG4gICAgdGVtcCA9IEwyUDE7XG4gICAgTDJQMSA9IEwxUDE7XG4gICAgTDFQMSA9IHRlbXA7XG4gICAgdGVtcCA9IEwyUDI7XG4gICAgTDJQMiA9IEwxUDI7XG4gICAgTDFQMiA9IHRlbXA7XG4gIH1cblxuICBpZiAoTDFQMS54ID09PSBMMVAyLngpIHtcbiAgICBrMiA9IChMMlAyLnkgLSBMMlAxLnkpIC8gKEwyUDIueCAtIEwyUDEueCk7XG4gICAgYjIgPSAoTDJQMi54ICogTDJQMS55IC0gTDJQMS54ICogTDJQMi55KSAvIChMMlAyLnggLSBMMlAxLngpO1xuICAgIHggPSBMMVAxLng7XG4gICAgeSA9IHggKiBrMiArIGIyO1xuICAgIHJldHVybiBuZXcgUG9pbnQoeCwgeSk7XG4gIH0gZWxzZSB7XG4gICAgazEgPSAoTDFQMi55IC0gTDFQMS55KSAvIChMMVAyLnggLSBMMVAxLngpO1xuICAgIGIxID0gKEwxUDIueCAqIEwxUDEueSAtIEwxUDEueCAqIEwxUDIueSkgLyAoTDFQMi54IC0gTDFQMS54KTtcbiAgICBrMiA9IChMMlAyLnkgLSBMMlAxLnkpIC8gKEwyUDIueCAtIEwyUDEueCk7XG4gICAgYjIgPSAoTDJQMi54ICogTDJQMS55IC0gTDJQMS54ICogTDJQMi55KSAvIChMMlAyLnggLSBMMlAxLngpO1xuICAgIHggPSAoYjEgLSBiMikgLyAoazIgLSBrMSk7XG4gICAgeSA9IHggKiBrMSArIGIxO1xuICAgIHJldHVybiBuZXcgUG9pbnQoeCwgeSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGJvdW5kVG9MaW5lKEEsIEIsIFApIHtcbiAgdmFyIEFQID0gbmV3IFBvaW50KFAueCAtIEEueCwgUC55IC0gQS55KSxcbiAgICAgIEFCID0gbmV3IFBvaW50KEIueCAtIEEueCwgQi55IC0gQS55KSxcbiAgICAgIGFiMiA9IEFCLnggKiBBQi54ICsgQUIueSAqIEFCLnksXG4gICAgICBhcF9hYiA9IEFQLnggKiBBQi54ICsgQVAueSAqIEFCLnksXG4gICAgICB0ID0gYXBfYWIgLyBhYjI7XG4gIHJldHVybiBuZXcgUG9pbnQoQS54ICsgQUIueCAqIHQsIEEueSArIEFCLnkgKiB0KTtcbn1cbmZ1bmN0aW9uIGdldFBvaW50T25MaW5lQnlMZW5naHQoTFAxLCBMUDIsIGxlbmdodCkge1xuICB2YXIgZHggPSBMUDIueCAtIExQMS54O1xuICB2YXIgZHkgPSBMUDIueSAtIExQMS55O1xuICB2YXIgcGVyY2VudCA9IGxlbmdodCAvIGdldERpc3RhbmNlKExQMSwgTFAyKTtcbiAgcmV0dXJuIG5ldyBQb2ludChMUDEueCArIHBlcmNlbnQgKiBkeCwgTFAxLnkgKyBwZXJjZW50ICogZHkpO1xufVxuZnVuY3Rpb24gYWRkUG9pbnRUb0JvdW5kUG9pbnRzKGJvdW5kcG9pbnRzLCBwb2ludCwgaXNSaWdodCkge1xuICB2YXIgcmVzdWx0ID0gYm91bmRwb2ludHMuZmlsdGVyKGZ1bmN0aW9uIChiUG9pbnQpIHtcbiAgICByZXR1cm4gYlBvaW50LnkgPiBwb2ludC55IHx8IChpc1JpZ2h0ID8gYlBvaW50LnggPCBwb2ludC54IDogYlBvaW50LnggPiBwb2ludC54KTtcbiAgfSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocG9pbnQueSA8IHJlc3VsdFtpXS55KSB7XG4gICAgICByZXN1bHQuc3BsaWNlKGksIDAsIHBvaW50KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgcmVzdWx0LnB1c2gocG9pbnQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBnZXRBbmdsZURpZmYoYWxwaGEsIGJldGEpIHtcbiAgdmFyIG1pbkFuZ2xlID0gTWF0aC5taW4oYWxwaGEsIGJldGEpO1xuICB2YXIgbWF4QW5nbGUgPSBNYXRoLm1heChhbHBoYSwgYmV0YSk7XG4gIHJldHVybiBNYXRoLm1pbihtYXhBbmdsZSAtIG1pbkFuZ2xlLCBtaW5BbmdsZSArIE1hdGguUEkgKiAyIC0gbWF4QW5nbGUpO1xufVxuZnVuY3Rpb24gZ2V0QW5nbGUocDEsIHAyKSB7XG4gIHZhciBkaWZmID0gcDIuc3ViKHAxKTtcbiAgcmV0dXJuIG5vcm1hbGl6ZUFuZ2xlKE1hdGguYXRhbjIoZGlmZi55LCBkaWZmLngpKTtcbn1cbmZ1bmN0aW9uIGJvdW5kQW5nbGUobWluLCBtYXgsIHZhbCkge1xuICB2YXIgZG1pbiwgZG1heDtcblxuICBpZiAobWluIDwgbWF4ICYmIHZhbCA+IG1pbiAmJiB2YWwgPCBtYXgpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9IGVsc2UgaWYgKG1heCA8IG1pbiAmJiAodmFsIDwgbWF4IHx8IHZhbCA+IG1pbikpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9IGVsc2Uge1xuICAgIGRtaW4gPSBnZXRBbmdsZURpZmYobWluLCB2YWwpO1xuICAgIGRtYXggPSBnZXRBbmdsZURpZmYobWF4LCB2YWwpO1xuXG4gICAgaWYgKGRtaW4gPCBkbWF4KSB7XG4gICAgICByZXR1cm4gbWluO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWF4O1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gbm9ybWFsaXplQW5nbGUodmFsKSB7XG4gIHdoaWxlICh2YWwgPCAwKSB7XG4gICAgdmFsICs9IDIgKiBNYXRoLlBJO1xuICB9XG5cbiAgd2hpbGUgKHZhbCA+IDIgKiBNYXRoLlBJKSB7XG4gICAgdmFsIC09IDIgKiBNYXRoLlBJO1xuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cbmZ1bmN0aW9uIGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShhbmdsZSwgbGVuZ3RoLCBjZW50ZXIpIHtcbiAgY2VudGVyID0gY2VudGVyIHx8IG5ldyBQb2ludCgwLCAwKTtcbiAgcmV0dXJuIGNlbnRlci5hZGQobmV3IFBvaW50KGxlbmd0aCAqIE1hdGguY29zKGFuZ2xlKSwgbGVuZ3RoICogTWF0aC5zaW4oYW5nbGUpKSk7XG59XG5cbnZhciBCb3VuZCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJvdW5kKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm91bmQsIFt7XG4gICAga2V5OiBcImJvdW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJvdW5kKHBvaW50LCBfc2l6ZSkge1xuICAgICAgcmV0dXJuIHBvaW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZWZyZXNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZnJlc2goKSB7fVxuICB9XSwgW3tcbiAgICBrZXk6IFwiYm91bmRpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYm91bmRpbmcoKSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBfY29uc3RydWN0KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuXG4gICAgICByZXR1cm4gaW5zdGFuY2UuYm91bmQuYmluZChpbnN0YW5jZSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvdW5kO1xufSgpO1xudmFyIEJvdW5kVG9SZWN0YW5nbGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Cb3VuZCkge1xuICBfaW5oZXJpdHMoQm91bmRUb1JlY3RhbmdsZSwgX0JvdW5kKTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKEJvdW5kVG9SZWN0YW5nbGUpO1xuXG4gIGZ1bmN0aW9uIEJvdW5kVG9SZWN0YW5nbGUocmVjdGFuZ2xlKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJvdW5kVG9SZWN0YW5nbGUpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICBfdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGU7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJvdW5kVG9SZWN0YW5nbGUsIFt7XG4gICAga2V5OiBcImJvdW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJvdW5kKHBvaW50LCBzaXplKSB7XG4gICAgICB2YXIgY2FsY1BvaW50ID0gcG9pbnQuY2xvbmUoKTtcbiAgICAgIHZhciByZWN0UDIgPSB0aGlzLnJlY3RhbmdsZS5nZXRQMygpO1xuXG4gICAgICBpZiAodGhpcy5yZWN0YW5nbGUucG9zaXRpb24ueCA+IGNhbGNQb2ludC54KSB7XG4gICAgICAgIGNhbGNQb2ludC54ID0gdGhpcy5yZWN0YW5nbGUucG9zaXRpb24ueDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucmVjdGFuZ2xlLnBvc2l0aW9uLnkgPiBjYWxjUG9pbnQueSkge1xuICAgICAgICBjYWxjUG9pbnQueSA9IHRoaXMucmVjdGFuZ2xlLnBvc2l0aW9uLnk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWN0UDIueCA8IGNhbGNQb2ludC54ICsgc2l6ZS54KSB7XG4gICAgICAgIGNhbGNQb2ludC54ID0gcmVjdFAyLnggLSBzaXplLng7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWN0UDIueSA8IGNhbGNQb2ludC55ICsgc2l6ZS55KSB7XG4gICAgICAgIGNhbGNQb2ludC55ID0gcmVjdFAyLnkgLSBzaXplLnk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYWxjUG9pbnQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvdW5kVG9SZWN0YW5nbGU7XG59KEJvdW5kKTtcbnZhciBCb3VuZFRvRWxlbWVudCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0JvdW5kVG9SZWN0YW5nbGUpIHtcbiAgX2luaGVyaXRzKEJvdW5kVG9FbGVtZW50LCBfQm91bmRUb1JlY3RhbmdsZSk7XG5cbiAgdmFyIF9zdXBlcjIgPSBfY3JlYXRlU3VwZXIoQm91bmRUb0VsZW1lbnQpO1xuXG4gIGZ1bmN0aW9uIEJvdW5kVG9FbGVtZW50KGVsZW1lbnQsIGNvbnRhaW5lcikge1xuICAgIHZhciBfdGhpczI7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQm91bmRUb0VsZW1lbnQpO1xuXG4gICAgX3RoaXMyID0gX3N1cGVyMi5jYWxsKHRoaXMsIFJlY3RhbmdsZS5mcm9tRWxlbWVudChlbGVtZW50LCBjb250YWluZXIpKTtcbiAgICBfdGhpczIuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgX3RoaXMyLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICByZXR1cm4gX3RoaXMyO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJvdW5kVG9FbGVtZW50LCBbe1xuICAgIGtleTogXCJyZWZyZXNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgICB0aGlzLnJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQm91bmRUb0VsZW1lbnQ7XG59KEJvdW5kVG9SZWN0YW5nbGUpO1xudmFyIEJvdW5kVG9MaW5lWCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0JvdW5kMikge1xuICBfaW5oZXJpdHMoQm91bmRUb0xpbmVYLCBfQm91bmQyKTtcblxuICB2YXIgX3N1cGVyMyA9IF9jcmVhdGVTdXBlcihCb3VuZFRvTGluZVgpO1xuXG4gIGZ1bmN0aW9uIEJvdW5kVG9MaW5lWCh4LCBzdGFydFksIGVuZFkpIHtcbiAgICB2YXIgX3RoaXMzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJvdW5kVG9MaW5lWCk7XG5cbiAgICBfdGhpczMgPSBfc3VwZXIzLmNhbGwodGhpcyk7XG4gICAgX3RoaXMzLnggPSB4O1xuICAgIF90aGlzMy5zdGFydFkgPSBzdGFydFk7XG4gICAgX3RoaXMzLmVuZFkgPSBlbmRZO1xuICAgIHJldHVybiBfdGhpczM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm91bmRUb0xpbmVYLCBbe1xuICAgIGtleTogXCJib3VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib3VuZChwb2ludCwgc2l6ZSkge1xuICAgICAgdmFyIGNhbGNQb2ludCA9IHBvaW50LmNsb25lKCk7XG4gICAgICBjYWxjUG9pbnQueCA9IHRoaXMueDtcblxuICAgICAgaWYgKHRoaXMuc3RhcnRZID4gY2FsY1BvaW50LnkpIHtcbiAgICAgICAgY2FsY1BvaW50LnkgPSB0aGlzLnN0YXJ0WTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZW5kWSA8IGNhbGNQb2ludC55ICsgc2l6ZS55KSB7XG4gICAgICAgIGNhbGNQb2ludC55ID0gdGhpcy5lbmRZIC0gc2l6ZS55O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FsY1BvaW50O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCb3VuZFRvTGluZVg7XG59KEJvdW5kKTtcbnZhciBCb3VuZFRvTGluZVkgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Cb3VuZDMpIHtcbiAgX2luaGVyaXRzKEJvdW5kVG9MaW5lWSwgX0JvdW5kMyk7XG5cbiAgdmFyIF9zdXBlcjQgPSBfY3JlYXRlU3VwZXIoQm91bmRUb0xpbmVZKTtcblxuICBmdW5jdGlvbiBCb3VuZFRvTGluZVkoeSwgc3RhcnRYLCBlbmRYKSB7XG4gICAgdmFyIF90aGlzNDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZFRvTGluZVkpO1xuXG4gICAgX3RoaXM0ID0gX3N1cGVyNC5jYWxsKHRoaXMpO1xuICAgIF90aGlzNC55ID0geTtcbiAgICBfdGhpczQuc3RhcnRYID0gc3RhcnRYO1xuICAgIF90aGlzNC5lbmRYID0gZW5kWDtcbiAgICByZXR1cm4gX3RoaXM0O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJvdW5kVG9MaW5lWSwgW3tcbiAgICBrZXk6IFwiYm91bmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYm91bmQocG9pbnQsIHNpemUpIHtcbiAgICAgIHZhciBjYWxjUG9pbnQgPSBwb2ludC5jbG9uZSgpO1xuICAgICAgY2FsY1BvaW50LnkgPSB0aGlzLnk7XG5cbiAgICAgIGlmICh0aGlzLnN0YXJ0WCA+IGNhbGNQb2ludC54KSB7XG4gICAgICAgIGNhbGNQb2ludC54ID0gdGhpcy5zdGFydFg7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmVuZFggPCBjYWxjUG9pbnQueCArIHNpemUueCkge1xuICAgICAgICBjYWxjUG9pbnQueCA9IHRoaXMuZW5kWCAtIHNpemUueDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbGNQb2ludDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQm91bmRUb0xpbmVZO1xufShCb3VuZCk7XG52YXIgQm91bmRUb0xpbmUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Cb3VuZDQpIHtcbiAgX2luaGVyaXRzKEJvdW5kVG9MaW5lLCBfQm91bmQ0KTtcblxuICB2YXIgX3N1cGVyNSA9IF9jcmVhdGVTdXBlcihCb3VuZFRvTGluZSk7XG5cbiAgZnVuY3Rpb24gQm91bmRUb0xpbmUoc3RhcnRQb2ludCwgZW5kUG9pbnQpIHtcbiAgICB2YXIgX3RoaXM1O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJvdW5kVG9MaW5lKTtcblxuICAgIF90aGlzNSA9IF9zdXBlcjUuY2FsbCh0aGlzKTtcbiAgICBfdGhpczUuc3RhcnRQb2ludCA9IHN0YXJ0UG9pbnQ7XG4gICAgX3RoaXM1LmVuZFBvaW50ID0gZW5kUG9pbnQ7XG4gICAgdmFyIGFscGhhID0gTWF0aC5hdGFuMihlbmRQb2ludC55IC0gc3RhcnRQb2ludC55LCBlbmRQb2ludC54IC0gc3RhcnRQb2ludC54KTtcbiAgICB2YXIgYmV0YSA9IGFscGhhICsgTWF0aC5QSSAvIDI7XG4gICAgX3RoaXM1LnNvbWVLID0gMTA7XG4gICAgX3RoaXM1LmNvc0JldGEgPSBNYXRoLmNvcyhiZXRhKTtcbiAgICBfdGhpczUuc2luQmV0YSA9IE1hdGguc2luKGJldGEpO1xuICAgIHJldHVybiBfdGhpczU7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm91bmRUb0xpbmUsIFt7XG4gICAga2V5OiBcImJvdW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJvdW5kKHBvaW50LCBzaXplKSB7XG4gICAgICB2YXIgcG9pbnQyID0gbmV3IFBvaW50KHBvaW50LnggKyB0aGlzLnNvbWVLICogdGhpcy5jb3NCZXRhLCBwb2ludC55ICsgdGhpcy5zb21lSyAqIHRoaXMuc2luQmV0YSk7XG4gICAgICB2YXIgbmV3RW5kUG9pbnQgPSBnZXRQb2ludE9uTGluZUJ5TGVuZ2h0KHRoaXMuZW5kUG9pbnQsIHRoaXMuc3RhcnRQb2ludCwgc2l6ZS54KTtcbiAgICAgIHZhciBwb2ludENyb3NzaW5nID0gZGlyZWN0Q3Jvc3NpbmcodGhpcy5zdGFydFBvaW50LCB0aGlzLmVuZFBvaW50LCBwb2ludCwgcG9pbnQyKTtcbiAgICAgIHJldHVybiBib3VuZFRvTGluZSh0aGlzLnN0YXJ0UG9pbnQsIG5ld0VuZFBvaW50LCBwb2ludENyb3NzaW5nKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQm91bmRUb0xpbmU7XG59KEJvdW5kKTtcbnZhciBCb3VuZFRvQ2lyY2xlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQm91bmQ1KSB7XG4gIF9pbmhlcml0cyhCb3VuZFRvQ2lyY2xlLCBfQm91bmQ1KTtcblxuICB2YXIgX3N1cGVyNiA9IF9jcmVhdGVTdXBlcihCb3VuZFRvQ2lyY2xlKTtcblxuICBmdW5jdGlvbiBCb3VuZFRvQ2lyY2xlKGNlbnRlciwgcmFkaXVzKSB7XG4gICAgdmFyIF90aGlzNjtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZFRvQ2lyY2xlKTtcblxuICAgIF90aGlzNiA9IF9zdXBlcjYuY2FsbCh0aGlzKTtcbiAgICBfdGhpczYuY2VudGVyID0gY2VudGVyO1xuICAgIF90aGlzNi5yYWRpdXMgPSByYWRpdXM7XG4gICAgcmV0dXJuIF90aGlzNjtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCb3VuZFRvQ2lyY2xlLCBbe1xuICAgIGtleTogXCJib3VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib3VuZChwb2ludCwgX3NpemUpIHtcbiAgICAgIHJldHVybiBnZXRQb2ludE9uTGluZUJ5TGVuZ2h0KHRoaXMuY2VudGVyLCBwb2ludCwgdGhpcy5yYWRpdXMpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCb3VuZFRvQ2lyY2xlO1xufShCb3VuZCk7XG52YXIgQm91bmRUb0FyYyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0JvdW5kVG9DaXJjbGUpIHtcbiAgX2luaGVyaXRzKEJvdW5kVG9BcmMsIF9Cb3VuZFRvQ2lyY2xlKTtcblxuICB2YXIgX3N1cGVyNyA9IF9jcmVhdGVTdXBlcihCb3VuZFRvQXJjKTtcblxuICBmdW5jdGlvbiBCb3VuZFRvQXJjKGNlbnRlciwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSkge1xuICAgIHZhciBfdGhpczc7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQm91bmRUb0FyYyk7XG5cbiAgICBfdGhpczcgPSBfc3VwZXI3LmNhbGwodGhpcywgY2VudGVyLCByYWRpdXMpO1xuICAgIF90aGlzNy5fc3RhcnRBbmdsZSA9IHN0YXJ0QW5nbGU7XG4gICAgX3RoaXM3Ll9lbmRBbmdsZSA9IGVuZEFuZ2xlO1xuICAgIHJldHVybiBfdGhpczc7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm91bmRUb0FyYywgW3tcbiAgICBrZXk6IFwic3RhcnRBbmdsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydEFuZ2xlKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9zdGFydEFuZ2xlID09PSAnZnVuY3Rpb24nID8gdGhpcy5fc3RhcnRBbmdsZSgpIDogdGhpcy5fc3RhcnRBbmdsZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZW5kQW5nbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5kQW5nbGUoKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2VuZEFuZ2xlID09PSAnZnVuY3Rpb24nID8gdGhpcy5fZW5kQW5nbGUoKSA6IHRoaXMuX2VuZEFuZ2xlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJib3VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib3VuZChwb2ludCwgX3NpemUpIHtcbiAgICAgIHZhciBhbmdsZSA9IGdldEFuZ2xlKHRoaXMuY2VudGVyLCBwb2ludCk7XG4gICAgICBhbmdsZSA9IG5vcm1hbGl6ZUFuZ2xlKGFuZ2xlKTtcbiAgICAgIGFuZ2xlID0gYm91bmRBbmdsZSh0aGlzLnN0YXJ0QW5nbGUoKSwgdGhpcy5lbmRBbmdsZSgpLCBhbmdsZSk7XG4gICAgICByZXR1cm4gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCB0aGlzLnJhZGl1cywgdGhpcy5jZW50ZXIpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCb3VuZFRvQXJjO1xufShCb3VuZFRvQ2lyY2xlKTtcblxuZnVuY3Rpb24gcmVtb3ZlSXRlbSAoYXJyYXksIHZhbCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWwpIHtcbiAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgIGktLTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyYXk7XG59XG5cbmZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcblxuICBpZiAodHlwZW9mIHN0b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgc3RvcCA9IHN0YXJ0O1xuICAgIHN0YXJ0ID0gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RlcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzdGVwID0gMTtcbiAgfVxuXG4gIGlmIChzdGVwID4gMCAmJiBzdGFydCA+PSBzdG9wIHx8IHN0ZXAgPCAwICYmIHN0YXJ0IDw9IHN0b3ApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IHN0ZXAgPiAwID8gaSA8IHN0b3AgOiBpID4gc3RvcDsgaSArPSBzdGVwKSB7XG4gICAgcmVzdWx0LnB1c2goaSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgQmFzaWNTdHJhdGVneSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJhc2ljU3RyYXRlZ3kocmVjdGFuZ2xlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJhc2ljU3RyYXRlZ3kpO1xuXG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGU7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCYXNpY1N0cmF0ZWd5LCBbe1xuICAgIGtleTogXCJib3VuZFJlY3RcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5yZWN0YW5nbGUgPT09ICdmdW5jdGlvbicgPyB0aGlzLnJlY3RhbmdsZSgpIDogdGhpcy5yZWN0YW5nbGU7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJhc2ljU3RyYXRlZ3k7XG59KCk7XG5cbnZhciBOb3RDcm9zc2luZ1N0cmF0ZWd5ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQmFzaWNTdHJhdGVneSkge1xuICBfaW5oZXJpdHMoTm90Q3Jvc3NpbmdTdHJhdGVneSwgX0Jhc2ljU3RyYXRlZ3kpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoTm90Q3Jvc3NpbmdTdHJhdGVneSk7XG5cbiAgZnVuY3Rpb24gTm90Q3Jvc3NpbmdTdHJhdGVneSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTm90Q3Jvc3NpbmdTdHJhdGVneSk7XG5cbiAgICByZXR1cm4gX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTm90Q3Jvc3NpbmdTdHJhdGVneSwgW3tcbiAgICBrZXk6IFwicG9zaXRpb25pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcG9zaXRpb25pbmcocmVjdGFuZ2xlTGlzdCwgaW5kZXhlc09mTmV3cykge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIHN0YXRpY1JlY3RhbmdsZUluZGV4ZXMgPSByZWN0YW5nbGVMaXN0LnJlZHVjZShmdW5jdGlvbiAoaW5kZXhlcywgX3JlY3QsIGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleGVzT2ZOZXdzLmluZGV4T2YoaW5kZXgpID09PSAtMSkge1xuICAgICAgICAgIGluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXhlcztcbiAgICAgIH0sIFtdKTtcbiAgICAgIGluZGV4ZXNPZk5ld3MuZm9yRWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIHJlY3QgPSByZWN0YW5nbGVMaXN0W2luZGV4XTtcbiAgICAgICAgdmFyIHJlbW92YWJsZSA9IGZhbHNlO1xuICAgICAgICBzdGF0aWNSZWN0YW5nbGVJbmRleGVzLmZvckVhY2goZnVuY3Rpb24gKGluZGV4T2ZTdGF0aWMpIHtcbiAgICAgICAgICB2YXIgc3RhdGljUmVjdCA9IHJlY3RhbmdsZUxpc3RbaW5kZXhPZlN0YXRpY107XG4gICAgICAgICAgcmVjdCA9IHN0YXRpY1JlY3QubW92ZVRvQm91bmQocmVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZW1vdmFibGUgPSBzdGF0aWNSZWN0YW5nbGVJbmRleGVzLnNvbWUoZnVuY3Rpb24gKGluZGV4T2ZTdGF0aWMpIHtcbiAgICAgICAgICB2YXIgc3RhdGljUmVjdCA9IHJlY3RhbmdsZUxpc3RbaW5kZXhPZlN0YXRpY107XG4gICAgICAgICAgcmV0dXJuICEhc3RhdGljUmVjdC5hbmQocmVjdCk7XG4gICAgICAgIH0pIHx8IHJlY3QuYW5kKF90aGlzLmJvdW5kUmVjdCkuZ2V0U3F1YXJlKCkgIT09IHJlY3QuZ2V0U3F1YXJlKCk7XG5cbiAgICAgICAgaWYgKHJlbW92YWJsZSkge1xuICAgICAgICAgIHJlY3QucmVtb3ZhYmxlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGF0aWNSZWN0YW5nbGVJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZWN0YW5nbGVMaXN0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzb3J0aW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNvcnRpbmcob2RsRHJhZ2dhYmxlc0xpc3QsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKSB7XG4gICAgICB2YXIgZHJhZ2dhYmxlcyA9IG9kbERyYWdnYWJsZXNMaXN0LmNvbmNhdChuZXdEcmFnZ2FibGVzKTtcbiAgICAgIG5ld0RyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGluZGV4T2ZOZXdzLnB1c2goZHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZHJhZ2dhYmxlcztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTm90Q3Jvc3NpbmdTdHJhdGVneTtcbn0oQmFzaWNTdHJhdGVneSk7XG5cbnZhciBGbG9hdExlZnRTdHJhdGVneSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0Jhc2ljU3RyYXRlZ3kyKSB7XG4gIF9pbmhlcml0cyhGbG9hdExlZnRTdHJhdGVneSwgX0Jhc2ljU3RyYXRlZ3kyKTtcblxuICB2YXIgX3N1cGVyMiA9IF9jcmVhdGVTdXBlcihGbG9hdExlZnRTdHJhdGVneSk7XG5cbiAgZnVuY3Rpb24gRmxvYXRMZWZ0U3RyYXRlZ3kocmVjdGFuZ2xlKSB7XG4gICAgdmFyIF90aGlzMjtcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbG9hdExlZnRTdHJhdGVneSk7XG5cbiAgICBfdGhpczIgPSBfc3VwZXIyLmNhbGwodGhpcywgcmVjdGFuZ2xlLCBvcHRpb25zKTtcbiAgICBfdGhpczIub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgcmVtb3ZhYmxlOiB0cnVlXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgX3RoaXMyLnJhZGl1cyA9IG9wdGlvbnMucmFkaXVzIHx8IDgwO1xuICAgIF90aGlzMi5wYWRkaW5nVG9wTGVmdCA9IG9wdGlvbnMucGFkZGluZ1RvcExlZnQgfHwgbmV3IFBvaW50KDAsIDApO1xuICAgIF90aGlzMi5wYWRkaW5nQm90dG9tUmlnaHQgPSBvcHRpb25zLnBhZGRpbmdCb3R0b21SaWdodCB8fCBuZXcgUG9pbnQoMCwgMCk7XG4gICAgX3RoaXMyLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyA9IG9wdGlvbnMueUdhcEJldHdlZW5EcmFnZ2FibGVzIHx8IDA7XG4gICAgX3RoaXMyLmdldERpc3RhbmNlID0gb3B0aW9ucy5nZXREaXN0YW5jZSB8fCBnZXREaXN0YW5jZTtcblxuICAgIF90aGlzMi5nZXRQb3NpdGlvbiA9IG9wdGlvbnMuZ2V0UG9zaXRpb24gfHwgZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgcmV0dXJuIGRyYWdnYWJsZS5wb3NpdGlvbjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhGbG9hdExlZnRTdHJhdGVneSwgW3tcbiAgICBrZXk6IFwicG9zaXRpb25pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcG9zaXRpb25pbmcocmVjdGFuZ2xlTGlzdCwgX2luZGV4ZXNPZk5ld3MpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgYm91bmRSZWN0ID0gdGhpcy5ib3VuZFJlY3Q7XG4gICAgICB2YXIgcmVjdFAyID0gYm91bmRSZWN0LmdldFAyKCk7XG4gICAgICB2YXIgYm91bmRhcnlQb2ludHMgPSBbYm91bmRSZWN0LnBvc2l0aW9uXTtcbiAgICAgIHJlY3RhbmdsZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAocmVjdCwgcmVjdEluZGV4KSB7XG4gICAgICAgIHZhciBwb3NpdGlvbixcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvdW5kYXJ5UG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9pbnQoYm91bmRhcnlQb2ludHNbaV0ueCArIF90aGlzMy5wYWRkaW5nVG9wTGVmdC54LCBpID4gMCA/IGJvdW5kYXJ5UG9pbnRzW2kgLSAxXS55ICsgX3RoaXMzLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyA6IGJvdW5kUmVjdC5wb3NpdGlvbi55ICsgX3RoaXMzLnBhZGRpbmdUb3BMZWZ0LnkpO1xuICAgICAgICAgIGlzVmFsaWQgPSBwb3NpdGlvbi54ICsgcmVjdC5zaXplLnggPCByZWN0UDIueDtcblxuICAgICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb2ludChib3VuZFJlY3QucG9zaXRpb24ueCArIF90aGlzMy5wYWRkaW5nVG9wTGVmdC54LCBib3VuZGFyeVBvaW50c1tib3VuZGFyeVBvaW50cy5sZW5ndGggLSAxXS55ICsgKHJlY3RJbmRleCA+IDAgPyBfdGhpczMueUdhcEJldHdlZW5EcmFnZ2FibGVzIDogX3RoaXMzLnBhZGRpbmdUb3BMZWZ0LnkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY3QucG9zaXRpb24gPSBwb3NpdGlvbjtcblxuICAgICAgICBpZiAoX3RoaXMzLm9wdGlvbnMucmVtb3ZhYmxlICYmIHJlY3QuZ2V0UDMoKS55ID4gYm91bmRSZWN0LmdldFAzKCkueSkge1xuICAgICAgICAgIHJlY3QucmVtb3ZhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvdW5kYXJ5UG9pbnRzID0gYWRkUG9pbnRUb0JvdW5kUG9pbnRzKGJvdW5kYXJ5UG9pbnRzLCByZWN0LmdldFAzKCkuYWRkKF90aGlzMy5wYWRkaW5nQm90dG9tUmlnaHQpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlY3RhbmdsZUxpc3Q7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNvcnRpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc29ydGluZyhvZGxEcmFnZ2FibGVzTGlzdCwgbmV3RHJhZ2dhYmxlcywgaW5kZXhPZk5ld3MpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgbmV3TGlzdCA9IG9kbERyYWdnYWJsZXNMaXN0LmNvbmNhdCgpO1xuICAgICAgdmFyIGxpc3RPbGRQb3NpdGlvbiA9IG9kbERyYWdnYWJsZXNMaXN0Lm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgIH0pO1xuICAgICAgbmV3RHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChuZXdEcmFnZ2FibGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gaW5kZXhPZk5lYXJlc3RQb2ludChsaXN0T2xkUG9zaXRpb24sIF90aGlzNC5nZXRQb3NpdGlvbihuZXdEcmFnZ2FibGUpLCBfdGhpczQucmFkaXVzLCBfdGhpczQuZ2V0RGlzdGFuY2UpO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICBpbmRleCA9IG5ld0xpc3QubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluZGV4ID0gbmV3TGlzdC5pbmRleE9mKG9kbERyYWdnYWJsZXNMaXN0W2luZGV4XSk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXdMaXN0LnNwbGljZShpbmRleCwgMCwgbmV3RHJhZ2dhYmxlKTtcbiAgICAgIH0pO1xuICAgICAgbmV3RHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChuZXdEcmFnZ2FibGUpIHtcbiAgICAgICAgaW5kZXhPZk5ld3MucHVzaChuZXdMaXN0LmluZGV4T2YobmV3RHJhZ2dhYmxlKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdMaXN0O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBGbG9hdExlZnRTdHJhdGVneTtcbn0oQmFzaWNTdHJhdGVneSk7XG5cbnZhciBGbG9hdFJpZ2h0U3RyYXRlZ3kgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9GbG9hdExlZnRTdHJhdGVneSkge1xuICBfaW5oZXJpdHMoRmxvYXRSaWdodFN0cmF0ZWd5LCBfRmxvYXRMZWZ0U3RyYXRlZ3kpO1xuXG4gIHZhciBfc3VwZXIzID0gX2NyZWF0ZVN1cGVyKEZsb2F0UmlnaHRTdHJhdGVneSk7XG5cbiAgZnVuY3Rpb24gRmxvYXRSaWdodFN0cmF0ZWd5KHJlY3RhbmdsZSkge1xuICAgIHZhciBfdGhpczU7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxvYXRSaWdodFN0cmF0ZWd5KTtcblxuICAgIF90aGlzNSA9IF9zdXBlcjMuY2FsbCh0aGlzLCByZWN0YW5nbGUsIG9wdGlvbnMpO1xuICAgIF90aGlzNS5wYWRkaW5nVG9wUmlnaHQgPSBvcHRpb25zLnBhZGRpbmdUb3BSaWdodCB8fCBuZXcgUG9pbnQoNSwgNSk7XG4gICAgX3RoaXM1LnBhZGRpbmdCb3R0b21MZWZ0ID0gb3B0aW9ucy5wYWRkaW5nQm90dG9tTGVmdCB8fCBuZXcgUG9pbnQoMCwgMCk7XG4gICAgX3RoaXM1LnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyA9IG9wdGlvbnMueUdhcEJldHdlZW5EcmFnZ2FibGVzIHx8IDA7XG4gICAgX3RoaXM1LnBhZGRpbmdCb3R0b21OZWdMZWZ0ID0gbmV3IFBvaW50KC1fdGhpczUucGFkZGluZ0JvdHRvbUxlZnQueCwgX3RoaXM1LnBhZGRpbmdCb3R0b21MZWZ0LnkpO1xuICAgIHJldHVybiBfdGhpczU7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRmxvYXRSaWdodFN0cmF0ZWd5LCBbe1xuICAgIGtleTogXCJwb3NpdGlvbmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3NpdGlvbmluZyhyZWN0YW5nbGVMaXN0LCBfaW5kZXhlc09mTmV3cykge1xuICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgIHZhciBib3VuZFJlY3QgPSB0aGlzLmJvdW5kUmVjdDtcbiAgICAgIHZhciBib3VuZGFyeVBvaW50cyA9IFtib3VuZFJlY3QuZ2V0UDIoKV07XG4gICAgICByZWN0YW5nbGVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHJlY3QsIHJlY3RJbmRleCkge1xuICAgICAgICB2YXIgcG9zaXRpb24sXG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3VuZGFyeVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHBvc2l0aW9uID0gbmV3IFBvaW50KGJvdW5kYXJ5UG9pbnRzW2ldLnggLSByZWN0LnNpemUueCAtIF90aGlzNi5wYWRkaW5nVG9wUmlnaHQueCwgaSA+IDAgPyBib3VuZGFyeVBvaW50c1tpIC0gMV0ueSArIF90aGlzNi55R2FwQmV0d2VlbkRyYWdnYWJsZXMgOiBib3VuZFJlY3QucG9zaXRpb24ueSArIF90aGlzNi5wYWRkaW5nVG9wUmlnaHQueSk7XG4gICAgICAgICAgaXNWYWxpZCA9IHBvc2l0aW9uLnggPiByZWN0LnBvc2l0aW9uLng7XG5cbiAgICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9pbnQoYm91bmRSZWN0LmdldFAyKCkueCAtIHJlY3Quc2l6ZS54IC0gX3RoaXM2LnBhZGRpbmdUb3BSaWdodC54LCBib3VuZGFyeVBvaW50c1tib3VuZGFyeVBvaW50cy5sZW5ndGggLSAxXS55ICsgKHJlY3RJbmRleCA+IDAgPyBfdGhpczYueUdhcEJldHdlZW5EcmFnZ2FibGVzIDogX3RoaXM2LnBhZGRpbmdUb3BSaWdodC55KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWN0LnBvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICAgICAgaWYgKF90aGlzNi5vcHRpb25zLnJlbW92YWJsZSAmJiByZWN0LmdldFA0KCkueSA+IGJvdW5kUmVjdC5nZXRQNCgpLnkpIHtcbiAgICAgICAgICByZWN0LnJlbW92YWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBib3VuZGFyeVBvaW50cyA9IGFkZFBvaW50VG9Cb3VuZFBvaW50cyhib3VuZGFyeVBvaW50cywgcmVjdC5nZXRQNCgpLmFkZChfdGhpczYucGFkZGluZ0JvdHRvbU5lZ0xlZnQpLCB0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlY3RhbmdsZUxpc3Q7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEZsb2F0UmlnaHRTdHJhdGVneTtcbn0oRmxvYXRMZWZ0U3RyYXRlZ3kpO1xuXG52YXIgYWRkVG9EZWZhdWx0U2NvcGUgPSBmdW5jdGlvbiBhZGRUb0RlZmF1bHRTY29wZSh0YXJnZXQpIHtcbiAgZGVmYXVsdFNjb3BlLmFkZFRhcmdldCh0YXJnZXQpO1xufTtcblxudmFyIFRhcmdldCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoVGFyZ2V0LCBfRXZlbnRFbWl0dGVyKTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFRhcmdldCk7XG5cbiAgZnVuY3Rpb24gVGFyZ2V0KGVsZW1lbnQsIGRyYWdnYWJsZXMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGFyZ2V0KTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyk7XG5cbiAgICBfdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICB0aW1lRW5kOiAyMDAsXG4gICAgICB0aW1lRXhjYW5nZTogNDAwXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgX3RoaXMucG9zaXRpb25pbmdTdHJhdGVneSA9IG9wdGlvbnMuc3RyYXRlZ3kgfHwgbmV3IEZsb2F0TGVmdFN0cmF0ZWd5KF90aGlzLmdldFJlY3RhbmdsZS5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSwge1xuICAgICAgcmFkaXVzOiA4MCxcbiAgICAgIGdldERpc3RhbmNlOiB0cmFuc2Zvcm1lZFNwYWNlRGlzdGFuY2VGYWN0b3J5KHtcbiAgICAgICAgeDogMSxcbiAgICAgICAgeTogNFxuICAgICAgfSksXG4gICAgICByZW1vdmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBfdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICBkcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgcmV0dXJuIGRyYWdnYWJsZS50YXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICB9KTtcbiAgICBfdGhpcy5kcmFnZ2FibGVzID0gZHJhZ2dhYmxlcztcbiAgICBUYXJnZXQuZW1pdHRlci5lbWl0KCd0YXJnZXQ6Y3JlYXRlJywgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuXG4gICAgX3RoaXMuc3RhcnRCb3VuZGluZygpO1xuXG4gICAgX3RoaXMuaW5pdCgpO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFRhcmdldCwgW3tcbiAgICBrZXk6IFwic3RhcnRCb3VuZGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydEJvdW5kaW5nKCkge1xuICAgICAgdGhpcy5ib3VuZCA9IHRoaXMub3B0aW9ucy5ib3VuZCB8fCBCb3VuZFRvRWxlbWVudC5ib3VuZGluZyh0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwb3NpdGlvbmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3NpdGlvbmluZyhkcmFnZ2FibGVzLCBpbmRleGVzT2ZOZXcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uaW5nU3RyYXRlZ3kucG9zaXRpb25pbmcoZHJhZ2dhYmxlcywgaW5kZXhlc09mTmV3KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic29ydGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzb3J0aW5nKG9sZERyYWdnYWJsZXMsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbmluZ1N0cmF0ZWd5LnNvcnRpbmcob2xkRHJhZ2dhYmxlcywgbmV3RHJhZ2dhYmxlcywgaW5kZXhPZk5ld3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHJlY3RhbmdsZXMsIGluZGV4ZXNPZk5ldztcbiAgICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzID0gdGhpcy5kcmFnZ2FibGVzLmZpbHRlcihmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZHJhZ2dhYmxlLmVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgIGlmIChlbGVtZW50ID09PSBfdGhpczIuZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMubGVuZ3RoKSB7XG4gICAgICAgIGluZGV4ZXNPZk5ldyA9IHJhbmdlKHRoaXMuaW5uZXJEcmFnZ2FibGVzLmxlbmd0aCk7XG4gICAgICAgIHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5nZXRSZWN0YW5nbGUoKTtcbiAgICAgICAgfSksIGluZGV4ZXNPZk5ldyk7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgaW5kZXhlc09mTmV3KTtcbiAgICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5lbWl0KCd0YXJnZXQ6YWRkJywgZHJhZ2dhYmxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFJlY3RhbmdsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRSZWN0YW5nbGUoKSB7XG4gICAgICByZXR1cm4gUmVjdGFuZ2xlLmZyb21FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jb250YWluZXIsIHRoaXMub3B0aW9ucy5pc0NvbnRlbnRCb3hTaXplLCB0cnVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2F0Y2hEcmFnZ2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2F0Y2hEcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNhdGNoRHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2F0Y2hEcmFnZ2FibGUodGhpcywgZHJhZ2dhYmxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB0YXJnZXRSZWN0YW5nbGUgPSB0aGlzLmdldFJlY3RhbmdsZSgpO1xuICAgICAgICB2YXIgZHJhZ2dhYmxlU3F1YXJlID0gZHJhZ2dhYmxlLmdldFJlY3RhbmdsZSgpLmdldFNxdWFyZSgpO1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlU3F1YXJlIDwgdGFyZ2V0UmVjdGFuZ2xlLmdldFNxdWFyZSgpICYmIHRhcmdldFJlY3RhbmdsZS5pbmNsdWRlUG9pbnQoZHJhZ2dhYmxlLmdldENlbnRlcigpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UG9zaXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UG9zaXRpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRSZWN0YW5nbGUoKS5wb3NpdGlvbjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVjdGFuZ2xlKCkuc2l6ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVzdHJveVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHNjb3Blcy5mb3JFYWNoKGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlSXRlbShzY29wZS50YXJnZXRzLCBfdGhpczMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlZnJlc2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgIHZhciByZWN0YW5nbGVzID0gdGhpcy5wb3NpdGlvbmluZyh0aGlzLmlubmVyRHJhZ2dhYmxlcy5tYXAoZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLmdldFJlY3RhbmdsZSgpO1xuICAgICAgfSksIFtdKTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgW10sIDApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbkVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkVuZChkcmFnZ2FibGUpIHtcbiAgICAgIHZhciBuZXdEcmFnZ2FibGVzSW5kZXggPSBbXTtcblxuICAgICAgaWYgKHRoaXMuZ2V0UmVjdGFuZ2xlKCkuaW5jbHVkZVBvaW50KGRyYWdnYWJsZS5nZXRDZW50ZXIoKSkpIHtcbiAgICAgICAgZHJhZ2dhYmxlLnBvc2l0aW9uID0gdGhpcy5ib3VuZChkcmFnZ2FibGUucG9zaXRpb24sIGRyYWdnYWJsZS5nZXRTaXplKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVtaXQoJ3RhcmdldDpiZWZvcmVBZGQnLCBkcmFnZ2FibGUpO1xuICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMgPSB0aGlzLnNvcnRpbmcodGhpcy5pbm5lckRyYWdnYWJsZXMsIFtkcmFnZ2FibGVdLCBuZXdEcmFnZ2FibGVzSW5kZXgpO1xuICAgICAgdmFyIHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgICB9KSwgbmV3RHJhZ2dhYmxlc0luZGV4KTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgbmV3RHJhZ2dhYmxlc0luZGV4KTtcblxuICAgICAgaWYgKHRoaXMuaW5uZXJEcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5hZGRSZW1vdmVPbk1vdmUoZHJhZ2dhYmxlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldFBvc2l0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFBvc2l0aW9uKHJlY3RhbmdsZXMsIGluZGV4ZXNPZk5ldywgdGltZSkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzLnNsaWNlKDApLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSwgaSkge1xuICAgICAgICB2YXIgcmVjdCA9IHJlY3RhbmdsZXNbaV0sXG4gICAgICAgICAgICB0aW1lRW5kID0gdGltZSB8fCB0aW1lID09PSAwID8gdGltZSA6IGluZGV4ZXNPZk5ldy5pbmRleE9mKGkpICE9PSAtMSA/IF90aGlzNC5vcHRpb25zLnRpbWVFbmQgOiBfdGhpczQub3B0aW9ucy50aW1lRXhjYW5nZTtcblxuICAgICAgICBpZiAocmVjdC5yZW1vdmFibGUpIHtcbiAgICAgICAgICBkcmFnZ2FibGUubW92ZShkcmFnZ2FibGUuaW5pdGlhbFBvc2l0aW9uLCB0aW1lRW5kLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICByZW1vdmVJdGVtKF90aGlzNC5pbm5lckRyYWdnYWJsZXMsIGRyYWdnYWJsZSk7XG5cbiAgICAgICAgICBfdGhpczQuZW1pdCgndGFyZ2V0OnJlbW92ZScsIGRyYWdnYWJsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhZ2dhYmxlLm1vdmUocmVjdC5wb3NpdGlvbiwgdGltZUVuZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkKGRyYWdnYWJsZSwgdGltZSkge1xuICAgICAgdmFyIG5ld0RyYWdnYWJsZXNJbmRleCA9IHRoaXMuaW5uZXJEcmFnZ2FibGVzLmxlbmd0aDtcbiAgICAgIHRoaXMuZW1pdCgndGFyZ2V0OmJlZm9yZUFkZCcsIGRyYWdnYWJsZSk7XG4gICAgICB0aGlzLnB1c2hJbm5lckRyYWdnYWJsZShkcmFnZ2FibGUpO1xuICAgICAgdmFyIHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgICB9KSwgbmV3RHJhZ2dhYmxlc0luZGV4LCBkcmFnZ2FibGUpO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvbihyZWN0YW5nbGVzLCBbbmV3RHJhZ2dhYmxlc0luZGV4XSwgdGltZSB8fCAwKTtcblxuICAgICAgaWYgKHRoaXMuaW5uZXJEcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5hZGRSZW1vdmVPbk1vdmUoZHJhZ2dhYmxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHVzaElubmVyRHJhZ2dhYmxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHB1c2hJbm5lckRyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICAgIGlmICh0aGlzLmlubmVyRHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzLnB1c2goZHJhZ2dhYmxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkUmVtb3ZlT25Nb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFJlbW92ZU9uTW92ZShkcmFnZ2FibGUpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICBkcmFnZ2FibGUub24oJ2RyYWc6bW92ZScsIHRoaXMucmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXM1LnJlbW92ZShkcmFnZ2FibGUpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmVtaXQoJ3RhcmdldDphZGQnLCBkcmFnZ2FibGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKGRyYWdnYWJsZSkge1xuICAgICAgZHJhZ2dhYmxlLnVuc3Vic2NyaWJlKCdkcmFnOm1vdmUnLCB0aGlzLnJlbW92ZUhhbmRsZXIpO1xuICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbm5lckRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpO1xuXG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHZhciByZWN0YW5nbGVzID0gdGhpcy5wb3NpdGlvbmluZyh0aGlzLmlubmVyRHJhZ2dhYmxlcy5tYXAoZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLmdldFJlY3RhbmdsZSgpO1xuICAgICAgfSksIFtdKTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgW10pO1xuICAgICAgdGhpcy5lbWl0KCd0YXJnZXQ6cmVtb3ZlJywgZHJhZ2dhYmxlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVzZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGRyYWdnYWJsZS5tb3ZlKGRyYWdnYWJsZS5pbml0aWFsUG9zaXRpb24sIDAsIHRydWUsIHRydWUpO1xuXG4gICAgICAgIF90aGlzNi5lbWl0KCd0YXJnZXQ6cmVtb3ZlJywgZHJhZ2dhYmxlKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMgPSBbXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U29ydGVkRHJhZ2dhYmxlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTb3J0ZWREcmFnZ2FibGVzKCkge1xuICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuc2xpY2UoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29udGFpbmVyXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyIHx8IHRoaXMub3B0aW9ucy5jb250YWluZXIgfHwgdGhpcy5vcHRpb25zLnBhcmVudCB8fCBnZXREZWZhdWx0Q29udGFpbmVyKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFRhcmdldDtcbn0oRXZlbnRFbWl0dGVyKTtcblRhcmdldC5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuVGFyZ2V0LmVtaXR0ZXIub24oJ3RhcmdldDpjcmVhdGUnLCBhZGRUb0RlZmF1bHRTY29wZSk7XG5cbnZhciBzY29wZXMgPSBbXTtcblxudmFyIFNjb3BlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfRXZlbnRFbWl0dGVyKSB7XG4gIF9pbmhlcml0cyhTY29wZSwgX0V2ZW50RW1pdHRlcik7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihTY29wZSk7XG5cbiAgZnVuY3Rpb24gU2NvcGUoZHJhZ2dhYmxlcywgdGFyZ2V0cykge1xuICAgIHZhciBfdGhpcztcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTY29wZSk7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIHNjb3Blcy5mb3JFYWNoKGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgaWYgKGRyYWdnYWJsZXMpIHtcbiAgICAgICAgZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgICByZW1vdmVJdGVtKHNjb3BlLmRyYWdnYWJsZXMsIGRyYWdnYWJsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0cykge1xuICAgICAgICB0YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgIHJlbW92ZUl0ZW0oc2NvcGUudGFyZ2V0cywgdGFyZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgX3RoaXMuZHJhZ2dhYmxlcyA9IGRyYWdnYWJsZXMgfHwgW107XG4gICAgX3RoaXMudGFyZ2V0cyA9IHRhcmdldHMgfHwgW107XG4gICAgc2NvcGVzLnB1c2goX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLm9wdGlvbnMgPSB7XG4gICAgICB0aW1lRW5kOiBvcHRpb25zLnRpbWVFbmQgfHwgNDAwXG4gICAgfTtcblxuICAgIF90aGlzLmluaXQoKTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTY29wZSwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgZHJhZ2dhYmxlLmRyYWdFbmRBY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5vbkVuZChkcmFnZ2FibGUpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZERyYWdnYWJsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGREcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdGhpcy5kcmFnZ2FibGVzLnB1c2goZHJhZ2dhYmxlKTtcblxuICAgICAgZHJhZ2dhYmxlLmRyYWdFbmRBY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczMub25FbmQoZHJhZ2dhYmxlKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZFRhcmdldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRUYXJnZXQodGFyZ2V0KSB7XG4gICAgICB0aGlzLnRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbkVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkVuZChkcmFnZ2FibGUpIHtcbiAgICAgIHZhciBzaG90VGFyZ2V0cyA9IHRoaXMudGFyZ2V0cy5maWx0ZXIoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0LmRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpICE9PSAtMTtcbiAgICAgIH0pLmZpbHRlcihmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuY2F0Y2hEcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbiAgICAgIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuZ2V0UmVjdGFuZ2xlKCkuZ2V0U3F1YXJlKCkgLSBiLmdldFJlY3RhbmdsZSgpLmdldFNxdWFyZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzaG90VGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgc2hvdFRhcmdldHNbMF0ub25FbmQoZHJhZ2dhYmxlKTtcbiAgICAgIH0gZWxzZSBpZiAoZHJhZ2dhYmxlLnRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIGRyYWdnYWJsZS5waW5Qb3NpdGlvbihkcmFnZ2FibGUuaW5pdGlhbFBvc2l0aW9uLCB0aGlzLm9wdGlvbnMudGltZUVuZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdCgnc2NvcGU6Y2hhbmdlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlc2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgdGhpcy50YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlc2V0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVmcmVzaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy50YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwb3NpdGlvbnNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpcy50YXJnZXRzLm1hcChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuaW5uZXJEcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNC5kcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHBvc2l0aW9ucykge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHZhciBtZXNzYWdlID0gJ3dyb25nIGFycmF5IGxlbmd0aCc7XG5cbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLnRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0LnJlc2V0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwb3NpdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0SW5kZXhlcywgaSkge1xuICAgICAgICAgIHRhcmdldEluZGV4ZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIF90aGlzNS50YXJnZXRzW2ldLmFkZChfdGhpczUuZHJhZ2dhYmxlc1tpbmRleF0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNjb3BlO1xufShFdmVudEVtaXR0ZXIpO1xuXG52YXIgZGVmYXVsdFNjb3BlID0gbmV3IFNjb3BlKCk7XG5cbmZ1bmN0aW9uIHNjb3BlKGZuKSB7XG4gIHZhciBjdXJyZW50U2NvcGUgPSBuZXcgU2NvcGUoKTtcblxuICB2YXIgYWRkRHJhZ2dhYmxlVG9TY29wZSA9IGZ1bmN0aW9uIGFkZERyYWdnYWJsZVRvU2NvcGUoZHJhZ2dhYmxlKSB7XG4gICAgY3VycmVudFNjb3BlLmFkZERyYWdnYWJsZShkcmFnZ2FibGUpO1xuICAgIERyYWdnYWJsZS5lbWl0dGVyLmludGVycnVwdCgpO1xuICB9O1xuXG4gIHZhciBhZGRUYXJnZXRUb1Njb3BlID0gZnVuY3Rpb24gYWRkVGFyZ2V0VG9TY29wZSh0YXJnZXQpIHtcbiAgICBjdXJyZW50U2NvcGUuYWRkVGFyZ2V0KHRhcmdldCk7XG4gICAgRHJhZ2dhYmxlLmVtaXR0ZXIuaW50ZXJydXB0KCk7XG4gIH07XG5cbiAgRHJhZ2dhYmxlLmVtaXR0ZXIucHJlcGVuZE9uKCdkcmFnZ2FibGU6Y3JlYXRlJywgYWRkRHJhZ2dhYmxlVG9TY29wZSk7XG4gIFRhcmdldC5lbWl0dGVyLnByZXBlbmRPbigndGFyZ2V0OmNyZWF0ZScsIGFkZFRhcmdldFRvU2NvcGUpO1xuICBmbi5jYWxsKCk7XG4gIERyYWdnYWJsZS5lbWl0dGVyLnVuc3Vic2NyaWJlKCdkcmFnZ2FibGU6Y3JlYXRlJywgYWRkRHJhZ2dhYmxlVG9TY29wZSk7XG4gIFRhcmdldC5lbWl0dGVyLnVuc3Vic2NyaWJlKCd0YXJnZXQ6Y3JlYXRlJywgYWRkVGFyZ2V0VG9TY29wZSk7XG4gIHJldHVybiBjdXJyZW50U2NvcGU7XG59XG5cbnZhciBpc1RvdWNoID0gKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyk7XG52YXIgbW91c2VFdmVudHMgPSB7XG4gIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgbW92ZTogJ21vdXNlbW92ZScsXG4gIGVuZDogJ21vdXNldXAnXG59O1xudmFyIHRvdWNoRXZlbnRzID0ge1xuICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICBtb3ZlOiAndG91Y2htb3ZlJyxcbiAgZW5kOiAndG91Y2hlbmQnXG59O1xudmFyIGRyYWdnYWJsZXMgPSBbXTtcbnZhciB0cmFuc2Zvcm1Qcm9wZXJ0eSA9IGdldFN0eWxlUHJvcGVydHkoJ3RyYW5zZm9ybScpO1xudmFyIHRyYW5zaXRpb25Qcm9wZXJ0eSA9IGdldFN0eWxlUHJvcGVydHkoJ3RyYW5zaXRpb24nKTtcblxuZnVuY3Rpb24gZ2V0VG91Y2hCeUlEKGVsZW1lbnQsIHRvdWNoSWQpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVsZW1lbnQuY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gdG91Y2hJZCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RG91YmxlSW5pdChkcmFnZ2FibGUpIHtcbiAgdmFyIG1lc3NhZ2UgPSBcImZvciB0aGlzIGVsZW1lbnQgRHJhZ2VlLkRyYWdnYWJsZSBpcyBhbHJlYWR5IGV4aXN0LCBkb24ndCBjcmVhdGUgaXQgdHdpY2UgXCI7XG5cbiAgaWYgKGRyYWdnYWJsZXMuc29tZShmdW5jdGlvbiAoZXhpc3RpbmcpIHtcbiAgICByZXR1cm4gZHJhZ2dhYmxlLmVsZW1lbnQgPT09IGV4aXN0aW5nLmVsZW1lbnQ7XG4gIH0pKSB7XG4gICAgdGhyb3cgbWVzc2FnZTtcbiAgfVxuXG4gIGRyYWdnYWJsZXMucHVzaChkcmFnZ2FibGUpO1xufVxuXG5mdW5jdGlvbiBhZGRUb0RlZmF1bHRTY29wZSQxKGRyYWdnYWJsZSkge1xuICBkZWZhdWx0U2NvcGUuYWRkRHJhZ2dhYmxlKGRyYWdnYWJsZSk7XG59XG5cbmZ1bmN0aW9uIGNvcHlTdHlsZXMoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICB2YXIgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzb3VyY2UpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gY3NbaV07XG5cbiAgICBpZiAoa2V5LmluZGV4T2YoJ3RyYW5zaXRpb24nKSA8IDAgJiYga2V5LmluZGV4T2YoJ3RyYW5zZm9ybScpIDwgMCkge1xuICAgICAgZGVzdGluYXRpb24uc3R5bGVba2V5XSA9IGNzW2tleV07XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHNvdXJjZS5jaGlsZHJlbi5sZW5ndGg7IF9pKyspIHtcbiAgICBjb3B5U3R5bGVzKHNvdXJjZS5jaGlsZHJlbltfaV0sIGRlc3RpbmF0aW9uLmNoaWxkcmVuW19pXSk7XG4gIH1cbn1cblxudmFyIERyYWdnYWJsZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoRHJhZ2dhYmxlLCBfRXZlbnRFbWl0dGVyKTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKERyYWdnYWJsZSk7XG5cbiAgZnVuY3Rpb24gRHJhZ2dhYmxlKGVsZW1lbnQpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRHJhZ2dhYmxlKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgX3RoaXMudGFyZ2V0cyA9IFtdO1xuICAgIF90aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIF90aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHByZXZlbnREb3VibGVJbml0KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBEcmFnZ2FibGUuZW1pdHRlci5lbWl0KCdkcmFnZ2FibGU6Y3JlYXRlJywgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLl9lbmFibGUgPSB0cnVlO1xuXG4gICAgX3RoaXMuc3RhcnRCb3VuZGluZygpO1xuXG4gICAgX3RoaXMuc3RhcnRQb3NpdGlvbmluZygpO1xuXG4gICAgX3RoaXMuc3RhcnRMaXN0ZW5pbmcoKTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhEcmFnZ2FibGUsIFt7XG4gICAga2V5OiBcInN0YXJ0Qm91bmRpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnRCb3VuZGluZygpIHtcbiAgICAgIHRoaXMuYm91bmQgPSB0aGlzLm9wdGlvbnMuYm91bmQgfHwgQm91bmRUb0VsZW1lbnQuYm91bmRpbmcodGhpcy5jb250YWluZXIsIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RhcnRQb3NpdGlvbmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydFBvc2l0aW9uaW5nKCkge1xuICAgICAgdGhpcy5fc2V0RGVmYXVsdFRyYW5zaXRpb24oKTtcblxuICAgICAgdGhpcy5vZmZzZXQgPSBQb2ludC5lbGVtZW50T2Zmc2V0KHRoaXMuZWxlbWVudCwgdGhpcy5jb250YWluZXIsIHRydWUpO1xuICAgICAgdGhpcy5waW5uZWRQb3NpdGlvbiA9IHRoaXMub2Zmc2V0O1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMub2Zmc2V0O1xuICAgICAgdGhpcy5pbml0aWFsUG9zaXRpb24gPSB0aGlzLm9wdGlvbnMucG9zaXRpb24gfHwgdGhpcy5vZmZzZXQ7XG4gICAgICB0aGlzLnBpblBvc2l0aW9uKHRoaXMuaW5pdGlhbFBvc2l0aW9uKTtcblxuICAgICAgaWYgKHRoaXMuYm91bmQucmVmcmVzaCkge1xuICAgICAgICB0aGlzLmJvdW5kLnJlZnJlc2goKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RhcnRMaXN0ZW5pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnRMaXN0ZW5pbmcoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdGhpcy5fZHJhZ1N0YXJ0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuZHJhZ1N0YXJ0KGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2RyYWdNb3ZlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuZHJhZ01vdmUoZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fZHJhZ0VuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmRyYWdFbmQoZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fbmF0aXZlRHJhZ1N0YXJ0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIubmF0aXZlRHJhZ1N0YXJ0KGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX25hdGl2ZURyYWdPdmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIubmF0aXZlRHJhZ092ZXIoZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fbmF0aXZlRHJhZ0VuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLm5hdGl2ZURyYWdFbmQoZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fbmF0aXZlRHJvcCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLm5hdGl2ZURyb3AoZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fc2Nyb2xsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIub25TY3JvbGwoZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5oYW5kbGVyLmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuc3RhcnQsIHRoaXMuX2RyYWdTdGFydCwgIGZhbHNlKTtcbiAgICAgIHRoaXMuaGFuZGxlci5hZGRFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLnN0YXJ0LCB0aGlzLl9kcmFnU3RhcnQsICBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5fbmF0aXZlRHJhZ1N0YXJ0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgICAgcmV0dXJuIFBvaW50LmVsZW1lbnRTaXplKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLmlzQ29udGVudEJveFNpemUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRQb3NpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLm9mZnNldC5hZGQodGhpcy5fdHJhbnNmb3JtUG9zaXRpb24gfHwgbmV3IFBvaW50KDAsIDApKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDZW50ZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VudGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24uYWRkKHRoaXMuZ2V0U2l6ZSgpLm11bHQoMC41KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9zZXREZWZhdWx0VHJhbnNpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0RGVmYXVsdFRyYW5zaXRpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudClbdHJhbnNpdGlvblByb3BlcnR5XTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3NldFRyYW5zaXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFRyYW5zaXRpb24odGltZSkge1xuICAgICAgdmFyIHRyYW5zaXRpb24gPSB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XTtcbiAgICAgIHZhciB0cmFuc2l0aW9uQ3NzID0gXCJ0cmFuc2Zvcm0gXCIuY29uY2F0KHRpbWUsIFwibXNcIik7XG5cbiAgICAgIGlmICghL3RyYW5zZm9ybSBcXGQqbT9zLy50ZXN0KHRyYW5zaXRpb24pKSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbiArPSBcIiwgXCIuY29uY2F0KHRyYW5zaXRpb25Dc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyYW5zaXRpb24gPSB0cmFuc2l0aW9uQ3NzO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2l0aW9uID0gdHJhbnNpdGlvbi5yZXBsYWNlKC90cmFuc2Zvcm0gXFxkKm0/cy8sIHRyYW5zaXRpb25Dc3MpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XSA9IHRyYW5zaXRpb247XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9zZXRUcmFuc2xhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFRyYW5zbGF0ZShwb2ludCkge1xuICAgICAgdGhpcy5fdHJhbnNmb3JtUG9zaXRpb24gPSBwb2ludDtcbiAgICAgIHZhciB0cmFuc2xhdGVDc3MgPSBcInRyYW5zbGF0ZTNkKFwiLmNvbmNhdChwb2ludC54LCBcInB4LCBcIikuY29uY2F0KHBvaW50LnksIFwicHgsIDBweClcIik7XG4gICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XTtcblxuICAgICAgaWYgKHRoaXMuc2hvdWxkUmVtb3ZlWmVyb1RyYW5zbGF0ZSAmJiBwb2ludC54ID09PSAwICYmIHBvaW50LnkgPT09IDApIHtcbiAgICAgICAgdHJhbnNmb3JtID0gdHJhbnNmb3JtLnJlcGxhY2UoL3RyYW5zbGF0ZTNkXFwoW14pXStcXCkvLCAnJyk7XG4gICAgICB9IGVsc2UgaWYgKCEvdHJhbnNsYXRlM2RcXChbXildK1xcKS8udGVzdCh0cmFuc2Zvcm0pKSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm0pIHtcbiAgICAgICAgICB0cmFuc2Zvcm0gKz0gJyAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJhbnNmb3JtICs9IHRyYW5zbGF0ZUNzcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5yZXBsYWNlKC90cmFuc2xhdGUzZFxcKFteKV0rXFwpLywgdHJhbnNsYXRlQ3NzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XSA9IHRyYW5zZm9ybTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlKHBvaW50KSB7XG4gICAgICB2YXIgdGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcbiAgICAgIHZhciBpc1NpbGVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICBwb2ludCA9IHBvaW50LmNsb25lKCk7XG4gICAgICB0aGlzLmRldGVybWluZURpcmVjdGlvbihwb2ludCk7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9pbnQ7XG5cbiAgICAgIHRoaXMuX3NldFRyYW5zaXRpb24odGltZSk7XG5cbiAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZShwb2ludC5zdWIodGhpcy5vZmZzZXQpKTtcblxuICAgICAgaWYgKCFpc1NpbGVudCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2RyYWc6bW92ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwaW5Qb3NpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwaW5Qb3NpdGlvbihwb2ludCkge1xuICAgICAgdmFyIHRpbWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gICAgICB2YXIgc2lsZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB0cnVlO1xuICAgICAgdGhpcy5waW5uZWRQb3NpdGlvbiA9IHBvaW50LmNsb25lKCk7XG4gICAgICB0aGlzLm1vdmUodGhpcy5waW5uZWRQb3NpdGlvbiwgdGltZSwgc2lsZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVzZXRQb3NpdGlvblRvSW5pdGlhbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldFBvc2l0aW9uVG9Jbml0aWFsKCkge1xuICAgICAgdGhpcy5waW5Qb3NpdGlvbih0aGlzLmluaXRpYWxQb3NpdGlvbik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlZnJlc2hQb3NpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWZyZXNoUG9zaXRpb24oKSB7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuZ2V0UG9zaXRpb24oKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldFBvc2l0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFBvc2l0aW9uKHBvaW50KSB7XG4gICAgICBwb2ludCA9IHBvaW50LmNsb25lKCk7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9pbnQ7XG5cbiAgICAgIHRoaXMuX3NldFRyYW5zaXRpb24oMCk7XG5cbiAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZShwb2ludC5zdWIodGhpcy5vZmZzZXQpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGV0ZXJtaW5lRGlyZWN0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGVybWluZURpcmVjdGlvbihwb2ludCkge1xuICAgICAgdGhpcy5sZWZ0RGlyZWN0aW9uID0gdGhpcy5wb3NpdGlvbi54IDwgcG9pbnQueDtcbiAgICAgIHRoaXMucmlnaHREaXJlY3Rpb24gPSB0aGlzLnBvc2l0aW9uLnggPiBwb2ludC54O1xuICAgICAgdGhpcy51cERpcmVjdGlvbiA9IHRoaXMucG9zaXRpb24ueSA+IHBvaW50Lnk7XG4gICAgICB0aGlzLmRvd25EaXJlY3Rpb24gPSB0aGlzLnBvc2l0aW9uLnkgPCBwb2ludC55O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkcmFnU3RhcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRFdmVudCA9IGV2ZW50O1xuXG4gICAgICBpZiAoIXRoaXMuX2VuYWJsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBpc1RvdWNoRXZlbnQgPSBpc1RvdWNoICYmIGV2ZW50IGluc3RhbmNlb2Ygd2luZG93LlRvdWNoRXZlbnQ7XG4gICAgICB0aGlzLnRvdWNoUG9pbnQgPSB0aGlzLl9zdGFydFRvdWNoUG9pbnQgPSBuZXcgUG9pbnQoaXNUb3VjaEV2ZW50ID8gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggOiBldmVudC5jbGllbnRYLCBpc1RvdWNoRXZlbnQgPyBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSA6IGV2ZW50LmNsaWVudFkpO1xuICAgICAgdGhpcy5fc3RhcnRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgaWYgKGlzVG91Y2hFdmVudCkge1xuICAgICAgICB0aGlzLl90b3VjaElkID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhcnRTY3JvbGxQb2ludCA9IG5ldyBQb2ludCh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGlmIChldmVudC50YXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElucHV0RWxlbWVudCB8fCBldmVudC50YXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICBldmVudC50YXJnZXQuZm9jdXMoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEodGhpcy5uYXRpdmVEcmFnQW5kRHJvcCB8fCBldmVudC50YXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElucHV0RWxlbWVudCB8fCBldmVudC50YXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElucHV0RWxlbWVudCkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubmF0aXZlRHJhZ0FuZERyb3ApIHtcbiAgICAgICAgdmFyIGlzU2FmYXJpID0gL3ZlcnNpb25cXC8oXFxkKykuKz9zYWZhcmkvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICAgICAgICBpZiAoaXNUb3VjaEV2ZW50ICYmIHRoaXMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wT25Ub3VjaCB8fCBpc1NhZmFyaSB8fCB0aGlzLmVtdWxhdGVOYXRpdmVEcmFnQW5kRHJvcEZvckFsbCkge1xuICAgICAgICAgIHRoaXMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgdGhpcy5fbmF0aXZlRHJhZ0VuZCwgIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCB0aGlzLl9kcmFnTW92ZSwgIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5tb3ZlLCB0aGlzLl9kcmFnTW92ZSwgIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQsICBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9kcmFnRW5kLCAgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsKTtcbiAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICB0aGlzLmVtaXQoJ2RyYWc6c3RhcnQnKTtcbiAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudCwgJ2RyYWdlZS1hY3RpdmUnKTtcbiAgICAgIHRoaXMuZW1pdCgnZHJhZzptb3ZlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN0b3BEcmFnZ2luZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMubW92ZSwgdGhpcy5fZHJhZ01vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLl9uYXRpdmVEcmFnT3Zlcik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5fbmF0aXZlRHJvcCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5fbmF0aXZlRHJvcCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsKTtcbiAgICAgIHRoaXMuZWxlbWVudC5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50LCAnZHJhZ2VlLWFjdGl2ZScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkcmFnTW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmFnTW92ZShldmVudCkge1xuICAgICAgdGhpcy5jdXJyZW50RXZlbnQgPSBldmVudDtcbiAgICAgIHZhciB0b3VjaDtcbiAgICAgIHZhciBpc1RvdWNoRXZlbnQgPSBpc1RvdWNoICYmIGV2ZW50IGluc3RhbmNlb2Ygd2luZG93LlRvdWNoRXZlbnQ7XG5cbiAgICAgIGlmIChpc1RvdWNoRXZlbnQpIHtcbiAgICAgICAgdG91Y2ggPSBnZXRUb3VjaEJ5SUQoZXZlbnQsIHRoaXMuX3RvdWNoSWQpO1xuXG4gICAgICAgIGlmICghdG91Y2gpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy50b3VjaFBvaW50ID0gbmV3IFBvaW50KGlzVG91Y2hFdmVudCA/IHRvdWNoLnBhZ2VYIDogZXZlbnQuY2xpZW50WCwgaXNUb3VjaEV2ZW50ID8gdG91Y2gucGFnZVkgOiBldmVudC5jbGllbnRZKTtcblxuICAgICAgdmFyIHBvaW50ID0gdGhpcy5fc3RhcnRQb3NpdGlvbi5hZGQodGhpcy50b3VjaFBvaW50LnN1Yih0aGlzLl9zdGFydFRvdWNoUG9pbnQpKS5hZGQodGhpcy5zY3JvbGxQb2ludC5zdWIodGhpcy5fc3RhcnRTY3JvbGxQb2ludCkpO1xuXG4gICAgICBwb2ludCA9IHRoaXMuYm91bmQocG9pbnQsIHRoaXMuZ2V0U2l6ZSgpKTtcbiAgICAgIHRoaXMubW92ZShwb2ludCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRyYWdFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ0VuZChldmVudCkge1xuICAgICAgdmFyIGlzVG91Y2hFdmVudCA9IGlzVG91Y2ggJiYgZXZlbnQgaW5zdGFuY2VvZiB3aW5kb3cuVG91Y2hFdmVudDtcblxuICAgICAgaWYgKGlzVG91Y2hFdmVudCAmJiAhZ2V0VG91Y2hCeUlEKGV2ZW50LCB0aGlzLl90b3VjaElkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZHJhZ0VuZEFjdGlvbigpO1xuICAgICAgdGhpcy5lbWl0KCdkcmFnOmVuZCcpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCB0aGlzLl9kcmFnTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCB0aGlzLl9kcmFnRW5kKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9kcmFnRW5kKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGwpO1xuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkcmFnZ2FibGUnKTtcbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudCwgJ2RyYWdlZS1hY3RpdmUnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25TY3JvbGxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25TY3JvbGwoX2V2ZW50KSB7XG4gICAgICB2YXIgcG9pbnQgPSB0aGlzLl9zdGFydFBvc2l0aW9uLmFkZCh0aGlzLnRvdWNoUG9pbnQuc3ViKHRoaXMuX3N0YXJ0VG91Y2hQb2ludCkpLmFkZCh0aGlzLnNjcm9sbFBvaW50LnN1Yih0aGlzLl9zdGFydFNjcm9sbFBvaW50KSk7XG5cbiAgICAgIHBvaW50ID0gdGhpcy5ib3VuZChwb2ludCwgdGhpcy5nZXRTaXplKCkpO1xuXG4gICAgICBpZiAoIXRoaXMubmF0aXZlRHJhZ0FuZERyb3ApIHtcbiAgICAgICAgdGhpcy5tb3ZlKHBvaW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibmF0aXZlRHJhZ1N0YXJ0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5hdGl2ZURyYWdTdGFydChldmVudCkge1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCAnRmlyZUZveCBmaXgnKTtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLl9uYXRpdmVEcmFnT3Zlcik7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5fbmF0aXZlRHJvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm5hdGl2ZURyYWdPdmVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5hdGl2ZURyYWdPdmVyKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnQsICdkcmFnZWUtcGxhY2Vob2xkZXInKTtcbiAgICAgIHRoaXMuY3VycmVudEV2ZW50ID0gZXZlbnQ7XG5cbiAgICAgIGlmIChldmVudC5jbGllbnRYID09PSAwICYmIGV2ZW50LmNsaWVudFkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRvdWNoUG9pbnQgPSBuZXcgUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHZhciBwb2ludCA9IHRoaXMuX3N0YXJ0UG9zaXRpb24uYWRkKHRoaXMudG91Y2hQb2ludC5zdWIodGhpcy5fc3RhcnRUb3VjaFBvaW50KSkuYWRkKHRoaXMuc2Nyb2xsUG9pbnQuc3ViKHRoaXMuX3N0YXJ0U2Nyb2xsUG9pbnQpKTtcblxuICAgICAgcG9pbnQgPSB0aGlzLmJvdW5kKHBvaW50LCB0aGlzLmdldFNpemUoKSk7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9pbnQ7XG4gICAgICB0aGlzLmVtaXQoJ2RyYWc6bW92ZScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuYXRpdmVEcmFnRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5hdGl2ZURyYWdFbmQoX2V2ZW50KSB7XG4gICAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQsICdkcmFnZWUtcGxhY2Vob2xkZXInKTtcbiAgICAgIHRoaXMuZHJhZ0VuZEFjdGlvbigpO1xuICAgICAgdGhpcy5lbWl0KCdkcmFnOmVuZCcpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLl9uYXRpdmVEcmFnT3Zlcik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5fbmF0aXZlRHJvcCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsKTtcbiAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJyk7XG4gICAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQsICdkcmFnZWUtYWN0aXZlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm5hdGl2ZURyb3BcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbmF0aXZlRHJvcChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3BcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIGNvbnRhaW5lclJlY3QgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBjbG9uZWRFbGVtZW50ID0gdGhpcy5lbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIGNsb25lZEVsZW1lbnQuc3R5bGVbdHJhbnNmb3JtUHJvcGVydHldID0gJyc7XG4gICAgICBjb3B5U3R5bGVzKHRoaXMuZWxlbWVudCwgY2xvbmVkRWxlbWVudCk7XG4gICAgICBjbG9uZWRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvbmVkRWxlbWVudCk7XG4gICAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnQsICdkcmFnZWUtcGxhY2Vob2xkZXInKTtcbiAgICAgIHZhciBlbXVsYXRpb25EcmFnZ2FibGUgPSBuZXcgRHJhZ2dhYmxlKGNsb25lZEVsZW1lbnQsIHtcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5ib2R5LFxuICAgICAgICBib3VuZDogZnVuY3Rpb24gYm91bmQocG9pbnQpIHtcbiAgICAgICAgICByZXR1cm4gcG9pbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgJ2RyYWc6bW92ZSc6IGZ1bmN0aW9uIGRyYWdNb3ZlKCkge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lclJlY3RQb2ludCA9IG5ldyBQb2ludChjb250YWluZXJSZWN0LmxlZnQsIGNvbnRhaW5lclJlY3QudG9wKTtcbiAgICAgICAgICAgIF90aGlzMy5wb3NpdGlvbiA9IGVtdWxhdGlvbkRyYWdnYWJsZS5wb3NpdGlvbi5zdWIoY29udGFpbmVyUmVjdFBvaW50KS5zdWIoX3RoaXMzLl9zdGFydFNjcm9sbFBvaW50KTtcblxuICAgICAgICAgICAgX3RoaXMzLmVtaXQoJ2RyYWc6bW92ZScpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2RyYWc6ZW5kJzogZnVuY3Rpb24gZHJhZ0VuZCgpIHtcbiAgICAgICAgICAgIGVtdWxhdGlvbkRyYWdnYWJsZS5kZXN0cm95KCk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGNsb25lZEVsZW1lbnQpO1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoX3RoaXMzLmVsZW1lbnQsICdkcmFnZWUtcGxhY2Vob2xkZXInKTtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKF90aGlzMy5lbGVtZW50LCAnZHJhZ2VlLWFjdGl2ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgY29udGFpbmVyUmVjdFBvaW50ID0gbmV3IFBvaW50KGNvbnRhaW5lclJlY3QubGVmdCwgY29udGFpbmVyUmVjdC50b3ApO1xuICAgICAgZW11bGF0aW9uRHJhZ2dhYmxlLl9zdGFydFNjcm9sbFBvaW50ID0gdGhpcy5fc3RhcnRTY3JvbGxQb2ludDtcbiAgICAgIGVtdWxhdGlvbkRyYWdnYWJsZS5tb3ZlKHRoaXMucGlubmVkUG9zaXRpb24uYWRkKGNvbnRhaW5lclJlY3RQb2ludCkuYWRkKG5ldyBQb2ludCh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkpKSk7XG4gICAgICBlbXVsYXRpb25EcmFnZ2FibGUuZHJhZ1N0YXJ0KGV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZHJhZ0VuZEFjdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmFnRW5kQWN0aW9uKCkge1xuICAgICAgdGhpcy5waW5Qb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UmVjdGFuZ2xlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFJlY3RhbmdsZSgpIHtcbiAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHRoaXMucG9zaXRpb24sIHRoaXMuZ2V0U2l6ZSgpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVmcmVzaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgICAgaWYgKHRoaXMuYm91bmQucmVmcmVzaCkge1xuICAgICAgICB0aGlzLmJvdW5kLnJlZnJlc2goKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVzdHJveVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdGhpcy5oYW5kbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuc3RhcnQsIHRoaXMuX2RyYWdTdGFydCk7XG4gICAgICB0aGlzLmhhbmRsZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5zdGFydCwgdGhpcy5fZHJhZ1N0YXJ0KTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLl9uYXRpdmVEcmFnU3RhcnQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCB0aGlzLl9kcmFnTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCB0aGlzLl9kcmFnRW5kKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9kcmFnRW5kKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5fbmF0aXZlRHJhZ092ZXIpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuX25hdGl2ZURyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5lbmQsIHRoaXMuX25hdGl2ZURyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuX25hdGl2ZURyb3ApO1xuICAgICAgdGhpcy5yZXNldEVtaXR0ZXIoKTtcbiAgICAgIHZhciBpbmRleCA9IGRyYWdnYWJsZXMuaW5kZXhPZih0aGlzKTtcblxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgZHJhZ2dhYmxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb250YWluZXJcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgfHwgdGhpcy5vcHRpb25zLmNvbnRhaW5lciB8fCB0aGlzLm9wdGlvbnMucGFyZW50IHx8IGdldERlZmF1bHRDb250YWluZXIodGhpcy5lbGVtZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFuZGxlclwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgaWYgKCF0aGlzLl9oYW5kbGVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmhhbmRsZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5faGFuZGxlciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKHRoaXMub3B0aW9ucy5oYW5kbGVyKSB8fCB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5faGFuZGxlciA9IHRoaXMub3B0aW9ucy5oYW5kbGVyIHx8IHRoaXMuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5faGFuZGxlcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibmF0aXZlRHJhZ0FuZERyb3BcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMubmF0aXZlRHJhZ0FuZERyb3AgfHwgZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImVtdWxhdGVOYXRpdmVEcmFnQW5kRHJvcE9uVG91Y2hcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wT25Ub3VjaCB8fCB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3BGb3JBbGxcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wRm9yQWxsIHx8IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaG91bGRSZW1vdmVaZXJvVHJhbnNsYXRlXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNob3VsZFJlbW92ZVplcm9UcmFuc2xhdGUgfHwgZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNjcm9sbFBvaW50XCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gbmV3IFBvaW50KHdpbmRvdy5zY3JvbGxYLCB3aW5kb3cuc2Nyb2xsWSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImVuYWJsZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGVuYWJsZSkge1xuICAgICAgaWYgKGVuYWJsZSkge1xuICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQsICdkcmFnZWUtZGlzYWJsZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkQ2xhc3ModGhpcy5lbGVtZW50LCAnZHJhZ2VlLWRpc2FibGUnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZSA9IGVuYWJsZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRHJhZ2dhYmxlO1xufShFdmVudEVtaXR0ZXIpO1xuRHJhZ2dhYmxlLmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5EcmFnZ2FibGUuZW1pdHRlci5vbignZHJhZ2dhYmxlOmNyZWF0ZScsIGFkZFRvRGVmYXVsdFNjb3BlJDEpO1xuXG52YXIgTGlzdCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoTGlzdCwgX0V2ZW50RW1pdHRlcik7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihMaXN0KTtcblxuICBmdW5jdGlvbiBMaXN0KGRyYWdnYWJsZXMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGlzdCk7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIF90aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHRpbWVFbmQ6IDIwMCxcbiAgICAgIHRpbWVFeGNhbmdlOiA0MDAsXG4gICAgICByYWRpdXM6IDMwXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgX3RoaXMuZHJhZ2dhYmxlcyA9IGRyYWdnYWJsZXM7XG5cbiAgICBfdGhpcy5pbml0KCk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTGlzdCwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdGhpcy5fZW5hYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKHRoaXMuaW5pdERyYWdnYWJsZSwgdGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluaXREcmFnZ2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdERyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBkcmFnZ2FibGUuZW5hYmxlID0gdGhpcy5fZW5hYmxlO1xuICAgICAgZHJhZ2dhYmxlLm9uKCdkcmFnOm1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIub25Nb3ZlKGRyYWdnYWJsZSk7XG4gICAgICB9KTtcblxuICAgICAgZHJhZ2dhYmxlLmRyYWdFbmRBY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUucGluUG9zaXRpb24oZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uLCBfdGhpczIub3B0aW9ucy50aW1lRW5kKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uTW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1vdmUoZHJhZ2dhYmxlKSB7XG4gICAgICB2YXIgc29ydGVkRHJhZ2dhYmxlcyA9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuICAgICAgdmFyIHBpbm5lZFBvc2l0aW9ucyA9IHNvcnRlZERyYWdnYWJsZXMubWFwKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbjtcbiAgICAgIH0pO1xuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHNvcnRlZERyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpO1xuICAgICAgdmFyIHRhcmdldEluZGV4ID0gaW5kZXhPZk5lYXJlc3RQb2ludChwaW5uZWRQb3NpdGlvbnMsIGRyYWdnYWJsZS5wb3NpdGlvbiwgdGhpcy5vcHRpb25zLnJhZGl1cywgdGhpcy5kaXN0YW5jZUZ1bmMpO1xuXG4gICAgICBpZiAodGFyZ2V0SW5kZXggIT09IC0xICYmIGN1cnJlbnRJbmRleCAhPT0gdGFyZ2V0SW5kZXgpIHtcbiAgICAgICAgaWYgKHRhcmdldEluZGV4IDwgY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IHRhcmdldEluZGV4OyBpIDwgY3VycmVudEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIHNvcnRlZERyYWdnYWJsZXNbaV0ucGluUG9zaXRpb24ocGlubmVkUG9zaXRpb25zW2kgKyAxXSwgdGhpcy5vcHRpb25zLnRpbWVFeGNhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgX2kgPSBjdXJyZW50SW5kZXg7IF9pIDwgdGFyZ2V0SW5kZXg7IF9pKyspIHtcbiAgICAgICAgICAgIHNvcnRlZERyYWdnYWJsZXNbX2kgKyAxXS5waW5Qb3NpdGlvbihwaW5uZWRQb3NpdGlvbnNbX2ldLCB0aGlzLm9wdGlvbnMudGltZUV4Y2FuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkcmFnZ2FibGUubmF0aXZlRHJhZ0FuZERyb3ApIHtcbiAgICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24ocGlubmVkUG9zaXRpb25zW3RhcmdldEluZGV4XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uID0gcGlubmVkUG9zaXRpb25zW3RhcmdldEluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdCgnbGlzdDpjaGFuZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q3VycmVudFBpbm5lZFBvc2l0aW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDdXJyZW50UGlubmVkUG9zaXRpb25zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlcy5tYXAoZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uLmNsb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U29ydGVkRHJhZ2dhYmxlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTb3J0ZWREcmFnZ2FibGVzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlcy5zb3J0KHRoaXMuc29ydGluZy5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVzZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUucmVzZXRQb3NpdGlvblRvSW5pdGlhbCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlZnJlc2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5yZWZyZXNoKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChkcmFnZ2FibGVzKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgaWYgKCEoZHJhZ2dhYmxlcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICBkcmFnZ2FibGVzID0gW2RyYWdnYWJsZXNdO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLmluaXREcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kcmFnZ2FibGVzID0gdGhpcy5kcmFnZ2FibGVzLmNvbmNhdChkcmFnZ2FibGVzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShkcmFnZ2FibGVzKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIGluaXRpYWxQb3NpdGlvbnMgPSB0aGlzLmRyYWdnYWJsZXMubWFwKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5pbml0aWFsUG9zaXRpb247XG4gICAgICB9KTtcbiAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICB2YXIgc29ydGVkRHJhZ2dhYmxlcyA9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuXG4gICAgICBpZiAoIShkcmFnZ2FibGVzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgIGRyYWdnYWJsZXMgPSBbZHJhZ2dhYmxlc107XG4gICAgICB9XG5cbiAgICAgIGRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGRyYWdnYWJsZS5yZXNldE9uKCdkcmFnOmVuZCcpO1xuICAgICAgICBkcmFnZ2FibGUucmVzZXRPbignZHJhZzptb3ZlJyk7XG4gICAgICAgIHJlbW92ZUl0ZW0oX3RoaXM0LmRyYWdnYWJsZXMsIGRyYWdnYWJsZSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBqID0gMDtcbiAgICAgIHNvcnRlZERyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGlmIChfdGhpczQuZHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSkgIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiAhPT0gaW5pdGlhbFBvc2l0aW9uc1tqXSkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKGluaXRpYWxQb3NpdGlvbnNbal0sIF90aGlzNC5vcHRpb25zLnRpbWVFeGNhbmdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkcmFnZ2FibGUuaW5pdGlhbFBvc2l0aW9uID0gaW5pdGlhbFBvc2l0aW9uc1tqXTtcbiAgICAgICAgICBqKys7XG4gICAgICAgICAgbGlzdC5wdXNoKGRyYWdnYWJsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5kcmFnZ2FibGVzID0gbGlzdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xlYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzLnJlbW92ZSh0aGlzLmRyYWdnYWJsZXMuc2xpY2UoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlc3Ryb3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5kZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic29ydGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzb3J0aW5nKGRyYWdnYWJsZUEsIGRyYWdnYWJsZUIpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc29ydGluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvcnRpbmcoZHJhZ2dhYmxlQSwgZHJhZ2dhYmxlQik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlQS5waW5uZWRQb3NpdGlvbi55IDwgZHJhZ2dhYmxlQi5waW5uZWRQb3NpdGlvbi55KSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChkcmFnZ2FibGVBLnBpbm5lZFBvc2l0aW9uLnkgPiBkcmFnZ2FibGVCLnBpbm5lZFBvc2l0aW9uLnkpIHJldHVybiAxO1xuICAgICAgICBpZiAoZHJhZ2dhYmxlQS5waW5uZWRQb3NpdGlvbi54IDwgZHJhZ2dhYmxlQi5waW5uZWRQb3NpdGlvbi54KSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChkcmFnZ2FibGVBLnBpbm5lZFBvc2l0aW9uLnggPiBkcmFnZ2FibGVCLnBpbm5lZFBvc2l0aW9uLngpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGlzdGFuY2VGdW5jXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdldERpc3RhbmNlIHx8IGdldERpc3RhbmNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwb3NpdGlvbnNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRQaW5uZWRQb3NpdGlvbnMoKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHBvc2l0aW9ucykge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHZhciBtZXNzYWdlID0gJ3dyb25nIGFycmF5IGxlbmd0aCc7XG5cbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoKSB7XG4gICAgICAgIHBvc2l0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCwgaSkge1xuICAgICAgICAgIF90aGlzNS5kcmFnZ2FibGVzW2ldLnBpblBvc2l0aW9uKHBvaW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBtZXNzYWdlO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbmFibGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbmFibGU7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChlbmFibGUpIHtcbiAgICAgIHRoaXMuX2VuYWJsZSA9IGVuYWJsZTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgZHJhZ2dhYmxlLmVuYWJsZSA9IGVuYWJsZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcImZhY3RvcnlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmFjdG9yeShjb250YWluZXJFbGVtZW50LCBlbGVtZW50cykge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGRyYWdnYWJsZXMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEcmFnZ2FibGUoZWxlbWVudCwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXJFbGVtZW50XG4gICAgICAgIH0sIG9wdGlvbnMuZHJhZ2dhYmxlIHx8IHt9KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgTGlzdChkcmFnZ2FibGVzLCBvcHRpb25zLmxpc3QgfHwge30pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBMaXN0O1xufShFdmVudEVtaXR0ZXIpO1xuXG52YXIgYXJyYXlNb3ZlID0gZnVuY3Rpb24gYXJyYXlNb3ZlKGFycmF5LCBmcm9tLCB0bykge1xuICBhcnJheS5zcGxpY2UodG8gPCAwID8gYXJyYXkubGVuZ3RoICsgdG8gOiB0bywgMCwgYXJyYXkuc3BsaWNlKGZyb20sIDEpWzBdKTtcbn07XG5cbnZhciBCdWJibGluZ0xpc3QgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9MaXN0KSB7XG4gIF9pbmhlcml0cyhCdWJibGluZ0xpc3QsIF9MaXN0KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKEJ1YmJsaW5nTGlzdCk7XG5cbiAgZnVuY3Rpb24gQnViYmxpbmdMaXN0KGRyYWdnYWJsZXMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnViYmxpbmdMaXN0KTtcblxuICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBkcmFnZ2FibGVzLCBvcHRpb25zKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCdWJibGluZ0xpc3QsIFt7XG4gICAga2V5OiBcImluaXREcmFnZ2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdERyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIGRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLmF1dG9EZXRlY3RWZXJ0aWNhbEdhcChkcmFnZ2FibGUpO1xuICAgICAgfSk7XG5cbiAgICAgIF9nZXQoX2dldFByb3RvdHlwZU9mKEJ1YmJsaW5nTGlzdC5wcm90b3R5cGUpLCBcImluaXREcmFnZ2FibGVcIiwgdGhpcykuY2FsbCh0aGlzLCBkcmFnZ2FibGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhdXRvRGV0ZWN0VmVydGljYWxHYXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXV0b0RldGVjdFZlcnRpY2FsR2FwKCkge1xuICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlcy5sZW5ndGggPj0gMikge1xuICAgICAgICB2YXIgc29ydGVkID0gdGhpcy5nZXRTb3J0ZWREcmFnZ2FibGVzKCk7XG4gICAgICAgIHRoaXMudmVydGljYWxHYXAgPSBzb3J0ZWRbMV0ucGlubmVkUG9zaXRpb24ueSAtIHNvcnRlZFswXS5waW5uZWRQb3NpdGlvbi55IC0gc29ydGVkWzBdLmdldFNpemUoKS55O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52ZXJ0aWNhbEdhcCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmRyYWdnYWJsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgdGhpcy5zdGFydFBvc2l0aW9uID0gdGhpcy5kcmFnZ2FibGVzWzBdLnBpbm5lZFBvc2l0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbk1vdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25Nb3ZlKGRyYWdnYWJsZSkge1xuICAgICAgdmFyIHNvcnRlZERyYWdnYWJsZXMgPSB0aGlzLmdldFNvcnRlZERyYWdnYWJsZXMoKTtcbiAgICAgIHZhciBwaW5uZWRQb3NpdGlvbnMgPSBzb3J0ZWREcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUucGlubmVkUG9zaXRpb247XG4gICAgICB9KTtcbiAgICAgIHZhciBjdXJyZW50SW5kZXggPSBzb3J0ZWREcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKTtcbiAgICAgIHZhciB0YXJnZXRJbmRleCA9IGluZGV4T2ZOZWFyZXN0UG9pbnQocGlubmVkUG9zaXRpb25zLCBkcmFnZ2FibGUucG9zaXRpb24sIHRoaXMub3B0aW9ucy5yYWRpdXMsIHRoaXMuZGlzdGFuY2VGdW5jKTtcblxuICAgICAgaWYgKHRhcmdldEluZGV4ICE9PSAtMSAmJiBjdXJyZW50SW5kZXggIT09IHRhcmdldEluZGV4KSB7XG4gICAgICAgIGFycmF5TW92ZShzb3J0ZWREcmFnZ2FibGVzLCBjdXJyZW50SW5kZXgsIHRhcmdldEluZGV4KTtcbiAgICAgICAgdGhpcy5idWJsaW5nKHNvcnRlZERyYWdnYWJsZXMsIGRyYWdnYWJsZSk7XG4gICAgICAgIHRoaXMuZW1pdCgnbGlzdDpjaGFuZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYnVibGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBidWJsaW5nKHNvcnRlZERyYWdnYWJsZXMsIGN1cnJlbnREcmFnZ2FibGUpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gdGhpcy5zdGFydFBvc2l0aW9uLmNsb25lKCk7XG4gICAgICBzb3J0ZWREcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICBpZiAoIWRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbi5jb21wYXJlKGN1cnJlbnRQb3NpdGlvbikpIHtcbiAgICAgICAgICBpZiAoZHJhZ2dhYmxlID09PSBjdXJyZW50RHJhZ2dhYmxlICYmICFjdXJyZW50RHJhZ2dhYmxlLm5hdGl2ZURyYWdBbmREcm9wKSB7XG4gICAgICAgICAgICBkcmFnZ2FibGUucGlubmVkUG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgZHJhZ2dhYmxlID09PSBjdXJyZW50RHJhZ2dhYmxlID8gMCA6IF90aGlzMi5vcHRpb25zLnRpbWVFeGNhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50UG9zaXRpb24ueSA9IGN1cnJlbnRQb3NpdGlvbi55ICsgZHJhZ2dhYmxlLmdldFNpemUoKS55ICsgX3RoaXMyLnZlcnRpY2FsR2FwO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRpc3RhbmNlRnVuY1wiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXREaXN0YW5jZSB8fCBnZXRZRGlmZmVyZW5jZTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJmYWN0b3J5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZhY3RvcnkoY29udGFpbmVyRWxlbWVudCwgZWxlbWVudHMpIHtcbiAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIHZhciBkcmFnZ2FibGVzID0gQXJyYXkuZnJvbShlbGVtZW50cykubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyRWxlbWVudFxuICAgICAgICB9LCBvcHRpb25zLmRyYWdnYWJsZSB8fCB7fSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IEJ1YmJsaW5nTGlzdChkcmFnZ2FibGVzLCBvcHRpb25zLmxpc3QgfHwge30pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCdWJibGluZ0xpc3Q7XG59KExpc3QpO1xuXG5leHBvcnQgeyBCb3VuZCwgQm91bmRUb0FyYywgQm91bmRUb0NpcmNsZSwgQm91bmRUb0VsZW1lbnQsIEJvdW5kVG9MaW5lLCBCb3VuZFRvTGluZVgsIEJvdW5kVG9MaW5lWSwgQm91bmRUb1JlY3RhbmdsZSwgQnViYmxpbmdMaXN0LCBEcmFnZ2FibGUsIEZsb2F0TGVmdFN0cmF0ZWd5LCBGbG9hdFJpZ2h0U3RyYXRlZ3ksIExpc3QsIE5vdENyb3NzaW5nU3RyYXRlZ3ksIFBvaW50LCBSZWN0YW5nbGUsIFNjb3BlLCBUYXJnZXQsIGFkZENsYXNzLCBkZWZhdWx0U2NvcGUsIGdldERpc3RhbmNlLCBnZXRYRGlmZmVyZW5jZSwgZ2V0WURpZmZlcmVuY2UsIGluZGV4T2ZOZWFyZXN0UG9pbnQsIHJlbW92ZUNsYXNzLCBzY29wZSwgc2NvcGVzLCB0cmFuc2Zvcm1lZFNwYWNlRGlzdGFuY2VGYWN0b3J5IH07XG4iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2RyYWdlZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuZ2xlRGlmZihhbHBoYSwgYmV0YSkge1xuICBjb25zdCBtaW5BbmdsZSA9IE1hdGgubWluKGFscGhhLCBiZXRhKVxuICBjb25zdCBtYXhBbmdsZSA9ICBNYXRoLm1heChhbHBoYSwgYmV0YSlcbiAgcmV0dXJuIE1hdGgubWluKG1heEFuZ2xlIC0gbWluQW5nbGUsIG1pbkFuZ2xlICsgTWF0aC5QSSoyIC0gbWF4QW5nbGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIpIHtcbiAgY29uc3QgZGlmZiA9IHAyLnN1YihwMSlcbiAgcmV0dXJuIG5vcm1hbGl6ZUFuZ2xlKE1hdGguYXRhbjIoZGlmZi55LCBkaWZmLngpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9SYWRpYW4oYW5nbGUpIHtcbiAgcmV0dXJuICgoYW5nbGUgJSAzNjApICogTWF0aC5QSSAvIDE4MClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGVncmVlKGFuZ2xlKSB7XG4gIHJldHVybiAoYW5nbGUgKiAxODAgLyBNYXRoLlBJKSAlIDM2MFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYm91bmRBbmdsZShtaW4sIG1heCwgdmFsKSB7XG4gIGxldCBkbWluLCBkbWF4XG4gIGlmIChtaW4gPCBtYXggJiYgdmFsID4gbWluICYmIHZhbCA8IG1heCkge1xuICAgIHJldHVybiB2YWxcbiAgfSBlbHNlIGlmIChtYXggPCBtaW4gJiYgKHZhbCA8IG1heCB8fCB2YWwgPiBtaW4pKSB7XG4gICAgcmV0dXJuIHZhbFxuICB9IGVsc2Uge1xuICAgIGRtaW4gPSBnZXRBbmdsZURpZmYobWluLCB2YWwpXG4gICAgZG1heCA9IGdldEFuZ2xlRGlmZihtYXgsIHZhbClcbiAgICBpZiAoZG1pbiA8IGRtYXgpIHtcbiAgICAgIHJldHVybiBtaW5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1heFxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVhcmVzdEFuZ2xlKGFyciwgYW5nbGUpIHtcbiAgbGV0IGksIHRlbXAsIGRpZmYgPSBNYXRoLlBJICogMiwgdmFsdWVcbiAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7aSsrKSB7XG4gICAgdGVtcCA9IGdldEFuZ2xlRGlmZihhcnJbaV0sIGFuZ2xlKVxuICAgIGlmIChkaWZmIDwgdGVtcCkge1xuICAgICAgZGlmZiA9IHRlbXBcbiAgICAgIHZhbHVlID0gYXJyW2ldXG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQW5nbGUodmFsKSB7XG4gIHdoaWxlICh2YWwgPCAwKSB7XG4gICAgdmFsICs9IDIgKiBNYXRoLlBJXG4gIH1cbiAgd2hpbGUgKHZhbCA+IDIgKiBNYXRoLlBJKSB7XG4gICAgdmFsIC09IDIgKiBNYXRoLlBJXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCBsZW5ndGgsIGNlbnRlcikge1xuICBjZW50ZXIgPSBjZW50ZXIgfHwgbmV3IFBvaW50KDAsIDApXG4gIHJldHVybiBjZW50ZXIuYWRkKG5ldyBQb2ludChsZW5ndGggKiBNYXRoLmNvcyhhbmdsZSksIGxlbmd0aCAqIE1hdGguc2luKGFuZ2xlKSkpXG59XG4iLCJpbXBvcnQgY3JlYXRlQ2FudmFzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWNhbnZhcydcbmltcG9ydCB7XG4gIERyYWdnYWJsZSxcbiAgUG9pbnQsXG4gIFJlY3RhbmdsZSxcbiAgQm91bmRUb0xpbmVcbn0gZnJvbSAnZHJhZ2VlJ1xuXG5pbXBvcnQgeyBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0gfSBmcm9tICcuL2dlb21ldHJ5L2FuZ2xlcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BpZGVyIHtcbiAgY29uc3RydWN0b3IoYXJlYSwgZWxlbWVudHMsIG9wdGlvbnM9e30pIHtcbiAgICBjb25zdCBhcmVhUmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGFyZWEsIGFyZWEpXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhbmdsZTogMCxcbiAgICAgIGRBbmdsZTogMiAqIE1hdGguUEkgLyBlbGVtZW50cy5sZW5ndGgsXG4gICAgICBjZW50ZXI6IGFyZWFSZWN0YW5nbGUuZ2V0Q2VudGVyKCksXG4gICAgICBzdGFydFJhZGl1czogNTAsXG4gICAgICBlbmRSYWRpdXM6IGFyZWFSZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgIHN0cm9rZVN0eWxlOiAnI2ZmNTU3NycsXG4gICAgICBmaWxsU3R5bGU6ICdyZ2JhKDE1MCwyNTUsNTAsMC44KSdcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5hcmVhID0gYXJlYVxuICAgIHRoaXMuYXJlYVJlY3RhbmdsZSA9IGFyZWFSZWN0YW5nbGVcbiAgICB0aGlzLmluaXQoZWxlbWVudHMpXG4gIH1cblxuICBpbml0KGVsZW1lbnRzKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjcmVhdGVDYW52YXModGhpcy5hcmVhLCB0aGlzLmFyZWFSZWN0YW5nbGUpXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgdGhpcy5kcmFnZ2FibGVzID0gZWxlbWVudHMubWFwKChlbGVtZW50LCBpKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9IHRoaXMub3B0aW9ucy5hbmdsZSArIGkgKiB0aGlzLm9wdGlvbnMuZEFuZ2xlXG4gICAgICBjb25zdCBoYWxmU2l6ZSA9IFBvaW50LmVsZW1lbnRTaXplKGVsZW1lbnQpLm11bHQoMC41KVxuICAgICAgY29uc3Qgc3RhcnQgPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oYW5nbGUsIHRoaXMub3B0aW9ucy5zdGFydFJhZGl1cywgdGhpcy5vcHRpb25zLmNlbnRlcikuc3ViKGhhbGZTaXplKVxuICAgICAgY29uc3QgZW5kID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCB0aGlzLm9wdGlvbnMuZW5kUmFkaXVzLCB0aGlzLm9wdGlvbnMuY2VudGVyKS5zdWIoaGFsZlNpemUpXG5cbiAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmFyZWEsXG4gICAgICAgIGJvdW5kOiBCb3VuZFRvTGluZS5ib3VuZGluZyhzdGFydCwgZW5kKSxcbiAgICAgICAgcG9zaXRpb246IHN0YXJ0LFxuICAgICAgICBvbjoge1xuICAgICAgICAgICdkcmFnOm1vdmUnOiAoKSA9PiB0aGlzLmRyYXcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmlzSW5pdCA9IHRydWVcbiAgICB0aGlzLmRyYXcoKVxuICB9XG5cbiAgZHJhdygpIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS54LCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55KVxuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKVxuXG4gICAgbGV0IHBvaW50ID0gdGhpcy5kcmFnZ2FibGVzWzBdLmdldENlbnRlcigpXG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhwb2ludC54LCBwb2ludC55KVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBvaW50ID0gdGhpcy5kcmFnZ2FibGVzW2ldLmdldENlbnRlcigpXG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHBvaW50LngsIHBvaW50LnkpXG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKVxuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLm9wdGlvbnMubGluZVdpZHRoXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5vcHRpb25zLnN0cm9rZVN0eWxlXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5maWxsU3R5bGVcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmV2ZW50cyA9IHt9XG5cbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9uKSB7XG4gICAgICBmb3IgKGNvbnN0IFtldmVudE5hbWUsIGZuXSBvZiBPYmplY3QuZW50cmllcyhvcHRpb25zLm9uKSkge1xuICAgICAgICB0aGlzLm9uKGV2ZW50TmFtZSwgZm4pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW1pdChldmVudE5hbWUpIHtcbiAgICB0aGlzLmludGVycnVwdGVkID0gZmFsc2VcbiAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cbiAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHJldHVyblxuXG4gICAgZm9yIChjb25zdCBmdW5jIG9mIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgIGZ1bmMuYXBwbHkoLi4uYXJncylcbiAgICAgIGlmICh0aGlzLmludGVycnVwdGVkKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGludGVycnVwdCgpIHtcbiAgICB0aGlzLmludGVycnVwdGVkID0gdHJ1ZVxuICB9XG5cbiAgb24oZXZlbnROYW1lLCBmbikge1xuICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdXG4gICAgfVxuXG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKVxuICB9XG5cbiAgcHJlcGVuZE9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXVxuICAgIH1cblxuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0udW5zaGlmdChmbilcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmluZGV4T2YoZm4pXG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cblxuICByZXNldEVtaXR0ZXIgKCkge1xuICAgIHRoaXMuZXZlbnRzID0ge31cbiAgfVxuXG4gIHJlc2V0T24oZXZlbnROYW1lKSB7XG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdXG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYWdnYWJsZSxcbiAgQm91bmRUb0FyYyxcbiAgUmVjdGFuZ2xlXG59IGZyb20gJ2RyYWdlZSdcblxuaW1wb3J0IHtcbiAgZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtLFxuICBnZXRBbmdsZSxcbiAgbm9ybWFsaXplQW5nbGVcbn0gZnJvbSAnLi9nZW9tZXRyeS9hbmdsZXMnXG5cbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9FdmVudEVtaXR0ZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyY1NsaWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGFyZWEsIGVsZW1lbnQsIG9wdGlvbnM9e30pIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIGNvbnN0IGFyZWFSZWN0YW5nbGUgPSBSZWN0YW5nbGUuZnJvbUVsZW1lbnQoYXJlYSwgYXJlYSlcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNlbnRlcjogYXJlYVJlY3RhbmdsZS5nZXRDZW50ZXIoKSxcbiAgICAgIHJhZGl1czogYXJlYVJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgc3RhcnRBbmdsZTogTWF0aC5QSSxcbiAgICAgIGVuZEFuZ2xlOiAwLFxuICAgICAgYW5nbGVzOiBbTWF0aC5QSSwgLU1hdGguUEkgLyA0LCAwLCBNYXRoLlBJIC8gNCwgTWF0aC5QSSAvIDJdLFxuICAgICAgdGltZTogNTAwXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHRoaXMuc2hpZnRlZENlbnRlciA9IHRoaXMub3B0aW9ucy5jZW50ZXJcbiAgICB0aGlzLmFyZWEgPSBhcmVhXG4gICAgdGhpcy5pbml0KGVsZW1lbnQpXG4gIH1cblxuICBpbml0KGVsZW1lbnQpIHtcbiAgICBjb25zdCBhbmdsZSA9IHRoaXMub3B0aW9ucy5zdGFydEFuZ2xlXG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oXG4gICAgICBhbmdsZSxcbiAgICAgIHRoaXMub3B0aW9ucy5yYWRpdXMsXG4gICAgICB0aGlzLnNoaWZ0ZWRDZW50ZXJcbiAgICApXG5cbiAgICB0aGlzLmFuZ2xlID0gYW5nbGVcbiAgICB0aGlzLmRyYWdnYWJsZSA9IG5ldyBEcmFnZ2FibGUoZWxlbWVudCwge1xuICAgICAgY29udGFpbmVyOiB0aGlzLmFyZWEsXG4gICAgICBib3VuZDogQm91bmRUb0FyYy5ib3VuZGluZyhcbiAgICAgICAgdGhpcy5zaGlmdGVkQ2VudGVyLFxuICAgICAgICB0aGlzLm9wdGlvbnMucmFkaXVzLFxuICAgICAgICB0aGlzLm9wdGlvbnMuc3RhcnRBbmdsZSxcbiAgICAgICAgdGhpcy5vcHRpb25zLmVuZEFuZ2xlXG4gICAgICApLFxuICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgb246IHtcbiAgICAgICAgJ2RyYWc6bW92ZSc6ICgpID0+IHRoaXMuY2hhbmdlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQW5nbGUoKSB7XG4gICAgdGhpcy5hbmdsZSA9IGdldEFuZ2xlKHRoaXMuc2hpZnRlZENlbnRlciwgdGhpcy5kcmFnZ2FibGUucG9zaXRpb24pXG4gIH1cblxuICBjaGFuZ2UoKSB7XG4gICAgdGhpcy51cGRhdGVBbmdsZSgpXG4gICAgLy8gICAgICB2YXIgYW5nbGUgPSBHZW9tZXRyeS5nZXROZWFyZXN0QW5nbGUodGhpcy5vcHRpb25zLmFuZ2xlcywgdGhpcy5hbmdsZSk7XG4gICAgLy8gICAgICB0aGlzLnNldEFuZ2xlKGFuZ2xlLHRoaXMub3B0aW9ucy50aW1lKTtcbiAgICB0aGlzLmVtaXQoJ2FyY3NsaWRlcjpjaGFuZ2UnLCB7IGFuZ2xlOiB0aGlzLmFuZ2xlIH0pXG4gIH1cblxuICBzZXRBbmdsZShhbmdsZSwgdGltZSkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKFxuICAgICAgdGhpcy5hbmdsZSxcbiAgICAgIHRoaXMub3B0aW9ucy5yYWRpdXMsXG4gICAgICB0aGlzLnNoaWZ0ZWRDZW50ZXJcbiAgICApXG4gICAgdGhpcy5hbmdsZSA9IG5vcm1hbGl6ZUFuZ2xlKGFuZ2xlLCBwb3NpdGlvbilcbiAgICB0aGlzLmRyYWdnYWJsZS5waW5Qb3NpdGlvbihwb3NpdGlvbiwgdGltZXx8MClcbiAgICB0aGlzLmVtaXQoJ2FyY3NsaWRlcjpjaGFuZ2UnLCB0aGlzLmFuZ2xlKVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5nZShzdGFydCwgc3RvcCwgc3RlcCkge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBpZiAodHlwZW9mIHN0b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgc3RvcCA9IHN0YXJ0XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKHR5cGVvZiBzdGVwID09PSAndW5kZWZpbmVkJykge1xuICAgIHN0ZXAgPSAxXG4gIH1cbiAgaWYgKChzdGVwID4gMCAmJiBzdGFydCA+PSBzdG9wKSB8fCAoc3RlcCA8IDAgJiYgc3RhcnQgPD0gc3RvcCkpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBmb3IgKGxldCBpID0gc3RhcnQ7IHN0ZXAgPiAwID8gaSA8IHN0b3AgOiBpID4gc3RvcDsgaSArPSBzdGVwKSB7XG4gICAgcmVzdWx0LnB1c2goaSlcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG4iLCJpbXBvcnQgY3JlYXRlQ2FudmFzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWNhbnZhcydcbmltcG9ydCByYW5nZSBmcm9tICcuL3V0aWxzL3JhbmdlJ1xuaW1wb3J0IHtcbiAgRHJhZ2dhYmxlLFxuICBCb3VuZFRvQXJjLFxuICBQb2ludCxcbiAgUmVjdGFuZ2xlLFxuICBnZXREaXN0YW5jZVxufSBmcm9tICdkcmFnZWUnXG5cbmltcG9ydCB7XG4gIHRvUmFkaWFuLFxuICBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0sXG4gIGdldEFuZ2xlLFxuICBub3JtYWxpemVBbmdsZVxufSBmcm9tICcuL2dlb21ldHJ5L2FuZ2xlcydcblxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuL0V2ZW50RW1pdHRlcidcblxuY29uc3Qgcm5kID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMjU1KVxufVxuXG5jb25zdCB0b0hleFN0cmluZyA9IGZ1bmN0aW9uKGRpZ2l0KSB7XG4gIGxldCBzdHIgPSBkaWdpdC50b1N0cmluZygxNilcbiAgd2hpbGUgKHN0ci5sZW5ndGggPCAyKSB7XG4gICAgc3RyID0gJzAnICsgc3RyXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiByYW5kb21Db2xvcigpIHtcbiAgcmV0dXJuIGAjJHt0b0hleFN0cmluZyhybmQoKSl9JHt0b0hleFN0cmluZyhybmQoKSl9JHt0b0hleFN0cmluZyhybmQoKSl9YFxufVxuXG5mdW5jdGlvbiBnZXRBcnJheVdpdGhCb3VuZEluZGV4ZXMoaW5kZXgsIGxlbmd0aCkge1xuICBjb25zdCByZXRJbmRleGVzID0gW11cbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHJldEluZGV4ZXMucHVzaChpbmRleClcbiAgICByZXRJbmRleGVzLnB1c2goKGluZGV4ICsgMSkgJSBsZW5ndGgpXG4gIH1cblxuICByZXR1cm4gcmV0SW5kZXhlc1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFydCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yIChhcmVhLCBlbGVtZW50cywgb3B0aW9ucz17fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgY29uc3QgYXJlYVJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudChhcmVhLCBhcmVhKVxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiBhcmVhUmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgcmFkaXVzOiBhcmVhUmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICB0b3VjaFJhZGl1czogYXJlYVJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgYm91bmRBbmdsZTogTWF0aC5QSSAvIDksXG4gICAgICBmaWxsU3R5bGVzOiByYW5nZSgwLCBlbGVtZW50cy5sZW5ndGgpLm1hcCgoKSA9PiByYW5kb21Db2xvcigpKSxcbiAgICAgIGluaXRBbmdsZXM6IHJhbmdlKC05MCwgMjcwLCAzNjAgLyBlbGVtZW50cy5sZW5ndGgpLm1hcCgoYW5nbGUpID0+IHRvUmFkaWFuKGFuZ2xlKSksXG4gICAgICBsaW1pdEltZzogbnVsbCxcbiAgICAgIGxpbWl0SW1nT2Zmc2V0OiBuZXcgUG9pbnQoMCwgMClcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5hcmVhID0gYXJlYVxuICAgIHRoaXMuYXJlYVJlY3RhbmdsZSA9IGFyZWFSZWN0YW5nbGVcbiAgICB0aGlzLmluaXQoZWxlbWVudHMpXG4gIH1cblxuICBpbml0KGVsZW1lbnRzKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjcmVhdGVDYW52YXModGhpcy5hcmVhLCB0aGlzLmFyZWFSZWN0YW5nbGUpXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHRoaXMuZHJhZ2dhYmxlcyA9IGVsZW1lbnRzLm1hcCgoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLm9wdGlvbnMuaW5pdEFuZ2xlc1tpXVxuICAgICAgY29uc3QgaGFsZlNpemUgPSBQb2ludC5lbGVtZW50U2l6ZShlbGVtZW50KS5tdWx0KDAuNSlcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKFxuICAgICAgICBhbmdsZSxcbiAgICAgICAgdGhpcy5vcHRpb25zLnRvdWNoUmFkaXVzLFxuICAgICAgICB0aGlzLm9wdGlvbnMuY2VudGVyLnN1YihoYWxmU2l6ZSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIG5ldyBEcmFnZ2FibGUoZWxlbWVudCwge1xuICAgICAgICBjb250YWluZXI6IHRoaXMuYXJlYSxcbiAgICAgICAgYm91bmQ6IEJvdW5kVG9BcmMuYm91bmRpbmcoXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpLFxuICAgICAgICAgIHRoaXMub3B0aW9ucy50b3VjaFJhZGl1cyxcbiAgICAgICAgICB0aGlzLmdldEJvdW5kQW5nbGUoaSwgZmFsc2UpLFxuICAgICAgICAgIHRoaXMuZ2V0Qm91bmRBbmdsZShpLCB0cnVlKVxuICAgICAgICApLFxuICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgJ2RyYWc6bW92ZSc6ICgpID0+IHRoaXMuZHJhdygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRoaXMuaXNJbml0ID0gdHJ1ZVxuICAgIHRoaXMuZHJhdygpXG4gIH1cblxuICB1cGRhdGVBbmdsZXMoKSB7XG4gICAgdGhpcy5hbmdsZXMgPSB0aGlzLmRyYWdnYWJsZXMubWFwKChkcmFnZ2FibGUpID0+IHtcbiAgICAgIGNvbnN0IGhhbGZTaXplID0gZHJhZ2dhYmxlLmdldFNpemUoKS5tdWx0KDAuNSlcbiAgICAgIHJldHVybiBnZXRBbmdsZSh0aGlzLm9wdGlvbnMuY2VudGVyLnN1YihoYWxmU2l6ZSksIGRyYWdnYWJsZS5wb3NpdGlvbilcbiAgICB9KVxuICB9XG5cbiAgZ2V0Qm91bmRBbmdsZShpbmRleCwgaXNDbG9zc2luZykge1xuICAgIGNvbnN0IHNpZ24gPSBpc0Nsb3NzaW5nID8gMSA6IC0xXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbGV0IGkgPSAoaW5kZXggKyBzaWduKSAlIHRoaXMuYW5nbGVzLmxlbmd0aFxuICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgIGkgKz0gdGhpcy5hbmdsZXMubGVuZ3RoXG4gICAgICB9XG4gICAgICByZXR1cm4gbm9ybWFsaXplQW5nbGUodGhpcy5hbmdsZXNbaV0gLSBzaWduICogdGhpcy5vcHRpb25zLmJvdW5kQW5nbGUpXG4gICAgfVxuICB9XG5cbiAgZHJhdygpIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUFuZ2xlcygpXG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS54LCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55KVxuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChfZHJhZ2dhYmxlLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5kcmF3QXJjKHRoaXMuY29udGV4dCwgdGhpcy5vcHRpb25zLmNlbnRlciwgdGhpcy5vcHRpb25zLnJhZGl1cywgaW5kZXgpXG4gICAgfSlcblxuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChfZHJhZ2dhYmxlLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5kcmF3TGltaXRJbWcoaW5kZXgpXG4gICAgfSlcblxuICAgIHRoaXMuZW1pdCgnY2hhcnQ6ZHJhdycpXG4gIH1cblxuICBjcmVhdGVDbG9uZShlbGVtZW50LCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGVsZW1lbnQsIGVsZW1lbnQpXG4gICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiByZWN0YW5nbGUuZ2V0Q2VudGVyKCksXG4gICAgICByYWRpdXM6IHJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgZmlsbFN0eWxlczogdGhpcy5vcHRpb25zLmZpbGxTdHlsZXNcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKGVsZW1lbnQsIHJlY3RhbmdsZSlcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjb25zdCBjbG9uZU9iaiA9IHtcbiAgICAgIGRyYXc6ICgpID0+IHtcbiAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgcmVjdGFuZ2xlLnNpemUueCwgcmVjdGFuZ2xlLnNpemUueSlcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goKF9kcmFnZ2FibGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgdGhpcy5kcmF3QXJjKGNvbnRleHQsIG9wdHMuY2VudGVyLCBvcHRzLnJhZGl1cywgaW5kZXgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGNsb25lT2JqLmRyYXcoKVxuICAgIHJldHVybiBjbG9uZU9ialxuICB9XG5cbiAgZ2V0RmlsbFN0eWxlKGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5maWxsU3R5bGVzW2luZGV4XSA9IHRoaXMub3B0aW9ucy5maWxsU3R5bGVzW2luZGV4XS5jYWxsKHRoaXMpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF1cbiAgfVxuXG4gIGRyYXdBcmMoY29udGV4dCwgY2VudGVyLCByYWRpdXMsIGluZGV4KSB7XG4gICAgY29uc3Qgc3RhcnRBbmdsZSA9IHRoaXMuYW5nbGVzW2luZGV4XVxuICAgIGNvbnN0IGVuZEFuZ2xlID0gdGhpcy5hbmdsZXNbKGluZGV4KzEpICUgdGhpcy5hbmdsZXMubGVuZ3RoXVxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5nZXRGaWxsU3R5bGUoaW5kZXgpXG5cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpXG4gICAgY29udGV4dC5tb3ZlVG8oY2VudGVyLngsIGNlbnRlci55KVxuICAgIGNvbnRleHQuYXJjKGNlbnRlci54LCBjZW50ZXIueSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgZmFsc2UpXG4gICAgY29udGV4dC5saW5lVG8oY2VudGVyLngsIGNlbnRlci55KVxuICAgIGNvbnRleHQuY2xvc2VQYXRoKClcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yXG4gICAgY29udGV4dC5maWxsKClcbiAgfVxuXG4gIGRyYXdMaW1pdEltZyhpbmRleCkge1xuICAgIGxldCBwb2ludCwgaW1nXG4gICAgaWYgKHRoaXMub3B0aW9ucy5saW1pdEltZykge1xuICAgICAgaW1nID0gdGhpcy5vcHRpb25zLmxpbWl0SW1nIGluc3RhbmNlb2YgQXJyYXkgPyB0aGlzLm9wdGlvbnMubGltaXRJbWdbaW5kZXhdIDogdGhpcy5vcHRpb25zLmxpbWl0SW1nXG4gICAgfVxuXG4gICAgaWYgKGltZykge1xuICAgICAgY29uc3QgYW5nbGUgPSBub3JtYWxpemVBbmdsZSh0aGlzLmFuZ2xlc1tpbmRleF0pXG4gICAgICBwb2ludCA9IG5ldyBQb2ludCgwLCAtaW1nLmhlaWdodCAvIDIpXG4gICAgICBwb2ludCA9IHBvaW50LmFkZCh0aGlzLm9wdGlvbnMubGltaXRJbWdPZmZzZXQpXG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHRoaXMuYXJlYVJlY3RhbmdsZS5zaXplLnggLyAyLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55IC8gMilcbiAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoYW5nbGUpXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltZywgcG9pbnQueCwgcG9pbnQueSlcbiAgICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMClcbiAgICB9XG4gIH1cblxuICBnZXRBbmdsZXNEaWZmKCkge1xuICAgIGNvbnN0IGFuZ2xlcyA9IHRoaXMuYW5nbGVzLnNsaWNlKDEpXG4gICAgbGV0IGJhc2VBbmdsZSA9IHRoaXMuYW5nbGVzWzBdXG5cbiAgICBhbmdsZXMucHVzaChiYXNlQW5nbGUpXG4gICAgcmV0dXJuIGFuZ2xlcy5tYXAoKGFuZ2xlKSA9PiB7XG4gICAgICBjb25zdCBkaWZmQW5nbGUgPSBub3JtYWxpemVBbmdsZShhbmdsZSAtIGJhc2VBbmdsZSlcbiAgICAgIGJhc2VBbmdsZSA9IGFuZ2xlXG4gICAgICByZXR1cm4gZGlmZkFuZ2xlXG4gICAgfSlcbiAgfVxuXG4gIGdldFBlcmNlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QW5nbGVzRGlmZigpLm1hcCgoZGlmZkFuZ2xlKSA9PiBkaWZmQW5nbGUgLyAoMiAqIE1hdGguUEkpKVxuICB9XG5cbiAgZ2V0QXJjQmlzZWN0cml4cygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBbmdsZXNEaWZmKCkubWFwKChkaWZmQW5nbGUsIGkpID0+IHtcbiAgICAgIHJldHVybiBub3JtYWxpemVBbmdsZSh0aGlzLmFuZ2xlc1tpXSArIGRpZmZBbmdsZSAvIDIpXG4gICAgfSlcbiAgfVxuXG4gIGdldEFyY09uUG9pbnQocG9pbnQpIHtcbiAgICBjb25zdCBhbmdsZSA9IGdldEFuZ2xlKHRoaXMub3B0aW9ucy5jZW50ZXIsIHBvaW50KVxuICAgIGNvbnN0IHJhZGl1cyA9IGdldERpc3RhbmNlKHRoaXMub3B0aW9ucy5jZW50ZXIsIHBvaW50KVxuXG4gICAgaWYgKHJhZGl1cyA+IHRoaXMub3B0aW9ucy5yYWRpdXMpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGxldCBvZmZzZXQgPSAtMSwgaSwgalxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmFuZ2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9mZnNldCA9PT0gLTEgfHwgdGhpcy5hbmdsZXNbb2Zmc2V0XSA+IHRoaXMuYW5nbGVzW2ldKSB7XG4gICAgICAgIG9mZnNldCA9IGlcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChpID0gMCwgaiA9IG9mZnNldDsgaSA8IHRoaXMuYW5nbGVzLmxlbmd0aDsgaSsrLCBqID0gKGkgKyBvZmZzZXQpICUgdGhpcy5hbmdsZXMubGVuZ3RoKSB7XG4gICAgICBpZiAoYW5nbGUgPCB0aGlzLmFuZ2xlc1tqXSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoLS1qIDwgMCkge1xuICAgICAgaiArPSB0aGlzLmFuZ2xlcy5sZW5ndGhcbiAgICB9XG4gICAgcmV0dXJuIGpcbiAgfVxuXG4gIHNldEFuZ2xlcyhhbmdsZXMpIHtcbiAgICB0aGlzLmFuZ2xlcyA9IGFuZ2xlc1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChkcmFnZ2FibGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5hbmdsZXNbaV1cbiAgICAgIGNvbnN0IGhhbGZTaXplID0gZHJhZ2dhYmxlLmdldFNpemUoKS5tdWx0KDAuNSlcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKFxuICAgICAgICBhbmdsZSxcbiAgICAgICAgdGhpcy5vcHRpb25zLnRvdWNoUmFkaXVzLFxuICAgICAgICB0aGlzLm9wdGlvbnMuY2VudGVyLnN1YihoYWxmU2l6ZSlcbiAgICAgIClcblxuICAgICAgZHJhZ2dhYmxlLm1vdmVBbmRTYXZlKHBvc2l0aW9uKVxuICAgIH0pXG4gICAgdGhpcy5kcmF3KClcbiAgfVxuXG4gIHNldEFjdGl2ZUFyYyhpbmRleCkge1xuICAgIGNvbnN0IGVuYWJsZUluZGV4ZXMgPSBnZXRBcnJheVdpdGhCb3VuZEluZGV4ZXMoaW5kZXgsIHRoaXMuZHJhZ2dhYmxlcy5sZW5ndGgpXG4gICAgdGhpcy5hY3RpdmVBcmNJbmRleCA9IGluZGV4XG4gICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goKGRyYWdnYWJsZSwgaSkgPT4ge1xuICAgICAgZHJhZ2dhYmxlLmVuYWJsZSA9IGVuYWJsZUluZGV4ZXMuaW5kZXhPZihpKSAhPT0gLTFcbiAgICB9KVxuICAgIHRoaXMuZHJhdygpXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJzZXRTdHlsZSIsImVsZW1lbnQiLCJzdHlsZSIsImNzc1RleHQiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImFwcGVuZEZpcnN0Q2hpbGQiLCJub2RlIiwiZmlyc3RDaGlsZCIsImluc2VydEJlZm9yZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlQ2FudmFzIiwiYXJlYSIsInJlY3RhZ2xlIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBvc2l0aW9uIiwic2V0QXR0cmlidXRlIiwic2l6ZSIsIngiLCJ5IiwibGVmdCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0IiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnRpZXMiLCJfY3JlYXRlQ2xhc3MiLCJfaW5oZXJpdHMiLCJfc2V0UHJvdG90eXBlT2YiLCJfZ2V0UHJvdG90eXBlT2YiLCJfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0IiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiX2NyZWF0ZVN1cGVyIiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiX2FycmF5V2l0aG91dEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVNwcmVhZCIsIl9hcnJheUxpa2VUb0FycmF5IiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJnZXRBbmdsZSIsInAxIiwicDIiLCJkaWZmIiwic3ViIiwibm9ybWFsaXplQW5nbGUiLCJNYXRoIiwiYXRhbjIiLCJ0b1JhZGlhbiIsImFuZ2xlIiwiUEkiLCJ2YWwiLCJnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0iLCJsZW5ndGgiLCJjZW50ZXIiLCJQb2ludCIsImFkZCIsImNvcyIsInNpbiIsIlNwaWRlciIsImVsZW1lbnRzIiwib3B0aW9ucyIsImFyZWFSZWN0YW5nbGUiLCJSZWN0YW5nbGUiLCJmcm9tRWxlbWVudCIsIk9iamVjdCIsImFzc2lnbiIsImRBbmdsZSIsImdldENlbnRlciIsInN0YXJ0UmFkaXVzIiwiZW5kUmFkaXVzIiwiZ2V0TWluU2lkZSIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwiZmlsbFN0eWxlIiwiaW5pdCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiZHJhZ2dhYmxlcyIsIm1hcCIsImkiLCJoYWxmU2l6ZSIsImVsZW1lbnRTaXplIiwibXVsdCIsInN0YXJ0IiwiZW5kIiwiRHJhZ2dhYmxlIiwiY29udGFpbmVyIiwiYm91bmQiLCJCb3VuZFRvTGluZSIsImJvdW5kaW5nIiwib24iLCJkcmF3IiwiaXNJbml0IiwiY2xlYXJSZWN0IiwiYmVnaW5QYXRoIiwicG9pbnQiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjbG9zZVBhdGgiLCJzdHJva2UiLCJmaWxsIiwiRXZlbnRFbWl0dGVyIiwiZXZlbnRzIiwiZW50cmllcyIsImV2ZW50TmFtZSIsImZuIiwiaW50ZXJydXB0ZWQiLCJhcmdzIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiZnVuYyIsImFwcGx5IiwicHVzaCIsInVuc2hpZnQiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJBcmNTbGlkZXIiLCJyYWRpdXMiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJhbmdsZXMiLCJ0aW1lIiwic2hpZnRlZENlbnRlciIsImRyYWdnYWJsZSIsIkJvdW5kVG9BcmMiLCJjaGFuZ2UiLCJ1cGRhdGVBbmdsZSIsImVtaXQiLCJwaW5Qb3NpdGlvbiIsInJhbmdlIiwic3RvcCIsInN0ZXAiLCJyZXN1bHQiLCJybmQiLCJyb3VuZCIsInJhbmRvbSIsInRvSGV4U3RyaW5nIiwiZGlnaXQiLCJzdHIiLCJ0b1N0cmluZyIsInJhbmRvbUNvbG9yIiwiZ2V0QXJyYXlXaXRoQm91bmRJbmRleGVzIiwicmV0SW5kZXhlcyIsIkNoYXJ0IiwidG91Y2hSYWRpdXMiLCJib3VuZEFuZ2xlIiwiZmlsbFN0eWxlcyIsImluaXRBbmdsZXMiLCJsaW1pdEltZyIsImxpbWl0SW1nT2Zmc2V0IiwiZ2V0Qm91bmRBbmdsZSIsImdldFNpemUiLCJpc0Nsb3NzaW5nIiwic2lnbiIsInVwZGF0ZUFuZ2xlcyIsImZvckVhY2giLCJfZHJhZ2dhYmxlIiwiZHJhd0FyYyIsImRyYXdMaW1pdEltZyIsInJlY3RhbmdsZSIsIm9wdHMiLCJjbG9uZU9iaiIsImNvbG9yIiwiZ2V0RmlsbFN0eWxlIiwiYXJjIiwiaW1nIiwiQXJyYXkiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJkcmF3SW1hZ2UiLCJzZXRUcmFuc2Zvcm0iLCJiYXNlQW5nbGUiLCJkaWZmQW5nbGUiLCJnZXRBbmdsZXNEaWZmIiwiZ2V0RGlzdGFuY2UiLCJvZmZzZXQiLCJqIiwibW92ZUFuZFNhdmUiLCJlbmFibGVJbmRleGVzIiwiYWN0aXZlQXJjSW5kZXgiLCJlbmFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxTQUFTQSxRQUFULENBQWtCQyxPQUFsQixFQUEyQkMsS0FBM0IsRUFBa0M7RUFDaENBLEVBQUFBLEtBQUssR0FBR0EsS0FBSyxJQUFJLEVBQWpCO0VBQ0Es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QUFHLEVBQUUsV0FBVztFQUNwQixJQUFJLEtBQUssRUFBRSxTQUFTLFNBQVMsR0FBRztFQUNoQyxNQUFNLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwRCxLQUFLO0VBQ0wsR0FBRyxFQUFFO0VBQ0wsSUFBSSxHQUFHLEVBQUUsSUFBSTtFQUNiLElBQUksS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRTtFQUM3QixNQUFNLElBQUksUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2SCxNQUFNLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7RUFDekwsTUFBTSxPQUFPLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUMzQyxLQUFLO0VBQ0wsR0FBRyxFQUFF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Q0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7RUFDNUUsT0FBTztBQUNQO0VBQ0EsTUFBTSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7RUFDeEMsTUFBTSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7RUFDeEMsTUFBTSxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNwRSxNQUFNLElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUM1SyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7RUFDL0QsTUFBTSxPQUFPLElBQUksQ0FBQztFQUNsQixLQUFLO0VBQ0wsR0FBRyxFQUFFO0VBQ0wsSUFBSSxHQUFHLEVBQUUsV0FBVztFQUNwQixJQUFJLEtBQUssRUFBRSxTQUFTLFNBQVMsR0FBRztFQUNoQyxNQUFNLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDdkMsS0FBSztFQUNMLEdBQUcsRUFBRTtFQUNMLElBQUksR0FBRyxFQUFFLFlBQVk7RUFDckIsSUFBSSxLQUFLLEVBQUUsU0FBUyxVQUFVLENBQUMsRUFBRSxFQUFFO0VBQ25DLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQy9DLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0VBQzdDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0VBQzVDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0VBQzFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0VBQzNDLEtBQUs7RUFDTCxHQUFHLEVBQUU7RUFDTCxJQUFJLEdBQUcsRUFBRSxRQUFRO0VBQ2pCLElBQUksS0FBSyxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRTtFQUNqQyxNQUFNLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDdEMsTUFBTSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3pELEtBQUs7RUFDTCxHQUFHLEVBQUU7RUFDTCxJQUFJLEdBQUcsRUFBRSxZQUFZO0VBQ3JCLElBQUksS0FBSyxFQUFFLFNBQVMsVUFBVSxHQUFHO0VBQ2pDLE1BQU0sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEQsS0FBSztF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Q1gsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEtBQUssT0FBTyxZQUFZLEVBQUUsUUFBUSxFQUFFLEtBQUssUUFBUSxHQUFHO0VBQ3RELElBQUksT0FBTyxRQUFRLENBQUM7RUFDcEIsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEU7RUFDQTtFQUNBLEVBQUUsSUFBSSxRQUFRLENBQUM7RUFDZixFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUc7RUFDdkQsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztFQUN0QyxJQUFJLEtBQUssT0FBTyxZQUFZLEVBQUUsUUFBUSxFQUFFLEtBQUssUUFBUSxHQUFHO0VBQ3hELE1BQU0sT0FBTyxRQUFRLENBQUM7RUFDdEIsS0FBSztFQUNMLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDQTtFQUNBO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7RUFDcEMsQ0FBQztBQUNEO0VBQ0EsQ0FBQyxHQUFHLENBQUM7RUFDTCxDQUFDLENBQUMsQ0FBQztBQUNIO0VBQ0EsU0FBUyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUM3QixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDdEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3ZCLEVBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFD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QUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9DLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7RUFDcEIsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMzQixHQUFHLE1BQU07RUFDVCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0MsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7RUFDcEIsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMzQixHQUFHO0VBQ0gsQ0FBQztFQUNELFNBQVMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQzlCLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxQyxNQUFNLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQ3JDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQ3ZDLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7RUFDdEIsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ25ELENBQUM7RUFDRCxTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0VBQ2xELEVBQUUsSUFBSSxFQUFFLEdBQUcs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
