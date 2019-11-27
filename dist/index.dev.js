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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
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

  function isNativeReflectConstruct() {
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
    if (isNativeReflectConstruct()) {
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

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit$1(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

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

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function getSumValueOfStyleRules(element, rules) {
    return rules.reduce(function (sum, rule) {
      return sum + parseInt(window.getComputedStyle(element)[rule] || 0);
    }, 0);
  }
  /** Class representing a point. */


  var Point =
  /*#__PURE__*/
  function () {
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

  var Rectangle =
  /*#__PURE__*/
  function () {
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

  var EventEmitter =
  /*#__PURE__*/
  function () {
    function EventEmitter(context) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck$1(this, EventEmitter);

      this.context = context || this;
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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.events[eventName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var func = _step.value;
            func.apply(this.context, args);

            if (this.interrupted) {
              return;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
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

  var Bound =
  /*#__PURE__*/
  function () {
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
  var BoundToRectangle =
  /*#__PURE__*/
  function (_Bound) {
    _inherits$1(BoundToRectangle, _Bound);

    function BoundToRectangle(rectangle) {
      var _this;

      _classCallCheck$1(this, BoundToRectangle);

      _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(BoundToRectangle).call(this));
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
  var BoundToElement =
  /*#__PURE__*/
  function (_BoundToRectangle) {
    _inherits$1(BoundToElement, _BoundToRectangle);

    function BoundToElement(element, container) {
      var _this2;

      _classCallCheck$1(this, BoundToElement);

      _this2 = _possibleConstructorReturn$1(this, _getPrototypeOf$1(BoundToElement).call(this, Rectangle.fromElement(element, container)));
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
  var BoundToLine =
  /*#__PURE__*/
  function (_Bound4) {
    _inherits$1(BoundToLine, _Bound4);

    function BoundToLine(startPoint, endPoint) {
      var _this5;

      _classCallCheck$1(this, BoundToLine);

      _this5 = _possibleConstructorReturn$1(this, _getPrototypeOf$1(BoundToLine).call(this));
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
  var BoundToCircle =
  /*#__PURE__*/
  function (_Bound5) {
    _inherits$1(BoundToCircle, _Bound5);

    function BoundToCircle(center, radius) {
      var _this6;

      _classCallCheck$1(this, BoundToCircle);

      _this6 = _possibleConstructorReturn$1(this, _getPrototypeOf$1(BoundToCircle).call(this));
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
  var BoundToArc =
  /*#__PURE__*/
  function (_BoundToCircle) {
    _inherits$1(BoundToArc, _BoundToCircle);

    function BoundToArc(center, radius, startAngle, endAngle) {
      var _this7;

      _classCallCheck$1(this, BoundToArc);

      _this7 = _possibleConstructorReturn$1(this, _getPrototypeOf$1(BoundToArc).call(this, center, radius));
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

  var BasicStrategy =
  /*#__PURE__*/
  function () {
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

  var FloatLeftStrategy =
  /*#__PURE__*/
  function (_BasicStrategy2) {
    _inherits$1(FloatLeftStrategy, _BasicStrategy2);

    function FloatLeftStrategy(rectangle) {
      var _this2;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck$1(this, FloatLeftStrategy);

      _this2 = _possibleConstructorReturn$1(this, _getPrototypeOf$1(FloatLeftStrategy).call(this, rectangle, options));
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

  var Target =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits$1(Target, _EventEmitter);

    function Target(element, draggables) {
      var _this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck$1(this, Target);

      _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(Target).call(this, undefined, options));

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

      _this.init();

      return _this;
    }

    _createClass$1(Target, [{
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
        var includePoint = this.getRectangle().includePoint(draggable.getPosition());

        if (!includePoint) {
          if (this.getRectangle().includePoint(draggable.getCenter())) {
            draggable.position = draggable.getCenter().clone();
          } else {
            return false;
          }
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
  Target.emitter = new EventEmitter(Target);
  Target.emitter.on('target:create', addToDefaultScope);

  var scopes = [];

  var Scope =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits$1(Scope, _EventEmitter);

    function Scope(draggables, targets) {
      var _this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck$1(this, Scope);

      _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(Scope).call(this, undefined, options));
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

  var isTouch = 'ontouchstart' in window;
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

  var Draggable =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits$1(Draggable, _EventEmitter);

    function Draggable(element) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck$1(this, Draggable);

      _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(Draggable).call(this, undefined, options));
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

        this.handler.addEventListener(touchEvents.start, this._dragStart, isSupportPassiveEvents ? {
          passive: false
        } : false);
        this.handler.addEventListener(mouseEvents.start, this._dragStart, isSupportPassiveEvents ? {
          passive: false
        } : false);
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
            document.addEventListener(mouseEvents.end, this._nativeDragEnd, isSupportPassiveEvents ? {
              passive: false
            } : false);
          }
        } else {
          document.addEventListener(touchEvents.move, this._dragMove, isSupportPassiveEvents ? {
            passive: false
          } : false);
          document.addEventListener(mouseEvents.move, this._dragMove, isSupportPassiveEvents ? {
            passive: false
          } : false);
          document.addEventListener(touchEvents.end, this._dragEnd, isSupportPassiveEvents ? {
            passive: false
          } : false);
          document.addEventListener(mouseEvents.end, this._dragEnd, isSupportPassiveEvents ? {
            passive: false
          } : false);
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
  Draggable.emitter = new EventEmitter(Draggable);
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

  var Spider =
  /*#__PURE__*/
  function () {
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

  var EventEmitter$1 =
  /*#__PURE__*/
  function () {
    function EventEmitter(context) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, EventEmitter);

      this.context = context || this;
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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.events[eventName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var func = _step.value;
            func.apply(this.context, args);

            if (this.interrupted) {
              return;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
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

  var ArcSlider =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(ArcSlider, _EventEmitter);

    function ArcSlider(area, element) {
      var _this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, ArcSlider);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ArcSlider).call(this, undefined, options));
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

  var Chart =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(Chart, _EventEmitter);

    function Chart(area, elements) {
      var _this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, Chart);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Chart).call(this, undefined, options));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZGV2LmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvY3JlYXRlLWNhbnZhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9kcmFnZWUvZGlzdC9pbmRleC5lc20uanMiLCIuLi9zcmMvZ2VvbWV0cnkvYW5nbGVzLmpzIiwiLi4vc3JjL3NwaWRlci5qcyIsIi4uL3NyYy9FdmVudEVtaXR0ZXIuanMiLCIuLi9zcmMvYXJjc2xpZGVyLmpzIiwiLi4vc3JjL3V0aWxzL3JhbmdlLmpzIiwiLi4vc3JjL2NoYXJ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gIHN0eWxlID0gc3R5bGUgfHwge31cbiAgbGV0IGNzc1RleHQgPSAnJ1xuICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZSkge1xuICAgIGlmIChzdHlsZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjc3NUZXh0ICs9IGtleSArICc6ICcgKyBzdHlsZVtrZXldICsgJzsgJ1xuICAgIH1cbiAgfVxuXG4gIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGNzc1RleHRcbn1cblxuZnVuY3Rpb24gYXBwZW5kRmlyc3RDaGlsZChlbGVtZW50LCBub2RlKSB7XG4gIGlmIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50Lmluc2VydEJlZm9yZShub2RlLCBlbGVtZW50LmZpcnN0Q2hpbGQpXG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChub2RlKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyhhcmVhLCByZWN0YWdsZSkge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUoYXJlYSkucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgYXJlYS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgfVxuXG4gIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgcmVjdGFnbGUuc2l6ZS54ICsgJ3B4JylcbiAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgcmVjdGFnbGUuc2l6ZS55ICsgJ3B4JylcbiAgc2V0U3R5bGUoY2FudmFzLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgbGVmdDogcmVjdGFnbGUucG9zaXRpb24ueSArICdweCcsXG4gICAgdG9wOiByZWN0YWdsZS5wb3NpdGlvbi55ICsgJ3B4JyxcbiAgICB3aWR0aDogcmVjdGFnbGUuc2l6ZS54ICsgJ3B4JyxcbiAgICBoZWlnaHQ6IHJlY3RhZ2xlLnNpemUueSArICdweCdcbiAgfSlcbiAgYXBwZW5kRmlyc3RDaGlsZChhcmVhLCBjYW52YXMpXG4gIHJldHVybiBjYW52YXNcbn1cbiIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxuZnVuY3Rpb24gaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7XG4gIGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7XG5cbiAgdHJ5IHtcbiAgICBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICBpZiAoaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkpIHtcbiAgICBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3Q7XG4gIH0gZWxzZSB7XG4gICAgX2NvbnN0cnVjdCA9IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICAgICAgdmFyIGEgPSBbbnVsbF07XG4gICAgICBhLnB1c2guYXBwbHkoYSwgYXJncyk7XG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFBhcmVudCwgYSk7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTtcbiAgICAgIGlmIChDbGFzcykgX3NldFByb3RvdHlwZU9mKGluc3RhbmNlLCBDbGFzcy5wcm90b3R5cGUpO1xuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2NvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbmZ1bmN0aW9uIF9zdXBlclByb3BCYXNlKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgd2hpbGUgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICBvYmplY3QgPSBfZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICBpZiAob2JqZWN0ID09PSBudWxsKSBicmVhaztcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59XG5cbmZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIFJlZmxlY3QuZ2V0KSB7XG4gICAgX2dldCA9IFJlZmxlY3QuZ2V0O1xuICB9IGVsc2Uge1xuICAgIF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICB2YXIgYmFzZSA9IF9zdXBlclByb3BCYXNlKHRhcmdldCwgcHJvcGVydHkpO1xuXG4gICAgICBpZiAoIWJhc2UpIHJldHVybjtcbiAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBwcm9wZXJ0eSk7XG5cbiAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICByZXR1cm4gZGVzYy5nZXQuY2FsbChyZWNlaXZlcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlciB8fCB0YXJnZXQpO1xufVxuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIGlmICghKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5mdW5jdGlvbiBnZXRTdW1WYWx1ZU9mU3R5bGVSdWxlcyhlbGVtZW50LCBydWxlcykge1xuICByZXR1cm4gcnVsZXMucmVkdWNlKGZ1bmN0aW9uIChzdW0sIHJ1bGUpIHtcbiAgICByZXR1cm4gc3VtICsgcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbcnVsZV0gfHwgMCk7XG4gIH0sIDApO1xufVxuLyoqIENsYXNzIHJlcHJlc2VudGluZyBhIHBvaW50LiAqL1xuXG5cbnZhciBQb2ludCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAqIENyZWF0ZSBhIHBvaW50LlxuICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHggdmFsdWUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeSB2YWx1ZS5cbiAgKi9cbiAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb2ludCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUG9pbnQsIFt7XG4gICAga2V5OiBcImFkZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGQocCkge1xuICAgICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKyBwLngsIHRoaXMueSArIHAueSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN1YlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdWIocCkge1xuICAgICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggLSBwLngsIHRoaXMueSAtIHAueSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm11bHRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbXVsdChrKSB7XG4gICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCAqIGssIHRoaXMueSAqIGspO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuZWdhdGl2ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBuZWdhdGl2ZSgpIHtcbiAgICAgIHJldHVybiBuZXcgUG9pbnQoLXRoaXMueCwgLXRoaXMueSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBhcmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcGFyZShwKSB7XG4gICAgICByZXR1cm4gdGhpcy54ID09PSBwLnggJiYgdGhpcy55ID09PSBwLnk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsb25lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRvU3RyaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIFwie3g9XCIuY29uY2F0KHRoaXMueCwgXCIseT1cIikuY29uY2F0KHRoaXMueSk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwiZWxlbWVudE9mZnNldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbGVtZW50T2Zmc2V0KGVsZW1lbnQsIHBhcmVudCkge1xuICAgICAgcGFyZW50ID0gcGFyZW50IHx8IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIHZhciBlbGVtZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgcGFyZW50UmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHJldHVybiBuZXcgUG9pbnQoZWxlbWVudFJlY3QubGVmdCAtIHBhcmVudFJlY3QubGVmdCwgZWxlbWVudFJlY3QudG9wIC0gcGFyZW50UmVjdC50b3ApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbGVtZW50U2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbGVtZW50U2l6ZShlbGVtZW50KSB7XG4gICAgICB2YXIgaXNDb250ZW50Qm94U2l6ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG4gICAgICB2YXIgd2lkdGggPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVsnd2lkdGgnXSk7XG4gICAgICB2YXIgaGVpZ2h0ID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbJ2hlaWdodCddKTtcblxuICAgICAgaWYgKCFpc0NvbnRlbnRCb3hTaXplKSB7XG4gICAgICAgIHdpZHRoICs9IGdldFN1bVZhbHVlT2ZTdHlsZVJ1bGVzKGVsZW1lbnQsIFsncGFkZGluZy1sZWZ0JywgJ3BhZGRpbmctcmlnaHQnLCAnYm9yZGVyLWxlZnQtd2lkdGgnLCAnYm9yZGVyLXJpZ2h0LXdpZHRoJ10pO1xuICAgICAgICBoZWlnaHQgKz0gZ2V0U3VtVmFsdWVPZlN0eWxlUnVsZXMoZWxlbWVudCwgWydwYWRkaW5nLXRvcCcsICdwYWRkaW5nLWJvdHRvbScsICdib3JkZXItdG9wLXdpZHRoJywgJ2JvcmRlci1ib3R0b20td2lkdGgnXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUG9pbnQod2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBvaW50O1xufSgpO1xuXG52YXIgUmVjdGFuZ2xlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUmVjdGFuZ2xlKHBvc2l0aW9uLCBzaXplKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlY3RhbmdsZSk7XG5cbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhSZWN0YW5nbGUsIFt7XG4gICAga2V5OiBcImdldFAxXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFAxKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFAyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFAyKCkge1xuICAgICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UDNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UDMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy5zaXplKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UDRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UDQoKSB7XG4gICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDZW50ZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VudGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24uYWRkKHRoaXMuc2l6ZS5tdWx0KDAuNSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvcihyZWN0KSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBuZXcgUG9pbnQoTWF0aC5taW4odGhpcy5wb3NpdGlvbi54LCByZWN0LnBvc2l0aW9uLngpLCBNYXRoLm1pbih0aGlzLnBvc2l0aW9uLnksIHJlY3QucG9zaXRpb24ueSkpO1xuICAgICAgdmFyIHNpemUgPSBuZXcgUG9pbnQoTWF0aC5tYXgodGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLngsIHJlY3QucG9zaXRpb24ueCArIHJlY3Quc2l6ZS54KSwgTWF0aC5tYXgodGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnksIHJlY3QucG9zaXRpb24ueSArIHJlY3Quc2l6ZS55KSkuc3ViKHBvc2l0aW9uKTtcbiAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHBvc2l0aW9uLCBzaXplKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFuZChyZWN0KSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBuZXcgUG9pbnQoTWF0aC5tYXgodGhpcy5wb3NpdGlvbi54LCByZWN0LnBvc2l0aW9uLngpLCBNYXRoLm1heCh0aGlzLnBvc2l0aW9uLnksIHJlY3QucG9zaXRpb24ueSkpO1xuICAgICAgdmFyIHNpemUgPSBuZXcgUG9pbnQoTWF0aC5taW4odGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLngsIHJlY3QucG9zaXRpb24ueCArIHJlY3Quc2l6ZS54KSwgTWF0aC5taW4odGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnksIHJlY3QucG9zaXRpb24ueSArIHJlY3Quc2l6ZS55KSkuc3ViKHBvc2l0aW9uKTtcblxuICAgICAgaWYgKHNpemUueCA8PSAwIHx8IHNpemUueSA8PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShwb3NpdGlvbiwgc2l6ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluY2x1ZGVQb2ludFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmNsdWRlUG9pbnQocCkge1xuICAgICAgcmV0dXJuICEodGhpcy5wb3NpdGlvbi54ID4gcC54IHx8IHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS54IDwgcC54IHx8IHRoaXMucG9zaXRpb24ueSA+IHAueSB8fCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUueSA8IHAueSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluY2x1ZGVSZWN0YW5nbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5jbHVkZVJlY3RhbmdsZShyZWN0YW5nbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmluY2x1ZGVQb2ludChyZWN0YW5nbGUucG9zaXRpb24pICYmIHRoaXMuaW5jbHVkZVBvaW50KHJlY3RhbmdsZS5nZXRQMygpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibW92ZVRvQm91bmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZVRvQm91bmQocmVjdCwgYXhpcykge1xuICAgICAgdmFyIHNlbEF4aXMsIGNyb3NzUmVjdGFuZ2xlO1xuXG4gICAgICBpZiAoYXhpcykge1xuICAgICAgICBzZWxBeGlzID0gYXhpcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyb3NzUmVjdGFuZ2xlID0gdGhpcy5hbmQocmVjdCk7XG5cbiAgICAgICAgaWYgKCFjcm9zc1JlY3RhbmdsZSkge1xuICAgICAgICAgIHJldHVybiByZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsQXhpcyA9IGNyb3NzUmVjdGFuZ2xlLnNpemUueCA+IGNyb3NzUmVjdGFuZ2xlLnNpemUueSA/ICd5JyA6ICd4JztcbiAgICAgIH1cblxuICAgICAgdmFyIHRoaXNDZW50ZXIgPSB0aGlzLmdldENlbnRlcigpO1xuICAgICAgdmFyIHJlY3RDZW50ZXIgPSByZWN0LmdldENlbnRlcigpO1xuICAgICAgdmFyIHNpZ24gPSB0aGlzQ2VudGVyW3NlbEF4aXNdID4gcmVjdENlbnRlcltzZWxBeGlzXSA/IC0xIDogMTtcbiAgICAgIHZhciBvZmZzZXQgPSBzaWduID4gMCA/IHRoaXMucG9zaXRpb25bc2VsQXhpc10gKyB0aGlzLnNpemVbc2VsQXhpc10gLSByZWN0LnBvc2l0aW9uW3NlbEF4aXNdIDogdGhpcy5wb3NpdGlvbltzZWxBeGlzXSAtIChyZWN0LnBvc2l0aW9uW3NlbEF4aXNdICsgcmVjdC5zaXplW3NlbEF4aXNdKTtcbiAgICAgIHJlY3QucG9zaXRpb25bc2VsQXhpc10gPSByZWN0LnBvc2l0aW9uW3NlbEF4aXNdICsgb2Zmc2V0O1xuICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFNxdWFyZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTcXVhcmUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaXplLnggKiB0aGlzLnNpemUueTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3R5bGVBcHBseVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdHlsZUFwcGx5KGVsKSB7XG4gICAgICBlbCA9IGVsIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2luZCcpO1xuICAgICAgZWwuc3R5bGUubGVmdCA9IHRoaXMucG9zaXRpb24ueCArICdweCc7XG4gICAgICBlbC5zdHlsZS50b3AgPSB0aGlzLnBvc2l0aW9uLnkgKyAncHgnO1xuICAgICAgZWwuc3R5bGUud2lkdGggPSB0aGlzLnNpemUueCArICdweCc7XG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSB0aGlzLnNpemUueSArICdweCc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3d0aFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm93dGgoc2l6ZSkge1xuICAgICAgdGhpcy5zaXplID0gdGhpcy5zaXplLmFkZChzaXplKTtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZChzaXplLm11bHQoLTAuNSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRNaW5TaWRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldE1pblNpZGUoKSB7XG4gICAgICByZXR1cm4gTWF0aC5taW4odGhpcy5zaXplLngsIHRoaXMuc2l6ZS55KTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJmcm9tRWxlbWVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICB2YXIgcGFyZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB2YXIgaXNDb250ZW50Qm94U2l6ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICB2YXIgaXNDb25zaWRlclRyYW5zbGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogZmFsc2U7XG4gICAgICB2YXIgcG9zaXRpb24gPSBQb2ludC5lbGVtZW50T2Zmc2V0KGVsZW1lbnQsIHBhcmVudCwgaXNDb25zaWRlclRyYW5zbGF0ZSk7XG4gICAgICB2YXIgc2l6ZSA9IFBvaW50LmVsZW1lbnRTaXplKGVsZW1lbnQsIGlzQ29udGVudEJveFNpemUpO1xuICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUocG9zaXRpb24sIHNpemUpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBSZWN0YW5nbGU7XG59KCk7XG5cbmZ1bmN0aW9uIGhhc0NsYXNzKGVsZW1lbnQsIGMpIHtcbiAgdmFyIHJlID0gbmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIGMgKyAnKFxcXFxzfCQpJywgJ2cnKTtcbiAgcmV0dXJuIHJlLnRlc3QoZWxlbWVudC5jbGFzc05hbWUpO1xufVxuZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgYykge1xuICBpZiAoIWhhc0NsYXNzKGVsZW1lbnQsIGMpKSB7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAoZWxlbWVudC5jbGFzc05hbWUgKyAnICcgKyBjKS5yZXBsYWNlKC9cXHMrL2csICcgJykucmVwbGFjZSgvKF4gfCAkKS9nLCAnJyk7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGMpIHtcbiAgdmFyIHJlID0gbmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIGMgKyAnKFxcXFxzfCQpJywgJ2cnKTtcbiAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKHJlLCAnJDEnKS5yZXBsYWNlKC9cXHMrL2csICcgJykucmVwbGFjZSgvKF4gfCAkKS9nLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRDb250YWluZXIoZWxlbWVudCkge1xuICB2YXIgY29udGFpbmVyID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXG4gIHdoaWxlIChjb250YWluZXIucGFyZW50Tm9kZSAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpWydwb3NpdGlvbiddID09PSAnc3RhdGljJyAmJiBjb250YWluZXIudGFnTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgY29udGFpbmVyID0gY29udGFpbmVyLnBhcmVudE5vZGU7XG4gIH1cblxuICByZXR1cm4gY29udGFpbmVyO1xufVxuXG52YXIgRXZlbnRFbWl0dGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKGNvbnRleHQpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRFbWl0dGVyKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQgfHwgdGhpcztcbiAgICB0aGlzLmV2ZW50cyA9IHt9O1xuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vbikge1xuICAgICAgZm9yICh2YXIgX2kgPSAwLCBfT2JqZWN0JGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhvcHRpb25zLm9uKTsgX2kgPCBfT2JqZWN0JGVudHJpZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBfT2JqZWN0JGVudHJpZXMkX2kgPSBfc2xpY2VkVG9BcnJheShfT2JqZWN0JGVudHJpZXNbX2ldLCAyKSxcbiAgICAgICAgICAgIGV2ZW50TmFtZSA9IF9PYmplY3QkZW50cmllcyRfaVswXSxcbiAgICAgICAgICAgIGZuID0gX09iamVjdCRlbnRyaWVzJF9pWzFdO1xuXG4gICAgICAgIHRoaXMub24oZXZlbnROYW1lLCBmbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEV2ZW50RW1pdHRlciwgW3tcbiAgICBrZXk6IFwiZW1pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbWl0KGV2ZW50TmFtZSkge1xuICAgICAgdGhpcy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHJldHVybjtcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBmdW5jID0gX3N0ZXAudmFsdWU7XG4gICAgICAgICAgZnVuYy5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3MpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuaW50ZXJydXB0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybiAhPSBudWxsKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImludGVycnVwdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbnRlcnJ1cHQoKSB7XG4gICAgICB0aGlzLmludGVycnVwdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnROYW1lLCBmbikge1xuICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJlcGVuZE9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZXBlbmRPbihldmVudE5hbWUsIGZuKSB7XG4gICAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnVuc2hpZnQoZm4pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1bnN1YnNjcmliZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bnN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmluZGV4T2YoZm4pO1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlc2V0RW1pdHRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldEVtaXR0ZXIoKSB7XG4gICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXNldE9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2V0T24oZXZlbnROYW1lKSB7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW107XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbn0oKTtcblxuZnVuY3Rpb24gY3JlYXRlQ29tbW9uanNNb2R1bGUoZm4sIG1vZHVsZSkge1xuXHRyZXR1cm4gbW9kdWxlID0geyBleHBvcnRzOiB7fSB9LCBmbihtb2R1bGUsIG1vZHVsZS5leHBvcnRzKSwgbW9kdWxlLmV4cG9ydHM7XG59XG5cbnZhciBnZXRTdHlsZVByb3BlcnR5ID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuLyohXG4gKiBnZXRTdHlsZVByb3BlcnR5IHYxLjAuNFxuICogb3JpZ2luYWwgYnkga2FuZ2F4XG4gKiBodHRwOi8vcGVyZmVjdGlvbmtpbGxzLmNvbS9mZWF0dXJlLXRlc3RpbmctY3NzLXByb3BlcnRpZXMvXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgdW5kZWY6IHRydWUgKi9cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIGV4cG9ydHM6IGZhbHNlLCBtb2R1bGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdyApIHtcblxudmFyIHByZWZpeGVzID0gJ1dlYmtpdCBNb3ogbXMgTXMgTycuc3BsaXQoJyAnKTtcbnZhciBkb2NFbGVtU3R5bGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cbmZ1bmN0aW9uIGdldFN0eWxlUHJvcGVydHkoIHByb3BOYW1lICkge1xuICBpZiAoICFwcm9wTmFtZSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyB0ZXN0IHN0YW5kYXJkIHByb3BlcnR5IGZpcnN0XG4gIGlmICggdHlwZW9mIGRvY0VsZW1TdHlsZVsgcHJvcE5hbWUgXSA9PT0gJ3N0cmluZycgKSB7XG4gICAgcmV0dXJuIHByb3BOYW1lO1xuICB9XG5cbiAgLy8gY2FwaXRhbGl6ZVxuICBwcm9wTmFtZSA9IHByb3BOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcE5hbWUuc2xpY2UoMSk7XG5cbiAgLy8gdGVzdCB2ZW5kb3Igc3BlY2lmaWMgcHJvcGVydGllc1xuICB2YXIgcHJlZml4ZWQ7XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IHByZWZpeGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHByZWZpeGVkID0gcHJlZml4ZXNbaV0gKyBwcm9wTmFtZTtcbiAgICBpZiAoIHR5cGVvZiBkb2NFbGVtU3R5bGVbIHByZWZpeGVkIF0gPT09ICdzdHJpbmcnICkge1xuICAgICAgcmV0dXJuIHByZWZpeGVkO1xuICAgIH1cbiAgfVxufVxuXG4vLyB0cmFuc3BvcnRcbntcbiAgLy8gQ29tbW9uSlMgZm9yIENvbXBvbmVudFxuICBtb2R1bGUuZXhwb3J0cyA9IGdldFN0eWxlUHJvcGVydHk7XG59XG5cbn0pKCk7XG59KTtcblxuZnVuY3Rpb24gZ2V0RGlzdGFuY2UocDEsIHAyKSB7XG4gIHZhciBkeCA9IHAxLnggLSBwMi54LFxuICAgICAgZHkgPSBwMS55IC0gcDIueTtcbiAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG59XG5mdW5jdGlvbiBnZXRYRGlmZmVyZW5jZShwMSwgcDIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKHAxLnggLSBwMi54KTtcbn1cbmZ1bmN0aW9uIGdldFlEaWZmZXJlbmNlKHAxLCBwMikge1xuICByZXR1cm4gTWF0aC5hYnMocDEueSAtIHAyLnkpO1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtZWRTcGFjZURpc3RhbmNlRmFjdG9yeShvcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbiAocDEsIHAyKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhvcHRpb25zLnggKiBNYXRoLmFicyhwMS54IC0gcDIueCksIDIpICsgTWF0aC5wb3cob3B0aW9ucy55ICogTWF0aC5hYnMocDEueSAtIHAyLnkpLCAyKSk7XG4gIH07XG59XG5mdW5jdGlvbiBpbmRleE9mTmVhcmVzdFBvaW50KGFyciwgdmFsLCByYWRpdXMpIHtcbiAgdmFyIGdldERpc3RhbmNlRnVuYyA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogZ2V0RGlzdGFuY2U7XG4gIHZhciBzaXplLFxuICAgICAgaW5kZXggPSAwLFxuICAgICAgaSxcbiAgICAgIHRlbXA7XG5cbiAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBzaXplID0gZ2V0RGlzdGFuY2VGdW5jKGFyclswXSwgdmFsKTtcblxuICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgdGVtcCA9IGdldERpc3RhbmNlRnVuYyhhcnJbaV0sIHZhbCk7XG5cbiAgICBpZiAodGVtcCA8IHNpemUpIHtcbiAgICAgIHNpemUgPSB0ZW1wO1xuICAgICAgaW5kZXggPSBpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChyYWRpdXMgPj0gMCAmJiBzaXplID4gcmFkaXVzKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiBkaXJlY3RDcm9zc2luZyhMMVAxLCBMMVAyLCBMMlAxLCBMMlAyKSB7XG4gIHZhciB0ZW1wLCBrMSwgazIsIGIxLCBiMiwgeCwgeTtcblxuICBpZiAoTDJQMS54ID09PSBMMlAyLngpIHtcbiAgICB0ZW1wID0gTDJQMTtcbiAgICBMMlAxID0gTDFQMTtcbiAgICBMMVAxID0gdGVtcDtcbiAgICB0ZW1wID0gTDJQMjtcbiAgICBMMlAyID0gTDFQMjtcbiAgICBMMVAyID0gdGVtcDtcbiAgfVxuXG4gIGlmIChMMVAxLnggPT09IEwxUDIueCkge1xuICAgIGsyID0gKEwyUDIueSAtIEwyUDEueSkgLyAoTDJQMi54IC0gTDJQMS54KTtcbiAgICBiMiA9IChMMlAyLnggKiBMMlAxLnkgLSBMMlAxLnggKiBMMlAyLnkpIC8gKEwyUDIueCAtIEwyUDEueCk7XG4gICAgeCA9IEwxUDEueDtcbiAgICB5ID0geCAqIGsyICsgYjI7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcbiAgfSBlbHNlIHtcbiAgICBrMSA9IChMMVAyLnkgLSBMMVAxLnkpIC8gKEwxUDIueCAtIEwxUDEueCk7XG4gICAgYjEgPSAoTDFQMi54ICogTDFQMS55IC0gTDFQMS54ICogTDFQMi55KSAvIChMMVAyLnggLSBMMVAxLngpO1xuICAgIGsyID0gKEwyUDIueSAtIEwyUDEueSkgLyAoTDJQMi54IC0gTDJQMS54KTtcbiAgICBiMiA9IChMMlAyLnggKiBMMlAxLnkgLSBMMlAxLnggKiBMMlAyLnkpIC8gKEwyUDIueCAtIEwyUDEueCk7XG4gICAgeCA9IChiMSAtIGIyKSAvIChrMiAtIGsxKTtcbiAgICB5ID0geCAqIGsxICsgYjE7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcbiAgfVxufVxuZnVuY3Rpb24gYm91bmRUb0xpbmUoQSwgQiwgUCkge1xuICB2YXIgQVAgPSBuZXcgUG9pbnQoUC54IC0gQS54LCBQLnkgLSBBLnkpLFxuICAgICAgQUIgPSBuZXcgUG9pbnQoQi54IC0gQS54LCBCLnkgLSBBLnkpLFxuICAgICAgYWIyID0gQUIueCAqIEFCLnggKyBBQi55ICogQUIueSxcbiAgICAgIGFwX2FiID0gQVAueCAqIEFCLnggKyBBUC55ICogQUIueSxcbiAgICAgIHQgPSBhcF9hYiAvIGFiMjtcbiAgcmV0dXJuIG5ldyBQb2ludChBLnggKyBBQi54ICogdCwgQS55ICsgQUIueSAqIHQpO1xufVxuZnVuY3Rpb24gZ2V0UG9pbnRPbkxpbmVCeUxlbmdodChMUDEsIExQMiwgbGVuZ2h0KSB7XG4gIHZhciBkeCA9IExQMi54IC0gTFAxLng7XG4gIHZhciBkeSA9IExQMi55IC0gTFAxLnk7XG4gIHZhciBwZXJjZW50ID0gbGVuZ2h0IC8gZ2V0RGlzdGFuY2UoTFAxLCBMUDIpO1xuICByZXR1cm4gbmV3IFBvaW50KExQMS54ICsgcGVyY2VudCAqIGR4LCBMUDEueSArIHBlcmNlbnQgKiBkeSk7XG59XG5mdW5jdGlvbiBhZGRQb2ludFRvQm91bmRQb2ludHMoYm91bmRwb2ludHMsIHBvaW50LCBpc1JpZ2h0KSB7XG4gIHZhciByZXN1bHQgPSBib3VuZHBvaW50cy5maWx0ZXIoZnVuY3Rpb24gKGJQb2ludCkge1xuICAgIHJldHVybiBiUG9pbnQueSA+IHBvaW50LnkgfHwgKGlzUmlnaHQgPyBiUG9pbnQueCA8IHBvaW50LnggOiBiUG9pbnQueCA+IHBvaW50LngpO1xuICB9KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChwb2ludC55IDwgcmVzdWx0W2ldLnkpIHtcbiAgICAgIHJlc3VsdC5zcGxpY2UoaSwgMCwgcG9pbnQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICByZXN1bHQucHVzaChwb2ludCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdldEFuZ2xlRGlmZihhbHBoYSwgYmV0YSkge1xuICB2YXIgbWluQW5nbGUgPSBNYXRoLm1pbihhbHBoYSwgYmV0YSk7XG4gIHZhciBtYXhBbmdsZSA9IE1hdGgubWF4KGFscGhhLCBiZXRhKTtcbiAgcmV0dXJuIE1hdGgubWluKG1heEFuZ2xlIC0gbWluQW5nbGUsIG1pbkFuZ2xlICsgTWF0aC5QSSAqIDIgLSBtYXhBbmdsZSk7XG59XG5mdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIpIHtcbiAgdmFyIGRpZmYgPSBwMi5zdWIocDEpO1xuICByZXR1cm4gbm9ybWFsaXplQW5nbGUoTWF0aC5hdGFuMihkaWZmLnksIGRpZmYueCkpO1xufVxuZnVuY3Rpb24gdG9SYWRpYW4oYW5nbGUpIHtcbiAgcmV0dXJuIGFuZ2xlICUgMzYwICogTWF0aC5QSSAvIDE4MDtcbn1cbmZ1bmN0aW9uIGJvdW5kQW5nbGUobWluLCBtYXgsIHZhbCkge1xuICB2YXIgZG1pbiwgZG1heDtcblxuICBpZiAobWluIDwgbWF4ICYmIHZhbCA+IG1pbiAmJiB2YWwgPCBtYXgpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9IGVsc2UgaWYgKG1heCA8IG1pbiAmJiAodmFsIDwgbWF4IHx8IHZhbCA+IG1pbikpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9IGVsc2Uge1xuICAgIGRtaW4gPSBnZXRBbmdsZURpZmYobWluLCB2YWwpO1xuICAgIGRtYXggPSBnZXRBbmdsZURpZmYobWF4LCB2YWwpO1xuXG4gICAgaWYgKGRtaW4gPCBkbWF4KSB7XG4gICAgICByZXR1cm4gbWluO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWF4O1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gbm9ybWFsaXplQW5nbGUodmFsKSB7XG4gIHdoaWxlICh2YWwgPCAwKSB7XG4gICAgdmFsICs9IDIgKiBNYXRoLlBJO1xuICB9XG5cbiAgd2hpbGUgKHZhbCA+IDIgKiBNYXRoLlBJKSB7XG4gICAgdmFsIC09IDIgKiBNYXRoLlBJO1xuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cbmZ1bmN0aW9uIGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShhbmdsZSwgbGVuZ3RoLCBjZW50ZXIpIHtcbiAgY2VudGVyID0gY2VudGVyIHx8IG5ldyBQb2ludCgwLCAwKTtcbiAgcmV0dXJuIGNlbnRlci5hZGQobmV3IFBvaW50KGxlbmd0aCAqIE1hdGguY29zKGFuZ2xlKSwgbGVuZ3RoICogTWF0aC5zaW4oYW5nbGUpKSk7XG59XG5cbnZhciBCb3VuZCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJvdW5kKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm91bmQsIFt7XG4gICAga2V5OiBcImJvdW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJvdW5kKHBvaW50LCBfc2l6ZSkge1xuICAgICAgcmV0dXJuIHBvaW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZWZyZXNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZnJlc2goKSB7fVxuICB9XSwgW3tcbiAgICBrZXk6IFwiYm91bmRpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYm91bmRpbmcoKSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBfY29uc3RydWN0KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuXG4gICAgICByZXR1cm4gaW5zdGFuY2UuYm91bmQuYmluZChpbnN0YW5jZSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvdW5kO1xufSgpO1xudmFyIEJvdW5kVG9SZWN0YW5nbGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9Cb3VuZCkge1xuICBfaW5oZXJpdHMoQm91bmRUb1JlY3RhbmdsZSwgX0JvdW5kKTtcblxuICBmdW5jdGlvbiBCb3VuZFRvUmVjdGFuZ2xlKHJlY3RhbmdsZSkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZFRvUmVjdGFuZ2xlKTtcblxuICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEJvdW5kVG9SZWN0YW5nbGUpLmNhbGwodGhpcykpO1xuICAgIF90aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm91bmRUb1JlY3RhbmdsZSwgW3tcbiAgICBrZXk6IFwiYm91bmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYm91bmQocG9pbnQsIHNpemUpIHtcbiAgICAgIHZhciBjYWxjUG9pbnQgPSBwb2ludC5jbG9uZSgpO1xuICAgICAgdmFyIHJlY3RQMiA9IHRoaXMucmVjdGFuZ2xlLmdldFAzKCk7XG5cbiAgICAgIGlmICh0aGlzLnJlY3RhbmdsZS5wb3NpdGlvbi54ID4gY2FsY1BvaW50LngpIHtcbiAgICAgICAgY2FsY1BvaW50LnggPSB0aGlzLnJlY3RhbmdsZS5wb3NpdGlvbi54O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5yZWN0YW5nbGUucG9zaXRpb24ueSA+IGNhbGNQb2ludC55KSB7XG4gICAgICAgIGNhbGNQb2ludC55ID0gdGhpcy5yZWN0YW5nbGUucG9zaXRpb24ueTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY3RQMi54IDwgY2FsY1BvaW50LnggKyBzaXplLngpIHtcbiAgICAgICAgY2FsY1BvaW50LnggPSByZWN0UDIueCAtIHNpemUueDtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY3RQMi55IDwgY2FsY1BvaW50LnkgKyBzaXplLnkpIHtcbiAgICAgICAgY2FsY1BvaW50LnkgPSByZWN0UDIueSAtIHNpemUueTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbGNQb2ludDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQm91bmRUb1JlY3RhbmdsZTtcbn0oQm91bmQpO1xudmFyIEJvdW5kVG9FbGVtZW50ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfQm91bmRUb1JlY3RhbmdsZSkge1xuICBfaW5oZXJpdHMoQm91bmRUb0VsZW1lbnQsIF9Cb3VuZFRvUmVjdGFuZ2xlKTtcblxuICBmdW5jdGlvbiBCb3VuZFRvRWxlbWVudChlbGVtZW50LCBjb250YWluZXIpIHtcbiAgICB2YXIgX3RoaXMyO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJvdW5kVG9FbGVtZW50KTtcblxuICAgIF90aGlzMiA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihCb3VuZFRvRWxlbWVudCkuY2FsbCh0aGlzLCBSZWN0YW5nbGUuZnJvbUVsZW1lbnQoZWxlbWVudCwgY29udGFpbmVyKSkpO1xuICAgIF90aGlzMi5lbGVtZW50ID0gZWxlbWVudDtcbiAgICBfdGhpczIuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm91bmRUb0VsZW1lbnQsIFt7XG4gICAga2V5OiBcInJlZnJlc2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgIHRoaXMucmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCb3VuZFRvRWxlbWVudDtcbn0oQm91bmRUb1JlY3RhbmdsZSk7XG52YXIgQm91bmRUb0xpbmVYID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfQm91bmQyKSB7XG4gIF9pbmhlcml0cyhCb3VuZFRvTGluZVgsIF9Cb3VuZDIpO1xuXG4gIGZ1bmN0aW9uIEJvdW5kVG9MaW5lWCh4LCBzdGFydFksIGVuZFkpIHtcbiAgICB2YXIgX3RoaXMzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJvdW5kVG9MaW5lWCk7XG5cbiAgICBfdGhpczMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQm91bmRUb0xpbmVYKS5jYWxsKHRoaXMpKTtcbiAgICBfdGhpczMueCA9IHg7XG4gICAgX3RoaXMzLnN0YXJ0WSA9IHN0YXJ0WTtcbiAgICBfdGhpczMuZW5kWSA9IGVuZFk7XG4gICAgcmV0dXJuIF90aGlzMztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCb3VuZFRvTGluZVgsIFt7XG4gICAga2V5OiBcImJvdW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJvdW5kKHBvaW50LCBzaXplKSB7XG4gICAgICB2YXIgY2FsY1BvaW50ID0gcG9pbnQuY2xvbmUoKTtcbiAgICAgIGNhbGNQb2ludC54ID0gdGhpcy54O1xuXG4gICAgICBpZiAodGhpcy5zdGFydFkgPiBjYWxjUG9pbnQueSkge1xuICAgICAgICBjYWxjUG9pbnQueSA9IHRoaXMuc3RhcnRZO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5lbmRZIDwgY2FsY1BvaW50LnkgKyBzaXplLnkpIHtcbiAgICAgICAgY2FsY1BvaW50LnkgPSB0aGlzLmVuZFkgLSBzaXplLnk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYWxjUG9pbnQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvdW5kVG9MaW5lWDtcbn0oQm91bmQpO1xudmFyIEJvdW5kVG9MaW5lWSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0JvdW5kMykge1xuICBfaW5oZXJpdHMoQm91bmRUb0xpbmVZLCBfQm91bmQzKTtcblxuICBmdW5jdGlvbiBCb3VuZFRvTGluZVkoeSwgc3RhcnRYLCBlbmRYKSB7XG4gICAgdmFyIF90aGlzNDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZFRvTGluZVkpO1xuXG4gICAgX3RoaXM0ID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEJvdW5kVG9MaW5lWSkuY2FsbCh0aGlzKSk7XG4gICAgX3RoaXM0LnkgPSB5O1xuICAgIF90aGlzNC5zdGFydFggPSBzdGFydFg7XG4gICAgX3RoaXM0LmVuZFggPSBlbmRYO1xuICAgIHJldHVybiBfdGhpczQ7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm91bmRUb0xpbmVZLCBbe1xuICAgIGtleTogXCJib3VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib3VuZChwb2ludCwgc2l6ZSkge1xuICAgICAgdmFyIGNhbGNQb2ludCA9IHBvaW50LmNsb25lKCk7XG4gICAgICBjYWxjUG9pbnQueSA9IHRoaXMueTtcblxuICAgICAgaWYgKHRoaXMuc3RhcnRYID4gY2FsY1BvaW50LngpIHtcbiAgICAgICAgY2FsY1BvaW50LnggPSB0aGlzLnN0YXJ0WDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZW5kWCA8IGNhbGNQb2ludC54ICsgc2l6ZS54KSB7XG4gICAgICAgIGNhbGNQb2ludC54ID0gdGhpcy5lbmRYIC0gc2l6ZS54O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FsY1BvaW50O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCb3VuZFRvTGluZVk7XG59KEJvdW5kKTtcbnZhciBCb3VuZFRvTGluZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0JvdW5kNCkge1xuICBfaW5oZXJpdHMoQm91bmRUb0xpbmUsIF9Cb3VuZDQpO1xuXG4gIGZ1bmN0aW9uIEJvdW5kVG9MaW5lKHN0YXJ0UG9pbnQsIGVuZFBvaW50KSB7XG4gICAgdmFyIF90aGlzNTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZFRvTGluZSk7XG5cbiAgICBfdGhpczUgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQm91bmRUb0xpbmUpLmNhbGwodGhpcykpO1xuICAgIF90aGlzNS5zdGFydFBvaW50ID0gc3RhcnRQb2ludDtcbiAgICBfdGhpczUuZW5kUG9pbnQgPSBlbmRQb2ludDtcbiAgICB2YXIgYWxwaGEgPSBNYXRoLmF0YW4yKGVuZFBvaW50LnkgLSBzdGFydFBvaW50LnksIGVuZFBvaW50LnggLSBzdGFydFBvaW50LngpO1xuICAgIHZhciBiZXRhID0gYWxwaGEgKyBNYXRoLlBJIC8gMjtcbiAgICBfdGhpczUuc29tZUsgPSAxMDtcbiAgICBfdGhpczUuY29zQmV0YSA9IE1hdGguY29zKGJldGEpO1xuICAgIF90aGlzNS5zaW5CZXRhID0gTWF0aC5zaW4oYmV0YSk7XG4gICAgcmV0dXJuIF90aGlzNTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCb3VuZFRvTGluZSwgW3tcbiAgICBrZXk6IFwiYm91bmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYm91bmQocG9pbnQsIHNpemUpIHtcbiAgICAgIHZhciBwb2ludDIgPSBuZXcgUG9pbnQocG9pbnQueCArIHRoaXMuc29tZUsgKiB0aGlzLmNvc0JldGEsIHBvaW50LnkgKyB0aGlzLnNvbWVLICogdGhpcy5zaW5CZXRhKTtcbiAgICAgIHZhciBuZXdFbmRQb2ludCA9IGdldFBvaW50T25MaW5lQnlMZW5naHQodGhpcy5lbmRQb2ludCwgdGhpcy5zdGFydFBvaW50LCBzaXplLngpO1xuICAgICAgdmFyIHBvaW50Q3Jvc3NpbmcgPSBkaXJlY3RDcm9zc2luZyh0aGlzLnN0YXJ0UG9pbnQsIHRoaXMuZW5kUG9pbnQsIHBvaW50LCBwb2ludDIpO1xuICAgICAgcmV0dXJuIGJvdW5kVG9MaW5lKHRoaXMuc3RhcnRQb2ludCwgbmV3RW5kUG9pbnQsIHBvaW50Q3Jvc3NpbmcpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCb3VuZFRvTGluZTtcbn0oQm91bmQpO1xudmFyIEJvdW5kVG9DaXJjbGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9Cb3VuZDUpIHtcbiAgX2luaGVyaXRzKEJvdW5kVG9DaXJjbGUsIF9Cb3VuZDUpO1xuXG4gIGZ1bmN0aW9uIEJvdW5kVG9DaXJjbGUoY2VudGVyLCByYWRpdXMpIHtcbiAgICB2YXIgX3RoaXM2O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJvdW5kVG9DaXJjbGUpO1xuXG4gICAgX3RoaXM2ID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEJvdW5kVG9DaXJjbGUpLmNhbGwodGhpcykpO1xuICAgIF90aGlzNi5jZW50ZXIgPSBjZW50ZXI7XG4gICAgX3RoaXM2LnJhZGl1cyA9IHJhZGl1cztcbiAgICByZXR1cm4gX3RoaXM2O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJvdW5kVG9DaXJjbGUsIFt7XG4gICAga2V5OiBcImJvdW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJvdW5kKHBvaW50LCBfc2l6ZSkge1xuICAgICAgcmV0dXJuIGdldFBvaW50T25MaW5lQnlMZW5naHQodGhpcy5jZW50ZXIsIHBvaW50LCB0aGlzLnJhZGl1cyk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvdW5kVG9DaXJjbGU7XG59KEJvdW5kKTtcbnZhciBCb3VuZFRvQXJjID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfQm91bmRUb0NpcmNsZSkge1xuICBfaW5oZXJpdHMoQm91bmRUb0FyYywgX0JvdW5kVG9DaXJjbGUpO1xuXG4gIGZ1bmN0aW9uIEJvdW5kVG9BcmMoY2VudGVyLCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlKSB7XG4gICAgdmFyIF90aGlzNztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb3VuZFRvQXJjKTtcblxuICAgIF90aGlzNyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihCb3VuZFRvQXJjKS5jYWxsKHRoaXMsIGNlbnRlciwgcmFkaXVzKSk7XG4gICAgX3RoaXM3Ll9zdGFydEFuZ2xlID0gc3RhcnRBbmdsZTtcbiAgICBfdGhpczcuX2VuZEFuZ2xlID0gZW5kQW5nbGU7XG4gICAgcmV0dXJuIF90aGlzNztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCb3VuZFRvQXJjLCBbe1xuICAgIGtleTogXCJzdGFydEFuZ2xlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0QW5nbGUoKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX3N0YXJ0QW5nbGUgPT09ICdmdW5jdGlvbicgPyB0aGlzLl9zdGFydEFuZ2xlKCkgOiB0aGlzLl9zdGFydEFuZ2xlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbmRBbmdsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmRBbmdsZSgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5fZW5kQW5nbGUgPT09ICdmdW5jdGlvbicgPyB0aGlzLl9lbmRBbmdsZSgpIDogdGhpcy5fZW5kQW5nbGU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImJvdW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJvdW5kKHBvaW50LCBfc2l6ZSkge1xuICAgICAgdmFyIGFuZ2xlID0gZ2V0QW5nbGUodGhpcy5jZW50ZXIsIHBvaW50KTtcbiAgICAgIGFuZ2xlID0gbm9ybWFsaXplQW5nbGUoYW5nbGUpO1xuICAgICAgYW5nbGUgPSBib3VuZEFuZ2xlKHRoaXMuc3RhcnRBbmdsZSgpLCB0aGlzLmVuZEFuZ2xlKCksIGFuZ2xlKTtcbiAgICAgIHJldHVybiBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oYW5nbGUsIHRoaXMucmFkaXVzLCB0aGlzLmNlbnRlcik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvdW5kVG9BcmM7XG59KEJvdW5kVG9DaXJjbGUpO1xuXG5mdW5jdGlvbiByZW1vdmVJdGVtIChhcnJheSwgdmFsKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyYXlbaV0gPT09IHZhbCkge1xuICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgaS0tO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gIGlmICh0eXBlb2Ygc3RvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzdG9wID0gc3RhcnQ7XG4gICAgc3RhcnQgPSAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzdGVwID09PSAndW5kZWZpbmVkJykge1xuICAgIHN0ZXAgPSAxO1xuICB9XG5cbiAgaWYgKHN0ZXAgPiAwICYmIHN0YXJ0ID49IHN0b3AgfHwgc3RlcCA8IDAgJiYgc3RhcnQgPD0gc3RvcCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgc3RlcCA+IDAgPyBpIDwgc3RvcCA6IGkgPiBzdG9wOyBpICs9IHN0ZXApIHtcbiAgICByZXN1bHQucHVzaChpKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBCYXNpY1N0cmF0ZWd5ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQmFzaWNTdHJhdGVneShyZWN0YW5nbGUpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQmFzaWNTdHJhdGVneSk7XG5cbiAgICB0aGlzLnJlY3RhbmdsZSA9IHJlY3RhbmdsZTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJhc2ljU3RyYXRlZ3ksIFt7XG4gICAga2V5OiBcImJvdW5kUmVjdFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnJlY3RhbmdsZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMucmVjdGFuZ2xlKCkgOiB0aGlzLnJlY3RhbmdsZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQmFzaWNTdHJhdGVneTtcbn0oKTtcblxudmFyIE5vdENyb3NzaW5nU3RyYXRlZ3kgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9CYXNpY1N0cmF0ZWd5KSB7XG4gIF9pbmhlcml0cyhOb3RDcm9zc2luZ1N0cmF0ZWd5LCBfQmFzaWNTdHJhdGVneSk7XG5cbiAgZnVuY3Rpb24gTm90Q3Jvc3NpbmdTdHJhdGVneSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTm90Q3Jvc3NpbmdTdHJhdGVneSk7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKE5vdENyb3NzaW5nU3RyYXRlZ3kpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE5vdENyb3NzaW5nU3RyYXRlZ3ksIFt7XG4gICAga2V5OiBcInBvc2l0aW9uaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBvc2l0aW9uaW5nKHJlY3RhbmdsZUxpc3QsIGluZGV4ZXNPZk5ld3MpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBzdGF0aWNSZWN0YW5nbGVJbmRleGVzID0gcmVjdGFuZ2xlTGlzdC5yZWR1Y2UoZnVuY3Rpb24gKGluZGV4ZXMsIF9yZWN0LCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXhlc09mTmV3cy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHtcbiAgICAgICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4ZXM7XG4gICAgICB9LCBbXSk7XG4gICAgICBpbmRleGVzT2ZOZXdzLmZvckVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciByZWN0ID0gcmVjdGFuZ2xlTGlzdFtpbmRleF07XG4gICAgICAgIHZhciByZW1vdmFibGUgPSBmYWxzZTtcbiAgICAgICAgc3RhdGljUmVjdGFuZ2xlSW5kZXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbmRleE9mU3RhdGljKSB7XG4gICAgICAgICAgdmFyIHN0YXRpY1JlY3QgPSByZWN0YW5nbGVMaXN0W2luZGV4T2ZTdGF0aWNdO1xuICAgICAgICAgIHJlY3QgPSBzdGF0aWNSZWN0Lm1vdmVUb0JvdW5kKHJlY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVtb3ZhYmxlID0gc3RhdGljUmVjdGFuZ2xlSW5kZXhlcy5zb21lKGZ1bmN0aW9uIChpbmRleE9mU3RhdGljKSB7XG4gICAgICAgICAgdmFyIHN0YXRpY1JlY3QgPSByZWN0YW5nbGVMaXN0W2luZGV4T2ZTdGF0aWNdO1xuICAgICAgICAgIHJldHVybiAhIXN0YXRpY1JlY3QuYW5kKHJlY3QpO1xuICAgICAgICB9KSB8fCByZWN0LmFuZChfdGhpcy5ib3VuZFJlY3QpLmdldFNxdWFyZSgpICE9PSByZWN0LmdldFNxdWFyZSgpO1xuXG4gICAgICAgIGlmIChyZW1vdmFibGUpIHtcbiAgICAgICAgICByZWN0LnJlbW92YWJsZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGljUmVjdGFuZ2xlSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVjdGFuZ2xlTGlzdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic29ydGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzb3J0aW5nKG9kbERyYWdnYWJsZXNMaXN0LCBuZXdEcmFnZ2FibGVzLCBpbmRleE9mTmV3cykge1xuICAgICAgdmFyIGRyYWdnYWJsZXMgPSBvZGxEcmFnZ2FibGVzTGlzdC5jb25jYXQobmV3RHJhZ2dhYmxlcyk7XG4gICAgICBuZXdEcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICBpbmRleE9mTmV3cy5wdXNoKGRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRyYWdnYWJsZXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE5vdENyb3NzaW5nU3RyYXRlZ3k7XG59KEJhc2ljU3RyYXRlZ3kpO1xuXG52YXIgRmxvYXRMZWZ0U3RyYXRlZ3kgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9CYXNpY1N0cmF0ZWd5Mikge1xuICBfaW5oZXJpdHMoRmxvYXRMZWZ0U3RyYXRlZ3ksIF9CYXNpY1N0cmF0ZWd5Mik7XG5cbiAgZnVuY3Rpb24gRmxvYXRMZWZ0U3RyYXRlZ3kocmVjdGFuZ2xlKSB7XG4gICAgdmFyIF90aGlzMjtcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbG9hdExlZnRTdHJhdGVneSk7XG5cbiAgICBfdGhpczIgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoRmxvYXRMZWZ0U3RyYXRlZ3kpLmNhbGwodGhpcywgcmVjdGFuZ2xlLCBvcHRpb25zKSk7XG4gICAgX3RoaXMyLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHJlbW92YWJsZTogdHJ1ZVxuICAgIH0sIG9wdGlvbnMpO1xuICAgIF90aGlzMi5yYWRpdXMgPSBvcHRpb25zLnJhZGl1cyB8fCA4MDtcbiAgICBfdGhpczIucGFkZGluZ1RvcExlZnQgPSBvcHRpb25zLnBhZGRpbmdUb3BMZWZ0IHx8IG5ldyBQb2ludCgwLCAwKTtcbiAgICBfdGhpczIucGFkZGluZ0JvdHRvbVJpZ2h0ID0gb3B0aW9ucy5wYWRkaW5nQm90dG9tUmlnaHQgfHwgbmV3IFBvaW50KDAsIDApO1xuICAgIF90aGlzMi55R2FwQmV0d2VlbkRyYWdnYWJsZXMgPSBvcHRpb25zLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyB8fCAwO1xuICAgIF90aGlzMi5nZXREaXN0YW5jZSA9IG9wdGlvbnMuZ2V0RGlzdGFuY2UgfHwgZ2V0RGlzdGFuY2U7XG5cbiAgICBfdGhpczIuZ2V0UG9zaXRpb24gPSBvcHRpb25zLmdldFBvc2l0aW9uIHx8IGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgIHJldHVybiBkcmFnZ2FibGUucG9zaXRpb247XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpczI7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRmxvYXRMZWZ0U3RyYXRlZ3ksIFt7XG4gICAga2V5OiBcInBvc2l0aW9uaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBvc2l0aW9uaW5nKHJlY3RhbmdsZUxpc3QsIF9pbmRleGVzT2ZOZXdzKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIGJvdW5kUmVjdCA9IHRoaXMuYm91bmRSZWN0O1xuICAgICAgdmFyIHJlY3RQMiA9IGJvdW5kUmVjdC5nZXRQMigpO1xuICAgICAgdmFyIGJvdW5kYXJ5UG9pbnRzID0gW2JvdW5kUmVjdC5wb3NpdGlvbl07XG4gICAgICByZWN0YW5nbGVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHJlY3QsIHJlY3RJbmRleCkge1xuICAgICAgICB2YXIgcG9zaXRpb24sXG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3VuZGFyeVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHBvc2l0aW9uID0gbmV3IFBvaW50KGJvdW5kYXJ5UG9pbnRzW2ldLnggKyBfdGhpczMucGFkZGluZ1RvcExlZnQueCwgaSA+IDAgPyBib3VuZGFyeVBvaW50c1tpIC0gMV0ueSArIF90aGlzMy55R2FwQmV0d2VlbkRyYWdnYWJsZXMgOiBib3VuZFJlY3QucG9zaXRpb24ueSArIF90aGlzMy5wYWRkaW5nVG9wTGVmdC55KTtcbiAgICAgICAgICBpc1ZhbGlkID0gcG9zaXRpb24ueCArIHJlY3Quc2l6ZS54IDwgcmVjdFAyLng7XG5cbiAgICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9pbnQoYm91bmRSZWN0LnBvc2l0aW9uLnggKyBfdGhpczMucGFkZGluZ1RvcExlZnQueCwgYm91bmRhcnlQb2ludHNbYm91bmRhcnlQb2ludHMubGVuZ3RoIC0gMV0ueSArIChyZWN0SW5kZXggPiAwID8gX3RoaXMzLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyA6IF90aGlzMy5wYWRkaW5nVG9wTGVmdC55KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWN0LnBvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICAgICAgaWYgKF90aGlzMy5vcHRpb25zLnJlbW92YWJsZSAmJiByZWN0LmdldFAzKCkueSA+IGJvdW5kUmVjdC5nZXRQMygpLnkpIHtcbiAgICAgICAgICByZWN0LnJlbW92YWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBib3VuZGFyeVBvaW50cyA9IGFkZFBvaW50VG9Cb3VuZFBvaW50cyhib3VuZGFyeVBvaW50cywgcmVjdC5nZXRQMygpLmFkZChfdGhpczMucGFkZGluZ0JvdHRvbVJpZ2h0KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZWN0YW5nbGVMaXN0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzb3J0aW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNvcnRpbmcob2RsRHJhZ2dhYmxlc0xpc3QsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIG5ld0xpc3QgPSBvZGxEcmFnZ2FibGVzTGlzdC5jb25jYXQoKTtcbiAgICAgIHZhciBsaXN0T2xkUG9zaXRpb24gPSBvZGxEcmFnZ2FibGVzTGlzdC5tYXAoZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLmdldFBvc2l0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIG5ld0RyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAobmV3RHJhZ2dhYmxlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGluZGV4T2ZOZWFyZXN0UG9pbnQobGlzdE9sZFBvc2l0aW9uLCBfdGhpczQuZ2V0UG9zaXRpb24obmV3RHJhZ2dhYmxlKSwgX3RoaXM0LnJhZGl1cywgX3RoaXM0LmdldERpc3RhbmNlKTtcblxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgaW5kZXggPSBuZXdMaXN0Lmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmRleCA9IG5ld0xpc3QuaW5kZXhPZihvZGxEcmFnZ2FibGVzTGlzdFtpbmRleF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3TGlzdC5zcGxpY2UoaW5kZXgsIDAsIG5ld0RyYWdnYWJsZSk7XG4gICAgICB9KTtcbiAgICAgIG5ld0RyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAobmV3RHJhZ2dhYmxlKSB7XG4gICAgICAgIGluZGV4T2ZOZXdzLnB1c2gobmV3TGlzdC5pbmRleE9mKG5ld0RyYWdnYWJsZSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3TGlzdDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRmxvYXRMZWZ0U3RyYXRlZ3k7XG59KEJhc2ljU3RyYXRlZ3kpO1xuXG52YXIgRmxvYXRSaWdodFN0cmF0ZWd5ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfRmxvYXRMZWZ0U3RyYXRlZ3kpIHtcbiAgX2luaGVyaXRzKEZsb2F0UmlnaHRTdHJhdGVneSwgX0Zsb2F0TGVmdFN0cmF0ZWd5KTtcblxuICBmdW5jdGlvbiBGbG9hdFJpZ2h0U3RyYXRlZ3kocmVjdGFuZ2xlKSB7XG4gICAgdmFyIF90aGlzNTtcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbG9hdFJpZ2h0U3RyYXRlZ3kpO1xuXG4gICAgX3RoaXM1ID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEZsb2F0UmlnaHRTdHJhdGVneSkuY2FsbCh0aGlzLCByZWN0YW5nbGUsIG9wdGlvbnMpKTtcbiAgICBfdGhpczUucGFkZGluZ1RvcFJpZ2h0ID0gb3B0aW9ucy5wYWRkaW5nVG9wUmlnaHQgfHwgbmV3IFBvaW50KDUsIDUpO1xuICAgIF90aGlzNS5wYWRkaW5nQm90dG9tTGVmdCA9IG9wdGlvbnMucGFkZGluZ0JvdHRvbUxlZnQgfHwgbmV3IFBvaW50KDAsIDApO1xuICAgIF90aGlzNS55R2FwQmV0d2VlbkRyYWdnYWJsZXMgPSBvcHRpb25zLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyB8fCAwO1xuICAgIF90aGlzNS5wYWRkaW5nQm90dG9tTmVnTGVmdCA9IG5ldyBQb2ludCgtX3RoaXM1LnBhZGRpbmdCb3R0b21MZWZ0LngsIF90aGlzNS5wYWRkaW5nQm90dG9tTGVmdC55KTtcbiAgICByZXR1cm4gX3RoaXM1O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEZsb2F0UmlnaHRTdHJhdGVneSwgW3tcbiAgICBrZXk6IFwicG9zaXRpb25pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcG9zaXRpb25pbmcocmVjdGFuZ2xlTGlzdCwgX2luZGV4ZXNPZk5ld3MpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICB2YXIgYm91bmRSZWN0ID0gdGhpcy5ib3VuZFJlY3Q7XG4gICAgICB2YXIgYm91bmRhcnlQb2ludHMgPSBbYm91bmRSZWN0LmdldFAyKCldO1xuICAgICAgcmVjdGFuZ2xlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChyZWN0LCByZWN0SW5kZXgpIHtcbiAgICAgICAgdmFyIHBvc2l0aW9uLFxuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRhcnlQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb2ludChib3VuZGFyeVBvaW50c1tpXS54IC0gcmVjdC5zaXplLnggLSBfdGhpczYucGFkZGluZ1RvcFJpZ2h0LngsIGkgPiAwID8gYm91bmRhcnlQb2ludHNbaSAtIDFdLnkgKyBfdGhpczYueUdhcEJldHdlZW5EcmFnZ2FibGVzIDogYm91bmRSZWN0LnBvc2l0aW9uLnkgKyBfdGhpczYucGFkZGluZ1RvcFJpZ2h0LnkpO1xuICAgICAgICAgIGlzVmFsaWQgPSBwb3NpdGlvbi54ID4gcmVjdC5wb3NpdGlvbi54O1xuXG4gICAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgIHBvc2l0aW9uID0gbmV3IFBvaW50KGJvdW5kUmVjdC5nZXRQMigpLnggLSByZWN0LnNpemUueCAtIF90aGlzNi5wYWRkaW5nVG9wUmlnaHQueCwgYm91bmRhcnlQb2ludHNbYm91bmRhcnlQb2ludHMubGVuZ3RoIC0gMV0ueSArIChyZWN0SW5kZXggPiAwID8gX3RoaXM2LnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyA6IF90aGlzNi5wYWRkaW5nVG9wUmlnaHQueSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjdC5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChfdGhpczYub3B0aW9ucy5yZW1vdmFibGUgJiYgcmVjdC5nZXRQNCgpLnkgPiBib3VuZFJlY3QuZ2V0UDQoKS55KSB7XG4gICAgICAgICAgcmVjdC5yZW1vdmFibGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYm91bmRhcnlQb2ludHMgPSBhZGRQb2ludFRvQm91bmRQb2ludHMoYm91bmRhcnlQb2ludHMsIHJlY3QuZ2V0UDQoKS5hZGQoX3RoaXM2LnBhZGRpbmdCb3R0b21OZWdMZWZ0KSwgdHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZWN0YW5nbGVMaXN0O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBGbG9hdFJpZ2h0U3RyYXRlZ3k7XG59KEZsb2F0TGVmdFN0cmF0ZWd5KTtcblxudmFyIGFkZFRvRGVmYXVsdFNjb3BlID0gZnVuY3Rpb24gYWRkVG9EZWZhdWx0U2NvcGUodGFyZ2V0KSB7XG4gIGRlZmF1bHRTY29wZS5hZGRUYXJnZXQodGFyZ2V0KTtcbn07XG5cbnZhciBUYXJnZXQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9FdmVudEVtaXR0ZXIpIHtcbiAgX2luaGVyaXRzKFRhcmdldCwgX0V2ZW50RW1pdHRlcik7XG5cbiAgZnVuY3Rpb24gVGFyZ2V0KGVsZW1lbnQsIGRyYWdnYWJsZXMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGFyZ2V0KTtcblxuICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKFRhcmdldCkuY2FsbCh0aGlzLCB1bmRlZmluZWQsIG9wdGlvbnMpKTtcblxuICAgIHZhciB0YXJnZXQgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKTtcblxuICAgIF90aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHRpbWVFbmQ6IDIwMCxcbiAgICAgIHRpbWVFeGNhbmdlOiA0MDBcbiAgICB9LCBvcHRpb25zKTtcbiAgICBfdGhpcy5wb3NpdGlvbmluZ1N0cmF0ZWd5ID0gb3B0aW9ucy5zdHJhdGVneSB8fCBuZXcgRmxvYXRMZWZ0U3RyYXRlZ3koX3RoaXMuZ2V0UmVjdGFuZ2xlLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCB7XG4gICAgICByYWRpdXM6IDgwLFxuICAgICAgZ2V0RGlzdGFuY2U6IHRyYW5zZm9ybWVkU3BhY2VEaXN0YW5jZUZhY3Rvcnkoe1xuICAgICAgICB4OiAxLFxuICAgICAgICB5OiA0XG4gICAgICB9KSxcbiAgICAgIHJlbW92YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIF90aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIGRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICByZXR1cm4gZHJhZ2dhYmxlLnRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgIH0pO1xuICAgIF90aGlzLmRyYWdnYWJsZXMgPSBkcmFnZ2FibGVzO1xuICAgIFRhcmdldC5lbWl0dGVyLmVtaXQoJ3RhcmdldDpjcmVhdGUnLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG5cbiAgICBfdGhpcy5pbml0KCk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGFyZ2V0LCBbe1xuICAgIGtleTogXCJwb3NpdGlvbmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3NpdGlvbmluZyhkcmFnZ2FibGVzLCBpbmRleGVzT2ZOZXcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uaW5nU3RyYXRlZ3kucG9zaXRpb25pbmcoZHJhZ2dhYmxlcywgaW5kZXhlc09mTmV3KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic29ydGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzb3J0aW5nKG9sZERyYWdnYWJsZXMsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbmluZ1N0cmF0ZWd5LnNvcnRpbmcob2xkRHJhZ2dhYmxlcywgbmV3RHJhZ2dhYmxlcywgaW5kZXhPZk5ld3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHJlY3RhbmdsZXMsIGluZGV4ZXNPZk5ldztcbiAgICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzID0gdGhpcy5kcmFnZ2FibGVzLmZpbHRlcihmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZHJhZ2dhYmxlLmVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgIGlmIChlbGVtZW50ID09PSBfdGhpczIuZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMubGVuZ3RoKSB7XG4gICAgICAgIGluZGV4ZXNPZk5ldyA9IHJhbmdlKHRoaXMuaW5uZXJEcmFnZ2FibGVzLmxlbmd0aCk7XG4gICAgICAgIHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5nZXRSZWN0YW5nbGUoKTtcbiAgICAgICAgfSksIGluZGV4ZXNPZk5ldyk7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgaW5kZXhlc09mTmV3KTtcbiAgICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5lbWl0KCd0YXJnZXQ6YWRkJywgZHJhZ2dhYmxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFJlY3RhbmdsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRSZWN0YW5nbGUoKSB7XG4gICAgICByZXR1cm4gUmVjdGFuZ2xlLmZyb21FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jb250YWluZXIsIHRoaXMub3B0aW9ucy5pc0NvbnRlbnRCb3hTaXplLCB0cnVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2F0Y2hEcmFnZ2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2F0Y2hEcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNhdGNoRHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2F0Y2hEcmFnZ2FibGUodGhpcywgZHJhZ2dhYmxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB0YXJnZXRSZWN0YW5nbGUgPSB0aGlzLmdldFJlY3RhbmdsZSgpO1xuICAgICAgICB2YXIgZHJhZ2dhYmxlU3F1YXJlID0gZHJhZ2dhYmxlLmdldFJlY3RhbmdsZSgpLmdldFNxdWFyZSgpO1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlU3F1YXJlIDwgdGFyZ2V0UmVjdGFuZ2xlLmdldFNxdWFyZSgpICYmIHRhcmdldFJlY3RhbmdsZS5pbmNsdWRlUG9pbnQoZHJhZ2dhYmxlLmdldENlbnRlcigpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UG9zaXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UG9zaXRpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRSZWN0YW5nbGUoKS5wb3NpdGlvbjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVjdGFuZ2xlKCkuc2l6ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVzdHJveVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHNjb3Blcy5mb3JFYWNoKGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlSXRlbShzY29wZS50YXJnZXRzLCBfdGhpczMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlZnJlc2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgIHZhciByZWN0YW5nbGVzID0gdGhpcy5wb3NpdGlvbmluZyh0aGlzLmlubmVyRHJhZ2dhYmxlcy5tYXAoZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLmdldFJlY3RhbmdsZSgpO1xuICAgICAgfSksIFtdKTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgW10sIDApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbkVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkVuZChkcmFnZ2FibGUpIHtcbiAgICAgIHZhciBuZXdEcmFnZ2FibGVzSW5kZXggPSBbXTtcbiAgICAgIHZhciBpbmNsdWRlUG9pbnQgPSB0aGlzLmdldFJlY3RhbmdsZSgpLmluY2x1ZGVQb2ludChkcmFnZ2FibGUuZ2V0UG9zaXRpb24oKSk7XG5cbiAgICAgIGlmICghaW5jbHVkZVBvaW50KSB7XG4gICAgICAgIGlmICh0aGlzLmdldFJlY3RhbmdsZSgpLmluY2x1ZGVQb2ludChkcmFnZ2FibGUuZ2V0Q2VudGVyKCkpKSB7XG4gICAgICAgICAgZHJhZ2dhYmxlLnBvc2l0aW9uID0gZHJhZ2dhYmxlLmdldENlbnRlcigpLmNsb25lKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdCgndGFyZ2V0OmJlZm9yZUFkZCcsIGRyYWdnYWJsZSk7XG4gICAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcyA9IHRoaXMuc29ydGluZyh0aGlzLmlubmVyRHJhZ2dhYmxlcywgW2RyYWdnYWJsZV0sIG5ld0RyYWdnYWJsZXNJbmRleCk7XG4gICAgICB2YXIgcmVjdGFuZ2xlcyA9IHRoaXMucG9zaXRpb25pbmcodGhpcy5pbm5lckRyYWdnYWJsZXMubWFwKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5nZXRSZWN0YW5nbGUoKTtcbiAgICAgIH0pLCBuZXdEcmFnZ2FibGVzSW5kZXgpO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvbihyZWN0YW5nbGVzLCBuZXdEcmFnZ2FibGVzSW5kZXgpO1xuXG4gICAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpICE9PSAtMSkge1xuICAgICAgICB0aGlzLmFkZFJlbW92ZU9uTW92ZShkcmFnZ2FibGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0UG9zaXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgaW5kZXhlc09mTmV3LCB0aW1lKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuc2xpY2UoMCkuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlLCBpKSB7XG4gICAgICAgIHZhciByZWN0ID0gcmVjdGFuZ2xlc1tpXSxcbiAgICAgICAgICAgIHRpbWVFbmQgPSB0aW1lIHx8IHRpbWUgPT09IDAgPyB0aW1lIDogaW5kZXhlc09mTmV3LmluZGV4T2YoaSkgIT09IC0xID8gX3RoaXM0Lm9wdGlvbnMudGltZUVuZCA6IF90aGlzNC5vcHRpb25zLnRpbWVFeGNhbmdlO1xuXG4gICAgICAgIGlmIChyZWN0LnJlbW92YWJsZSkge1xuICAgICAgICAgIGRyYWdnYWJsZS5tb3ZlKGRyYWdnYWJsZS5pbml0aWFsUG9zaXRpb24sIHRpbWVFbmQsIHRydWUsIHRydWUpO1xuICAgICAgICAgIHJlbW92ZUl0ZW0oX3RoaXM0LmlubmVyRHJhZ2dhYmxlcywgZHJhZ2dhYmxlKTtcblxuICAgICAgICAgIF90aGlzNC5lbWl0KCd0YXJnZXQ6cmVtb3ZlJywgZHJhZ2dhYmxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkcmFnZ2FibGUubW92ZShyZWN0LnBvc2l0aW9uLCB0aW1lRW5kLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGQoZHJhZ2dhYmxlLCB0aW1lKSB7XG4gICAgICB2YXIgbmV3RHJhZ2dhYmxlc0luZGV4ID0gdGhpcy5pbm5lckRyYWdnYWJsZXMubGVuZ3RoO1xuICAgICAgdGhpcy5lbWl0KCd0YXJnZXQ6YmVmb3JlQWRkJywgZHJhZ2dhYmxlKTtcbiAgICAgIHRoaXMucHVzaElubmVyRHJhZ2dhYmxlKGRyYWdnYWJsZSk7XG4gICAgICB2YXIgcmVjdGFuZ2xlcyA9IHRoaXMucG9zaXRpb25pbmcodGhpcy5pbm5lckRyYWdnYWJsZXMubWFwKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5nZXRSZWN0YW5nbGUoKTtcbiAgICAgIH0pLCBuZXdEcmFnZ2FibGVzSW5kZXgsIGRyYWdnYWJsZSk7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uKHJlY3RhbmdsZXMsIFtuZXdEcmFnZ2FibGVzSW5kZXhdLCB0aW1lIHx8IDApO1xuXG4gICAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpICE9PSAtMSkge1xuICAgICAgICB0aGlzLmFkZFJlbW92ZU9uTW92ZShkcmFnZ2FibGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwdXNoSW5uZXJEcmFnZ2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHVzaElubmVyRHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgICAgaWYgKHRoaXMuaW5uZXJEcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5pbm5lckRyYWdnYWJsZXMucHVzaChkcmFnZ2FibGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhZGRSZW1vdmVPbk1vdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkUmVtb3ZlT25Nb3ZlKGRyYWdnYWJsZSkge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIGRyYWdnYWJsZS5vbignZHJhZzptb3ZlJywgdGhpcy5yZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczUucmVtb3ZlKGRyYWdnYWJsZSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZW1pdCgndGFyZ2V0OmFkZCcsIGRyYWdnYWJsZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmUoZHJhZ2dhYmxlKSB7XG4gICAgICBkcmFnZ2FibGUudW5zdWJzY3JpYmUoJ2RyYWc6bW92ZScsIHRoaXMucmVtb3ZlSGFuZGxlcik7XG4gICAgICB2YXIgaW5kZXggPSB0aGlzLmlubmVyRHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSk7XG5cbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdmFyIHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgICB9KSwgW10pO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvbihyZWN0YW5nbGVzLCBbXSk7XG4gICAgICB0aGlzLmVtaXQoJ3RhcmdldDpyZW1vdmUnLCBkcmFnZ2FibGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXNldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgZHJhZ2dhYmxlLm1vdmUoZHJhZ2dhYmxlLmluaXRpYWxQb3NpdGlvbiwgMCwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgX3RoaXM2LmVtaXQoJ3RhcmdldDpyZW1vdmUnLCBkcmFnZ2FibGUpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcyA9IFtdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRTb3J0ZWREcmFnZ2FibGVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNvcnRlZERyYWdnYWJsZXMoKSB7XG4gICAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcy5zbGljZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb250YWluZXJcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgfHwgdGhpcy5vcHRpb25zLmNvbnRhaW5lciB8fCB0aGlzLm9wdGlvbnMucGFyZW50IHx8IGdldERlZmF1bHRDb250YWluZXIodGhpcy5lbGVtZW50KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVGFyZ2V0O1xufShFdmVudEVtaXR0ZXIpO1xuVGFyZ2V0LmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKFRhcmdldCk7XG5UYXJnZXQuZW1pdHRlci5vbigndGFyZ2V0OmNyZWF0ZScsIGFkZFRvRGVmYXVsdFNjb3BlKTtcblxudmFyIHNjb3BlcyA9IFtdO1xuXG52YXIgU2NvcGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9FdmVudEVtaXR0ZXIpIHtcbiAgX2luaGVyaXRzKFNjb3BlLCBfRXZlbnRFbWl0dGVyKTtcblxuICBmdW5jdGlvbiBTY29wZShkcmFnZ2FibGVzLCB0YXJnZXRzKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNjb3BlKTtcblxuICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKFNjb3BlKS5jYWxsKHRoaXMsIHVuZGVmaW5lZCwgb3B0aW9ucykpO1xuICAgIHNjb3Blcy5mb3JFYWNoKGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgaWYgKGRyYWdnYWJsZXMpIHtcbiAgICAgICAgZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgICByZW1vdmVJdGVtKHNjb3BlLmRyYWdnYWJsZXMsIGRyYWdnYWJsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0cykge1xuICAgICAgICB0YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgIHJlbW92ZUl0ZW0oc2NvcGUudGFyZ2V0cywgdGFyZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgX3RoaXMuZHJhZ2dhYmxlcyA9IGRyYWdnYWJsZXMgfHwgW107XG4gICAgX3RoaXMudGFyZ2V0cyA9IHRhcmdldHMgfHwgW107XG4gICAgc2NvcGVzLnB1c2goX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLm9wdGlvbnMgPSB7XG4gICAgICB0aW1lRW5kOiBvcHRpb25zLnRpbWVFbmQgfHwgNDAwXG4gICAgfTtcblxuICAgIF90aGlzLmluaXQoKTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTY29wZSwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgZHJhZ2dhYmxlLmRyYWdFbmRBY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5vbkVuZChkcmFnZ2FibGUpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZERyYWdnYWJsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGREcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdGhpcy5kcmFnZ2FibGVzLnB1c2goZHJhZ2dhYmxlKTtcblxuICAgICAgZHJhZ2dhYmxlLmRyYWdFbmRBY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczMub25FbmQoZHJhZ2dhYmxlKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZFRhcmdldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRUYXJnZXQodGFyZ2V0KSB7XG4gICAgICB0aGlzLnRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbkVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkVuZChkcmFnZ2FibGUpIHtcbiAgICAgIHZhciBzaG90VGFyZ2V0cyA9IHRoaXMudGFyZ2V0cy5maWx0ZXIoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0LmRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpICE9PSAtMTtcbiAgICAgIH0pLmZpbHRlcihmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuY2F0Y2hEcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbiAgICAgIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuZ2V0UmVjdGFuZ2xlKCkuZ2V0U3F1YXJlKCkgLSBiLmdldFJlY3RhbmdsZSgpLmdldFNxdWFyZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzaG90VGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgc2hvdFRhcmdldHNbMF0ub25FbmQoZHJhZ2dhYmxlKTtcbiAgICAgIH0gZWxzZSBpZiAoZHJhZ2dhYmxlLnRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIGRyYWdnYWJsZS5waW5Qb3NpdGlvbihkcmFnZ2FibGUuaW5pdGlhbFBvc2l0aW9uLCB0aGlzLm9wdGlvbnMudGltZUVuZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdCgnc2NvcGU6Y2hhbmdlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlc2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgdGhpcy50YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlc2V0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVmcmVzaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy50YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwb3NpdGlvbnNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpcy50YXJnZXRzLm1hcChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuaW5uZXJEcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNC5kcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHBvc2l0aW9ucykge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHZhciBtZXNzYWdlID0gJ3dyb25nIGFycmF5IGxlbmd0aCc7XG5cbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLnRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0LnJlc2V0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwb3NpdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0SW5kZXhlcywgaSkge1xuICAgICAgICAgIHRhcmdldEluZGV4ZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIF90aGlzNS50YXJnZXRzW2ldLmFkZChfdGhpczUuZHJhZ2dhYmxlc1tpbmRleF0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNjb3BlO1xufShFdmVudEVtaXR0ZXIpO1xuXG52YXIgZGVmYXVsdFNjb3BlID0gbmV3IFNjb3BlKCk7XG5cbmZ1bmN0aW9uIHNjb3BlKGZuKSB7XG4gIHZhciBjdXJyZW50U2NvcGUgPSBuZXcgU2NvcGUoKTtcblxuICB2YXIgYWRkRHJhZ2dhYmxlVG9TY29wZSA9IGZ1bmN0aW9uIGFkZERyYWdnYWJsZVRvU2NvcGUoZHJhZ2dhYmxlKSB7XG4gICAgY3VycmVudFNjb3BlLmFkZERyYWdnYWJsZShkcmFnZ2FibGUpO1xuICAgIERyYWdnYWJsZS5lbWl0dGVyLmludGVycnVwdCgpO1xuICB9O1xuXG4gIHZhciBhZGRUYXJnZXRUb1Njb3BlID0gZnVuY3Rpb24gYWRkVGFyZ2V0VG9TY29wZSh0YXJnZXQpIHtcbiAgICBjdXJyZW50U2NvcGUuYWRkVGFyZ2V0KHRhcmdldCk7XG4gICAgRHJhZ2dhYmxlLmVtaXR0ZXIuaW50ZXJydXB0KCk7XG4gIH07XG5cbiAgRHJhZ2dhYmxlLmVtaXR0ZXIucHJlcGVuZE9uKCdkcmFnZ2FibGU6Y3JlYXRlJywgYWRkRHJhZ2dhYmxlVG9TY29wZSk7XG4gIFRhcmdldC5lbWl0dGVyLnByZXBlbmRPbigndGFyZ2V0OmNyZWF0ZScsIGFkZFRhcmdldFRvU2NvcGUpO1xuICBmbi5jYWxsKCk7XG4gIERyYWdnYWJsZS5lbWl0dGVyLnVuc3Vic2NyaWJlKCdkcmFnZ2FibGU6Y3JlYXRlJywgYWRkRHJhZ2dhYmxlVG9TY29wZSk7XG4gIFRhcmdldC5lbWl0dGVyLnVuc3Vic2NyaWJlKCd0YXJnZXQ6Y3JlYXRlJywgYWRkVGFyZ2V0VG9TY29wZSk7XG4gIHJldHVybiBjdXJyZW50U2NvcGU7XG59XG5cbmZ1bmN0aW9uIGNoZWNrU3VwcG9ydFBhc3NpdmVFdmVudHMoKSB7XG4gIHZhciBwYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgdHJ5IHtcbiAgICB2YXIgb3B0aW9ucyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHBhc3NpdmVTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0Jywgb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgfSBjYXRjaCAoX2Vycikge1xuICAgIHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBwYXNzaXZlU3VwcG9ydGVkO1xufVxuXG52YXIgaXNTdXBwb3J0UGFzc2l2ZUV2ZW50cyA9IGNoZWNrU3VwcG9ydFBhc3NpdmVFdmVudHMoKTtcblxudmFyIGlzVG91Y2ggPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3c7XG52YXIgbW91c2VFdmVudHMgPSB7XG4gIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgbW92ZTogJ21vdXNlbW92ZScsXG4gIGVuZDogJ21vdXNldXAnXG59O1xudmFyIHRvdWNoRXZlbnRzID0ge1xuICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICBtb3ZlOiAndG91Y2htb3ZlJyxcbiAgZW5kOiAndG91Y2hlbmQnXG59O1xudmFyIGRyYWdnYWJsZXMgPSBbXTtcbnZhciB0cmFuc2Zvcm1Qcm9wZXJ0eSA9IGdldFN0eWxlUHJvcGVydHkoJ3RyYW5zZm9ybScpO1xudmFyIHRyYW5zaXRpb25Qcm9wZXJ0eSA9IGdldFN0eWxlUHJvcGVydHkoJ3RyYW5zaXRpb24nKTtcblxuZnVuY3Rpb24gZ2V0VG91Y2hCeUlEKGVsZW1lbnQsIHRvdWNoSWQpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVsZW1lbnQuY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gdG91Y2hJZCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RG91YmxlSW5pdChkcmFnZ2FibGUpIHtcbiAgdmFyIG1lc3NhZ2UgPSBcImZvciB0aGlzIGVsZW1lbnQgRHJhZ2VlLkRyYWdnYWJsZSBpcyBhbHJlYWR5IGV4aXN0LCBkb24ndCBjcmVhdGUgaXQgdHdpY2UgXCI7XG5cbiAgaWYgKGRyYWdnYWJsZXMuc29tZShmdW5jdGlvbiAoZXhpc3RpbmcpIHtcbiAgICByZXR1cm4gZHJhZ2dhYmxlLmVsZW1lbnQgPT09IGV4aXN0aW5nLmVsZW1lbnQ7XG4gIH0pKSB7XG4gICAgdGhyb3cgbWVzc2FnZTtcbiAgfVxuXG4gIGRyYWdnYWJsZXMucHVzaChkcmFnZ2FibGUpO1xufVxuXG5mdW5jdGlvbiBhZGRUb0RlZmF1bHRTY29wZSQxKGRyYWdnYWJsZSkge1xuICBkZWZhdWx0U2NvcGUuYWRkRHJhZ2dhYmxlKGRyYWdnYWJsZSk7XG59XG5cbmZ1bmN0aW9uIGNvcHlTdHlsZXMoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICB2YXIgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzb3VyY2UpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gY3NbaV07XG5cbiAgICBpZiAoa2V5LmluZGV4T2YoJ3RyYW5zaXRpb24nKSA8IDAgJiYga2V5LmluZGV4T2YoJ3RyYW5zZm9ybScpIDwgMCkge1xuICAgICAgZGVzdGluYXRpb24uc3R5bGVba2V5XSA9IGNzW2tleV07XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHNvdXJjZS5jaGlsZHJlbi5sZW5ndGg7IF9pKyspIHtcbiAgICBjb3B5U3R5bGVzKHNvdXJjZS5jaGlsZHJlbltfaV0sIGRlc3RpbmF0aW9uLmNoaWxkcmVuW19pXSk7XG4gIH1cbn1cblxudmFyIERyYWdnYWJsZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHMoRHJhZ2dhYmxlLCBfRXZlbnRFbWl0dGVyKTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGUoZWxlbWVudCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEcmFnZ2FibGUpO1xuXG4gICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoRHJhZ2dhYmxlKS5jYWxsKHRoaXMsIHVuZGVmaW5lZCwgb3B0aW9ucykpO1xuICAgIF90aGlzLnRhcmdldHMgPSBbXTtcbiAgICBfdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBfdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICBwcmV2ZW50RG91YmxlSW5pdChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgRHJhZ2dhYmxlLmVtaXR0ZXIuZW1pdCgnZHJhZ2dhYmxlOmNyZWF0ZScsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5fZW5hYmxlID0gdHJ1ZTtcblxuICAgIF90aGlzLnN0YXJ0Qm91bmRpbmcoKTtcblxuICAgIF90aGlzLnN0YXJ0UG9zaXRpb25pbmcoKTtcblxuICAgIF90aGlzLnN0YXJ0TGlzdGVuaW5nKCk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRHJhZ2dhYmxlLCBbe1xuICAgIGtleTogXCJzdGFydEJvdW5kaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0Qm91bmRpbmcoKSB7XG4gICAgICB0aGlzLmJvdW5kID0gdGhpcy5vcHRpb25zLmJvdW5kIHx8IEJvdW5kVG9FbGVtZW50LmJvdW5kaW5nKHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN0YXJ0UG9zaXRpb25pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnRQb3NpdGlvbmluZygpIHtcbiAgICAgIHRoaXMuX3NldERlZmF1bHRUcmFuc2l0aW9uKCk7XG5cbiAgICAgIHRoaXMub2Zmc2V0ID0gUG9pbnQuZWxlbWVudE9mZnNldCh0aGlzLmVsZW1lbnQsIHRoaXMuY29udGFpbmVyLCB0cnVlKTtcbiAgICAgIHRoaXMucGlubmVkUG9zaXRpb24gPSB0aGlzLm9mZnNldDtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLm9mZnNldDtcbiAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5vcHRpb25zLnBvc2l0aW9uIHx8IHRoaXMub2Zmc2V0O1xuICAgICAgdGhpcy5waW5Qb3NpdGlvbih0aGlzLmluaXRpYWxQb3NpdGlvbik7XG5cbiAgICAgIGlmICh0aGlzLmJvdW5kLnJlZnJlc2gpIHtcbiAgICAgICAgdGhpcy5ib3VuZC5yZWZyZXNoKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN0YXJ0TGlzdGVuaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0TGlzdGVuaW5nKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuX2RyYWdTdGFydCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmRyYWdTdGFydChldmVudCk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9kcmFnTW92ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmRyYWdNb3ZlKGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2RyYWdFbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5kcmFnRW5kKGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX25hdGl2ZURyYWdTdGFydCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLm5hdGl2ZURyYWdTdGFydChldmVudCk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9uYXRpdmVEcmFnT3ZlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLm5hdGl2ZURyYWdPdmVyKGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX25hdGl2ZURyYWdFbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5uYXRpdmVEcmFnRW5kKGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX25hdGl2ZURyb3AgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5uYXRpdmVEcm9wKGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX3Njcm9sbCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLm9uU2Nyb2xsKGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuaGFuZGxlci5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLnN0YXJ0LCB0aGlzLl9kcmFnU3RhcnQsIGlzU3VwcG9ydFBhc3NpdmVFdmVudHMgPyB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9IDogZmFsc2UpO1xuICAgICAgdGhpcy5oYW5kbGVyLmFkZEV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuc3RhcnQsIHRoaXMuX2RyYWdTdGFydCwgaXNTdXBwb3J0UGFzc2l2ZUV2ZW50cyA/IHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0gOiBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5fbmF0aXZlRHJhZ1N0YXJ0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgICAgcmV0dXJuIFBvaW50LmVsZW1lbnRTaXplKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLmlzQ29udGVudEJveFNpemUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRQb3NpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLm9mZnNldC5hZGQodGhpcy5fdHJhbnNmb3JtUG9zaXRpb24gfHwgbmV3IFBvaW50KDAsIDApKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDZW50ZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VudGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24uYWRkKHRoaXMuZ2V0U2l6ZSgpLm11bHQoMC41KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9zZXREZWZhdWx0VHJhbnNpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0RGVmYXVsdFRyYW5zaXRpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudClbdHJhbnNpdGlvblByb3BlcnR5XTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3NldFRyYW5zaXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFRyYW5zaXRpb24odGltZSkge1xuICAgICAgdmFyIHRyYW5zaXRpb24gPSB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XTtcbiAgICAgIHZhciB0cmFuc2l0aW9uQ3NzID0gXCJ0cmFuc2Zvcm0gXCIuY29uY2F0KHRpbWUsIFwibXNcIik7XG5cbiAgICAgIGlmICghL3RyYW5zZm9ybSBcXGQqbT9zLy50ZXN0KHRyYW5zaXRpb24pKSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbiArPSBcIiwgXCIuY29uY2F0KHRyYW5zaXRpb25Dc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyYW5zaXRpb24gPSB0cmFuc2l0aW9uQ3NzO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2l0aW9uID0gdHJhbnNpdGlvbi5yZXBsYWNlKC90cmFuc2Zvcm0gXFxkKm0/cy8sIHRyYW5zaXRpb25Dc3MpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XSA9IHRyYW5zaXRpb247XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9zZXRUcmFuc2xhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFRyYW5zbGF0ZShwb2ludCkge1xuICAgICAgdGhpcy5fdHJhbnNmb3JtUG9zaXRpb24gPSBwb2ludDtcbiAgICAgIHZhciB0cmFuc2xhdGVDc3MgPSBcInRyYW5zbGF0ZTNkKFwiLmNvbmNhdChwb2ludC54LCBcInB4LCBcIikuY29uY2F0KHBvaW50LnksIFwicHgsIDBweClcIik7XG4gICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XTtcblxuICAgICAgaWYgKHRoaXMuc2hvdWxkUmVtb3ZlWmVyb1RyYW5zbGF0ZSAmJiBwb2ludC54ID09PSAwICYmIHBvaW50LnkgPT09IDApIHtcbiAgICAgICAgdHJhbnNmb3JtID0gdHJhbnNmb3JtLnJlcGxhY2UoL3RyYW5zbGF0ZTNkXFwoW14pXStcXCkvLCAnJyk7XG4gICAgICB9IGVsc2UgaWYgKCEvdHJhbnNsYXRlM2RcXChbXildK1xcKS8udGVzdCh0cmFuc2Zvcm0pKSB7XG4gICAgICAgIGlmICh0cmFuc2Zvcm0pIHtcbiAgICAgICAgICB0cmFuc2Zvcm0gKz0gJyAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJhbnNmb3JtICs9IHRyYW5zbGF0ZUNzcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5yZXBsYWNlKC90cmFuc2xhdGUzZFxcKFteKV0rXFwpLywgdHJhbnNsYXRlQ3NzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XSA9IHRyYW5zZm9ybTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlKHBvaW50KSB7XG4gICAgICB2YXIgdGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcbiAgICAgIHZhciBpc1NpbGVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICBwb2ludCA9IHBvaW50LmNsb25lKCk7XG4gICAgICB0aGlzLmRldGVybWluZURpcmVjdGlvbihwb2ludCk7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9pbnQ7XG5cbiAgICAgIHRoaXMuX3NldFRyYW5zaXRpb24odGltZSk7XG5cbiAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZShwb2ludC5zdWIodGhpcy5vZmZzZXQpKTtcblxuICAgICAgaWYgKCFpc1NpbGVudCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2RyYWc6bW92ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwaW5Qb3NpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwaW5Qb3NpdGlvbihwb2ludCkge1xuICAgICAgdmFyIHRpbWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gICAgICB2YXIgc2lsZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB0cnVlO1xuICAgICAgdGhpcy5waW5uZWRQb3NpdGlvbiA9IHBvaW50LmNsb25lKCk7XG4gICAgICB0aGlzLm1vdmUodGhpcy5waW5uZWRQb3NpdGlvbiwgdGltZSwgc2lsZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVzZXRQb3NpdGlvblRvSW5pdGlhbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldFBvc2l0aW9uVG9Jbml0aWFsKCkge1xuICAgICAgdGhpcy5waW5Qb3NpdGlvbih0aGlzLmluaXRpYWxQb3NpdGlvbik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlZnJlc2hQb3NpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWZyZXNoUG9zaXRpb24oKSB7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuZ2V0UG9zaXRpb24oKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldFBvc2l0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFBvc2l0aW9uKHBvaW50KSB7XG4gICAgICBwb2ludCA9IHBvaW50LmNsb25lKCk7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9pbnQ7XG5cbiAgICAgIHRoaXMuX3NldFRyYW5zaXRpb24oMCk7XG5cbiAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZShwb2ludC5zdWIodGhpcy5vZmZzZXQpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGV0ZXJtaW5lRGlyZWN0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGVybWluZURpcmVjdGlvbihwb2ludCkge1xuICAgICAgdGhpcy5sZWZ0RGlyZWN0aW9uID0gdGhpcy5wb3NpdGlvbi54IDwgcG9pbnQueDtcbiAgICAgIHRoaXMucmlnaHREaXJlY3Rpb24gPSB0aGlzLnBvc2l0aW9uLnggPiBwb2ludC54O1xuICAgICAgdGhpcy51cERpcmVjdGlvbiA9IHRoaXMucG9zaXRpb24ueSA+IHBvaW50Lnk7XG4gICAgICB0aGlzLmRvd25EaXJlY3Rpb24gPSB0aGlzLnBvc2l0aW9uLnkgPCBwb2ludC55O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkcmFnU3RhcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRFdmVudCA9IGV2ZW50O1xuXG4gICAgICBpZiAoIXRoaXMuX2VuYWJsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBpc1RvdWNoRXZlbnQgPSBpc1RvdWNoICYmIGV2ZW50IGluc3RhbmNlb2Ygd2luZG93LlRvdWNoRXZlbnQ7XG4gICAgICB0aGlzLnRvdWNoUG9pbnQgPSB0aGlzLl9zdGFydFRvdWNoUG9pbnQgPSBuZXcgUG9pbnQoaXNUb3VjaEV2ZW50ID8gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggOiBldmVudC5jbGllbnRYLCBpc1RvdWNoRXZlbnQgPyBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSA6IGV2ZW50LmNsaWVudFkpO1xuICAgICAgdGhpcy5fc3RhcnRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgaWYgKGlzVG91Y2hFdmVudCkge1xuICAgICAgICB0aGlzLl90b3VjaElkID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhcnRTY3JvbGxQb2ludCA9IG5ldyBQb2ludCh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGlmIChldmVudC50YXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElucHV0RWxlbWVudCB8fCBldmVudC50YXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICBldmVudC50YXJnZXQuZm9jdXMoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEodGhpcy5uYXRpdmVEcmFnQW5kRHJvcCB8fCBldmVudC50YXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElucHV0RWxlbWVudCB8fCBldmVudC50YXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElucHV0RWxlbWVudCkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubmF0aXZlRHJhZ0FuZERyb3ApIHtcbiAgICAgICAgdmFyIGlzU2FmYXJpID0gL3ZlcnNpb25cXC8oXFxkKykuKz9zYWZhcmkvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICAgICAgICBpZiAoaXNUb3VjaEV2ZW50ICYmIHRoaXMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wT25Ub3VjaCB8fCBpc1NhZmFyaSB8fCB0aGlzLmVtdWxhdGVOYXRpdmVEcmFnQW5kRHJvcEZvckFsbCkge1xuICAgICAgICAgIHRoaXMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgdGhpcy5fbmF0aXZlRHJhZ0VuZCwgaXNTdXBwb3J0UGFzc2l2ZUV2ZW50cyA/IHtcbiAgICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgICAgfSA6IGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCB0aGlzLl9kcmFnTW92ZSwgaXNTdXBwb3J0UGFzc2l2ZUV2ZW50cyA/IHtcbiAgICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgICB9IDogZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlLCBpc1N1cHBvcnRQYXNzaXZlRXZlbnRzID8ge1xuICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgIH0gOiBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCB0aGlzLl9kcmFnRW5kLCBpc1N1cHBvcnRQYXNzaXZlRXZlbnRzID8ge1xuICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgIH0gOiBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9kcmFnRW5kLCBpc1N1cHBvcnRQYXNzaXZlRXZlbnRzID8ge1xuICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgIH0gOiBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGwpO1xuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuZW1pdCgnZHJhZzpzdGFydCcpO1xuICAgICAgYWRkQ2xhc3ModGhpcy5lbGVtZW50LCAnZHJhZ2VlLWFjdGl2ZScpO1xuICAgICAgdGhpcy5lbWl0KCdkcmFnOm1vdmUnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RvcERyYWdnaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3BEcmFnZ2luZygpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMubW92ZSwgdGhpcy5fZHJhZ01vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5tb3ZlLCB0aGlzLl9kcmFnTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgdGhpcy5fZHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgdGhpcy5fZHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuX25hdGl2ZURyYWdPdmVyKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLl9uYXRpdmVEcmFnRW5kKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9uYXRpdmVEcmFnRW5kKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLl9uYXRpdmVEcm9wKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLl9uYXRpdmVEcm9wKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGwpO1xuICAgICAgdGhpcy5lbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnQsICdkcmFnZWUtYWN0aXZlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRyYWdNb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRFdmVudCA9IGV2ZW50O1xuICAgICAgdmFyIHRvdWNoO1xuICAgICAgdmFyIGlzVG91Y2hFdmVudCA9IGlzVG91Y2ggJiYgZXZlbnQgaW5zdGFuY2VvZiB3aW5kb3cuVG91Y2hFdmVudDtcblxuICAgICAgaWYgKGlzVG91Y2hFdmVudCkge1xuICAgICAgICB0b3VjaCA9IGdldFRvdWNoQnlJRChldmVudCwgdGhpcy5fdG91Y2hJZCk7XG5cbiAgICAgICAgaWYgKCF0b3VjaCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnRvdWNoUG9pbnQgPSBuZXcgUG9pbnQoaXNUb3VjaEV2ZW50ID8gdG91Y2gucGFnZVggOiBldmVudC5jbGllbnRYLCBpc1RvdWNoRXZlbnQgPyB0b3VjaC5wYWdlWSA6IGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICB2YXIgcG9pbnQgPSB0aGlzLl9zdGFydFBvc2l0aW9uLmFkZCh0aGlzLnRvdWNoUG9pbnQuc3ViKHRoaXMuX3N0YXJ0VG91Y2hQb2ludCkpLmFkZCh0aGlzLnNjcm9sbFBvaW50LnN1Yih0aGlzLl9zdGFydFNjcm9sbFBvaW50KSk7XG5cbiAgICAgIHBvaW50ID0gdGhpcy5ib3VuZChwb2ludCwgdGhpcy5nZXRTaXplKCkpO1xuICAgICAgdGhpcy5tb3ZlKHBvaW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZHJhZ0VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmFnRW5kKGV2ZW50KSB7XG4gICAgICB2YXIgaXNUb3VjaEV2ZW50ID0gaXNUb3VjaCAmJiBldmVudCBpbnN0YW5jZW9mIHdpbmRvdy5Ub3VjaEV2ZW50O1xuXG4gICAgICBpZiAoaXNUb3VjaEV2ZW50ICYmICFnZXRUb3VjaEJ5SUQoZXZlbnQsIHRoaXMuX3RvdWNoSWQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5kcmFnRW5kQWN0aW9uKCk7XG4gICAgICB0aGlzLmVtaXQoJ2RyYWc6ZW5kJyk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMubW92ZSwgdGhpcy5fZHJhZ01vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbCk7XG4gICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpO1xuICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50LCAnZHJhZ2VlLWFjdGl2ZScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvblNjcm9sbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblNjcm9sbChfZXZlbnQpIHtcbiAgICAgIHZhciBwb2ludCA9IHRoaXMuX3N0YXJ0UG9zaXRpb24uYWRkKHRoaXMudG91Y2hQb2ludC5zdWIodGhpcy5fc3RhcnRUb3VjaFBvaW50KSkuYWRkKHRoaXMuc2Nyb2xsUG9pbnQuc3ViKHRoaXMuX3N0YXJ0U2Nyb2xsUG9pbnQpKTtcblxuICAgICAgcG9pbnQgPSB0aGlzLmJvdW5kKHBvaW50LCB0aGlzLmdldFNpemUoKSk7XG5cbiAgICAgIGlmICghdGhpcy5uYXRpdmVEcmFnQW5kRHJvcCkge1xuICAgICAgICB0aGlzLm1vdmUocG9pbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuYXRpdmVEcmFnU3RhcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbmF0aXZlRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICdGaXJlRm94IGZpeCcpO1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuX25hdGl2ZURyYWdPdmVyKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLl9uYXRpdmVEcmFnRW5kKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLl9uYXRpdmVEcm9wKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibmF0aXZlRHJhZ092ZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbmF0aXZlRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudCwgJ2RyYWdlZS1wbGFjZWhvbGRlcicpO1xuICAgICAgdGhpcy5jdXJyZW50RXZlbnQgPSBldmVudDtcblxuICAgICAgaWYgKGV2ZW50LmNsaWVudFggPT09IDAgJiYgZXZlbnQuY2xpZW50WSA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG91Y2hQb2ludCA9IG5ldyBQb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgdmFyIHBvaW50ID0gdGhpcy5fc3RhcnRQb3NpdGlvbi5hZGQodGhpcy50b3VjaFBvaW50LnN1Yih0aGlzLl9zdGFydFRvdWNoUG9pbnQpKS5hZGQodGhpcy5zY3JvbGxQb2ludC5zdWIodGhpcy5fc3RhcnRTY3JvbGxQb2ludCkpO1xuXG4gICAgICBwb2ludCA9IHRoaXMuYm91bmQocG9pbnQsIHRoaXMuZ2V0U2l6ZSgpKTtcbiAgICAgIHRoaXMucG9zaXRpb24gPSBwb2ludDtcbiAgICAgIHRoaXMuZW1pdCgnZHJhZzptb3ZlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm5hdGl2ZURyYWdFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbmF0aXZlRHJhZ0VuZChfZXZlbnQpIHtcbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudCwgJ2RyYWdlZS1wbGFjZWhvbGRlcicpO1xuICAgICAgdGhpcy5kcmFnRW5kQWN0aW9uKCk7XG4gICAgICB0aGlzLmVtaXQoJ2RyYWc6ZW5kJyk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuX25hdGl2ZURyYWdPdmVyKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLl9uYXRpdmVEcmFnRW5kKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9uYXRpdmVEcmFnRW5kKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLl9uYXRpdmVEcm9wKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGwpO1xuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkcmFnZ2FibGUnKTtcbiAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudCwgJ2RyYWdlZS1hY3RpdmUnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibmF0aXZlRHJvcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBuYXRpdmVEcm9wKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImVtdWxhdGVOYXRpdmVEcmFnQW5kRHJvcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3AoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgY29udGFpbmVyUmVjdCA9IHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIGNsb25lZEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgY2xvbmVkRWxlbWVudC5zdHlsZVt0cmFuc2Zvcm1Qcm9wZXJ0eV0gPSAnJztcbiAgICAgIGNvcHlTdHlsZXModGhpcy5lbGVtZW50LCBjbG9uZWRFbGVtZW50KTtcbiAgICAgIGNsb25lZEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjbG9uZWRFbGVtZW50KTtcbiAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudCwgJ2RyYWdlZS1wbGFjZWhvbGRlcicpO1xuICAgICAgdmFyIGVtdWxhdGlvbkRyYWdnYWJsZSA9IG5ldyBEcmFnZ2FibGUoY2xvbmVkRWxlbWVudCwge1xuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmJvZHksXG4gICAgICAgIGJvdW5kOiBmdW5jdGlvbiBib3VuZChwb2ludCkge1xuICAgICAgICAgIHJldHVybiBwb2ludDtcbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICAnZHJhZzptb3ZlJzogZnVuY3Rpb24gZHJhZ01vdmUoKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyUmVjdFBvaW50ID0gbmV3IFBvaW50KGNvbnRhaW5lclJlY3QubGVmdCwgY29udGFpbmVyUmVjdC50b3ApO1xuICAgICAgICAgICAgX3RoaXMzLnBvc2l0aW9uID0gZW11bGF0aW9uRHJhZ2dhYmxlLnBvc2l0aW9uLnN1Yihjb250YWluZXJSZWN0UG9pbnQpLnN1YihfdGhpczMuX3N0YXJ0U2Nyb2xsUG9pbnQpO1xuXG4gICAgICAgICAgICBfdGhpczMuZW1pdCgnZHJhZzptb3ZlJyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnZHJhZzplbmQnOiBmdW5jdGlvbiBkcmFnRW5kKCkge1xuICAgICAgICAgICAgZW11bGF0aW9uRHJhZ2dhYmxlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY2xvbmVkRWxlbWVudCk7XG4gICAgICAgICAgICByZW1vdmVDbGFzcyhfdGhpczMuZWxlbWVudCwgJ2RyYWdlZS1wbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoX3RoaXMzLmVsZW1lbnQsICdkcmFnZWUtYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBjb250YWluZXJSZWN0UG9pbnQgPSBuZXcgUG9pbnQoY29udGFpbmVyUmVjdC5sZWZ0LCBjb250YWluZXJSZWN0LnRvcCk7XG4gICAgICBlbXVsYXRpb25EcmFnZ2FibGUuX3N0YXJ0U2Nyb2xsUG9pbnQgPSB0aGlzLl9zdGFydFNjcm9sbFBvaW50O1xuICAgICAgZW11bGF0aW9uRHJhZ2dhYmxlLm1vdmUodGhpcy5waW5uZWRQb3NpdGlvbi5hZGQoY29udGFpbmVyUmVjdFBvaW50KS5hZGQobmV3IFBvaW50KHdpbmRvdy5zY3JvbGxYLCB3aW5kb3cuc2Nyb2xsWSkpKTtcbiAgICAgIGVtdWxhdGlvbkRyYWdnYWJsZS5kcmFnU3RhcnQoZXZlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkcmFnRW5kQWN0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYWdFbmRBY3Rpb24oKSB7XG4gICAgICB0aGlzLnBpblBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRSZWN0YW5nbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UmVjdGFuZ2xlKCkge1xuICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUodGhpcy5wb3NpdGlvbiwgdGhpcy5nZXRTaXplKCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZWZyZXNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgICBpZiAodGhpcy5ib3VuZC5yZWZyZXNoKSB7XG4gICAgICAgIHRoaXMuYm91bmQucmVmcmVzaCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZXN0cm95XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0aGlzLmhhbmRsZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgdGhpcy5fZHJhZ1N0YXJ0KTtcbiAgICAgIHRoaXMuaGFuZGxlci5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLnN0YXJ0LCB0aGlzLl9kcmFnU3RhcnQpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuX25hdGl2ZURyYWdTdGFydCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMubW92ZSwgdGhpcy5fZHJhZ01vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLl9uYXRpdmVEcmFnT3Zlcik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5fbmF0aXZlRHJvcCk7XG4gICAgICB0aGlzLnJlc2V0RW1pdHRlcigpO1xuICAgICAgdmFyIGluZGV4ID0gZHJhZ2dhYmxlcy5pbmRleE9mKHRoaXMpO1xuXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBkcmFnZ2FibGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbnRhaW5lclwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lciB8fCB0aGlzLm9wdGlvbnMuY29udGFpbmVyIHx8IHRoaXMub3B0aW9ucy5wYXJlbnQgfHwgZ2V0RGVmYXVsdENvbnRhaW5lcih0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVyXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBpZiAoIXRoaXMuX2hhbmRsZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuaGFuZGxlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmhhbmRsZXIpIHx8IHRoaXMuZWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVyID0gdGhpcy5vcHRpb25zLmhhbmRsZXIgfHwgdGhpcy5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuYXRpdmVEcmFnQW5kRHJvcFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5uYXRpdmVEcmFnQW5kRHJvcCB8fCBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wT25Ub3VjaFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5lbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3BPblRvdWNoIHx8IHRydWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImVtdWxhdGVOYXRpdmVEcmFnQW5kRHJvcEZvckFsbFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5lbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3BGb3JBbGwgfHwgZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNob3VsZFJlbW92ZVplcm9UcmFuc2xhdGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2hvdWxkUmVtb3ZlWmVyb1RyYW5zbGF0ZSB8fCBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2Nyb2xsUG9pbnRcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBuZXcgUG9pbnQod2luZG93LnNjcm9sbFgsIHdpbmRvdy5zY3JvbGxZKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZW5hYmxlXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZW5hYmxlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoZW5hYmxlKSB7XG4gICAgICBpZiAoZW5hYmxlKSB7XG4gICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudCwgJ2RyYWdlZS1kaXNhYmxlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnQsICdkcmFnZWUtZGlzYWJsZScpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fZW5hYmxlID0gZW5hYmxlO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEcmFnZ2FibGU7XG59KEV2ZW50RW1pdHRlcik7XG5EcmFnZ2FibGUuZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoRHJhZ2dhYmxlKTtcbkRyYWdnYWJsZS5lbWl0dGVyLm9uKCdkcmFnZ2FibGU6Y3JlYXRlJywgYWRkVG9EZWZhdWx0U2NvcGUkMSk7XG5cbnZhciBMaXN0ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfRXZlbnRFbWl0dGVyKSB7XG4gIF9pbmhlcml0cyhMaXN0LCBfRXZlbnRFbWl0dGVyKTtcblxuICBmdW5jdGlvbiBMaXN0KGRyYWdnYWJsZXMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGlzdCk7XG5cbiAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihMaXN0KS5jYWxsKHRoaXMsIHVuZGVmaW5lZCwgb3B0aW9ucykpO1xuICAgIF90aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHRpbWVFbmQ6IDIwMCxcbiAgICAgIHRpbWVFeGNhbmdlOiA0MDAsXG4gICAgICByYWRpdXM6IDMwXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgX3RoaXMuZHJhZ2dhYmxlcyA9IGRyYWdnYWJsZXM7XG5cbiAgICBfdGhpcy5pbml0KCk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTGlzdCwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdGhpcy5fZW5hYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKHRoaXMuaW5pdERyYWdnYWJsZSwgdGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluaXREcmFnZ2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdERyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBkcmFnZ2FibGUuZW5hYmxlID0gdGhpcy5fZW5hYmxlO1xuICAgICAgZHJhZ2dhYmxlLm9uKCdkcmFnOm1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIub25Nb3ZlKGRyYWdnYWJsZSk7XG4gICAgICB9KTtcblxuICAgICAgZHJhZ2dhYmxlLmRyYWdFbmRBY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUucGluUG9zaXRpb24oZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uLCBfdGhpczIub3B0aW9ucy50aW1lRW5kKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uTW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1vdmUoZHJhZ2dhYmxlKSB7XG4gICAgICB2YXIgc29ydGVkRHJhZ2dhYmxlcyA9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuICAgICAgdmFyIHBpbm5lZFBvc2l0aW9ucyA9IHNvcnRlZERyYWdnYWJsZXMubWFwKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbjtcbiAgICAgIH0pO1xuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHNvcnRlZERyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpO1xuICAgICAgdmFyIHRhcmdldEluZGV4ID0gaW5kZXhPZk5lYXJlc3RQb2ludChwaW5uZWRQb3NpdGlvbnMsIGRyYWdnYWJsZS5wb3NpdGlvbiwgdGhpcy5vcHRpb25zLnJhZGl1cywgdGhpcy5kaXN0YW5jZUZ1bmMpO1xuXG4gICAgICBpZiAodGFyZ2V0SW5kZXggIT09IC0xICYmIGN1cnJlbnRJbmRleCAhPT0gdGFyZ2V0SW5kZXgpIHtcbiAgICAgICAgaWYgKHRhcmdldEluZGV4IDwgY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IHRhcmdldEluZGV4OyBpIDwgY3VycmVudEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIHNvcnRlZERyYWdnYWJsZXNbaV0ucGluUG9zaXRpb24ocGlubmVkUG9zaXRpb25zW2kgKyAxXSwgdGhpcy5vcHRpb25zLnRpbWVFeGNhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgX2kgPSBjdXJyZW50SW5kZXg7IF9pIDwgdGFyZ2V0SW5kZXg7IF9pKyspIHtcbiAgICAgICAgICAgIHNvcnRlZERyYWdnYWJsZXNbX2kgKyAxXS5waW5Qb3NpdGlvbihwaW5uZWRQb3NpdGlvbnNbX2ldLCB0aGlzLm9wdGlvbnMudGltZUV4Y2FuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkcmFnZ2FibGUubmF0aXZlRHJhZ0FuZERyb3ApIHtcbiAgICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24ocGlubmVkUG9zaXRpb25zW3RhcmdldEluZGV4XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uID0gcGlubmVkUG9zaXRpb25zW3RhcmdldEluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdCgnbGlzdDpjaGFuZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q3VycmVudFBpbm5lZFBvc2l0aW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDdXJyZW50UGlubmVkUG9zaXRpb25zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlcy5tYXAoZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uLmNsb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U29ydGVkRHJhZ2dhYmxlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTb3J0ZWREcmFnZ2FibGVzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlcy5zb3J0KHRoaXMuc29ydGluZy5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVzZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUucmVzZXRQb3NpdGlvblRvSW5pdGlhbCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlZnJlc2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5yZWZyZXNoKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChkcmFnZ2FibGVzKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgaWYgKCEoZHJhZ2dhYmxlcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICBkcmFnZ2FibGVzID0gW2RyYWdnYWJsZXNdO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVzLmZvckVhY2goZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLmluaXREcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kcmFnZ2FibGVzID0gdGhpcy5kcmFnZ2FibGVzLmNvbmNhdChkcmFnZ2FibGVzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShkcmFnZ2FibGVzKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIGluaXRpYWxQb3NpdGlvbnMgPSB0aGlzLmRyYWdnYWJsZXMubWFwKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5pbml0aWFsUG9zaXRpb247XG4gICAgICB9KTtcbiAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICB2YXIgc29ydGVkRHJhZ2dhYmxlcyA9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuXG4gICAgICBpZiAoIShkcmFnZ2FibGVzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgIGRyYWdnYWJsZXMgPSBbZHJhZ2dhYmxlc107XG4gICAgICB9XG5cbiAgICAgIGRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGRyYWdnYWJsZS5yZXNldE9uKCdkcmFnOmVuZCcpO1xuICAgICAgICBkcmFnZ2FibGUucmVzZXRPbignZHJhZzptb3ZlJyk7XG4gICAgICAgIHJlbW92ZUl0ZW0oX3RoaXM0LmRyYWdnYWJsZXMsIGRyYWdnYWJsZSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBqID0gMDtcbiAgICAgIHNvcnRlZERyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGlmIChfdGhpczQuZHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSkgIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiAhPT0gaW5pdGlhbFBvc2l0aW9uc1tqXSkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKGluaXRpYWxQb3NpdGlvbnNbal0sIF90aGlzNC5vcHRpb25zLnRpbWVFeGNhbmdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkcmFnZ2FibGUuaW5pdGlhbFBvc2l0aW9uID0gaW5pdGlhbFBvc2l0aW9uc1tqXTtcbiAgICAgICAgICBqKys7XG4gICAgICAgICAgbGlzdC5wdXNoKGRyYWdnYWJsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5kcmFnZ2FibGVzID0gbGlzdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xlYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzLnJlbW92ZSh0aGlzLmRyYWdnYWJsZXMuc2xpY2UoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlc3Ryb3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5kZXN0cm95KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic29ydGluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzb3J0aW5nKGRyYWdnYWJsZUEsIGRyYWdnYWJsZUIpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc29ydGluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvcnRpbmcoZHJhZ2dhYmxlQSwgZHJhZ2dhYmxlQik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlQS5waW5uZWRQb3NpdGlvbi55IDwgZHJhZ2dhYmxlQi5waW5uZWRQb3NpdGlvbi55KSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChkcmFnZ2FibGVBLnBpbm5lZFBvc2l0aW9uLnkgPiBkcmFnZ2FibGVCLnBpbm5lZFBvc2l0aW9uLnkpIHJldHVybiAxO1xuICAgICAgICBpZiAoZHJhZ2dhYmxlQS5waW5uZWRQb3NpdGlvbi54IDwgZHJhZ2dhYmxlQi5waW5uZWRQb3NpdGlvbi54KSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChkcmFnZ2FibGVBLnBpbm5lZFBvc2l0aW9uLnggPiBkcmFnZ2FibGVCLnBpbm5lZFBvc2l0aW9uLngpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGlzdGFuY2VGdW5jXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdldERpc3RhbmNlIHx8IGdldERpc3RhbmNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwb3NpdGlvbnNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRQaW5uZWRQb3NpdGlvbnMoKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHBvc2l0aW9ucykge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHZhciBtZXNzYWdlID0gJ3dyb25nIGFycmF5IGxlbmd0aCc7XG5cbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoKSB7XG4gICAgICAgIHBvc2l0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCwgaSkge1xuICAgICAgICAgIF90aGlzNS5kcmFnZ2FibGVzW2ldLnBpblBvc2l0aW9uKHBvaW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBtZXNzYWdlO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbmFibGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbmFibGU7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChlbmFibGUpIHtcbiAgICAgIHRoaXMuX2VuYWJsZSA9IGVuYWJsZTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgZHJhZ2dhYmxlLmVuYWJsZSA9IGVuYWJsZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcImZhY3RvcnlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmFjdG9yeShjb250YWluZXJFbGVtZW50LCBlbGVtZW50cykge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGRyYWdnYWJsZXMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEcmFnZ2FibGUoZWxlbWVudCwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXJFbGVtZW50XG4gICAgICAgIH0sIG9wdGlvbnMuZHJhZ2dhYmxlIHx8IHt9KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgTGlzdChkcmFnZ2FibGVzLCBvcHRpb25zLmxpc3QgfHwge30pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBMaXN0O1xufShFdmVudEVtaXR0ZXIpO1xuXG52YXIgYXJyYXlNb3ZlID0gZnVuY3Rpb24gYXJyYXlNb3ZlKGFycmF5LCBmcm9tLCB0bykge1xuICBhcnJheS5zcGxpY2UodG8gPCAwID8gYXJyYXkubGVuZ3RoICsgdG8gOiB0bywgMCwgYXJyYXkuc3BsaWNlKGZyb20sIDEpWzBdKTtcbn07XG5cbnZhciBCdWJibGluZ0xpc3QgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9MaXN0KSB7XG4gIF9pbmhlcml0cyhCdWJibGluZ0xpc3QsIF9MaXN0KTtcblxuICBmdW5jdGlvbiBCdWJibGluZ0xpc3QoZHJhZ2dhYmxlcykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCdWJibGluZ0xpc3QpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihCdWJibGluZ0xpc3QpLmNhbGwodGhpcywgZHJhZ2dhYmxlcywgb3B0aW9ucykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJ1YmJsaW5nTGlzdCwgW3tcbiAgICBrZXk6IFwiaW5pdERyYWdnYWJsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0RHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgZHJhZ2dhYmxlLm9uKCdkcmFnOnN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMuYXV0b0RldGVjdFZlcnRpY2FsR2FwKGRyYWdnYWJsZSk7XG4gICAgICB9KTtcblxuICAgICAgX2dldChfZ2V0UHJvdG90eXBlT2YoQnViYmxpbmdMaXN0LnByb3RvdHlwZSksIFwiaW5pdERyYWdnYWJsZVwiLCB0aGlzKS5jYWxsKHRoaXMsIGRyYWdnYWJsZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImF1dG9EZXRlY3RWZXJ0aWNhbEdhcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdXRvRGV0ZWN0VmVydGljYWxHYXAoKSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHZhciBzb3J0ZWQgPSB0aGlzLmdldFNvcnRlZERyYWdnYWJsZXMoKTtcbiAgICAgICAgdGhpcy52ZXJ0aWNhbEdhcCA9IHNvcnRlZFsxXS5waW5uZWRQb3NpdGlvbi55IC0gc29ydGVkWzBdLnBpbm5lZFBvc2l0aW9uLnkgLSBzb3J0ZWRbMF0uZ2V0U2l6ZSgpLnk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZlcnRpY2FsR2FwID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSB0aGlzLmRyYWdnYWJsZXNbMF0ucGlubmVkUG9zaXRpb247XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uTW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1vdmUoZHJhZ2dhYmxlKSB7XG4gICAgICB2YXIgc29ydGVkRHJhZ2dhYmxlcyA9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuICAgICAgdmFyIHBpbm5lZFBvc2l0aW9ucyA9IHNvcnRlZERyYWdnYWJsZXMubWFwKGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbjtcbiAgICAgIH0pO1xuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHNvcnRlZERyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpO1xuICAgICAgdmFyIHRhcmdldEluZGV4ID0gaW5kZXhPZk5lYXJlc3RQb2ludChwaW5uZWRQb3NpdGlvbnMsIGRyYWdnYWJsZS5wb3NpdGlvbiwgdGhpcy5vcHRpb25zLnJhZGl1cywgdGhpcy5kaXN0YW5jZUZ1bmMpO1xuXG4gICAgICBpZiAodGFyZ2V0SW5kZXggIT09IC0xICYmIGN1cnJlbnRJbmRleCAhPT0gdGFyZ2V0SW5kZXgpIHtcbiAgICAgICAgYXJyYXlNb3ZlKHNvcnRlZERyYWdnYWJsZXMsIGN1cnJlbnRJbmRleCwgdGFyZ2V0SW5kZXgpO1xuICAgICAgICB0aGlzLmJ1Ymxpbmcoc29ydGVkRHJhZ2dhYmxlcywgZHJhZ2dhYmxlKTtcbiAgICAgICAgdGhpcy5lbWl0KCdsaXN0OmNoYW5nZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJidWJsaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJ1Ymxpbmcoc29ydGVkRHJhZ2dhYmxlcywgY3VycmVudERyYWdnYWJsZSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSB0aGlzLnN0YXJ0UG9zaXRpb24uY2xvbmUoKTtcbiAgICAgIHNvcnRlZERyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGlmICghZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uLmNvbXBhcmUoY3VycmVudFBvc2l0aW9uKSkge1xuICAgICAgICAgIGlmIChkcmFnZ2FibGUgPT09IGN1cnJlbnREcmFnZ2FibGUgJiYgIWN1cnJlbnREcmFnZ2FibGUubmF0aXZlRHJhZ0FuZERyb3ApIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbi5jbG9uZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBkcmFnZ2FibGUgPT09IGN1cnJlbnREcmFnZ2FibGUgPyAwIDogX3RoaXMyLm9wdGlvbnMudGltZUV4Y2FuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbi55ID0gY3VycmVudFBvc2l0aW9uLnkgKyBkcmFnZ2FibGUuZ2V0U2l6ZSgpLnkgKyBfdGhpczIudmVydGljYWxHYXA7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGlzdGFuY2VGdW5jXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdldERpc3RhbmNlIHx8IGdldFlEaWZmZXJlbmNlO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcImZhY3RvcnlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmFjdG9yeShjb250YWluZXJFbGVtZW50LCBlbGVtZW50cykge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGRyYWdnYWJsZXMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEcmFnZ2FibGUoZWxlbWVudCwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXJFbGVtZW50XG4gICAgICAgIH0sIG9wdGlvbnMuZHJhZ2dhYmxlIHx8IHt9KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgQnViYmxpbmdMaXN0KGRyYWdnYWJsZXMsIG9wdGlvbnMubGlzdCB8fCB7fSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJ1YmJsaW5nTGlzdDtcbn0oTGlzdCk7XG5cbmZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gIHN0eWxlID0gc3R5bGUgfHwge307XG4gIHZhciBjc3NUZXh0ID0gJyc7XG5cbiAgZm9yICh2YXIga2V5IGluIHN0eWxlKSB7XG4gICAgaWYgKHN0eWxlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNzc1RleHQgKz0ga2V5ICsgJzogJyArIHN0eWxlW2tleV0gKyAnOyAnO1xuICAgIH1cbiAgfVxuXG4gIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGNzc1RleHQ7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEZpcnN0Q2hpbGQoZWxlbWVudCwgbm9kZSkge1xuICBpZiAoZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgZWxlbWVudC5pbnNlcnRCZWZvcmUobm9kZSwgZWxlbWVudC5maXJzdENoaWxkKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKG5vZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyhhcmVhLCByZWN0YWdsZSkge1xuICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGFyZWEpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgIGFyZWEuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICB9XG5cbiAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCByZWN0YWdsZS5zaXplLnggKyAncHgnKTtcbiAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgcmVjdGFnbGUuc2l6ZS55ICsgJ3B4Jyk7XG4gIHNldFN0eWxlKGNhbnZhcywge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIGxlZnQ6IHJlY3RhZ2xlLnBvc2l0aW9uLnkgKyAncHgnLFxuICAgIHRvcDogcmVjdGFnbGUucG9zaXRpb24ueSArICdweCcsXG4gICAgd2lkdGg6IHJlY3RhZ2xlLnNpemUueCArICdweCcsXG4gICAgaGVpZ2h0OiByZWN0YWdsZS5zaXplLnkgKyAncHgnXG4gIH0pO1xuICBhcHBlbmRGaXJzdENoaWxkKGFyZWEsIGNhbnZhcyk7XG4gIHJldHVybiBjYW52YXM7XG59XG5cbnZhciBTcGlkZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTcGlkZXIoYXJlYSwgZWxlbWVudHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3BpZGVyKTtcblxuICAgIHZhciBhcmVhUmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGFyZWEsIGFyZWEpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYW5nbGU6IDAsXG4gICAgICBkQW5nbGU6IDIgKiBNYXRoLlBJIC8gZWxlbWVudHMubGVuZ3RoLFxuICAgICAgY2VudGVyOiBhcmVhUmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgc3RhcnRSYWRpdXM6IDUwLFxuICAgICAgZW5kUmFkaXVzOiBhcmVhUmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICBzdHJva2VTdHlsZTogJyNmZjU1NzcnLFxuICAgICAgZmlsbFN0eWxlOiAncmdiYSgxNTAsMjU1LDUwLDAuOCknXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICB0aGlzLmFyZWFSZWN0YW5nbGUgPSBhcmVhUmVjdGFuZ2xlO1xuICAgIHRoaXMuaW5pdChlbGVtZW50cyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU3BpZGVyLCBbe1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoZWxlbWVudHMpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuY2FudmFzID0gY3JlYXRlQ2FudmFzKHRoaXMuYXJlYSwgdGhpcy5hcmVhUmVjdGFuZ2xlKTtcbiAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB0aGlzLmRyYWdnYWJsZXMgPSBlbGVtZW50cy5tYXAoZnVuY3Rpb24gKGVsZW1lbnQsIGkpIHtcbiAgICAgICAgdmFyIGFuZ2xlID0gX3RoaXMub3B0aW9ucy5hbmdsZSArIGkgKiBfdGhpcy5vcHRpb25zLmRBbmdsZTtcbiAgICAgICAgdmFyIGhhbGZTaXplID0gUG9pbnQuZWxlbWVudFNpemUoZWxlbWVudCkubXVsdCgwLjUpO1xuICAgICAgICB2YXIgc3RhcnQgPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oYW5nbGUsIF90aGlzLm9wdGlvbnMuc3RhcnRSYWRpdXMsIF90aGlzLm9wdGlvbnMuY2VudGVyKS5zdWIoaGFsZlNpemUpO1xuICAgICAgICB2YXIgZW5kID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCBfdGhpcy5vcHRpb25zLmVuZFJhZGl1cywgX3RoaXMub3B0aW9ucy5jZW50ZXIpLnN1YihoYWxmU2l6ZSk7XG4gICAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgICAgICBjb250YWluZXI6IF90aGlzLmFyZWEsXG4gICAgICAgICAgYm91bmQ6IEJvdW5kVG9MaW5lLmJvdW5kaW5nKHN0YXJ0LCBlbmQpLFxuICAgICAgICAgIHBvc2l0aW9uOiBzdGFydCxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgJ2RyYWc6bW92ZSc6IGZ1bmN0aW9uIGRyYWdNb3ZlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXNJbml0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuZHJhdygpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkcmF3XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS54LCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHZhciBwb2ludCA9IHRoaXMuZHJhZ2dhYmxlc1swXS5nZXRDZW50ZXIoKTtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kcmFnZ2FibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBvaW50ID0gdGhpcy5kcmFnZ2FibGVzW2ldLmdldENlbnRlcigpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHBvaW50LngsIHBvaW50LnkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5vcHRpb25zLmxpbmVXaWR0aDtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMub3B0aW9ucy5zdHJva2VTdHlsZTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3BpZGVyO1xufSgpO1xuXG52YXIgQXJjU2xpZGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfRXZlbnRFbWl0dGVyKSB7XG4gIF9pbmhlcml0cyhBcmNTbGlkZXIsIF9FdmVudEVtaXR0ZXIpO1xuXG4gIGZ1bmN0aW9uIEFyY1NsaWRlcihhcmVhLCBlbGVtZW50KSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFyY1NsaWRlcik7XG5cbiAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihBcmNTbGlkZXIpLmNhbGwodGhpcywgdW5kZWZpbmVkLCBvcHRpb25zKSk7XG4gICAgdmFyIGFyZWFSZWN0YW5nbGUgPSBSZWN0YW5nbGUuZnJvbUVsZW1lbnQoYXJlYSwgYXJlYSk7XG4gICAgX3RoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiBhcmVhUmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgcmFkaXVzOiBhcmVhUmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICBzdGFydEFuZ2xlOiBNYXRoLlBJLFxuICAgICAgZW5kQW5nbGU6IDAsXG4gICAgICBhbmdsZXM6IFtNYXRoLlBJLCAtTWF0aC5QSSAvIDQsIDAsIE1hdGguUEkgLyA0LCBNYXRoLlBJIC8gMl0sXG4gICAgICB0aW1lOiA1MDBcbiAgICB9LCBvcHRpb25zKTtcbiAgICBfdGhpcy5zaGlmdGVkQ2VudGVyID0gX3RoaXMub3B0aW9ucy5jZW50ZXI7XG4gICAgX3RoaXMuYXJlYSA9IGFyZWE7XG5cbiAgICBfdGhpcy5pbml0KGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFyY1NsaWRlciwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgYW5nbGUgPSB0aGlzLm9wdGlvbnMuc3RhcnRBbmdsZTtcbiAgICAgIHZhciBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShhbmdsZSwgdGhpcy5vcHRpb25zLnJhZGl1cywgdGhpcy5zaGlmdGVkQ2VudGVyKTtcbiAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IERyYWdnYWJsZShlbGVtZW50LCB7XG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5hcmVhLFxuICAgICAgICBib3VuZDogQm91bmRUb0FyYy5ib3VuZGluZyh0aGlzLnNoaWZ0ZWRDZW50ZXIsIHRoaXMub3B0aW9ucy5yYWRpdXMsIHRoaXMub3B0aW9ucy5zdGFydEFuZ2xlLCB0aGlzLm9wdGlvbnMuZW5kQW5nbGUpLFxuICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgJ2RyYWc6bW92ZSc6IGZ1bmN0aW9uIGRyYWdNb3ZlKCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5jaGFuZ2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVBbmdsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVBbmdsZSgpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBnZXRBbmdsZSh0aGlzLnNoaWZ0ZWRDZW50ZXIsIHRoaXMuZHJhZ2dhYmxlLnBvc2l0aW9uKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2hhbmdlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoYW5nZSgpIHtcbiAgICAgIHRoaXMudXBkYXRlQW5nbGUoKTsgLy8gICAgICB2YXIgYW5nbGUgPSBHZW9tZXRyeS5nZXROZWFyZXN0QW5nbGUodGhpcy5vcHRpb25zLmFuZ2xlcywgdGhpcy5hbmdsZSk7XG4gICAgICAvLyAgICAgIHRoaXMuc2V0QW5nbGUoYW5nbGUsdGhpcy5vcHRpb25zLnRpbWUpO1xuXG4gICAgICB0aGlzLmVtaXQoJ2FyY3NsaWRlcjpjaGFuZ2UnLCB7XG4gICAgICAgIGFuZ2xlOiB0aGlzLmFuZ2xlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0QW5nbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QW5nbGUoYW5nbGUsIHRpbWUpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbSh0aGlzLmFuZ2xlLCB0aGlzLm9wdGlvbnMucmFkaXVzLCB0aGlzLnNoaWZ0ZWRDZW50ZXIpO1xuICAgICAgdGhpcy5hbmdsZSA9IG5vcm1hbGl6ZUFuZ2xlKGFuZ2xlKTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnBpblBvc2l0aW9uKHBvc2l0aW9uLCB0aW1lIHx8IDApO1xuICAgICAgdGhpcy5lbWl0KCdhcmNzbGlkZXI6Y2hhbmdlJywgdGhpcy5hbmdsZSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEFyY1NsaWRlcjtcbn0oRXZlbnRFbWl0dGVyKTtcblxudmFyIHJuZCA9IGZ1bmN0aW9uIHJuZCgpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG59O1xuXG52YXIgdG9IZXhTdHJpbmcgPSBmdW5jdGlvbiB0b0hleFN0cmluZyhkaWdpdCkge1xuICB2YXIgc3RyID0gZGlnaXQudG9TdHJpbmcoMTYpO1xuXG4gIHdoaWxlIChzdHIubGVuZ3RoIDwgMikge1xuICAgIHN0ciA9ICcwJyArIHN0cjtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG5mdW5jdGlvbiByYW5kb21Db2xvcigpIHtcbiAgcmV0dXJuIFwiI1wiLmNvbmNhdCh0b0hleFN0cmluZyhybmQoKSkpLmNvbmNhdCh0b0hleFN0cmluZyhybmQoKSkpLmNvbmNhdCh0b0hleFN0cmluZyhybmQoKSkpO1xufVxuXG5mdW5jdGlvbiBnZXRBcnJheVdpdGhCb3VuZEluZGV4ZXMoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgcmV0SW5kZXhlcyA9IFtdO1xuXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICByZXRJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIHJldEluZGV4ZXMucHVzaCgoaW5kZXggKyAxKSAlIGxlbmd0aCk7XG4gIH1cblxuICByZXR1cm4gcmV0SW5kZXhlcztcbn1cblxudmFyIENoYXJ0ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfRXZlbnRFbWl0dGVyKSB7XG4gIF9pbmhlcml0cyhDaGFydCwgX0V2ZW50RW1pdHRlcik7XG5cbiAgZnVuY3Rpb24gQ2hhcnQoYXJlYSwgZWxlbWVudHMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ2hhcnQpO1xuXG4gICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQ2hhcnQpLmNhbGwodGhpcywgdW5kZWZpbmVkLCBvcHRpb25zKSk7XG4gICAgdmFyIGFyZWFSZWN0YW5nbGUgPSBSZWN0YW5nbGUuZnJvbUVsZW1lbnQoYXJlYSwgYXJlYSk7XG4gICAgX3RoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiBhcmVhUmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgcmFkaXVzOiBhcmVhUmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICB0b3VjaFJhZGl1czogYXJlYVJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgYm91bmRBbmdsZTogTWF0aC5QSSAvIDksXG4gICAgICBmaWxsU3R5bGVzOiByYW5nZSgwLCBlbGVtZW50cy5sZW5ndGgpLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByYW5kb21Db2xvcigpO1xuICAgICAgfSksXG4gICAgICBpbml0QW5nbGVzOiByYW5nZSgtOTAsIDI3MCwgMzYwIC8gZWxlbWVudHMubGVuZ3RoKS5tYXAoZnVuY3Rpb24gKGFuZ2xlKSB7XG4gICAgICAgIHJldHVybiB0b1JhZGlhbihhbmdsZSk7XG4gICAgICB9KSxcbiAgICAgIGxpbWl0SW1nOiBudWxsLFxuICAgICAgbGltaXRJbWdPZmZzZXQ6IG5ldyBQb2ludCgwLCAwKVxuICAgIH0sIG9wdGlvbnMpO1xuICAgIF90aGlzLmFyZWEgPSBhcmVhO1xuICAgIF90aGlzLmFyZWFSZWN0YW5nbGUgPSBhcmVhUmVjdGFuZ2xlO1xuXG4gICAgX3RoaXMuaW5pdChlbGVtZW50cyk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQ2hhcnQsIFt7XG4gICAga2V5OiBcImluaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChlbGVtZW50cykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuY2FudmFzID0gY3JlYXRlQ2FudmFzKHRoaXMuYXJlYSwgdGhpcy5hcmVhUmVjdGFuZ2xlKTtcbiAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB0aGlzLmRyYWdnYWJsZXMgPSBlbGVtZW50cy5tYXAoZnVuY3Rpb24gKGVsZW1lbnQsIGkpIHtcbiAgICAgICAgdmFyIGFuZ2xlID0gX3RoaXMyLm9wdGlvbnMuaW5pdEFuZ2xlc1tpXTtcbiAgICAgICAgdmFyIGhhbGZTaXplID0gUG9pbnQuZWxlbWVudFNpemUoZWxlbWVudCkubXVsdCgwLjUpO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oYW5nbGUsIF90aGlzMi5vcHRpb25zLnRvdWNoUmFkaXVzLCBfdGhpczIub3B0aW9ucy5jZW50ZXIuc3ViKGhhbGZTaXplKSk7XG4gICAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgICAgICBjb250YWluZXI6IF90aGlzMi5hcmVhLFxuICAgICAgICAgIGJvdW5kOiBCb3VuZFRvQXJjLmJvdW5kaW5nKF90aGlzMi5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpLCBfdGhpczIub3B0aW9ucy50b3VjaFJhZGl1cywgX3RoaXMyLmdldEJvdW5kQW5nbGUoaSwgZmFsc2UpLCBfdGhpczIuZ2V0Qm91bmRBbmdsZShpLCB0cnVlKSksXG4gICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAnZHJhZzptb3ZlJzogZnVuY3Rpb24gZHJhZ01vdmUoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpczIuZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXNJbml0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuZHJhdygpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVBbmdsZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlQW5nbGVzKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuYW5nbGVzID0gdGhpcy5kcmFnZ2FibGVzLm1hcChmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHZhciBoYWxmU2l6ZSA9IGRyYWdnYWJsZS5nZXRTaXplKCkubXVsdCgwLjUpO1xuICAgICAgICByZXR1cm4gZ2V0QW5nbGUoX3RoaXMzLm9wdGlvbnMuY2VudGVyLnN1YihoYWxmU2l6ZSksIGRyYWdnYWJsZS5wb3NpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Qm91bmRBbmdsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRCb3VuZEFuZ2xlKGluZGV4LCBpc0Nsb3NzaW5nKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIHNpZ24gPSBpc0Nsb3NzaW5nID8gMSA6IC0xO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGkgPSAoaW5kZXggKyBzaWduKSAlIF90aGlzNC5hbmdsZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgIGkgKz0gX3RoaXM0LmFuZ2xlcy5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9ybWFsaXplQW5nbGUoX3RoaXM0LmFuZ2xlc1tpXSAtIHNpZ24gKiBfdGhpczQub3B0aW9ucy5ib3VuZEFuZ2xlKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRyYXdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdygpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy51cGRhdGVBbmdsZXMoKTtcbiAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueSk7XG4gICAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoX2RyYWdnYWJsZSwgaW5kZXgpIHtcbiAgICAgICAgX3RoaXM1LmRyYXdBcmMoX3RoaXM1LmNvbnRleHQsIF90aGlzNS5vcHRpb25zLmNlbnRlciwgX3RoaXM1Lm9wdGlvbnMucmFkaXVzLCBpbmRleCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChfZHJhZ2dhYmxlLCBpbmRleCkge1xuICAgICAgICBfdGhpczUuZHJhd0xpbWl0SW1nKGluZGV4KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5lbWl0KCdjaGFydDpkcmF3Jyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZUNsb25lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUNsb25lKGVsZW1lbnQpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICAgIGlmICghdGhpcy5pc0luaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGVsZW1lbnQsIGVsZW1lbnQpO1xuICAgICAgdmFyIG9wdHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2VudGVyOiByZWN0YW5nbGUuZ2V0Q2VudGVyKCksXG4gICAgICAgIHJhZGl1czogcmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICAgIGZpbGxTdHlsZXM6IHRoaXMub3B0aW9ucy5maWxsU3R5bGVzXG4gICAgICB9LCBvcHRpb25zKTtcbiAgICAgIHZhciBjYW52YXMgPSBjcmVhdGVDYW52YXMoZWxlbWVudCwgcmVjdGFuZ2xlKTtcbiAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB2YXIgY2xvbmVPYmogPSB7XG4gICAgICAgIGRyYXc6IGZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgcmVjdGFuZ2xlLnNpemUueCwgcmVjdGFuZ2xlLnNpemUueSk7XG5cbiAgICAgICAgICBfdGhpczYuZHJhZ2dhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChfZHJhZ2dhYmxlLCBpbmRleCkge1xuICAgICAgICAgICAgX3RoaXM2LmRyYXdBcmMoY29udGV4dCwgb3B0cy5jZW50ZXIsIG9wdHMucmFkaXVzLCBpbmRleCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjbG9uZU9iai5kcmF3KCk7XG4gICAgICByZXR1cm4gY2xvbmVPYmo7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldEZpbGxTdHlsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGaWxsU3R5bGUoaW5kZXgpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmZpbGxTdHlsZXNbaW5kZXhdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5maWxsU3R5bGVzW2luZGV4XSA9IHRoaXMub3B0aW9ucy5maWxsU3R5bGVzW2luZGV4XS5jYWxsKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbGxTdHlsZXNbaW5kZXhdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkcmF3QXJjXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdBcmMoY29udGV4dCwgY2VudGVyLCByYWRpdXMsIGluZGV4KSB7XG4gICAgICB2YXIgc3RhcnRBbmdsZSA9IHRoaXMuYW5nbGVzW2luZGV4XTtcbiAgICAgIHZhciBlbmRBbmdsZSA9IHRoaXMuYW5nbGVzWyhpbmRleCArIDEpICUgdGhpcy5hbmdsZXMubGVuZ3RoXTtcbiAgICAgIHZhciBjb2xvciA9IHRoaXMuZ2V0RmlsbFN0eWxlKGluZGV4KTtcbiAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICBjb250ZXh0Lm1vdmVUbyhjZW50ZXIueCwgY2VudGVyLnkpO1xuICAgICAgY29udGV4dC5hcmMoY2VudGVyLngsIGNlbnRlci55LCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBmYWxzZSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhjZW50ZXIueCwgY2VudGVyLnkpO1xuICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZHJhd0xpbWl0SW1nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdMaW1pdEltZyhpbmRleCkge1xuICAgICAgdmFyIHBvaW50LCBpbWc7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubGltaXRJbWcpIHtcbiAgICAgICAgaW1nID0gdGhpcy5vcHRpb25zLmxpbWl0SW1nIGluc3RhbmNlb2YgQXJyYXkgPyB0aGlzLm9wdGlvbnMubGltaXRJbWdbaW5kZXhdIDogdGhpcy5vcHRpb25zLmxpbWl0SW1nO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW1nKSB7XG4gICAgICAgIHZhciBhbmdsZSA9IG5vcm1hbGl6ZUFuZ2xlKHRoaXMuYW5nbGVzW2luZGV4XSk7XG4gICAgICAgIHBvaW50ID0gbmV3IFBvaW50KDAsIC1pbWcuaGVpZ2h0IC8gMik7XG4gICAgICAgIHBvaW50ID0gcG9pbnQuYWRkKHRoaXMub3B0aW9ucy5saW1pdEltZ09mZnNldCk7XG4gICAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUodGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueCAvIDIsIHRoaXMuYXJlYVJlY3RhbmdsZS5zaXplLnkgLyAyKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdGF0ZShhbmdsZSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoaW1nLCBwb2ludC54LCBwb2ludC55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QW5nbGVzRGlmZlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBbmdsZXNEaWZmKCkge1xuICAgICAgdmFyIGFuZ2xlcyA9IHRoaXMuYW5nbGVzLnNsaWNlKDEpO1xuICAgICAgdmFyIGJhc2VBbmdsZSA9IHRoaXMuYW5nbGVzWzBdO1xuICAgICAgYW5nbGVzLnB1c2goYmFzZUFuZ2xlKTtcbiAgICAgIHJldHVybiBhbmdsZXMubWFwKGZ1bmN0aW9uIChhbmdsZSkge1xuICAgICAgICB2YXIgZGlmZkFuZ2xlID0gbm9ybWFsaXplQW5nbGUoYW5nbGUgLSBiYXNlQW5nbGUpO1xuICAgICAgICBiYXNlQW5nbGUgPSBhbmdsZTtcbiAgICAgICAgcmV0dXJuIGRpZmZBbmdsZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRQZXJjZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFBlcmNlbnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBbmdsZXNEaWZmKCkubWFwKGZ1bmN0aW9uIChkaWZmQW5nbGUpIHtcbiAgICAgICAgcmV0dXJuIGRpZmZBbmdsZSAvICgyICogTWF0aC5QSSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QXJjQmlzZWN0cml4c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBcmNCaXNlY3RyaXhzKCkge1xuICAgICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiB0aGlzLmdldEFuZ2xlc0RpZmYoKS5tYXAoZnVuY3Rpb24gKGRpZmZBbmdsZSwgaSkge1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplQW5nbGUoX3RoaXM3LmFuZ2xlc1tpXSArIGRpZmZBbmdsZSAvIDIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldEFyY09uUG9pbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QXJjT25Qb2ludChwb2ludCkge1xuICAgICAgdmFyIGFuZ2xlID0gZ2V0QW5nbGUodGhpcy5vcHRpb25zLmNlbnRlciwgcG9pbnQpO1xuICAgICAgdmFyIHJhZGl1cyA9IGdldERpc3RhbmNlKHRoaXMub3B0aW9ucy5jZW50ZXIsIHBvaW50KTtcblxuICAgICAgaWYgKHJhZGl1cyA+IHRoaXMub3B0aW9ucy5yYWRpdXMpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuXG4gICAgICB2YXIgb2Zmc2V0ID0gLTEsXG4gICAgICAgICAgaSxcbiAgICAgICAgICBqO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5hbmdsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gLTEgfHwgdGhpcy5hbmdsZXNbb2Zmc2V0XSA+IHRoaXMuYW5nbGVzW2ldKSB7XG4gICAgICAgICAgb2Zmc2V0ID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwLCBqID0gb2Zmc2V0OyBpIDwgdGhpcy5hbmdsZXMubGVuZ3RoOyBpKyssIGogPSAoaSArIG9mZnNldCkgJSB0aGlzLmFuZ2xlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGFuZ2xlIDwgdGhpcy5hbmdsZXNbal0pIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoLS1qIDwgMCkge1xuICAgICAgICBqICs9IHRoaXMuYW5nbGVzLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGo7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldEFuZ2xlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRBbmdsZXMoYW5nbGVzKSB7XG4gICAgICB2YXIgX3RoaXM4ID0gdGhpcztcblxuICAgICAgdGhpcy5hbmdsZXMgPSBhbmdsZXM7XG4gICAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlLCBpKSB7XG4gICAgICAgIHZhciBhbmdsZSA9IF90aGlzOC5hbmdsZXNbaV07XG4gICAgICAgIHZhciBoYWxmU2l6ZSA9IGRyYWdnYWJsZS5nZXRTaXplKCkubXVsdCgwLjUpO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oYW5nbGUsIF90aGlzOC5vcHRpb25zLnRvdWNoUmFkaXVzLCBfdGhpczgub3B0aW9ucy5jZW50ZXIuc3ViKGhhbGZTaXplKSk7XG4gICAgICAgIGRyYWdnYWJsZS5tb3ZlQW5kU2F2ZShwb3NpdGlvbik7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZHJhdygpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXRBY3RpdmVBcmNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QWN0aXZlQXJjKGluZGV4KSB7XG4gICAgICB2YXIgZW5hYmxlSW5kZXhlcyA9IGdldEFycmF5V2l0aEJvdW5kSW5kZXhlcyhpbmRleCwgdGhpcy5kcmFnZ2FibGVzLmxlbmd0aCk7XG4gICAgICB0aGlzLmFjdGl2ZUFyY0luZGV4ID0gaW5kZXg7XG4gICAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChmdW5jdGlvbiAoZHJhZ2dhYmxlLCBpKSB7XG4gICAgICAgIGRyYWdnYWJsZS5lbmFibGUgPSBlbmFibGVJbmRleGVzLmluZGV4T2YoaSkgIT09IC0xO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmRyYXcoKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ2hhcnQ7XG59KEV2ZW50RW1pdHRlcik7XG5cbmV4cG9ydCB7IEFyY1NsaWRlciwgQm91bmQsIEJvdW5kVG9BcmMsIEJvdW5kVG9DaXJjbGUsIEJvdW5kVG9FbGVtZW50LCBCb3VuZFRvTGluZSwgQm91bmRUb0xpbmVYLCBCb3VuZFRvTGluZVksIEJvdW5kVG9SZWN0YW5nbGUsIEJ1YmJsaW5nTGlzdCwgQ2hhcnQsIERyYWdnYWJsZSwgRmxvYXRMZWZ0U3RyYXRlZ3ksIEZsb2F0UmlnaHRTdHJhdGVneSwgTGlzdCwgTm90Q3Jvc3NpbmdTdHJhdGVneSwgUG9pbnQsIFJlY3RhbmdsZSwgU2NvcGUsIFNwaWRlciwgVGFyZ2V0LCBhZGRDbGFzcywgZGVmYXVsdFNjb3BlLCBnZXREaXN0YW5jZSwgZ2V0WERpZmZlcmVuY2UsIGdldFlEaWZmZXJlbmNlLCBpbmRleE9mTmVhcmVzdFBvaW50LCByZW1vdmVDbGFzcywgc2NvcGUsIHNjb3BlcywgdHJhbnNmb3JtZWRTcGFjZURpc3RhbmNlRmFjdG9yeSB9O1xuIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tICdkcmFnZWUnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmdsZURpZmYoYWxwaGEsIGJldGEpIHtcbiAgY29uc3QgbWluQW5nbGUgPSBNYXRoLm1pbihhbHBoYSwgYmV0YSlcbiAgY29uc3QgbWF4QW5nbGUgPSAgTWF0aC5tYXgoYWxwaGEsIGJldGEpXG4gIHJldHVybiBNYXRoLm1pbihtYXhBbmdsZSAtIG1pbkFuZ2xlLCBtaW5BbmdsZSArIE1hdGguUEkqMiAtIG1heEFuZ2xlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5nbGUocDEsIHAyKSB7XG4gIGNvbnN0IGRpZmYgPSBwMi5zdWIocDEpXG4gIHJldHVybiBub3JtYWxpemVBbmdsZShNYXRoLmF0YW4yKGRpZmYueSwgZGlmZi54KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvUmFkaWFuKGFuZ2xlKSB7XG4gIHJldHVybiAoKGFuZ2xlICUgMzYwKSAqIE1hdGguUEkgLyAxODApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RlZ3JlZShhbmdsZSkge1xuICByZXR1cm4gKGFuZ2xlICogMTgwIC8gTWF0aC5QSSkgJSAzNjBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kQW5nbGUobWluLCBtYXgsIHZhbCkge1xuICBsZXQgZG1pbiwgZG1heFxuICBpZiAobWluIDwgbWF4ICYmIHZhbCA+IG1pbiAmJiB2YWwgPCBtYXgpIHtcbiAgICByZXR1cm4gdmFsXG4gIH0gZWxzZSBpZiAobWF4IDwgbWluICYmICh2YWwgPCBtYXggfHwgdmFsID4gbWluKSkge1xuICAgIHJldHVybiB2YWxcbiAgfSBlbHNlIHtcbiAgICBkbWluID0gZ2V0QW5nbGVEaWZmKG1pbiwgdmFsKVxuICAgIGRtYXggPSBnZXRBbmdsZURpZmYobWF4LCB2YWwpXG4gICAgaWYgKGRtaW4gPCBkbWF4KSB7XG4gICAgICByZXR1cm4gbWluXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtYXhcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5lYXJlc3RBbmdsZShhcnIsIGFuZ2xlKSB7XG4gIGxldCBpLCB0ZW1wLCBkaWZmID0gTWF0aC5QSSAqIDIsIHZhbHVlXG4gIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoO2krKykge1xuICAgIHRlbXAgPSBnZXRBbmdsZURpZmYoYXJyW2ldLCBhbmdsZSlcbiAgICBpZiAoZGlmZiA8IHRlbXApIHtcbiAgICAgIGRpZmYgPSB0ZW1wXG4gICAgICB2YWx1ZSA9IGFycltpXVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUFuZ2xlKHZhbCkge1xuICB3aGlsZSAodmFsIDwgMCkge1xuICAgIHZhbCArPSAyICogTWF0aC5QSVxuICB9XG4gIHdoaWxlICh2YWwgPiAyICogTWF0aC5QSSkge1xuICAgIHZhbCAtPSAyICogTWF0aC5QSVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShhbmdsZSwgbGVuZ3RoLCBjZW50ZXIpIHtcbiAgY2VudGVyID0gY2VudGVyIHx8IG5ldyBQb2ludCgwLCAwKVxuICByZXR1cm4gY2VudGVyLmFkZChuZXcgUG9pbnQobGVuZ3RoICogTWF0aC5jb3MoYW5nbGUpLCBsZW5ndGggKiBNYXRoLnNpbihhbmdsZSkpKVxufVxuIiwiaW1wb3J0IGNyZWF0ZUNhbnZhcyBmcm9tICcuL3V0aWxzL2NyZWF0ZS1jYW52YXMnXG5pbXBvcnQge1xuICBEcmFnZ2FibGUsXG4gIFBvaW50LFxuICBSZWN0YW5nbGUsXG4gIEJvdW5kVG9MaW5lXG59IGZyb20gJ2RyYWdlZSdcblxuaW1wb3J0IHsgZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtIH0gZnJvbSAnLi9nZW9tZXRyeS9hbmdsZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaWRlciB7XG4gIGNvbnN0cnVjdG9yKGFyZWEsIGVsZW1lbnRzLCBvcHRpb25zPXt9KSB7XG4gICAgY29uc3QgYXJlYVJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudChhcmVhLCBhcmVhKVxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYW5nbGU6IDAsXG4gICAgICBkQW5nbGU6IDIgKiBNYXRoLlBJIC8gZWxlbWVudHMubGVuZ3RoLFxuICAgICAgY2VudGVyOiBhcmVhUmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgc3RhcnRSYWRpdXM6IDUwLFxuICAgICAgZW5kUmFkaXVzOiBhcmVhUmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICBsaW5lV2lkdGg6IDIsXG4gICAgICBzdHJva2VTdHlsZTogJyNmZjU1NzcnLFxuICAgICAgZmlsbFN0eWxlOiAncmdiYSgxNTAsMjU1LDUwLDAuOCknXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHRoaXMuYXJlYSA9IGFyZWFcbiAgICB0aGlzLmFyZWFSZWN0YW5nbGUgPSBhcmVhUmVjdGFuZ2xlXG4gICAgdGhpcy5pbml0KGVsZW1lbnRzKVxuICB9XG5cbiAgaW5pdChlbGVtZW50cykge1xuICAgIHRoaXMuY2FudmFzID0gY3JlYXRlQ2FudmFzKHRoaXMuYXJlYSwgdGhpcy5hcmVhUmVjdGFuZ2xlKVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcblxuICAgIHRoaXMuZHJhZ2dhYmxlcyA9IGVsZW1lbnRzLm1hcCgoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLm9wdGlvbnMuYW5nbGUgKyBpICogdGhpcy5vcHRpb25zLmRBbmdsZVxuICAgICAgY29uc3QgaGFsZlNpemUgPSBQb2ludC5lbGVtZW50U2l6ZShlbGVtZW50KS5tdWx0KDAuNSlcbiAgICAgIGNvbnN0IHN0YXJ0ID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCB0aGlzLm9wdGlvbnMuc3RhcnRSYWRpdXMsIHRoaXMub3B0aW9ucy5jZW50ZXIpLnN1YihoYWxmU2l6ZSlcbiAgICAgIGNvbnN0IGVuZCA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShhbmdsZSwgdGhpcy5vcHRpb25zLmVuZFJhZGl1cywgdGhpcy5vcHRpb25zLmNlbnRlcikuc3ViKGhhbGZTaXplKVxuXG4gICAgICByZXR1cm4gbmV3IERyYWdnYWJsZShlbGVtZW50LCB7XG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5hcmVhLFxuICAgICAgICBib3VuZDogQm91bmRUb0xpbmUuYm91bmRpbmcoc3RhcnQsIGVuZCksXG4gICAgICAgIHBvc2l0aW9uOiBzdGFydCxcbiAgICAgICAgb246IHtcbiAgICAgICAgICAnZHJhZzptb3ZlJzogKCkgPT4gdGhpcy5kcmF3KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdGhpcy5pc0luaXQgPSB0cnVlXG4gICAgdGhpcy5kcmF3KClcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5pdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueSlcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKClcblxuICAgIGxldCBwb2ludCA9IHRoaXMuZHJhZ2dhYmxlc1swXS5nZXRDZW50ZXIoKVxuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSlcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kcmFnZ2FibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwb2ludCA9IHRoaXMuZHJhZ2dhYmxlc1tpXS5nZXRDZW50ZXIoKVxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhwb2ludC54LCBwb2ludC55KVxuICAgIH1cbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKClcbiAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5vcHRpb25zLmxpbmVXaWR0aFxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMub3B0aW9ucy5zdHJva2VTdHlsZVxuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKVxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlXG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAoY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dCB8fCB0aGlzXG4gICAgdGhpcy5ldmVudHMgPSB7fVxuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vbikge1xuICAgICAgZm9yIChjb25zdCBbZXZlbnROYW1lLCBmbl0gb2YgT2JqZWN0LmVudHJpZXMob3B0aW9ucy5vbikpIHtcbiAgICAgICAgdGhpcy5vbihldmVudE5hbWUsIGZuKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVtaXQoZXZlbnROYW1lKSB7XG4gICAgdGhpcy5pbnRlcnJ1cHRlZCA9IGZhbHNlXG4gICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXG4gICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudE5hbWVdKSByZXR1cm5cblxuICAgIGZvciAoY29uc3QgZnVuYyBvZiB0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICBmdW5jLmFwcGx5KHRoaXMuY29udGV4dCwgYXJncylcbiAgICAgIGlmICh0aGlzLmludGVycnVwdGVkKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGludGVycnVwdCgpIHtcbiAgICB0aGlzLmludGVycnVwdGVkID0gdHJ1ZVxuICB9XG5cbiAgb24oZXZlbnROYW1lLCBmbikge1xuICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdXG4gICAgfVxuXG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKVxuICB9XG5cbiAgcHJlcGVuZE9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXVxuICAgIH1cblxuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0udW5zaGlmdChmbilcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmluZGV4T2YoZm4pXG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cblxuICByZXNldEVtaXR0ZXIgKCkge1xuICAgIHRoaXMuZXZlbnRzID0ge31cbiAgfVxuXG4gIHJlc2V0T24oZXZlbnROYW1lKSB7XG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdXG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYWdnYWJsZSxcbiAgQm91bmRUb0FyYyxcbiAgUmVjdGFuZ2xlXG59IGZyb20gJ2RyYWdlZSdcblxuaW1wb3J0IHtcbiAgZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtLFxuICBnZXRBbmdsZSxcbiAgbm9ybWFsaXplQW5nbGVcbn0gZnJvbSAnLi9nZW9tZXRyeS9hbmdsZXMnXG5cbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9FdmVudEVtaXR0ZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyY1NsaWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGFyZWEsIGVsZW1lbnQsIG9wdGlvbnM9e30pIHtcbiAgICBzdXBlcih1bmRlZmluZWQsIG9wdGlvbnMpXG4gICAgY29uc3QgYXJlYVJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudChhcmVhLCBhcmVhKVxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiBhcmVhUmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgcmFkaXVzOiBhcmVhUmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICBzdGFydEFuZ2xlOiBNYXRoLlBJLFxuICAgICAgZW5kQW5nbGU6IDAsXG4gICAgICBhbmdsZXM6IFtNYXRoLlBJLCAtTWF0aC5QSSAvIDQsIDAsIE1hdGguUEkgLyA0LCBNYXRoLlBJIC8gMl0sXG4gICAgICB0aW1lOiA1MDBcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5zaGlmdGVkQ2VudGVyID0gdGhpcy5vcHRpb25zLmNlbnRlclxuICAgIHRoaXMuYXJlYSA9IGFyZWFcbiAgICB0aGlzLmluaXQoZWxlbWVudClcbiAgfVxuXG4gIGluaXQoZWxlbWVudCkge1xuICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5vcHRpb25zLnN0YXJ0QW5nbGVcbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShcbiAgICAgIGFuZ2xlLFxuICAgICAgdGhpcy5vcHRpb25zLnJhZGl1cyxcbiAgICAgIHRoaXMuc2hpZnRlZENlbnRlclxuICAgIClcblxuICAgIHRoaXMuYW5nbGUgPSBhbmdsZVxuICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IERyYWdnYWJsZShlbGVtZW50LCB7XG4gICAgICBjb250YWluZXI6IHRoaXMuYXJlYSxcbiAgICAgIGJvdW5kOiBCb3VuZFRvQXJjLmJvdW5kaW5nKFxuICAgICAgICB0aGlzLnNoaWZ0ZWRDZW50ZXIsXG4gICAgICAgIHRoaXMub3B0aW9ucy5yYWRpdXMsXG4gICAgICAgIHRoaXMub3B0aW9ucy5zdGFydEFuZ2xlLFxuICAgICAgICB0aGlzLm9wdGlvbnMuZW5kQW5nbGVcbiAgICAgICksXG4gICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICBvbjoge1xuICAgICAgICAnZHJhZzptb3ZlJzogKCkgPT4gdGhpcy5jaGFuZ2UoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVBbmdsZSgpIHtcbiAgICB0aGlzLmFuZ2xlID0gZ2V0QW5nbGUodGhpcy5zaGlmdGVkQ2VudGVyLCB0aGlzLmRyYWdnYWJsZS5wb3NpdGlvbilcbiAgfVxuXG4gIGNoYW5nZSgpIHtcbiAgICB0aGlzLnVwZGF0ZUFuZ2xlKClcbiAgICAvLyAgICAgIHZhciBhbmdsZSA9IEdlb21ldHJ5LmdldE5lYXJlc3RBbmdsZSh0aGlzLm9wdGlvbnMuYW5nbGVzLCB0aGlzLmFuZ2xlKTtcbiAgICAvLyAgICAgIHRoaXMuc2V0QW5nbGUoYW5nbGUsdGhpcy5vcHRpb25zLnRpbWUpO1xuICAgIHRoaXMuZW1pdCgnYXJjc2xpZGVyOmNoYW5nZScsIHsgYW5nbGU6IHRoaXMuYW5nbGUgfSlcbiAgfVxuXG4gIHNldEFuZ2xlKGFuZ2xlLCB0aW1lKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oXG4gICAgICB0aGlzLmFuZ2xlLFxuICAgICAgdGhpcy5vcHRpb25zLnJhZGl1cyxcbiAgICAgIHRoaXMuc2hpZnRlZENlbnRlclxuICAgIClcbiAgICB0aGlzLmFuZ2xlID0gbm9ybWFsaXplQW5nbGUoYW5nbGUsIHBvc2l0aW9uKVxuICAgIHRoaXMuZHJhZ2dhYmxlLnBpblBvc2l0aW9uKHBvc2l0aW9uLCB0aW1lfHwwKVxuICAgIHRoaXMuZW1pdCgnYXJjc2xpZGVyOmNoYW5nZScsIHRoaXMuYW5nbGUpXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGlmICh0eXBlb2Ygc3RvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzdG9wID0gc3RhcnRcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAodHlwZW9mIHN0ZXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgc3RlcCA9IDFcbiAgfVxuICBpZiAoKHN0ZXAgPiAwICYmIHN0YXJ0ID49IHN0b3ApIHx8IChzdGVwIDwgMCAmJiBzdGFydCA8PSBzdG9wKSkge1xuICAgIHJldHVybiBbXVxuICB9XG4gIGZvciAobGV0IGkgPSBzdGFydDsgc3RlcCA+IDAgPyBpIDwgc3RvcCA6IGkgPiBzdG9wOyBpICs9IHN0ZXApIHtcbiAgICByZXN1bHQucHVzaChpKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cbiIsImltcG9ydCBjcmVhdGVDYW52YXMgZnJvbSAnLi91dGlscy9jcmVhdGUtY2FudmFzJ1xuaW1wb3J0IHJhbmdlIGZyb20gJy4vdXRpbHMvcmFuZ2UnXG5pbXBvcnQge1xuICBEcmFnZ2FibGUsXG4gIEJvdW5kVG9BcmMsXG4gIFBvaW50LFxuICBSZWN0YW5nbGUsXG4gIGdldERpc3RhbmNlXG59IGZyb20gJ2RyYWdlZSdcblxuaW1wb3J0IHtcbiAgdG9SYWRpYW4sXG4gIGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbSxcbiAgZ2V0QW5nbGUsXG4gIG5vcm1hbGl6ZUFuZ2xlXG59IGZyb20gJy4vZ2VvbWV0cnkvYW5nbGVzJ1xuXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4vRXZlbnRFbWl0dGVyJ1xuXG5jb25zdCBybmQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSoyNTUpXG59XG5cbmNvbnN0IHRvSGV4U3RyaW5nID0gZnVuY3Rpb24oZGlnaXQpIHtcbiAgbGV0IHN0ciA9IGRpZ2l0LnRvU3RyaW5nKDE2KVxuICB3aGlsZSAoc3RyLmxlbmd0aCA8IDIpIHtcbiAgICBzdHIgPSAnMCcgKyBzdHJcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHJhbmRvbUNvbG9yKCkge1xuICByZXR1cm4gYCMke3RvSGV4U3RyaW5nKHJuZCgpKX0ke3RvSGV4U3RyaW5nKHJuZCgpKX0ke3RvSGV4U3RyaW5nKHJuZCgpKX1gXG59XG5cbmZ1bmN0aW9uIGdldEFycmF5V2l0aEJvdW5kSW5kZXhlcyhpbmRleCwgbGVuZ3RoKSB7XG4gIGNvbnN0IHJldEluZGV4ZXMgPSBbXVxuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgcmV0SW5kZXhlcy5wdXNoKGluZGV4KVxuICAgIHJldEluZGV4ZXMucHVzaCgoaW5kZXggKyAxKSAlIGxlbmd0aClcbiAgfVxuXG4gIHJldHVybiByZXRJbmRleGVzXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJ0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IgKGFyZWEsIGVsZW1lbnRzLCBvcHRpb25zPXt9KSB7XG4gICAgc3VwZXIodW5kZWZpbmVkLCBvcHRpb25zKVxuICAgIGNvbnN0IGFyZWFSZWN0YW5nbGUgPSBSZWN0YW5nbGUuZnJvbUVsZW1lbnQoYXJlYSwgYXJlYSlcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNlbnRlcjogYXJlYVJlY3RhbmdsZS5nZXRDZW50ZXIoKSxcbiAgICAgIHJhZGl1czogYXJlYVJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgdG91Y2hSYWRpdXM6IGFyZWFSZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIGJvdW5kQW5nbGU6IE1hdGguUEkgLyA5LFxuICAgICAgZmlsbFN0eWxlczogcmFuZ2UoMCwgZWxlbWVudHMubGVuZ3RoKS5tYXAoKCkgPT4gcmFuZG9tQ29sb3IoKSksXG4gICAgICBpbml0QW5nbGVzOiByYW5nZSgtOTAsIDI3MCwgMzYwIC8gZWxlbWVudHMubGVuZ3RoKS5tYXAoKGFuZ2xlKSA9PiB0b1JhZGlhbihhbmdsZSkpLFxuICAgICAgbGltaXRJbWc6IG51bGwsXG4gICAgICBsaW1pdEltZ09mZnNldDogbmV3IFBvaW50KDAsIDApXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHRoaXMuYXJlYSA9IGFyZWFcbiAgICB0aGlzLmFyZWFSZWN0YW5nbGUgPSBhcmVhUmVjdGFuZ2xlXG4gICAgdGhpcy5pbml0KGVsZW1lbnRzKVxuICB9XG5cbiAgaW5pdChlbGVtZW50cykge1xuICAgIHRoaXMuY2FudmFzID0gY3JlYXRlQ2FudmFzKHRoaXMuYXJlYSwgdGhpcy5hcmVhUmVjdGFuZ2xlKVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLmRyYWdnYWJsZXMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5vcHRpb25zLmluaXRBbmdsZXNbaV1cbiAgICAgIGNvbnN0IGhhbGZTaXplID0gUG9pbnQuZWxlbWVudFNpemUoZWxlbWVudCkubXVsdCgwLjUpXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShcbiAgICAgICAgYW5nbGUsXG4gICAgICAgIHRoaXMub3B0aW9ucy50b3VjaFJhZGl1cyxcbiAgICAgICAgdGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmFyZWEsXG4gICAgICAgIGJvdW5kOiBCb3VuZFRvQXJjLmJvdW5kaW5nKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5jZW50ZXIuc3ViKGhhbGZTaXplKSxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMudG91Y2hSYWRpdXMsXG4gICAgICAgICAgdGhpcy5nZXRCb3VuZEFuZ2xlKGksIGZhbHNlKSxcbiAgICAgICAgICB0aGlzLmdldEJvdW5kQW5nbGUoaSwgdHJ1ZSlcbiAgICAgICAgKSxcbiAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICBvbjoge1xuICAgICAgICAgICdkcmFnOm1vdmUnOiAoKSA9PiB0aGlzLmRyYXcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmlzSW5pdCA9IHRydWVcbiAgICB0aGlzLmRyYXcoKVxuICB9XG5cbiAgdXBkYXRlQW5nbGVzKCkge1xuICAgIHRoaXMuYW5nbGVzID0gdGhpcy5kcmFnZ2FibGVzLm1hcCgoZHJhZ2dhYmxlKSA9PiB7XG4gICAgICBjb25zdCBoYWxmU2l6ZSA9IGRyYWdnYWJsZS5nZXRTaXplKCkubXVsdCgwLjUpXG4gICAgICByZXR1cm4gZ2V0QW5nbGUodGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpLCBkcmFnZ2FibGUucG9zaXRpb24pXG4gICAgfSlcbiAgfVxuXG4gIGdldEJvdW5kQW5nbGUoaW5kZXgsIGlzQ2xvc3NpbmcpIHtcbiAgICBjb25zdCBzaWduID0gaXNDbG9zc2luZyA/IDEgOiAtMVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGxldCBpID0gKGluZGV4ICsgc2lnbikgJSB0aGlzLmFuZ2xlcy5sZW5ndGhcbiAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICBpICs9IHRoaXMuYW5nbGVzLmxlbmd0aFxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZUFuZ2xlKHRoaXMuYW5nbGVzW2ldIC0gc2lnbiAqIHRoaXMub3B0aW9ucy5ib3VuZEFuZ2xlKVxuICAgIH1cbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5pdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVBbmdsZXMoKVxuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueSlcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaCgoX2RyYWdnYWJsZSwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0FyYyh0aGlzLmNvbnRleHQsIHRoaXMub3B0aW9ucy5jZW50ZXIsIHRoaXMub3B0aW9ucy5yYWRpdXMsIGluZGV4KVxuICAgIH0pXG5cbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaCgoX2RyYWdnYWJsZSwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0xpbWl0SW1nKGluZGV4KVxuICAgIH0pXG5cbiAgICB0aGlzLmVtaXQoJ2NoYXJ0OmRyYXcnKVxuICB9XG5cbiAgY3JlYXRlQ2xvbmUoZWxlbWVudCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCF0aGlzLmlzSW5pdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudChlbGVtZW50LCBlbGVtZW50KVxuICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNlbnRlcjogcmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgcmFkaXVzOiByZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIGZpbGxTdHlsZXM6IHRoaXMub3B0aW9ucy5maWxsU3R5bGVzXG4gICAgfSwgb3B0aW9ucylcblxuICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyhlbGVtZW50LCByZWN0YW5nbGUpXG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgY29uc3QgY2xvbmVPYmogPSB7XG4gICAgICBkcmF3OiAoKSA9PiB7XG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHJlY3RhbmdsZS5zaXplLngsIHJlY3RhbmdsZS5zaXplLnkpXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChfZHJhZ2dhYmxlLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHRoaXMuZHJhd0FyYyhjb250ZXh0LCBvcHRzLmNlbnRlciwgb3B0cy5yYWRpdXMsIGluZGV4KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBjbG9uZU9iai5kcmF3KClcbiAgICByZXR1cm4gY2xvbmVPYmpcbiAgfVxuXG4gIGdldEZpbGxTdHlsZShpbmRleCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmZpbGxTdHlsZXNbaW5kZXhdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF0gPSB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF0uY2FsbCh0aGlzKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbGxTdHlsZXNbaW5kZXhdXG4gIH1cblxuICBkcmF3QXJjKGNvbnRleHQsIGNlbnRlciwgcmFkaXVzLCBpbmRleCkge1xuICAgIGNvbnN0IHN0YXJ0QW5nbGUgPSB0aGlzLmFuZ2xlc1tpbmRleF1cbiAgICBjb25zdCBlbmRBbmdsZSA9IHRoaXMuYW5nbGVzWyhpbmRleCsxKSAlIHRoaXMuYW5nbGVzLmxlbmd0aF1cbiAgICBjb25zdCBjb2xvciA9IHRoaXMuZ2V0RmlsbFN0eWxlKGluZGV4KVxuXG4gICAgY29udGV4dC5iZWdpblBhdGgoKVxuICAgIGNvbnRleHQubW92ZVRvKGNlbnRlci54LCBjZW50ZXIueSlcbiAgICBjb250ZXh0LmFyYyhjZW50ZXIueCwgY2VudGVyLnksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGZhbHNlKVxuICAgIGNvbnRleHQubGluZVRvKGNlbnRlci54LCBjZW50ZXIueSlcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvclxuICAgIGNvbnRleHQuZmlsbCgpXG4gIH1cblxuICBkcmF3TGltaXRJbWcoaW5kZXgpIHtcbiAgICBsZXQgcG9pbnQsIGltZ1xuICAgIGlmICh0aGlzLm9wdGlvbnMubGltaXRJbWcpIHtcbiAgICAgIGltZyA9IHRoaXMub3B0aW9ucy5saW1pdEltZyBpbnN0YW5jZW9mIEFycmF5ID8gdGhpcy5vcHRpb25zLmxpbWl0SW1nW2luZGV4XSA6IHRoaXMub3B0aW9ucy5saW1pdEltZ1xuICAgIH1cblxuICAgIGlmIChpbWcpIHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gbm9ybWFsaXplQW5nbGUodGhpcy5hbmdsZXNbaW5kZXhdKVxuICAgICAgcG9pbnQgPSBuZXcgUG9pbnQoMCwgLWltZy5oZWlnaHQgLyAyKVxuICAgICAgcG9pbnQgPSBwb2ludC5hZGQodGhpcy5vcHRpb25zLmxpbWl0SW1nT2Zmc2V0KVxuICAgICAgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSh0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS54IC8gMiwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueSAvIDIpXG4gICAgICB0aGlzLmNvbnRleHQucm90YXRlKGFuZ2xlKVxuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWcsIHBvaW50LngsIHBvaW50LnkpXG4gICAgICB0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApXG4gICAgfVxuICB9XG5cbiAgZ2V0QW5nbGVzRGlmZigpIHtcbiAgICBjb25zdCBhbmdsZXMgPSB0aGlzLmFuZ2xlcy5zbGljZSgxKVxuICAgIGxldCBiYXNlQW5nbGUgPSB0aGlzLmFuZ2xlc1swXVxuXG4gICAgYW5nbGVzLnB1c2goYmFzZUFuZ2xlKVxuICAgIHJldHVybiBhbmdsZXMubWFwKChhbmdsZSkgPT4ge1xuICAgICAgY29uc3QgZGlmZkFuZ2xlID0gbm9ybWFsaXplQW5nbGUoYW5nbGUgLSBiYXNlQW5nbGUpXG4gICAgICBiYXNlQW5nbGUgPSBhbmdsZVxuICAgICAgcmV0dXJuIGRpZmZBbmdsZVxuICAgIH0pXG4gIH1cblxuICBnZXRQZXJjZW50KCkge1xuICAgIHJldHVybiB0aGlzLmdldEFuZ2xlc0RpZmYoKS5tYXAoKGRpZmZBbmdsZSkgPT4gZGlmZkFuZ2xlIC8gKDIgKiBNYXRoLlBJKSlcbiAgfVxuXG4gIGdldEFyY0Jpc2VjdHJpeHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QW5nbGVzRGlmZigpLm1hcCgoZGlmZkFuZ2xlLCBpKSA9PiB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplQW5nbGUodGhpcy5hbmdsZXNbaV0gKyBkaWZmQW5nbGUgLyAyKVxuICAgIH0pXG4gIH1cblxuICBnZXRBcmNPblBvaW50KHBvaW50KSB7XG4gICAgY29uc3QgYW5nbGUgPSBnZXRBbmdsZSh0aGlzLm9wdGlvbnMuY2VudGVyLCBwb2ludClcbiAgICBjb25zdCByYWRpdXMgPSBnZXREaXN0YW5jZSh0aGlzLm9wdGlvbnMuY2VudGVyLCBwb2ludClcblxuICAgIGlmIChyYWRpdXMgPiB0aGlzLm9wdGlvbnMucmFkaXVzKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG5cbiAgICBsZXQgb2Zmc2V0ID0gLTEsIGksIGpcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5hbmdsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChvZmZzZXQgPT09IC0xIHx8IHRoaXMuYW5nbGVzW29mZnNldF0gPiB0aGlzLmFuZ2xlc1tpXSkge1xuICAgICAgICBvZmZzZXQgPSBpXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGogPSBvZmZzZXQ7IGkgPCB0aGlzLmFuZ2xlcy5sZW5ndGg7IGkrKywgaiA9IChpICsgb2Zmc2V0KSAlIHRoaXMuYW5nbGVzLmxlbmd0aCkge1xuICAgICAgaWYgKGFuZ2xlIDwgdGhpcy5hbmdsZXNbal0pIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKC0taiA8IDApIHtcbiAgICAgIGogKz0gdGhpcy5hbmdsZXMubGVuZ3RoXG4gICAgfVxuICAgIHJldHVybiBqXG4gIH1cblxuICBzZXRBbmdsZXMoYW5nbGVzKSB7XG4gICAgdGhpcy5hbmdsZXMgPSBhbmdsZXNcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaCgoZHJhZ2dhYmxlLCBpKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9IHRoaXMuYW5nbGVzW2ldXG4gICAgICBjb25zdCBoYWxmU2l6ZSA9IGRyYWdnYWJsZS5nZXRTaXplKCkubXVsdCgwLjUpXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShcbiAgICAgICAgYW5nbGUsXG4gICAgICAgIHRoaXMub3B0aW9ucy50b3VjaFJhZGl1cyxcbiAgICAgICAgdGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpXG4gICAgICApXG5cbiAgICAgIGRyYWdnYWJsZS5tb3ZlQW5kU2F2ZShwb3NpdGlvbilcbiAgICB9KVxuICAgIHRoaXMuZHJhdygpXG4gIH1cblxuICBzZXRBY3RpdmVBcmMoaW5kZXgpIHtcbiAgICBjb25zdCBlbmFibGVJbmRleGVzID0gZ2V0QXJyYXlXaXRoQm91bmRJbmRleGVzKGluZGV4LCB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoKVxuICAgIHRoaXMuYWN0aXZlQXJjSW5kZXggPSBpbmRleFxuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChkcmFnZ2FibGUsIGkpID0+IHtcbiAgICAgIGRyYWdnYWJsZS5lbmFibGUgPSBlbmFibGVJbmRleGVzLmluZGV4T2YoaSkgIT09IC0xXG4gICAgfSlcbiAgICB0aGlzLmRyYXcoKVxuICB9XG59XG4iXSwibmFtZXMiOlsic2V0U3R5bGUiLCJlbGVtZW50Iiwic3R5bGUiLCJjc3NUZXh0Iiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJhcHBlbmRGaXJzdENoaWxkIiwibm9kZSIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUNhbnZhcyIsImFyZWEiLCJyZWN0YWdsZSIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIndpbmRvdyIsImdldENvbXB1dGVkU3R5bGUiLCJwb3NpdGlvbiIsInNldEF0dHJpYnV0ZSIsInNpemUiLCJ4IiwieSIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwiX2NyZWF0ZUNsYXNzIiwiX2luaGVyaXRzIiwiX3NldFByb3RvdHlwZU9mIiwiX2dldFByb3RvdHlwZU9mIiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfbm9uSXRlcmFibGVSZXN0IiwiZ2V0QW5nbGUiLCJwMSIsInAyIiwiZGlmZiIsInN1YiIsIm5vcm1hbGl6ZUFuZ2xlIiwiTWF0aCIsImF0YW4yIiwidG9SYWRpYW4iLCJhbmdsZSIsIlBJIiwidmFsIiwiZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtIiwibGVuZ3RoIiwiY2VudGVyIiwiUG9pbnQiLCJhZGQiLCJjb3MiLCJzaW4iLCJTcGlkZXIiLCJlbGVtZW50cyIsIm9wdGlvbnMiLCJhcmVhUmVjdGFuZ2xlIiwiUmVjdGFuZ2xlIiwiZnJvbUVsZW1lbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJkQW5nbGUiLCJnZXRDZW50ZXIiLCJzdGFydFJhZGl1cyIsImVuZFJhZGl1cyIsImdldE1pblNpZGUiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsImZpbGxTdHlsZSIsImluaXQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImRyYWdnYWJsZXMiLCJtYXAiLCJpIiwiaGFsZlNpemUiLCJlbGVtZW50U2l6ZSIsIm11bHQiLCJzdGFydCIsImVuZCIsIkRyYWdnYWJsZSIsImNvbnRhaW5lciIsImJvdW5kIiwiQm91bmRUb0xpbmUiLCJib3VuZGluZyIsIm9uIiwiZHJhdyIsImlzSW5pdCIsImNsZWFyUmVjdCIsImJlZ2luUGF0aCIsInBvaW50IiwibW92ZVRvIiwibGluZVRvIiwiY2xvc2VQYXRoIiwic3Ryb2tlIiwiZmlsbCIsIkV2ZW50RW1pdHRlciIsImV2ZW50cyIsImVudHJpZXMiLCJldmVudE5hbWUiLCJmbiIsImludGVycnVwdGVkIiwiYXJncyIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImZ1bmMiLCJhcHBseSIsInB1c2giLCJ1bnNoaWZ0IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiQXJjU2xpZGVyIiwidW5kZWZpbmVkIiwicmFkaXVzIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwiYW5nbGVzIiwidGltZSIsInNoaWZ0ZWRDZW50ZXIiLCJkcmFnZ2FibGUiLCJCb3VuZFRvQXJjIiwiY2hhbmdlIiwidXBkYXRlQW5nbGUiLCJlbWl0IiwicGluUG9zaXRpb24iLCJyYW5nZSIsInN0b3AiLCJzdGVwIiwicmVzdWx0Iiwicm5kIiwicm91bmQiLCJyYW5kb20iLCJ0b0hleFN0cmluZyIsImRpZ2l0Iiwic3RyIiwidG9TdHJpbmciLCJyYW5kb21Db2xvciIsImdldEFycmF5V2l0aEJvdW5kSW5kZXhlcyIsInJldEluZGV4ZXMiLCJDaGFydCIsInRvdWNoUmFkaXVzIiwiYm91bmRBbmdsZSIsImZpbGxTdHlsZXMiLCJpbml0QW5nbGVzIiwibGltaXRJbWciLCJsaW1pdEltZ09mZnNldCIsImdldEJvdW5kQW5nbGUiLCJnZXRTaXplIiwiaXNDbG9zc2luZyIsInNpZ24iLCJ1cGRhdGVBbmdsZXMiLCJmb3JFYWNoIiwiX2RyYWdnYWJsZSIsImRyYXdBcmMiLCJkcmF3TGltaXRJbWciLCJyZWN0YW5nbGUiLCJvcHRzIiwiY2xvbmVPYmoiLCJjb2xvciIsImdldEZpbGxTdHlsZSIsImFyYyIsImltZyIsIkFycmF5IiwidHJhbnNsYXRlIiwicm90YXRlIiwiZHJhd0ltYWdlIiwic2V0VHJhbnNmb3JtIiwiYmFzZUFuZ2xlIiwiZGlmZkFuZ2xlIiwiZ2V0QW5nbGVzRGlmZiIsImdldERpc3RhbmNlIiwib2Zmc2V0IiwiaiIsIm1vdmVBbmRTYXZlIiwiZW5hYmxlSW5kZXhlcyIsImFjdGl2ZUFyY0luZGV4IiwiZW5hYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxTQUFTQSxRQUFULENBQWtCQyxPQUFsQixFQUEyQkMsS0FBM0IsRUFBa0M7RUFDaENBLEVBQUFBLEtBQUssR0FBR0EsS0FBSyxJQUFJLEVBQWpCO0VBQ0EsTUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0VBQ0EsT0FBSyxJQUFNQyxHQUFYLElBQWtCRixLQUFsQixFQUF5QjtFQUN2QixRQUFJQSxLQUFLLENBQUNHLGNBQU4sQ0FBcUJELEdBQXJCLENBQUosRUFBK0I7RUFDN0JELE1BQUFBLE9BQU8sSUFBSUMsR0FBRyxHQUFHLElBQU4sR0FBYUYsS0FBSyxDQUFDRSxHQUFELENBQWxCLEdBQTBCLElBQXJDO0VBQ0Q7RUFDRjs7RUFFREgs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QUFJLEdBQUcsRUFBRSxJQUFJO0VBQ2IsSUFBSSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFO0VBQzdCLE1BQU0sSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZILE1BQU0sSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUN6TCxNQUFNLE9BQU8sSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQzNDLEtBQUs7RUFDTCxHQUFHLEVBQUU7RUFDTCxJQUFJLEdBQUcsRUFBRSxLQUFLO0VBQ2QsSUFBSSxLQUFLLEVBQUUsU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFO0VBQzlCLE1BQU0sSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZILE1BQU0sSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7RUFFekwsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQ3RDLFFBQVEsT0FBTyxJQUFJLENBQUM7RUFDcEIsT0FBTzs7RUFFUCxNQUFNLE9BQU8sSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQzNDLEtBQUs7RUFDTCxHQUFHLEVBQUU7RUFDTCxJQUFJLEdBQUcsRUFBRSxjQUFjO0VBQ3ZCLElBQUksS0FBSyxFQUFFLFNBQVMsWUFBWSxDQUFDLENBQUMsRUFBRTtFQUNwQyxNQUFNLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFB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LENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0MsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztFQUNwQixJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzNCLEdBQUcsTUFBTTtFQUNULElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9DLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztFQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztFQUNwQixJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzNCLEdBQUc7RUFDSCxDQUFDO0VBQ0QsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDOUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFDLE1BQU0sRUFBRSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDckMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDdkMsTUFBTSxDQUFDLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztFQUN0QixFQUFFLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDbkQsQ0FBQztFQUNELFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7RUFDbEQsRUFB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
