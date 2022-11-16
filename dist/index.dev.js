var DrageeWidgets = (function (exports) {
  'use strict';

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
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
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
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf$1(subClass, superClass);
  }
  function _getPrototypeOf$1(o) {
    _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$1(o);
  }
  function _setPrototypeOf$1(o, p) {
    _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
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
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
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
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized$1(self);
  }
  function _createSuper$1(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf$1(Derived),
        result;
      if (hasNativeReflectConstruct) {
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
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _iterableToArrayLimit$1(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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
    if (n === "Map" || n === "Set") return Array.from(o);
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
  function _createForOfIteratorHelper$1(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
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
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
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
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
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
    Object.defineProperty(subClass, "prototype", {
      writable: false
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
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
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
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
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
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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
    if (n === "Map" || n === "Set") return Array.from(o);
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

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
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

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
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

  /** Class representing a point. */
  var Point = /*#__PURE__*/function () {
    /**
    * Create a point.
    * @param {number} x - The x value.
    * @param {number} y - The y value.
    */
    function Point(x, y) {
      _classCallCheck(this, Point);

      this.x = x;
      this.y = y;
    }

    _createClass(Point, [{
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
        var elementRect = element.getBoundingClientRect();
        return new Point(elementRect.width, elementRect.height);
      }
    }]);

    return Point;
  }();

  var Rectangle = /*#__PURE__*/function () {
    function Rectangle(position, size) {
      _classCallCheck(this, Rectangle);

      this.position = position;
      this.size = size;
    }

    _createClass(Rectangle, [{
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
        var isConsiderTranslate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var position = Point.elementOffset(element, parent, isConsiderTranslate);
        var size = Point.elementSize(element);
        return new Rectangle(position, size);
      }
    }]);

    return Rectangle;
  }();

  function getDefaultContainer(element) {
    var container = element.parentNode;

    while (container.parentNode && window.getComputedStyle(container)['position'] === 'static' && container.tagName !== 'BODY') {
      container = container.parentNode;
    }

    return container;
  }

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
            func.apply(void 0, _toConsumableArray(args));

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
  function getAngle$1(p1, p2) {
    var diff = p2.sub(p1);
    return normalizeAngle$1(Math.atan2(diff.y, diff.x));
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

  var Bound = /*#__PURE__*/function () {
    function Bound() {
      _classCallCheck(this, Bound);
    }

    _createClass(Bound, [{
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
    _inherits(BoundToRectangle, _Bound);

    var _super = _createSuper(BoundToRectangle);

    function BoundToRectangle(rectangle) {
      var _this;

      _classCallCheck(this, BoundToRectangle);

      _this = _super.call(this);
      _this.rectangle = rectangle;
      return _this;
    }

    _createClass(BoundToRectangle, [{
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
    _inherits(BoundToElement, _BoundToRectangle);

    var _super2 = _createSuper(BoundToElement);

    function BoundToElement(element, container) {
      var _this2;

      _classCallCheck(this, BoundToElement);

      _this2 = _super2.call(this, Rectangle.fromElement(element, container));
      _this2.element = element;
      _this2.container = container;
      return _this2;
    }

    _createClass(BoundToElement, [{
      key: "refresh",
      value: function refresh() {
        this.rectangle = Rectangle.fromElement(this.element, this.container);
      }
    }]);

    return BoundToElement;
  }(BoundToRectangle);
  var BoundToLine = /*#__PURE__*/function (_Bound4) {
    _inherits(BoundToLine, _Bound4);

    var _super5 = _createSuper(BoundToLine);

    function BoundToLine(startPoint, endPoint) {
      var _this5;

      _classCallCheck(this, BoundToLine);

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

    _createClass(BoundToLine, [{
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
    _inherits(BoundToCircle, _Bound5);

    var _super6 = _createSuper(BoundToCircle);

    function BoundToCircle(center, radius) {
      var _this6;

      _classCallCheck(this, BoundToCircle);

      _this6 = _super6.call(this);
      _this6.center = center;
      _this6.radius = radius;
      return _this6;
    }

    _createClass(BoundToCircle, [{
      key: "bound",
      value: function bound(point, _size) {
        return getPointOnLineByLenght(this.center, point, this.radius);
      }
    }]);

    return BoundToCircle;
  }(Bound);
  var BoundToArc = /*#__PURE__*/function (_BoundToCircle) {
    _inherits(BoundToArc, _BoundToCircle);

    var _super7 = _createSuper(BoundToArc);

    function BoundToArc(center, radius, startAngle, endAngle) {
      var _this7;

      _classCallCheck(this, BoundToArc);

      _this7 = _super7.call(this, center, radius);
      _this7._startAngle = startAngle;
      _this7._endAngle = endAngle;
      return _this7;
    }

    _createClass(BoundToArc, [{
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
        var angle = getAngle$1(this.center, point);
        angle = normalizeAngle$1(angle);
        angle = boundAngle(this.startAngle(), this.endAngle(), angle);
        return getPointFromRadialSystem$1(angle, this.radius, this.center);
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

  var BasicStrategy = /*#__PURE__*/function () {
    function BasicStrategy(rectangle) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, BasicStrategy);

      this.rectangle = rectangle;
      this.options = options;
    }

    _createClass(BasicStrategy, [{
      key: "boundRect",
      get: function get() {
        return typeof this.rectangle === 'function' ? this.rectangle() : this.rectangle;
      }
    }]);

    return BasicStrategy;
  }();

  var FloatLeftStrategy = /*#__PURE__*/function (_BasicStrategy2) {
    _inherits(FloatLeftStrategy, _BasicStrategy2);

    var _super2 = _createSuper(FloatLeftStrategy);

    function FloatLeftStrategy(rectangle) {
      var _this2;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, FloatLeftStrategy);

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

    _createClass(FloatLeftStrategy, [{
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

  var addToDefaultScope$1 = function addToDefaultScope(target) {
    defaultScope.addTarget(target);
  };

  var Target = /*#__PURE__*/function (_EventEmitter) {
    _inherits(Target, _EventEmitter);

    var _super = _createSuper(Target);

    function Target(element, draggables) {
      var _this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, Target);

      _this = _super.call(this, options);

      var target = _assertThisInitialized(_this);

      _this.options = Object.assign({
        timeEnd: 200,
        timeExcange: 400
      }, options);
      _this.positioningStrategy = options.strategy || new FloatLeftStrategy(_this.getRectangle.bind(_assertThisInitialized(_this)), {
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
      Target.emitter.emit('target:create', _assertThisInitialized(_this));

      _this.startBounding();

      _this.init();

      return _this;
    }

    _createClass(Target, [{
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
          indexesOfNew = range$1(this.innerDraggables.length);
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
        return Rectangle.fromElement(this.element, this.container, true);
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
  }(EventEmitter$1);
  Target.emitter = new EventEmitter$1();
  Target.emitter.on('target:create', addToDefaultScope$1);

  var scopes = [];

  var Scope = /*#__PURE__*/function (_EventEmitter) {
    _inherits(Scope, _EventEmitter);

    var _super = _createSuper(Scope);

    function Scope(draggables, targets) {
      var _this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, Scope);

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
      scopes.push(_assertThisInitialized(_this));
      _this.options = {
        timeEnd: options.timeEnd || 400
      };

      _this.init();

      return _this;
    }

    _createClass(Scope, [{
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
  }(EventEmitter$1);

  var defaultScope = new Scope();

  function checkSupportPassiveEvents() {
    var passiveSupported = false;

    try {
      var options = Object.defineProperty({}, 'passive', {
        get: function get() {
          return passiveSupported = true;
        }
      });
      window.addEventListener('test', options, options);
      window.removeEventListener('test', options, options);
    } catch (_err) {
      passiveSupported = false;
    }

    return passiveSupported;
  }

  var isSupportPassiveEvents = checkSupportPassiveEvents();
  var isSupportPassiveEvents$1 = isSupportPassiveEvents;

  function throttle(func, wait) {
    var lastTime = 0;
    return function executedFunction() {
      var context = this;
      var args = arguments;
      var now = Date.now();

      if (now - lastTime >= wait) {
        func.apply(context, args);
        lastTime = now;
      }
    };
  }

  var throttledDragOver = function throttledDragOver(callback, duration) {
    var throttledCallback = throttle(function (event) {
      return callback(event);
    }, duration);
    return function (event) {
      event.preventDefault();
      throttledCallback(event);
    };
  };

  var passiveFalse = isSupportPassiveEvents$1 ? {
    passive: false
  } : false;
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

  function addToDefaultScope(draggable) {
    defaultScope.addDraggable(draggable);
  }

  function _copyStyles(source, destination) {
    var cs = window.getComputedStyle(source);

    for (var i = 0; i < cs.length; i++) {
      var key = cs[i];

      if (key.indexOf('transition') < 0 && key.indexOf('transform') < 0) {
        destination.style[key] = cs[key];
      }
    }

    for (var _i = 0; _i < source.children.length; _i++) {
      _copyStyles(source.children[_i], destination.children[_i]);
    }
  }

  var Draggable = /*#__PURE__*/function (_EventEmitter) {
    _inherits(Draggable, _EventEmitter);

    var _super = _createSuper(Draggable);

    function Draggable(element) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Draggable);

      _this = _super.call(this, options);
      _this.targets = [];
      _this.options = options;
      _this.element = element;
      preventDoubleInit(_assertThisInitialized(_this));
      Draggable.emitter.emit('draggable:create', _assertThisInitialized(_this));
      _this._enable = true;

      _this.startBounding();

      _this.startPositioning();

      _this.startListening();

      return _this;
    }

    _createClass(Draggable, [{
      key: "startBounding",
      value: function startBounding() {
        if (this.options.bound) {
          this.bounding = {
            bound: this.options.bound
          };
        } else {
          this.bounding = new BoundToElement(this.container, this.container);
        }
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

        if (this.bounding.refresh) {
          this.bounding.refresh();
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

        this._nativeDragOver = throttledDragOver(function (event) {
          return _this2.nativeDragOver(event);
        }, this.dragOverThrottleDuration);

        this._nativeDragEnd = function (event) {
          return _this2.nativeDragEnd(event);
        };

        this._nativeDrop = function (event) {
          return _this2.nativeDrop(event);
        };

        this._scroll = function (event) {
          return _this2.onScroll(event);
        };

        this.handler.addEventListener(touchEvents.start, this._dragStart, passiveFalse);
        this.handler.addEventListener(mouseEvents.start, this._dragStart, passiveFalse);
        this.element.addEventListener('dragstart', this._nativeDragStart);
      }
    }, {
      key: "getSize",
      value: function getSize() {
        return Point.elementSize(this.element);
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
        if (!this.element.style[transitionProperty]) {
          this.element.style[transitionProperty] = window.getComputedStyle(this.element)[transitionProperty];
        }
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
          transition = transition.replace(/transform \d*m?s/g, transitionCss);
        }

        if (this.element.style[transitionProperty] !== transition) {
          this.element.style[transitionProperty] = transition;
        }
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

        if (this.element.style[transformProperty] !== transform) {
          this.element.style[transformProperty] = transform;
        }
      }
    }, {
      key: "move",
      value: function move(point) {
        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var isSilent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        point = point.clone();
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
        this._previousDirectionPosition || (this._previousDirectionPosition = this._startPosition);
        this.leftDirection = this._previousDirectionPosition.x < point.x;
        this.rightDirection = this._previousDirectionPosition.x > point.x;
        this.upDirection = this._previousDirectionPosition.y > point.y;
        this.downDirection = this._previousDirectionPosition.y < point.y;
        this._previousDirectionPosition = point;
      }
    }, {
      key: "seemsScrolling",
      value: function seemsScrolling() {
        return +new Date() - this._startTouchTimestamp < this.touchDraggingThreshold;
      }
    }, {
      key: "shouldUseNativeDragAndDrop",
      value: function shouldUseNativeDragAndDrop() {
        if (this.isTouchEvent) {
          return this.nativeDragAndDrop && this.emulateNativeDragAndDropOnTouch;
        } else {
          return this.nativeDragAndDrop;
        }
      }
    }, {
      key: "dragStart",
      value: function dragStart(event) {
        var _this3 = this;

        if (!this._enable) {
          return;
        }

        this.isTouchEvent = isTouch && event instanceof window.TouchEvent;
        this.touchPoint = this._startTouchPoint = new Point(this.isTouchEvent ? event.changedTouches[0].pageX : event.clientX, this.isTouchEvent ? event.changedTouches[0].pageY : event.clientY);
        this._startPosition = this.getPosition();

        if (this.isTouchEvent) {
          this._touchId = event.changedTouches[0].identifier;
          this._startTouchTimestamp = +new Date();
        }

        this._startWindowScrollPoint = this.windowScrollPoint;
        this._startParentsScrollPoint = this.parentsScrollPoint;

        if (event.target instanceof window.HTMLInputElement || event.target instanceof window.HTMLInputElement) {
          event.target.focus();
        }

        if (this.shouldUseNativeDragAndDrop()) {
          if (this.isTouchEvent && this.emulateNativeDragAndDropOnTouch) {
            var emulateOnFirstMove = function emulateOnFirstMove(event) {
              if (_this3.seemsScrolling()) {
                _this3.cancelDragging();
              } else {
                _this3.emulateNativeDragAndDrop(event);
              }

              cancelEmulation();
            };

            var cancelEmulation = function cancelEmulation() {
              document.removeEventListener(touchEvents.move, emulateOnFirstMove);
              document.removeEventListener(touchEvents.end, cancelEmulation);
            };

            document.addEventListener(touchEvents.move, emulateOnFirstMove, passiveFalse);
            document.addEventListener(touchEvents.end, cancelEmulation, passiveFalse);
          } else {
            this.element.draggable = true;
            document.addEventListener(mouseEvents.end, this._nativeDragEnd, passiveFalse);
          }
        } else {
          document.addEventListener(touchEvents.move, this._dragMove, passiveFalse);
          document.addEventListener(mouseEvents.move, this._dragMove, passiveFalse);
          document.addEventListener(touchEvents.end, this._dragEnd, passiveFalse);
          document.addEventListener(mouseEvents.end, this._dragEnd, passiveFalse);
        }

        window.addEventListener('scroll', this._scroll);
        this.parents.forEach(function (p) {
          return p.addEventListener('scroll', _this3._scroll);
        });
        this.emit('drag:start');
      }
    }, {
      key: "dragMove",
      value: function dragMove(event) {
        var touch;
        this.isDragging = true;
        this.isTouchEvent = isTouch && event instanceof window.TouchEvent;

        if (this.isTouchEvent) {
          touch = getTouchByID(event, this._touchId);

          if (!touch) {
            return;
          }

          if (this.seemsScrolling()) {
            this.cancelDragging();
            return;
          }
        }

        event.stopPropagation();
        event.preventDefault();
        this.touchPoint = new Point(this.isTouchEvent ? touch.pageX : event.clientX, this.isTouchEvent ? touch.pageY : event.clientY);

        var point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.windowScrollPoint.sub(this._startWindowScrollPoint)).add(this.parentsScrollPoint.sub(this._startParentsScrollPoint));

        point = this.bounding.bound(point, this.getSize());
        this.determineDirection(point);
        this.move(point);
        this.element.classList.add('dragee-active');
      }
    }, {
      key: "dragEnd",
      value: function dragEnd(event) {
        var _this4 = this;

        this.isTouchEvent = isTouch && event instanceof window.TouchEvent;

        if (this.isTouchEvent && !getTouchByID(event, this._touchId)) {
          return;
        }

        if (this.isDragging) {
          event.stopPropagation();
          event.preventDefault();
        }

        this.dragEndAction();
        this.emit('drag:end');
        this.cancelDragging();
        setTimeout(function () {
          return _this4.element.classList.remove('dragee-active');
        });
      }
    }, {
      key: "onScroll",
      value: function onScroll(_event) {
        var point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.windowScrollPoint.sub(this._startWindowScrollPoint)).add(this.parentsScrollPoint.sub(this._startParentsScrollPoint));

        point = this.bounding.bound(point, this.getSize());

        if (!this.nativeDragAndDrop) {
          this.determineDirection(point);
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
        this.element.classList.add('dragee-placeholder');

        if (event.clientX === 0 && event.clientY === 0) {
          return;
        }

        this.touchPoint = new Point(event.clientX, event.clientY);

        var point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.windowScrollPoint.sub(this._startWindowScrollPoint)).add(this.parentsScrollPoint.sub(this._startParentsScrollPoint));

        point = this.bounding.bound(point, this.getSize());
        this.determineDirection(point);
        this.position = point;
        this.emit('drag:move');
      }
    }, {
      key: "nativeDragEnd",
      value: function nativeDragEnd(_event) {
        var _this5 = this;

        this.element.classList.remove('dragee-placeholder');
        this.dragEndAction();
        this.emit('drag:end');
        document.removeEventListener('dragover', this._nativeDragOver);
        document.removeEventListener('dragend', this._nativeDragEnd);
        document.removeEventListener(mouseEvents.end, this._nativeDragEnd);
        document.removeEventListener('drop', this._nativeDrop);
        window.removeEventListener('scroll', this._scroll);
        this.parents.forEach(function (p) {
          return p.removeEventListener('scroll', _this5._scroll);
        });
        this.isDragging = false;
        this.element.removeAttribute('draggable');
        this.element.classList.remove('dragee-active');
      }
    }, {
      key: "nativeDrop",
      value: function nativeDrop(event) {
        event.stopPropagation();
        event.preventDefault();
      }
    }, {
      key: "cancelDragging",
      value: function cancelDragging() {
        var _this6 = this;

        document.removeEventListener(touchEvents.move, this._dragMove);
        document.removeEventListener(mouseEvents.move, this._dragMove);
        document.removeEventListener(touchEvents.end, this._dragEnd);
        document.removeEventListener(mouseEvents.end, this._dragEnd);
        document.removeEventListener(mouseEvents.end, this._nativeDragEnd);
        window.removeEventListener('scroll', this._scroll);
        this.parents.forEach(function (p) {
          return p.removeEventListener('scroll', _this6._scroll);
        });
        this.isDragging = false;
        this._previousDirectionPosition = null;
        this.element.removeAttribute('draggable');
      }
    }, {
      key: "copyStyles",
      value: function copyStyles(source, destination) {
        if (this.options.copyStyles) {
          this.options.copyStyles(source, destination);
        } else {
          _copyStyles(source, destination);
        }
      }
    }, {
      key: "emulateNativeDragAndDrop",
      value: function emulateNativeDragAndDrop(event) {
        var _this7 = this;

        var containerRect = this.container.getBoundingClientRect();
        var clonedElement = this.element.cloneNode(true);
        clonedElement.style[transformProperty] = '';
        this.copyStyles(this.element, clonedElement);
        clonedElement.style.position = 'absolute';
        document.body.appendChild(clonedElement);
        this.element.classList.add('dragee-placeholder');
        var emulationDraggable = new Draggable(clonedElement, {
          container: document.body,
          touchDraggingThreshold: 0,
          bound: function bound(point) {
            return point;
          },
          on: {
            'drag:move': function dragMove() {
              var containerRectPoint = new Point(containerRect.left, containerRect.top);
              _this7.position = emulationDraggable.position.sub(containerRectPoint).sub(_this7._startWindowScrollPoint).add(_this7._startParentsScrollPoint);

              _this7.determineDirection(_this7.position);

              _this7.emit('drag:move');
            },
            'drag:end': function dragEnd() {
              emulationDraggable.destroy();
              document.body.removeChild(clonedElement);

              _this7.element.classList.remove('dragee-placeholder');

              _this7.element.classList.remove('dragee-active');

              _this7.emit('drag:end');

              _this7.dragEndAction();

              _this7.cancelDragging();
            }
          }
        });
        var containerRectPoint = new Point(containerRect.left, containerRect.top);
        emulationDraggable._startWindowScrollPoint = this._startWindowScrollPoint;
        emulationDraggable.move(this.pinnedPosition.add(containerRectPoint).add(this.windowScrollPoint).sub(this.parentsScrollPoint));
        emulationDraggable.dragStart(event);
        event.preventDefault();
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
        if (this.bounding.refresh) {
          this.bounding.refresh();
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
        return this.options.emulateNativeDragAndDropOnTouch || false;
      }
    }, {
      key: "shouldRemoveZeroTranslate",
      get: function get() {
        return this.options.shouldRemoveZeroTranslate || false;
      }
    }, {
      key: "touchDraggingThreshold",
      get: function get() {
        return this.options.touchDraggingThreshold || 0;
      }
    }, {
      key: "dragOverThrottleDuration",
      get: function get() {
        return this.options.dragOverThrottleDuration || 16;
      }
    }, {
      key: "windowScrollPoint",
      get: function get() {
        return new Point(window.scrollX, window.scrollY);
      }
    }, {
      key: "parents",
      get: function get() {
        if (this._cachedParents) return this._cachedParents;
        this._cachedParents = [];
        var element = this.element;

        while (element.parentNode && element != this.container) {
          this._cachedParents.unshift(element.parentNode);

          element = element.parentNode;
        }

        return this._cachedParents;
      }
    }, {
      key: "parentsScrollPoint",
      get: function get() {
        return new Point(this.parents.reduce(function (sum, p) {
          return sum + p.scrollLeft;
        }, 0), this.parents.reduce(function (sum, p) {
          return sum + p.scrollTop;
        }, 0));
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(enable) {
        if (enable) {
          this.element.classList.remove('dragee-disable');
        } else {
          this.element.classList.add('dragee-disable');
        }

        this._enable = enable;
      }
    }]);

    return Draggable;
  }(EventEmitter$1);
  Draggable.emitter = new EventEmitter$1();
  Draggable.emitter.on('draggable:create', addToDefaultScope);

  var ResizeObserverBoxOptions;
  (function (ResizeObserverBoxOptions) {
      ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
      ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
      ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
  })(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));

  var freeze = function (obj) { return Object.freeze(obj); };

  var ResizeObserverSize = (function () {
      function ResizeObserverSize(inlineSize, blockSize) {
          this.inlineSize = inlineSize;
          this.blockSize = blockSize;
          freeze(this);
      }
      return ResizeObserverSize;
  }());

  var DOMRectReadOnly = (function () {
      function DOMRectReadOnly(x, y, width, height) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.top = this.y;
          this.left = this.x;
          this.bottom = this.top + this.height;
          this.right = this.left + this.width;
          return freeze(this);
      }
      DOMRectReadOnly.prototype.toJSON = function () {
          var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
          return { x: x, y: y, top: top, right: right, bottom: bottom, left: left, width: width, height: height };
      };
      DOMRectReadOnly.fromRect = function (rectangle) {
          return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
      };
      return DOMRectReadOnly;
  }());

  var global = typeof window !== 'undefined' ? window : {};
  (/msie|trident/i).test(global.navigator && global.navigator.userAgent);
  var size = function (inlineSize, blockSize, switchSizes) {
      if (inlineSize === void 0) { inlineSize = 0; }
      if (blockSize === void 0) { blockSize = 0; }
      if (switchSizes === void 0) { switchSizes = false; }
      return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
  };
  freeze({
      devicePixelContentBoxSize: size(),
      borderBoxSize: size(),
      contentBoxSize: size(),
      contentRect: new DOMRectReadOnly(0, 0, 0, 0)
  });

  function getAngle(p1, p2) {
    var diff = p2.sub(p1);
    return normalizeAngle(Math.atan2(diff.y, diff.x));
  }
  function toRadian(angle) {
    return angle % 360 * Math.PI / 180;
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

  var Spider = /*#__PURE__*/function () {
    function Spider(area, elements) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      _classCallCheck$1(this, Spider);
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
    _createClass$1(Spider, [{
      key: "init",
      value: function init(elements) {
        var _this = this;
        this.canvas = createCanvas(this.area, this.areaRectangle);
        this.context = this.canvas.getContext('2d');
        this.draggables = elements.map(function (element, i) {
          var angle = _this.options.angle + i * _this.options.dAngle;
          var halfSize = Point.elementSize(element).mult(0.5);
          var start = getPointFromRadialSystem(angle, _this.options.startRadius, _this.options.center).sub(halfSize);
          var end = getPointFromRadialSystem(angle, _this.options.endRadius, _this.options.center).sub(halfSize);
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
            func.apply.apply(func, _toConsumableArray$1(args));
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
    _inherits$1(ArcSlider, _EventEmitter);
    var _super = _createSuper$1(ArcSlider);
    function ArcSlider(area, element) {
      var _this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      _classCallCheck$1(this, ArcSlider);
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
    _createClass$1(ArcSlider, [{
      key: "init",
      value: function init(element) {
        var _this2 = this;
        var angle = this.options.startAngle;
        var position = getPointFromRadialSystem(angle, this.options.radius, this.shiftedCenter);
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
        this.angle = getAngle(this.shiftedCenter, this.draggable.position);
      }
    }, {
      key: "change",
      value: function change() {
        this.updateAngle();
        //      var angle = Geometry.getNearestAngle(this.options.angles, this.angle);
        //      this.setAngle(angle,this.options.time);
        this.emit('arcslider:change', {
          angle: this.angle
        });
      }
    }, {
      key: "setAngle",
      value: function setAngle(angle, time) {
        var position = getPointFromRadialSystem(this.angle, this.options.radius, this.shiftedCenter);
        this.angle = normalizeAngle(angle);
        this.draggable.pinPosition(position, time || 0);
        this.emit('arcslider:change', this.angle);
      }
    }]);
    return ArcSlider;
  }(EventEmitter);

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
    _inherits$1(Chart, _EventEmitter);
    var _super = _createSuper$1(Chart);
    function Chart(area, elements) {
      var _this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      _classCallCheck$1(this, Chart);
      _this = _super.call(this, options);
      var areaRectangle = Rectangle.fromElement(area, area);
      _this.options = Object.assign({
        center: areaRectangle.getCenter(),
        radius: areaRectangle.getMinSide() / 2,
        touchRadius: areaRectangle.getMinSide() / 2,
        boundAngle: Math.PI / 9,
        fillStyles: range(0, elements.length).map(function () {
          return randomColor();
        }),
        initAngles: range(-90, 270, 360 / elements.length).map(function (angle) {
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
    _createClass$1(Chart, [{
      key: "init",
      value: function init(elements) {
        var _this2 = this;
        this.canvas = createCanvas(this.area, this.areaRectangle);
        this.context = this.canvas.getContext('2d');
        this.draggables = elements.map(function (element, i) {
          var angle = _this2.options.initAngles[i];
          var halfSize = Point.elementSize(element).mult(0.5);
          var position = getPointFromRadialSystem(angle, _this2.options.touchRadius, _this2.options.center.sub(halfSize));
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
          return getAngle(_this3.options.center.sub(halfSize), draggable.position);
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
          return normalizeAngle(_this4.angles[i] - sign * _this4.options.boundAngle);
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
          var angle = normalizeAngle(this.angles[index]);
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
          var diffAngle = normalizeAngle(angle - baseAngle);
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
          return normalizeAngle(_this7.angles[i] + diffAngle / 2);
        });
      }
    }, {
      key: "getArcOnPoint",
      value: function getArcOnPoint(point) {
        var angle = getAngle(this.options.center, point);
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
          var position = getPointFromRadialSystem(angle, _this8.options.touchRadius, _this8.options.center.sub(halfSize));
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
  }(EventEmitter);

  exports.ArcSlider = ArcSlider;
  exports.Chart = Chart;
  exports.Spider = Spider;

  return exports;

})({});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZGV2LmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvY3JlYXRlLWNhbnZhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9kcmFnZWUvZGlzdC9pbmRleC5lc20uanMiLCIuLi9zcmMvZ2VvbWV0cnkvYW5nbGVzLmpzIiwiLi4vc3JjL3NwaWRlci5qcyIsIi4uL3NyYy9FdmVudEVtaXR0ZXIuanMiLCIuLi9zcmMvYXJjc2xpZGVyLmpzIiwiLi4vc3JjL3V0aWxzL3JhbmdlLmpzIiwiLi4vc3JjL2NoYXJ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gIHN0eWxlID0gc3R5bGUgfHwge31cbiAgbGV0IGNzc1RleHQgPSAnJ1xuICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZSkge1xuICAgIGlmIChzdHlsZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjc3NUZXh0ICs9IGtleSArICc6ICcgKyBzdHlsZVtrZXldICsgJzsgJ1xuICAgIH1cbiAgfVxuXG4gIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGNzc1RleHRcbn1cblxuZnVuY3Rpb24gYXBwZW5kRmlyc3RDaGlsZChlbGVtZW50LCBub2RlKSB7XG4gIGlmIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50Lmluc2VydEJlZm9yZShub2RlLCBlbGVtZW50LmZpcnN0Q2hpbGQpXG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChub2RlKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyhhcmVhLCByZWN0YWdsZSkge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUoYXJlYSkucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgYXJlYS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgfVxuXG4gIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgcmVjdGFnbGUuc2l6ZS54ICsgJ3B4JylcbiAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgcmVjdGFnbGUuc2l6ZS55ICsgJ3B4JylcbiAgc2V0U3R5bGUoY2FudmFzLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgbGVmdDogcmVjdGFnbGUucG9zaXRpb24ueSArICdweCcsXG4gICAgdG9wOiByZWN0YWdsZS5wb3NpdGlvbi55ICsgJ3B4JyxcbiAgICB3aWR0aDogcmVjdGFnbGUuc2l6ZS54ICsgJ3B4JyxcbiAgICBoZWlnaHQ6IHJlY3RhZ2xlLnNpemUueSArICdweCdcbiAgfSlcbiAgYXBwZW5kRmlyc3RDaGlsZChhcmVhLCBjYW52YXMpXG4gIHJldHVybiBjYW52YXNcbn1cbiIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdWJDbGFzcywgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTtcbiAgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTtcblxuICB0cnkge1xuICAgIEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLCBbXSwgZnVuY3Rpb24gKCkge30pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgaWYgKF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkge1xuICAgIF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdDtcbiAgfSBlbHNlIHtcbiAgICBfY29uc3RydWN0ID0gZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gICAgICB2YXIgYSA9IFtudWxsXTtcbiAgICAgIGEucHVzaC5hcHBseShhLCBhcmdzKTtcbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoUGFyZW50LCBhKTtcbiAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgICAgaWYgKENsYXNzKSBfc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH0gZWxzZSBpZiAoY2FsbCAhPT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7XG4gIHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpO1xuXG4gIHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHtcbiAgICB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksXG4gICAgICAgIHJlc3VsdDtcblxuICAgIGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7XG4gICAgICB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yO1xuXG4gICAgICByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBfc3VwZXJQcm9wQmFzZShvYmplY3QsIHByb3BlcnR5KSB7XG4gIHdoaWxlICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgb2JqZWN0ID0gX2dldFByb3RvdHlwZU9mKG9iamVjdCk7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBfZ2V0KCkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgIT09IFwidW5kZWZpbmVkXCIgJiYgUmVmbGVjdC5nZXQpIHtcbiAgICBfZ2V0ID0gUmVmbGVjdC5nZXQ7XG4gIH0gZWxzZSB7XG4gICAgX2dldCA9IGZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgIHZhciBiYXNlID0gX3N1cGVyUHJvcEJhc2UodGFyZ2V0LCBwcm9wZXJ0eSk7XG5cbiAgICAgIGlmICghYmFzZSkgcmV0dXJuO1xuICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIHByb3BlcnR5KTtcblxuICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgIHJldHVybiBkZXNjLmdldC5jYWxsKGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdGFyZ2V0IDogcmVjZWl2ZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF9nZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmIChfaSA9PSBudWxsKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuXG4gIHZhciBfcywgX2U7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKG8sIGFsbG93QXJyYXlMaWtlKSB7XG4gIHZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdIHx8IG9bXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmICghaXQpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgICBpZiAoaXQpIG8gPSBpdDtcbiAgICAgIHZhciBpID0gMDtcblxuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgczogRixcbiAgICAgICAgbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4ge1xuICAgICAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IG9baSsrXVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfSxcbiAgICAgICAgZjogRlxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG4gIH1cblxuICB2YXIgbm9ybWFsQ29tcGxldGlvbiA9IHRydWUsXG4gICAgICBkaWRFcnIgPSBmYWxzZSxcbiAgICAgIGVycjtcbiAgcmV0dXJuIHtcbiAgICBzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpdCA9IGl0LmNhbGwobyk7XG4gICAgfSxcbiAgICBuOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcCA9IGl0Lm5leHQoKTtcbiAgICAgIG5vcm1hbENvbXBsZXRpb24gPSBzdGVwLmRvbmU7XG4gICAgICByZXR1cm4gc3RlcDtcbiAgICB9LFxuICAgIGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBkaWRFcnIgPSB0cnVlO1xuICAgICAgZXJyID0gZTtcbiAgICB9LFxuICAgIGY6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghbm9ybWFsQ29tcGxldGlvbiAmJiBpdC5yZXR1cm4gIT0gbnVsbCkgaXQucmV0dXJuKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoZGlkRXJyKSB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG4vKiogQ2xhc3MgcmVwcmVzZW50aW5nIGEgcG9pbnQuICovXG52YXIgUG9pbnQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvKipcbiAgKiBDcmVhdGUgYSBwb2ludC5cbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4IHZhbHVlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHkgdmFsdWUuXG4gICovXG4gIGZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUG9pbnQpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFBvaW50LCBbe1xuICAgIGtleTogXCJhZGRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkKHApIHtcbiAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54ICsgcC54LCB0aGlzLnkgKyBwLnkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdWJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3ViKHApIHtcbiAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54IC0gcC54LCB0aGlzLnkgLSBwLnkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJtdWx0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG11bHQoaykge1xuICAgICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKiBrLCB0aGlzLnkgKiBrKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibmVnYXRpdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbmVnYXRpdmUoKSB7XG4gICAgICByZXR1cm4gbmV3IFBvaW50KC10aGlzLngsIC10aGlzLnkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wYXJlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBhcmUocCkge1xuICAgICAgcmV0dXJuIHRoaXMueCA9PT0gcC54ICYmIHRoaXMueSA9PT0gcC55O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbG9uZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0b1N0cmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiBcInt4PVwiLmNvbmNhdCh0aGlzLngsIFwiLHk9XCIpLmNvbmNhdCh0aGlzLnkpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcImVsZW1lbnRPZmZzZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZWxlbWVudE9mZnNldChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICAgIHBhcmVudCA9IHBhcmVudCB8fCBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB2YXIgZWxlbWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIHBhcmVudFJlY3QgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICByZXR1cm4gbmV3IFBvaW50KGVsZW1lbnRSZWN0LmxlZnQgLSBwYXJlbnRSZWN0LmxlZnQsIGVsZW1lbnRSZWN0LnRvcCAtIHBhcmVudFJlY3QudG9wKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZWxlbWVudFNpemVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZWxlbWVudFNpemUoZWxlbWVudCkge1xuICAgICAgdmFyIGVsZW1lbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHJldHVybiBuZXcgUG9pbnQoZWxlbWVudFJlY3Qud2lkdGgsIGVsZW1lbnRSZWN0LmhlaWdodCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBvaW50O1xufSgpO1xuXG52YXIgUmVjdGFuZ2xlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUmVjdGFuZ2xlKHBvc2l0aW9uLCBzaXplKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlY3RhbmdsZSk7XG5cbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhSZWN0YW5nbGUsIFt7XG4gICAga2V5OiBcImdldFAxXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFAxKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFAyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFAyKCkge1xuICAgICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UDNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UDMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy5zaXplKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UDRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UDQoKSB7XG4gICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDZW50ZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VudGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24uYWRkKHRoaXMuc2l6ZS5tdWx0KDAuNSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvcihyZWN0KSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBuZXcgUG9pbnQoTWF0aC5taW4odGhpcy5wb3NpdGlvbi54LCByZWN0LnBvc2l0aW9uLngpLCBNYXRoLm1pbih0aGlzLnBvc2l0aW9uLnksIHJlY3QucG9zaXRpb24ueSkpO1xuICAgICAgdmFyIHNpemUgPSBuZXcgUG9pbnQoTWF0aC5tYXgodGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLngsIHJlY3QucG9zaXRpb24ueCArIHJlY3Quc2l6ZS54KSwgTWF0aC5tYXgodGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnksIHJlY3QucG9zaXRpb24ueSArIHJlY3Quc2l6ZS55KSkuc3ViKHBvc2l0aW9uKTtcbiAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHBvc2l0aW9uLCBzaXplKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFuZChyZWN0KSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBuZXcgUG9pbnQoTWF0aC5tYXgodGhpcy5wb3NpdGlvbi54LCByZWN0LnBvc2l0aW9uLngpLCBNYXRoLm1heCh0aGlzLnBvc2l0aW9uLnksIHJlY3QucG9zaXRpb24ueSkpO1xuICAgICAgdmFyIHNpemUgPSBuZXcgUG9pbnQoTWF0aC5taW4odGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLngsIHJlY3QucG9zaXRpb24ueCArIHJlY3Quc2l6ZS54KSwgTWF0aC5taW4odGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnksIHJlY3QucG9zaXRpb24ueSArIHJlY3Quc2l6ZS55KSkuc3ViKHBvc2l0aW9uKTtcblxuICAgICAgaWYgKHNpemUueCA8PSAwIHx8IHNpemUueSA8PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShwb3NpdGlvbiwgc2l6ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluY2x1ZGVQb2ludFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmNsdWRlUG9pbnQocCkge1xuICAgICAgcmV0dXJuICEodGhpcy5wb3NpdGlvbi54ID4gcC54IHx8IHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS54IDwgcC54IHx8IHRoaXMucG9zaXRpb24ueSA+IHAueSB8fCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUueSA8IHAueSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluY2x1ZGVSZWN0YW5nbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5jbHVkZVJlY3RhbmdsZShyZWN0YW5nbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmluY2x1ZGVQb2ludChyZWN0YW5nbGUucG9zaXRpb24pICYmIHRoaXMuaW5jbHVkZVBvaW50KHJlY3RhbmdsZS5nZXRQMygpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibW92ZVRvQm91bmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZVRvQm91bmQocmVjdCwgYXhpcykge1xuICAgICAgdmFyIHNlbEF4aXMsIGNyb3NzUmVjdGFuZ2xlO1xuXG4gICAgICBpZiAoYXhpcykge1xuICAgICAgICBzZWxBeGlzID0gYXhpcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyb3NzUmVjdGFuZ2xlID0gdGhpcy5hbmQocmVjdCk7XG5cbiAgICAgICAgaWYgKCFjcm9zc1JlY3RhbmdsZSkge1xuICAgICAgICAgIHJldHVybiByZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsQXhpcyA9IGNyb3NzUmVjdGFuZ2xlLnNpemUueCA+IGNyb3NzUmVjdGFuZ2xlLnNpemUueSA/ICd5JyA6ICd4JztcbiAgICAgIH1cblxuICAgICAgdmFyIHRoaXNDZW50ZXIgPSB0aGlzLmdldENlbnRlcigpO1xuICAgICAgdmFyIHJlY3RDZW50ZXIgPSByZWN0LmdldENlbnRlcigpO1xuICAgICAgdmFyIHNpZ24gPSB0aGlzQ2VudGVyW3NlbEF4aXNdID4gcmVjdENlbnRlcltzZWxBeGlzXSA/IC0xIDogMTtcbiAgICAgIHZhciBvZmZzZXQgPSBzaWduID4gMCA/IHRoaXMucG9zaXRpb25bc2VsQXhpc10gKyB0aGlzLnNpemVbc2VsQXhpc10gLSByZWN0LnBvc2l0aW9uW3NlbEF4aXNdIDogdGhpcy5wb3NpdGlvbltzZWxBeGlzXSAtIChyZWN0LnBvc2l0aW9uW3NlbEF4aXNdICsgcmVjdC5zaXplW3NlbEF4aXNdKTtcbiAgICAgIHJlY3QucG9zaXRpb25bc2VsQXhpc10gPSByZWN0LnBvc2l0aW9uW3NlbEF4aXNdICsgb2Zmc2V0O1xuICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFNxdWFyZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTcXVhcmUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaXplLnggKiB0aGlzLnNpemUueTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3R5bGVBcHBseVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdHlsZUFwcGx5KGVsKSB7XG4gICAgICBlbCA9IGVsIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2luZCcpO1xuICAgICAgZWwuc3R5bGUubGVmdCA9IHRoaXMucG9zaXRpb24ueCArICdweCc7XG4gICAgICBlbC5zdHlsZS50b3AgPSB0aGlzLnBvc2l0aW9uLnkgKyAncHgnO1xuICAgICAgZWwuc3R5bGUud2lkdGggPSB0aGlzLnNpemUueCArICdweCc7XG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSB0aGlzLnNpemUueSArICdweCc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3d0aFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm93dGgoc2l6ZSkge1xuICAgICAgdGhpcy5zaXplID0gdGhpcy5zaXplLmFkZChzaXplKTtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZChzaXplLm11bHQoLTAuNSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRNaW5TaWRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldE1pblNpZGUoKSB7XG4gICAgICByZXR1cm4gTWF0aC5taW4odGhpcy5zaXplLngsIHRoaXMuc2l6ZS55KTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJmcm9tRWxlbWVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICB2YXIgcGFyZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB2YXIgaXNDb25zaWRlclRyYW5zbGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICB2YXIgcG9zaXRpb24gPSBQb2ludC5lbGVtZW50T2Zmc2V0KGVsZW1lbnQsIHBhcmVudCwgaXNDb25zaWRlclRyYW5zbGF0ZSk7XG4gICAgICB2YXIgc2l6ZSA9IFBvaW50LmVsZW1lbnRTaXplKGVsZW1lbnQpO1xuICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUocG9zaXRpb24sIHNpemUpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBSZWN0YW5nbGU7XG59KCk7XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRDb250YWluZXIoZWxlbWVudCkge1xuICB2YXIgY29udGFpbmVyID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXG4gIHdoaWxlIChjb250YWluZXIucGFyZW50Tm9kZSAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpWydwb3NpdGlvbiddID09PSAnc3RhdGljJyAmJiBjb250YWluZXIudGFnTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgY29udGFpbmVyID0gY29udGFpbmVyLnBhcmVudE5vZGU7XG4gIH1cblxuICByZXR1cm4gY29udGFpbmVyO1xufVxuXG52YXIgRXZlbnRFbWl0dGVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFdmVudEVtaXR0ZXIpO1xuXG4gICAgdGhpcy5ldmVudHMgPSB7fTtcblxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMub24pIHtcbiAgICAgIGZvciAodmFyIF9pID0gMCwgX09iamVjdCRlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMob3B0aW9ucy5vbik7IF9pIDwgX09iamVjdCRlbnRyaWVzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgX09iamVjdCRlbnRyaWVzJF9pID0gX3NsaWNlZFRvQXJyYXkoX09iamVjdCRlbnRyaWVzW19pXSwgMiksXG4gICAgICAgICAgICBldmVudE5hbWUgPSBfT2JqZWN0JGVudHJpZXMkX2lbMF0sXG4gICAgICAgICAgICBmbiA9IF9PYmplY3QkZW50cmllcyRfaVsxXTtcblxuICAgICAgICB0aGlzLm9uKGV2ZW50TmFtZSwgZm4pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhFdmVudEVtaXR0ZXIsIFt7XG4gICAga2V5OiBcImVtaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW1pdChldmVudE5hbWUpIHtcbiAgICAgIHRoaXMuaW50ZXJydXB0ZWQgPSBmYWxzZTtcbiAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudE5hbWVdKSByZXR1cm47XG5cbiAgICAgIHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcih0aGlzLmV2ZW50c1tldmVudE5hbWVdKSxcbiAgICAgICAgICBfc3RlcDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICB2YXIgZnVuYyA9IF9zdGVwLnZhbHVlO1xuICAgICAgICAgIGZ1bmMuYXBwbHkodm9pZCAwLCBfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuaW50ZXJydXB0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfaXRlcmF0b3IuZShlcnIpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgX2l0ZXJhdG9yLmYoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW50ZXJydXB0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGludGVycnVwdCgpIHtcbiAgICAgIHRoaXMuaW50ZXJydXB0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwcmVwZW5kT25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJlcGVuZE9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0udW5zaGlmdChmbik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVuc3Vic2NyaWJlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uaW5kZXhPZihmbik7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVzZXRFbWl0dGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2V0RW1pdHRlcigpIHtcbiAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlc2V0T25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzZXRPbihldmVudE5hbWUpIHtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRXZlbnRFbWl0dGVyO1xufSgpO1xuXG5mdW5jdGlvbiBjcmVhdGVDb21tb25qc01vZHVsZShmbiwgbW9kdWxlKSB7XG5cdHJldHVybiBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH0sIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0cztcbn1cblxudmFyIGdldFN0eWxlUHJvcGVydHkgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlLCBleHBvcnRzKSB7XG4vKiFcbiAqIGdldFN0eWxlUHJvcGVydHkgdjEuMC40XG4gKiBvcmlnaW5hbCBieSBrYW5nYXhcbiAqIGh0dHA6Ly9wZXJmZWN0aW9ua2lsbHMuY29tL2ZlYXR1cmUtdGVzdGluZy1jc3MtcHJvcGVydGllcy9cbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSAqL1xuLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgZXhwb3J0czogZmFsc2UsIG1vZHVsZTogZmFsc2UgKi9cblxuKCBmdW5jdGlvbiggd2luZG93ICkge1xuXG52YXIgcHJlZml4ZXMgPSAnV2Via2l0IE1veiBtcyBNcyBPJy5zcGxpdCgnICcpO1xudmFyIGRvY0VsZW1TdHlsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblxuZnVuY3Rpb24gZ2V0U3R5bGVQcm9wZXJ0eSggcHJvcE5hbWUgKSB7XG4gIGlmICggIXByb3BOYW1lICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHRlc3Qgc3RhbmRhcmQgcHJvcGVydHkgZmlyc3RcbiAgaWYgKCB0eXBlb2YgZG9jRWxlbVN0eWxlWyBwcm9wTmFtZSBdID09PSAnc3RyaW5nJyApIHtcbiAgICByZXR1cm4gcHJvcE5hbWU7XG4gIH1cblxuICAvLyBjYXBpdGFsaXplXG4gIHByb3BOYW1lID0gcHJvcE5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wTmFtZS5zbGljZSgxKTtcblxuICAvLyB0ZXN0IHZlbmRvciBzcGVjaWZpYyBwcm9wZXJ0aWVzXG4gIHZhciBwcmVmaXhlZDtcbiAgZm9yICggdmFyIGk9MCwgbGVuID0gcHJlZml4ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgcHJlZml4ZWQgPSBwcmVmaXhlc1tpXSArIHByb3BOYW1lO1xuICAgIGlmICggdHlwZW9mIGRvY0VsZW1TdHlsZVsgcHJlZml4ZWQgXSA9PT0gJ3N0cmluZycgKSB7XG4gICAgICByZXR1cm4gcHJlZml4ZWQ7XG4gICAgfVxuICB9XG59XG5cbi8vIHRyYW5zcG9ydFxue1xuICAvLyBDb21tb25KUyBmb3IgQ29tcG9uZW50XG4gIG1vZHVsZS5leHBvcnRzID0gZ2V0U3R5bGVQcm9wZXJ0eTtcbn1cblxufSkoKTtcbn0pO1xuXG5mdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIpIHtcbiAgdmFyIGR4ID0gcDEueCAtIHAyLngsXG4gICAgICBkeSA9IHAxLnkgLSBwMi55O1xuICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbn1cbmZ1bmN0aW9uIGdldFhEaWZmZXJlbmNlKHAxLCBwMikge1xuICByZXR1cm4gTWF0aC5hYnMocDEueCAtIHAyLngpO1xufVxuZnVuY3Rpb24gZ2V0WURpZmZlcmVuY2UocDEsIHAyKSB7XG4gIHJldHVybiBNYXRoLmFicyhwMS55IC0gcDIueSk7XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1lZFNwYWNlRGlzdGFuY2VGYWN0b3J5KG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChwMSwgcDIpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KG9wdGlvbnMueCAqIE1hdGguYWJzKHAxLnggLSBwMi54KSwgMikgKyBNYXRoLnBvdyhvcHRpb25zLnkgKiBNYXRoLmFicyhwMS55IC0gcDIueSksIDIpKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGluZGV4T2ZOZWFyZXN0UG9pbnQoYXJyLCB2YWwsIHJhZGl1cykge1xuICB2YXIgZ2V0RGlzdGFuY2VGdW5jID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBnZXREaXN0YW5jZTtcbiAgdmFyIHNpemUsXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBpLFxuICAgICAgdGVtcDtcblxuICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHNpemUgPSBnZXREaXN0YW5jZUZ1bmMoYXJyWzBdLCB2YWwpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICB0ZW1wID0gZ2V0RGlzdGFuY2VGdW5jKGFycltpXSwgdmFsKTtcblxuICAgIGlmICh0ZW1wIDwgc2l6ZSkge1xuICAgICAgc2l6ZSA9IHRlbXA7XG4gICAgICBpbmRleCA9IGk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJhZGl1cyA+PSAwICYmIHNpemUgPiByYWRpdXMpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGRpcmVjdENyb3NzaW5nKEwxUDEsIEwxUDIsIEwyUDEsIEwyUDIpIHtcbiAgdmFyIHRlbXAsIGsxLCBrMiwgYjEsIGIyLCB4LCB5O1xuXG4gIGlmIChMMlAxLnggPT09IEwyUDIueCkge1xuICAgIHRlbXAgPSBMMlAxO1xuICAgIEwyUDEgPSBMMVAxO1xuICAgIEwxUDEgPSB0ZW1wO1xuICAgIHRlbXAgPSBMMlAyO1xuICAgIEwyUDIgPSBMMVAyO1xuICAgIEwxUDIgPSB0ZW1wO1xuICB9XG5cbiAgaWYgKEwxUDEueCA9PT0gTDFQMi54KSB7XG4gICAgazIgPSAoTDJQMi55IC0gTDJQMS55KSAvIChMMlAyLnggLSBMMlAxLngpO1xuICAgIGIyID0gKEwyUDIueCAqIEwyUDEueSAtIEwyUDEueCAqIEwyUDIueSkgLyAoTDJQMi54IC0gTDJQMS54KTtcbiAgICB4ID0gTDFQMS54O1xuICAgIHkgPSB4ICogazIgKyBiMjtcbiAgICByZXR1cm4gbmV3IFBvaW50KHgsIHkpO1xuICB9IGVsc2Uge1xuICAgIGsxID0gKEwxUDIueSAtIEwxUDEueSkgLyAoTDFQMi54IC0gTDFQMS54KTtcbiAgICBiMSA9IChMMVAyLnggKiBMMVAxLnkgLSBMMVAxLnggKiBMMVAyLnkpIC8gKEwxUDIueCAtIEwxUDEueCk7XG4gICAgazIgPSAoTDJQMi55IC0gTDJQMS55KSAvIChMMlAyLnggLSBMMlAxLngpO1xuICAgIGIyID0gKEwyUDIueCAqIEwyUDEueSAtIEwyUDEueCAqIEwyUDIueSkgLyAoTDJQMi54IC0gTDJQMS54KTtcbiAgICB4ID0gKGIxIC0gYjIpIC8gKGsyIC0gazEpO1xuICAgIHkgPSB4ICogazEgKyBiMTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHgsIHkpO1xuICB9XG59XG5mdW5jdGlvbiBib3VuZFRvTGluZShBLCBCLCBQKSB7XG4gIHZhciBBUCA9IG5ldyBQb2ludChQLnggLSBBLngsIFAueSAtIEEueSksXG4gICAgICBBQiA9IG5ldyBQb2ludChCLnggLSBBLngsIEIueSAtIEEueSksXG4gICAgICBhYjIgPSBBQi54ICogQUIueCArIEFCLnkgKiBBQi55LFxuICAgICAgYXBfYWIgPSBBUC54ICogQUIueCArIEFQLnkgKiBBQi55LFxuICAgICAgdCA9IGFwX2FiIC8gYWIyO1xuICByZXR1cm4gbmV3IFBvaW50KEEueCArIEFCLnggKiB0LCBBLnkgKyBBQi55ICogdCk7XG59XG5mdW5jdGlvbiBnZXRQb2ludE9uTGluZUJ5TGVuZ2h0KExQMSwgTFAyLCBsZW5naHQpIHtcbiAgdmFyIGR4ID0gTFAyLnggLSBMUDEueDtcbiAgdmFyIGR5ID0gTFAyLnkgLSBMUDEueTtcbiAgdmFyIHBlcmNlbnQgPSBsZW5naHQgLyBnZXREaXN0YW5jZShMUDEsIExQMik7XG4gIHJldHVybiBuZXcgUG9pbnQoTFAxLnggKyBwZXJjZW50ICogZHgsIExQMS55ICsgcGVyY2VudCAqIGR5KTtcbn1cbmZ1bmN0aW9uIGFkZFBvaW50VG9Cb3VuZFBvaW50cyhib3VuZHBvaW50cywgcG9pbnQsIGlzUmlnaHQpIHtcbiAgdmFyIHJlc3VsdCA9IGJvdW5kcG9pbnRzLmZpbHRlcihmdW5jdGlvbiAoYlBvaW50KSB7XG4gICAgcmV0dXJuIGJQb2ludC55ID4gcG9pbnQueSB8fCAoaXNSaWdodCA/IGJQb2ludC54IDwgcG9pbnQueCA6IGJQb2ludC54ID4gcG9pbnQueCk7XG4gIH0pO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHBvaW50LnkgPCByZXN1bHRbaV0ueSkge1xuICAgICAgcmVzdWx0LnNwbGljZShpLCAwLCBwb2ludCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIHJlc3VsdC5wdXNoKHBvaW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2V0QW5nbGVEaWZmKGFscGhhLCBiZXRhKSB7XG4gIHZhciBtaW5BbmdsZSA9IE1hdGgubWluKGFscGhhLCBiZXRhKTtcbiAgdmFyIG1heEFuZ2xlID0gTWF0aC5tYXgoYWxwaGEsIGJldGEpO1xuICByZXR1cm4gTWF0aC5taW4obWF4QW5nbGUgLSBtaW5BbmdsZSwgbWluQW5nbGUgKyBNYXRoLlBJICogMiAtIG1heEFuZ2xlKTtcbn1cbmZ1bmN0aW9uIGdldEFuZ2xlKHAxLCBwMikge1xuICB2YXIgZGlmZiA9IHAyLnN1YihwMSk7XG4gIHJldHVybiBub3JtYWxpemVBbmdsZShNYXRoLmF0YW4yKGRpZmYueSwgZGlmZi54KSk7XG59XG5mdW5jdGlvbiBib3VuZEFuZ2xlKG1pbiwgbWF4LCB2YWwpIHtcbiAgdmFyIGRtaW4sIGRtYXg7XG5cbiAgaWYgKG1pbiA8IG1heCAmJiB2YWwgPiBtaW4gJiYgdmFsIDwgbWF4KSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfSBlbHNlIGlmIChtYXggPCBtaW4gJiYgKHZhbCA8IG1heCB8fCB2YWwgPiBtaW4pKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfSBlbHNlIHtcbiAgICBkbWluID0gZ2V0QW5nbGVEaWZmKG1pbiwgdmFsKTtcbiAgICBkbWF4ID0gZ2V0QW5nbGVEaWZmKG1heCwgdmFsKTtcblxuICAgIGlmIChkbWluIDwgZG1heCkge1xuICAgICAgcmV0dXJuIG1pbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1heDtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUFuZ2xlKHZhbCkge1xuICB3aGlsZSAodmFsIDwgMCkge1xuICAgIHZhbCArPSAyICogTWF0aC5QSTtcbiAgfVxuXG4gIHdoaWxlICh2YWwgPiAyICogTWF0aC5QSSkge1xuICAgIHZhbCAtPSAyICogTWF0aC5QSTtcbiAgfVxuXG4gIHJldHVybiB2YWw7XG59XG5mdW5jdGlvbiBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oYW5nbGUsIGxlbmd0aCwgY2VudGVyKSB7XG4gIGNlbnRlciA9IGNlbnRlciB8fCBuZXcgUG9pbnQoMCwgMCk7XG4gIHJldHVybiBjZW50ZXIuYWRkKG5ldyBQb2ludChsZW5ndGggKiBNYXRoLmNvcyhhbmdsZSksIGxlbmd0aCAqIE1hdGguc2luKGFuZ2xlKSkpO1xufVxuXG52YXIgQm91bmQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCb3VuZCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQm91bmQpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJvdW5kLCBbe1xuICAgIGtleTogXCJib3VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib3VuZChwb2ludCwgX3NpemUpIHtcbiAgICAgIHJldHVybiBwb2ludDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVmcmVzaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWZyZXNoKCkge31cbiAgfV0sIFt7XG4gICAga2V5OiBcImJvdW5kaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJvdW5kaW5nKCkge1xuICAgICAgdmFyIGluc3RhbmNlID0gX2NvbnN0cnVjdCh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcblxuICAgICAgcmV0dXJuIGluc3RhbmNlLmJvdW5kLmJpbmQoaW5zdGFuY2UpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCb3VuZDtcbn0oKTtcbnZhciBCb3VuZFRvUmVjdGFuZ2xlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQm91bmQpIHtcbiAgX2luaGVyaXRzKEJvdW5kVG9SZWN0YW5nbGUsIF9Cb3VuZCk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihCb3VuZFRvUmVjdGFuZ2xlKTtcblxuICBmdW5jdGlvbiBCb3VuZFRvUmVjdGFuZ2xlKHJlY3RhbmdsZSkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZFRvUmVjdGFuZ2xlKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgX3RoaXMucmVjdGFuZ2xlID0gcmVjdGFuZ2xlO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCb3VuZFRvUmVjdGFuZ2xlLCBbe1xuICAgIGtleTogXCJib3VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib3VuZChwb2ludCwgc2l6ZSkge1xuICAgICAgdmFyIGNhbGNQb2ludCA9IHBvaW50LmNsb25lKCk7XG4gICAgICB2YXIgcmVjdFAyID0gdGhpcy5yZWN0YW5nbGUuZ2V0UDMoKTtcblxuICAgICAgaWYgKHRoaXMucmVjdGFuZ2xlLnBvc2l0aW9uLnggPiBjYWxjUG9pbnQueCkge1xuICAgICAgICBjYWxjUG9pbnQueCA9IHRoaXMucmVjdGFuZ2xlLnBvc2l0aW9uLng7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnJlY3RhbmdsZS5wb3NpdGlvbi55ID4gY2FsY1BvaW50LnkpIHtcbiAgICAgICAgY2FsY1BvaW50LnkgPSB0aGlzLnJlY3RhbmdsZS5wb3NpdGlvbi55O1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjdFAyLnggPCBjYWxjUG9pbnQueCArIHNpemUueCkge1xuICAgICAgICBjYWxjUG9pbnQueCA9IHJlY3RQMi54IC0gc2l6ZS54O1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjdFAyLnkgPCBjYWxjUG9pbnQueSArIHNpemUueSkge1xuICAgICAgICBjYWxjUG9pbnQueSA9IHJlY3RQMi55IC0gc2l6ZS55O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FsY1BvaW50O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCb3VuZFRvUmVjdGFuZ2xlO1xufShCb3VuZCk7XG52YXIgQm91bmRUb0VsZW1lbnQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Cb3VuZFRvUmVjdGFuZ2xlKSB7XG4gIF9pbmhlcml0cyhCb3VuZFRvRWxlbWVudCwgX0JvdW5kVG9SZWN0YW5nbGUpO1xuXG4gIHZhciBfc3VwZXIyID0gX2NyZWF0ZVN1cGVyKEJvdW5kVG9FbGVtZW50KTtcblxuICBmdW5jdGlvbiBCb3VuZFRvRWxlbWVudChlbGVtZW50LCBjb250YWluZXIpIHtcbiAgICB2YXIgX3RoaXMyO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJvdW5kVG9FbGVtZW50KTtcblxuICAgIF90aGlzMiA9IF9zdXBlcjIuY2FsbCh0aGlzLCBSZWN0YW5nbGUuZnJvbUVsZW1lbnQoZWxlbWVudCwgY29udGFpbmVyKSk7XG4gICAgX3RoaXMyLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIF90aGlzMi5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCb3VuZFRvRWxlbWVudCwgW3tcbiAgICBrZXk6IFwicmVmcmVzaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgICAgdGhpcy5yZWN0YW5nbGUgPSBSZWN0YW5nbGUuZnJvbUVsZW1lbnQodGhpcy5lbGVtZW50LCB0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvdW5kVG9FbGVtZW50O1xufShCb3VuZFRvUmVjdGFuZ2xlKTtcbnZhciBCb3VuZFRvTGluZVggPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Cb3VuZDIpIHtcbiAgX2luaGVyaXRzKEJvdW5kVG9MaW5lWCwgX0JvdW5kMik7XG5cbiAgdmFyIF9zdXBlcjMgPSBfY3JlYXRlU3VwZXIoQm91bmRUb0xpbmVYKTtcblxuICBmdW5jdGlvbiBCb3VuZFRvTGluZVgoeCwgc3RhcnRZLCBlbmRZKSB7XG4gICAgdmFyIF90aGlzMztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZFRvTGluZVgpO1xuXG4gICAgX3RoaXMzID0gX3N1cGVyMy5jYWxsKHRoaXMpO1xuICAgIF90aGlzMy54ID0geDtcbiAgICBfdGhpczMuc3RhcnRZID0gc3RhcnRZO1xuICAgIF90aGlzMy5lbmRZID0gZW5kWTtcbiAgICByZXR1cm4gX3RoaXMzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJvdW5kVG9MaW5lWCwgW3tcbiAgICBrZXk6IFwiYm91bmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYm91bmQocG9pbnQsIHNpemUpIHtcbiAgICAgIHZhciBjYWxjUG9pbnQgPSBwb2ludC5jbG9uZSgpO1xuICAgICAgY2FsY1BvaW50LnggPSB0aGlzLng7XG5cbiAgICAgIGlmICh0aGlzLnN0YXJ0WSA+IGNhbGNQb2ludC55KSB7XG4gICAgICAgIGNhbGNQb2ludC55ID0gdGhpcy5zdGFydFk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmVuZFkgPCBjYWxjUG9pbnQueSArIHNpemUueSkge1xuICAgICAgICBjYWxjUG9pbnQueSA9IHRoaXMuZW5kWSAtIHNpemUueTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbGNQb2ludDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQm91bmRUb0xpbmVYO1xufShCb3VuZCk7XG52YXIgQm91bmRUb0xpbmVZID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQm91bmQzKSB7XG4gIF9pbmhlcml0cyhCb3VuZFRvTGluZVksIF9Cb3VuZDMpO1xuXG4gIHZhciBfc3VwZXI0ID0gX2NyZWF0ZVN1cGVyKEJvdW5kVG9MaW5lWSk7XG5cbiAgZnVuY3Rpb24gQm91bmRUb0xpbmVZKHksIHN0YXJ0WCwgZW5kWCkge1xuICAgIHZhciBfdGhpczQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQm91bmRUb0xpbmVZKTtcblxuICAgIF90aGlzNCA9IF9zdXBlcjQuY2FsbCh0aGlzKTtcbiAgICBfdGhpczQueSA9IHk7XG4gICAgX3RoaXM0LnN0YXJ0WCA9IHN0YXJ0WDtcbiAgICBfdGhpczQuZW5kWCA9IGVuZFg7XG4gICAgcmV0dXJuIF90aGlzNDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCb3VuZFRvTGluZVksIFt7XG4gICAga2V5OiBcImJvdW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJvdW5kKHBvaW50LCBzaXplKSB7XG4gICAgICB2YXIgY2FsY1BvaW50ID0gcG9pbnQuY2xvbmUoKTtcbiAgICAgIGNhbGNQb2ludC55ID0gdGhpcy55O1xuXG4gICAgICBpZiAodGhpcy5zdGFydFggPiBjYWxjUG9pbnQueCkge1xuICAgICAgICBjYWxjUG9pbnQueCA9IHRoaXMuc3RhcnRYO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5lbmRYIDwgY2FsY1BvaW50LnggKyBzaXplLngpIHtcbiAgICAgICAgY2FsY1BvaW50LnggPSB0aGlzLmVuZFggLSBzaXplLng7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYWxjUG9pbnQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvdW5kVG9MaW5lWTtcbn0oQm91bmQpO1xudmFyIEJvdW5kVG9MaW5lID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQm91bmQ0KSB7XG4gIF9pbmhlcml0cyhCb3VuZFRvTGluZSwgX0JvdW5kNCk7XG5cbiAgdmFyIF9zdXBlcjUgPSBfY3JlYXRlU3VwZXIoQm91bmRUb0xpbmUpO1xuXG4gIGZ1bmN0aW9uIEJvdW5kVG9MaW5lKHN0YXJ0UG9pbnQsIGVuZFBvaW50KSB7XG4gICAgdmFyIF90aGlzNTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZFRvTGluZSk7XG5cbiAgICBfdGhpczUgPSBfc3VwZXI1LmNhbGwodGhpcyk7XG4gICAgX3RoaXM1LnN0YXJ0UG9pbnQgPSBzdGFydFBvaW50O1xuICAgIF90aGlzNS5lbmRQb2ludCA9IGVuZFBvaW50O1xuICAgIHZhciBhbHBoYSA9IE1hdGguYXRhbjIoZW5kUG9pbnQueSAtIHN0YXJ0UG9pbnQueSwgZW5kUG9pbnQueCAtIHN0YXJ0UG9pbnQueCk7XG4gICAgdmFyIGJldGEgPSBhbHBoYSArIE1hdGguUEkgLyAyO1xuICAgIF90aGlzNS5zb21lSyA9IDEwO1xuICAgIF90aGlzNS5jb3NCZXRhID0gTWF0aC5jb3MoYmV0YSk7XG4gICAgX3RoaXM1LnNpbkJldGEgPSBNYXRoLnNpbihiZXRhKTtcbiAgICByZXR1cm4gX3RoaXM1O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJvdW5kVG9MaW5lLCBbe1xuICAgIGtleTogXCJib3VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib3VuZChwb2ludCwgc2l6ZSkge1xuICAgICAgdmFyIHBvaW50MiA9IG5ldyBQb2ludChwb2ludC54ICsgdGhpcy5zb21lSyAqIHRoaXMuY29zQmV0YSwgcG9pbnQueSArIHRoaXMuc29tZUsgKiB0aGlzLnNpbkJldGEpO1xuICAgICAgdmFyIG5ld0VuZFBvaW50ID0gZ2V0UG9pbnRPbkxpbmVCeUxlbmdodCh0aGlzLmVuZFBvaW50LCB0aGlzLnN0YXJ0UG9pbnQsIHNpemUueCk7XG4gICAgICB2YXIgcG9pbnRDcm9zc2luZyA9IGRpcmVjdENyb3NzaW5nKHRoaXMuc3RhcnRQb2ludCwgdGhpcy5lbmRQb2ludCwgcG9pbnQsIHBvaW50Mik7XG4gICAgICByZXR1cm4gYm91bmRUb0xpbmUodGhpcy5zdGFydFBvaW50LCBuZXdFbmRQb2ludCwgcG9pbnRDcm9zc2luZyk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvdW5kVG9MaW5lO1xufShCb3VuZCk7XG52YXIgQm91bmRUb0NpcmNsZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0JvdW5kNSkge1xuICBfaW5oZXJpdHMoQm91bmRUb0NpcmNsZSwgX0JvdW5kNSk7XG5cbiAgdmFyIF9zdXBlcjYgPSBfY3JlYXRlU3VwZXIoQm91bmRUb0NpcmNsZSk7XG5cbiAgZnVuY3Rpb24gQm91bmRUb0NpcmNsZShjZW50ZXIsIHJhZGl1cykge1xuICAgIHZhciBfdGhpczY7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQm91bmRUb0NpcmNsZSk7XG5cbiAgICBfdGhpczYgPSBfc3VwZXI2LmNhbGwodGhpcyk7XG4gICAgX3RoaXM2LmNlbnRlciA9IGNlbnRlcjtcbiAgICBfdGhpczYucmFkaXVzID0gcmFkaXVzO1xuICAgIHJldHVybiBfdGhpczY7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm91bmRUb0NpcmNsZSwgW3tcbiAgICBrZXk6IFwiYm91bmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYm91bmQocG9pbnQsIF9zaXplKSB7XG4gICAgICByZXR1cm4gZ2V0UG9pbnRPbkxpbmVCeUxlbmdodCh0aGlzLmNlbnRlciwgcG9pbnQsIHRoaXMucmFkaXVzKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQm91bmRUb0NpcmNsZTtcbn0oQm91bmQpO1xudmFyIEJvdW5kVG9BcmMgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Cb3VuZFRvQ2lyY2xlKSB7XG4gIF9pbmhlcml0cyhCb3VuZFRvQXJjLCBfQm91bmRUb0NpcmNsZSk7XG5cbiAgdmFyIF9zdXBlcjcgPSBfY3JlYXRlU3VwZXIoQm91bmRUb0FyYyk7XG5cbiAgZnVuY3Rpb24gQm91bmRUb0FyYyhjZW50ZXIsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUpIHtcbiAgICB2YXIgX3RoaXM3O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJvdW5kVG9BcmMpO1xuXG4gICAgX3RoaXM3ID0gX3N1cGVyNy5jYWxsKHRoaXMsIGNlbnRlciwgcmFkaXVzKTtcbiAgICBfdGhpczcuX3N0YXJ0QW5nbGUgPSBzdGFydEFuZ2xlO1xuICAgIF90aGlzNy5fZW5kQW5nbGUgPSBlbmRBbmdsZTtcbiAgICByZXR1cm4gX3RoaXM3O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJvdW5kVG9BcmMsIFt7XG4gICAga2V5OiBcInN0YXJ0QW5nbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnRBbmdsZSgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5fc3RhcnRBbmdsZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuX3N0YXJ0QW5nbGUoKSA6IHRoaXMuX3N0YXJ0QW5nbGU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImVuZEFuZ2xlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuZEFuZ2xlKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9lbmRBbmdsZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuX2VuZEFuZ2xlKCkgOiB0aGlzLl9lbmRBbmdsZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYm91bmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYm91bmQocG9pbnQsIF9zaXplKSB7XG4gICAgICB2YXIgYW5nbGUgPSBnZXRBbmdsZSh0aGlzLmNlbnRlciwgcG9pbnQpO1xuICAgICAgYW5nbGUgPSBub3JtYWxpemVBbmdsZShhbmdsZSk7XG4gICAgICBhbmdsZSA9IGJvdW5kQW5nbGUodGhpcy5zdGFydEFuZ2xlKCksIHRoaXMuZW5kQW5nbGUoKSwgYW5nbGUpO1xuICAgICAgcmV0dXJuIGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShhbmdsZSwgdGhpcy5yYWRpdXMsIHRoaXMuY2VudGVyKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQm91bmRUb0FyYztcbn0oQm91bmRUb0NpcmNsZSk7XG5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0gKGFycmF5LCB2YWwpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJheVtpXSA9PT0gdmFsKSB7XG4gICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICBpLS07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiByYW5nZShzdGFydCwgc3RvcCwgc3RlcCkge1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgaWYgKHR5cGVvZiBzdG9wID09PSAndW5kZWZpbmVkJykge1xuICAgIHN0b3AgPSBzdGFydDtcbiAgICBzdGFydCA9IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIHN0ZXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgc3RlcCA9IDE7XG4gIH1cblxuICBpZiAoc3RlcCA+IDAgJiYgc3RhcnQgPj0gc3RvcCB8fCBzdGVwIDwgMCAmJiBzdGFydCA8PSBzdG9wKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBzdGVwID4gMCA/IGkgPCBzdG9wIDogaSA+IHN0b3A7IGkgKz0gc3RlcCkge1xuICAgIHJlc3VsdC5wdXNoKGkpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIEJhc2ljU3RyYXRlZ3kgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCYXNpY1N0cmF0ZWd5KHJlY3RhbmdsZSkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCYXNpY1N0cmF0ZWd5KTtcblxuICAgIHRoaXMucmVjdGFuZ2xlID0gcmVjdGFuZ2xlO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQmFzaWNTdHJhdGVneSwgW3tcbiAgICBrZXk6IFwiYm91bmRSZWN0XCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMucmVjdGFuZ2xlID09PSAnZnVuY3Rpb24nID8gdGhpcy5yZWN0YW5nbGUoKSA6IHRoaXMucmVjdGFuZ2xlO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCYXNpY1N0cmF0ZWd5O1xufSgpO1xuXG52YXIgTm90Q3Jvc3NpbmdTdHJhdGVneSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0Jhc2ljU3RyYXRlZ3kpIHtcbiAgX2luaGVyaXRzKE5vdENyb3NzaW5nU3RyYXRlZ3ksIF9CYXNpY1N0cmF0ZWd5KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKE5vdENyb3NzaW5nU3RyYXRlZ3kpO1xuXG4gIGZ1bmN0aW9uIE5vdENyb3NzaW5nU3RyYXRlZ3koKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE5vdENyb3NzaW5nU3RyYXRlZ3kpO1xuXG4gICAgcmV0dXJuIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE5vdENyb3NzaW5nU3RyYXRlZ3ksIFt7XG4gICAga2V5OiBcInBvc2l0aW9uaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBvc2l0aW9uaW5nKHJlY3RhbmdsZUxpc3QsIGluZGV4ZXNPZk5ld3MpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBzdGF0aWNSZWN0YW5nbGVJbmRleGVzID0gcmVjdGFuZ2xlTGlzdC5yZWR1Y2UoZnVuY3Rpb24gKGluZGV4ZXMsIF9yZWN0LCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXhlc09mTmV3cy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHtcbiAgICAgICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4ZXM7XG4gICAgICB9LCBbXSk7XG4gICAgICBpbmRleGVzT2ZOZXdzLmZvckVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciByZWN0ID0gcmVjdGFuZ2xlTGlzdFtpbmRleF07XG4gICAgICAgIHZhciByZW1vdmFibGUgPSBmYWxzZTtcbiAgICAgICAgc3RhdGljUmVjdGFuZ2xlSW5kZXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbmRleE9mU3RhdGljKSB7XG4gICAgICAgICAgdmFyIHN0YXRpY1JlY3QgPSByZWN0YW5nbGVMaXN0W2luZGV4T2ZTdGF0aWNdO1xuICAgICAgICAgIHJlY3QgPSBzdGF0aWNSZWN0Lm1vdmVUb0JvdW5kKHJlY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVtb3ZhYmxlID0gc3RhdGljUmVjdGFuZ2xlSW5kZXhlcy5zb21lKGZ1bmN0aW9uIChpbmRleE9mU3RhdGljKSB7XG4gICAgICAgICAgdmFyIHN0YXRpY1JlY3QgPSByZWN0YW5nbGVMaXN0W2luZGV4T2ZTdGF0aWNdO1xuICAgICAgICAgIHJldHVybiAhIXN0YXRpY1JlY3QuYW5kKHJlY3QpO1xuICAgICAgICB9KSB8fCByZWN0LmFuZChfdGhpcy5ib3VuZFJlY3QpLmdldFNxdWFyZSgpICE9PSByZWN0LmdldFNxdWFyZSgpO1xuXG4gICAgICAgIGlmIChyZW1vdmFibGUpIHtcbiAgICAgICAgICByZWN0LnJlbW92YWJsZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGljUmVjdGFuZ2xlSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVjdGFuZ2xlTGlzdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic29ydGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzb3J0aW5nKG9kbERyYWdnYWJsZXNMaXN0LCBuZXdEcmFnZ2FibGVzLCBpbmRleE9mTmV3cykge1xuICAgICAgdmFyIGRyYWdnYWJsZXMgPSBvZGxEcmFnZ2FibGVzTGlzdC5jb25jYXQobmV3RHJhZ2dhYmxlcyk7XG4gICAgICBuZXdEcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICBpbmRleE9mTmV3cy5wdXNoKGRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRyYWdnYWJsZXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE5vdENyb3NzaW5nU3RyYXRlZ3k7XG59KEJhc2ljU3RyYXRlZ3kpO1xuXG52YXIgRmxvYXRMZWZ0U3RyYXRlZ3kgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9CYXNpY1N0cmF0ZWd5Mikge1xuICBfaW5oZXJpdHMoRmxvYXRMZWZ0U3RyYXRlZ3ksIF9CYXNpY1N0cmF0ZWd5Mik7XG5cbiAgdmFyIF9zdXBlcjIgPSBfY3JlYXRlU3VwZXIoRmxvYXRMZWZ0U3RyYXRlZ3kpO1xuXG4gIGZ1bmN0aW9uIEZsb2F0TGVmdFN0cmF0ZWd5KHJlY3RhbmdsZSkge1xuICAgIHZhciBfdGhpczI7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxvYXRMZWZ0U3RyYXRlZ3kpO1xuXG4gICAgX3RoaXMyID0gX3N1cGVyMi5jYWxsKHRoaXMsIHJlY3RhbmdsZSwgb3B0aW9ucyk7XG4gICAgX3RoaXMyLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHJlbW92YWJsZTogdHJ1ZVxuICAgIH0sIG9wdGlvbnMpO1xuICAgIF90aGlzMi5yYWRpdXMgPSBvcHRpb25zLnJhZGl1cyB8fCA4MDtcbiAgICBfdGhpczIucGFkZGluZ1RvcExlZnQgPSBvcHRpb25zLnBhZGRpbmdUb3BMZWZ0IHx8IG5ldyBQb2ludCgwLCAwKTtcbiAgICBfdGhpczIucGFkZGluZ0JvdHRvbVJpZ2h0ID0gb3B0aW9ucy5wYWRkaW5nQm90dG9tUmlnaHQgfHwgbmV3IFBvaW50KDAsIDApO1xuICAgIF90aGlzMi55R2FwQmV0d2VlbkRyYWdnYWJsZXMgPSBvcHRpb25zLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyB8fCAwO1xuICAgIF90aGlzMi5nZXREaXN0YW5jZSA9IG9wdGlvbnMuZ2V0RGlzdGFuY2UgfHwgZ2V0RGlzdGFuY2U7XG5cbiAgICBfdGhpczIuZ2V0UG9zaXRpb24gPSBvcHRpb25zLmdldFBvc2l0aW9uIHx8IGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgIHJldHVybiBkcmFnZ2FibGUucG9zaXRpb247XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpczI7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRmxvYXRMZWZ0U3RyYXRlZ3ksIFt7XG4gICAga2V5OiBcInBvc2l0aW9uaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBvc2l0aW9uaW5nKHJlY3RhbmdsZUxpc3QsIF9pbmRleGVzT2ZOZXdzKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIGJvdW5kUmVjdCA9IHRoaXMuYm91bmRSZWN0O1xuICAgICAgdmFyIHJlY3RQMiA9IGJvdW5kUmVjdC5nZXRQMigpO1xuICAgICAgdmFyIGJvdW5kYXJ5UG9pbnRzID0gW2JvdW5kUmVjdC5wb3NpdGlvbl07XG4gICAgICByZWN0YW5nbGVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHJlY3QsIHJlY3RJbmRleCkge1xuICAgICAgICB2YXIgcG9zaXRpb24sXG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3VuZGFyeVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHBvc2l0aW9uID0gbmV3IFBvaW50KGJvdW5kYXJ5UG9pbnRzW2ldLnggKyBfdGhpczMucGFkZGluZ1RvcExlZnQueCwgaSA+IDAgPyBib3VuZGFyeVBvaW50c1tpIC0gMV0ueSArIF90aGlzMy55R2FwQmV0d2VlbkRyYWdnYWJsZXMgOiBib3VuZFJlY3QucG9zaXRpb24ueSArIF90aGlzMy5wYWRkaW5nVG9wTGVmdC55KTtcbiAgICAgICAgICBpc1ZhbGlkID0gcG9zaXRpb24ueCArIHJlY3Quc2l6ZS54IDwgcmVjdFAyLng7XG5cbiAgICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9pbnQoYm91bmRSZWN0LnBvc2l0aW9uLnggKyBfdGhpczMucGFkZGluZ1RvcExlZnQueCwgYm91bmRhcnlQb2ludHNbYm91bmRhcnlQb2ludHMubGVuZ3RoIC0gMV0ueSArIChyZWN0SW5kZXggPiAwID8gX3RoaXMzLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyA6IF90aGlzMy5wYWRkaW5nVG9wTGVmdC55KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWN0LnBvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICAgICAgaWYgKF90aGlzMy5vcHRpb25zLnJlbW92YWJsZSAmJiByZWN0LmdldFAzKCkueSA+IGJvdW5kUmVjdC5nZXRQMygpLnkpIHtcbiAgICAgICAgICByZWN0LnJlbW92YWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBib3VuZGFyeVBvaW50cyA9IGFkZFBvaW50VG9Cb3VuZFBvaW50cyhib3VuZGFyeVBvaW50cywgcmVjdC5nZXRQMygpLmFkZChfdGhpczMucGFkZGluZ0JvdHRvbVJpZ2h0KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZWN0YW5nbGVMaXN0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzb3J0aW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNvcnRpbmcob2RsRHJhZ2dhYmxlc0xpc3QsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIG5ld0xpc3QgPSBvZGxEcmFnZ2FibGVzTGlzdC5jb25jYXQoKTtcbiAgICAgIHZhciBsaXN0T2xkUG9zaXRpb24gPSBvZGxEcmFnZ2FibGVzTGlzdC5tYXAoZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLmdldFBvc2l0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIG5ld0RyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAobmV3RHJhZ2dhYmxlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGluZGV4T2ZOZWFyZXN0UG9pbnQobGlzdE9sZFBvc2l0aW9uLCBfdGhpczQuZ2V0UG9zaXRpb24obmV3RHJhZ2dhYmxlKSwgX3RoaXM0LnJhZGl1cywgX3RoaXM0LmdldERpc3RhbmNlKTtcblxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgaW5kZXggPSBuZXdMaXN0Lmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmRleCA9IG5ld0xpc3QuaW5kZXhPZihvZGxEcmFnZ2FibGVzTGlzdFtpbmRleF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3TGlzdC5zcGxpY2UoaW5kZXgsIDAsIG5ld0RyYWdnYWJsZSk7XG4gICAgICB9KTtcbiAgICAgIG5ld0RyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAobmV3RHJhZ2dhYmxlKSB7XG4gICAgICAgIGluZGV4T2ZOZXdzLnB1c2gobmV3TGlzdC5pbmRleE9mKG5ld0RyYWdnYWJsZSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3TGlzdDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRmxvYXRMZWZ0U3RyYXRlZ3k7XG59KEJhc2ljU3RyYXRlZ3kpO1xuXG52YXIgRmxvYXRSaWdodFN0cmF0ZWd5ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfRmxvYXRMZWZ0U3RyYXRlZ3kpIHtcbiAgX2luaGVyaXRzKEZsb2F0UmlnaHRTdHJhdGVneSwgX0Zsb2F0TGVmdFN0cmF0ZWd5KTtcblxuICB2YXIgX3N1cGVyMyA9IF9jcmVhdGVTdXBlcihGbG9hdFJpZ2h0U3RyYXRlZ3kpO1xuXG4gIGZ1bmN0aW9uIEZsb2F0UmlnaHRTdHJhdGVneShyZWN0YW5nbGUpIHtcbiAgICB2YXIgX3RoaXM1O1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZsb2F0UmlnaHRTdHJhdGVneSk7XG5cbiAgICBfdGhpczUgPSBfc3VwZXIzLmNhbGwodGhpcywgcmVjdGFuZ2xlLCBvcHRpb25zKTtcbiAgICBfdGhpczUucGFkZGluZ1RvcFJpZ2h0ID0gb3B0aW9ucy5wYWRkaW5nVG9wUmlnaHQgfHwgbmV3IFBvaW50KDUsIDUpO1xuICAgIF90aGlzNS5wYWRkaW5nQm90dG9tTGVmdCA9IG9wdGlvbnMucGFkZGluZ0JvdHRvbUxlZnQgfHwgbmV3IFBvaW50KDAsIDApO1xuICAgIF90aGlzNS55R2FwQmV0d2VlbkRyYWdnYWJsZXMgPSBvcHRpb25zLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyB8fCAwO1xuICAgIF90aGlzNS5wYWRkaW5nQm90dG9tTmVnTGVmdCA9IG5ldyBQb2ludCgtX3RoaXM1LnBhZGRpbmdCb3R0b21MZWZ0LngsIF90aGlzNS5wYWRkaW5nQm90dG9tTGVmdC55KTtcbiAgICByZXR1cm4gX3RoaXM1O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEZsb2F0UmlnaHRTdHJhdGVneSwgW3tcbiAgICBrZXk6IFwicG9zaXRpb25pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcG9zaXRpb25pbmcocmVjdGFuZ2xlTGlzdCwgX2luZGV4ZXNPZk5ld3MpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICB2YXIgYm91bmRSZWN0ID0gdGhpcy5ib3VuZFJlY3Q7XG4gICAgICB2YXIgYm91bmRhcnlQb2ludHMgPSBbYm91bmRSZWN0LmdldFAyKCldO1xuICAgICAgcmVjdGFuZ2xlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChyZWN0LCByZWN0SW5kZXgpIHtcbiAgICAgICAgdmFyIHBvc2l0aW9uLFxuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRhcnlQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb2ludChib3VuZGFyeVBvaW50c1tpXS54IC0gcmVjdC5zaXplLnggLSBfdGhpczYucGFkZGluZ1RvcFJpZ2h0LngsIGkgPiAwID8gYm91bmRhcnlQb2ludHNbaSAtIDFdLnkgKyBfdGhpczYueUdhcEJldHdlZW5EcmFnZ2FibGVzIDogYm91bmRSZWN0LnBvc2l0aW9uLnkgKyBfdGhpczYucGFkZGluZ1RvcFJpZ2h0LnkpO1xuICAgICAgICAgIGlzVmFsaWQgPSBwb3NpdGlvbi54ID4gcmVjdC5wb3NpdGlvbi54O1xuXG4gICAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgIHBvc2l0aW9uID0gbmV3IFBvaW50KGJvdW5kUmVjdC5nZXRQMigpLnggLSByZWN0LnNpemUueCAtIF90aGlzNi5wYWRkaW5nVG9wUmlnaHQueCwgYm91bmRhcnlQb2ludHNbYm91bmRhcnlQb2ludHMubGVuZ3RoIC0gMV0ueSArIChyZWN0SW5kZXggPiAwID8gX3RoaXM2LnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyA6IF90aGlzNi5wYWRkaW5nVG9wUmlnaHQueSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjdC5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChfdGhpczYub3B0aW9ucy5yZW1vdmFibGUgJiYgcmVjdC5nZXRQNCgpLnkgPiBib3VuZFJlY3QuZ2V0UDQoKS55KSB7XG4gICAgICAgICAgcmVjdC5yZW1vdmFibGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYm91bmRhcnlQb2ludHMgPSBhZGRQb2ludFRvQm91bmRQb2ludHMoYm91bmRhcnlQb2ludHMsIHJlY3QuZ2V0UDQoKS5hZGQoX3RoaXM2LnBhZGRpbmdCb3R0b21OZWdMZWZ0KSwgdHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZWN0YW5nbGVMaXN0O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBGbG9hdFJpZ2h0U3RyYXRlZ3k7XG59KEZsb2F0TGVmdFN0cmF0ZWd5KTtcblxudmFyIGFkZFRvRGVmYXVsdFNjb3BlJDEgPSBmdW5jdGlvbiBhZGRUb0RlZmF1bHRTY29wZSh0YXJnZXQpIHtcbiAgZGVmYXVsdFNjb3BlLmFkZFRhcmdldCh0YXJnZXQpO1xufTtcblxudmFyIFRhcmdldCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoVGFyZ2V0LCBfRXZlbnRFbWl0dGVyKTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFRhcmdldCk7XG5cbiAgZnVuY3Rpb24gVGFyZ2V0KGVsZW1lbnQsIGRyYWdnYWJsZXMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGFyZ2V0KTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyk7XG5cbiAgICBfdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICB0aW1lRW5kOiAyMDAsXG4gICAgICB0aW1lRXhjYW5nZTogNDAwXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgX3RoaXMucG9zaXRpb25pbmdTdHJhdGVneSA9IG9wdGlvbnMuc3RyYXRlZ3kgfHwgbmV3IEZsb2F0TGVmdFN0cmF0ZWd5KF90aGlzLmdldFJlY3RhbmdsZS5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSwge1xuICAgICAgcmFkaXVzOiA4MCxcbiAgICAgIGdldERpc3RhbmNlOiB0cmFuc2Zvcm1lZFNwYWNlRGlzdGFuY2VGYWN0b3J5KHtcbiAgICAgICAgeDogMSxcbiAgICAgICAgeTogNFxuICAgICAgfSksXG4gICAgICByZW1vdmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBfdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICBkcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgcmV0dXJuIGRyYWdnYWJsZS50YXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICB9KTtcbiAgICBfdGhpcy5kcmFnZ2FibGVzID0gZHJhZ2dhYmxlcztcbiAgICBUYXJnZXQuZW1pdHRlci5lbWl0KCd0YXJnZXQ6Y3JlYXRlJywgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuXG4gICAgX3RoaXMuc3RhcnRCb3VuZGluZygpO1xuXG4gICAgX3RoaXMuaW5pdCgpO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFRhcmdldCwgW3tcbiAgICBrZXk6IFwic3RhcnRCb3VuZGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydEJvdW5kaW5nKCkge1xuICAgICAgdGhpcy5ib3VuZCA9IHRoaXMub3B0aW9ucy5ib3VuZCB8fCBCb3VuZFRvRWxlbWVudC5ib3VuZGluZyh0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwb3NpdGlvbmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3NpdGlvbmluZyhkcmFnZ2FibGVzLCBpbmRleGVzT2ZOZXcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uaW5nU3RyYXRlZ3kucG9zaXRpb25pbmcoZHJhZ2dhYmxlcywgaW5kZXhlc09mTmV3KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic29ydGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzb3J0aW5nKG9sZERyYWdnYWJsZXMsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbmluZ1N0cmF0ZWd5LnNvcnRpbmcob2xkRHJhZ2dhYmxlcywgbmV3RHJhZ2dhYmxlcywgaW5kZXhPZk5ld3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHJlY3RhbmdsZXMsIGluZGV4ZXNPZk5ldztcbiAgICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzID0gdGhpcy5kcmFnZ2FibGVzLmZpbHRlcihmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZHJhZ2dhYmxlLmVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgIGlmIChlbGVtZW50ID09PSBfdGhpczIuZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMubGVuZ3RoKSB7XG4gICAgICAgIGluZGV4ZXNPZk5ldyA9IHJhbmdlKHRoaXMuaW5uZXJEcmFnZ2FibGVzLmxlbmd0aCk7XG4gICAgICAgIHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5nZXRSZWN0YW5nbGUoKTtcbiAgICAgICAgfSksIGluZGV4ZXNPZk5ldyk7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgaW5kZXhlc09mTmV3KTtcbiAgICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5lbWl0KCd0YXJnZXQ6YWRkJywgZHJhZ2dhYmxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFJlY3RhbmdsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRSZWN0YW5nbGUoKSB7XG4gICAgICByZXR1cm4gUmVjdGFuZ2xlLmZyb21FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jb250YWluZXIsIHRydWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjYXRjaERyYWdnYWJsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYXRjaERyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2F0Y2hEcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jYXRjaERyYWdnYWJsZSh0aGlzLCBkcmFnZ2FibGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHRhcmdldFJlY3RhbmdsZSA9IHRoaXMuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgICAgIHZhciBkcmFnZ2FibGVTcXVhcmUgPSBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCkuZ2V0U3F1YXJlKCk7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGVTcXVhcmUgPCB0YXJnZXRSZWN0YW5nbGUuZ2V0U3F1YXJlKCkgJiYgdGFyZ2V0UmVjdGFuZ2xlLmluY2x1ZGVQb2ludChkcmFnZ2FibGUuZ2V0Q2VudGVyKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRQb3NpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFJlY3RhbmdsZSgpLnBvc2l0aW9uO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRTaXplXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRSZWN0YW5nbGUoKS5zaXplO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZXN0cm95XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgc2NvcGVzLmZvckVhY2goZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVJdGVtKHNjb3BlLnRhcmdldHMsIF90aGlzMyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVmcmVzaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgICAgdmFyIHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgICB9KSwgW10pO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvbihyZWN0YW5nbGVzLCBbXSwgMCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRW5kKGRyYWdnYWJsZSkge1xuICAgICAgdmFyIG5ld0RyYWdnYWJsZXNJbmRleCA9IFtdO1xuXG4gICAgICBpZiAodGhpcy5nZXRSZWN0YW5nbGUoKS5pbmNsdWRlUG9pbnQoZHJhZ2dhYmxlLmdldENlbnRlcigpKSkge1xuICAgICAgICBkcmFnZ2FibGUucG9zaXRpb24gPSB0aGlzLmJvdW5kKGRyYWdnYWJsZS5wb3NpdGlvbiwgZHJhZ2dhYmxlLmdldFNpemUoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdCgndGFyZ2V0OmJlZm9yZUFkZCcsIGRyYWdnYWJsZSk7XG4gICAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcyA9IHRoaXMuc29ydGluZyh0aGlzLmlubmVyRHJhZ2dhYmxlcywgW2RyYWdnYWJsZV0sIG5ld0RyYWdnYWJsZXNJbmRleCk7XG4gICAgICB2YXIgcmVjdGFuZ2xlcyA9IHRoaXMucG9zaXRpb25pbmcodGhpcy5pbm5lckRyYWdnYWJsZXMubWFwKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5nZXRSZWN0YW5nbGUoKTtcbiAgICAgIH0pLCBuZXdEcmFnZ2FibGVzSW5kZXgpO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvbihyZWN0YW5nbGVzLCBuZXdEcmFnZ2FibGVzSW5kZXgpO1xuXG4gICAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpICE9PSAtMSkge1xuICAgICAgICB0aGlzLmFkZFJlbW92ZU9uTW92ZShkcmFnZ2FibGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0UG9zaXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgaW5kZXhlc09mTmV3LCB0aW1lKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuc2xpY2UoMCkuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlLCBpKSB7XG4gICAgICAgIHZhciByZWN0ID0gcmVjdGFuZ2xlc1tpXSxcbiAgICAgICAgICAgIHRpbWVFbmQgPSB0aW1lIHx8IHRpbWUgPT09IDAgPyB0aW1lIDogaW5kZXhlc09mTmV3LmluZGV4T2YoaSkgIT09IC0xID8gX3RoaXM0Lm9wdGlvbnMudGltZUVuZCA6IF90aGlzNC5vcHRpb25zLnRpbWVFeGNhbmdlO1xuXG4gICAgICAgIGlmIChyZWN0LnJlbW92YWJsZSkge1xuICAgICAgICAgIGRyYWdnYWJsZS5tb3ZlKGRyYWdnYWJsZS5pbml0aWFsUG9zaXRpb24sIHRpbWVFbmQsIHRydWUsIHRydWUpO1xuICAgICAgICAgIHJlbW92ZUl0ZW0oX3RoaXM0LmlubmVyRHJhZ2dhYmxlcywgZHJhZ2dhYmxlKTtcblxuICAgICAgICAgIF90aGlzNC5lbWl0KCd0YXJnZXQ6cmVtb3ZlJywgZHJhZ2dhYmxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkcmFnZ2FibGUubW92ZShyZWN0LnBvc2l0aW9uLCB0aW1lRW5kLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGQoZHJhZ2dhYmxlLCB0aW1lKSB7XG4gICAgICB2YXIgbmV3RHJhZ2dhYmxlc0luZGV4ID0gdGhpcy5pbm5lckRyYWdnYWJsZXMubGVuZ3RoO1xuICAgICAgdGhpcy5lbWl0KCd0YXJnZXQ6YmVmb3JlQWRkJywgZHJhZ2dhYmxlKTtcbiAgICAgIHRoaXMucHVzaElubmVyRHJhZ2dhYmxlKGRyYWdnYWJsZSk7XG4gICAgICB2YXIgcmVjdGFuZ2xlcyA9IHRoaXMucG9zaXRpb25pbmcodGhpcy5pbm5lckRyYWdnYWJsZXMubWFwKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5nZXRSZWN0YW5nbGUoKTtcbiAgICAgIH0pLCBuZXdEcmFnZ2FibGVzSW5kZXgsIGRyYWdnYWJsZSk7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uKHJlY3RhbmdsZXMsIFtuZXdEcmFnZ2FibGVzSW5kZXhdLCB0aW1lIHx8IDApO1xuXG4gICAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpICE9PSAtMSkge1xuICAgICAgICB0aGlzLmFkZFJlbW92ZU9uTW92ZShkcmFnZ2FibGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwdXNoSW5uZXJEcmFnZ2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHVzaElubmVyRHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgICAgaWYgKHRoaXMuaW5uZXJEcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMucHVzaChkcmFnZ2FibGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRSZW1vdmVPbk1vdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkUmVtb3ZlT25Nb3ZlKGRyYWdnYWJsZSkge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIGRyYWdnYWJsZS5vbignZHJhZzptb3ZlJywgdGhpcy5yZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczUucmVtb3ZlKGRyYWdnYWJsZSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZW1pdCgndGFyZ2V0OmFkZCcsIGRyYWdnYWJsZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmUoZHJhZ2dhYmxlKSB7XG4gICAgICBkcmFnZ2FibGUudW5zdWJzY3JpYmUoJ2RyYWc6bW92ZScsIHRoaXMucmVtb3ZlSGFuZGxlcik7XG4gICAgICB2YXIgaW5kZXggPSB0aGlzLmlubmVyRHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSk7XG5cbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdmFyIHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgICB9KSwgW10pO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvbihyZWN0YW5nbGVzLCBbXSk7XG4gICAgICB0aGlzLmVtaXQoJ3RhcmdldDpyZW1vdmUnLCBkcmFnZ2FibGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXNldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgZHJhZ2dhYmxlLm1vdmUoZHJhZ2dhYmxlLmluaXRpYWxQb3NpdGlvbiwgMCwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgX3RoaXM2LmVtaXQoJ3RhcmdldDpyZW1vdmUnLCBkcmFnZ2FibGUpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcyA9IFtdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRTb3J0ZWREcmFnZ2FibGVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNvcnRlZERyYWdnYWJsZXMoKSB7XG4gICAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcy5zbGljZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb250YWluZXJcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgfHwgdGhpcy5vcHRpb25zLmNvbnRhaW5lciB8fCB0aGlzLm9wdGlvbnMucGFyZW50IHx8IGdldERlZmF1bHRDb250YWluZXIodGhpcy5lbGVtZW50KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVGFyZ2V0O1xufShFdmVudEVtaXR0ZXIpO1xuVGFyZ2V0LmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5UYXJnZXQuZW1pdHRlci5vbigndGFyZ2V0OmNyZWF0ZScsIGFkZFRvRGVmYXVsdFNjb3BlJDEpO1xuXG52YXIgc2NvcGVzID0gW107XG5cbnZhciBTY29wZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoU2NvcGUsIF9FdmVudEVtaXR0ZXIpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoU2NvcGUpO1xuXG4gIGZ1bmN0aW9uIFNjb3BlKGRyYWdnYWJsZXMsIHRhcmdldHMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2NvcGUpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICBzY29wZXMuZm9yRWFjaChmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgIGlmIChkcmFnZ2FibGVzKSB7XG4gICAgICAgIGRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgcmVtb3ZlSXRlbShzY29wZS5kcmFnZ2FibGVzLCBkcmFnZ2FibGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldHMpIHtcbiAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICByZW1vdmVJdGVtKHNjb3BlLnRhcmdldHMsIHRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIF90aGlzLmRyYWdnYWJsZXMgPSBkcmFnZ2FibGVzIHx8IFtdO1xuICAgIF90aGlzLnRhcmdldHMgPSB0YXJnZXRzIHx8IFtdO1xuICAgIHNjb3Blcy5wdXNoKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5vcHRpb25zID0ge1xuICAgICAgdGltZUVuZDogb3B0aW9ucy50aW1lRW5kIHx8IDQwMFxuICAgIH07XG5cbiAgICBfdGhpcy5pbml0KCk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU2NvcGUsIFt7XG4gICAga2V5OiBcImluaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGRyYWdnYWJsZS5kcmFnRW5kQWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczIub25FbmQoZHJhZ2dhYmxlKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGREcmFnZ2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkRHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5wdXNoKGRyYWdnYWJsZSk7XG5cbiAgICAgIGRyYWdnYWJsZS5kcmFnRW5kQWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLm9uRW5kKGRyYWdnYWJsZSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRUYXJnZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkVGFyZ2V0KHRhcmdldCkge1xuICAgICAgdGhpcy50YXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25FbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25FbmQoZHJhZ2dhYmxlKSB7XG4gICAgICB2YXIgc2hvdFRhcmdldHMgPSB0aGlzLnRhcmdldHMuZmlsdGVyKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5kcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKSAhPT0gLTE7XG4gICAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0LmNhdGNoRHJhZ2dhYmxlKGRyYWdnYWJsZSk7XG4gICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmdldFJlY3RhbmdsZSgpLmdldFNxdWFyZSgpIC0gYi5nZXRSZWN0YW5nbGUoKS5nZXRTcXVhcmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc2hvdFRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIHNob3RUYXJnZXRzWzBdLm9uRW5kKGRyYWdnYWJsZSk7XG4gICAgICB9IGVsc2UgaWYgKGRyYWdnYWJsZS50YXJnZXRzLmxlbmd0aCkge1xuICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24oZHJhZ2dhYmxlLmluaXRpYWxQb3NpdGlvbiwgdGhpcy5vcHRpb25zLnRpbWVFbmQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVtaXQoJ3Njb3BlOmNoYW5nZScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXNldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5yZXNldCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlZnJlc2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5yZWZyZXNoKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5yZWZyZXNoKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicG9zaXRpb25zXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0cy5tYXAoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0LmlubmVyRHJhZ2dhYmxlcy5tYXAoZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICAgIHJldHVybiBfdGhpczQuZHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChwb3NpdGlvbnMpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB2YXIgbWVzc2FnZSA9ICd3cm9uZyBhcnJheSBsZW5ndGgnO1xuXG4gICAgICBpZiAocG9zaXRpb25zLmxlbmd0aCA9PT0gdGhpcy50YXJnZXRzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRhcmdldHMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIHRhcmdldC5yZXNldCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcG9zaXRpb25zLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldEluZGV4ZXMsIGkpIHtcbiAgICAgICAgICB0YXJnZXRJbmRleGVzLmZvckVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICBfdGhpczUudGFyZ2V0c1tpXS5hZGQoX3RoaXM1LmRyYWdnYWJsZXNbaW5kZXhdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBtZXNzYWdlO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTY29wZTtcbn0oRXZlbnRFbWl0dGVyKTtcblxudmFyIGRlZmF1bHRTY29wZSA9IG5ldyBTY29wZSgpO1xuXG5mdW5jdGlvbiBzY29wZShmbikge1xuICB2YXIgY3VycmVudFNjb3BlID0gbmV3IFNjb3BlKCk7XG5cbiAgdmFyIGFkZERyYWdnYWJsZVRvU2NvcGUgPSBmdW5jdGlvbiBhZGREcmFnZ2FibGVUb1Njb3BlKGRyYWdnYWJsZSkge1xuICAgIGN1cnJlbnRTY29wZS5hZGREcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbiAgICBEcmFnZ2FibGUuZW1pdHRlci5pbnRlcnJ1cHQoKTtcbiAgfTtcblxuICB2YXIgYWRkVGFyZ2V0VG9TY29wZSA9IGZ1bmN0aW9uIGFkZFRhcmdldFRvU2NvcGUodGFyZ2V0KSB7XG4gICAgY3VycmVudFNjb3BlLmFkZFRhcmdldCh0YXJnZXQpO1xuICAgIERyYWdnYWJsZS5lbWl0dGVyLmludGVycnVwdCgpO1xuICB9O1xuXG4gIERyYWdnYWJsZS5lbWl0dGVyLnByZXBlbmRPbignZHJhZ2dhYmxlOmNyZWF0ZScsIGFkZERyYWdnYWJsZVRvU2NvcGUpO1xuICBUYXJnZXQuZW1pdHRlci5wcmVwZW5kT24oJ3RhcmdldDpjcmVhdGUnLCBhZGRUYXJnZXRUb1Njb3BlKTtcbiAgZm4uY2FsbCgpO1xuICBEcmFnZ2FibGUuZW1pdHRlci51bnN1YnNjcmliZSgnZHJhZ2dhYmxlOmNyZWF0ZScsIGFkZERyYWdnYWJsZVRvU2NvcGUpO1xuICBUYXJnZXQuZW1pdHRlci51bnN1YnNjcmliZSgndGFyZ2V0OmNyZWF0ZScsIGFkZFRhcmdldFRvU2NvcGUpO1xuICByZXR1cm4gY3VycmVudFNjb3BlO1xufVxuXG5mdW5jdGlvbiBjaGVja1N1cHBvcnRQYXNzaXZlRXZlbnRzKCkge1xuICB2YXIgcGFzc2l2ZVN1cHBvcnRlZCA9IGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgdmFyIG9wdGlvbnMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBwYXNzaXZlU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0Jywgb3B0aW9ucywgb3B0aW9ucyk7XG4gIH0gY2F0Y2ggKF9lcnIpIHtcbiAgICBwYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcGFzc2l2ZVN1cHBvcnRlZDtcbn1cblxudmFyIGlzU3VwcG9ydFBhc3NpdmVFdmVudHMgPSBjaGVja1N1cHBvcnRQYXNzaXZlRXZlbnRzKCk7XG52YXIgaXNTdXBwb3J0UGFzc2l2ZUV2ZW50cyQxID0gaXNTdXBwb3J0UGFzc2l2ZUV2ZW50cztcblxuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCkge1xuICB2YXIgbGFzdFRpbWUgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gZXhlY3V0ZWRGdW5jdGlvbigpIHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG5cbiAgICBpZiAobm93IC0gbGFzdFRpbWUgPj0gd2FpdCkge1xuICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGxhc3RUaW1lID0gbm93O1xuICAgIH1cbiAgfTtcbn1cblxudmFyIHRocm90dGxlZERyYWdPdmVyID0gZnVuY3Rpb24gdGhyb3R0bGVkRHJhZ092ZXIoY2FsbGJhY2ssIGR1cmF0aW9uKSB7XG4gIHZhciB0aHJvdHRsZWRDYWxsYmFjayA9IHRocm90dGxlKGZ1bmN0aW9uIChldmVudCkge1xuICAgIHJldHVybiBjYWxsYmFjayhldmVudCk7XG4gIH0sIGR1cmF0aW9uKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhyb3R0bGVkQ2FsbGJhY2soZXZlbnQpO1xuICB9O1xufTtcblxudmFyIHBhc3NpdmVGYWxzZSA9IGlzU3VwcG9ydFBhc3NpdmVFdmVudHMkMSA/IHtcbiAgcGFzc2l2ZTogZmFsc2Vcbn0gOiBmYWxzZTtcbnZhciBpc1RvdWNoID0gKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyk7XG52YXIgbW91c2VFdmVudHMgPSB7XG4gIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgbW92ZTogJ21vdXNlbW92ZScsXG4gIGVuZDogJ21vdXNldXAnXG59O1xudmFyIHRvdWNoRXZlbnRzID0ge1xuICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICBtb3ZlOiAndG91Y2htb3ZlJyxcbiAgZW5kOiAndG91Y2hlbmQnXG59O1xudmFyIGRyYWdnYWJsZXMgPSBbXTtcbnZhciB0cmFuc2Zvcm1Qcm9wZXJ0eSA9IGdldFN0eWxlUHJvcGVydHkoJ3RyYW5zZm9ybScpO1xudmFyIHRyYW5zaXRpb25Qcm9wZXJ0eSA9IGdldFN0eWxlUHJvcGVydHkoJ3RyYW5zaXRpb24nKTtcblxuZnVuY3Rpb24gZ2V0VG91Y2hCeUlEKGVsZW1lbnQsIHRvdWNoSWQpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVsZW1lbnQuY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gdG91Y2hJZCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RG91YmxlSW5pdChkcmFnZ2FibGUpIHtcbiAgdmFyIG1lc3NhZ2UgPSBcImZvciB0aGlzIGVsZW1lbnQgRHJhZ2VlLkRyYWdnYWJsZSBpcyBhbHJlYWR5IGV4aXN0LCBkb24ndCBjcmVhdGUgaXQgdHdpY2UgXCI7XG5cbiAgaWYgKGRyYWdnYWJsZXMuc29tZShmdW5jdGlvbiAoZXhpc3RpbmcpIHtcbiAgICByZXR1cm4gZHJhZ2dhYmxlLmVsZW1lbnQgPT09IGV4aXN0aW5nLmVsZW1lbnQ7XG4gIH0pKSB7XG4gICAgdGhyb3cgbWVzc2FnZTtcbiAgfVxuXG4gIGRyYWdnYWJsZXMucHVzaChkcmFnZ2FibGUpO1xufVxuXG5mdW5jdGlvbiBhZGRUb0RlZmF1bHRTY29wZShkcmFnZ2FibGUpIHtcbiAgZGVmYXVsdFNjb3BlLmFkZERyYWdnYWJsZShkcmFnZ2FibGUpO1xufVxuXG5mdW5jdGlvbiBfY29weVN0eWxlcyhzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XG4gIHZhciBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNvdXJjZSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBjc1tpXTtcblxuICAgIGlmIChrZXkuaW5kZXhPZigndHJhbnNpdGlvbicpIDwgMCAmJiBrZXkuaW5kZXhPZigndHJhbnNmb3JtJykgPCAwKSB7XG4gICAgICBkZXN0aW5hdGlvbi5zdHlsZVtrZXldID0gY3Nba2V5XTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgc291cmNlLmNoaWxkcmVuLmxlbmd0aDsgX2krKykge1xuICAgIF9jb3B5U3R5bGVzKHNvdXJjZS5jaGlsZHJlbltfaV0sIGRlc3RpbmF0aW9uLmNoaWxkcmVuW19pXSk7XG4gIH1cbn1cblxudmFyIERyYWdnYWJsZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoRHJhZ2dhYmxlLCBfRXZlbnRFbWl0dGVyKTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKERyYWdnYWJsZSk7XG5cbiAgZnVuY3Rpb24gRHJhZ2dhYmxlKGVsZW1lbnQpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRHJhZ2dhYmxlKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgX3RoaXMudGFyZ2V0cyA9IFtdO1xuICAgIF90aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIF90aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHByZXZlbnREb3VibGVJbml0KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBEcmFnZ2FibGUuZW1pdHRlci5lbWl0KCdkcmFnZ2FibGU6Y3JlYXRlJywgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLl9lbmFibGUgPSB0cnVlO1xuXG4gICAgX3RoaXMuc3RhcnRCb3VuZGluZygpO1xuXG4gICAgX3RoaXMuc3RhcnRQb3NpdGlvbmluZygpO1xuXG4gICAgX3RoaXMuc3RhcnRMaXN0ZW5pbmcoKTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhEcmFnZ2FibGUsIFt7XG4gICAga2V5OiBcInN0YXJ0Qm91bmRpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnRCb3VuZGluZygpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYm91bmQpIHtcbiAgICAgICAgdGhpcy5ib3VuZGluZyA9IHtcbiAgICAgICAgICBib3VuZDogdGhpcy5vcHRpb25zLmJvdW5kXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJvdW5kaW5nID0gbmV3IEJvdW5kVG9FbGVtZW50KHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN0YXJ0UG9zaXRpb25pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnRQb3NpdGlvbmluZygpIHtcbiAgICAgIHRoaXMuX3NldERlZmF1bHRUcmFuc2l0aW9uKCk7XG5cbiAgICAgIHRoaXMub2Zmc2V0ID0gUG9pbnQuZWxlbWVudE9mZnNldCh0aGlzLmVsZW1lbnQsIHRoaXMuY29udGFpbmVyLCB0cnVlKTtcbiAgICAgIHRoaXMucGlubmVkUG9zaXRpb24gPSB0aGlzLm9mZnNldDtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLm9mZnNldDtcbiAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5vcHRpb25zLnBvc2l0aW9uIHx8IHRoaXMub2Zmc2V0O1xuICAgICAgdGhpcy5waW5Qb3NpdGlvbih0aGlzLmluaXRpYWxQb3NpdGlvbik7XG5cbiAgICAgIGlmICh0aGlzLmJvdW5kaW5nLnJlZnJlc2gpIHtcbiAgICAgICAgdGhpcy5ib3VuZGluZy5yZWZyZXNoKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN0YXJ0TGlzdGVuaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0TGlzdGVuaW5nKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuX2RyYWdTdGFydCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmRyYWdTdGFydChldmVudCk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9kcmFnTW92ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmRyYWdNb3ZlKGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2RyYWdFbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5kcmFnRW5kKGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX25hdGl2ZURyYWdTdGFydCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLm5hdGl2ZURyYWdTdGFydChldmVudCk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9uYXRpdmVEcmFnT3ZlciA9IHRocm90dGxlZERyYWdPdmVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLm5hdGl2ZURyYWdPdmVyKGV2ZW50KTtcbiAgICAgIH0sIHRoaXMuZHJhZ092ZXJUaHJvdHRsZUR1cmF0aW9uKTtcblxuICAgICAgdGhpcy5fbmF0aXZlRHJhZ0VuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLm5hdGl2ZURyYWdFbmQoZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fbmF0aXZlRHJvcCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLm5hdGl2ZURyb3AoZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fc2Nyb2xsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIub25TY3JvbGwoZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5oYW5kbGVyLmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuc3RhcnQsIHRoaXMuX2RyYWdTdGFydCwgcGFzc2l2ZUZhbHNlKTtcbiAgICAgIHRoaXMuaGFuZGxlci5hZGRFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLnN0YXJ0LCB0aGlzLl9kcmFnU3RhcnQsIHBhc3NpdmVGYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5fbmF0aXZlRHJhZ1N0YXJ0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgICAgcmV0dXJuIFBvaW50LmVsZW1lbnRTaXplKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFBvc2l0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFBvc2l0aW9uKCkge1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMub2Zmc2V0LmFkZCh0aGlzLl90cmFuc2Zvcm1Qb3NpdGlvbiB8fCBuZXcgUG9pbnQoMCwgMCkpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldENlbnRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDZW50ZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy5nZXRTaXplKCkubXVsdCgwLjUpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3NldERlZmF1bHRUcmFuc2l0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXREZWZhdWx0VHJhbnNpdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zaXRpb25Qcm9wZXJ0eV0pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zaXRpb25Qcm9wZXJ0eV0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQpW3RyYW5zaXRpb25Qcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9zZXRUcmFuc2l0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRUcmFuc2l0aW9uKHRpbWUpIHtcbiAgICAgIHZhciB0cmFuc2l0aW9uID0gdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zaXRpb25Qcm9wZXJ0eV07XG4gICAgICB2YXIgdHJhbnNpdGlvbkNzcyA9IFwidHJhbnNmb3JtIFwiLmNvbmNhdCh0aW1lLCBcIm1zXCIpO1xuXG4gICAgICBpZiAoIS90cmFuc2Zvcm0gXFxkKm0/cy8udGVzdCh0cmFuc2l0aW9uKSkge1xuICAgICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICAgIHRyYW5zaXRpb24gKz0gXCIsIFwiLmNvbmNhdCh0cmFuc2l0aW9uQ3NzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cmFuc2l0aW9uID0gdHJhbnNpdGlvbkNzcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNpdGlvbiA9IHRyYW5zaXRpb24ucmVwbGFjZSgvdHJhbnNmb3JtIFxcZCptP3MvZywgdHJhbnNpdGlvbkNzcyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XSAhPT0gdHJhbnNpdGlvbikge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XSA9IHRyYW5zaXRpb247XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9zZXRUcmFuc2xhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFRyYW5zbGF0ZShwb2ludCkge1xuICAgICAgdGhpcy5fdHJhbnNmb3JtUG9zaXRpb24gPSBwb2ludDtcbiAgICAgIHZhciB0cmFuc2xhdGVDc3MgPSBcInRyYW5zbGF0ZTNkKFwiLmNvbmNhdChwb2ludC54LCBcInB4LCBcIikuY29uY2F0KHBvaW50LnksIFwicHgsIDBweClcIik7XG4gICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XTtcblxuICAgICAgaWYgKHRoaXMuc2hvdWxkUmVtb3ZlWmVyb1RyYW5zbGF0ZSAmJiBwb2ludC54ID09PSAwICYmIHBvaW50LnkgPT09IDApIHtcbiAgICAgICAgdHJhbnNmb3JtID0gdHJhbnNmb3JtLnJlcGxhY2UoL3RyYW5zbGF0ZTNkXFwoW14pXStcXCkvLCAnJyk7XG4gICAgICB9IGVsc2UgaWYgKCEvdHJhbnNsYXRlM2RcXChbXildK1xcKS8udGVzdCh0cmFuc2Zvcm0pKSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm0pIHtcbiAgICAgICAgICB0cmFuc2Zvcm0gKz0gJyAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJhbnNmb3JtICs9IHRyYW5zbGF0ZUNzcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5yZXBsYWNlKC90cmFuc2xhdGUzZFxcKFteKV0rXFwpLywgdHJhbnNsYXRlQ3NzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2Zvcm1Qcm9wZXJ0eV0gIT09IHRyYW5zZm9ybSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNmb3JtUHJvcGVydHldID0gdHJhbnNmb3JtO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJtb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmUocG9pbnQpIHtcbiAgICAgIHZhciB0aW1lID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAgICAgdmFyIGlzU2lsZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgICAgIHBvaW50ID0gcG9pbnQuY2xvbmUoKTtcbiAgICAgIHRoaXMucG9zaXRpb24gPSBwb2ludDtcblxuICAgICAgdGhpcy5fc2V0VHJhbnNpdGlvbih0aW1lKTtcblxuICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlKHBvaW50LnN1Yih0aGlzLm9mZnNldCkpO1xuXG4gICAgICBpZiAoIWlzU2lsZW50KSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZHJhZzptb3ZlJyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInBpblBvc2l0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBpblBvc2l0aW9uKHBvaW50KSB7XG4gICAgICB2YXIgdGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcbiAgICAgIHZhciBzaWxlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHRydWU7XG4gICAgICB0aGlzLnBpbm5lZFBvc2l0aW9uID0gcG9pbnQuY2xvbmUoKTtcbiAgICAgIHRoaXMubW92ZSh0aGlzLnBpbm5lZFBvc2l0aW9uLCB0aW1lLCBzaWxlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXNldFBvc2l0aW9uVG9Jbml0aWFsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2V0UG9zaXRpb25Ub0luaXRpYWwoKSB7XG4gICAgICB0aGlzLnBpblBvc2l0aW9uKHRoaXMuaW5pdGlhbFBvc2l0aW9uKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVmcmVzaFBvc2l0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZnJlc2hQb3NpdGlvbigpIHtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5nZXRQb3NpdGlvbigpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0UG9zaXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UG9zaXRpb24ocG9pbnQpIHtcbiAgICAgIHBvaW50ID0gcG9pbnQuY2xvbmUoKTtcbiAgICAgIHRoaXMucG9zaXRpb24gPSBwb2ludDtcblxuICAgICAgdGhpcy5fc2V0VHJhbnNpdGlvbigwKTtcblxuICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlKHBvaW50LnN1Yih0aGlzLm9mZnNldCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZXRlcm1pbmVEaXJlY3Rpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0ZXJtaW5lRGlyZWN0aW9uKHBvaW50KSB7XG4gICAgICB0aGlzLl9wcmV2aW91c0RpcmVjdGlvblBvc2l0aW9uIHx8ICh0aGlzLl9wcmV2aW91c0RpcmVjdGlvblBvc2l0aW9uID0gdGhpcy5fc3RhcnRQb3NpdGlvbik7XG4gICAgICB0aGlzLmxlZnREaXJlY3Rpb24gPSB0aGlzLl9wcmV2aW91c0RpcmVjdGlvblBvc2l0aW9uLnggPCBwb2ludC54O1xuICAgICAgdGhpcy5yaWdodERpcmVjdGlvbiA9IHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24ueCA+IHBvaW50Lng7XG4gICAgICB0aGlzLnVwRGlyZWN0aW9uID0gdGhpcy5fcHJldmlvdXNEaXJlY3Rpb25Qb3NpdGlvbi55ID4gcG9pbnQueTtcbiAgICAgIHRoaXMuZG93bkRpcmVjdGlvbiA9IHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24ueSA8IHBvaW50Lnk7XG4gICAgICB0aGlzLl9wcmV2aW91c0RpcmVjdGlvblBvc2l0aW9uID0gcG9pbnQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNlZW1zU2Nyb2xsaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlZW1zU2Nyb2xsaW5nKCkge1xuICAgICAgcmV0dXJuICtuZXcgRGF0ZSgpIC0gdGhpcy5fc3RhcnRUb3VjaFRpbWVzdGFtcCA8IHRoaXMudG91Y2hEcmFnZ2luZ1RocmVzaG9sZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2hvdWxkVXNlTmF0aXZlRHJhZ0FuZERyb3BcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlRHJhZ0FuZERyb3AoKSB7XG4gICAgICBpZiAodGhpcy5pc1RvdWNoRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlRHJhZ0FuZERyb3AgJiYgdGhpcy5lbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3BPblRvdWNoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlRHJhZ0FuZERyb3A7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRyYWdTdGFydFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICBpZiAoIXRoaXMuX2VuYWJsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaXNUb3VjaEV2ZW50ID0gaXNUb3VjaCAmJiBldmVudCBpbnN0YW5jZW9mIHdpbmRvdy5Ub3VjaEV2ZW50O1xuICAgICAgdGhpcy50b3VjaFBvaW50ID0gdGhpcy5fc3RhcnRUb3VjaFBvaW50ID0gbmV3IFBvaW50KHRoaXMuaXNUb3VjaEV2ZW50ID8gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggOiBldmVudC5jbGllbnRYLCB0aGlzLmlzVG91Y2hFdmVudCA/IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIDogZXZlbnQuY2xpZW50WSk7XG4gICAgICB0aGlzLl9zdGFydFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuXG4gICAgICBpZiAodGhpcy5pc1RvdWNoRXZlbnQpIHtcbiAgICAgICAgdGhpcy5fdG91Y2hJZCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gICAgICAgIHRoaXMuX3N0YXJ0VG91Y2hUaW1lc3RhbXAgPSArbmV3IERhdGUoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhcnRXaW5kb3dTY3JvbGxQb2ludCA9IHRoaXMud2luZG93U2Nyb2xsUG9pbnQ7XG4gICAgICB0aGlzLl9zdGFydFBhcmVudHNTY3JvbGxQb2ludCA9IHRoaXMucGFyZW50c1Njcm9sbFBvaW50O1xuXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJbnB1dEVsZW1lbnQgfHwgZXZlbnQudGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNob3VsZFVzZU5hdGl2ZURyYWdBbmREcm9wKCkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUb3VjaEV2ZW50ICYmIHRoaXMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wT25Ub3VjaCkge1xuICAgICAgICAgIHZhciBlbXVsYXRlT25GaXJzdE1vdmUgPSBmdW5jdGlvbiBlbXVsYXRlT25GaXJzdE1vdmUoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChfdGhpczMuc2VlbXNTY3JvbGxpbmcoKSkge1xuICAgICAgICAgICAgICBfdGhpczMuY2FuY2VsRHJhZ2dpbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF90aGlzMy5lbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3AoZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYW5jZWxFbXVsYXRpb24oKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIGNhbmNlbEVtdWxhdGlvbiA9IGZ1bmN0aW9uIGNhbmNlbEVtdWxhdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMubW92ZSwgZW11bGF0ZU9uRmlyc3RNb3ZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCBjYW5jZWxFbXVsYXRpb24pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIGVtdWxhdGVPbkZpcnN0TW92ZSwgcGFzc2l2ZUZhbHNlKTtcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgY2FuY2VsRW11bGF0aW9uLCBwYXNzaXZlRmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9uYXRpdmVEcmFnRW5kLCBwYXNzaXZlRmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlLCBwYXNzaXZlRmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlLCBwYXNzaXZlRmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgdGhpcy5fZHJhZ0VuZCwgcGFzc2l2ZUZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQsIHBhc3NpdmVGYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGwpO1xuICAgICAgdGhpcy5wYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIHAuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgX3RoaXMzLl9zY3JvbGwpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmVtaXQoJ2RyYWc6c3RhcnQnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZHJhZ01vdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIHZhciB0b3VjaDtcbiAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICB0aGlzLmlzVG91Y2hFdmVudCA9IGlzVG91Y2ggJiYgZXZlbnQgaW5zdGFuY2VvZiB3aW5kb3cuVG91Y2hFdmVudDtcblxuICAgICAgaWYgKHRoaXMuaXNUb3VjaEV2ZW50KSB7XG4gICAgICAgIHRvdWNoID0gZ2V0VG91Y2hCeUlEKGV2ZW50LCB0aGlzLl90b3VjaElkKTtcblxuICAgICAgICBpZiAoIXRvdWNoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VlbXNTY3JvbGxpbmcoKSkge1xuICAgICAgICAgIHRoaXMuY2FuY2VsRHJhZ2dpbmcoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy50b3VjaFBvaW50ID0gbmV3IFBvaW50KHRoaXMuaXNUb3VjaEV2ZW50ID8gdG91Y2gucGFnZVggOiBldmVudC5jbGllbnRYLCB0aGlzLmlzVG91Y2hFdmVudCA/IHRvdWNoLnBhZ2VZIDogZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHZhciBwb2ludCA9IHRoaXMuX3N0YXJ0UG9zaXRpb24uYWRkKHRoaXMudG91Y2hQb2ludC5zdWIodGhpcy5fc3RhcnRUb3VjaFBvaW50KSkuYWRkKHRoaXMud2luZG93U2Nyb2xsUG9pbnQuc3ViKHRoaXMuX3N0YXJ0V2luZG93U2Nyb2xsUG9pbnQpKS5hZGQodGhpcy5wYXJlbnRzU2Nyb2xsUG9pbnQuc3ViKHRoaXMuX3N0YXJ0UGFyZW50c1Njcm9sbFBvaW50KSk7XG5cbiAgICAgIHBvaW50ID0gdGhpcy5ib3VuZGluZy5ib3VuZChwb2ludCwgdGhpcy5nZXRTaXplKCkpO1xuICAgICAgdGhpcy5kZXRlcm1pbmVEaXJlY3Rpb24ocG9pbnQpO1xuICAgICAgdGhpcy5tb3ZlKHBvaW50KTtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnZWUtYWN0aXZlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRyYWdFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ0VuZChldmVudCkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHRoaXMuaXNUb3VjaEV2ZW50ID0gaXNUb3VjaCAmJiBldmVudCBpbnN0YW5jZW9mIHdpbmRvdy5Ub3VjaEV2ZW50O1xuXG4gICAgICBpZiAodGhpcy5pc1RvdWNoRXZlbnQgJiYgIWdldFRvdWNoQnlJRChldmVudCwgdGhpcy5fdG91Y2hJZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0RyYWdnaW5nKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyYWdFbmRBY3Rpb24oKTtcbiAgICAgIHRoaXMuZW1pdCgnZHJhZzplbmQnKTtcbiAgICAgIHRoaXMuY2FuY2VsRHJhZ2dpbmcoKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXM0LmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2VlLWFjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uU2Nyb2xsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uU2Nyb2xsKF9ldmVudCkge1xuICAgICAgdmFyIHBvaW50ID0gdGhpcy5fc3RhcnRQb3NpdGlvbi5hZGQodGhpcy50b3VjaFBvaW50LnN1Yih0aGlzLl9zdGFydFRvdWNoUG9pbnQpKS5hZGQodGhpcy53aW5kb3dTY3JvbGxQb2ludC5zdWIodGhpcy5fc3RhcnRXaW5kb3dTY3JvbGxQb2ludCkpLmFkZCh0aGlzLnBhcmVudHNTY3JvbGxQb2ludC5zdWIodGhpcy5fc3RhcnRQYXJlbnRzU2Nyb2xsUG9pbnQpKTtcblxuICAgICAgcG9pbnQgPSB0aGlzLmJvdW5kaW5nLmJvdW5kKHBvaW50LCB0aGlzLmdldFNpemUoKSk7XG5cbiAgICAgIGlmICghdGhpcy5uYXRpdmVEcmFnQW5kRHJvcCkge1xuICAgICAgICB0aGlzLmRldGVybWluZURpcmVjdGlvbihwb2ludCk7XG4gICAgICAgIHRoaXMubW92ZShwb2ludCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm5hdGl2ZURyYWdTdGFydFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBuYXRpdmVEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ0ZpcmVGb3ggZml4Jyk7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5fbmF0aXZlRHJhZ092ZXIpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuX25hdGl2ZURyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuX25hdGl2ZURyb3ApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuYXRpdmVEcmFnT3ZlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBuYXRpdmVEcmFnT3ZlcihldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RyYWdlZS1wbGFjZWhvbGRlcicpO1xuXG4gICAgICBpZiAoZXZlbnQuY2xpZW50WCA9PT0gMCAmJiBldmVudC5jbGllbnRZID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b3VjaFBvaW50ID0gbmV3IFBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICB2YXIgcG9pbnQgPSB0aGlzLl9zdGFydFBvc2l0aW9uLmFkZCh0aGlzLnRvdWNoUG9pbnQuc3ViKHRoaXMuX3N0YXJ0VG91Y2hQb2ludCkpLmFkZCh0aGlzLndpbmRvd1Njcm9sbFBvaW50LnN1Yih0aGlzLl9zdGFydFdpbmRvd1Njcm9sbFBvaW50KSkuYWRkKHRoaXMucGFyZW50c1Njcm9sbFBvaW50LnN1Yih0aGlzLl9zdGFydFBhcmVudHNTY3JvbGxQb2ludCkpO1xuXG4gICAgICBwb2ludCA9IHRoaXMuYm91bmRpbmcuYm91bmQocG9pbnQsIHRoaXMuZ2V0U2l6ZSgpKTtcbiAgICAgIHRoaXMuZGV0ZXJtaW5lRGlyZWN0aW9uKHBvaW50KTtcbiAgICAgIHRoaXMucG9zaXRpb24gPSBwb2ludDtcbiAgICAgIHRoaXMuZW1pdCgnZHJhZzptb3ZlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm5hdGl2ZURyYWdFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbmF0aXZlRHJhZ0VuZChfZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2VlLXBsYWNlaG9sZGVyJyk7XG4gICAgICB0aGlzLmRyYWdFbmRBY3Rpb24oKTtcbiAgICAgIHRoaXMuZW1pdCgnZHJhZzplbmQnKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5fbmF0aXZlRHJhZ092ZXIpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuX25hdGl2ZURyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5lbmQsIHRoaXMuX25hdGl2ZURyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuX25hdGl2ZURyb3ApO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbCk7XG4gICAgICB0aGlzLnBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICByZXR1cm4gcC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBfdGhpczUuX3Njcm9sbCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJyk7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2VlLWFjdGl2ZScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuYXRpdmVEcm9wXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5hdGl2ZURyb3AoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2FuY2VsRHJhZ2dpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2FuY2VsRHJhZ2dpbmcoKSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCB0aGlzLl9kcmFnTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCB0aGlzLl9kcmFnRW5kKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9kcmFnRW5kKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9uYXRpdmVEcmFnRW5kKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGwpO1xuICAgICAgdGhpcy5wYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIHAucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgX3RoaXM2Ll9zY3JvbGwpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24gPSBudWxsO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvcHlTdHlsZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29weVN0eWxlcyhzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvcHlTdHlsZXMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmNvcHlTdHlsZXMoc291cmNlLCBkZXN0aW5hdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfY29weVN0eWxlcyhzb3VyY2UsIGRlc3RpbmF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVtdWxhdGVOYXRpdmVEcmFnQW5kRHJvcChldmVudCkge1xuICAgICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICAgIHZhciBjb250YWluZXJSZWN0ID0gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgY2xvbmVkRWxlbWVudCA9IHRoaXMuZWxlbWVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICBjbG9uZWRFbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XSA9ICcnO1xuICAgICAgdGhpcy5jb3B5U3R5bGVzKHRoaXMuZWxlbWVudCwgY2xvbmVkRWxlbWVudCk7XG4gICAgICBjbG9uZWRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvbmVkRWxlbWVudCk7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZ2VlLXBsYWNlaG9sZGVyJyk7XG4gICAgICB2YXIgZW11bGF0aW9uRHJhZ2dhYmxlID0gbmV3IERyYWdnYWJsZShjbG9uZWRFbGVtZW50LCB7XG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuYm9keSxcbiAgICAgICAgdG91Y2hEcmFnZ2luZ1RocmVzaG9sZDogMCxcbiAgICAgICAgYm91bmQ6IGZ1bmN0aW9uIGJvdW5kKHBvaW50KSB7XG4gICAgICAgICAgcmV0dXJuIHBvaW50O1xuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgICdkcmFnOm1vdmUnOiBmdW5jdGlvbiBkcmFnTW92ZSgpIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJSZWN0UG9pbnQgPSBuZXcgUG9pbnQoY29udGFpbmVyUmVjdC5sZWZ0LCBjb250YWluZXJSZWN0LnRvcCk7XG4gICAgICAgICAgICBfdGhpczcucG9zaXRpb24gPSBlbXVsYXRpb25EcmFnZ2FibGUucG9zaXRpb24uc3ViKGNvbnRhaW5lclJlY3RQb2ludCkuc3ViKF90aGlzNy5fc3RhcnRXaW5kb3dTY3JvbGxQb2ludCkuYWRkKF90aGlzNy5fc3RhcnRQYXJlbnRzU2Nyb2xsUG9pbnQpO1xuXG4gICAgICAgICAgICBfdGhpczcuZGV0ZXJtaW5lRGlyZWN0aW9uKF90aGlzNy5wb3NpdGlvbik7XG5cbiAgICAgICAgICAgIF90aGlzNy5lbWl0KCdkcmFnOm1vdmUnKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdkcmFnOmVuZCc6IGZ1bmN0aW9uIGRyYWdFbmQoKSB7XG4gICAgICAgICAgICBlbXVsYXRpb25EcmFnZ2FibGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjbG9uZWRFbGVtZW50KTtcblxuICAgICAgICAgICAgX3RoaXM3LmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2VlLXBsYWNlaG9sZGVyJyk7XG5cbiAgICAgICAgICAgIF90aGlzNy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdlZS1hY3RpdmUnKTtcblxuICAgICAgICAgICAgX3RoaXM3LmVtaXQoJ2RyYWc6ZW5kJyk7XG5cbiAgICAgICAgICAgIF90aGlzNy5kcmFnRW5kQWN0aW9uKCk7XG5cbiAgICAgICAgICAgIF90aGlzNy5jYW5jZWxEcmFnZ2luZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgY29udGFpbmVyUmVjdFBvaW50ID0gbmV3IFBvaW50KGNvbnRhaW5lclJlY3QubGVmdCwgY29udGFpbmVyUmVjdC50b3ApO1xuICAgICAgZW11bGF0aW9uRHJhZ2dhYmxlLl9zdGFydFdpbmRvd1Njcm9sbFBvaW50ID0gdGhpcy5fc3RhcnRXaW5kb3dTY3JvbGxQb2ludDtcbiAgICAgIGVtdWxhdGlvbkRyYWdnYWJsZS5tb3ZlKHRoaXMucGlubmVkUG9zaXRpb24uYWRkKGNvbnRhaW5lclJlY3RQb2ludCkuYWRkKHRoaXMud2luZG93U2Nyb2xsUG9pbnQpLnN1Yih0aGlzLnBhcmVudHNTY3JvbGxQb2ludCkpO1xuICAgICAgZW11bGF0aW9uRHJhZ2dhYmxlLmRyYWdTdGFydChldmVudCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkcmFnRW5kQWN0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYWdFbmRBY3Rpb24oKSB7XG4gICAgICB0aGlzLnBpblBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRSZWN0YW5nbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UmVjdGFuZ2xlKCkge1xuICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUodGhpcy5wb3NpdGlvbiwgdGhpcy5nZXRTaXplKCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZWZyZXNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgICBpZiAodGhpcy5ib3VuZGluZy5yZWZyZXNoKSB7XG4gICAgICAgIHRoaXMuYm91bmRpbmcucmVmcmVzaCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZXN0cm95XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0aGlzLmhhbmRsZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgdGhpcy5fZHJhZ1N0YXJ0KTtcbiAgICAgIHRoaXMuaGFuZGxlci5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLnN0YXJ0LCB0aGlzLl9kcmFnU3RhcnQpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuX25hdGl2ZURyYWdTdGFydCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMubW92ZSwgdGhpcy5fZHJhZ01vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLl9uYXRpdmVEcmFnT3Zlcik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5fbmF0aXZlRHJvcCk7XG4gICAgICB0aGlzLnJlc2V0RW1pdHRlcigpO1xuICAgICAgdmFyIGluZGV4ID0gZHJhZ2dhYmxlcy5pbmRleE9mKHRoaXMpO1xuXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBkcmFnZ2FibGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbnRhaW5lclwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lciB8fCB0aGlzLm9wdGlvbnMuY29udGFpbmVyIHx8IHRoaXMub3B0aW9ucy5wYXJlbnQgfHwgZ2V0RGVmYXVsdENvbnRhaW5lcih0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVyXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBpZiAoIXRoaXMuX2hhbmRsZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuaGFuZGxlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmhhbmRsZXIpIHx8IHRoaXMuZWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVyID0gdGhpcy5vcHRpb25zLmhhbmRsZXIgfHwgdGhpcy5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuYXRpdmVEcmFnQW5kRHJvcFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5uYXRpdmVEcmFnQW5kRHJvcCB8fCBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wT25Ub3VjaFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5lbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3BPblRvdWNoIHx8IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaG91bGRSZW1vdmVaZXJvVHJhbnNsYXRlXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNob3VsZFJlbW92ZVplcm9UcmFuc2xhdGUgfHwgZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRvdWNoRHJhZ2dpbmdUaHJlc2hvbGRcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMudG91Y2hEcmFnZ2luZ1RocmVzaG9sZCB8fCAwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkcmFnT3ZlclRocm90dGxlRHVyYXRpb25cIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZHJhZ092ZXJUaHJvdHRsZUR1cmF0aW9uIHx8IDE2O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ3aW5kb3dTY3JvbGxQb2ludFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIG5ldyBQb2ludCh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwYXJlbnRzXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBpZiAodGhpcy5fY2FjaGVkUGFyZW50cykgcmV0dXJuIHRoaXMuX2NhY2hlZFBhcmVudHM7XG4gICAgICB0aGlzLl9jYWNoZWRQYXJlbnRzID0gW107XG4gICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblxuICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSAmJiBlbGVtZW50ICE9IHRoaXMuY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlZFBhcmVudHMudW5zaGlmdChlbGVtZW50LnBhcmVudE5vZGUpO1xuXG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9jYWNoZWRQYXJlbnRzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwYXJlbnRzU2Nyb2xsUG9pbnRcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5wYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoc3VtLCBwKSB7XG4gICAgICAgIHJldHVybiBzdW0gKyBwLnNjcm9sbExlZnQ7XG4gICAgICB9LCAwKSwgdGhpcy5wYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoc3VtLCBwKSB7XG4gICAgICAgIHJldHVybiBzdW0gKyBwLnNjcm9sbFRvcDtcbiAgICAgIH0sIDApKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZW5hYmxlXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZW5hYmxlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoZW5hYmxlKSB7XG4gICAgICBpZiAoZW5hYmxlKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZWUtZGlzYWJsZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RyYWdlZS1kaXNhYmxlJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VuYWJsZSA9IGVuYWJsZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRHJhZ2dhYmxlO1xufShFdmVudEVtaXR0ZXIpO1xuRHJhZ2dhYmxlLmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5EcmFnZ2FibGUuZW1pdHRlci5vbignZHJhZ2dhYmxlOmNyZWF0ZScsIGFkZFRvRGVmYXVsdFNjb3BlKTtcblxudmFyIHJlc2l6ZU9ic2VydmVycyA9IFtdO1xuXG52YXIgaGFzQWN0aXZlT2JzZXJ2YXRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZXNpemVPYnNlcnZlcnMuc29tZShmdW5jdGlvbiAocm8pIHsgcmV0dXJuIHJvLmFjdGl2ZVRhcmdldHMubGVuZ3RoID4gMDsgfSk7XG59O1xuXG52YXIgaGFzU2tpcHBlZE9ic2VydmF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmVzaXplT2JzZXJ2ZXJzLnNvbWUoZnVuY3Rpb24gKHJvKSB7IHJldHVybiByby5za2lwcGVkVGFyZ2V0cy5sZW5ndGggPiAwOyB9KTtcbn07XG5cbnZhciBtc2cgPSAnUmVzaXplT2JzZXJ2ZXIgbG9vcCBjb21wbGV0ZWQgd2l0aCB1bmRlbGl2ZXJlZCBub3RpZmljYXRpb25zLic7XG52YXIgZGVsaXZlclJlc2l6ZUxvb3BFcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXZlbnQ7XG4gICAgaWYgKHR5cGVvZiBFcnJvckV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGV2ZW50ID0gbmV3IEVycm9yRXZlbnQoJ2Vycm9yJywge1xuICAgICAgICAgICAgbWVzc2FnZTogbXNnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgZXZlbnQuaW5pdEV2ZW50KCdlcnJvcicsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIGV2ZW50Lm1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn07XG5cbnZhciBSZXNpemVPYnNlcnZlckJveE9wdGlvbnM7XG4oZnVuY3Rpb24gKFJlc2l6ZU9ic2VydmVyQm94T3B0aW9ucykge1xuICAgIFJlc2l6ZU9ic2VydmVyQm94T3B0aW9uc1tcIkJPUkRFUl9CT1hcIl0gPSBcImJvcmRlci1ib3hcIjtcbiAgICBSZXNpemVPYnNlcnZlckJveE9wdGlvbnNbXCJDT05URU5UX0JPWFwiXSA9IFwiY29udGVudC1ib3hcIjtcbiAgICBSZXNpemVPYnNlcnZlckJveE9wdGlvbnNbXCJERVZJQ0VfUElYRUxfQ09OVEVOVF9CT1hcIl0gPSBcImRldmljZS1waXhlbC1jb250ZW50LWJveFwiO1xufSkoUmVzaXplT2JzZXJ2ZXJCb3hPcHRpb25zIHx8IChSZXNpemVPYnNlcnZlckJveE9wdGlvbnMgPSB7fSkpO1xuXG52YXIgZnJlZXplID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gT2JqZWN0LmZyZWV6ZShvYmopOyB9O1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJTaXplID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlclNpemUoaW5saW5lU2l6ZSwgYmxvY2tTaXplKSB7XG4gICAgICAgIHRoaXMuaW5saW5lU2l6ZSA9IGlubGluZVNpemU7XG4gICAgICAgIHRoaXMuYmxvY2tTaXplID0gYmxvY2tTaXplO1xuICAgICAgICBmcmVlemUodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlclNpemU7XG59KCkpO1xuXG52YXIgRE9NUmVjdFJlYWRPbmx5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBET01SZWN0UmVhZE9ubHkoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnRvcCA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gdGhpcy54O1xuICAgICAgICB0aGlzLmJvdHRvbSA9IHRoaXMudG9wICsgdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMucmlnaHQgPSB0aGlzLmxlZnQgKyB0aGlzLndpZHRoO1xuICAgICAgICByZXR1cm4gZnJlZXplKHRoaXMpO1xuICAgIH1cbiAgICBET01SZWN0UmVhZE9ubHkucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgeCA9IF9hLngsIHkgPSBfYS55LCB0b3AgPSBfYS50b3AsIHJpZ2h0ID0gX2EucmlnaHQsIGJvdHRvbSA9IF9hLmJvdHRvbSwgbGVmdCA9IF9hLmxlZnQsIHdpZHRoID0gX2Eud2lkdGgsIGhlaWdodCA9IF9hLmhlaWdodDtcbiAgICAgICAgcmV0dXJuIHsgeDogeCwgeTogeSwgdG9wOiB0b3AsIHJpZ2h0OiByaWdodCwgYm90dG9tOiBib3R0b20sIGxlZnQ6IGxlZnQsIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcbiAgICB9O1xuICAgIERPTVJlY3RSZWFkT25seS5mcm9tUmVjdCA9IGZ1bmN0aW9uIChyZWN0YW5nbGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBET01SZWN0UmVhZE9ubHkocmVjdGFuZ2xlLngsIHJlY3RhbmdsZS55LCByZWN0YW5nbGUud2lkdGgsIHJlY3RhbmdsZS5oZWlnaHQpO1xuICAgIH07XG4gICAgcmV0dXJuIERPTVJlY3RSZWFkT25seTtcbn0oKSk7XG5cbnZhciBpc1NWRyA9IGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQgJiYgJ2dldEJCb3gnIGluIHRhcmdldDsgfTtcbnZhciBpc0hpZGRlbiA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBpZiAoaXNTVkcodGFyZ2V0KSkge1xuICAgICAgICB2YXIgX2EgPSB0YXJnZXQuZ2V0QkJveCgpLCB3aWR0aCA9IF9hLndpZHRoLCBoZWlnaHQgPSBfYS5oZWlnaHQ7XG4gICAgICAgIHJldHVybiAhd2lkdGggJiYgIWhlaWdodDtcbiAgICB9XG4gICAgdmFyIF9iID0gdGFyZ2V0LCBvZmZzZXRXaWR0aCA9IF9iLm9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgPSBfYi5vZmZzZXRIZWlnaHQ7XG4gICAgcmV0dXJuICEob2Zmc2V0V2lkdGggfHwgb2Zmc2V0SGVpZ2h0IHx8IHRhcmdldC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59O1xudmFyIGlzRWxlbWVudCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB2YXIgc2NvcGUgPSAoX2IgPSAoX2EgPSBvYmopID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vd25lckRvY3VtZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZGVmYXVsdFZpZXc7XG4gICAgcmV0dXJuICEhKHNjb3BlICYmIG9iaiBpbnN0YW5jZW9mIHNjb3BlLkVsZW1lbnQpO1xufTtcbnZhciBpc1JlcGxhY2VkRWxlbWVudCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBzd2l0Y2ggKHRhcmdldC50YWdOYW1lKSB7XG4gICAgICAgIGNhc2UgJ0lOUFVUJzpcbiAgICAgICAgICAgIGlmICh0YXJnZXQudHlwZSAhPT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlICdWSURFTyc6XG4gICAgICAgIGNhc2UgJ0FVRElPJzpcbiAgICAgICAgY2FzZSAnRU1CRUQnOlxuICAgICAgICBjYXNlICdPQkpFQ1QnOlxuICAgICAgICBjYXNlICdDQU5WQVMnOlxuICAgICAgICBjYXNlICdJRlJBTUUnOlxuICAgICAgICBjYXNlICdJTUcnOlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbnZhciBnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHt9O1xuXG52YXIgY2FjaGUgPSBuZXcgV2Vha01hcCgpO1xudmFyIHNjcm9sbFJlZ2V4cCA9IC9hdXRvfHNjcm9sbC87XG52YXIgdmVydGljYWxSZWdleHAgPSAvXnRifHZlcnRpY2FsLztcbnZhciBJRSA9ICgvbXNpZXx0cmlkZW50L2kpLnRlc3QoZ2xvYmFsLm5hdmlnYXRvciAmJiBnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG52YXIgcGFyc2VEaW1lbnNpb24gPSBmdW5jdGlvbiAocGl4ZWwpIHsgcmV0dXJuIHBhcnNlRmxvYXQocGl4ZWwgfHwgJzAnKTsgfTtcbnZhciBzaXplID0gZnVuY3Rpb24gKGlubGluZVNpemUsIGJsb2NrU2l6ZSwgc3dpdGNoU2l6ZXMpIHtcbiAgICBpZiAoaW5saW5lU2l6ZSA9PT0gdm9pZCAwKSB7IGlubGluZVNpemUgPSAwOyB9XG4gICAgaWYgKGJsb2NrU2l6ZSA9PT0gdm9pZCAwKSB7IGJsb2NrU2l6ZSA9IDA7IH1cbiAgICBpZiAoc3dpdGNoU2l6ZXMgPT09IHZvaWQgMCkgeyBzd2l0Y2hTaXplcyA9IGZhbHNlOyB9XG4gICAgcmV0dXJuIG5ldyBSZXNpemVPYnNlcnZlclNpemUoKHN3aXRjaFNpemVzID8gYmxvY2tTaXplIDogaW5saW5lU2l6ZSkgfHwgMCwgKHN3aXRjaFNpemVzID8gaW5saW5lU2l6ZSA6IGJsb2NrU2l6ZSkgfHwgMCk7XG59O1xudmFyIHplcm9Cb3hlcyA9IGZyZWV6ZSh7XG4gICAgZGV2aWNlUGl4ZWxDb250ZW50Qm94U2l6ZTogc2l6ZSgpLFxuICAgIGJvcmRlckJveFNpemU6IHNpemUoKSxcbiAgICBjb250ZW50Qm94U2l6ZTogc2l6ZSgpLFxuICAgIGNvbnRlbnRSZWN0OiBuZXcgRE9NUmVjdFJlYWRPbmx5KDAsIDAsIDAsIDApXG59KTtcbnZhciBjYWxjdWxhdGVCb3hTaXplcyA9IGZ1bmN0aW9uICh0YXJnZXQsIGZvcmNlUmVjYWxjdWxhdGlvbikge1xuICAgIGlmIChmb3JjZVJlY2FsY3VsYXRpb24gPT09IHZvaWQgMCkgeyBmb3JjZVJlY2FsY3VsYXRpb24gPSBmYWxzZTsgfVxuICAgIGlmIChjYWNoZS5oYXModGFyZ2V0KSAmJiAhZm9yY2VSZWNhbGN1bGF0aW9uKSB7XG4gICAgICAgIHJldHVybiBjYWNoZS5nZXQodGFyZ2V0KTtcbiAgICB9XG4gICAgaWYgKGlzSGlkZGVuKHRhcmdldCkpIHtcbiAgICAgICAgY2FjaGUuc2V0KHRhcmdldCwgemVyb0JveGVzKTtcbiAgICAgICAgcmV0dXJuIHplcm9Cb3hlcztcbiAgICB9XG4gICAgdmFyIGNzID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xuICAgIHZhciBzdmcgPSBpc1NWRyh0YXJnZXQpICYmIHRhcmdldC5vd25lclNWR0VsZW1lbnQgJiYgdGFyZ2V0LmdldEJCb3goKTtcbiAgICB2YXIgcmVtb3ZlUGFkZGluZyA9ICFJRSAmJiBjcy5ib3hTaXppbmcgPT09ICdib3JkZXItYm94JztcbiAgICB2YXIgc3dpdGNoU2l6ZXMgPSB2ZXJ0aWNhbFJlZ2V4cC50ZXN0KGNzLndyaXRpbmdNb2RlIHx8ICcnKTtcbiAgICB2YXIgY2FuU2Nyb2xsVmVydGljYWxseSA9ICFzdmcgJiYgc2Nyb2xsUmVnZXhwLnRlc3QoY3Mub3ZlcmZsb3dZIHx8ICcnKTtcbiAgICB2YXIgY2FuU2Nyb2xsSG9yaXpvbnRhbGx5ID0gIXN2ZyAmJiBzY3JvbGxSZWdleHAudGVzdChjcy5vdmVyZmxvd1ggfHwgJycpO1xuICAgIHZhciBwYWRkaW5nVG9wID0gc3ZnID8gMCA6IHBhcnNlRGltZW5zaW9uKGNzLnBhZGRpbmdUb3ApO1xuICAgIHZhciBwYWRkaW5nUmlnaHQgPSBzdmcgPyAwIDogcGFyc2VEaW1lbnNpb24oY3MucGFkZGluZ1JpZ2h0KTtcbiAgICB2YXIgcGFkZGluZ0JvdHRvbSA9IHN2ZyA/IDAgOiBwYXJzZURpbWVuc2lvbihjcy5wYWRkaW5nQm90dG9tKTtcbiAgICB2YXIgcGFkZGluZ0xlZnQgPSBzdmcgPyAwIDogcGFyc2VEaW1lbnNpb24oY3MucGFkZGluZ0xlZnQpO1xuICAgIHZhciBib3JkZXJUb3AgPSBzdmcgPyAwIDogcGFyc2VEaW1lbnNpb24oY3MuYm9yZGVyVG9wV2lkdGgpO1xuICAgIHZhciBib3JkZXJSaWdodCA9IHN2ZyA/IDAgOiBwYXJzZURpbWVuc2lvbihjcy5ib3JkZXJSaWdodFdpZHRoKTtcbiAgICB2YXIgYm9yZGVyQm90dG9tID0gc3ZnID8gMCA6IHBhcnNlRGltZW5zaW9uKGNzLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgICB2YXIgYm9yZGVyTGVmdCA9IHN2ZyA/IDAgOiBwYXJzZURpbWVuc2lvbihjcy5ib3JkZXJMZWZ0V2lkdGgpO1xuICAgIHZhciBob3Jpem9udGFsUGFkZGluZyA9IHBhZGRpbmdMZWZ0ICsgcGFkZGluZ1JpZ2h0O1xuICAgIHZhciB2ZXJ0aWNhbFBhZGRpbmcgPSBwYWRkaW5nVG9wICsgcGFkZGluZ0JvdHRvbTtcbiAgICB2YXIgaG9yaXpvbnRhbEJvcmRlckFyZWEgPSBib3JkZXJMZWZ0ICsgYm9yZGVyUmlnaHQ7XG4gICAgdmFyIHZlcnRpY2FsQm9yZGVyQXJlYSA9IGJvcmRlclRvcCArIGJvcmRlckJvdHRvbTtcbiAgICB2YXIgaG9yaXpvbnRhbFNjcm9sbGJhclRoaWNrbmVzcyA9ICFjYW5TY3JvbGxIb3Jpem9udGFsbHkgPyAwIDogdGFyZ2V0Lm9mZnNldEhlaWdodCAtIHZlcnRpY2FsQm9yZGVyQXJlYSAtIHRhcmdldC5jbGllbnRIZWlnaHQ7XG4gICAgdmFyIHZlcnRpY2FsU2Nyb2xsYmFyVGhpY2tuZXNzID0gIWNhblNjcm9sbFZlcnRpY2FsbHkgPyAwIDogdGFyZ2V0Lm9mZnNldFdpZHRoIC0gaG9yaXpvbnRhbEJvcmRlckFyZWEgLSB0YXJnZXQuY2xpZW50V2lkdGg7XG4gICAgdmFyIHdpZHRoUmVkdWN0aW9uID0gcmVtb3ZlUGFkZGluZyA/IGhvcml6b250YWxQYWRkaW5nICsgaG9yaXpvbnRhbEJvcmRlckFyZWEgOiAwO1xuICAgIHZhciBoZWlnaHRSZWR1Y3Rpb24gPSByZW1vdmVQYWRkaW5nID8gdmVydGljYWxQYWRkaW5nICsgdmVydGljYWxCb3JkZXJBcmVhIDogMDtcbiAgICB2YXIgY29udGVudFdpZHRoID0gc3ZnID8gc3ZnLndpZHRoIDogcGFyc2VEaW1lbnNpb24oY3Mud2lkdGgpIC0gd2lkdGhSZWR1Y3Rpb24gLSB2ZXJ0aWNhbFNjcm9sbGJhclRoaWNrbmVzcztcbiAgICB2YXIgY29udGVudEhlaWdodCA9IHN2ZyA/IHN2Zy5oZWlnaHQgOiBwYXJzZURpbWVuc2lvbihjcy5oZWlnaHQpIC0gaGVpZ2h0UmVkdWN0aW9uIC0gaG9yaXpvbnRhbFNjcm9sbGJhclRoaWNrbmVzcztcbiAgICB2YXIgYm9yZGVyQm94V2lkdGggPSBjb250ZW50V2lkdGggKyBob3Jpem9udGFsUGFkZGluZyArIHZlcnRpY2FsU2Nyb2xsYmFyVGhpY2tuZXNzICsgaG9yaXpvbnRhbEJvcmRlckFyZWE7XG4gICAgdmFyIGJvcmRlckJveEhlaWdodCA9IGNvbnRlbnRIZWlnaHQgKyB2ZXJ0aWNhbFBhZGRpbmcgKyBob3Jpem9udGFsU2Nyb2xsYmFyVGhpY2tuZXNzICsgdmVydGljYWxCb3JkZXJBcmVhO1xuICAgIHZhciBib3hlcyA9IGZyZWV6ZSh7XG4gICAgICAgIGRldmljZVBpeGVsQ29udGVudEJveFNpemU6IHNpemUoTWF0aC5yb3VuZChjb250ZW50V2lkdGggKiBkZXZpY2VQaXhlbFJhdGlvKSwgTWF0aC5yb3VuZChjb250ZW50SGVpZ2h0ICogZGV2aWNlUGl4ZWxSYXRpbyksIHN3aXRjaFNpemVzKSxcbiAgICAgICAgYm9yZGVyQm94U2l6ZTogc2l6ZShib3JkZXJCb3hXaWR0aCwgYm9yZGVyQm94SGVpZ2h0LCBzd2l0Y2hTaXplcyksXG4gICAgICAgIGNvbnRlbnRCb3hTaXplOiBzaXplKGNvbnRlbnRXaWR0aCwgY29udGVudEhlaWdodCwgc3dpdGNoU2l6ZXMpLFxuICAgICAgICBjb250ZW50UmVjdDogbmV3IERPTVJlY3RSZWFkT25seShwYWRkaW5nTGVmdCwgcGFkZGluZ1RvcCwgY29udGVudFdpZHRoLCBjb250ZW50SGVpZ2h0KVxuICAgIH0pO1xuICAgIGNhY2hlLnNldCh0YXJnZXQsIGJveGVzKTtcbiAgICByZXR1cm4gYm94ZXM7XG59O1xudmFyIGNhbGN1bGF0ZUJveFNpemUgPSBmdW5jdGlvbiAodGFyZ2V0LCBvYnNlcnZlZEJveCwgZm9yY2VSZWNhbGN1bGF0aW9uKSB7XG4gICAgdmFyIF9hID0gY2FsY3VsYXRlQm94U2l6ZXModGFyZ2V0LCBmb3JjZVJlY2FsY3VsYXRpb24pLCBib3JkZXJCb3hTaXplID0gX2EuYm9yZGVyQm94U2l6ZSwgY29udGVudEJveFNpemUgPSBfYS5jb250ZW50Qm94U2l6ZSwgZGV2aWNlUGl4ZWxDb250ZW50Qm94U2l6ZSA9IF9hLmRldmljZVBpeGVsQ29udGVudEJveFNpemU7XG4gICAgc3dpdGNoIChvYnNlcnZlZEJveCkge1xuICAgICAgICBjYXNlIFJlc2l6ZU9ic2VydmVyQm94T3B0aW9ucy5ERVZJQ0VfUElYRUxfQ09OVEVOVF9CT1g6XG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlUGl4ZWxDb250ZW50Qm94U2l6ZTtcbiAgICAgICAgY2FzZSBSZXNpemVPYnNlcnZlckJveE9wdGlvbnMuQk9SREVSX0JPWDpcbiAgICAgICAgICAgIHJldHVybiBib3JkZXJCb3hTaXplO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRCb3hTaXplO1xuICAgIH1cbn07XG5cbnZhciBSZXNpemVPYnNlcnZlckVudHJ5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckVudHJ5KHRhcmdldCkge1xuICAgICAgICB2YXIgYm94ZXMgPSBjYWxjdWxhdGVCb3hTaXplcyh0YXJnZXQpO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdCA9IGJveGVzLmNvbnRlbnRSZWN0O1xuICAgICAgICB0aGlzLmJvcmRlckJveFNpemUgPSBmcmVlemUoW2JveGVzLmJvcmRlckJveFNpemVdKTtcbiAgICAgICAgdGhpcy5jb250ZW50Qm94U2l6ZSA9IGZyZWV6ZShbYm94ZXMuY29udGVudEJveFNpemVdKTtcbiAgICAgICAgdGhpcy5kZXZpY2VQaXhlbENvbnRlbnRCb3hTaXplID0gZnJlZXplKFtib3hlcy5kZXZpY2VQaXhlbENvbnRlbnRCb3hTaXplXSk7XG4gICAgfVxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckVudHJ5O1xufSgpKTtcblxudmFyIGNhbGN1bGF0ZURlcHRoRm9yTm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKGlzSGlkZGVuKG5vZGUpKSB7XG4gICAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG4gICAgdmFyIGRlcHRoID0gMDtcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgZGVwdGggKz0gMTtcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBkZXB0aDtcbn07XG5cbnZhciBicm9hZGNhc3RBY3RpdmVPYnNlcnZhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNoYWxsb3dlc3REZXB0aCA9IEluZmluaXR5O1xuICAgIHZhciBjYWxsYmFja3MgPSBbXTtcbiAgICByZXNpemVPYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiBwcm9jZXNzT2JzZXJ2ZXIocm8pIHtcbiAgICAgICAgaWYgKHJvLmFjdGl2ZVRhcmdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJpZXMgPSBbXTtcbiAgICAgICAgcm8uYWN0aXZlVGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uIHByb2Nlc3NUYXJnZXQob3QpIHtcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IG5ldyBSZXNpemVPYnNlcnZlckVudHJ5KG90LnRhcmdldCk7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0RGVwdGggPSBjYWxjdWxhdGVEZXB0aEZvck5vZGUob3QudGFyZ2V0KTtcbiAgICAgICAgICAgIGVudHJpZXMucHVzaChlbnRyeSk7XG4gICAgICAgICAgICBvdC5sYXN0UmVwb3J0ZWRTaXplID0gY2FsY3VsYXRlQm94U2l6ZShvdC50YXJnZXQsIG90Lm9ic2VydmVkQm94KTtcbiAgICAgICAgICAgIGlmICh0YXJnZXREZXB0aCA8IHNoYWxsb3dlc3REZXB0aCkge1xuICAgICAgICAgICAgICAgIHNoYWxsb3dlc3REZXB0aCA9IHRhcmdldERlcHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gcmVzaXplT2JzZXJ2ZXJDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIHJvLmNhbGxiYWNrLmNhbGwocm8ub2JzZXJ2ZXIsIGVudHJpZXMsIHJvLm9ic2VydmVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJvLmFjdGl2ZVRhcmdldHMuc3BsaWNlKDAsIHJvLmFjdGl2ZVRhcmdldHMubGVuZ3RoKTtcbiAgICB9KTtcbiAgICBmb3IgKHZhciBfaSA9IDAsIGNhbGxiYWNrc18xID0gY2FsbGJhY2tzOyBfaSA8IGNhbGxiYWNrc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBjYWxsYmFja3NfMVtfaV07XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHJldHVybiBzaGFsbG93ZXN0RGVwdGg7XG59O1xuXG52YXIgZ2F0aGVyQWN0aXZlT2JzZXJ2YXRpb25zQXREZXB0aCA9IGZ1bmN0aW9uIChkZXB0aCkge1xuICAgIHJlc2l6ZU9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIHByb2Nlc3NPYnNlcnZlcihybykge1xuICAgICAgICByby5hY3RpdmVUYXJnZXRzLnNwbGljZSgwLCByby5hY3RpdmVUYXJnZXRzLmxlbmd0aCk7XG4gICAgICAgIHJvLnNraXBwZWRUYXJnZXRzLnNwbGljZSgwLCByby5za2lwcGVkVGFyZ2V0cy5sZW5ndGgpO1xuICAgICAgICByby5vYnNlcnZhdGlvblRhcmdldHMuZm9yRWFjaChmdW5jdGlvbiBwcm9jZXNzVGFyZ2V0KG90KSB7XG4gICAgICAgICAgICBpZiAob3QuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdGVEZXB0aEZvck5vZGUob3QudGFyZ2V0KSA+IGRlcHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvLmFjdGl2ZVRhcmdldHMucHVzaChvdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByby5za2lwcGVkVGFyZ2V0cy5wdXNoKG90KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxudmFyIHByb2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRlcHRoID0gMDtcbiAgICBnYXRoZXJBY3RpdmVPYnNlcnZhdGlvbnNBdERlcHRoKGRlcHRoKTtcbiAgICB3aGlsZSAoaGFzQWN0aXZlT2JzZXJ2YXRpb25zKCkpIHtcbiAgICAgICAgZGVwdGggPSBicm9hZGNhc3RBY3RpdmVPYnNlcnZhdGlvbnMoKTtcbiAgICAgICAgZ2F0aGVyQWN0aXZlT2JzZXJ2YXRpb25zQXREZXB0aChkZXB0aCk7XG4gICAgfVxuICAgIGlmIChoYXNTa2lwcGVkT2JzZXJ2YXRpb25zKCkpIHtcbiAgICAgICAgZGVsaXZlclJlc2l6ZUxvb3BFcnJvcigpO1xuICAgIH1cbiAgICByZXR1cm4gZGVwdGggPiAwO1xufTtcblxudmFyIHRyaWdnZXI7XG52YXIgY2FsbGJhY2tzID0gW107XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FsbGJhY2tzLnNwbGljZSgwKS5mb3JFYWNoKGZ1bmN0aW9uIChjYikgeyByZXR1cm4gY2IoKTsgfSk7IH07XG52YXIgcXVldWVNaWNyb1Rhc2sgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBpZiAoIXRyaWdnZXIpIHtcbiAgICAgICAgdmFyIHRvZ2dsZV8xID0gMDtcbiAgICAgICAgdmFyIGVsXzEgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgICAgIHZhciBjb25maWcgPSB7IGNoYXJhY3RlckRhdGE6IHRydWUgfTtcbiAgICAgICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKCkgeyByZXR1cm4gbm90aWZ5KCk7IH0pLm9ic2VydmUoZWxfMSwgY29uZmlnKTtcbiAgICAgICAgdHJpZ2dlciA9IGZ1bmN0aW9uICgpIHsgZWxfMS50ZXh0Q29udGVudCA9IFwiXCIgKyAodG9nZ2xlXzEgPyB0b2dnbGVfMS0tIDogdG9nZ2xlXzErKyk7IH07XG4gICAgfVxuICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB0cmlnZ2VyKCk7XG59O1xuXG52YXIgcXVldWVSZXNpemVPYnNlcnZlciA9IGZ1bmN0aW9uIChjYikge1xuICAgIHF1ZXVlTWljcm9UYXNrKGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpO1xuICAgIH0pO1xufTtcblxudmFyIHdhdGNoaW5nID0gMDtcbnZhciBpc1dhdGNoaW5nID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gISF3YXRjaGluZzsgfTtcbnZhciBDQVRDSF9QRVJJT0QgPSAyNTA7XG52YXIgb2JzZXJ2ZXJDb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9O1xudmFyIGV2ZW50cyA9IFtcbiAgICAncmVzaXplJyxcbiAgICAnbG9hZCcsXG4gICAgJ3RyYW5zaXRpb25lbmQnLFxuICAgICdhbmltYXRpb25lbmQnLFxuICAgICdhbmltYXRpb25zdGFydCcsXG4gICAgJ2FuaW1hdGlvbml0ZXJhdGlvbicsXG4gICAgJ2tleXVwJyxcbiAgICAna2V5ZG93bicsXG4gICAgJ21vdXNldXAnLFxuICAgICdtb3VzZWRvd24nLFxuICAgICdtb3VzZW92ZXInLFxuICAgICdtb3VzZW91dCcsXG4gICAgJ2JsdXInLFxuICAgICdmb2N1cydcbl07XG52YXIgdGltZSA9IGZ1bmN0aW9uICh0aW1lb3V0KSB7XG4gICAgaWYgKHRpbWVvdXQgPT09IHZvaWQgMCkgeyB0aW1lb3V0ID0gMDsgfVxuICAgIHJldHVybiBEYXRlLm5vdygpICsgdGltZW91dDtcbn07XG52YXIgc2NoZWR1bGVkID0gZmFsc2U7XG52YXIgU2NoZWR1bGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY2hlZHVsZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5zY2hlZHVsZSgpOyB9O1xuICAgIH1cbiAgICBTY2hlZHVsZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICh0aW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aW1lb3V0ID09PSB2b2lkIDApIHsgdGltZW91dCA9IENBVENIX1BFUklPRDsgfVxuICAgICAgICBpZiAoc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHVudGlsID0gdGltZSh0aW1lb3V0KTtcbiAgICAgICAgcXVldWVSZXNpemVPYnNlcnZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudHNIYXZlUmVzaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c0hhdmVSZXNpemVkID0gcHJvY2VzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHVudGlsIC0gdGltZSgpO1xuICAgICAgICAgICAgICAgIGlmICghaXNXYXRjaGluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzSGF2ZVJlc2l6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucnVuKDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aW1lb3V0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5ydW4odGltZW91dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTY2hlZHVsZXIucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgdGhpcy5ydW4oKTtcbiAgICB9O1xuICAgIFNjaGVkdWxlci5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGNiID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMub2JzZXJ2ZXIgJiYgX3RoaXMub2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCBvYnNlcnZlckNvbmZpZyk7IH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkgPyBjYigpIDogZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYik7XG4gICAgfTtcbiAgICBTY2hlZHVsZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5zdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLmxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZSgpO1xuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIF90aGlzLmxpc3RlbmVyLCB0cnVlKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNjaGVkdWxlci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLnN0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIgJiYgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgX3RoaXMubGlzdGVuZXIsIHRydWUpOyB9KTtcbiAgICAgICAgICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTY2hlZHVsZXI7XG59KCkpO1xudmFyIHNjaGVkdWxlciA9IG5ldyBTY2hlZHVsZXIoKTtcbnZhciB1cGRhdGVDb3VudCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgIXdhdGNoaW5nICYmIG4gPiAwICYmIHNjaGVkdWxlci5zdGFydCgpO1xuICAgIHdhdGNoaW5nICs9IG47XG4gICAgIXdhdGNoaW5nICYmIHNjaGVkdWxlci5zdG9wKCk7XG59O1xuXG52YXIgc2tpcE5vdGlmeU9uRWxlbWVudCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICByZXR1cm4gIWlzU1ZHKHRhcmdldClcbiAgICAgICAgJiYgIWlzUmVwbGFjZWRFbGVtZW50KHRhcmdldClcbiAgICAgICAgJiYgZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLmRpc3BsYXkgPT09ICdpbmxpbmUnO1xufTtcbnZhciBSZXNpemVPYnNlcnZhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0LCBvYnNlcnZlZEJveCkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGhpcy5vYnNlcnZlZEJveCA9IG9ic2VydmVkQm94IHx8IFJlc2l6ZU9ic2VydmVyQm94T3B0aW9ucy5DT05URU5UX0JPWDtcbiAgICAgICAgdGhpcy5sYXN0UmVwb3J0ZWRTaXplID0ge1xuICAgICAgICAgICAgaW5saW5lU2l6ZTogMCxcbiAgICAgICAgICAgIGJsb2NrU2l6ZTogMFxuICAgICAgICB9O1xuICAgIH1cbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzaXplID0gY2FsY3VsYXRlQm94U2l6ZSh0aGlzLnRhcmdldCwgdGhpcy5vYnNlcnZlZEJveCwgdHJ1ZSk7XG4gICAgICAgIGlmIChza2lwTm90aWZ5T25FbGVtZW50KHRoaXMudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5sYXN0UmVwb3J0ZWRTaXplID0gc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sYXN0UmVwb3J0ZWRTaXplLmlubGluZVNpemUgIT09IHNpemUuaW5saW5lU2l6ZVxuICAgICAgICAgICAgfHwgdGhpcy5sYXN0UmVwb3J0ZWRTaXplLmJsb2NrU2l6ZSAhPT0gc2l6ZS5ibG9ja1NpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBSZXNpemVPYnNlcnZhdGlvbjtcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlckRldGFpbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJEZXRhaWwocmVzaXplT2JzZXJ2ZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGFyZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnNraXBwZWRUYXJnZXRzID0gW107XG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25UYXJnZXRzID0gW107XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSByZXNpemVPYnNlcnZlcjtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJEZXRhaWw7XG59KCkpO1xuXG52YXIgb2JzZXJ2ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xudmFyIGdldE9ic2VydmF0aW9uSW5kZXggPSBmdW5jdGlvbiAob2JzZXJ2YXRpb25UYXJnZXRzLCB0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9ic2VydmF0aW9uVGFyZ2V0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAob2JzZXJ2YXRpb25UYXJnZXRzW2ldLnRhcmdldCA9PT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59O1xudmFyIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCkge1xuICAgIH1cbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuY29ubmVjdCA9IGZ1bmN0aW9uIChyZXNpemVPYnNlcnZlciwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGRldGFpbCA9IG5ldyBSZXNpemVPYnNlcnZlckRldGFpbChyZXNpemVPYnNlcnZlciwgY2FsbGJhY2spO1xuICAgICAgICBvYnNlcnZlck1hcC5zZXQocmVzaXplT2JzZXJ2ZXIsIGRldGFpbCk7XG4gICAgfTtcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIub2JzZXJ2ZSA9IGZ1bmN0aW9uIChyZXNpemVPYnNlcnZlciwgdGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBkZXRhaWwgPSBvYnNlcnZlck1hcC5nZXQocmVzaXplT2JzZXJ2ZXIpO1xuICAgICAgICB2YXIgZmlyc3RPYnNlcnZhdGlvbiA9IGRldGFpbC5vYnNlcnZhdGlvblRhcmdldHMubGVuZ3RoID09PSAwO1xuICAgICAgICBpZiAoZ2V0T2JzZXJ2YXRpb25JbmRleChkZXRhaWwub2JzZXJ2YXRpb25UYXJnZXRzLCB0YXJnZXQpIDwgMCkge1xuICAgICAgICAgICAgZmlyc3RPYnNlcnZhdGlvbiAmJiByZXNpemVPYnNlcnZlcnMucHVzaChkZXRhaWwpO1xuICAgICAgICAgICAgZGV0YWlsLm9ic2VydmF0aW9uVGFyZ2V0cy5wdXNoKG5ldyBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQsIG9wdGlvbnMgJiYgb3B0aW9ucy5ib3gpKTtcbiAgICAgICAgICAgIHVwZGF0ZUNvdW50KDEpO1xuICAgICAgICAgICAgc2NoZWR1bGVyLnNjaGVkdWxlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci51bm9ic2VydmUgPSBmdW5jdGlvbiAocmVzaXplT2JzZXJ2ZXIsIHRhcmdldCkge1xuICAgICAgICB2YXIgZGV0YWlsID0gb2JzZXJ2ZXJNYXAuZ2V0KHJlc2l6ZU9ic2VydmVyKTtcbiAgICAgICAgdmFyIGluZGV4ID0gZ2V0T2JzZXJ2YXRpb25JbmRleChkZXRhaWwub2JzZXJ2YXRpb25UYXJnZXRzLCB0YXJnZXQpO1xuICAgICAgICB2YXIgbGFzdE9ic2VydmF0aW9uID0gZGV0YWlsLm9ic2VydmF0aW9uVGFyZ2V0cy5sZW5ndGggPT09IDE7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBsYXN0T2JzZXJ2YXRpb24gJiYgcmVzaXplT2JzZXJ2ZXJzLnNwbGljZShyZXNpemVPYnNlcnZlcnMuaW5kZXhPZihkZXRhaWwpLCAxKTtcbiAgICAgICAgICAgIGRldGFpbC5vYnNlcnZhdGlvblRhcmdldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHVwZGF0ZUNvdW50KC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAocmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGRldGFpbCA9IG9ic2VydmVyTWFwLmdldChyZXNpemVPYnNlcnZlcik7XG4gICAgICAgIGRldGFpbC5vYnNlcnZhdGlvblRhcmdldHMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChvdCkgeyByZXR1cm4gX3RoaXMudW5vYnNlcnZlKHJlc2l6ZU9ic2VydmVyLCBvdC50YXJnZXQpOyB9KTtcbiAgICAgICAgZGV0YWlsLmFjdGl2ZVRhcmdldHMuc3BsaWNlKDAsIGRldGFpbC5hY3RpdmVUYXJnZXRzLmxlbmd0aCk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyO1xufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyJDEgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnUmVzaXplT2JzZXJ2ZXInOiAxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdSZXNpemVPYnNlcnZlcic6IFRoZSBjYWxsYmFjayBwcm92aWRlZCBhcyBwYXJhbWV0ZXIgMSBpcyBub3QgYSBmdW5jdGlvbi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmNvbm5lY3QodGhpcywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBSZXNpemVPYnNlcnZlci5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gZXhlY3V0ZSAnb2JzZXJ2ZScgb24gJ1Jlc2l6ZU9ic2VydmVyJzogMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRWxlbWVudCh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFpbGVkIHRvIGV4ZWN1dGUgJ29ic2VydmUnIG9uICdSZXNpemVPYnNlcnZlcic6IHBhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlICdFbGVtZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5vYnNlcnZlKHRoaXMsIHRhcmdldCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBSZXNpemVPYnNlcnZlci5wcm90b3R5cGUudW5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBleGVjdXRlICd1bm9ic2VydmUnIG9uICdSZXNpemVPYnNlcnZlcic6IDEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0VsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBleGVjdXRlICd1bm9ic2VydmUnIG9uICdSZXNpemVPYnNlcnZlcic6IHBhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlICdFbGVtZW50XCIpO1xuICAgICAgICB9XG4gICAgICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci51bm9ic2VydmUodGhpcywgdGFyZ2V0KTtcbiAgICB9O1xuICAgIFJlc2l6ZU9ic2VydmVyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZGlzY29ubmVjdCh0aGlzKTtcbiAgICB9O1xuICAgIFJlc2l6ZU9ic2VydmVyLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJ2Z1bmN0aW9uIFJlc2l6ZU9ic2VydmVyICgpIHsgW3BvbHlmaWxsIGNvZGVdIH0nO1xuICAgIH07XG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xufSgpKTtcblxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24gZXhlY3V0ZWRGdW5jdGlvbigpIHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiBsYXRlcigpIHtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgaWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfTtcblxuICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gIH07XG59XG5cbnZhciBSZXNpemVPYnNlcnZlciA9IHdpbmRvdy5SZXNpemVPYnNlcnZlciB8fCBSZXNpemVPYnNlcnZlciQxO1xuXG52YXIgTGlzdCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoTGlzdCwgX0V2ZW50RW1pdHRlcik7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihMaXN0KTtcblxuICBmdW5jdGlvbiBMaXN0KGRyYWdnYWJsZXMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGlzdCk7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIF90aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHRpbWVFbmQ6IDIwMCxcbiAgICAgIHRpbWVFeGNhbmdlOiA0MDAsXG4gICAgICByYWRpdXM6IDMwXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgX3RoaXMuY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXI7XG4gICAgX3RoaXMuZHJhZ2dhYmxlcyA9IGRyYWdnYWJsZXM7XG4gICAgX3RoaXMuY2hhbmdlZER1cmluZ0l0ZXJhdGlvbiA9IGZhbHNlO1xuICAgIF90aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKGRlYm91bmNlKF90aGlzLm9uUmVzaXplLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCAxMDApKTtcblxuICAgIGlmIChfdGhpcy5jb250YWluZXIpIHtcbiAgICAgIF90aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUoX3RoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBfdGhpcy5pbml0KCk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTGlzdCwgW3tcbiAgICBrZXk6IFwib25SZXNpemVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnJlb3JkZXJPbkNoYW5nZSkgdGhpcy5yZXNldCgpO1xuICAgICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuc3RhcnRQb3NpdGlvbmluZygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB0aGlzLl9lbmFibGUgPSB0cnVlO1xuICAgICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmluaXREcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbml0RHJhZ2dhYmxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXREcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgZHJhZ2dhYmxlLmVuYWJsZSA9IHRoaXMuX2VuYWJsZTtcbiAgICAgIGRyYWdnYWJsZS5vbignZHJhZzptb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLm9uTW92ZShkcmFnZ2FibGUpO1xuICAgICAgfSk7XG5cbiAgICAgIGRyYWdnYWJsZS5kcmFnRW5kQWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24oZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uLCBfdGhpczMub3B0aW9ucy50aW1lRW5kKTtcblxuICAgICAgICBfdGhpczMub25FbmQoZHJhZ2dhYmxlKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShkcmFnZ2FibGUuZWxlbWVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbGVhc2VEcmFnZ2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVsZWFzZURyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKGRyYWdnYWJsZS5lbGVtZW50KTtcbiAgICAgIGRyYWdnYWJsZS5yZXNldE9uKCdkcmFnOmVuZCcpO1xuICAgICAgZHJhZ2dhYmxlLnJlc2V0T24oJ2RyYWc6bW92ZScpO1xuICAgICAgcmVtb3ZlSXRlbSh0aGlzLmRyYWdnYWJsZXMsIGRyYWdnYWJsZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uTW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1vdmUoZHJhZ2dhYmxlKSB7XG4gICAgICB2YXIgc29ydGVkRHJhZ2dhYmxlcyA9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuICAgICAgdmFyIHBpbm5lZFBvc2l0aW9ucyA9IHNvcnRlZERyYWdnYWJsZXMubWFwKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbjtcbiAgICAgIH0pO1xuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHNvcnRlZERyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpO1xuICAgICAgdmFyIHRhcmdldEluZGV4ID0gaW5kZXhPZk5lYXJlc3RQb2ludChwaW5uZWRQb3NpdGlvbnMsIGRyYWdnYWJsZS5wb3NpdGlvbiwgdGhpcy5vcHRpb25zLnJhZGl1cywgdGhpcy5kaXN0YW5jZUZ1bmMpO1xuXG4gICAgICBpZiAodGFyZ2V0SW5kZXggIT09IC0xICYmIGN1cnJlbnRJbmRleCAhPT0gdGFyZ2V0SW5kZXgpIHtcbiAgICAgICAgaWYgKHRhcmdldEluZGV4IDwgY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IHRhcmdldEluZGV4OyBpIDwgY3VycmVudEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIHNvcnRlZERyYWdnYWJsZXNbaV0ucGluUG9zaXRpb24ocGlubmVkUG9zaXRpb25zW2kgKyAxXSwgdGhpcy5vcHRpb25zLnRpbWVFeGNhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgX2kgPSBjdXJyZW50SW5kZXg7IF9pIDwgdGFyZ2V0SW5kZXg7IF9pKyspIHtcbiAgICAgICAgICAgIHNvcnRlZERyYWdnYWJsZXNbX2kgKyAxXS5waW5Qb3NpdGlvbihwaW5uZWRQb3NpdGlvbnNbX2ldLCB0aGlzLm9wdGlvbnMudGltZUV4Y2FuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkcmFnZ2FibGUubmF0aXZlRHJhZ0FuZERyb3ApIHtcbiAgICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24ocGlubmVkUG9zaXRpb25zW3RhcmdldEluZGV4XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uID0gcGlubmVkUG9zaXRpb25zW3RhcmdldEluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlZER1cmluZ0l0ZXJhdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRW5kKGRyYWdnYWJsZSkge1xuICAgICAgaWYgKHRoaXMuY2hhbmdlZER1cmluZ0l0ZXJhdGlvbikge1xuICAgICAgICB0aGlzLmVtaXQoJ2xpc3Q6Y2hhbmdlJyk7XG4gICAgICAgIHRoaXMuY2hhbmdlZER1cmluZ0l0ZXJhdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVvcmRlck9uQ2hhbmdlICYmIHRoaXMub3B0aW9ucy5jb250YWluZXIpIHtcbiAgICAgICAgICB0aGlzLnJlb3JkZXJFbGVtZW50cyhkcmFnZ2FibGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlb3JkZXJFbGVtZW50c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW9yZGVyRWxlbWVudHMobW92ZWREcmFnZ2FibGUpIHtcbiAgICAgIHZhciBzb3J0ZWREcmFnZ2FibGVzID0gdGhpcy5nZXRTb3J0ZWREcmFnZ2FibGVzKCk7XG4gICAgICB2YXIgaW5kZXggPSBzb3J0ZWREcmFnZ2FibGVzLmluZGV4T2YobW92ZWREcmFnZ2FibGUpO1xuICAgICAgdmFyIG5leHQgPSBzb3J0ZWREcmFnZ2FibGVzW2luZGV4ICsgMV07XG4gICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmluc2VydEJlZm9yZShtb3ZlZERyYWdnYWJsZS5lbGVtZW50LCBuZXh0LmVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQobW92ZWREcmFnZ2FibGUuZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLnN0YXJ0UG9zaXRpb25pbmcoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5lbWl0KCdsaXN0OnJlb3JkZXJlZCcpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDdXJyZW50UGlubmVkUG9zaXRpb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEN1cnJlbnRQaW5uZWRQb3NpdGlvbnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUucGlubmVkUG9zaXRpb24uY2xvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRTb3J0ZWREcmFnZ2FibGVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNvcnRlZERyYWdnYWJsZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGVzLnNvcnQodGhpcy5zb3J0aW5nLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXNldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5yZXNldFBvc2l0aW9uVG9Jbml0aWFsKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVmcmVzaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkKGRyYWdnYWJsZXMpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICBpZiAoIShkcmFnZ2FibGVzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgIGRyYWdnYWJsZXMgPSBbZHJhZ2dhYmxlc107XG4gICAgICB9XG5cbiAgICAgIGRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBfdGhpczQuaW5pdERyYWdnYWJsZShkcmFnZ2FibGUpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmRyYWdnYWJsZXMgPSB0aGlzLmRyYWdnYWJsZXMuY29uY2F0KGRyYWdnYWJsZXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKGRyYWdnYWJsZXMpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB2YXIgaW5pdGlhbFBvc2l0aW9ucyA9IHRoaXMuZHJhZ2dhYmxlcy5tYXAoZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLmluaXRpYWxQb3NpdGlvbjtcbiAgICAgIH0pO1xuICAgICAgdmFyIGxpc3QgPSBbXTtcbiAgICAgIHZhciBzb3J0ZWREcmFnZ2FibGVzID0gdGhpcy5nZXRTb3J0ZWREcmFnZ2FibGVzKCk7XG5cbiAgICAgIGlmICghKGRyYWdnYWJsZXMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgZHJhZ2dhYmxlcyA9IFtkcmFnZ2FibGVzXTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzNS5yZWxlYXNlRHJhZ2dhYmxlKGRyYWdnYWJsZSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBqID0gMDtcbiAgICAgIHNvcnRlZERyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGlmIChfdGhpczUuZHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSkgIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiAhPT0gaW5pdGlhbFBvc2l0aW9uc1tqXSkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKGluaXRpYWxQb3NpdGlvbnNbal0sIF90aGlzNS5vcHRpb25zLnRpbWVFeGNhbmdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkcmFnZ2FibGUuaW5pdGlhbFBvc2l0aW9uID0gaW5pdGlhbFBvc2l0aW9uc1tqXTtcbiAgICAgICAgICBqKys7XG4gICAgICAgICAgbGlzdC5wdXNoKGRyYWdnYWJsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5kcmFnZ2FibGVzID0gbGlzdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xlYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzLnJlbW92ZSh0aGlzLmRyYWdnYWJsZXMuc2xpY2UoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlc3Ryb3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5kZXN0cm95KCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic29ydGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzb3J0aW5nKGRyYWdnYWJsZUEsIGRyYWdnYWJsZUIpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc29ydGluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvcnRpbmcoZHJhZ2dhYmxlQSwgZHJhZ2dhYmxlQik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlQS5waW5uZWRQb3NpdGlvbi55IDwgZHJhZ2dhYmxlQi5waW5uZWRQb3NpdGlvbi55KSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChkcmFnZ2FibGVBLnBpbm5lZFBvc2l0aW9uLnkgPiBkcmFnZ2FibGVCLnBpbm5lZFBvc2l0aW9uLnkpIHJldHVybiAxO1xuICAgICAgICBpZiAoZHJhZ2dhYmxlQS5waW5uZWRQb3NpdGlvbi54IDwgZHJhZ2dhYmxlQi5waW5uZWRQb3NpdGlvbi54KSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChkcmFnZ2FibGVBLnBpbm5lZFBvc2l0aW9uLnggPiBkcmFnZ2FibGVCLnBpbm5lZFBvc2l0aW9uLngpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGlzdGFuY2VGdW5jXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdldERpc3RhbmNlIHx8IGdldERpc3RhbmNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwb3NpdGlvbnNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRQaW5uZWRQb3NpdGlvbnMoKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHBvc2l0aW9ucykge1xuICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgIHZhciBtZXNzYWdlID0gJ3dyb25nIGFycmF5IGxlbmd0aCc7XG5cbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoKSB7XG4gICAgICAgIHBvc2l0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCwgaSkge1xuICAgICAgICAgIF90aGlzNi5kcmFnZ2FibGVzW2ldLnBpblBvc2l0aW9uKHBvaW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBtZXNzYWdlO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbmFibGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbmFibGU7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChlbmFibGUpIHtcbiAgICAgIHRoaXMuX2VuYWJsZSA9IGVuYWJsZTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgZHJhZ2dhYmxlLmVuYWJsZSA9IGVuYWJsZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcImZhY3RvcnlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmFjdG9yeShjb250YWluZXJFbGVtZW50LCBlbGVtZW50cykge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGRyYWdnYWJsZXMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEcmFnZ2FibGUoZWxlbWVudCwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXJFbGVtZW50XG4gICAgICAgIH0sIG9wdGlvbnMuZHJhZ2dhYmxlIHx8IHt9KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgTGlzdChkcmFnZ2FibGVzLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXJFbGVtZW50XG4gICAgICB9LCBvcHRpb25zLmxpc3QgfHwge30pKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTGlzdDtcbn0oRXZlbnRFbWl0dGVyKTtcblxudmFyIGFycmF5TW92ZSA9IGZ1bmN0aW9uIGFycmF5TW92ZShhcnJheSwgZnJvbSwgdG8pIHtcbiAgYXJyYXkuc3BsaWNlKHRvIDwgMCA/IGFycmF5Lmxlbmd0aCArIHRvIDogdG8sIDAsIGFycmF5LnNwbGljZShmcm9tLCAxKVswXSk7XG59O1xuXG52YXIgQnViYmxpbmdMaXN0ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfTGlzdCkge1xuICBfaW5oZXJpdHMoQnViYmxpbmdMaXN0LCBfTGlzdCk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihCdWJibGluZ0xpc3QpO1xuXG4gIGZ1bmN0aW9uIEJ1YmJsaW5nTGlzdCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnViYmxpbmdMaXN0KTtcblxuICAgIHJldHVybiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCdWJibGluZ0xpc3QsIFt7XG4gICAga2V5OiBcImF1dG9EZXRlY3RWZXJ0aWNhbEdhcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdXRvRGV0ZWN0VmVydGljYWxHYXAoKSB7XG4gICAgICBpZiAoIXRoaXMuX3ZlcnRpY2FsR2FwICYmICF0aGlzLm9wdGlvbnMudmVydGljYWxHYXAgJiYgdGhpcy5kcmFnZ2FibGVzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHZhciBzb3J0ZWQgPSB0aGlzLmdldFNvcnRlZERyYWdnYWJsZXMoKTtcbiAgICAgICAgdGhpcy5fdmVydGljYWxHYXAgPSBzb3J0ZWRbMV0ucGlubmVkUG9zaXRpb24ueSAtIHNvcnRlZFswXS5waW5uZWRQb3NpdGlvbi55IC0gc29ydGVkWzBdLmdldFNpemUoKS55O1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhdXRvRGV0ZWN0U3RhcnRQb3NpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdXRvRGV0ZWN0U3RhcnRQb3NpdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnYWJsZXMubGVuZ3RoID49IDEgJiYgIXRoaXMuc3RhcnRQb3NpdGlvbikge1xuICAgICAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSB0aGlzLmRyYWdnYWJsZXNbMF0ucGlubmVkUG9zaXRpb247XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluaXREcmFnZ2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdERyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIF9nZXQoX2dldFByb3RvdHlwZU9mKEJ1YmJsaW5nTGlzdC5wcm90b3R5cGUpLCBcImluaXREcmFnZ2FibGVcIiwgdGhpcykuY2FsbCh0aGlzLCBkcmFnZ2FibGUpO1xuXG4gICAgICBkcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5vbkRyYWdTdGFydChkcmFnZ2FibGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uRHJhZ1N0YXJ0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0KGRyYWdnYWJsZSkge1xuICAgICAgdGhpcy5hdXRvRGV0ZWN0VmVydGljYWxHYXAoKTtcbiAgICAgIHRoaXMuYXV0b0RldGVjdFN0YXJ0UG9zaXRpb24oKTtcbiAgICAgIHRoaXMuY2FjaGVkU29ydGVkRHJhZ2dhYmxlcyA9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuICAgICAgdGhpcy5pbmRleE9mQWN0aXZlRHJhZ2dhYmxlID0gdGhpcy5jYWNoZWRTb3J0ZWREcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25Nb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTW92ZShkcmFnZ2FibGUpIHtcbiAgICAgIHZhciBwcmV2RHJhZ2dhYmxlID0gdGhpcy5jYWNoZWRTb3J0ZWREcmFnZ2FibGVzW3RoaXMuaW5kZXhPZkFjdGl2ZURyYWdnYWJsZSAtIDFdO1xuICAgICAgdmFyIG5leHREcmFnZ2FibGUgPSB0aGlzLmNhY2hlZFNvcnRlZERyYWdnYWJsZXNbdGhpcy5pbmRleE9mQWN0aXZlRHJhZ2dhYmxlICsgMV07XG4gICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uO1xuICAgICAgdmFyIGN1cnJlbnRPcmRlcjtcbiAgICAgIHZhciB0YXJnZXRJbmRleDtcblxuICAgICAgaWYgKGRyYWdnYWJsZS51cERpcmVjdGlvbiAmJiBwcmV2RHJhZ2dhYmxlKSB7XG4gICAgICAgIGN1cnJlbnRPcmRlciA9IFtwcmV2RHJhZ2dhYmxlLCBkcmFnZ2FibGVdLm1hcChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgIHJldHVybiBkLnBpbm5lZFBvc2l0aW9uO1xuICAgICAgICB9KTtcbiAgICAgICAgdGFyZ2V0SW5kZXggPSBpbmRleE9mTmVhcmVzdFBvaW50KGN1cnJlbnRPcmRlciwgZHJhZ2dhYmxlLnBvc2l0aW9uLCAxMDAwMCwgdGhpcy5kaXN0YW5jZUZ1bmMpO1xuXG4gICAgICAgIGlmICh0YXJnZXRJbmRleCA9PT0gMCkge1xuICAgICAgICAgIGlmIChkcmFnZ2FibGUuc2hvdWxkVXNlTmF0aXZlRHJhZ0FuZERyb3AoKSkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKHByZXZEcmFnZ2FibGUucGlubmVkUG9zaXRpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmFnZ2FibGUucGlubmVkUG9zaXRpb24gPSBwcmV2RHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uLmNsb25lKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcHJldkRyYWdnYWJsZS5waW5Qb3NpdGlvbihuZXcgUG9pbnQoY3VycmVudFBvc2l0aW9uLngsIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbi55ICsgZHJhZ2dhYmxlLmdldFNpemUoKS55ICsgdGhpcy52ZXJ0aWNhbEdhcCksIHRoaXMub3B0aW9ucy50aW1lRXhjYW5nZSk7XG4gICAgICAgICAgYXJyYXlNb3ZlKHRoaXMuY2FjaGVkU29ydGVkRHJhZ2dhYmxlcywgdGhpcy5pbmRleE9mQWN0aXZlRHJhZ2dhYmxlLS0sIHRoaXMuaW5kZXhPZkFjdGl2ZURyYWdnYWJsZSk7XG4gICAgICAgICAgdGhpcy5vbk1vdmUoZHJhZ2dhYmxlKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZWREdXJpbmdJdGVyYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRyYWdnYWJsZS5kb3duRGlyZWN0aW9uICYmIG5leHREcmFnZ2FibGUpIHtcbiAgICAgICAgY3VycmVudE9yZGVyID0gW2RyYWdnYWJsZSwgbmV4dERyYWdnYWJsZV0ubWFwKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgcmV0dXJuIGQucGlubmVkUG9zaXRpb247XG4gICAgICAgIH0pO1xuICAgICAgICB0YXJnZXRJbmRleCA9IGluZGV4T2ZOZWFyZXN0UG9pbnQoY3VycmVudE9yZGVyLCBkcmFnZ2FibGUucG9zaXRpb24sIDEwMDAwLCB0aGlzLmRpc3RhbmNlRnVuYyk7XG5cbiAgICAgICAgaWYgKHRhcmdldEluZGV4ID09PSAxKSB7XG4gICAgICAgICAgbmV4dERyYWdnYWJsZS5waW5Qb3NpdGlvbihkcmFnZ2FibGUucGlubmVkUG9zaXRpb24sIHRoaXMub3B0aW9ucy50aW1lRXhjYW5nZSk7XG4gICAgICAgICAgdmFyIGRyYWdnYWJsZU5ld1Bvc2l0aW9uID0gbmV3IFBvaW50KG5leHREcmFnZ2FibGUucGlubmVkUG9zaXRpb24ueCwgbmV4dERyYWdnYWJsZS5waW5uZWRQb3NpdGlvbi55ICsgbmV4dERyYWdnYWJsZS5nZXRTaXplKCkueSArIHRoaXMudmVydGljYWxHYXApO1xuXG4gICAgICAgICAgaWYgKGRyYWdnYWJsZS5zaG91bGRVc2VOYXRpdmVEcmFnQW5kRHJvcCgpKSB7XG4gICAgICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24oZHJhZ2dhYmxlTmV3UG9zaXRpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmFnZ2FibGUucGlubmVkUG9zaXRpb24gPSBkcmFnZ2FibGVOZXdQb3NpdGlvbjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhcnJheU1vdmUodGhpcy5jYWNoZWRTb3J0ZWREcmFnZ2FibGVzLCB0aGlzLmluZGV4T2ZBY3RpdmVEcmFnZ2FibGUrKywgdGhpcy5pbmRleE9mQWN0aXZlRHJhZ2dhYmxlKTtcbiAgICAgICAgICB0aGlzLm9uTW92ZShkcmFnZ2FibGUpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlZER1cmluZ0l0ZXJhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYnViYmxpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYnViYmxpbmcoc29ydGVkRHJhZ2dhYmxlcywgY3VycmVudERyYWdnYWJsZSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSB0aGlzLnN0YXJ0UG9zaXRpb24uY2xvbmUoKTtcbiAgICAgIHNvcnRlZERyYWdnYWJsZXMgfHwgKHNvcnRlZERyYWdnYWJsZXMgPSB0aGlzLmdldFNvcnRlZERyYWdnYWJsZXMoKSk7XG4gICAgICBzb3J0ZWREcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICBpZiAoIWRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbi5jb21wYXJlKGN1cnJlbnRQb3NpdGlvbikpIHtcbiAgICAgICAgICBpZiAoZHJhZ2dhYmxlID09PSBjdXJyZW50RHJhZ2dhYmxlICYmICFjdXJyZW50RHJhZ2dhYmxlLnNob3VsZFVzZU5hdGl2ZURyYWdBbmREcm9wKCkpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbi5jbG9uZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBkcmFnZ2FibGUgPT09IGN1cnJlbnREcmFnZ2FibGUgPyAwIDogX3RoaXMyLm9wdGlvbnMudGltZUV4Y2FuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbi55ID0gY3VycmVudFBvc2l0aW9uLnkgKyBkcmFnZ2FibGUuZ2V0U2l6ZSgpLnkgKyBfdGhpczIudmVydGljYWxHYXA7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShkcmFnZ2FibGVzKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgaWYgKCEoZHJhZ2dhYmxlcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICBkcmFnZ2FibGVzID0gW2RyYWdnYWJsZXNdO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLnJlbGVhc2VEcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kcmFnZ2FibGVzID0gdGhpcy5kcmFnZ2FibGVzLmZpbHRlcihmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gIWRyYWdnYWJsZXMuaW5jbHVkZXMoZCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLnN0YXJ0UG9zaXRpb25pbmcoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5hdXRvRGV0ZWN0VmVydGljYWxHYXAoKTtcbiAgICAgICAgdGhpcy5hdXRvRGV0ZWN0U3RhcnRQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLmJ1YmJsaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRpc3RhbmNlRnVuY1wiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXREaXN0YW5jZSB8fCBnZXRZRGlmZmVyZW5jZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidmVydGljYWxHYXBcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudmVydGljYWxHYXApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy52ZXJ0aWNhbEdhcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXV0b0RldGVjdFZlcnRpY2FsR2FwKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbEdhcCB8fCAwO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoZ2FwVmFsdWUpIHtcbiAgICAgIHRoaXMub3B0aW9ucy52ZXJ0aWNhbEdhcCA9IGdhcFZhbHVlO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcImZhY3RvcnlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmFjdG9yeShjb250YWluZXJFbGVtZW50LCBlbGVtZW50cykge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGRyYWdnYWJsZXMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEcmFnZ2FibGUoZWxlbWVudCwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXJFbGVtZW50XG4gICAgICAgIH0sIG9wdGlvbnMuZHJhZ2dhYmxlIHx8IHt9KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgQnViYmxpbmdMaXN0KGRyYWdnYWJsZXMsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lckVsZW1lbnRcbiAgICAgIH0sIG9wdGlvbnMubGlzdCB8fCB7fSkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCdWJibGluZ0xpc3Q7XG59KExpc3QpO1xuXG5leHBvcnQgeyBCb3VuZCwgQm91bmRUb0FyYywgQm91bmRUb0NpcmNsZSwgQm91bmRUb0VsZW1lbnQsIEJvdW5kVG9MaW5lLCBCb3VuZFRvTGluZVgsIEJvdW5kVG9MaW5lWSwgQm91bmRUb1JlY3RhbmdsZSwgQnViYmxpbmdMaXN0LCBEcmFnZ2FibGUsIEZsb2F0TGVmdFN0cmF0ZWd5LCBGbG9hdFJpZ2h0U3RyYXRlZ3ksIExpc3QsIE5vdENyb3NzaW5nU3RyYXRlZ3ksIFBvaW50LCBSZWN0YW5nbGUsIFNjb3BlLCBUYXJnZXQsIGRlZmF1bHRTY29wZSwgZ2V0RGlzdGFuY2UsIGdldFhEaWZmZXJlbmNlLCBnZXRZRGlmZmVyZW5jZSwgaW5kZXhPZk5lYXJlc3RQb2ludCwgc2NvcGUsIHNjb3BlcywgdHJhbnNmb3JtZWRTcGFjZURpc3RhbmNlRmFjdG9yeSB9O1xuIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdkcmFnZWUnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmdsZURpZmYoYWxwaGEsIGJldGEpIHtcbiAgY29uc3QgbWluQW5nbGUgPSBNYXRoLm1pbihhbHBoYSwgYmV0YSlcbiAgY29uc3QgbWF4QW5nbGUgPSAgTWF0aC5tYXgoYWxwaGEsIGJldGEpXG4gIHJldHVybiBNYXRoLm1pbihtYXhBbmdsZSAtIG1pbkFuZ2xlLCBtaW5BbmdsZSArIE1hdGguUEkqMiAtIG1heEFuZ2xlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5nbGUocDEsIHAyKSB7XG4gIGNvbnN0IGRpZmYgPSBwMi5zdWIocDEpXG4gIHJldHVybiBub3JtYWxpemVBbmdsZShNYXRoLmF0YW4yKGRpZmYueSwgZGlmZi54KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvUmFkaWFuKGFuZ2xlKSB7XG4gIHJldHVybiAoKGFuZ2xlICUgMzYwKSAqIE1hdGguUEkgLyAxODApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RlZ3JlZShhbmdsZSkge1xuICByZXR1cm4gKGFuZ2xlICogMTgwIC8gTWF0aC5QSSkgJSAzNjBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kQW5nbGUobWluLCBtYXgsIHZhbCkge1xuICBsZXQgZG1pbiwgZG1heFxuICBpZiAobWluIDwgbWF4ICYmIHZhbCA+IG1pbiAmJiB2YWwgPCBtYXgpIHtcbiAgICByZXR1cm4gdmFsXG4gIH0gZWxzZSBpZiAobWF4IDwgbWluICYmICh2YWwgPCBtYXggfHwgdmFsID4gbWluKSkge1xuICAgIHJldHVybiB2YWxcbiAgfSBlbHNlIHtcbiAgICBkbWluID0gZ2V0QW5nbGVEaWZmKG1pbiwgdmFsKVxuICAgIGRtYXggPSBnZXRBbmdsZURpZmYobWF4LCB2YWwpXG4gICAgaWYgKGRtaW4gPCBkbWF4KSB7XG4gICAgICByZXR1cm4gbWluXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtYXhcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5lYXJlc3RBbmdsZShhcnIsIGFuZ2xlKSB7XG4gIGxldCBpLCB0ZW1wLCBkaWZmID0gTWF0aC5QSSAqIDIsIHZhbHVlXG4gIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoO2krKykge1xuICAgIHRlbXAgPSBnZXRBbmdsZURpZmYoYXJyW2ldLCBhbmdsZSlcbiAgICBpZiAoZGlmZiA8IHRlbXApIHtcbiAgICAgIGRpZmYgPSB0ZW1wXG4gICAgICB2YWx1ZSA9IGFycltpXVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUFuZ2xlKHZhbCkge1xuICB3aGlsZSAodmFsIDwgMCkge1xuICAgIHZhbCArPSAyICogTWF0aC5QSVxuICB9XG4gIHdoaWxlICh2YWwgPiAyICogTWF0aC5QSSkge1xuICAgIHZhbCAtPSAyICogTWF0aC5QSVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShhbmdsZSwgbGVuZ3RoLCBjZW50ZXIpIHtcbiAgY2VudGVyID0gY2VudGVyIHx8IG5ldyBQb2ludCgwLCAwKVxuICByZXR1cm4gY2VudGVyLmFkZChuZXcgUG9pbnQobGVuZ3RoICogTWF0aC5jb3MoYW5nbGUpLCBsZW5ndGggKiBNYXRoLnNpbihhbmdsZSkpKVxufVxuIiwiaW1wb3J0IGNyZWF0ZUNhbnZhcyBmcm9tICcuL3V0aWxzL2NyZWF0ZS1jYW52YXMnXG5pbXBvcnQge1xuICBEcmFnZ2FibGUsXG4gIFBvaW50LFxuICBSZWN0YW5nbGUsXG4gIEJvdW5kVG9MaW5lXG59IGZyb20gJ2RyYWdlZSdcblxuaW1wb3J0IHsgZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtIH0gZnJvbSAnLi9nZW9tZXRyeS9hbmdsZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaWRlciB7XG4gIGNvbnN0cnVjdG9yKGFyZWEsIGVsZW1lbnRzLCBvcHRpb25zPXt9KSB7XG4gICAgY29uc3QgYXJlYVJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudChhcmVhLCBhcmVhKVxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYW5nbGU6IDAsXG4gICAgICBkQW5nbGU6IDIgKiBNYXRoLlBJIC8gZWxlbWVudHMubGVuZ3RoLFxuICAgICAgY2VudGVyOiBhcmVhUmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgc3RhcnRSYWRpdXM6IDUwLFxuICAgICAgZW5kUmFkaXVzOiBhcmVhUmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICBzdHJva2VTdHlsZTogJyNmZjU1NzcnLFxuICAgICAgZmlsbFN0eWxlOiAncmdiYSgxNTAsMjU1LDUwLDAuOCknXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHRoaXMuYXJlYSA9IGFyZWFcbiAgICB0aGlzLmFyZWFSZWN0YW5nbGUgPSBhcmVhUmVjdGFuZ2xlXG4gICAgdGhpcy5pbml0KGVsZW1lbnRzKVxuICB9XG5cbiAgaW5pdChlbGVtZW50cykge1xuICAgIHRoaXMuY2FudmFzID0gY3JlYXRlQ2FudmFzKHRoaXMuYXJlYSwgdGhpcy5hcmVhUmVjdGFuZ2xlKVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcblxuICAgIHRoaXMuZHJhZ2dhYmxlcyA9IGVsZW1lbnRzLm1hcCgoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLm9wdGlvbnMuYW5nbGUgKyBpICogdGhpcy5vcHRpb25zLmRBbmdsZVxuICAgICAgY29uc3QgaGFsZlNpemUgPSBQb2ludC5lbGVtZW50U2l6ZShlbGVtZW50KS5tdWx0KDAuNSlcbiAgICAgIGNvbnN0IHN0YXJ0ID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCB0aGlzLm9wdGlvbnMuc3RhcnRSYWRpdXMsIHRoaXMub3B0aW9ucy5jZW50ZXIpLnN1YihoYWxmU2l6ZSlcbiAgICAgIGNvbnN0IGVuZCA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShhbmdsZSwgdGhpcy5vcHRpb25zLmVuZFJhZGl1cywgdGhpcy5vcHRpb25zLmNlbnRlcikuc3ViKGhhbGZTaXplKVxuXG4gICAgICByZXR1cm4gbmV3IERyYWdnYWJsZShlbGVtZW50LCB7XG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5hcmVhLFxuICAgICAgICBib3VuZDogQm91bmRUb0xpbmUuYm91bmRpbmcoc3RhcnQsIGVuZCksXG4gICAgICAgIHBvc2l0aW9uOiBzdGFydCxcbiAgICAgICAgb246IHtcbiAgICAgICAgICAnZHJhZzptb3ZlJzogKCkgPT4gdGhpcy5kcmF3KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdGhpcy5pc0luaXQgPSB0cnVlXG4gICAgdGhpcy5kcmF3KClcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5pdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueSlcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKClcblxuICAgIGxldCBwb2ludCA9IHRoaXMuZHJhZ2dhYmxlc1swXS5nZXRDZW50ZXIoKVxuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSlcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kcmFnZ2FibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwb2ludCA9IHRoaXMuZHJhZ2dhYmxlc1tpXS5nZXRDZW50ZXIoKVxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhwb2ludC54LCBwb2ludC55KVxuICAgIH1cbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKClcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5vcHRpb25zLmxpbmVXaWR0aFxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMub3B0aW9ucy5zdHJva2VTdHlsZVxuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKVxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlXG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5ldmVudHMgPSB7fVxuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vbikge1xuICAgICAgZm9yIChjb25zdCBbZXZlbnROYW1lLCBmbl0gb2YgT2JqZWN0LmVudHJpZXMob3B0aW9ucy5vbikpIHtcbiAgICAgICAgdGhpcy5vbihldmVudE5hbWUsIGZuKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVtaXQoZXZlbnROYW1lKSB7XG4gICAgdGhpcy5pbnRlcnJ1cHRlZCA9IGZhbHNlXG4gICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXG4gICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudE5hbWVdKSByZXR1cm5cblxuICAgIGZvciAoY29uc3QgZnVuYyBvZiB0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICBmdW5jLmFwcGx5KC4uLmFyZ3MpXG4gICAgICBpZiAodGhpcy5pbnRlcnJ1cHRlZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbnRlcnJ1cHQoKSB7XG4gICAgdGhpcy5pbnRlcnJ1cHRlZCA9IHRydWVcbiAgfVxuXG4gIG9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXVxuICAgIH1cblxuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbilcbiAgfVxuXG4gIHByZXBlbmRPbihldmVudE5hbWUsIGZuKSB7XG4gICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW11cbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnVuc2hpZnQoZm4pXG4gIH1cblxuICB1bnN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5pbmRleE9mKGZuKVxuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG5cbiAgcmVzZXRFbWl0dGVyICgpIHtcbiAgICB0aGlzLmV2ZW50cyA9IHt9XG4gIH1cblxuICByZXNldE9uKGV2ZW50TmFtZSkge1xuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmFnZ2FibGUsXG4gIEJvdW5kVG9BcmMsXG4gIFJlY3RhbmdsZVxufSBmcm9tICdkcmFnZWUnXG5cbmltcG9ydCB7XG4gIGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbSxcbiAgZ2V0QW5nbGUsXG4gIG5vcm1hbGl6ZUFuZ2xlXG59IGZyb20gJy4vZ2VvbWV0cnkvYW5nbGVzJ1xuXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4vRXZlbnRFbWl0dGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcmNTbGlkZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihhcmVhLCBlbGVtZW50LCBvcHRpb25zPXt9KSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICBjb25zdCBhcmVhUmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGFyZWEsIGFyZWEpXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBjZW50ZXI6IGFyZWFSZWN0YW5nbGUuZ2V0Q2VudGVyKCksXG4gICAgICByYWRpdXM6IGFyZWFSZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIHN0YXJ0QW5nbGU6IE1hdGguUEksXG4gICAgICBlbmRBbmdsZTogMCxcbiAgICAgIGFuZ2xlczogW01hdGguUEksIC1NYXRoLlBJIC8gNCwgMCwgTWF0aC5QSSAvIDQsIE1hdGguUEkgLyAyXSxcbiAgICAgIHRpbWU6IDUwMFxuICAgIH0sIG9wdGlvbnMpXG5cbiAgICB0aGlzLnNoaWZ0ZWRDZW50ZXIgPSB0aGlzLm9wdGlvbnMuY2VudGVyXG4gICAgdGhpcy5hcmVhID0gYXJlYVxuICAgIHRoaXMuaW5pdChlbGVtZW50KVxuICB9XG5cbiAgaW5pdChlbGVtZW50KSB7XG4gICAgY29uc3QgYW5nbGUgPSB0aGlzLm9wdGlvbnMuc3RhcnRBbmdsZVxuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKFxuICAgICAgYW5nbGUsXG4gICAgICB0aGlzLm9wdGlvbnMucmFkaXVzLFxuICAgICAgdGhpcy5zaGlmdGVkQ2VudGVyXG4gICAgKVxuXG4gICAgdGhpcy5hbmdsZSA9IGFuZ2xlXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgIGNvbnRhaW5lcjogdGhpcy5hcmVhLFxuICAgICAgYm91bmQ6IEJvdW5kVG9BcmMuYm91bmRpbmcoXG4gICAgICAgIHRoaXMuc2hpZnRlZENlbnRlcixcbiAgICAgICAgdGhpcy5vcHRpb25zLnJhZGl1cyxcbiAgICAgICAgdGhpcy5vcHRpb25zLnN0YXJ0QW5nbGUsXG4gICAgICAgIHRoaXMub3B0aW9ucy5lbmRBbmdsZVxuICAgICAgKSxcbiAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgIG9uOiB7XG4gICAgICAgICdkcmFnOm1vdmUnOiAoKSA9PiB0aGlzLmNoYW5nZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUFuZ2xlKCkge1xuICAgIHRoaXMuYW5nbGUgPSBnZXRBbmdsZSh0aGlzLnNoaWZ0ZWRDZW50ZXIsIHRoaXMuZHJhZ2dhYmxlLnBvc2l0aW9uKVxuICB9XG5cbiAgY2hhbmdlKCkge1xuICAgIHRoaXMudXBkYXRlQW5nbGUoKVxuICAgIC8vICAgICAgdmFyIGFuZ2xlID0gR2VvbWV0cnkuZ2V0TmVhcmVzdEFuZ2xlKHRoaXMub3B0aW9ucy5hbmdsZXMsIHRoaXMuYW5nbGUpO1xuICAgIC8vICAgICAgdGhpcy5zZXRBbmdsZShhbmdsZSx0aGlzLm9wdGlvbnMudGltZSk7XG4gICAgdGhpcy5lbWl0KCdhcmNzbGlkZXI6Y2hhbmdlJywgeyBhbmdsZTogdGhpcy5hbmdsZSB9KVxuICB9XG5cbiAgc2V0QW5nbGUoYW5nbGUsIHRpbWUpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShcbiAgICAgIHRoaXMuYW5nbGUsXG4gICAgICB0aGlzLm9wdGlvbnMucmFkaXVzLFxuICAgICAgdGhpcy5zaGlmdGVkQ2VudGVyXG4gICAgKVxuICAgIHRoaXMuYW5nbGUgPSBub3JtYWxpemVBbmdsZShhbmdsZSwgcG9zaXRpb24pXG4gICAgdGhpcy5kcmFnZ2FibGUucGluUG9zaXRpb24ocG9zaXRpb24sIHRpbWV8fDApXG4gICAgdGhpcy5lbWl0KCdhcmNzbGlkZXI6Y2hhbmdlJywgdGhpcy5hbmdsZSlcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgaWYgKHR5cGVvZiBzdG9wID09PSAndW5kZWZpbmVkJykge1xuICAgIHN0b3AgPSBzdGFydFxuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmICh0eXBlb2Ygc3RlcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzdGVwID0gMVxuICB9XG4gIGlmICgoc3RlcCA+IDAgJiYgc3RhcnQgPj0gc3RvcCkgfHwgKHN0ZXAgPCAwICYmIHN0YXJ0IDw9IHN0b3ApKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBzdGVwID4gMCA/IGkgPCBzdG9wIDogaSA+IHN0b3A7IGkgKz0gc3RlcCkge1xuICAgIHJlc3VsdC5wdXNoKGkpXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuIiwiaW1wb3J0IGNyZWF0ZUNhbnZhcyBmcm9tICcuL3V0aWxzL2NyZWF0ZS1jYW52YXMnXG5pbXBvcnQgcmFuZ2UgZnJvbSAnLi91dGlscy9yYW5nZSdcbmltcG9ydCB7XG4gIERyYWdnYWJsZSxcbiAgQm91bmRUb0FyYyxcbiAgUG9pbnQsXG4gIFJlY3RhbmdsZSxcbiAgZ2V0RGlzdGFuY2Vcbn0gZnJvbSAnZHJhZ2VlJ1xuXG5pbXBvcnQge1xuICB0b1JhZGlhbixcbiAgZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtLFxuICBnZXRBbmdsZSxcbiAgbm9ybWFsaXplQW5nbGVcbn0gZnJvbSAnLi9nZW9tZXRyeS9hbmdsZXMnXG5cbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9FdmVudEVtaXR0ZXInXG5cbmNvbnN0IHJuZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjI1NSlcbn1cblxuY29uc3QgdG9IZXhTdHJpbmcgPSBmdW5jdGlvbihkaWdpdCkge1xuICBsZXQgc3RyID0gZGlnaXQudG9TdHJpbmcoMTYpXG4gIHdoaWxlIChzdHIubGVuZ3RoIDwgMikge1xuICAgIHN0ciA9ICcwJyArIHN0clxuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gcmFuZG9tQ29sb3IoKSB7XG4gIHJldHVybiBgIyR7dG9IZXhTdHJpbmcocm5kKCkpfSR7dG9IZXhTdHJpbmcocm5kKCkpfSR7dG9IZXhTdHJpbmcocm5kKCkpfWBcbn1cblxuZnVuY3Rpb24gZ2V0QXJyYXlXaXRoQm91bmRJbmRleGVzKGluZGV4LCBsZW5ndGgpIHtcbiAgY29uc3QgcmV0SW5kZXhlcyA9IFtdXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICByZXRJbmRleGVzLnB1c2goaW5kZXgpXG4gICAgcmV0SW5kZXhlcy5wdXNoKChpbmRleCArIDEpICUgbGVuZ3RoKVxuICB9XG5cbiAgcmV0dXJuIHJldEluZGV4ZXNcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAoYXJlYSwgZWxlbWVudHMsIG9wdGlvbnM9e30pIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIGNvbnN0IGFyZWFSZWN0YW5nbGUgPSBSZWN0YW5nbGUuZnJvbUVsZW1lbnQoYXJlYSwgYXJlYSlcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNlbnRlcjogYXJlYVJlY3RhbmdsZS5nZXRDZW50ZXIoKSxcbiAgICAgIHJhZGl1czogYXJlYVJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgdG91Y2hSYWRpdXM6IGFyZWFSZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIGJvdW5kQW5nbGU6IE1hdGguUEkgLyA5LFxuICAgICAgZmlsbFN0eWxlczogcmFuZ2UoMCwgZWxlbWVudHMubGVuZ3RoKS5tYXAoKCkgPT4gcmFuZG9tQ29sb3IoKSksXG4gICAgICBpbml0QW5nbGVzOiByYW5nZSgtOTAsIDI3MCwgMzYwIC8gZWxlbWVudHMubGVuZ3RoKS5tYXAoKGFuZ2xlKSA9PiB0b1JhZGlhbihhbmdsZSkpLFxuICAgICAgbGltaXRJbWc6IG51bGwsXG4gICAgICBsaW1pdEltZ09mZnNldDogbmV3IFBvaW50KDAsIDApXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHRoaXMuYXJlYSA9IGFyZWFcbiAgICB0aGlzLmFyZWFSZWN0YW5nbGUgPSBhcmVhUmVjdGFuZ2xlXG4gICAgdGhpcy5pbml0KGVsZW1lbnRzKVxuICB9XG5cbiAgaW5pdChlbGVtZW50cykge1xuICAgIHRoaXMuY2FudmFzID0gY3JlYXRlQ2FudmFzKHRoaXMuYXJlYSwgdGhpcy5hcmVhUmVjdGFuZ2xlKVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLmRyYWdnYWJsZXMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5vcHRpb25zLmluaXRBbmdsZXNbaV1cbiAgICAgIGNvbnN0IGhhbGZTaXplID0gUG9pbnQuZWxlbWVudFNpemUoZWxlbWVudCkubXVsdCgwLjUpXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShcbiAgICAgICAgYW5nbGUsXG4gICAgICAgIHRoaXMub3B0aW9ucy50b3VjaFJhZGl1cyxcbiAgICAgICAgdGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmFyZWEsXG4gICAgICAgIGJvdW5kOiBCb3VuZFRvQXJjLmJvdW5kaW5nKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5jZW50ZXIuc3ViKGhhbGZTaXplKSxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMudG91Y2hSYWRpdXMsXG4gICAgICAgICAgdGhpcy5nZXRCb3VuZEFuZ2xlKGksIGZhbHNlKSxcbiAgICAgICAgICB0aGlzLmdldEJvdW5kQW5nbGUoaSwgdHJ1ZSlcbiAgICAgICAgKSxcbiAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICBvbjoge1xuICAgICAgICAgICdkcmFnOm1vdmUnOiAoKSA9PiB0aGlzLmRyYXcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmlzSW5pdCA9IHRydWVcbiAgICB0aGlzLmRyYXcoKVxuICB9XG5cbiAgdXBkYXRlQW5nbGVzKCkge1xuICAgIHRoaXMuYW5nbGVzID0gdGhpcy5kcmFnZ2FibGVzLm1hcCgoZHJhZ2dhYmxlKSA9PiB7XG4gICAgICBjb25zdCBoYWxmU2l6ZSA9IGRyYWdnYWJsZS5nZXRTaXplKCkubXVsdCgwLjUpXG4gICAgICByZXR1cm4gZ2V0QW5nbGUodGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpLCBkcmFnZ2FibGUucG9zaXRpb24pXG4gICAgfSlcbiAgfVxuXG4gIGdldEJvdW5kQW5nbGUoaW5kZXgsIGlzQ2xvc3NpbmcpIHtcbiAgICBjb25zdCBzaWduID0gaXNDbG9zc2luZyA/IDEgOiAtMVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGxldCBpID0gKGluZGV4ICsgc2lnbikgJSB0aGlzLmFuZ2xlcy5sZW5ndGhcbiAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICBpICs9IHRoaXMuYW5nbGVzLmxlbmd0aFxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZUFuZ2xlKHRoaXMuYW5nbGVzW2ldIC0gc2lnbiAqIHRoaXMub3B0aW9ucy5ib3VuZEFuZ2xlKVxuICAgIH1cbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5pdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVBbmdsZXMoKVxuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueSlcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaCgoX2RyYWdnYWJsZSwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0FyYyh0aGlzLmNvbnRleHQsIHRoaXMub3B0aW9ucy5jZW50ZXIsIHRoaXMub3B0aW9ucy5yYWRpdXMsIGluZGV4KVxuICAgIH0pXG5cbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaCgoX2RyYWdnYWJsZSwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0xpbWl0SW1nKGluZGV4KVxuICAgIH0pXG5cbiAgICB0aGlzLmVtaXQoJ2NoYXJ0OmRyYXcnKVxuICB9XG5cbiAgY3JlYXRlQ2xvbmUoZWxlbWVudCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzSW5pdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudChlbGVtZW50LCBlbGVtZW50KVxuICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNlbnRlcjogcmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgcmFkaXVzOiByZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIGZpbGxTdHlsZXM6IHRoaXMub3B0aW9ucy5maWxsU3R5bGVzXG4gICAgfSwgb3B0aW9ucylcblxuICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyhlbGVtZW50LCByZWN0YW5nbGUpXG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgY29uc3QgY2xvbmVPYmogPSB7XG4gICAgICBkcmF3OiAoKSA9PiB7XG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHJlY3RhbmdsZS5zaXplLngsIHJlY3RhbmdsZS5zaXplLnkpXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChfZHJhZ2dhYmxlLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHRoaXMuZHJhd0FyYyhjb250ZXh0LCBvcHRzLmNlbnRlciwgb3B0cy5yYWRpdXMsIGluZGV4KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBjbG9uZU9iai5kcmF3KClcbiAgICByZXR1cm4gY2xvbmVPYmpcbiAgfVxuXG4gIGdldEZpbGxTdHlsZShpbmRleCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmZpbGxTdHlsZXNbaW5kZXhdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF0gPSB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF0uY2FsbCh0aGlzKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbGxTdHlsZXNbaW5kZXhdXG4gIH1cblxuICBkcmF3QXJjKGNvbnRleHQsIGNlbnRlciwgcmFkaXVzLCBpbmRleCkge1xuICAgIGNvbnN0IHN0YXJ0QW5nbGUgPSB0aGlzLmFuZ2xlc1tpbmRleF1cbiAgICBjb25zdCBlbmRBbmdsZSA9IHRoaXMuYW5nbGVzWyhpbmRleCsxKSAlIHRoaXMuYW5nbGVzLmxlbmd0aF1cbiAgICBjb25zdCBjb2xvciA9IHRoaXMuZ2V0RmlsbFN0eWxlKGluZGV4KVxuXG4gICAgY29udGV4dC5iZWdpblBhdGgoKVxuICAgIGNvbnRleHQubW92ZVRvKGNlbnRlci54LCBjZW50ZXIueSlcbiAgICBjb250ZXh0LmFyYyhjZW50ZXIueCwgY2VudGVyLnksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGZhbHNlKVxuICAgIGNvbnRleHQubGluZVRvKGNlbnRlci54LCBjZW50ZXIueSlcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvclxuICAgIGNvbnRleHQuZmlsbCgpXG4gIH1cblxuICBkcmF3TGltaXRJbWcoaW5kZXgpIHtcbiAgICBsZXQgcG9pbnQsIGltZ1xuICAgIGlmICh0aGlzLm9wdGlvbnMubGltaXRJbWcpIHtcbiAgICAgIGltZyA9IHRoaXMub3B0aW9ucy5saW1pdEltZyBpbnN0YW5jZW9mIEFycmF5ID8gdGhpcy5vcHRpb25zLmxpbWl0SW1nW2luZGV4XSA6IHRoaXMub3B0aW9ucy5saW1pdEltZ1xuICAgIH1cblxuICAgIGlmIChpbWcpIHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gbm9ybWFsaXplQW5nbGUodGhpcy5hbmdsZXNbaW5kZXhdKVxuICAgICAgcG9pbnQgPSBuZXcgUG9pbnQoMCwgLWltZy5oZWlnaHQgLyAyKVxuICAgICAgcG9pbnQgPSBwb2ludC5hZGQodGhpcy5vcHRpb25zLmxpbWl0SW1nT2Zmc2V0KVxuICAgICAgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSh0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS54IC8gMiwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueSAvIDIpXG4gICAgICB0aGlzLmNvbnRleHQucm90YXRlKGFuZ2xlKVxuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWcsIHBvaW50LngsIHBvaW50LnkpXG4gICAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApXG4gICAgfVxuICB9XG5cbiAgZ2V0QW5nbGVzRGlmZigpIHtcbiAgICBjb25zdCBhbmdsZXMgPSB0aGlzLmFuZ2xlcy5zbGljZSgxKVxuICAgIGxldCBiYXNlQW5nbGUgPSB0aGlzLmFuZ2xlc1swXVxuXG4gICAgYW5nbGVzLnB1c2goYmFzZUFuZ2xlKVxuICAgIHJldHVybiBhbmdsZXMubWFwKChhbmdsZSkgPT4ge1xuICAgICAgY29uc3QgZGlmZkFuZ2xlID0gbm9ybWFsaXplQW5nbGUoYW5nbGUgLSBiYXNlQW5nbGUpXG4gICAgICBiYXNlQW5nbGUgPSBhbmdsZVxuICAgICAgcmV0dXJuIGRpZmZBbmdsZVxuICAgIH0pXG4gIH1cblxuICBnZXRQZXJjZW50KCkge1xuICAgIHJldHVybiB0aGlzLmdldEFuZ2xlc0RpZmYoKS5tYXAoKGRpZmZBbmdsZSkgPT4gZGlmZkFuZ2xlIC8gKDIgKiBNYXRoLlBJKSlcbiAgfVxuXG4gIGdldEFyY0Jpc2VjdHJpeHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QW5nbGVzRGlmZigpLm1hcCgoZGlmZkFuZ2xlLCBpKSA9PiB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplQW5nbGUodGhpcy5hbmdsZXNbaV0gKyBkaWZmQW5nbGUgLyAyKVxuICAgIH0pXG4gIH1cblxuICBnZXRBcmNPblBvaW50KHBvaW50KSB7XG4gICAgY29uc3QgYW5nbGUgPSBnZXRBbmdsZSh0aGlzLm9wdGlvbnMuY2VudGVyLCBwb2ludClcbiAgICBjb25zdCByYWRpdXMgPSBnZXREaXN0YW5jZSh0aGlzLm9wdGlvbnMuY2VudGVyLCBwb2ludClcblxuICAgIGlmIChyYWRpdXMgPiB0aGlzLm9wdGlvbnMucmFkaXVzKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG5cbiAgICBsZXQgb2Zmc2V0ID0gLTEsIGksIGpcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5hbmdsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChvZmZzZXQgPT09IC0xIHx8IHRoaXMuYW5nbGVzW29mZnNldF0gPiB0aGlzLmFuZ2xlc1tpXSkge1xuICAgICAgICBvZmZzZXQgPSBpXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGogPSBvZmZzZXQ7IGkgPCB0aGlzLmFuZ2xlcy5sZW5ndGg7IGkrKywgaiA9IChpICsgb2Zmc2V0KSAlIHRoaXMuYW5nbGVzLmxlbmd0aCkge1xuICAgICAgaWYgKGFuZ2xlIDwgdGhpcy5hbmdsZXNbal0pIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKC0taiA8IDApIHtcbiAgICAgIGogKz0gdGhpcy5hbmdsZXMubGVuZ3RoXG4gICAgfVxuICAgIHJldHVybiBqXG4gIH1cblxuICBzZXRBbmdsZXMoYW5nbGVzKSB7XG4gICAgdGhpcy5hbmdsZXMgPSBhbmdsZXNcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaCgoZHJhZ2dhYmxlLCBpKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9IHRoaXMuYW5nbGVzW2ldXG4gICAgICBjb25zdCBoYWxmU2l6ZSA9IGRyYWdnYWJsZS5nZXRTaXplKCkubXVsdCgwLjUpXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShcbiAgICAgICAgYW5nbGUsXG4gICAgICAgIHRoaXMub3B0aW9ucy50b3VjaFJhZGl1cyxcbiAgICAgICAgdGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpXG4gICAgICApXG5cbiAgICAgIGRyYWdnYWJsZS5tb3ZlQW5kU2F2ZShwb3NpdGlvbilcbiAgICB9KVxuICAgIHRoaXMuZHJhdygpXG4gIH1cblxuICBzZXRBY3RpdmVBcmMoaW5kZXgpIHtcbiAgICBjb25zdCBlbmFibGVJbmRleGVzID0gZ2V0QXJyYXlXaXRoQm91bmRJbmRleGVzKGluZGV4LCB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoKVxuICAgIHRoaXMuYWN0aXZlQXJjSW5kZXggPSBpbmRleFxuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChkcmFnZ2FibGUsIGkpID0+IHtcbiAgICAgIGRyYWdnYWJsZS5lbmFibGUgPSBlbmFibGVJbmRleGVzLmluZGV4T2YoaSkgIT09IC0xXG4gICAgfSlcbiAgICB0aGlzLmRyYXcoKVxuICB9XG59XG4iXSwibmFtZXMiOlsic2V0U3R5bGUiLCJlbGVtZW50Iiwic3R5bGUiLCJjc3NUZXh0Iiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJhcHBlbmRGaXJzdENoaWxkIiwibm9kZSIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUNhbnZhcyIsImFyZWEiLCJyZWN0YWdsZSIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIndpbmRvdyIsImdldENvbXB1dGVkU3R5bGUiLCJwb3NpdGlvbiIsInNldEF0dHJpYnV0ZSIsInNpemUiLCJ4IiwieSIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCIsIkV2ZW50RW1pdHRlciIsImdldEFuZ2xlIiwibm9ybWFsaXplQW5nbGUiLCJnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0iLCJyYW5nZSIsInAxIiwicDIiLCJkaWZmIiwic3ViIiwiTWF0aCIsImF0YW4yIiwidG9SYWRpYW4iLCJhbmdsZSIsIlBJIiwidmFsIiwibGVuZ3RoIiwiY2VudGVyIiwiUG9pbnQiLCJhZGQiLCJjb3MiLCJzaW4iLCJTcGlkZXIiLCJlbGVtZW50cyIsIm9wdGlvbnMiLCJfY2xhc3NDYWxsQ2hlY2siLCJhcmVhUmVjdGFuZ2xlIiwiUmVjdGFuZ2xlIiwiZnJvbUVsZW1lbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJkQW5nbGUiLCJnZXRDZW50ZXIiLCJzdGFydFJhZGl1cyIsImVuZFJhZGl1cyIsImdldE1pblNpZGUiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsImZpbGxTdHlsZSIsImluaXQiLCJfY3JlYXRlQ2xhc3MiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImRyYWdnYWJsZXMiLCJtYXAiLCJpIiwiaGFsZlNpemUiLCJlbGVtZW50U2l6ZSIsIm11bHQiLCJzdGFydCIsImVuZCIsIkRyYWdnYWJsZSIsImNvbnRhaW5lciIsImJvdW5kIiwiQm91bmRUb0xpbmUiLCJib3VuZGluZyIsIm9uIiwiZHJhdyIsImlzSW5pdCIsImNsZWFyUmVjdCIsImJlZ2luUGF0aCIsInBvaW50IiwibW92ZVRvIiwibGluZVRvIiwiY2xvc2VQYXRoIiwic3Ryb2tlIiwiZmlsbCIsImV2ZW50cyIsImVudHJpZXMiLCJfc2xpY2VkVG9BcnJheSIsImV2ZW50TmFtZSIsImZuIiwiaW50ZXJydXB0ZWQiLCJhcmdzIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJmdW5jIiwiYXBwbHkiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJwdXNoIiwidW5zaGlmdCIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsIkFyY1NsaWRlciIsIl9pbmhlcml0cyIsIl9jcmVhdGVTdXBlciIsInJhZGl1cyIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsImFuZ2xlcyIsInRpbWUiLCJzaGlmdGVkQ2VudGVyIiwiZHJhZ2dhYmxlIiwiQm91bmRUb0FyYyIsImNoYW5nZSIsInVwZGF0ZUFuZ2xlIiwiZW1pdCIsInBpblBvc2l0aW9uIiwic3RvcCIsInN0ZXAiLCJyZXN1bHQiLCJybmQiLCJyb3VuZCIsInJhbmRvbSIsInRvSGV4U3RyaW5nIiwiZGlnaXQiLCJzdHIiLCJ0b1N0cmluZyIsInJhbmRvbUNvbG9yIiwiZ2V0QXJyYXlXaXRoQm91bmRJbmRleGVzIiwicmV0SW5kZXhlcyIsIkNoYXJ0IiwidG91Y2hSYWRpdXMiLCJib3VuZEFuZ2xlIiwiZmlsbFN0eWxlcyIsImluaXRBbmdsZXMiLCJsaW1pdEltZyIsImxpbWl0SW1nT2Zmc2V0IiwiZ2V0Qm91bmRBbmdsZSIsImdldFNpemUiLCJpc0Nsb3NzaW5nIiwic2lnbiIsInVwZGF0ZUFuZ2xlcyIsImZvckVhY2giLCJfZHJhZ2dhYmxlIiwiZHJhd0FyYyIsImRyYXdMaW1pdEltZyIsInJlY3RhbmdsZSIsIm9wdHMiLCJjbG9uZU9iaiIsImNvbG9yIiwiZ2V0RmlsbFN0eWxlIiwiYXJjIiwiaW1nIiwiQXJyYXkiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJkcmF3SW1hZ2UiLCJzZXRUcmFuc2Zvcm0iLCJiYXNlQW5nbGUiLCJkaWZmQW5nbGUiLCJnZXRBbmdsZXNEaWZmIiwiZ2V0RGlzdGFuY2UiLCJvZmZzZXQiLCJqIiwibW92ZUFuZFNhdmUiLCJlbmFibGVJbmRleGVzIiwiYWN0aXZlQXJjSW5kZXgiLCJlbmFibGUiXSwi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QixNQUFNLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2RSxLQUFLO0VBQ0wsR0FBRyxFQUFFO0VBQ0wsSUFBSSxHQUFHLEVBQUUsV0FBVztFQUNwQixJQUFJLEtBQUssRUFBRSxTQUFTLFNBQVMsR0FBRztFQUNoQyxNQUFNLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwRCxLQUFLO0VBQ0wsR0FBRyxFQUFFO0VBQ0wsSUFBSSxHQUFHLEVBQUUsSUFBSTtFQUNiLElBQUksS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRTtFQUM3QixNQUFNLElBQUksUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2SCxNQUFNLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7RUFDekwsTUFBTSxPQUFPLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUMzQyxLQUFLO0VBQ0wsR0FBRyxFQUFFO0VBQ0wsSUFBSSxHQUFHLEVBQUUsS0FBSztFQUNkLElBQUksS0FBSyxFQUFFLFNBQVMsR0FBRyxDQUFDLElBQUksRUFBRTtFQUM5QixNQUFNLElBQUksUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2SCxNQUFNLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekw7RUFDQSxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDdEMsUUFBUSxP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RSxTQUFTLFNBQVMsR0FBRztFQUNoQyxNQUFNLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDdkMsS0FBSztFQUNMLEdBQUcsRUFBRTtFQUNMLElBQUksR0FBRyxFQUFFLFlBQVk7RUFDckIsSUFBSSxLQUFLLEVBQUUsU0FBUyxVQUFVLENBQUMsRUFBRSxFQUFFO0VBQ25DLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQy9DLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0VBQzdDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0VBQzVDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0VBQzFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0VBQzNDLEtBQUs7RUFDTCxHQUFHLEVBQUU7RUFDTCxJQUFJLEdBQUcsRUFBRSxRQUFRO0VBQ2pCLElBQUksS0FBSyxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRTtFQUNqQyxNQUFNLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDdEMsTUFBTSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3pELEtBQUs7RUFDTCxHQUFHLEVBQUU7RUFDTCxJQUFJLEdBQUcs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QUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7RUFDcEIsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMzQixHQUFHO0VBQ0gsQ0FBQztFQUNELFNBQVMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQzlCLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxQyxNQUFNLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQ3JDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQ3ZDLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7RUFDdEIsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxD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QUFnQixDQUFDLENBQUM7QUFDOUM7RUFDQSxFQUFFLFNBQVMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFO0VBQ3ZDLElBQUksSUFBSSxLQUFLLENBQUM7QUFDZDtFQUNBLElBQUksZUFBZSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVDO0VBQ0EsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM5QixJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0VBQ2hDLElBQUksT0FBTyxLQUFLLENBQUM7RUFDakIsR0FBRztBQUNIO0VBQ0EsRUFBRSxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztFQUNsQyxJQUFJLEdBQUcsRUFBRSxPQUFPO0VBQ2hCLElBQUksS0FBSyxFQUFFLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7RUFDdkMsTUFBTSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDcEMsTUFBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzFDO0VBQ0EsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFO0VBQ25ELFFBQVEsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDaEQsT0FBTztBQUNQO0VBQ0EsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFO0VBQ25ELFFBQVEsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDaEQsT0FBTztBQUNQO0VBQ0EsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJ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
