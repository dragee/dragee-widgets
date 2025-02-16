var DrageeWidgets = (function (exports) {
  'use strict';

  function setStyle(element, style) {
    style = style || {};
    let cssText = '';
    for (const key in style) {
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
    const canvas = document.createElement('canvas');
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

  /** Class representing a point. */
  class Point {
    /**
    * Create a point.
    * @param {number} x - The x value.
    * @param {number} y - The y value.
    */
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    add(p) {
      return new Point(this.x + p.x, this.y + p.y);
    }
    sub(p) {
      return new Point(this.x - p.x, this.y - p.y);
    }
    mult(k) {
      return new Point(this.x * k, this.y * k);
    }
    negative() {
      return new Point(-this.x, -this.y);
    }
    compare(p) {
      return this.x === p.x && this.y === p.y;
    }
    clone() {
      return new Point(this.x, this.y);
    }
    toString() {
      return `{x=${this.x},y=${this.y}`;
    }
    static elementOffset(element, parent) {
      parent = parent || element.parentNode;
      const elementRect = element.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      return new Point(elementRect.left - parentRect.left, elementRect.top - parentRect.top);
    }
    static elementSize(element) {
      const elementRect = element.getBoundingClientRect();
      return new Point(elementRect.width, elementRect.height);
    }
  }

  class Rectangle {
    constructor(position, size) {
      this.position = position;
      this.size = size;
    }
    getP1() {
      return this.position;
    }
    getP2() {
      return new Point(this.position.x + this.size.x, this.position.y);
    }
    getP3() {
      return this.position.add(this.size);
    }
    getP4() {
      return new Point(this.position.x, this.position.y + this.size.y);
    }
    getCenter() {
      return this.position.add(this.size.mult(0.5));
    }
    or(rect) {
      const position = new Point(Math.min(this.position.x, rect.position.x), Math.min(this.position.y, rect.position.y));
      const size = new Point(Math.max(this.position.x + this.size.x, rect.position.x + rect.size.x), Math.max(this.position.y + this.size.y, rect.position.y + rect.size.y)).sub(position);
      return new Rectangle(position, size);
    }
    and(rect) {
      const position = new Point(Math.max(this.position.x, rect.position.x), Math.max(this.position.y, rect.position.y));
      const size = new Point(Math.min(this.position.x + this.size.x, rect.position.x + rect.size.x), Math.min(this.position.y + this.size.y, rect.position.y + rect.size.y)).sub(position);
      if (size.x <= 0 || size.y <= 0) {
        return null;
      }
      return new Rectangle(position, size);
    }
    includePoint(p) {
      return !(this.position.x > p.x || this.position.x + this.size.x < p.x || this.position.y > p.y || this.position.y + this.size.y < p.y);
    }
    includeRectangle(rectangle) {
      return this.includePoint(rectangle.position) && this.includePoint(rectangle.getP3());
    }
    moveToBound(rect, axis) {
      let selAxis, crossRectangle;
      if (axis) {
        selAxis = axis;
      } else {
        crossRectangle = this.and(rect);
        if (!crossRectangle) {
          return rect;
        }
        selAxis = crossRectangle.size.x > crossRectangle.size.y ? 'y' : 'x';
      }
      const thisCenter = this.getCenter();
      const rectCenter = rect.getCenter();
      const sign = thisCenter[selAxis] > rectCenter[selAxis] ? -1 : 1;
      const offset = sign > 0 ? this.position[selAxis] + this.size[selAxis] - rect.position[selAxis] : this.position[selAxis] - (rect.position[selAxis] + rect.size[selAxis]);
      rect.position[selAxis] = rect.position[selAxis] + offset;
      return rect;
    }
    getSquare() {
      return this.size.x * this.size.y;
    }
    styleApply(el) {
      el = el || document.querySelector('ind');
      el.style.left = this.position.x + 'px';
      el.style.top = this.position.y + 'px';
      el.style.width = this.size.x + 'px';
      el.style.height = this.size.y + 'px';
    }
    growth(size) {
      this.size = this.size.add(size);
      this.position = this.position.add(size.mult(-0.5));
    }
    getMinSide() {
      return Math.min(this.size.x, this.size.y);
    }
    static fromElement(element) {
      let parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : element.parentNode;
      let isConsiderTranslate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      const position = Point.elementOffset(element, parent, isConsiderTranslate);
      const size = Point.elementSize(element);
      return new Rectangle(position, size);
    }
  }

  function getDefaultContainer(element) {
    let container = element.parentNode;
    while (container.parentNode && window.getComputedStyle(container)['position'] === 'static' && container.tagName !== 'BODY') {
      container = container.parentNode;
    }
    return container;
  }

  let EventEmitter$1 = class EventEmitter {
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.events = {};
      if (options && options.on) {
        for (const [eventName, fn] of Object.entries(options.on)) {
          this.on(eventName, fn);
        }
      }
    }
    emit(eventName) {
      this.interrupted = false;
      const args = [].slice.call(arguments, 1);
      if (!this.events[eventName]) return;
      for (const func of this.events[eventName]) {
        func(...args);
        if (this.interrupted) {
          return;
        }
      }
    }
    interrupt() {
      this.interrupted = true;
    }
    on(eventName, fn) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(fn);
    }
    prependOn(eventName, fn) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].unshift(fn);
    }
    unsubscribe(eventName, fn) {
      if (this.events[eventName]) {
        const index = this.events[eventName].indexOf(fn);
        this.events[eventName].splice(index, 1);
      }
    }
    resetEmitter() {
      this.events = {};
    }
    resetOn(eventName) {
      this.events[eventName] = [];
    }
  };

  function getDistance(p1, p2) {
    const dx = p1.x - p2.x,
      dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function transformedSpaceDistanceFactory(options) {
    return (p1, p2) => {
      return Math.sqrt(Math.pow(options.x * Math.abs(p1.x - p2.x), 2) + Math.pow(options.y * Math.abs(p1.y - p2.y), 2));
    };
  }
  function indexOfNearestPoint(arr, val, radius) {
    let getDistanceFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getDistance;
    let size,
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

  //Return crossing point of two lines
  function directCrossing(L1P1, L1P2, L2P1, L2P2) {
    let temp, k1, k2, b1, b2, x, y;
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
    const AP = new Point(P.x - A.x, P.y - A.y),
      AB = new Point(B.x - A.x, B.y - A.y),
      ab2 = AB.x * AB.x + AB.y * AB.y,
      ap_ab = AP.x * AB.x + AP.y * AB.y,
      t = ap_ab / ab2;
    return new Point(A.x + AB.x * t, A.y + AB.y * t);
  }
  function getPointOnLineByLenght(LP1, LP2, lenght) {
    const dx = LP2.x - LP1.x;
    const dy = LP2.y - LP1.y;
    const percent = lenght / getDistance(LP1, LP2);
    return new Point(LP1.x + percent * dx, LP1.y + percent * dy);
  }
  function addPointToBoundPoints(boundpoints, point, isRight) {
    const result = boundpoints.filter(bPoint => {
      return bPoint.y > point.y || (bPoint.x > point.x);
    });
    for (let i = 0; i < result.length; i++) {
      if (point.y < result[i].y) {
        result.splice(i, 0, point);
        return result;
      }
    }
    result.push(point);
    return result;
  }

  function getAngleDiff(alpha, beta) {
    const minAngle = Math.min(alpha, beta);
    const maxAngle = Math.max(alpha, beta);
    return Math.min(maxAngle - minAngle, minAngle + Math.PI * 2 - maxAngle);
  }
  function getAngle$1(p1, p2) {
    const diff = p2.sub(p1);
    return normalizeAngle$1(Math.atan2(diff.y, diff.x));
  }
  function boundAngle(min, max, val) {
    let dmin, dmax;
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

  class Bound {
    constructor() {}
    bound(point, _size) {
      return point;
    }
    refresh() {}
    static bounding() {
      const instance = new this(...arguments);
      return instance.bound.bind(instance);
    }
  }
  class BoundToRectangle extends Bound {
    constructor(rectangle) {
      super();
      this.rectangle = rectangle;
    }
    bound(point, size) {
      const calcPoint = point.clone();
      const rectP2 = this.rectangle.getP3();
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
  }
  class BoundToElement extends BoundToRectangle {
    constructor(element, container) {
      super(Rectangle.fromElement(element, container));
      this.element = element;
      this.container = container;
    }
    refresh() {
      this.rectangle = Rectangle.fromElement(this.element, this.container);
    }
  }
  class BoundToLine extends Bound {
    constructor(startPoint, endPoint) {
      super();
      this.startPoint = startPoint;
      this.endPoint = endPoint;
      const alpha = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
      const beta = alpha + Math.PI / 2;
      this.someK = 10;
      this.cosBeta = Math.cos(beta);
      this.sinBeta = Math.sin(beta);
    }
    bound(point, size) {
      const point2 = new Point(point.x + this.someK * this.cosBeta, point.y + this.someK * this.sinBeta);
      const newEndPoint = getPointOnLineByLenght(this.endPoint, this.startPoint, size.x);
      const pointCrossing = directCrossing(this.startPoint, this.endPoint, point, point2);
      return boundToLine(this.startPoint, newEndPoint, pointCrossing);
    }
  }
  class BoundToCircle extends Bound {
    constructor(center, radius) {
      super();
      this.center = center;
      this.radius = radius;
    }
    bound(point, _size) {
      return getPointOnLineByLenght(this.center, point, this.radius);
    }
  }
  class BoundToArc extends BoundToCircle {
    constructor(center, radius, startAngle, endAngle) {
      super(center, radius);
      this._startAngle = startAngle;
      this._endAngle = endAngle;
    }
    startAngle() {
      return typeof this._startAngle === 'function' ? this._startAngle() : this._startAngle;
    }
    endAngle() {
      return typeof this._endAngle === 'function' ? this._endAngle() : this._endAngle;
    }
    bound(point, _size) {
      let angle = getAngle$1(this.center, point);
      angle = normalizeAngle$1(angle);
      angle = boundAngle(this.startAngle(), this.endAngle(), angle);
      return getPointFromRadialSystem$1(angle, this.radius, this.center);
    }
  }

  function removeItem (array, val) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === val) {
        array.splice(i, 1);
        i--;
      }
    }
    return array;
  }

  function range$1(start, stop, step) {
    const result = [];
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
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }
    return result;
  }

  class BasicStrategy {
    constructor(rectangle) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.rectangle = rectangle;
      this.options = options;
    }
    get boundRect() {
      return typeof this.rectangle === 'function' ? this.rectangle() : this.rectangle;
    }
  }
  class FloatLeftStrategy extends BasicStrategy {
    constructor(rectangle) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      super(rectangle, options);
      this.options = Object.assign({
        removable: true
      }, options);
      this.radius = options.radius || 80;
      this.paddingTopLeft = options.paddingTopLeft || new Point(0, 0);
      this.paddingBottomRight = options.paddingBottomRight || new Point(0, 0);
      this.yGapBetweenDraggables = options.yGapBetweenDraggables || 0;
      this.getDistance = options.getDistance || getDistance;
      this.getPosition = options.getPosition || (draggable => draggable.position);
    }
    positioning(rectangleList, _indexesOfNews) {
      const boundRect = this.boundRect;
      const rectP2 = boundRect.getP2();
      let boundaryPoints = [boundRect.position];
      rectangleList.forEach((rect, rectIndex) => {
        let position,
          isValid = false;
        for (let i = 0; i < boundaryPoints.length; i++) {
          position = new Point(boundaryPoints[i].x + this.paddingTopLeft.x, i > 0 ? boundaryPoints[i - 1].y + this.yGapBetweenDraggables : boundRect.position.y + this.paddingTopLeft.y);
          isValid = position.x + rect.size.x < rectP2.x;
          if (isValid) {
            break;
          }
        }
        if (!isValid) {
          position = new Point(boundRect.position.x + this.paddingTopLeft.x, boundaryPoints[boundaryPoints.length - 1].y + (rectIndex > 0 ? this.yGapBetweenDraggables : this.paddingTopLeft.y));
        }
        rect.position = position;
        if (this.options.removable && rect.getP3().y > boundRect.getP3().y) {
          rect.removable = true;
        }
        boundaryPoints = addPointToBoundPoints(boundaryPoints, rect.getP3().add(this.paddingBottomRight));
      });
      return rectangleList;
    }
    sorting(odlDraggablesList, newDraggables, indexOfNews) {
      const newList = odlDraggablesList.concat();
      const listOldPosition = odlDraggablesList.map(draggable => draggable.getPosition());
      newDraggables.forEach(newDraggable => {
        let index = indexOfNearestPoint(listOldPosition, this.getPosition(newDraggable), this.radius, this.getDistance);
        if (index === -1) {
          index = newList.length;
        } else {
          index = newList.indexOf(odlDraggablesList[index]);
        }
        newList.splice(index, 0, newDraggable);
      });
      newDraggables.forEach(newDraggable => {
        indexOfNews.push(newList.indexOf(newDraggable));
      });
      return newList;
    }
  }

  const addToDefaultScope$1 = function (target) {
    defaultScope.addTarget(target);
  };
  class Target extends EventEmitter$1 {
    constructor(element, draggables) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      super(options);
      const target = this;
      this.options = Object.assign({
        timeEnd: 200,
        timeExcange: 400
      }, options);
      this.positioningStrategy = options.strategy || new FloatLeftStrategy(this.getRectangle.bind(this), {
        radius: 80,
        getDistance: transformedSpaceDistanceFactory({
          x: 1,
          y: 4
        }),
        removable: true
      });
      this.element = element;
      draggables.forEach(draggable => draggable.targets.push(target));
      this.draggables = draggables;
      Target.emitter.emit('target:create', this);
      this.startBounding();
      this.init();
    }
    startBounding() {
      this.bound = this.options.bound || BoundToElement.bounding(this.element);
    }
    positioning(draggables, indexesOfNew) {
      return this.positioningStrategy.positioning(draggables, indexesOfNew);
    }
    sorting(oldDraggables, newDraggables, indexOfNews) {
      return this.positioningStrategy.sorting(oldDraggables, newDraggables, indexOfNews);
    }
    init() {
      let rectangles, indexesOfNew;
      this.innerDraggables = this.draggables.filter(draggable => {
        let element = draggable.element.parentNode;
        while (element) {
          if (element === this.element) {
            return true;
          }
          element = element.parentNode;
        }
        return false;
      });
      if (this.innerDraggables.length) {
        indexesOfNew = range$1(this.innerDraggables.length);
        rectangles = this.positioning(this.innerDraggables.map(draggable => {
          return draggable.getRectangle();
        }), indexesOfNew);
        this.setPosition(rectangles, indexesOfNew);
        this.innerDraggables.forEach(draggable => this.emit('target:add', draggable));
      }
    }
    getRectangle() {
      return Rectangle.fromElement(this.element, this.container, true);
    }
    catchDraggable(draggable) {
      if (this.options.catchDraggable) {
        return this.options.catchDraggable(this, draggable);
      } else {
        const targetRectangle = this.getRectangle();
        const draggableSquare = draggable.getRectangle().getSquare();
        return draggableSquare < targetRectangle.getSquare() && targetRectangle.includePoint(draggable.getCenter());
      }
    }
    getPosition() {
      return this.getRectangle().position;
    }
    getSize() {
      return this.getRectangle().size;
    }
    destroy() {
      scopes.forEach(scope => removeItem(scope.targets, this));
    }
    refresh() {
      const rectangles = this.positioning(this.innerDraggables.map(draggable => {
        return draggable.getRectangle();
      }), []);
      this.setPosition(rectangles, [], 0);
    }
    onEnd(draggable) {
      const newDraggablesIndex = [];
      if (this.getRectangle().includePoint(draggable.getCenter())) {
        draggable.position = this.bound(draggable.position, draggable.getSize());
      } else {
        return false;
      }
      this.emit('target:beforeAdd', draggable);
      this.innerDraggables = this.sorting(this.innerDraggables, [draggable], newDraggablesIndex);
      const rectangles = this.positioning(this.innerDraggables.map(draggable => {
        return draggable.getRectangle();
      }), newDraggablesIndex);
      this.setPosition(rectangles, newDraggablesIndex);
      if (this.innerDraggables.indexOf(draggable) !== -1) {
        this.addRemoveOnMove(draggable);
      }
      return true;
    }
    setPosition(rectangles, indexesOfNew, time) {
      this.innerDraggables.slice(0).forEach((draggable, i) => {
        const rect = rectangles[i],
          timeEnd = time || time === 0 ? time : indexesOfNew.indexOf(i) !== -1 ? this.options.timeEnd : this.options.timeExcange;
        if (rect.removable) {
          draggable.move(draggable.initialPosition, timeEnd, true, true);
          removeItem(this.innerDraggables, draggable);
          this.emit('target:remove', draggable);
        } else {
          draggable.move(rect.position, timeEnd, true, true);
        }
      });
    }
    add(draggable, time) {
      const newDraggablesIndex = this.innerDraggables.length;
      this.emit('target:beforeAdd', draggable);
      this.pushInnerDraggable(draggable);
      const rectangles = this.positioning(this.innerDraggables.map(draggable => {
        return draggable.getRectangle();
      }), newDraggablesIndex, draggable);
      this.setPosition(rectangles, [newDraggablesIndex], time || 0);
      if (this.innerDraggables.indexOf(draggable) !== -1) {
        this.addRemoveOnMove(draggable);
      }
    }
    pushInnerDraggable(draggable) {
      if (this.innerDraggables.indexOf(draggable) === -1) {
        this.innerDraggables.push(draggable);
      }
    }
    addRemoveOnMove(draggable) {
      draggable.on('drag:move', this.removeHandler = () => {
        this.remove(draggable);
      });
      this.emit('target:add', draggable);
    }
    remove(draggable) {
      draggable.unsubscribe('drag:move', this.removeHandler);
      const index = this.innerDraggables.indexOf(draggable);
      if (index === -1) {
        return;
      }
      this.innerDraggables.splice(index, 1);
      const rectangles = this.positioning(this.innerDraggables.map(draggable => {
        return draggable.getRectangle();
      }), []);
      this.setPosition(rectangles, []);
      this.emit('target:remove', draggable);
    }
    reset() {
      this.innerDraggables.forEach(draggable => {
        draggable.move(draggable.initialPosition, 0, true, true);
        this.emit('target:remove', draggable);
      });
      this.innerDraggables = [];
    }
    getSortedDraggables() {
      this.innerDraggables.slice();
    }
    get container() {
      return this._container = this._container || this.options.container || this.options.parent || getDefaultContainer(this.element);
    }
  }
  Target.emitter = new EventEmitter$1();
  Target.emitter.on('target:create', addToDefaultScope$1);

  const scopes = [];
  class Scope extends EventEmitter$1 {
    constructor(draggables, targets) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      super(options);
      scopes.forEach(scope => {
        if (draggables) {
          draggables.forEach(draggable => {
            removeItem(scope.draggables, draggable);
          });
        }
        if (targets) {
          targets.forEach(target => {
            removeItem(scope.targets, target);
          });
        }
      });
      this.draggables = draggables || [];
      this.targets = targets || [];
      scopes.push(this);
      this.options = {
        timeEnd: options.timeEnd || 400
      };
      this.init();
    }
    init() {
      this.draggables.forEach(draggable => {
        draggable.dragEndAction = () => this.onEnd(draggable);
      });
    }
    addDraggable(draggable) {
      this.draggables.push(draggable);
      draggable.dragEndAction = () => this.onEnd(draggable);
    }
    addTarget(target) {
      this.targets.push(target);
    }
    onEnd(draggable) {
      const shotTargets = this.targets.filter(target => {
        return target.draggables.indexOf(draggable) !== -1;
      }).filter(target => {
        return target.catchDraggable(draggable);
      }).sort((a, b) => {
        return a.getRectangle().getSquare() - b.getRectangle().getSquare();
      });
      if (shotTargets.length) {
        shotTargets[0].onEnd(draggable);
      } else if (draggable.targets.length) {
        draggable.pinPosition(draggable.initialPosition, this.options.timeEnd);
      }
      this.emit('scope:change');
    }
    reset() {
      this.targets.forEach(target => target.reset());
    }
    refresh() {
      this.draggables.forEach(draggable => draggable.refresh());
      this.targets.forEach(target => target.refresh());
    }
    get positions() {
      return this.targets.map(target => {
        return target.innerDraggables.map(draggable => this.draggables.indexOf(draggable));
      });
    }
    set positions(positions) {
      const message = 'wrong array length';
      if (positions.length === this.targets.length) {
        this.targets.forEach(target => target.reset());
        positions.forEach((targetIndexes, i) => {
          targetIndexes.forEach(index => {
            this.targets[i].add(this.draggables[index]);
          });
        });
      } else {
        throw message;
      }
    }
  }
  const defaultScope = new Scope();

  function throttle(func, wait) {
    let lastTime = 0;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const now = Date.now();
      if (now - lastTime >= wait) {
        func.apply(context, args);
        lastTime = now;
      }
    };
  }

  function getParentsChain(childElement, rootElement) {
    const chain = [];
    let element = childElement;
    while (element.parentNode && element !== rootElement) {
      chain.unshift(element.parentNode);
      element = element.parentNode;
    }
    return chain;
  }

  const throttledDragOver = (callback, duration) => {
    const throttledCallback = throttle(event => callback(event), duration);
    return event => {
      event.preventDefault();
      throttledCallback(event);
    };
  };
  const passiveFalse = {
    passive: false
  };
  const isTouch = navigator.maxTouchPoints > 0;
  const mouseEvents = {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup'
  };
  const touchEvents = {
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend'
  };
  const draggables = [];
  const transformProperty = 'transform';
  const transitionProperty = 'transition';
  function getTouchByID(element, touchId) {
    for (let i = 0; i < element.changedTouches.length; i++) {
      if (element.changedTouches[i].identifier === touchId) {
        return element.changedTouches[i];
      }
    }
    return false;
  }
  function preventDoubleInit(draggable) {
    const message = "for this element Dragee.Draggable is already exist, don't create it twice ";
    if (draggables.some(existing => draggable.element === existing.element)) {
      throw message;
    }
    draggables.push(draggable);
  }
  function addToDefaultScope(draggable) {
    defaultScope.addDraggable(draggable);
  }
  function copyStyles(source, destination) {
    const cs = window.getComputedStyle(source);
    for (let i = 0; i < cs.length; i++) {
      const key = cs[i];
      if (key.indexOf('transition') < 0 && key.indexOf('transform') < 0) {
        destination.style[key] = cs[key];
      }
    }
    for (let i = 0; i < source.children.length; i++) {
      copyStyles(source.children[i], destination.children[i]);
    }
  }
  class Draggable extends EventEmitter$1 {
    constructor(element) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      super(options);
      this.targets = [];
      this.options = options;
      this.element = element;
      preventDoubleInit(this);
      Draggable.emitter.emit('draggable:create', this);
      this._enable = true;
      this.startBounding();
      this.startPositioning();
      this.startListening();
    }
    startBounding() {
      if (this.options.bound) {
        this.bounding = {
          bound: this.options.bound
        };
      } else {
        this.bounding = new BoundToElement(this.container, this.container);
      }
    }
    startPositioning() {
      this._setDefaultTransition();
      this.offset = Point.elementOffset(this.element, this.container);
      this.pinnedPosition = this.offset;
      this.position = this.offset;
      this.initialPosition = this.options.position || this.offset;
      this.pinPosition(this.initialPosition);
      if (this.bounding.refresh) {
        this.bounding.refresh();
      }
    }
    startListening() {
      this._dragStart = event => this.dragStart(event);
      this._dragMove = event => this.dragMove(event);
      this._dragEnd = event => this.dragEnd(event);
      this._nativeDragStart = event => this.nativeDragStart(event);
      this._nativeDragOver = throttledDragOver(event => this.nativeDragOver(event), this.dragOverThrottleDuration);
      this._nativeDragEnd = event => this.nativeDragEnd(event);
      this._nativeDrop = event => this.nativeDrop(event);
      this._scroll = event => this.onScroll(event);
      this.handler.addEventListener(touchEvents.start, this._dragStart, passiveFalse);
      this.handler.addEventListener(mouseEvents.start, this._dragStart, passiveFalse);
    }
    getSize() {
      return Point.elementSize(this.element);
    }
    getPosition() {
      this.position = this.offset.add(this._transformPosition || new Point(0, 0));
      return this.position;
    }
    getCenter() {
      return this.position.add(this.getSize().mult(0.5));
    }
    _setDefaultTransition() {
      if (!this.element.style[transitionProperty]) {
        this.element.style[transitionProperty] = window.getComputedStyle(this.element)[transitionProperty];
      }
    }
    _setTransition(time) {
      let transition = this.element.style[transitionProperty];
      const transitionCss = `transform ${time}ms`;
      if (!/transform\s?\d*m?s?/.test(transition)) {
        if (transition) {
          transition += `, ${transitionCss}`;
        } else {
          transition = transitionCss;
        }
      } else {
        transition = transition.replace(/transform\s?\d*m?s?/g, transitionCss);
      }
      if (this.element.style[transitionProperty] !== transition) {
        this.element.style[transitionProperty] = transition;
      }
    }
    _setTranslate(point) {
      this._transformPosition = point;
      const translateCss = `translate3d(${point.x}px, ${point.y}px, 0px)`;
      let transform = this.element.style[transformProperty];
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
    move(point) {
      let time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      let isSilent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      point = point.clone();
      this.position = point;
      this._setTransition(time);
      this._setTranslate(point.sub(this.offset));
      if (!isSilent) {
        this.emit('drag:move');
      }
    }
    pinPosition(point) {
      let time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      let silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      this.pinnedPosition = point.clone();
      this.move(this.pinnedPosition, time, silent);
    }
    resetPositionToInitial() {
      this.pinPosition(this.initialPosition);
    }
    refreshPosition() {
      this.setPosition(this.getPosition());
    }
    setPosition(point) {
      point = point.clone();
      this.position = point;
      this._setTransition(0);
      this._setTranslate(point.sub(this.offset));
    }
    determineDirection(point) {
      this._previousDirectionPosition ||= this._startPosition;
      this.leftDirection = this._previousDirectionPosition.x < point.x;
      this.rightDirection = this._previousDirectionPosition.x > point.x;
      this.upDirection = this._previousDirectionPosition.y > point.y;
      this.downDirection = this._previousDirectionPosition.y < point.y;
      this._previousDirectionPosition = point;
    }
    seemsScrolling() {
      return +new Date() - this._startTouchTimestamp < this.touchDraggingThreshold;
    }
    shouldUseNativeDragAndDrop() {
      if (this.isTouchEvent) {
        return this.nativeDragAndDrop && this.emulateNativeDragAndDropOnTouch;
      } else {
        return this.nativeDragAndDrop;
      }
    }
    dragStart(event) {
      if (!this._enable) {
        return;
      }
      if (this.stopPropagationOnDragStart) {
        event.stopPropagation();
      }
      this.isTouchEvent = isTouch && event instanceof window.TouchEvent;
      this.touchPoint = this._startTouchPoint = new Point(this.isTouchEvent ? event.changedTouches[0].pageX : event.clientX, this.isTouchEvent ? event.changedTouches[0].pageY : event.clientY);
      this._startPosition = this.getPosition();
      if (this.isTouchEvent) {
        this._touchId = event.changedTouches[0].identifier;
        this._startTouchTimestamp = +new Date();
      }
      this._startWindowScrollPoint = this.windowScrollPoint;
      this._startScrollElementsOffset = this.scrollElementsOffset;
      if (event.target instanceof window.HTMLInputElement || event.target instanceof window.HTMLInputElement) {
        event.target.focus();
      }
      if (this.shouldUseNativeDragAndDrop()) {
        if (this.isTouchEvent && this.emulateNativeDragAndDropOnTouch) {
          this._startParentsScrollOffset = this.parentsScrollOffset;
          const emulateOnFirstMove = event => {
            if (this.seemsScrolling()) {
              this.cancelDragging();
            } else {
              this.emulateNativeDragAndDrop(event);
            }
            cancelEmulation();
          };
          const cancelEmulation = () => {
            document.removeEventListener(touchEvents.move, emulateOnFirstMove);
            document.removeEventListener(touchEvents.end, cancelEmulation);
          };
          document.addEventListener(touchEvents.move, emulateOnFirstMove, passiveFalse);
          document.addEventListener(touchEvents.end, cancelEmulation, passiveFalse);
        } else {
          this.element.addEventListener('dragstart', this._nativeDragStart);
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
      this.scrollElements.forEach(p => p.addEventListener('scroll', this._scroll));
      this.emit('drag:start');
    }
    dragMove(event) {
      let touch;
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
      let point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.windowScrollPoint.sub(this._startWindowScrollPoint)).add(this.scrollElementsOffset.sub(this._startScrollElementsOffset));
      point = this.bounding.bound(point, this.getSize());
      this.determineDirection(point);
      this.move(point);
      this.element.classList.add('dragee-active');
    }
    dragEnd(event) {
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
      setTimeout(() => this.element.classList.remove('dragee-active'));
    }
    onScroll(_event) {
      let point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.windowScrollPoint.sub(this._startWindowScrollPoint)).add(this.scrollElementsOffset.sub(this._startScrollElementsOffset));
      point = this.bounding.bound(point, this.getSize());
      if (!this.nativeDragAndDrop) {
        this.determineDirection(point);
        this.move(point);
      }
    }
    nativeDragStart(event) {
      event.stopPropagation();
      event.dataTransfer.setData('text', 'FireFox fix');
      event.dataTransfer.effectAllowed = 'move';
      document.addEventListener('dragover', this._nativeDragOver);
      document.addEventListener('dragend', this._nativeDragEnd);
      document.addEventListener('drop', this._nativeDrop);
    }
    nativeDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      this.element.classList.add('dragee-placeholder');
      if (event.clientX === 0 && event.clientY === 0) {
        return;
      }
      this.touchPoint = new Point(event.clientX, event.clientY);
      let point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.windowScrollPoint.sub(this._startWindowScrollPoint)).add(this.scrollElementsOffset.sub(this._startScrollElementsOffset));
      point = this.bounding.bound(point, this.getSize());
      this.determineDirection(point);
      this.position = point;
      this.emit('drag:move');
    }
    nativeDragEnd(_event) {
      this.element.classList.remove('dragee-placeholder');
      this.dragEndAction();
      this.emit('drag:end');
      document.removeEventListener('dragover', this._nativeDragOver);
      document.removeEventListener('dragend', this._nativeDragEnd);
      document.removeEventListener(mouseEvents.end, this._nativeDragEnd);
      document.removeEventListener('drop', this._nativeDrop);
      window.removeEventListener('scroll', this._scroll);
      this.scrollElements.forEach(p => p.removeEventListener('scroll', this._scroll));
      this.isDragging = false;
      this.element.removeAttribute('draggable');
      this.element.removeEventListener('dragstart', this._nativeDragStart);
      this.element.classList.remove('dragee-active');
    }
    nativeDrop(event) {
      event.stopPropagation();
      event.preventDefault();
    }
    cancelDragging() {
      document.removeEventListener(touchEvents.move, this._dragMove);
      document.removeEventListener(mouseEvents.move, this._dragMove);
      document.removeEventListener(touchEvents.end, this._dragEnd);
      document.removeEventListener(mouseEvents.end, this._dragEnd);
      document.removeEventListener(mouseEvents.end, this._nativeDragEnd);
      window.removeEventListener('scroll', this._scroll);
      this.scrollElements.forEach(p => p.removeEventListener('scroll', this._scroll));
      this.isDragging = false;
      this._previousDirectionPosition = null;
      this.element.removeAttribute('draggable');
      this.element.removeEventListener('dragstart', this._nativeDragStart);
    }
    copyStyles(source, destination) {
      if (this.options.copyStyles) {
        this.options.copyStyles(source, destination);
      } else {
        copyStyles(source, destination);
      }
    }
    emulateNativeDragAndDrop(event) {
      const containerRect = this.container.getBoundingClientRect();
      const clonedElement = this.element.cloneNode(true);
      clonedElement.style[transformProperty] = '';
      this.copyStyles(this.element, clonedElement);
      clonedElement.classList.add('dragee-native-emulation');
      clonedElement.style.position = 'absolute';
      document.body.appendChild(clonedElement);
      this.element.classList.add('dragee-placeholder');
      const emulationDraggable = new Draggable(clonedElement, {
        container: document.body,
        touchDraggingThreshold: 0,
        bound(point) {
          return point;
        },
        on: {
          'drag:move': () => {
            const containerRectPoint = new Point(containerRect.left, containerRect.top);
            this.position = emulationDraggable.position.sub(containerRectPoint).sub(this._startWindowScrollPoint).add(this._startParentsScrollOffset);
            this.determineDirection(this.position);
            this.emit('drag:move');
          },
          'drag:end': () => {
            emulationDraggable.destroy();
            document.body.removeChild(clonedElement);
            this.element.classList.remove('dragee-placeholder');
            this.element.classList.remove('dragee-active');
            this.emit('drag:end');
            this.dragEndAction();
            this.cancelDragging();
          }
        }
      });
      const containerRectPoint = new Point(containerRect.left, containerRect.top);
      emulationDraggable._startWindowScrollPoint = this._startWindowScrollPoint;
      emulationDraggable.move(this.pinnedPosition.add(containerRectPoint).add(this.windowScrollPoint).sub(this.parentsScrollOffset));
      emulationDraggable.dragStart(event);
      event.preventDefault();
    }
    dragEndAction() {
      this.pinPosition(this.position);
    }
    getRectangle() {
      return new Rectangle(this.position, this.getSize());
    }
    refresh() {
      if (this.bounding.refresh) {
        this.bounding.refresh();
      }
    }
    destroy() {
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
      const index = draggables.indexOf(this);
      if (index > -1) {
        draggables.splice(index, 1);
      }
    }
    get container() {
      return this._container = this._container || this.options.container || this.options.parent || getDefaultContainer(this.element);
    }
    get handler() {
      if (!this._handler) {
        if (typeof this.options.handler === 'string') {
          this._handler = this.element.querySelector(this.options.handler) || this.element;
        } else {
          this._handler = this.options.handler || this.element;
        }
      }
      return this._handler;
    }
    get stopPropagationOnDragStart() {
      return this.options.stopPropagationOnDragStart || false;
    }
    get nativeDragAndDrop() {
      return this.options.nativeDragAndDrop || false;
    }
    get emulateNativeDragAndDropOnTouch() {
      return this.options.emulateNativeDragAndDropOnTouch || false;
    }
    get shouldRemoveZeroTranslate() {
      return this.options.shouldRemoveZeroTranslate || false;
    }
    get touchDraggingThreshold() {
      return this.options.touchDraggingThreshold || 0;
    }
    get dragOverThrottleDuration() {
      return this.options.dragOverThrottleDuration || 16;
    }
    get windowScrollPoint() {
      return new Point(window.scrollX, window.scrollY);
    }
    get scrollRootContainer() {
      return this.options.scrollRootContainer || this.container;
    }
    get scrollElements() {
      return this._cachedScrollElements ? this._cachedScrollElements : this._cachedScrollElements = getParentsChain(this.element, this.scrollRootContainer);
    }
    get scrollElementsOffset() {
      return new Point(this.scrollElements.reduce((sum, p) => sum + p.scrollLeft, 0), this.scrollElements.reduce((sum, p) => sum + p.scrollTop, 0));
    }
    get parents() {
      return this._cachedParents ? this._cachedParents : this._cachedParents = getParentsChain(this.element, this.container);
    }
    get parentsScrollOffset() {
      return new Point(this.parents.reduce((sum, p) => sum + p.scrollLeft, 0), this.parents.reduce((sum, p) => sum + p.scrollTop, 0));
    }
    get enable() {
      return this._enable;
    }
    set enable(enable) {
      if (enable) {
        this.element.classList.remove('dragee-disable');
      } else {
        this.element.classList.add('dragee-disable');
      }
      this._enable = enable;
    }
  }
  Draggable.emitter = new EventEmitter$1();
  Draggable.emitter.on('draggable:create', addToDefaultScope);

  function getAngle(p1, p2) {
    const diff = p2.sub(p1);
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

  class Spider {
    constructor(area, elements) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      const areaRectangle = Rectangle.fromElement(area, area);
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
    init(elements) {
      this.canvas = createCanvas(this.area, this.areaRectangle);
      this.context = this.canvas.getContext('2d');
      this.draggables = elements.map((element, i) => {
        const angle = this.options.angle + i * this.options.dAngle;
        const halfSize = Point.elementSize(element).mult(0.5);
        const start = getPointFromRadialSystem(angle, this.options.startRadius, this.options.center).sub(halfSize);
        const end = getPointFromRadialSystem(angle, this.options.endRadius, this.options.center).sub(halfSize);
        return new Draggable(element, {
          container: this.area,
          bound: BoundToLine.bounding(start, end),
          position: start,
          on: {
            'drag:move': () => this.draw()
          }
        });
      });
      this.isInit = true;
      this.draw();
    }
    draw() {
      if (!this.isInit) {
        return;
      }
      this.context.clearRect(0, 0, this.areaRectangle.size.x, this.areaRectangle.size.y);
      this.context.beginPath();
      let point = this.draggables[0].getCenter();
      this.context.moveTo(point.x, point.y);
      for (let i = 0; i < this.draggables.length; i++) {
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
  }

  class EventEmitter {
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.events = {};
      if (options && options.on) {
        for (const [eventName, fn] of Object.entries(options.on)) {
          this.on(eventName, fn);
        }
      }
    }
    emit(eventName) {
      this.interrupted = false;
      const args = [].slice.call(arguments, 1);
      if (!this.events[eventName]) return;
      for (const func of this.events[eventName]) {
        func.apply(...args);
        if (this.interrupted) {
          return;
        }
      }
    }
    interrupt() {
      this.interrupted = true;
    }
    on(eventName, fn) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(fn);
    }
    prependOn(eventName, fn) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].unshift(fn);
    }
    unsubscribe(eventName, fn) {
      if (this.events[eventName]) {
        const index = this.events[eventName].indexOf(fn);
        this.events[eventName].splice(index, 1);
      }
    }
    resetEmitter() {
      this.events = {};
    }
    resetOn(eventName) {
      this.events[eventName] = [];
    }
  }

  class ArcSlider extends EventEmitter {
    constructor(area, element) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      super(options);
      const areaRectangle = Rectangle.fromElement(area, area);
      this.options = Object.assign({
        center: areaRectangle.getCenter(),
        radius: areaRectangle.getMinSide() / 2,
        startAngle: Math.PI,
        endAngle: 0,
        angles: [Math.PI, -Math.PI / 4, 0, Math.PI / 4, Math.PI / 2],
        time: 500
      }, options);
      this.shiftedCenter = this.options.center;
      this.area = area;
      this.init(element);
    }
    init(element) {
      const angle = this.options.startAngle;
      const position = getPointFromRadialSystem(angle, this.options.radius, this.shiftedCenter);
      this.angle = angle;
      this.draggable = new Draggable(element, {
        container: this.area,
        bound: BoundToArc.bounding(this.shiftedCenter, this.options.radius, this.options.startAngle, this.options.endAngle),
        position: position,
        on: {
          'drag:move': () => this.change()
        }
      });
    }
    updateAngle() {
      this.angle = getAngle(this.shiftedCenter, this.draggable.position);
    }
    change() {
      this.updateAngle();
      //      var angle = Geometry.getNearestAngle(this.options.angles, this.angle);
      //      this.setAngle(angle,this.options.time);
      this.emit('arcslider:change', {
        angle: this.angle
      });
    }
    setAngle(angle, time) {
      const position = getPointFromRadialSystem(this.angle, this.options.radius, this.shiftedCenter);
      this.angle = normalizeAngle(angle);
      this.draggable.pinPosition(position, time || 0);
      this.emit('arcslider:change', this.angle);
    }
  }

  function range(start, stop, step) {
    const result = [];
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
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }
    return result;
  }

  const rnd = function () {
    return Math.round(Math.random() * 255);
  };
  const toHexString = function (digit) {
    let str = digit.toString(16);
    while (str.length < 2) {
      str = '0' + str;
    }
    return str;
  };
  function randomColor() {
    return `#${toHexString(rnd())}${toHexString(rnd())}${toHexString(rnd())}`;
  }
  function getArrayWithBoundIndexes(index, length) {
    const retIndexes = [];
    if (index !== -1) {
      retIndexes.push(index);
      retIndexes.push((index + 1) % length);
    }
    return retIndexes;
  }
  class Chart extends EventEmitter {
    constructor(area, elements) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      super(options);
      const areaRectangle = Rectangle.fromElement(area, area);
      this.options = Object.assign({
        center: areaRectangle.getCenter(),
        radius: areaRectangle.getMinSide() / 2,
        touchRadius: areaRectangle.getMinSide() / 2,
        boundAngle: Math.PI / 9,
        fillStyles: range(0, elements.length).map(() => randomColor()),
        initAngles: range(-90, 270, 360 / elements.length).map(angle => toRadian(angle)),
        limitImg: null,
        limitImgOffset: new Point(0, 0)
      }, options);
      this.area = area;
      this.areaRectangle = areaRectangle;
      this.init(elements);
    }
    init(elements) {
      this.canvas = createCanvas(this.area, this.areaRectangle);
      this.context = this.canvas.getContext('2d');
      this.draggables = elements.map((element, i) => {
        const angle = this.options.initAngles[i];
        const halfSize = Point.elementSize(element).mult(0.5);
        const position = getPointFromRadialSystem(angle, this.options.touchRadius, this.options.center.sub(halfSize));
        return new Draggable(element, {
          container: this.area,
          bound: BoundToArc.bounding(this.options.center.sub(halfSize), this.options.touchRadius, this.getBoundAngle(i, false), this.getBoundAngle(i, true)),
          position: position,
          on: {
            'drag:move': () => this.draw()
          }
        });
      });
      this.isInit = true;
      this.draw();
    }
    updateAngles() {
      this.angles = this.draggables.map(draggable => {
        const halfSize = draggable.getSize().mult(0.5);
        return getAngle(this.options.center.sub(halfSize), draggable.position);
      });
    }
    getBoundAngle(index, isClossing) {
      const sign = isClossing ? 1 : -1;
      return () => {
        let i = (index + sign) % this.angles.length;
        if (i < 0) {
          i += this.angles.length;
        }
        return normalizeAngle(this.angles[i] - sign * this.options.boundAngle);
      };
    }
    draw() {
      if (!this.isInit) {
        return;
      }
      this.updateAngles();
      this.context.clearRect(0, 0, this.areaRectangle.size.x, this.areaRectangle.size.y);
      this.draggables.forEach((_draggable, index) => {
        this.drawArc(this.context, this.options.center, this.options.radius, index);
      });
      this.draggables.forEach((_draggable, index) => {
        this.drawLimitImg(index);
      });
      this.emit('chart:draw');
    }
    createClone(element) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.isInit) {
        return;
      }
      const rectangle = Rectangle.fromElement(element, element);
      const opts = Object.assign({
        center: rectangle.getCenter(),
        radius: rectangle.getMinSide() / 2,
        fillStyles: this.options.fillStyles
      }, options);
      const canvas = createCanvas(element, rectangle);
      const context = canvas.getContext('2d');
      const cloneObj = {
        draw: () => {
          context.clearRect(0, 0, rectangle.size.x, rectangle.size.y);
          this.draggables.forEach((_draggable, index) => {
            this.drawArc(context, opts.center, opts.radius, index);
          });
        }
      };
      cloneObj.draw();
      return cloneObj;
    }
    getFillStyle(index) {
      if (typeof this.options.fillStyles[index] === 'function') {
        this.options.fillStyles[index] = this.options.fillStyles[index].call(this);
      }
      return this.options.fillStyles[index];
    }
    drawArc(context, center, radius, index) {
      const startAngle = this.angles[index];
      const endAngle = this.angles[(index + 1) % this.angles.length];
      const color = this.getFillStyle(index);
      context.beginPath();
      context.moveTo(center.x, center.y);
      context.arc(center.x, center.y, radius, startAngle, endAngle, false);
      context.lineTo(center.x, center.y);
      context.closePath();
      context.fillStyle = color;
      context.fill();
    }
    drawLimitImg(index) {
      let point, img;
      if (this.options.limitImg) {
        img = this.options.limitImg instanceof Array ? this.options.limitImg[index] : this.options.limitImg;
      }
      if (img) {
        const angle = normalizeAngle(this.angles[index]);
        point = new Point(0, -img.height / 2);
        point = point.add(this.options.limitImgOffset);
        this.context.translate(this.areaRectangle.size.x / 2, this.areaRectangle.size.y / 2);
        this.context.rotate(angle);
        this.context.drawImage(img, point.x, point.y);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
    getAnglesDiff() {
      const angles = this.angles.slice(1);
      let baseAngle = this.angles[0];
      angles.push(baseAngle);
      return angles.map(angle => {
        const diffAngle = normalizeAngle(angle - baseAngle);
        baseAngle = angle;
        return diffAngle;
      });
    }
    getPercent() {
      return this.getAnglesDiff().map(diffAngle => diffAngle / (2 * Math.PI));
    }
    getArcBisectrixs() {
      return this.getAnglesDiff().map((diffAngle, i) => {
        return normalizeAngle(this.angles[i] + diffAngle / 2);
      });
    }
    getArcOnPoint(point) {
      const angle = getAngle(this.options.center, point);
      const radius = getDistance(this.options.center, point);
      if (radius > this.options.radius) {
        return -1;
      }
      let offset = -1,
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
    setAngles(angles) {
      this.angles = angles;
      this.draggables.forEach((draggable, i) => {
        const angle = this.angles[i];
        const halfSize = draggable.getSize().mult(0.5);
        const position = getPointFromRadialSystem(angle, this.options.touchRadius, this.options.center.sub(halfSize));
        draggable.moveAndSave(position);
      });
      this.draw();
    }
    setActiveArc(index) {
      const enableIndexes = getArrayWithBoundIndexes(index, this.draggables.length);
      this.activeArcIndex = index;
      this.draggables.forEach((draggable, i) => {
        draggable.enable = enableIndexes.indexOf(i) !== -1;
      });
      this.draw();
    }
  }

  exports.ArcSlider = ArcSlider;
  exports.Chart = Chart;
  exports.Spider = Spider;

  return exports;

})({});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZGV2LmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvY3JlYXRlLWNhbnZhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9kcmFnZWUvZGlzdC9pbmRleC5lc20uanMiLCIuLi9zcmMvZ2VvbWV0cnkvYW5nbGVzLmpzIiwiLi4vc3JjL3NwaWRlci5qcyIsIi4uL3NyYy9FdmVudEVtaXR0ZXIuanMiLCIuLi9zcmMvYXJjc2xpZGVyLmpzIiwiLi4vc3JjL3V0aWxzL3JhbmdlLmpzIiwiLi4vc3JjL2NoYXJ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gIHN0eWxlID0gc3R5bGUgfHwge31cbiAgbGV0IGNzc1RleHQgPSAnJ1xuICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZSkge1xuICAgIGlmIChzdHlsZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjc3NUZXh0ICs9IGtleSArICc6ICcgKyBzdHlsZVtrZXldICsgJzsgJ1xuICAgIH1cbiAgfVxuXG4gIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGNzc1RleHRcbn1cblxuZnVuY3Rpb24gYXBwZW5kRmlyc3RDaGlsZChlbGVtZW50LCBub2RlKSB7XG4gIGlmIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50Lmluc2VydEJlZm9yZShub2RlLCBlbGVtZW50LmZpcnN0Q2hpbGQpXG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChub2RlKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyhhcmVhLCByZWN0YWdsZSkge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUoYXJlYSkucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgYXJlYS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgfVxuXG4gIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgcmVjdGFnbGUuc2l6ZS54ICsgJ3B4JylcbiAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgcmVjdGFnbGUuc2l6ZS55ICsgJ3B4JylcbiAgc2V0U3R5bGUoY2FudmFzLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgbGVmdDogcmVjdGFnbGUucG9zaXRpb24ueSArICdweCcsXG4gICAgdG9wOiByZWN0YWdsZS5wb3NpdGlvbi55ICsgJ3B4JyxcbiAgICB3aWR0aDogcmVjdGFnbGUuc2l6ZS54ICsgJ3B4JyxcbiAgICBoZWlnaHQ6IHJlY3RhZ2xlLnNpemUueSArICdweCdcbiAgfSlcbiAgYXBwZW5kRmlyc3RDaGlsZChhcmVhLCBjYW52YXMpXG4gIHJldHVybiBjYW52YXNcbn1cbiIsIi8qKiBDbGFzcyByZXByZXNlbnRpbmcgYSBwb2ludC4gKi9cbmNsYXNzIFBvaW50IHtcbiAgLyoqXG4gICogQ3JlYXRlIGEgcG9pbnQuXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeCB2YWx1ZS5cbiAgKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5IHZhbHVlLlxuICAqL1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG4gIGFkZChwKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKyBwLngsIHRoaXMueSArIHAueSk7XG4gIH1cbiAgc3ViKHApIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCAtIHAueCwgdGhpcy55IC0gcC55KTtcbiAgfVxuICBtdWx0KGspIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCAqIGssIHRoaXMueSAqIGspO1xuICB9XG4gIG5lZ2F0aXZlKCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQoLXRoaXMueCwgLXRoaXMueSk7XG4gIH1cbiAgY29tcGFyZShwKSB7XG4gICAgcmV0dXJuIHRoaXMueCA9PT0gcC54ICYmIHRoaXMueSA9PT0gcC55O1xuICB9XG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkpO1xuICB9XG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBge3g9JHt0aGlzLnh9LHk9JHt0aGlzLnl9YDtcbiAgfVxuICBzdGF0aWMgZWxlbWVudE9mZnNldChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICBwYXJlbnQgPSBwYXJlbnQgfHwgZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGVsZW1lbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBwYXJlbnRSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiBuZXcgUG9pbnQoZWxlbWVudFJlY3QubGVmdCAtIHBhcmVudFJlY3QubGVmdCwgZWxlbWVudFJlY3QudG9wIC0gcGFyZW50UmVjdC50b3ApO1xuICB9XG4gIHN0YXRpYyBlbGVtZW50U2l6ZShlbGVtZW50KSB7XG4gICAgY29uc3QgZWxlbWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiBuZXcgUG9pbnQoZWxlbWVudFJlY3Qud2lkdGgsIGVsZW1lbnRSZWN0LmhlaWdodCk7XG4gIH1cbn1cblxuY2xhc3MgUmVjdGFuZ2xlIHtcbiAgY29uc3RydWN0b3IocG9zaXRpb24sIHNpemUpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuICBnZXRQMSgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbiAgfVxuICBnZXRQMigpIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS54LCB0aGlzLnBvc2l0aW9uLnkpO1xuICB9XG4gIGdldFAzKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnNpemUpO1xuICB9XG4gIGdldFA0KCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUueSk7XG4gIH1cbiAgZ2V0Q2VudGVyKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnNpemUubXVsdCgwLjUpKTtcbiAgfVxuICBvcihyZWN0KSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSBuZXcgUG9pbnQoTWF0aC5taW4odGhpcy5wb3NpdGlvbi54LCByZWN0LnBvc2l0aW9uLngpLCBNYXRoLm1pbih0aGlzLnBvc2l0aW9uLnksIHJlY3QucG9zaXRpb24ueSkpO1xuICAgIGNvbnN0IHNpemUgPSBuZXcgUG9pbnQoTWF0aC5tYXgodGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLngsIHJlY3QucG9zaXRpb24ueCArIHJlY3Quc2l6ZS54KSwgTWF0aC5tYXgodGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnksIHJlY3QucG9zaXRpb24ueSArIHJlY3Quc2l6ZS55KSkuc3ViKHBvc2l0aW9uKTtcbiAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShwb3NpdGlvbiwgc2l6ZSk7XG4gIH1cbiAgYW5kKHJlY3QpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IG5ldyBQb2ludChNYXRoLm1heCh0aGlzLnBvc2l0aW9uLngsIHJlY3QucG9zaXRpb24ueCksIE1hdGgubWF4KHRoaXMucG9zaXRpb24ueSwgcmVjdC5wb3NpdGlvbi55KSk7XG4gICAgY29uc3Qgc2l6ZSA9IG5ldyBQb2ludChNYXRoLm1pbih0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCwgcmVjdC5wb3NpdGlvbi54ICsgcmVjdC5zaXplLngpLCBNYXRoLm1pbih0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUueSwgcmVjdC5wb3NpdGlvbi55ICsgcmVjdC5zaXplLnkpKS5zdWIocG9zaXRpb24pO1xuICAgIGlmIChzaXplLnggPD0gMCB8fCBzaXplLnkgPD0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHBvc2l0aW9uLCBzaXplKTtcbiAgfVxuICBpbmNsdWRlUG9pbnQocCkge1xuICAgIHJldHVybiAhKHRoaXMucG9zaXRpb24ueCA+IHAueCB8fCB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCA8IHAueCB8fCB0aGlzLnBvc2l0aW9uLnkgPiBwLnkgfHwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnkgPCBwLnkpO1xuICB9XG4gIGluY2x1ZGVSZWN0YW5nbGUocmVjdGFuZ2xlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5jbHVkZVBvaW50KHJlY3RhbmdsZS5wb3NpdGlvbikgJiYgdGhpcy5pbmNsdWRlUG9pbnQocmVjdGFuZ2xlLmdldFAzKCkpO1xuICB9XG4gIG1vdmVUb0JvdW5kKHJlY3QsIGF4aXMpIHtcbiAgICBsZXQgc2VsQXhpcywgY3Jvc3NSZWN0YW5nbGU7XG4gICAgaWYgKGF4aXMpIHtcbiAgICAgIHNlbEF4aXMgPSBheGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjcm9zc1JlY3RhbmdsZSA9IHRoaXMuYW5kKHJlY3QpO1xuICAgICAgaWYgKCFjcm9zc1JlY3RhbmdsZSkge1xuICAgICAgICByZXR1cm4gcmVjdDtcbiAgICAgIH1cbiAgICAgIHNlbEF4aXMgPSBjcm9zc1JlY3RhbmdsZS5zaXplLnggPiBjcm9zc1JlY3RhbmdsZS5zaXplLnkgPyAneScgOiAneCc7XG4gICAgfVxuICAgIGNvbnN0IHRoaXNDZW50ZXIgPSB0aGlzLmdldENlbnRlcigpO1xuICAgIGNvbnN0IHJlY3RDZW50ZXIgPSByZWN0LmdldENlbnRlcigpO1xuICAgIGNvbnN0IHNpZ24gPSB0aGlzQ2VudGVyW3NlbEF4aXNdID4gcmVjdENlbnRlcltzZWxBeGlzXSA/IC0xIDogMTtcbiAgICBjb25zdCBvZmZzZXQgPSBzaWduID4gMCA/IHRoaXMucG9zaXRpb25bc2VsQXhpc10gKyB0aGlzLnNpemVbc2VsQXhpc10gLSByZWN0LnBvc2l0aW9uW3NlbEF4aXNdIDogdGhpcy5wb3NpdGlvbltzZWxBeGlzXSAtIChyZWN0LnBvc2l0aW9uW3NlbEF4aXNdICsgcmVjdC5zaXplW3NlbEF4aXNdKTtcbiAgICByZWN0LnBvc2l0aW9uW3NlbEF4aXNdID0gcmVjdC5wb3NpdGlvbltzZWxBeGlzXSArIG9mZnNldDtcbiAgICByZXR1cm4gcmVjdDtcbiAgfVxuICBnZXRTcXVhcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZS54ICogdGhpcy5zaXplLnk7XG4gIH1cbiAgc3R5bGVBcHBseShlbCkge1xuICAgIGVsID0gZWwgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5kJyk7XG4gICAgZWwuc3R5bGUubGVmdCA9IHRoaXMucG9zaXRpb24ueCArICdweCc7XG4gICAgZWwuc3R5bGUudG9wID0gdGhpcy5wb3NpdGlvbi55ICsgJ3B4JztcbiAgICBlbC5zdHlsZS53aWR0aCA9IHRoaXMuc2l6ZS54ICsgJ3B4JztcbiAgICBlbC5zdHlsZS5oZWlnaHQgPSB0aGlzLnNpemUueSArICdweCc7XG4gIH1cbiAgZ3Jvd3RoKHNpemUpIHtcbiAgICB0aGlzLnNpemUgPSB0aGlzLnNpemUuYWRkKHNpemUpO1xuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLmFkZChzaXplLm11bHQoLTAuNSkpO1xuICB9XG4gIGdldE1pblNpZGUoKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKHRoaXMuc2l6ZS54LCB0aGlzLnNpemUueSk7XG4gIH1cbiAgc3RhdGljIGZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICBsZXQgcGFyZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgbGV0IGlzQ29uc2lkZXJUcmFuc2xhdGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gUG9pbnQuZWxlbWVudE9mZnNldChlbGVtZW50LCBwYXJlbnQsIGlzQ29uc2lkZXJUcmFuc2xhdGUpO1xuICAgIGNvbnN0IHNpemUgPSBQb2ludC5lbGVtZW50U2l6ZShlbGVtZW50KTtcbiAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShwb3NpdGlvbiwgc2l6ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdENvbnRhaW5lcihlbGVtZW50KSB7XG4gIGxldCBjb250YWluZXIgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gIHdoaWxlIChjb250YWluZXIucGFyZW50Tm9kZSAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpWydwb3NpdGlvbiddID09PSAnc3RhdGljJyAmJiBjb250YWluZXIudGFnTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgY29udGFpbmVyID0gY29udGFpbmVyLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vbikge1xuICAgICAgZm9yIChjb25zdCBbZXZlbnROYW1lLCBmbl0gb2YgT2JqZWN0LmVudHJpZXMob3B0aW9ucy5vbikpIHtcbiAgICAgICAgdGhpcy5vbihldmVudE5hbWUsIGZuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZW1pdChldmVudE5hbWUpIHtcbiAgICB0aGlzLmludGVycnVwdGVkID0gZmFsc2U7XG4gICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHJldHVybjtcbiAgICBmb3IgKGNvbnN0IGZ1bmMgb2YgdGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgZnVuYyguLi5hcmdzKTtcbiAgICAgIGlmICh0aGlzLmludGVycnVwdGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaW50ZXJydXB0KCkge1xuICAgIHRoaXMuaW50ZXJydXB0ZWQgPSB0cnVlO1xuICB9XG4gIG9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgfVxuICBwcmVwZW5kT24oZXZlbnROYW1lLCBmbikge1xuICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnVuc2hpZnQoZm4pO1xuICB9XG4gIHVuc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmluZGV4T2YoZm4pO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuICByZXNldEVtaXR0ZXIoKSB7XG4gICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgfVxuICByZXNldE9uKGV2ZW50TmFtZSkge1xuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIpIHtcbiAgY29uc3QgZHggPSBwMS54IC0gcDIueCxcbiAgICBkeSA9IHAxLnkgLSBwMi55O1xuICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbn1cbmZ1bmN0aW9uIGdldFhEaWZmZXJlbmNlKHAxLCBwMikge1xuICByZXR1cm4gTWF0aC5hYnMocDEueCAtIHAyLngpO1xufVxuZnVuY3Rpb24gZ2V0WURpZmZlcmVuY2UocDEsIHAyKSB7XG4gIHJldHVybiBNYXRoLmFicyhwMS55IC0gcDIueSk7XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1lZFNwYWNlRGlzdGFuY2VGYWN0b3J5KG9wdGlvbnMpIHtcbiAgcmV0dXJuIChwMSwgcDIpID0+IHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KG9wdGlvbnMueCAqIE1hdGguYWJzKHAxLnggLSBwMi54KSwgMikgKyBNYXRoLnBvdyhvcHRpb25zLnkgKiBNYXRoLmFicyhwMS55IC0gcDIueSksIDIpKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGluZGV4T2ZOZWFyZXN0UG9pbnQoYXJyLCB2YWwsIHJhZGl1cykge1xuICBsZXQgZ2V0RGlzdGFuY2VGdW5jID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBnZXREaXN0YW5jZTtcbiAgbGV0IHNpemUsXG4gICAgaW5kZXggPSAwLFxuICAgIGksXG4gICAgdGVtcDtcbiAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgc2l6ZSA9IGdldERpc3RhbmNlRnVuYyhhcnJbMF0sIHZhbCk7XG4gIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICB0ZW1wID0gZ2V0RGlzdGFuY2VGdW5jKGFycltpXSwgdmFsKTtcbiAgICBpZiAodGVtcCA8IHNpemUpIHtcbiAgICAgIHNpemUgPSB0ZW1wO1xuICAgICAgaW5kZXggPSBpO1xuICAgIH1cbiAgfVxuICBpZiAocmFkaXVzID49IDAgJiYgc2l6ZSA+IHJhZGl1cykge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICByZXR1cm4gaW5kZXg7XG59XG5cbi8vUmV0dXJuIGNyb3NzaW5nIHBvaW50IG9mIHR3byBsaW5lc1xuZnVuY3Rpb24gZGlyZWN0Q3Jvc3NpbmcoTDFQMSwgTDFQMiwgTDJQMSwgTDJQMikge1xuICBsZXQgdGVtcCwgazEsIGsyLCBiMSwgYjIsIHgsIHk7XG4gIGlmIChMMlAxLnggPT09IEwyUDIueCkge1xuICAgIHRlbXAgPSBMMlAxO1xuICAgIEwyUDEgPSBMMVAxO1xuICAgIEwxUDEgPSB0ZW1wO1xuICAgIHRlbXAgPSBMMlAyO1xuICAgIEwyUDIgPSBMMVAyO1xuICAgIEwxUDIgPSB0ZW1wO1xuICB9XG4gIGlmIChMMVAxLnggPT09IEwxUDIueCkge1xuICAgIGsyID0gKEwyUDIueSAtIEwyUDEueSkgLyAoTDJQMi54IC0gTDJQMS54KTtcbiAgICBiMiA9IChMMlAyLnggKiBMMlAxLnkgLSBMMlAxLnggKiBMMlAyLnkpIC8gKEwyUDIueCAtIEwyUDEueCk7XG4gICAgeCA9IEwxUDEueDtcbiAgICB5ID0geCAqIGsyICsgYjI7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcbiAgfSBlbHNlIHtcbiAgICBrMSA9IChMMVAyLnkgLSBMMVAxLnkpIC8gKEwxUDIueCAtIEwxUDEueCk7XG4gICAgYjEgPSAoTDFQMi54ICogTDFQMS55IC0gTDFQMS54ICogTDFQMi55KSAvIChMMVAyLnggLSBMMVAxLngpO1xuICAgIGsyID0gKEwyUDIueSAtIEwyUDEueSkgLyAoTDJQMi54IC0gTDJQMS54KTtcbiAgICBiMiA9IChMMlAyLnggKiBMMlAxLnkgLSBMMlAxLnggKiBMMlAyLnkpIC8gKEwyUDIueCAtIEwyUDEueCk7XG4gICAgeCA9IChiMSAtIGIyKSAvIChrMiAtIGsxKTtcbiAgICB5ID0geCAqIGsxICsgYjE7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcbiAgfVxufVxuZnVuY3Rpb24gYm91bmRUb0xpbmUoQSwgQiwgUCkge1xuICBjb25zdCBBUCA9IG5ldyBQb2ludChQLnggLSBBLngsIFAueSAtIEEueSksXG4gICAgQUIgPSBuZXcgUG9pbnQoQi54IC0gQS54LCBCLnkgLSBBLnkpLFxuICAgIGFiMiA9IEFCLnggKiBBQi54ICsgQUIueSAqIEFCLnksXG4gICAgYXBfYWIgPSBBUC54ICogQUIueCArIEFQLnkgKiBBQi55LFxuICAgIHQgPSBhcF9hYiAvIGFiMjtcbiAgcmV0dXJuIG5ldyBQb2ludChBLnggKyBBQi54ICogdCwgQS55ICsgQUIueSAqIHQpO1xufVxuZnVuY3Rpb24gZ2V0UG9pbnRPbkxpbmVCeUxlbmdodChMUDEsIExQMiwgbGVuZ2h0KSB7XG4gIGNvbnN0IGR4ID0gTFAyLnggLSBMUDEueDtcbiAgY29uc3QgZHkgPSBMUDIueSAtIExQMS55O1xuICBjb25zdCBwZXJjZW50ID0gbGVuZ2h0IC8gZ2V0RGlzdGFuY2UoTFAxLCBMUDIpO1xuICByZXR1cm4gbmV3IFBvaW50KExQMS54ICsgcGVyY2VudCAqIGR4LCBMUDEueSArIHBlcmNlbnQgKiBkeSk7XG59XG5mdW5jdGlvbiBhZGRQb2ludFRvQm91bmRQb2ludHMoYm91bmRwb2ludHMsIHBvaW50LCBpc1JpZ2h0KSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJvdW5kcG9pbnRzLmZpbHRlcihiUG9pbnQgPT4ge1xuICAgIHJldHVybiBiUG9pbnQueSA+IHBvaW50LnkgfHwgKGlzUmlnaHQgPyBiUG9pbnQueCA8IHBvaW50LnggOiBiUG9pbnQueCA+IHBvaW50LngpO1xuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocG9pbnQueSA8IHJlc3VsdFtpXS55KSB7XG4gICAgICByZXN1bHQuc3BsaWNlKGksIDAsIHBvaW50KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJlc3VsdC5wdXNoKHBvaW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2V0QW5nbGVEaWZmKGFscGhhLCBiZXRhKSB7XG4gIGNvbnN0IG1pbkFuZ2xlID0gTWF0aC5taW4oYWxwaGEsIGJldGEpO1xuICBjb25zdCBtYXhBbmdsZSA9IE1hdGgubWF4KGFscGhhLCBiZXRhKTtcbiAgcmV0dXJuIE1hdGgubWluKG1heEFuZ2xlIC0gbWluQW5nbGUsIG1pbkFuZ2xlICsgTWF0aC5QSSAqIDIgLSBtYXhBbmdsZSk7XG59XG5mdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIpIHtcbiAgY29uc3QgZGlmZiA9IHAyLnN1YihwMSk7XG4gIHJldHVybiBub3JtYWxpemVBbmdsZShNYXRoLmF0YW4yKGRpZmYueSwgZGlmZi54KSk7XG59XG5mdW5jdGlvbiBib3VuZEFuZ2xlKG1pbiwgbWF4LCB2YWwpIHtcbiAgbGV0IGRtaW4sIGRtYXg7XG4gIGlmIChtaW4gPCBtYXggJiYgdmFsID4gbWluICYmIHZhbCA8IG1heCkge1xuICAgIHJldHVybiB2YWw7XG4gIH0gZWxzZSBpZiAobWF4IDwgbWluICYmICh2YWwgPCBtYXggfHwgdmFsID4gbWluKSkge1xuICAgIHJldHVybiB2YWw7XG4gIH0gZWxzZSB7XG4gICAgZG1pbiA9IGdldEFuZ2xlRGlmZihtaW4sIHZhbCk7XG4gICAgZG1heCA9IGdldEFuZ2xlRGlmZihtYXgsIHZhbCk7XG4gICAgaWYgKGRtaW4gPCBkbWF4KSB7XG4gICAgICByZXR1cm4gbWluO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWF4O1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gbm9ybWFsaXplQW5nbGUodmFsKSB7XG4gIHdoaWxlICh2YWwgPCAwKSB7XG4gICAgdmFsICs9IDIgKiBNYXRoLlBJO1xuICB9XG4gIHdoaWxlICh2YWwgPiAyICogTWF0aC5QSSkge1xuICAgIHZhbCAtPSAyICogTWF0aC5QSTtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuZnVuY3Rpb24gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCBsZW5ndGgsIGNlbnRlcikge1xuICBjZW50ZXIgPSBjZW50ZXIgfHwgbmV3IFBvaW50KDAsIDApO1xuICByZXR1cm4gY2VudGVyLmFkZChuZXcgUG9pbnQobGVuZ3RoICogTWF0aC5jb3MoYW5nbGUpLCBsZW5ndGggKiBNYXRoLnNpbihhbmdsZSkpKTtcbn1cblxuY2xhc3MgQm91bmQge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIGJvdW5kKHBvaW50LCBfc2l6ZSkge1xuICAgIHJldHVybiBwb2ludDtcbiAgfVxuICByZWZyZXNoKCkge31cbiAgc3RhdGljIGJvdW5kaW5nKCkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IHRoaXMoLi4uYXJndW1lbnRzKTtcbiAgICByZXR1cm4gaW5zdGFuY2UuYm91bmQuYmluZChpbnN0YW5jZSk7XG4gIH1cbn1cbmNsYXNzIEJvdW5kVG9SZWN0YW5nbGUgZXh0ZW5kcyBCb3VuZCB7XG4gIGNvbnN0cnVjdG9yKHJlY3RhbmdsZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGU7XG4gIH1cbiAgYm91bmQocG9pbnQsIHNpemUpIHtcbiAgICBjb25zdCBjYWxjUG9pbnQgPSBwb2ludC5jbG9uZSgpO1xuICAgIGNvbnN0IHJlY3RQMiA9IHRoaXMucmVjdGFuZ2xlLmdldFAzKCk7XG4gICAgaWYgKHRoaXMucmVjdGFuZ2xlLnBvc2l0aW9uLnggPiBjYWxjUG9pbnQueCkge1xuICAgICAgY2FsY1BvaW50LnggPSB0aGlzLnJlY3RhbmdsZS5wb3NpdGlvbi54O1xuICAgIH1cbiAgICBpZiAodGhpcy5yZWN0YW5nbGUucG9zaXRpb24ueSA+IGNhbGNQb2ludC55KSB7XG4gICAgICBjYWxjUG9pbnQueSA9IHRoaXMucmVjdGFuZ2xlLnBvc2l0aW9uLnk7XG4gICAgfVxuICAgIGlmIChyZWN0UDIueCA8IGNhbGNQb2ludC54ICsgc2l6ZS54KSB7XG4gICAgICBjYWxjUG9pbnQueCA9IHJlY3RQMi54IC0gc2l6ZS54O1xuICAgIH1cbiAgICBpZiAocmVjdFAyLnkgPCBjYWxjUG9pbnQueSArIHNpemUueSkge1xuICAgICAgY2FsY1BvaW50LnkgPSByZWN0UDIueSAtIHNpemUueTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbGNQb2ludDtcbiAgfVxufVxuY2xhc3MgQm91bmRUb0VsZW1lbnQgZXh0ZW5kcyBCb3VuZFRvUmVjdGFuZ2xlIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29udGFpbmVyKSB7XG4gICAgc3VwZXIoUmVjdGFuZ2xlLmZyb21FbGVtZW50KGVsZW1lbnQsIGNvbnRhaW5lcikpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gIH1cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxufVxuY2xhc3MgQm91bmRUb0xpbmVYIGV4dGVuZHMgQm91bmQge1xuICBjb25zdHJ1Y3Rvcih4LCBzdGFydFksIGVuZFkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy5zdGFydFkgPSBzdGFydFk7XG4gICAgdGhpcy5lbmRZID0gZW5kWTtcbiAgfVxuICBib3VuZChwb2ludCwgc2l6ZSkge1xuICAgIGNvbnN0IGNhbGNQb2ludCA9IHBvaW50LmNsb25lKCk7XG4gICAgY2FsY1BvaW50LnggPSB0aGlzLng7XG4gICAgaWYgKHRoaXMuc3RhcnRZID4gY2FsY1BvaW50LnkpIHtcbiAgICAgIGNhbGNQb2ludC55ID0gdGhpcy5zdGFydFk7XG4gICAgfVxuICAgIGlmICh0aGlzLmVuZFkgPCBjYWxjUG9pbnQueSArIHNpemUueSkge1xuICAgICAgY2FsY1BvaW50LnkgPSB0aGlzLmVuZFkgLSBzaXplLnk7XG4gICAgfVxuICAgIHJldHVybiBjYWxjUG9pbnQ7XG4gIH1cbn1cbmNsYXNzIEJvdW5kVG9MaW5lWSBleHRlbmRzIEJvdW5kIHtcbiAgY29uc3RydWN0b3IoeSwgc3RhcnRYLCBlbmRYKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuc3RhcnRYID0gc3RhcnRYO1xuICAgIHRoaXMuZW5kWCA9IGVuZFg7XG4gIH1cbiAgYm91bmQocG9pbnQsIHNpemUpIHtcbiAgICBjb25zdCBjYWxjUG9pbnQgPSBwb2ludC5jbG9uZSgpO1xuICAgIGNhbGNQb2ludC55ID0gdGhpcy55O1xuICAgIGlmICh0aGlzLnN0YXJ0WCA+IGNhbGNQb2ludC54KSB7XG4gICAgICBjYWxjUG9pbnQueCA9IHRoaXMuc3RhcnRYO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbmRYIDwgY2FsY1BvaW50LnggKyBzaXplLngpIHtcbiAgICAgIGNhbGNQb2ludC54ID0gdGhpcy5lbmRYIC0gc2l6ZS54O1xuICAgIH1cbiAgICByZXR1cm4gY2FsY1BvaW50O1xuICB9XG59XG5jbGFzcyBCb3VuZFRvTGluZSBleHRlbmRzIEJvdW5kIHtcbiAgY29uc3RydWN0b3Ioc3RhcnRQb2ludCwgZW5kUG9pbnQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhcnRQb2ludCA9IHN0YXJ0UG9pbnQ7XG4gICAgdGhpcy5lbmRQb2ludCA9IGVuZFBvaW50O1xuICAgIGNvbnN0IGFscGhhID0gTWF0aC5hdGFuMihlbmRQb2ludC55IC0gc3RhcnRQb2ludC55LCBlbmRQb2ludC54IC0gc3RhcnRQb2ludC54KTtcbiAgICBjb25zdCBiZXRhID0gYWxwaGEgKyBNYXRoLlBJIC8gMjtcbiAgICB0aGlzLnNvbWVLID0gMTA7XG4gICAgdGhpcy5jb3NCZXRhID0gTWF0aC5jb3MoYmV0YSk7XG4gICAgdGhpcy5zaW5CZXRhID0gTWF0aC5zaW4oYmV0YSk7XG4gIH1cbiAgYm91bmQocG9pbnQsIHNpemUpIHtcbiAgICBjb25zdCBwb2ludDIgPSBuZXcgUG9pbnQocG9pbnQueCArIHRoaXMuc29tZUsgKiB0aGlzLmNvc0JldGEsIHBvaW50LnkgKyB0aGlzLnNvbWVLICogdGhpcy5zaW5CZXRhKTtcbiAgICBjb25zdCBuZXdFbmRQb2ludCA9IGdldFBvaW50T25MaW5lQnlMZW5naHQodGhpcy5lbmRQb2ludCwgdGhpcy5zdGFydFBvaW50LCBzaXplLngpO1xuICAgIGNvbnN0IHBvaW50Q3Jvc3NpbmcgPSBkaXJlY3RDcm9zc2luZyh0aGlzLnN0YXJ0UG9pbnQsIHRoaXMuZW5kUG9pbnQsIHBvaW50LCBwb2ludDIpO1xuICAgIHJldHVybiBib3VuZFRvTGluZSh0aGlzLnN0YXJ0UG9pbnQsIG5ld0VuZFBvaW50LCBwb2ludENyb3NzaW5nKTtcbiAgfVxufVxuY2xhc3MgQm91bmRUb0NpcmNsZSBleHRlbmRzIEJvdW5kIHtcbiAgY29uc3RydWN0b3IoY2VudGVyLCByYWRpdXMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY2VudGVyID0gY2VudGVyO1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICB9XG4gIGJvdW5kKHBvaW50LCBfc2l6ZSkge1xuICAgIHJldHVybiBnZXRQb2ludE9uTGluZUJ5TGVuZ2h0KHRoaXMuY2VudGVyLCBwb2ludCwgdGhpcy5yYWRpdXMpO1xuICB9XG59XG5jbGFzcyBCb3VuZFRvQXJjIGV4dGVuZHMgQm91bmRUb0NpcmNsZSB7XG4gIGNvbnN0cnVjdG9yKGNlbnRlciwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSkge1xuICAgIHN1cGVyKGNlbnRlciwgcmFkaXVzKTtcbiAgICB0aGlzLl9zdGFydEFuZ2xlID0gc3RhcnRBbmdsZTtcbiAgICB0aGlzLl9lbmRBbmdsZSA9IGVuZEFuZ2xlO1xuICB9XG4gIHN0YXJ0QW5nbGUoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9zdGFydEFuZ2xlID09PSAnZnVuY3Rpb24nID8gdGhpcy5fc3RhcnRBbmdsZSgpIDogdGhpcy5fc3RhcnRBbmdsZTtcbiAgfVxuICBlbmRBbmdsZSgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2VuZEFuZ2xlID09PSAnZnVuY3Rpb24nID8gdGhpcy5fZW5kQW5nbGUoKSA6IHRoaXMuX2VuZEFuZ2xlO1xuICB9XG4gIGJvdW5kKHBvaW50LCBfc2l6ZSkge1xuICAgIGxldCBhbmdsZSA9IGdldEFuZ2xlKHRoaXMuY2VudGVyLCBwb2ludCk7XG4gICAgYW5nbGUgPSBub3JtYWxpemVBbmdsZShhbmdsZSk7XG4gICAgYW5nbGUgPSBib3VuZEFuZ2xlKHRoaXMuc3RhcnRBbmdsZSgpLCB0aGlzLmVuZEFuZ2xlKCksIGFuZ2xlKTtcbiAgICByZXR1cm4gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCB0aGlzLnJhZGl1cywgdGhpcy5jZW50ZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0gKGFycmF5LCB2YWwpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJheVtpXSA9PT0gdmFsKSB7XG4gICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICBpLS07XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGlmICh0eXBlb2Ygc3RvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzdG9wID0gc3RhcnQ7XG4gICAgc3RhcnQgPSAwO1xuICB9XG4gIGlmICh0eXBlb2Ygc3RlcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzdGVwID0gMTtcbiAgfVxuICBpZiAoc3RlcCA+IDAgJiYgc3RhcnQgPj0gc3RvcCB8fCBzdGVwIDwgMCAmJiBzdGFydCA8PSBzdG9wKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGZvciAobGV0IGkgPSBzdGFydDsgc3RlcCA+IDAgPyBpIDwgc3RvcCA6IGkgPiBzdG9wOyBpICs9IHN0ZXApIHtcbiAgICByZXN1bHQucHVzaChpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5jbGFzcyBCYXNpY1N0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IocmVjdGFuZ2xlKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHRoaXMucmVjdGFuZ2xlID0gcmVjdGFuZ2xlO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cbiAgZ2V0IGJvdW5kUmVjdCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMucmVjdGFuZ2xlID09PSAnZnVuY3Rpb24nID8gdGhpcy5yZWN0YW5nbGUoKSA6IHRoaXMucmVjdGFuZ2xlO1xuICB9XG59XG5jbGFzcyBOb3RDcm9zc2luZ1N0cmF0ZWd5IGV4dGVuZHMgQmFzaWNTdHJhdGVneSB7XG4gIHBvc2l0aW9uaW5nKHJlY3RhbmdsZUxpc3QsIGluZGV4ZXNPZk5ld3MpIHtcbiAgICBjb25zdCBzdGF0aWNSZWN0YW5nbGVJbmRleGVzID0gcmVjdGFuZ2xlTGlzdC5yZWR1Y2UoKGluZGV4ZXMsIF9yZWN0LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ZXNPZk5ld3MuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7XG4gICAgICAgIGluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5kZXhlcztcbiAgICB9LCBbXSk7XG4gICAgaW5kZXhlc09mTmV3cy5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIGxldCByZWN0ID0gcmVjdGFuZ2xlTGlzdFtpbmRleF07XG4gICAgICBsZXQgcmVtb3ZhYmxlID0gZmFsc2U7XG4gICAgICBzdGF0aWNSZWN0YW5nbGVJbmRleGVzLmZvckVhY2goaW5kZXhPZlN0YXRpYyA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRpY1JlY3QgPSByZWN0YW5nbGVMaXN0W2luZGV4T2ZTdGF0aWNdO1xuICAgICAgICByZWN0ID0gc3RhdGljUmVjdC5tb3ZlVG9Cb3VuZChyZWN0KTtcbiAgICAgIH0pO1xuICAgICAgcmVtb3ZhYmxlID0gc3RhdGljUmVjdGFuZ2xlSW5kZXhlcy5zb21lKGluZGV4T2ZTdGF0aWMgPT4ge1xuICAgICAgICBjb25zdCBzdGF0aWNSZWN0ID0gcmVjdGFuZ2xlTGlzdFtpbmRleE9mU3RhdGljXTtcbiAgICAgICAgcmV0dXJuICEhc3RhdGljUmVjdC5hbmQocmVjdCk7XG4gICAgICB9KSB8fCByZWN0LmFuZCh0aGlzLmJvdW5kUmVjdCkuZ2V0U3F1YXJlKCkgIT09IHJlY3QuZ2V0U3F1YXJlKCk7XG4gICAgICBpZiAocmVtb3ZhYmxlKSB7XG4gICAgICAgIHJlY3QucmVtb3ZhYmxlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRpY1JlY3RhbmdsZUluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlY3RhbmdsZUxpc3Q7XG4gIH1cbiAgc29ydGluZyhvZGxEcmFnZ2FibGVzTGlzdCwgbmV3RHJhZ2dhYmxlcywgaW5kZXhPZk5ld3MpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVzID0gb2RsRHJhZ2dhYmxlc0xpc3QuY29uY2F0KG5ld0RyYWdnYWJsZXMpO1xuICAgIG5ld0RyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4ge1xuICAgICAgaW5kZXhPZk5ld3MucHVzaChkcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRyYWdnYWJsZXM7XG4gIH1cbn1cbmNsYXNzIEZsb2F0TGVmdFN0cmF0ZWd5IGV4dGVuZHMgQmFzaWNTdHJhdGVneSB7XG4gIGNvbnN0cnVjdG9yKHJlY3RhbmdsZSkge1xuICAgIGxldCBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICBzdXBlcihyZWN0YW5nbGUsIG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgcmVtb3ZhYmxlOiB0cnVlXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgdGhpcy5yYWRpdXMgPSBvcHRpb25zLnJhZGl1cyB8fCA4MDtcbiAgICB0aGlzLnBhZGRpbmdUb3BMZWZ0ID0gb3B0aW9ucy5wYWRkaW5nVG9wTGVmdCB8fCBuZXcgUG9pbnQoMCwgMCk7XG4gICAgdGhpcy5wYWRkaW5nQm90dG9tUmlnaHQgPSBvcHRpb25zLnBhZGRpbmdCb3R0b21SaWdodCB8fCBuZXcgUG9pbnQoMCwgMCk7XG4gICAgdGhpcy55R2FwQmV0d2VlbkRyYWdnYWJsZXMgPSBvcHRpb25zLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyB8fCAwO1xuICAgIHRoaXMuZ2V0RGlzdGFuY2UgPSBvcHRpb25zLmdldERpc3RhbmNlIHx8IGdldERpc3RhbmNlO1xuICAgIHRoaXMuZ2V0UG9zaXRpb24gPSBvcHRpb25zLmdldFBvc2l0aW9uIHx8IChkcmFnZ2FibGUgPT4gZHJhZ2dhYmxlLnBvc2l0aW9uKTtcbiAgfVxuICBwb3NpdGlvbmluZyhyZWN0YW5nbGVMaXN0LCBfaW5kZXhlc09mTmV3cykge1xuICAgIGNvbnN0IGJvdW5kUmVjdCA9IHRoaXMuYm91bmRSZWN0O1xuICAgIGNvbnN0IHJlY3RQMiA9IGJvdW5kUmVjdC5nZXRQMigpO1xuICAgIGxldCBib3VuZGFyeVBvaW50cyA9IFtib3VuZFJlY3QucG9zaXRpb25dO1xuICAgIHJlY3RhbmdsZUxpc3QuZm9yRWFjaCgocmVjdCwgcmVjdEluZGV4KSA9PiB7XG4gICAgICBsZXQgcG9zaXRpb24sXG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm91bmRhcnlQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9pbnQoYm91bmRhcnlQb2ludHNbaV0ueCArIHRoaXMucGFkZGluZ1RvcExlZnQueCwgaSA+IDAgPyBib3VuZGFyeVBvaW50c1tpIC0gMV0ueSArIHRoaXMueUdhcEJldHdlZW5EcmFnZ2FibGVzIDogYm91bmRSZWN0LnBvc2l0aW9uLnkgKyB0aGlzLnBhZGRpbmdUb3BMZWZ0LnkpO1xuICAgICAgICBpc1ZhbGlkID0gcG9zaXRpb24ueCArIHJlY3Quc2l6ZS54IDwgcmVjdFAyLng7XG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb2ludChib3VuZFJlY3QucG9zaXRpb24ueCArIHRoaXMucGFkZGluZ1RvcExlZnQueCwgYm91bmRhcnlQb2ludHNbYm91bmRhcnlQb2ludHMubGVuZ3RoIC0gMV0ueSArIChyZWN0SW5kZXggPiAwID8gdGhpcy55R2FwQmV0d2VlbkRyYWdnYWJsZXMgOiB0aGlzLnBhZGRpbmdUb3BMZWZ0LnkpKTtcbiAgICAgIH1cbiAgICAgIHJlY3QucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZhYmxlICYmIHJlY3QuZ2V0UDMoKS55ID4gYm91bmRSZWN0LmdldFAzKCkueSkge1xuICAgICAgICByZWN0LnJlbW92YWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBib3VuZGFyeVBvaW50cyA9IGFkZFBvaW50VG9Cb3VuZFBvaW50cyhib3VuZGFyeVBvaW50cywgcmVjdC5nZXRQMygpLmFkZCh0aGlzLnBhZGRpbmdCb3R0b21SaWdodCkpO1xuICAgIH0pO1xuICAgIHJldHVybiByZWN0YW5nbGVMaXN0O1xuICB9XG4gIHNvcnRpbmcob2RsRHJhZ2dhYmxlc0xpc3QsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKSB7XG4gICAgY29uc3QgbmV3TGlzdCA9IG9kbERyYWdnYWJsZXNMaXN0LmNvbmNhdCgpO1xuICAgIGNvbnN0IGxpc3RPbGRQb3NpdGlvbiA9IG9kbERyYWdnYWJsZXNMaXN0Lm1hcChkcmFnZ2FibGUgPT4gZHJhZ2dhYmxlLmdldFBvc2l0aW9uKCkpO1xuICAgIG5ld0RyYWdnYWJsZXMuZm9yRWFjaChuZXdEcmFnZ2FibGUgPT4ge1xuICAgICAgbGV0IGluZGV4ID0gaW5kZXhPZk5lYXJlc3RQb2ludChsaXN0T2xkUG9zaXRpb24sIHRoaXMuZ2V0UG9zaXRpb24obmV3RHJhZ2dhYmxlKSwgdGhpcy5yYWRpdXMsIHRoaXMuZ2V0RGlzdGFuY2UpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBpbmRleCA9IG5ld0xpc3QubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSBuZXdMaXN0LmluZGV4T2Yob2RsRHJhZ2dhYmxlc0xpc3RbaW5kZXhdKTtcbiAgICAgIH1cbiAgICAgIG5ld0xpc3Quc3BsaWNlKGluZGV4LCAwLCBuZXdEcmFnZ2FibGUpO1xuICAgIH0pO1xuICAgIG5ld0RyYWdnYWJsZXMuZm9yRWFjaChuZXdEcmFnZ2FibGUgPT4ge1xuICAgICAgaW5kZXhPZk5ld3MucHVzaChuZXdMaXN0LmluZGV4T2YobmV3RHJhZ2dhYmxlKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld0xpc3Q7XG4gIH1cbn1cbmNsYXNzIEZsb2F0UmlnaHRTdHJhdGVneSBleHRlbmRzIEZsb2F0TGVmdFN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IocmVjdGFuZ2xlKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHN1cGVyKHJlY3RhbmdsZSwgb3B0aW9ucyk7XG4gICAgdGhpcy5wYWRkaW5nVG9wUmlnaHQgPSBvcHRpb25zLnBhZGRpbmdUb3BSaWdodCB8fCBuZXcgUG9pbnQoNSwgNSk7XG4gICAgdGhpcy5wYWRkaW5nQm90dG9tTGVmdCA9IG9wdGlvbnMucGFkZGluZ0JvdHRvbUxlZnQgfHwgbmV3IFBvaW50KDAsIDApO1xuICAgIHRoaXMueUdhcEJldHdlZW5EcmFnZ2FibGVzID0gb3B0aW9ucy55R2FwQmV0d2VlbkRyYWdnYWJsZXMgfHwgMDtcbiAgICB0aGlzLnBhZGRpbmdCb3R0b21OZWdMZWZ0ID0gbmV3IFBvaW50KC10aGlzLnBhZGRpbmdCb3R0b21MZWZ0LngsIHRoaXMucGFkZGluZ0JvdHRvbUxlZnQueSk7XG4gIH1cbiAgcG9zaXRpb25pbmcocmVjdGFuZ2xlTGlzdCwgX2luZGV4ZXNPZk5ld3MpIHtcbiAgICBjb25zdCBib3VuZFJlY3QgPSB0aGlzLmJvdW5kUmVjdDtcbiAgICBsZXQgYm91bmRhcnlQb2ludHMgPSBbYm91bmRSZWN0LmdldFAyKCldO1xuICAgIHJlY3RhbmdsZUxpc3QuZm9yRWFjaCgocmVjdCwgcmVjdEluZGV4KSA9PiB7XG4gICAgICBsZXQgcG9zaXRpb24sXG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm91bmRhcnlQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9pbnQoYm91bmRhcnlQb2ludHNbaV0ueCAtIHJlY3Quc2l6ZS54IC0gdGhpcy5wYWRkaW5nVG9wUmlnaHQueCwgaSA+IDAgPyBib3VuZGFyeVBvaW50c1tpIC0gMV0ueSArIHRoaXMueUdhcEJldHdlZW5EcmFnZ2FibGVzIDogYm91bmRSZWN0LnBvc2l0aW9uLnkgKyB0aGlzLnBhZGRpbmdUb3BSaWdodC55KTtcbiAgICAgICAgaXNWYWxpZCA9IHBvc2l0aW9uLnggPiByZWN0LnBvc2l0aW9uLng7XG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb2ludChib3VuZFJlY3QuZ2V0UDIoKS54IC0gcmVjdC5zaXplLnggLSB0aGlzLnBhZGRpbmdUb3BSaWdodC54LCBib3VuZGFyeVBvaW50c1tib3VuZGFyeVBvaW50cy5sZW5ndGggLSAxXS55ICsgKHJlY3RJbmRleCA+IDAgPyB0aGlzLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyA6IHRoaXMucGFkZGluZ1RvcFJpZ2h0LnkpKTtcbiAgICAgIH1cbiAgICAgIHJlY3QucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZhYmxlICYmIHJlY3QuZ2V0UDQoKS55ID4gYm91bmRSZWN0LmdldFA0KCkueSkge1xuICAgICAgICByZWN0LnJlbW92YWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBib3VuZGFyeVBvaW50cyA9IGFkZFBvaW50VG9Cb3VuZFBvaW50cyhib3VuZGFyeVBvaW50cywgcmVjdC5nZXRQNCgpLmFkZCh0aGlzLnBhZGRpbmdCb3R0b21OZWdMZWZ0KSwgdHJ1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlY3RhbmdsZUxpc3Q7XG4gIH1cbn1cblxuY29uc3QgYWRkVG9EZWZhdWx0U2NvcGUkMSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZGVmYXVsdFNjb3BlLmFkZFRhcmdldCh0YXJnZXQpO1xufTtcbmNsYXNzIFRhcmdldCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGRyYWdnYWJsZXMpIHtcbiAgICBsZXQgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcztcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHRpbWVFbmQ6IDIwMCxcbiAgICAgIHRpbWVFeGNhbmdlOiA0MDBcbiAgICB9LCBvcHRpb25zKTtcbiAgICB0aGlzLnBvc2l0aW9uaW5nU3RyYXRlZ3kgPSBvcHRpb25zLnN0cmF0ZWd5IHx8IG5ldyBGbG9hdExlZnRTdHJhdGVneSh0aGlzLmdldFJlY3RhbmdsZS5iaW5kKHRoaXMpLCB7XG4gICAgICByYWRpdXM6IDgwLFxuICAgICAgZ2V0RGlzdGFuY2U6IHRyYW5zZm9ybWVkU3BhY2VEaXN0YW5jZUZhY3Rvcnkoe1xuICAgICAgICB4OiAxLFxuICAgICAgICB5OiA0XG4gICAgICB9KSxcbiAgICAgIHJlbW92YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgZHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiBkcmFnZ2FibGUudGFyZ2V0cy5wdXNoKHRhcmdldCkpO1xuICAgIHRoaXMuZHJhZ2dhYmxlcyA9IGRyYWdnYWJsZXM7XG4gICAgVGFyZ2V0LmVtaXR0ZXIuZW1pdCgndGFyZ2V0OmNyZWF0ZScsIHRoaXMpO1xuICAgIHRoaXMuc3RhcnRCb3VuZGluZygpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG4gIHN0YXJ0Qm91bmRpbmcoKSB7XG4gICAgdGhpcy5ib3VuZCA9IHRoaXMub3B0aW9ucy5ib3VuZCB8fCBCb3VuZFRvRWxlbWVudC5ib3VuZGluZyh0aGlzLmVsZW1lbnQpO1xuICB9XG4gIHBvc2l0aW9uaW5nKGRyYWdnYWJsZXMsIGluZGV4ZXNPZk5ldykge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uaW5nU3RyYXRlZ3kucG9zaXRpb25pbmcoZHJhZ2dhYmxlcywgaW5kZXhlc09mTmV3KTtcbiAgfVxuICBzb3J0aW5nKG9sZERyYWdnYWJsZXMsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25pbmdTdHJhdGVneS5zb3J0aW5nKG9sZERyYWdnYWJsZXMsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKTtcbiAgfVxuICBpbml0KCkge1xuICAgIGxldCByZWN0YW5nbGVzLCBpbmRleGVzT2ZOZXc7XG4gICAgdGhpcy5pbm5lckRyYWdnYWJsZXMgPSB0aGlzLmRyYWdnYWJsZXMuZmlsdGVyKGRyYWdnYWJsZSA9PiB7XG4gICAgICBsZXQgZWxlbWVudCA9IGRyYWdnYWJsZS5lbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdGhpcy5lbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMubGVuZ3RoKSB7XG4gICAgICBpbmRleGVzT2ZOZXcgPSByYW5nZSh0aGlzLmlubmVyRHJhZ2dhYmxlcy5sZW5ndGgpO1xuICAgICAgcmVjdGFuZ2xlcyA9IHRoaXMucG9zaXRpb25pbmcodGhpcy5pbm5lckRyYWdnYWJsZXMubWFwKGRyYWdnYWJsZSA9PiB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgICB9KSwgaW5kZXhlc09mTmV3KTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgaW5kZXhlc09mTmV3KTtcbiAgICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IHRoaXMuZW1pdCgndGFyZ2V0OmFkZCcsIGRyYWdnYWJsZSkpO1xuICAgIH1cbiAgfVxuICBnZXRSZWN0YW5nbGUoKSB7XG4gICAgcmV0dXJuIFJlY3RhbmdsZS5mcm9tRWxlbWVudCh0aGlzLmVsZW1lbnQsIHRoaXMuY29udGFpbmVyLCB0cnVlKTtcbiAgfVxuICBjYXRjaERyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmNhdGNoRHJhZ2dhYmxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNhdGNoRHJhZ2dhYmxlKHRoaXMsIGRyYWdnYWJsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRhcmdldFJlY3RhbmdsZSA9IHRoaXMuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgICBjb25zdCBkcmFnZ2FibGVTcXVhcmUgPSBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCkuZ2V0U3F1YXJlKCk7XG4gICAgICByZXR1cm4gZHJhZ2dhYmxlU3F1YXJlIDwgdGFyZ2V0UmVjdGFuZ2xlLmdldFNxdWFyZSgpICYmIHRhcmdldFJlY3RhbmdsZS5pbmNsdWRlUG9pbnQoZHJhZ2dhYmxlLmdldENlbnRlcigpKTtcbiAgICB9XG4gIH1cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVjdGFuZ2xlKCkucG9zaXRpb247XG4gIH1cbiAgZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRSZWN0YW5nbGUoKS5zaXplO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgc2NvcGVzLmZvckVhY2goc2NvcGUgPT4gcmVtb3ZlSXRlbShzY29wZS50YXJnZXRzLCB0aGlzKSk7XG4gIH1cbiAgcmVmcmVzaCgpIHtcbiAgICBjb25zdCByZWN0YW5nbGVzID0gdGhpcy5wb3NpdGlvbmluZyh0aGlzLmlubmVyRHJhZ2dhYmxlcy5tYXAoZHJhZ2dhYmxlID0+IHtcbiAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgfSksIFtdKTtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHJlY3RhbmdsZXMsIFtdLCAwKTtcbiAgfVxuICBvbkVuZChkcmFnZ2FibGUpIHtcbiAgICBjb25zdCBuZXdEcmFnZ2FibGVzSW5kZXggPSBbXTtcbiAgICBpZiAodGhpcy5nZXRSZWN0YW5nbGUoKS5pbmNsdWRlUG9pbnQoZHJhZ2dhYmxlLmdldENlbnRlcigpKSkge1xuICAgICAgZHJhZ2dhYmxlLnBvc2l0aW9uID0gdGhpcy5ib3VuZChkcmFnZ2FibGUucG9zaXRpb24sIGRyYWdnYWJsZS5nZXRTaXplKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuZW1pdCgndGFyZ2V0OmJlZm9yZUFkZCcsIGRyYWdnYWJsZSk7XG4gICAgdGhpcy5pbm5lckRyYWdnYWJsZXMgPSB0aGlzLnNvcnRpbmcodGhpcy5pbm5lckRyYWdnYWJsZXMsIFtkcmFnZ2FibGVdLCBuZXdEcmFnZ2FibGVzSW5kZXgpO1xuICAgIGNvbnN0IHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChkcmFnZ2FibGUgPT4ge1xuICAgICAgcmV0dXJuIGRyYWdnYWJsZS5nZXRSZWN0YW5nbGUoKTtcbiAgICB9KSwgbmV3RHJhZ2dhYmxlc0luZGV4KTtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHJlY3RhbmdsZXMsIG5ld0RyYWdnYWJsZXNJbmRleCk7XG4gICAgaWYgKHRoaXMuaW5uZXJEcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuYWRkUmVtb3ZlT25Nb3ZlKGRyYWdnYWJsZSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHNldFBvc2l0aW9uKHJlY3RhbmdsZXMsIGluZGV4ZXNPZk5ldywgdGltZSkge1xuICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzLnNsaWNlKDApLmZvckVhY2goKGRyYWdnYWJsZSwgaSkgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IHJlY3RhbmdsZXNbaV0sXG4gICAgICAgIHRpbWVFbmQgPSB0aW1lIHx8IHRpbWUgPT09IDAgPyB0aW1lIDogaW5kZXhlc09mTmV3LmluZGV4T2YoaSkgIT09IC0xID8gdGhpcy5vcHRpb25zLnRpbWVFbmQgOiB0aGlzLm9wdGlvbnMudGltZUV4Y2FuZ2U7XG4gICAgICBpZiAocmVjdC5yZW1vdmFibGUpIHtcbiAgICAgICAgZHJhZ2dhYmxlLm1vdmUoZHJhZ2dhYmxlLmluaXRpYWxQb3NpdGlvbiwgdGltZUVuZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHJlbW92ZUl0ZW0odGhpcy5pbm5lckRyYWdnYWJsZXMsIGRyYWdnYWJsZSk7XG4gICAgICAgIHRoaXMuZW1pdCgndGFyZ2V0OnJlbW92ZScsIGRyYWdnYWJsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkcmFnZ2FibGUubW92ZShyZWN0LnBvc2l0aW9uLCB0aW1lRW5kLCB0cnVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBhZGQoZHJhZ2dhYmxlLCB0aW1lKSB7XG4gICAgY29uc3QgbmV3RHJhZ2dhYmxlc0luZGV4ID0gdGhpcy5pbm5lckRyYWdnYWJsZXMubGVuZ3RoO1xuICAgIHRoaXMuZW1pdCgndGFyZ2V0OmJlZm9yZUFkZCcsIGRyYWdnYWJsZSk7XG4gICAgdGhpcy5wdXNoSW5uZXJEcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbiAgICBjb25zdCByZWN0YW5nbGVzID0gdGhpcy5wb3NpdGlvbmluZyh0aGlzLmlubmVyRHJhZ2dhYmxlcy5tYXAoZHJhZ2dhYmxlID0+IHtcbiAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgfSksIG5ld0RyYWdnYWJsZXNJbmRleCwgZHJhZ2dhYmxlKTtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHJlY3RhbmdsZXMsIFtuZXdEcmFnZ2FibGVzSW5kZXhdLCB0aW1lIHx8IDApO1xuICAgIGlmICh0aGlzLmlubmVyRHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSkgIT09IC0xKSB7XG4gICAgICB0aGlzLmFkZFJlbW92ZU9uTW92ZShkcmFnZ2FibGUpO1xuICAgIH1cbiAgfVxuICBwdXNoSW5uZXJEcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgaWYgKHRoaXMuaW5uZXJEcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzLnB1c2goZHJhZ2dhYmxlKTtcbiAgICB9XG4gIH1cbiAgYWRkUmVtb3ZlT25Nb3ZlKGRyYWdnYWJsZSkge1xuICAgIGRyYWdnYWJsZS5vbignZHJhZzptb3ZlJywgdGhpcy5yZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmUoZHJhZ2dhYmxlKTtcbiAgICB9KTtcbiAgICB0aGlzLmVtaXQoJ3RhcmdldDphZGQnLCBkcmFnZ2FibGUpO1xuICB9XG4gIHJlbW92ZShkcmFnZ2FibGUpIHtcbiAgICBkcmFnZ2FibGUudW5zdWJzY3JpYmUoJ2RyYWc6bW92ZScsIHRoaXMucmVtb3ZlSGFuZGxlcik7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmlubmVyRHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGNvbnN0IHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChkcmFnZ2FibGUgPT4ge1xuICAgICAgcmV0dXJuIGRyYWdnYWJsZS5nZXRSZWN0YW5nbGUoKTtcbiAgICB9KSwgW10pO1xuICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgW10pO1xuICAgIHRoaXMuZW1pdCgndGFyZ2V0OnJlbW92ZScsIGRyYWdnYWJsZSk7XG4gIH1cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4ge1xuICAgICAgZHJhZ2dhYmxlLm1vdmUoZHJhZ2dhYmxlLmluaXRpYWxQb3NpdGlvbiwgMCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB0aGlzLmVtaXQoJ3RhcmdldDpyZW1vdmUnLCBkcmFnZ2FibGUpO1xuICAgIH0pO1xuICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzID0gW107XG4gIH1cbiAgZ2V0U29ydGVkRHJhZ2dhYmxlcygpIHtcbiAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcy5zbGljZSgpO1xuICB9XG4gIGdldCBjb250YWluZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lciB8fCB0aGlzLm9wdGlvbnMuY29udGFpbmVyIHx8IHRoaXMub3B0aW9ucy5wYXJlbnQgfHwgZ2V0RGVmYXVsdENvbnRhaW5lcih0aGlzLmVsZW1lbnQpO1xuICB9XG59XG5UYXJnZXQuZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblRhcmdldC5lbWl0dGVyLm9uKCd0YXJnZXQ6Y3JlYXRlJywgYWRkVG9EZWZhdWx0U2NvcGUkMSk7XG5cbmNvbnN0IHNjb3BlcyA9IFtdO1xuY2xhc3MgU2NvcGUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihkcmFnZ2FibGVzLCB0YXJnZXRzKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHNjb3Blcy5mb3JFYWNoKHNjb3BlID0+IHtcbiAgICAgIGlmIChkcmFnZ2FibGVzKSB7XG4gICAgICAgIGRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4ge1xuICAgICAgICAgIHJlbW92ZUl0ZW0oc2NvcGUuZHJhZ2dhYmxlcywgZHJhZ2dhYmxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0cykge1xuICAgICAgICB0YXJnZXRzLmZvckVhY2godGFyZ2V0ID0+IHtcbiAgICAgICAgICByZW1vdmVJdGVtKHNjb3BlLnRhcmdldHMsIHRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZHJhZ2dhYmxlcyA9IGRyYWdnYWJsZXMgfHwgW107XG4gICAgdGhpcy50YXJnZXRzID0gdGFyZ2V0cyB8fCBbXTtcbiAgICBzY29wZXMucHVzaCh0aGlzKTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICB0aW1lRW5kOiBvcHRpb25zLnRpbWVFbmQgfHwgNDAwXG4gICAgfTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuICBpbml0KCkge1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiB7XG4gICAgICBkcmFnZ2FibGUuZHJhZ0VuZEFjdGlvbiA9ICgpID0+IHRoaXMub25FbmQoZHJhZ2dhYmxlKTtcbiAgICB9KTtcbiAgfVxuICBhZGREcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVzLnB1c2goZHJhZ2dhYmxlKTtcbiAgICBkcmFnZ2FibGUuZHJhZ0VuZEFjdGlvbiA9ICgpID0+IHRoaXMub25FbmQoZHJhZ2dhYmxlKTtcbiAgfVxuICBhZGRUYXJnZXQodGFyZ2V0KSB7XG4gICAgdGhpcy50YXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgfVxuICBvbkVuZChkcmFnZ2FibGUpIHtcbiAgICBjb25zdCBzaG90VGFyZ2V0cyA9IHRoaXMudGFyZ2V0cy5maWx0ZXIodGFyZ2V0ID0+IHtcbiAgICAgIHJldHVybiB0YXJnZXQuZHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSkgIT09IC0xO1xuICAgIH0pLmZpbHRlcih0YXJnZXQgPT4ge1xuICAgICAgcmV0dXJuIHRhcmdldC5jYXRjaERyYWdnYWJsZShkcmFnZ2FibGUpO1xuICAgIH0pLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBhLmdldFJlY3RhbmdsZSgpLmdldFNxdWFyZSgpIC0gYi5nZXRSZWN0YW5nbGUoKS5nZXRTcXVhcmUoKTtcbiAgICB9KTtcbiAgICBpZiAoc2hvdFRhcmdldHMubGVuZ3RoKSB7XG4gICAgICBzaG90VGFyZ2V0c1swXS5vbkVuZChkcmFnZ2FibGUpO1xuICAgIH0gZWxzZSBpZiAoZHJhZ2dhYmxlLnRhcmdldHMubGVuZ3RoKSB7XG4gICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24oZHJhZ2dhYmxlLmluaXRpYWxQb3NpdGlvbiwgdGhpcy5vcHRpb25zLnRpbWVFbmQpO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ3Njb3BlOmNoYW5nZScpO1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKHRhcmdldCA9PiB0YXJnZXQucmVzZXQoKSk7XG4gIH1cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4gZHJhZ2dhYmxlLnJlZnJlc2goKSk7XG4gICAgdGhpcy50YXJnZXRzLmZvckVhY2godGFyZ2V0ID0+IHRhcmdldC5yZWZyZXNoKCkpO1xuICB9XG4gIGdldCBwb3NpdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0cy5tYXAodGFyZ2V0ID0+IHtcbiAgICAgIHJldHVybiB0YXJnZXQuaW5uZXJEcmFnZ2FibGVzLm1hcChkcmFnZ2FibGUgPT4gdGhpcy5kcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKSk7XG4gICAgfSk7XG4gIH1cbiAgc2V0IHBvc2l0aW9ucyhwb3NpdGlvbnMpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gJ3dyb25nIGFycmF5IGxlbmd0aCc7XG4gICAgaWYgKHBvc2l0aW9ucy5sZW5ndGggPT09IHRoaXMudGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKHRhcmdldCA9PiB0YXJnZXQucmVzZXQoKSk7XG4gICAgICBwb3NpdGlvbnMuZm9yRWFjaCgodGFyZ2V0SW5kZXhlcywgaSkgPT4ge1xuICAgICAgICB0YXJnZXRJbmRleGVzLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgICAgIHRoaXMudGFyZ2V0c1tpXS5hZGQodGhpcy5kcmFnZ2FibGVzW2luZGV4XSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG1lc3NhZ2U7XG4gICAgfVxuICB9XG59XG5jb25zdCBkZWZhdWx0U2NvcGUgPSBuZXcgU2NvcGUoKTtcbmZ1bmN0aW9uIHNjb3BlKGZuKSB7XG4gIGNvbnN0IGN1cnJlbnRTY29wZSA9IG5ldyBTY29wZSgpO1xuICBjb25zdCBhZGREcmFnZ2FibGVUb1Njb3BlID0gZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgIGN1cnJlbnRTY29wZS5hZGREcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbiAgICBEcmFnZ2FibGUuZW1pdHRlci5pbnRlcnJ1cHQoKTtcbiAgfTtcbiAgY29uc3QgYWRkVGFyZ2V0VG9TY29wZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBjdXJyZW50U2NvcGUuYWRkVGFyZ2V0KHRhcmdldCk7XG4gICAgRHJhZ2dhYmxlLmVtaXR0ZXIuaW50ZXJydXB0KCk7XG4gIH07XG4gIERyYWdnYWJsZS5lbWl0dGVyLnByZXBlbmRPbignZHJhZ2dhYmxlOmNyZWF0ZScsIGFkZERyYWdnYWJsZVRvU2NvcGUpO1xuICBUYXJnZXQuZW1pdHRlci5wcmVwZW5kT24oJ3RhcmdldDpjcmVhdGUnLCBhZGRUYXJnZXRUb1Njb3BlKTtcbiAgZm4uY2FsbCgpO1xuICBEcmFnZ2FibGUuZW1pdHRlci51bnN1YnNjcmliZSgnZHJhZ2dhYmxlOmNyZWF0ZScsIGFkZERyYWdnYWJsZVRvU2NvcGUpO1xuICBUYXJnZXQuZW1pdHRlci51bnN1YnNjcmliZSgndGFyZ2V0OmNyZWF0ZScsIGFkZFRhcmdldFRvU2NvcGUpO1xuICByZXR1cm4gY3VycmVudFNjb3BlO1xufVxuXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0KSB7XG4gIGxldCBsYXN0VGltZSA9IDA7XG4gIHJldHVybiBmdW5jdGlvbiBleGVjdXRlZEZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBpZiAobm93IC0gbGFzdFRpbWUgPj0gd2FpdCkge1xuICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGxhc3RUaW1lID0gbm93O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyZW50c0NoYWluKGNoaWxkRWxlbWVudCwgcm9vdEVsZW1lbnQpIHtcbiAgY29uc3QgY2hhaW4gPSBbXTtcbiAgbGV0IGVsZW1lbnQgPSBjaGlsZEVsZW1lbnQ7XG4gIHdoaWxlIChlbGVtZW50LnBhcmVudE5vZGUgJiYgZWxlbWVudCAhPT0gcm9vdEVsZW1lbnQpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGVsZW1lbnQucGFyZW50Tm9kZSk7XG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gY2hhaW47XG59XG5cbmNvbnN0IHRocm90dGxlZERyYWdPdmVyID0gKGNhbGxiYWNrLCBkdXJhdGlvbikgPT4ge1xuICBjb25zdCB0aHJvdHRsZWRDYWxsYmFjayA9IHRocm90dGxlKGV2ZW50ID0+IGNhbGxiYWNrKGV2ZW50KSwgZHVyYXRpb24pO1xuICByZXR1cm4gZXZlbnQgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhyb3R0bGVkQ2FsbGJhY2soZXZlbnQpO1xuICB9O1xufTtcbmNvbnN0IHBhc3NpdmVGYWxzZSA9IHtcbiAgcGFzc2l2ZTogZmFsc2Vcbn07XG5jb25zdCBpc1RvdWNoID0gbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcbmNvbnN0IG1vdXNlRXZlbnRzID0ge1xuICBzdGFydDogJ21vdXNlZG93bicsXG4gIG1vdmU6ICdtb3VzZW1vdmUnLFxuICBlbmQ6ICdtb3VzZXVwJ1xufTtcbmNvbnN0IHRvdWNoRXZlbnRzID0ge1xuICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICBtb3ZlOiAndG91Y2htb3ZlJyxcbiAgZW5kOiAndG91Y2hlbmQnXG59O1xuY29uc3QgZHJhZ2dhYmxlcyA9IFtdO1xuY29uc3QgdHJhbnNmb3JtUHJvcGVydHkgPSAndHJhbnNmb3JtJztcbmNvbnN0IHRyYW5zaXRpb25Qcm9wZXJ0eSA9ICd0cmFuc2l0aW9uJztcbmZ1bmN0aW9uIGdldFRvdWNoQnlJRChlbGVtZW50LCB0b3VjaElkKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlbGVtZW50LmNoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXIgPT09IHRvdWNoSWQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBwcmV2ZW50RG91YmxlSW5pdChkcmFnZ2FibGUpIHtcbiAgY29uc3QgbWVzc2FnZSA9IFwiZm9yIHRoaXMgZWxlbWVudCBEcmFnZWUuRHJhZ2dhYmxlIGlzIGFscmVhZHkgZXhpc3QsIGRvbid0IGNyZWF0ZSBpdCB0d2ljZSBcIjtcbiAgaWYgKGRyYWdnYWJsZXMuc29tZShleGlzdGluZyA9PiBkcmFnZ2FibGUuZWxlbWVudCA9PT0gZXhpc3RpbmcuZWxlbWVudCkpIHtcbiAgICB0aHJvdyBtZXNzYWdlO1xuICB9XG4gIGRyYWdnYWJsZXMucHVzaChkcmFnZ2FibGUpO1xufVxuZnVuY3Rpb24gYWRkVG9EZWZhdWx0U2NvcGUoZHJhZ2dhYmxlKSB7XG4gIGRlZmF1bHRTY29wZS5hZGREcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbn1cbmZ1bmN0aW9uIGNvcHlTdHlsZXMoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICBjb25zdCBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNvdXJjZSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3MubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBjc1tpXTtcbiAgICBpZiAoa2V5LmluZGV4T2YoJ3RyYW5zaXRpb24nKSA8IDAgJiYga2V5LmluZGV4T2YoJ3RyYW5zZm9ybScpIDwgMCkge1xuICAgICAgZGVzdGluYXRpb24uc3R5bGVba2V5XSA9IGNzW2tleV07XG4gICAgfVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgY29weVN0eWxlcyhzb3VyY2UuY2hpbGRyZW5baV0sIGRlc3RpbmF0aW9uLmNoaWxkcmVuW2ldKTtcbiAgfVxufVxuY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIGxldCBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnRhcmdldHMgPSBbXTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgcHJldmVudERvdWJsZUluaXQodGhpcyk7XG4gICAgRHJhZ2dhYmxlLmVtaXR0ZXIuZW1pdCgnZHJhZ2dhYmxlOmNyZWF0ZScsIHRoaXMpO1xuICAgIHRoaXMuX2VuYWJsZSA9IHRydWU7XG4gICAgdGhpcy5zdGFydEJvdW5kaW5nKCk7XG4gICAgdGhpcy5zdGFydFBvc2l0aW9uaW5nKCk7XG4gICAgdGhpcy5zdGFydExpc3RlbmluZygpO1xuICB9XG4gIHN0YXJ0Qm91bmRpbmcoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5ib3VuZCkge1xuICAgICAgdGhpcy5ib3VuZGluZyA9IHtcbiAgICAgICAgYm91bmQ6IHRoaXMub3B0aW9ucy5ib3VuZFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib3VuZGluZyA9IG5ldyBCb3VuZFRvRWxlbWVudCh0aGlzLmNvbnRhaW5lciwgdGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgfVxuICBzdGFydFBvc2l0aW9uaW5nKCkge1xuICAgIHRoaXMuX3NldERlZmF1bHRUcmFuc2l0aW9uKCk7XG4gICAgdGhpcy5vZmZzZXQgPSBQb2ludC5lbGVtZW50T2Zmc2V0KHRoaXMuZWxlbWVudCwgdGhpcy5jb250YWluZXIpO1xuICAgIHRoaXMucGlubmVkUG9zaXRpb24gPSB0aGlzLm9mZnNldDtcbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5vZmZzZXQ7XG4gICAgdGhpcy5pbml0aWFsUG9zaXRpb24gPSB0aGlzLm9wdGlvbnMucG9zaXRpb24gfHwgdGhpcy5vZmZzZXQ7XG4gICAgdGhpcy5waW5Qb3NpdGlvbih0aGlzLmluaXRpYWxQb3NpdGlvbik7XG4gICAgaWYgKHRoaXMuYm91bmRpbmcucmVmcmVzaCkge1xuICAgICAgdGhpcy5ib3VuZGluZy5yZWZyZXNoKCk7XG4gICAgfVxuICB9XG4gIHN0YXJ0TGlzdGVuaW5nKCkge1xuICAgIHRoaXMuX2RyYWdTdGFydCA9IGV2ZW50ID0+IHRoaXMuZHJhZ1N0YXJ0KGV2ZW50KTtcbiAgICB0aGlzLl9kcmFnTW92ZSA9IGV2ZW50ID0+IHRoaXMuZHJhZ01vdmUoZXZlbnQpO1xuICAgIHRoaXMuX2RyYWdFbmQgPSBldmVudCA9PiB0aGlzLmRyYWdFbmQoZXZlbnQpO1xuICAgIHRoaXMuX25hdGl2ZURyYWdTdGFydCA9IGV2ZW50ID0+IHRoaXMubmF0aXZlRHJhZ1N0YXJ0KGV2ZW50KTtcbiAgICB0aGlzLl9uYXRpdmVEcmFnT3ZlciA9IHRocm90dGxlZERyYWdPdmVyKGV2ZW50ID0+IHRoaXMubmF0aXZlRHJhZ092ZXIoZXZlbnQpLCB0aGlzLmRyYWdPdmVyVGhyb3R0bGVEdXJhdGlvbik7XG4gICAgdGhpcy5fbmF0aXZlRHJhZ0VuZCA9IGV2ZW50ID0+IHRoaXMubmF0aXZlRHJhZ0VuZChldmVudCk7XG4gICAgdGhpcy5fbmF0aXZlRHJvcCA9IGV2ZW50ID0+IHRoaXMubmF0aXZlRHJvcChldmVudCk7XG4gICAgdGhpcy5fc2Nyb2xsID0gZXZlbnQgPT4gdGhpcy5vblNjcm9sbChldmVudCk7XG4gICAgdGhpcy5oYW5kbGVyLmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuc3RhcnQsIHRoaXMuX2RyYWdTdGFydCwgcGFzc2l2ZUZhbHNlKTtcbiAgICB0aGlzLmhhbmRsZXIuYWRkRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5zdGFydCwgdGhpcy5fZHJhZ1N0YXJ0LCBwYXNzaXZlRmFsc2UpO1xuICB9XG4gIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIFBvaW50LmVsZW1lbnRTaXplKHRoaXMuZWxlbWVudCk7XG4gIH1cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMub2Zmc2V0LmFkZCh0aGlzLl90cmFuc2Zvcm1Qb3NpdGlvbiB8fCBuZXcgUG9pbnQoMCwgMCkpO1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICB9XG4gIGdldENlbnRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy5nZXRTaXplKCkubXVsdCgwLjUpKTtcbiAgfVxuICBfc2V0RGVmYXVsdFRyYW5zaXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XSkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zaXRpb25Qcm9wZXJ0eV0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQpW3RyYW5zaXRpb25Qcm9wZXJ0eV07XG4gICAgfVxuICB9XG4gIF9zZXRUcmFuc2l0aW9uKHRpbWUpIHtcbiAgICBsZXQgdHJhbnNpdGlvbiA9IHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2l0aW9uUHJvcGVydHldO1xuICAgIGNvbnN0IHRyYW5zaXRpb25Dc3MgPSBgdHJhbnNmb3JtICR7dGltZX1tc2A7XG4gICAgaWYgKCEvdHJhbnNmb3JtXFxzP1xcZCptP3M/Ly50ZXN0KHRyYW5zaXRpb24pKSB7XG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICB0cmFuc2l0aW9uICs9IGAsICR7dHJhbnNpdGlvbkNzc31gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNpdGlvbiA9IHRyYW5zaXRpb25Dc3M7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zaXRpb24gPSB0cmFuc2l0aW9uLnJlcGxhY2UoL3RyYW5zZm9ybVxccz9cXGQqbT9zPy9nLCB0cmFuc2l0aW9uQ3NzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2l0aW9uUHJvcGVydHldICE9PSB0cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XSA9IHRyYW5zaXRpb247XG4gICAgfVxuICB9XG4gIF9zZXRUcmFuc2xhdGUocG9pbnQpIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1Qb3NpdGlvbiA9IHBvaW50O1xuICAgIGNvbnN0IHRyYW5zbGF0ZUNzcyA9IGB0cmFuc2xhdGUzZCgke3BvaW50Lnh9cHgsICR7cG9pbnQueX1weCwgMHB4KWA7XG4gICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2Zvcm1Qcm9wZXJ0eV07XG4gICAgaWYgKHRoaXMuc2hvdWxkUmVtb3ZlWmVyb1RyYW5zbGF0ZSAmJiBwb2ludC54ID09PSAwICYmIHBvaW50LnkgPT09IDApIHtcbiAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5yZXBsYWNlKC90cmFuc2xhdGUzZFxcKFteKV0rXFwpLywgJycpO1xuICAgIH0gZWxzZSBpZiAoIS90cmFuc2xhdGUzZFxcKFteKV0rXFwpLy50ZXN0KHRyYW5zZm9ybSkpIHtcbiAgICAgIGlmICh0cmFuc2Zvcm0pIHtcbiAgICAgICAgdHJhbnNmb3JtICs9ICcgJztcbiAgICAgIH1cbiAgICAgIHRyYW5zZm9ybSArPSB0cmFuc2xhdGVDc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5yZXBsYWNlKC90cmFuc2xhdGUzZFxcKFteKV0rXFwpLywgdHJhbnNsYXRlQ3NzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2Zvcm1Qcm9wZXJ0eV0gIT09IHRyYW5zZm9ybSkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XSA9IHRyYW5zZm9ybTtcbiAgICB9XG4gIH1cbiAgbW92ZShwb2ludCkge1xuICAgIGxldCB0aW1lID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAgIGxldCBpc1NpbGVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgcG9pbnQgPSBwb2ludC5jbG9uZSgpO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb2ludDtcbiAgICB0aGlzLl9zZXRUcmFuc2l0aW9uKHRpbWUpO1xuICAgIHRoaXMuX3NldFRyYW5zbGF0ZShwb2ludC5zdWIodGhpcy5vZmZzZXQpKTtcbiAgICBpZiAoIWlzU2lsZW50KSB7XG4gICAgICB0aGlzLmVtaXQoJ2RyYWc6bW92ZScpO1xuICAgIH1cbiAgfVxuICBwaW5Qb3NpdGlvbihwb2ludCkge1xuICAgIGxldCB0aW1lID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAgIGxldCBzaWxlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHRydWU7XG4gICAgdGhpcy5waW5uZWRQb3NpdGlvbiA9IHBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5tb3ZlKHRoaXMucGlubmVkUG9zaXRpb24sIHRpbWUsIHNpbGVudCk7XG4gIH1cbiAgcmVzZXRQb3NpdGlvblRvSW5pdGlhbCgpIHtcbiAgICB0aGlzLnBpblBvc2l0aW9uKHRoaXMuaW5pdGlhbFBvc2l0aW9uKTtcbiAgfVxuICByZWZyZXNoUG9zaXRpb24oKSB7XG4gICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLmdldFBvc2l0aW9uKCkpO1xuICB9XG4gIHNldFBvc2l0aW9uKHBvaW50KSB7XG4gICAgcG9pbnQgPSBwb2ludC5jbG9uZSgpO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb2ludDtcbiAgICB0aGlzLl9zZXRUcmFuc2l0aW9uKDApO1xuICAgIHRoaXMuX3NldFRyYW5zbGF0ZShwb2ludC5zdWIodGhpcy5vZmZzZXQpKTtcbiAgfVxuICBkZXRlcm1pbmVEaXJlY3Rpb24ocG9pbnQpIHtcbiAgICB0aGlzLl9wcmV2aW91c0RpcmVjdGlvblBvc2l0aW9uIHx8PSB0aGlzLl9zdGFydFBvc2l0aW9uO1xuICAgIHRoaXMubGVmdERpcmVjdGlvbiA9IHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24ueCA8IHBvaW50Lng7XG4gICAgdGhpcy5yaWdodERpcmVjdGlvbiA9IHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24ueCA+IHBvaW50Lng7XG4gICAgdGhpcy51cERpcmVjdGlvbiA9IHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24ueSA+IHBvaW50Lnk7XG4gICAgdGhpcy5kb3duRGlyZWN0aW9uID0gdGhpcy5fcHJldmlvdXNEaXJlY3Rpb25Qb3NpdGlvbi55IDwgcG9pbnQueTtcbiAgICB0aGlzLl9wcmV2aW91c0RpcmVjdGlvblBvc2l0aW9uID0gcG9pbnQ7XG4gIH1cbiAgc2VlbXNTY3JvbGxpbmcoKSB7XG4gICAgcmV0dXJuICtuZXcgRGF0ZSgpIC0gdGhpcy5fc3RhcnRUb3VjaFRpbWVzdGFtcCA8IHRoaXMudG91Y2hEcmFnZ2luZ1RocmVzaG9sZDtcbiAgfVxuICBzaG91bGRVc2VOYXRpdmVEcmFnQW5kRHJvcCgpIHtcbiAgICBpZiAodGhpcy5pc1RvdWNoRXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hdGl2ZURyYWdBbmREcm9wICYmIHRoaXMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wT25Ub3VjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubmF0aXZlRHJhZ0FuZERyb3A7XG4gICAgfVxuICB9XG4gIGRyYWdTdGFydChldmVudCkge1xuICAgIGlmICghdGhpcy5fZW5hYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnN0b3BQcm9wYWdhdGlvbk9uRHJhZ1N0YXJ0KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgdGhpcy5pc1RvdWNoRXZlbnQgPSBpc1RvdWNoICYmIGV2ZW50IGluc3RhbmNlb2Ygd2luZG93LlRvdWNoRXZlbnQ7XG4gICAgdGhpcy50b3VjaFBvaW50ID0gdGhpcy5fc3RhcnRUb3VjaFBvaW50ID0gbmV3IFBvaW50KHRoaXMuaXNUb3VjaEV2ZW50ID8gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggOiBldmVudC5jbGllbnRYLCB0aGlzLmlzVG91Y2hFdmVudCA/IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIDogZXZlbnQuY2xpZW50WSk7XG4gICAgdGhpcy5fc3RhcnRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICBpZiAodGhpcy5pc1RvdWNoRXZlbnQpIHtcbiAgICAgIHRoaXMuX3RvdWNoSWQgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5pZGVudGlmaWVyO1xuICAgICAgdGhpcy5fc3RhcnRUb3VjaFRpbWVzdGFtcCA9ICtuZXcgRGF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLl9zdGFydFdpbmRvd1Njcm9sbFBvaW50ID0gdGhpcy53aW5kb3dTY3JvbGxQb2ludDtcbiAgICB0aGlzLl9zdGFydFNjcm9sbEVsZW1lbnRzT2Zmc2V0ID0gdGhpcy5zY3JvbGxFbGVtZW50c09mZnNldDtcbiAgICBpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJbnB1dEVsZW1lbnQgfHwgZXZlbnQudGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgIGV2ZW50LnRhcmdldC5mb2N1cygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG91bGRVc2VOYXRpdmVEcmFnQW5kRHJvcCgpKSB7XG4gICAgICBpZiAodGhpcy5pc1RvdWNoRXZlbnQgJiYgdGhpcy5lbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3BPblRvdWNoKSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0UGFyZW50c1Njcm9sbE9mZnNldCA9IHRoaXMucGFyZW50c1Njcm9sbE9mZnNldDtcbiAgICAgICAgY29uc3QgZW11bGF0ZU9uRmlyc3RNb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnNlZW1zU2Nyb2xsaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsRHJhZ2dpbmcoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3AoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYW5jZWxFbXVsYXRpb24oKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2FuY2VsRW11bGF0aW9uID0gKCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMubW92ZSwgZW11bGF0ZU9uRmlyc3RNb3ZlKTtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgY2FuY2VsRW11bGF0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBlbXVsYXRlT25GaXJzdE1vdmUsIHBhc3NpdmVGYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCBjYW5jZWxFbXVsYXRpb24sIHBhc3NpdmVGYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5fbmF0aXZlRHJhZ1N0YXJ0KTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9uYXRpdmVEcmFnRW5kLCBwYXNzaXZlRmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlLCBwYXNzaXZlRmFsc2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5tb3ZlLCB0aGlzLl9kcmFnTW92ZSwgcGFzc2l2ZUZhbHNlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCB0aGlzLl9kcmFnRW5kLCBwYXNzaXZlRmFsc2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQsIHBhc3NpdmVGYWxzZSk7XG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGwpO1xuICAgIHRoaXMuc2Nyb2xsRWxlbWVudHMuZm9yRWFjaChwID0+IHAuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsKSk7XG4gICAgdGhpcy5lbWl0KCdkcmFnOnN0YXJ0Jyk7XG4gIH1cbiAgZHJhZ01vdmUoZXZlbnQpIHtcbiAgICBsZXQgdG91Y2g7XG4gICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzVG91Y2hFdmVudCA9IGlzVG91Y2ggJiYgZXZlbnQgaW5zdGFuY2VvZiB3aW5kb3cuVG91Y2hFdmVudDtcbiAgICBpZiAodGhpcy5pc1RvdWNoRXZlbnQpIHtcbiAgICAgIHRvdWNoID0gZ2V0VG91Y2hCeUlEKGV2ZW50LCB0aGlzLl90b3VjaElkKTtcbiAgICAgIGlmICghdG91Y2gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2VlbXNTY3JvbGxpbmcoKSkge1xuICAgICAgICB0aGlzLmNhbmNlbERyYWdnaW5nKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnRvdWNoUG9pbnQgPSBuZXcgUG9pbnQodGhpcy5pc1RvdWNoRXZlbnQgPyB0b3VjaC5wYWdlWCA6IGV2ZW50LmNsaWVudFgsIHRoaXMuaXNUb3VjaEV2ZW50ID8gdG91Y2gucGFnZVkgOiBldmVudC5jbGllbnRZKTtcbiAgICBsZXQgcG9pbnQgPSB0aGlzLl9zdGFydFBvc2l0aW9uLmFkZCh0aGlzLnRvdWNoUG9pbnQuc3ViKHRoaXMuX3N0YXJ0VG91Y2hQb2ludCkpLmFkZCh0aGlzLndpbmRvd1Njcm9sbFBvaW50LnN1Yih0aGlzLl9zdGFydFdpbmRvd1Njcm9sbFBvaW50KSkuYWRkKHRoaXMuc2Nyb2xsRWxlbWVudHNPZmZzZXQuc3ViKHRoaXMuX3N0YXJ0U2Nyb2xsRWxlbWVudHNPZmZzZXQpKTtcbiAgICBwb2ludCA9IHRoaXMuYm91bmRpbmcuYm91bmQocG9pbnQsIHRoaXMuZ2V0U2l6ZSgpKTtcbiAgICB0aGlzLmRldGVybWluZURpcmVjdGlvbihwb2ludCk7XG4gICAgdGhpcy5tb3ZlKHBvaW50KTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZ2VlLWFjdGl2ZScpO1xuICB9XG4gIGRyYWdFbmQoZXZlbnQpIHtcbiAgICB0aGlzLmlzVG91Y2hFdmVudCA9IGlzVG91Y2ggJiYgZXZlbnQgaW5zdGFuY2VvZiB3aW5kb3cuVG91Y2hFdmVudDtcbiAgICBpZiAodGhpcy5pc1RvdWNoRXZlbnQgJiYgIWdldFRvdWNoQnlJRChldmVudCwgdGhpcy5fdG91Y2hJZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICB0aGlzLmRyYWdFbmRBY3Rpb24oKTtcbiAgICB0aGlzLmVtaXQoJ2RyYWc6ZW5kJyk7XG4gICAgdGhpcy5jYW5jZWxEcmFnZ2luZygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdlZS1hY3RpdmUnKSk7XG4gIH1cbiAgb25TY3JvbGwoX2V2ZW50KSB7XG4gICAgbGV0IHBvaW50ID0gdGhpcy5fc3RhcnRQb3NpdGlvbi5hZGQodGhpcy50b3VjaFBvaW50LnN1Yih0aGlzLl9zdGFydFRvdWNoUG9pbnQpKS5hZGQodGhpcy53aW5kb3dTY3JvbGxQb2ludC5zdWIodGhpcy5fc3RhcnRXaW5kb3dTY3JvbGxQb2ludCkpLmFkZCh0aGlzLnNjcm9sbEVsZW1lbnRzT2Zmc2V0LnN1Yih0aGlzLl9zdGFydFNjcm9sbEVsZW1lbnRzT2Zmc2V0KSk7XG4gICAgcG9pbnQgPSB0aGlzLmJvdW5kaW5nLmJvdW5kKHBvaW50LCB0aGlzLmdldFNpemUoKSk7XG4gICAgaWYgKCF0aGlzLm5hdGl2ZURyYWdBbmREcm9wKSB7XG4gICAgICB0aGlzLmRldGVybWluZURpcmVjdGlvbihwb2ludCk7XG4gICAgICB0aGlzLm1vdmUocG9pbnQpO1xuICAgIH1cbiAgfVxuICBuYXRpdmVEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICdGaXJlRm94IGZpeCcpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5fbmF0aXZlRHJhZ092ZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLl9uYXRpdmVEcmFnRW5kKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5fbmF0aXZlRHJvcCk7XG4gIH1cbiAgbmF0aXZlRHJhZ092ZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnZWUtcGxhY2Vob2xkZXInKTtcbiAgICBpZiAoZXZlbnQuY2xpZW50WCA9PT0gMCAmJiBldmVudC5jbGllbnRZID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudG91Y2hQb2ludCA9IG5ldyBQb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICBsZXQgcG9pbnQgPSB0aGlzLl9zdGFydFBvc2l0aW9uLmFkZCh0aGlzLnRvdWNoUG9pbnQuc3ViKHRoaXMuX3N0YXJ0VG91Y2hQb2ludCkpLmFkZCh0aGlzLndpbmRvd1Njcm9sbFBvaW50LnN1Yih0aGlzLl9zdGFydFdpbmRvd1Njcm9sbFBvaW50KSkuYWRkKHRoaXMuc2Nyb2xsRWxlbWVudHNPZmZzZXQuc3ViKHRoaXMuX3N0YXJ0U2Nyb2xsRWxlbWVudHNPZmZzZXQpKTtcbiAgICBwb2ludCA9IHRoaXMuYm91bmRpbmcuYm91bmQocG9pbnQsIHRoaXMuZ2V0U2l6ZSgpKTtcbiAgICB0aGlzLmRldGVybWluZURpcmVjdGlvbihwb2ludCk7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvaW50O1xuICAgIHRoaXMuZW1pdCgnZHJhZzptb3ZlJyk7XG4gIH1cbiAgbmF0aXZlRHJhZ0VuZChfZXZlbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2VlLXBsYWNlaG9sZGVyJyk7XG4gICAgdGhpcy5kcmFnRW5kQWN0aW9uKCk7XG4gICAgdGhpcy5lbWl0KCdkcmFnOmVuZCcpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5fbmF0aXZlRHJhZ092ZXIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLl9uYXRpdmVEcmFnRW5kKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuX25hdGl2ZURyb3ApO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGwpO1xuICAgIHRoaXMuc2Nyb2xsRWxlbWVudHMuZm9yRWFjaChwID0+IHAucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsKSk7XG4gICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJyk7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuX25hdGl2ZURyYWdTdGFydCk7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdlZS1hY3RpdmUnKTtcbiAgfVxuICBuYXRpdmVEcm9wKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBjYW5jZWxEcmFnZ2luZygpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgdGhpcy5fZHJhZ0VuZCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobW91c2VFdmVudHMuZW5kLCB0aGlzLl9uYXRpdmVEcmFnRW5kKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsKTtcbiAgICB0aGlzLnNjcm9sbEVsZW1lbnRzLmZvckVhY2gocCA9PiBwLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbCkpO1xuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24gPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpO1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLl9uYXRpdmVEcmFnU3RhcnQpO1xuICB9XG4gIGNvcHlTdHlsZXMoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY29weVN0eWxlcykge1xuICAgICAgdGhpcy5vcHRpb25zLmNvcHlTdHlsZXMoc291cmNlLCBkZXN0aW5hdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvcHlTdHlsZXMoc291cmNlLCBkZXN0aW5hdGlvbik7XG4gICAgfVxuICB9XG4gIGVtdWxhdGVOYXRpdmVEcmFnQW5kRHJvcChldmVudCkge1xuICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBjbG9uZWRFbGVtZW50ID0gdGhpcy5lbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICBjbG9uZWRFbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XSA9ICcnO1xuICAgIHRoaXMuY29weVN0eWxlcyh0aGlzLmVsZW1lbnQsIGNsb25lZEVsZW1lbnQpO1xuICAgIGNsb25lZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZ2VlLW5hdGl2ZS1lbXVsYXRpb24nKTtcbiAgICBjbG9uZWRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb25lZEVsZW1lbnQpO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnZWUtcGxhY2Vob2xkZXInKTtcbiAgICBjb25zdCBlbXVsYXRpb25EcmFnZ2FibGUgPSBuZXcgRHJhZ2dhYmxlKGNsb25lZEVsZW1lbnQsIHtcbiAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuYm9keSxcbiAgICAgIHRvdWNoRHJhZ2dpbmdUaHJlc2hvbGQ6IDAsXG4gICAgICBib3VuZChwb2ludCkge1xuICAgICAgICByZXR1cm4gcG9pbnQ7XG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgJ2RyYWc6bW92ZSc6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250YWluZXJSZWN0UG9pbnQgPSBuZXcgUG9pbnQoY29udGFpbmVyUmVjdC5sZWZ0LCBjb250YWluZXJSZWN0LnRvcCk7XG4gICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGVtdWxhdGlvbkRyYWdnYWJsZS5wb3NpdGlvbi5zdWIoY29udGFpbmVyUmVjdFBvaW50KS5zdWIodGhpcy5fc3RhcnRXaW5kb3dTY3JvbGxQb2ludCkuYWRkKHRoaXMuX3N0YXJ0UGFyZW50c1Njcm9sbE9mZnNldCk7XG4gICAgICAgICAgdGhpcy5kZXRlcm1pbmVEaXJlY3Rpb24odGhpcy5wb3NpdGlvbik7XG4gICAgICAgICAgdGhpcy5lbWl0KCdkcmFnOm1vdmUnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2RyYWc6ZW5kJzogKCkgPT4ge1xuICAgICAgICAgIGVtdWxhdGlvbkRyYWdnYWJsZS5kZXN0cm95KCk7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjbG9uZWRFbGVtZW50KTtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2VlLXBsYWNlaG9sZGVyJyk7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdlZS1hY3RpdmUnKTtcbiAgICAgICAgICB0aGlzLmVtaXQoJ2RyYWc6ZW5kJyk7XG4gICAgICAgICAgdGhpcy5kcmFnRW5kQWN0aW9uKCk7XG4gICAgICAgICAgdGhpcy5jYW5jZWxEcmFnZ2luZygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgY29udGFpbmVyUmVjdFBvaW50ID0gbmV3IFBvaW50KGNvbnRhaW5lclJlY3QubGVmdCwgY29udGFpbmVyUmVjdC50b3ApO1xuICAgIGVtdWxhdGlvbkRyYWdnYWJsZS5fc3RhcnRXaW5kb3dTY3JvbGxQb2ludCA9IHRoaXMuX3N0YXJ0V2luZG93U2Nyb2xsUG9pbnQ7XG4gICAgZW11bGF0aW9uRHJhZ2dhYmxlLm1vdmUodGhpcy5waW5uZWRQb3NpdGlvbi5hZGQoY29udGFpbmVyUmVjdFBvaW50KS5hZGQodGhpcy53aW5kb3dTY3JvbGxQb2ludCkuc3ViKHRoaXMucGFyZW50c1Njcm9sbE9mZnNldCkpO1xuICAgIGVtdWxhdGlvbkRyYWdnYWJsZS5kcmFnU3RhcnQoZXZlbnQpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgZHJhZ0VuZEFjdGlvbigpIHtcbiAgICB0aGlzLnBpblBvc2l0aW9uKHRoaXMucG9zaXRpb24pO1xuICB9XG4gIGdldFJlY3RhbmdsZSgpIHtcbiAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSh0aGlzLnBvc2l0aW9uLCB0aGlzLmdldFNpemUoKSk7XG4gIH1cbiAgcmVmcmVzaCgpIHtcbiAgICBpZiAodGhpcy5ib3VuZGluZy5yZWZyZXNoKSB7XG4gICAgICB0aGlzLmJvdW5kaW5nLnJlZnJlc2goKTtcbiAgICB9XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmhhbmRsZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgdGhpcy5fZHJhZ1N0YXJ0KTtcbiAgICB0aGlzLmhhbmRsZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5zdGFydCwgdGhpcy5fZHJhZ1N0YXJ0KTtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5fbmF0aXZlRHJhZ1N0YXJ0KTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLm1vdmUsIHRoaXMuX2RyYWdNb3ZlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgdGhpcy5fZHJhZ0VuZCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5lbmQsIHRoaXMuX2RyYWdFbmQpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5fbmF0aXZlRHJhZ092ZXIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLl9uYXRpdmVEcmFnRW5kKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgdGhpcy5fbmF0aXZlRHJhZ0VuZCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuX25hdGl2ZURyb3ApO1xuICAgIHRoaXMucmVzZXRFbWl0dGVyKCk7XG4gICAgY29uc3QgaW5kZXggPSBkcmFnZ2FibGVzLmluZGV4T2YodGhpcyk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGRyYWdnYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGNvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyIHx8IHRoaXMub3B0aW9ucy5jb250YWluZXIgfHwgdGhpcy5vcHRpb25zLnBhcmVudCB8fCBnZXREZWZhdWx0Q29udGFpbmVyKHRoaXMuZWxlbWVudCk7XG4gIH1cbiAgZ2V0IGhhbmRsZXIoKSB7XG4gICAgaWYgKCF0aGlzLl9oYW5kbGVyKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5oYW5kbGVyID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9oYW5kbGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmhhbmRsZXIpIHx8IHRoaXMuZWxlbWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZXIgPSB0aGlzLm9wdGlvbnMuaGFuZGxlciB8fCB0aGlzLmVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9oYW5kbGVyO1xuICB9XG4gIGdldCBzdG9wUHJvcGFnYXRpb25PbkRyYWdTdGFydCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN0b3BQcm9wYWdhdGlvbk9uRHJhZ1N0YXJ0IHx8IGZhbHNlO1xuICB9XG4gIGdldCBuYXRpdmVEcmFnQW5kRHJvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5hdGl2ZURyYWdBbmREcm9wIHx8IGZhbHNlO1xuICB9XG4gIGdldCBlbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3BPblRvdWNoKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wT25Ub3VjaCB8fCBmYWxzZTtcbiAgfVxuICBnZXQgc2hvdWxkUmVtb3ZlWmVyb1RyYW5zbGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNob3VsZFJlbW92ZVplcm9UcmFuc2xhdGUgfHwgZmFsc2U7XG4gIH1cbiAgZ2V0IHRvdWNoRHJhZ2dpbmdUaHJlc2hvbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50b3VjaERyYWdnaW5nVGhyZXNob2xkIHx8IDA7XG4gIH1cbiAgZ2V0IGRyYWdPdmVyVGhyb3R0bGVEdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRyYWdPdmVyVGhyb3R0bGVEdXJhdGlvbiB8fCAxNjtcbiAgfVxuICBnZXQgd2luZG93U2Nyb2xsUG9pbnQoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkpO1xuICB9XG4gIGdldCBzY3JvbGxSb290Q29udGFpbmVyKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2Nyb2xsUm9vdENvbnRhaW5lciB8fCB0aGlzLmNvbnRhaW5lcjtcbiAgfVxuICBnZXQgc2Nyb2xsRWxlbWVudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlZFNjcm9sbEVsZW1lbnRzID8gdGhpcy5fY2FjaGVkU2Nyb2xsRWxlbWVudHMgOiB0aGlzLl9jYWNoZWRTY3JvbGxFbGVtZW50cyA9IGdldFBhcmVudHNDaGFpbih0aGlzLmVsZW1lbnQsIHRoaXMuc2Nyb2xsUm9vdENvbnRhaW5lcik7XG4gIH1cbiAgZ2V0IHNjcm9sbEVsZW1lbnRzT2Zmc2V0KCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5zY3JvbGxFbGVtZW50cy5yZWR1Y2UoKHN1bSwgcCkgPT4gc3VtICsgcC5zY3JvbGxMZWZ0LCAwKSwgdGhpcy5zY3JvbGxFbGVtZW50cy5yZWR1Y2UoKHN1bSwgcCkgPT4gc3VtICsgcC5zY3JvbGxUb3AsIDApKTtcbiAgfVxuICBnZXQgcGFyZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVkUGFyZW50cyA/IHRoaXMuX2NhY2hlZFBhcmVudHMgOiB0aGlzLl9jYWNoZWRQYXJlbnRzID0gZ2V0UGFyZW50c0NoYWluKHRoaXMuZWxlbWVudCwgdGhpcy5jb250YWluZXIpO1xuICB9XG4gIGdldCBwYXJlbnRzU2Nyb2xsT2Zmc2V0KCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5wYXJlbnRzLnJlZHVjZSgoc3VtLCBwKSA9PiBzdW0gKyBwLnNjcm9sbExlZnQsIDApLCB0aGlzLnBhcmVudHMucmVkdWNlKChzdW0sIHApID0+IHN1bSArIHAuc2Nyb2xsVG9wLCAwKSk7XG4gIH1cbiAgZ2V0IGVuYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZW5hYmxlO1xuICB9XG4gIHNldCBlbmFibGUoZW5hYmxlKSB7XG4gICAgaWYgKGVuYWJsZSkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdlZS1kaXNhYmxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnZWUtZGlzYWJsZScpO1xuICAgIH1cbiAgICB0aGlzLl9lbmFibGUgPSBlbmFibGU7XG4gIH1cbn1cbkRyYWdnYWJsZS5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuRHJhZ2dhYmxlLmVtaXR0ZXIub24oJ2RyYWdnYWJsZTpjcmVhdGUnLCBhZGRUb0RlZmF1bHRTY29wZSk7XG5cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICBsZXQgdGltZW91dDtcbiAgcmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGVkRnVuY3Rpb24oKSB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXM7XG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcbiAgICBjb25zdCBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gIH07XG59XG5cbmNsYXNzIExpc3QgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihkcmFnZ2FibGVzKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgdGltZUVuZDogMjAwLFxuICAgICAgdGltZUV4Y2FuZ2U6IDQwMCxcbiAgICAgIHJhZGl1czogMzBcbiAgICB9LCBvcHRpb25zKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyO1xuICAgIHRoaXMuZHJhZ2dhYmxlcyA9IGRyYWdnYWJsZXM7XG4gICAgdGhpcy5jaGFuZ2VkRHVyaW5nSXRlcmF0aW9uID0gZmFsc2U7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihkZWJvdW5jZSh0aGlzLm9uUmVzaXplLmJpbmQodGhpcyksIDEwMCkpO1xuICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cbiAgb25SZXNpemUoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW9yZGVyT25DaGFuZ2UpIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4ge1xuICAgICAgaWYgKCFkcmFnZ2FibGUuaXNEcmFnZ2luZykge1xuICAgICAgICBkcmFnZ2FibGUuc3RhcnRQb3NpdGlvbmluZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGluaXQoKSB7XG4gICAgdGhpcy5fZW5hYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4gdGhpcy5pbml0RHJhZ2dhYmxlKGRyYWdnYWJsZSkpO1xuICB9XG4gIGluaXREcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgZHJhZ2dhYmxlLmVuYWJsZSA9IHRoaXMuX2VuYWJsZTtcbiAgICBkcmFnZ2FibGUub24oJ2RyYWc6bW92ZScsICgpID0+IHRoaXMub25Nb3ZlKGRyYWdnYWJsZSkpO1xuICAgIGRyYWdnYWJsZS5kcmFnRW5kQWN0aW9uID0gKCkgPT4ge1xuICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiwgdGhpcy5vcHRpb25zLnRpbWVFbmQpO1xuICAgICAgdGhpcy5vbkVuZChkcmFnZ2FibGUpO1xuICAgIH07XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKGRyYWdnYWJsZS5lbGVtZW50KTtcbiAgfVxuICByZWxlYXNlRHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKGRyYWdnYWJsZS5lbGVtZW50KTtcbiAgICBkcmFnZ2FibGUucmVzZXRPbignZHJhZzplbmQnKTtcbiAgICBkcmFnZ2FibGUucmVzZXRPbignZHJhZzptb3ZlJyk7XG4gICAgcmVtb3ZlSXRlbSh0aGlzLmRyYWdnYWJsZXMsIGRyYWdnYWJsZSk7XG4gIH1cbiAgb25Nb3ZlKGRyYWdnYWJsZSkge1xuICAgIGlmICh0aGlzLnN3YXBwaW5nRGlzYWJsZWQpIHJldHVybjtcbiAgICBjb25zdCBzb3J0ZWREcmFnZ2FibGVzID0gdGhpcy5nZXRTb3J0ZWREcmFnZ2FibGVzKCk7XG4gICAgY29uc3QgcGlubmVkUG9zaXRpb25zID0gc29ydGVkRHJhZ2dhYmxlcy5tYXAoZHJhZ2dhYmxlID0+IGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbik7XG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gc29ydGVkRHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSk7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBpbmRleE9mTmVhcmVzdFBvaW50KHBpbm5lZFBvc2l0aW9ucywgZHJhZ2dhYmxlLnBvc2l0aW9uLCB0aGlzLm9wdGlvbnMucmFkaXVzLCB0aGlzLmRpc3RhbmNlRnVuYyk7XG4gICAgaWYgKHRhcmdldEluZGV4ICE9PSAtMSAmJiBjdXJyZW50SW5kZXggIT09IHRhcmdldEluZGV4KSB7XG4gICAgICBpZiAodGFyZ2V0SW5kZXggPCBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRhcmdldEluZGV4OyBpIDwgY3VycmVudEluZGV4OyBpKyspIHtcbiAgICAgICAgICBzb3J0ZWREcmFnZ2FibGVzW2ldLnBpblBvc2l0aW9uKHBpbm5lZFBvc2l0aW9uc1tpICsgMV0sIHRoaXMub3B0aW9ucy50aW1lRXhjYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjdXJyZW50SW5kZXg7IGkgPCB0YXJnZXRJbmRleDsgaSsrKSB7XG4gICAgICAgICAgc29ydGVkRHJhZ2dhYmxlc1tpICsgMV0ucGluUG9zaXRpb24ocGlubmVkUG9zaXRpb25zW2ldLCB0aGlzLm9wdGlvbnMudGltZUV4Y2FuZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZHJhZ2dhYmxlLm5hdGl2ZURyYWdBbmREcm9wKSB7XG4gICAgICAgIGRyYWdnYWJsZS5waW5Qb3NpdGlvbihwaW5uZWRQb3NpdGlvbnNbdGFyZ2V0SW5kZXhdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiA9IHBpbm5lZFBvc2l0aW9uc1t0YXJnZXRJbmRleF07XG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZWREdXJpbmdJdGVyYXRpb24gPSB0cnVlO1xuICAgIH1cbiAgfVxuICBvbkVuZChkcmFnZ2FibGUpIHtcbiAgICBpZiAodGhpcy5jaGFuZ2VkRHVyaW5nSXRlcmF0aW9uKSB7XG4gICAgICB0aGlzLmVtaXQoJ2xpc3Q6Y2hhbmdlJyk7XG4gICAgICB0aGlzLmNoYW5nZWREdXJpbmdJdGVyYXRpb24gPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVvcmRlck9uQ2hhbmdlICYmIHRoaXMub3B0aW9ucy5jb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5yZW9yZGVyRWxlbWVudHMoZHJhZ2dhYmxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVvcmRlckVsZW1lbnRzKG1vdmVkRHJhZ2dhYmxlKSB7XG4gICAgY29uc3Qgc29ydGVkRHJhZ2dhYmxlcyA9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuICAgIGNvbnN0IGluZGV4ID0gc29ydGVkRHJhZ2dhYmxlcy5pbmRleE9mKG1vdmVkRHJhZ2dhYmxlKTtcbiAgICBjb25zdCBuZXh0ID0gc29ydGVkRHJhZ2dhYmxlc1tpbmRleCArIDFdO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICBpZiAobmV4dCkge1xuICAgICAgdGhpcy5jb250YWluZXIuaW5zZXJ0QmVmb3JlKG1vdmVkRHJhZ2dhYmxlLmVsZW1lbnQsIG5leHQuZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVkRHJhZ2dhYmxlLmVsZW1lbnQpO1xuICAgIH1cbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChkID0+IGQuc3RhcnRQb3NpdGlvbmluZygpKTtcbiAgICB0aGlzLmVtaXQoJ2xpc3Q6cmVvcmRlcmVkJyk7XG4gIH1cbiAgZ2V0Q3VycmVudFBpbm5lZFBvc2l0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGVzLm1hcChkcmFnZ2FibGUgPT4gZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uLmNsb25lKCkpO1xuICB9XG4gIGdldFNvcnRlZERyYWdnYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlcy5zb3J0KHRoaXMuc29ydGluZy5iaW5kKHRoaXMpKTtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4gZHJhZ2dhYmxlLnJlc2V0UG9zaXRpb25Ub0luaXRpYWwoKSk7XG4gIH1cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4gZHJhZ2dhYmxlLnJlZnJlc2goKSk7XG4gIH1cbiAgYWRkKGRyYWdnYWJsZXMpIHtcbiAgICBpZiAoIShkcmFnZ2FibGVzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICBkcmFnZ2FibGVzID0gW2RyYWdnYWJsZXNdO1xuICAgIH1cbiAgICBkcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IHRoaXMuaW5pdERyYWdnYWJsZShkcmFnZ2FibGUpKTtcbiAgICB0aGlzLmRyYWdnYWJsZXMgPSB0aGlzLmRyYWdnYWJsZXMuY29uY2F0KGRyYWdnYWJsZXMpO1xuICB9XG4gIHJlbW92ZShkcmFnZ2FibGVzKSB7XG4gICAgY29uc3QgaW5pdGlhbFBvc2l0aW9ucyA9IHRoaXMuZHJhZ2dhYmxlcy5tYXAoZHJhZ2dhYmxlID0+IGRyYWdnYWJsZS5pbml0aWFsUG9zaXRpb24pO1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBjb25zdCBzb3J0ZWREcmFnZ2FibGVzID0gdGhpcy5nZXRTb3J0ZWREcmFnZ2FibGVzKCk7XG4gICAgaWYgKCEoZHJhZ2dhYmxlcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgZHJhZ2dhYmxlcyA9IFtkcmFnZ2FibGVzXTtcbiAgICB9XG4gICAgZHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiB0aGlzLnJlbGVhc2VEcmFnZ2FibGUoZHJhZ2dhYmxlKSk7XG4gICAgbGV0IGogPSAwO1xuICAgIHNvcnRlZERyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSkgIT09IC0xKSB7XG4gICAgICAgIGlmIChkcmFnZ2FibGUucGlubmVkUG9zaXRpb24gIT09IGluaXRpYWxQb3NpdGlvbnNbal0pIHtcbiAgICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24oaW5pdGlhbFBvc2l0aW9uc1tqXSwgdGhpcy5vcHRpb25zLnRpbWVFeGNhbmdlKTtcbiAgICAgICAgfVxuICAgICAgICBkcmFnZ2FibGUuaW5pdGlhbFBvc2l0aW9uID0gaW5pdGlhbFBvc2l0aW9uc1tqXTtcbiAgICAgICAgaisrO1xuICAgICAgICBsaXN0LnB1c2goZHJhZ2dhYmxlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmRyYWdnYWJsZXMgPSBsaXN0O1xuICB9XG4gIGNsZWFyKCkge1xuICAgIHRoaXMucmVtb3ZlKHRoaXMuZHJhZ2dhYmxlcy5zbGljZSgpKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiBkcmFnZ2FibGUuZGVzdHJveSgpKTtcbiAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gIH1cbiAgc29ydGluZyhkcmFnZ2FibGVBLCBkcmFnZ2FibGVCKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zb3J0aW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvcnRpbmcoZHJhZ2dhYmxlQSwgZHJhZ2dhYmxlQik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkcmFnZ2FibGVBLnBpbm5lZFBvc2l0aW9uLnkgPCBkcmFnZ2FibGVCLnBpbm5lZFBvc2l0aW9uLnkpIHJldHVybiAtMTtcbiAgICAgIGlmIChkcmFnZ2FibGVBLnBpbm5lZFBvc2l0aW9uLnkgPiBkcmFnZ2FibGVCLnBpbm5lZFBvc2l0aW9uLnkpIHJldHVybiAxO1xuICAgICAgaWYgKGRyYWdnYWJsZUEucGlubmVkUG9zaXRpb24ueCA8IGRyYWdnYWJsZUIucGlubmVkUG9zaXRpb24ueCkgcmV0dXJuIC0xO1xuICAgICAgaWYgKGRyYWdnYWJsZUEucGlubmVkUG9zaXRpb24ueCA+IGRyYWdnYWJsZUIucGlubmVkUG9zaXRpb24ueCkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbiAgZ2V0IGRpc3RhbmNlRnVuYygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdldERpc3RhbmNlIHx8IGdldERpc3RhbmNlO1xuICB9XG4gIGdldCBwb3NpdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q3VycmVudFBpbm5lZFBvc2l0aW9ucygpO1xuICB9XG4gIHNldCBwb3NpdGlvbnMocG9zaXRpb25zKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9ICd3cm9uZyBhcnJheSBsZW5ndGgnO1xuICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoKSB7XG4gICAgICBwb3NpdGlvbnMuZm9yRWFjaCgocG9pbnQsIGkpID0+IHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVzW2ldLnBpblBvc2l0aW9uKHBvaW50KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBtZXNzYWdlO1xuICAgIH1cbiAgfVxuICBnZXQgZW5hYmxlKCkge1xuICAgIHJldHVybiB0aGlzLl9lbmFibGU7XG4gIH1cbiAgc2V0IGVuYWJsZShlbmFibGUpIHtcbiAgICB0aGlzLl9lbmFibGUgPSBlbmFibGU7XG4gICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IHtcbiAgICAgIGRyYWdnYWJsZS5lbmFibGUgPSBlbmFibGU7XG4gICAgfSk7XG4gIH1cbiAgZ2V0IHN3YXBwaW5nRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N3YXBwaW5nRGlzYWJsZWQ7XG4gIH1cbiAgc2V0IHN3YXBwaW5nRGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLl9zd2FwcGluZ0Rpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cbiAgc3RhdGljIGZhY3RvcnkoY29udGFpbmVyRWxlbWVudCwgZWxlbWVudHMpIHtcbiAgICBsZXQgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgY29uc3QgZHJhZ2dhYmxlcyA9IEFycmF5LmZyb20oZWxlbWVudHMpLm1hcChlbGVtZW50ID0+IHtcbiAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lckVsZW1lbnRcbiAgICAgIH0sIG9wdGlvbnMuZHJhZ2dhYmxlIHx8IHt9KSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBMaXN0KGRyYWdnYWJsZXMsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgY29udGFpbmVyOiBjb250YWluZXJFbGVtZW50XG4gICAgfSwgb3B0aW9ucy5saXN0IHx8IHt9KSk7XG4gIH1cbn1cblxuY29uc3QgYXJyYXlNb3ZlID0gKGFycmF5LCBmcm9tLCB0bykgPT4ge1xuICBhcnJheS5zcGxpY2UodG8gPCAwID8gYXJyYXkubGVuZ3RoICsgdG8gOiB0bywgMCwgYXJyYXkuc3BsaWNlKGZyb20sIDEpWzBdKTtcbn07XG5jbGFzcyBCdWJibGluZ0xpc3QgZXh0ZW5kcyBMaXN0IHtcbiAgYXV0b0RldGVjdFZlcnRpY2FsR2FwKCkge1xuICAgIGlmICghdGhpcy5fdmVydGljYWxHYXAgJiYgIXRoaXMub3B0aW9ucy52ZXJ0aWNhbEdhcCAmJiB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoID49IDIpIHtcbiAgICAgIGNvbnN0IHNvcnRlZCA9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuICAgICAgdGhpcy5fdmVydGljYWxHYXAgPSBzb3J0ZWRbMV0ucGlubmVkUG9zaXRpb24ueSAtIHNvcnRlZFswXS5waW5uZWRQb3NpdGlvbi55IC0gc29ydGVkWzBdLmdldFNpemUoKS55O1xuICAgIH1cbiAgfVxuICBhdXRvRGV0ZWN0U3RhcnRQb3NpdGlvbigpIHtcbiAgICBpZiAodGhpcy5kcmFnZ2FibGVzLmxlbmd0aCA+PSAxICYmICF0aGlzLnN0YXJ0UG9zaXRpb24pIHtcbiAgICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHRoaXMuZHJhZ2dhYmxlc1swXS5waW5uZWRQb3NpdGlvbjtcbiAgICB9XG4gIH1cbiAgaW5pdERyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICBzdXBlci5pbml0RHJhZ2dhYmxlKGRyYWdnYWJsZSk7XG4gICAgZHJhZ2dhYmxlLm9uKCdkcmFnOnN0YXJ0JywgKCkgPT4gdGhpcy5vbkRyYWdTdGFydChkcmFnZ2FibGUpKTtcbiAgfVxuICBvbkRyYWdTdGFydChkcmFnZ2FibGUpIHtcbiAgICB0aGlzLmF1dG9EZXRlY3RWZXJ0aWNhbEdhcCgpO1xuICAgIHRoaXMuYXV0b0RldGVjdFN0YXJ0UG9zaXRpb24oKTtcbiAgICB0aGlzLmNhY2hlZFNvcnRlZERyYWdnYWJsZXMgPSB0aGlzLmdldFNvcnRlZERyYWdnYWJsZXMoKTtcbiAgICB0aGlzLmluZGV4T2ZBY3RpdmVEcmFnZ2FibGUgPSB0aGlzLmNhY2hlZFNvcnRlZERyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpO1xuICB9XG4gIG9uTW92ZShkcmFnZ2FibGUpIHtcbiAgICBpZiAodGhpcy5zd2FwcGluZ0Rpc2FibGVkKSByZXR1cm47XG4gICAgY29uc3QgcHJldkRyYWdnYWJsZSA9IHRoaXMuY2FjaGVkU29ydGVkRHJhZ2dhYmxlc1t0aGlzLmluZGV4T2ZBY3RpdmVEcmFnZ2FibGUgLSAxXTtcbiAgICBjb25zdCBuZXh0RHJhZ2dhYmxlID0gdGhpcy5jYWNoZWRTb3J0ZWREcmFnZ2FibGVzW3RoaXMuaW5kZXhPZkFjdGl2ZURyYWdnYWJsZSArIDFdO1xuICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbjtcbiAgICBsZXQgY3VycmVudE9yZGVyO1xuICAgIGxldCB0YXJnZXRJbmRleDtcbiAgICBpZiAoZHJhZ2dhYmxlLnVwRGlyZWN0aW9uICYmIHByZXZEcmFnZ2FibGUpIHtcbiAgICAgIGN1cnJlbnRPcmRlciA9IFtwcmV2RHJhZ2dhYmxlLCBkcmFnZ2FibGVdLm1hcChkID0+IGQucGlubmVkUG9zaXRpb24pO1xuICAgICAgdGFyZ2V0SW5kZXggPSBpbmRleE9mTmVhcmVzdFBvaW50KGN1cnJlbnRPcmRlciwgZHJhZ2dhYmxlLnBvc2l0aW9uLCAxMDAwMCwgdGhpcy5kaXN0YW5jZUZ1bmMpO1xuICAgICAgaWYgKHRhcmdldEluZGV4ID09PSAwKSB7XG4gICAgICAgIGlmIChkcmFnZ2FibGUuc2hvdWxkVXNlTmF0aXZlRHJhZ0FuZERyb3AoKSkge1xuICAgICAgICAgIGRyYWdnYWJsZS5waW5Qb3NpdGlvbihwcmV2RHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkcmFnZ2FibGUucGlubmVkUG9zaXRpb24gPSBwcmV2RHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uLmNsb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJldkRyYWdnYWJsZS5waW5Qb3NpdGlvbihuZXcgUG9pbnQoY3VycmVudFBvc2l0aW9uLngsIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbi55ICsgZHJhZ2dhYmxlLmdldFNpemUoKS55ICsgdGhpcy52ZXJ0aWNhbEdhcCksIHRoaXMub3B0aW9ucy50aW1lRXhjYW5nZSk7XG4gICAgICAgIGFycmF5TW92ZSh0aGlzLmNhY2hlZFNvcnRlZERyYWdnYWJsZXMsIHRoaXMuaW5kZXhPZkFjdGl2ZURyYWdnYWJsZS0tLCB0aGlzLmluZGV4T2ZBY3RpdmVEcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLm9uTW92ZShkcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLmNoYW5nZWREdXJpbmdJdGVyYXRpb24gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZHJhZ2dhYmxlLmRvd25EaXJlY3Rpb24gJiYgbmV4dERyYWdnYWJsZSkge1xuICAgICAgY3VycmVudE9yZGVyID0gW2RyYWdnYWJsZSwgbmV4dERyYWdnYWJsZV0ubWFwKGQgPT4gZC5waW5uZWRQb3NpdGlvbik7XG4gICAgICB0YXJnZXRJbmRleCA9IGluZGV4T2ZOZWFyZXN0UG9pbnQoY3VycmVudE9yZGVyLCBkcmFnZ2FibGUucG9zaXRpb24sIDEwMDAwLCB0aGlzLmRpc3RhbmNlRnVuYyk7XG4gICAgICBpZiAodGFyZ2V0SW5kZXggPT09IDEpIHtcbiAgICAgICAgbmV4dERyYWdnYWJsZS5waW5Qb3NpdGlvbihkcmFnZ2FibGUucGlubmVkUG9zaXRpb24sIHRoaXMub3B0aW9ucy50aW1lRXhjYW5nZSk7XG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZU5ld1Bvc2l0aW9uID0gbmV3IFBvaW50KG5leHREcmFnZ2FibGUucGlubmVkUG9zaXRpb24ueCwgbmV4dERyYWdnYWJsZS5waW5uZWRQb3NpdGlvbi55ICsgbmV4dERyYWdnYWJsZS5nZXRTaXplKCkueSArIHRoaXMudmVydGljYWxHYXApO1xuICAgICAgICBpZiAoZHJhZ2dhYmxlLnNob3VsZFVzZU5hdGl2ZURyYWdBbmREcm9wKCkpIHtcbiAgICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24oZHJhZ2dhYmxlTmV3UG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiA9IGRyYWdnYWJsZU5ld1Bvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5TW92ZSh0aGlzLmNhY2hlZFNvcnRlZERyYWdnYWJsZXMsIHRoaXMuaW5kZXhPZkFjdGl2ZURyYWdnYWJsZSsrLCB0aGlzLmluZGV4T2ZBY3RpdmVEcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLm9uTW92ZShkcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLmNoYW5nZWREdXJpbmdJdGVyYXRpb24gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBidWJibGluZyhzb3J0ZWREcmFnZ2FibGVzLCBjdXJyZW50RHJhZ2dhYmxlKSB7XG4gICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gdGhpcy5zdGFydFBvc2l0aW9uLmNsb25lKCk7XG4gICAgc29ydGVkRHJhZ2dhYmxlcyB8fD0gdGhpcy5nZXRTb3J0ZWREcmFnZ2FibGVzKCk7XG4gICAgc29ydGVkRHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiB7XG4gICAgICBpZiAoIWRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbi5jb21wYXJlKGN1cnJlbnRQb3NpdGlvbikpIHtcbiAgICAgICAgaWYgKGRyYWdnYWJsZSA9PT0gY3VycmVudERyYWdnYWJsZSAmJiAhY3VycmVudERyYWdnYWJsZS5zaG91bGRVc2VOYXRpdmVEcmFnQW5kRHJvcCgpKSB7XG4gICAgICAgICAgZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uLmNsb25lKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgZHJhZ2dhYmxlID09PSBjdXJyZW50RHJhZ2dhYmxlID8gMCA6IHRoaXMub3B0aW9ucy50aW1lRXhjYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGN1cnJlbnRQb3NpdGlvbi55ID0gY3VycmVudFBvc2l0aW9uLnkgKyBkcmFnZ2FibGUuZ2V0U2l6ZSgpLnkgKyB0aGlzLnZlcnRpY2FsR2FwO1xuICAgIH0pO1xuICB9XG4gIHJlbW92ZShkcmFnZ2FibGVzKSB7XG4gICAgaWYgKCEoZHJhZ2dhYmxlcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgZHJhZ2dhYmxlcyA9IFtkcmFnZ2FibGVzXTtcbiAgICB9XG4gICAgZHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiB0aGlzLnJlbGVhc2VEcmFnZ2FibGUoZHJhZ2dhYmxlKSk7XG4gICAgdGhpcy5kcmFnZ2FibGVzID0gdGhpcy5kcmFnZ2FibGVzLmZpbHRlcihkID0+ICFkcmFnZ2FibGVzLmluY2x1ZGVzKGQpKTtcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChkID0+IGQuc3RhcnRQb3NpdGlvbmluZygpKTtcbiAgICBpZiAodGhpcy5kcmFnZ2FibGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuYXV0b0RldGVjdFZlcnRpY2FsR2FwKCk7XG4gICAgICB0aGlzLmF1dG9EZXRlY3RTdGFydFBvc2l0aW9uKCk7XG4gICAgICB0aGlzLmJ1YmJsaW5nKCk7XG4gICAgfVxuICB9XG4gIGdldCBkaXN0YW5jZUZ1bmMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXREaXN0YW5jZSB8fCBnZXRZRGlmZmVyZW5jZTtcbiAgfVxuICBnZXQgdmVydGljYWxHYXAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy52ZXJ0aWNhbEdhcCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy52ZXJ0aWNhbEdhcDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdXRvRGV0ZWN0VmVydGljYWxHYXAoKTtcbiAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbEdhcCB8fCAwO1xuICAgIH1cbiAgfVxuICBzZXQgdmVydGljYWxHYXAoZ2FwVmFsdWUpIHtcbiAgICB0aGlzLm9wdGlvbnMudmVydGljYWxHYXAgPSBnYXBWYWx1ZTtcbiAgfVxuICBzdGF0aWMgZmFjdG9yeShjb250YWluZXJFbGVtZW50LCBlbGVtZW50cykge1xuICAgIGxldCBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICBjb25zdCBkcmFnZ2FibGVzID0gQXJyYXkuZnJvbShlbGVtZW50cykubWFwKGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBEcmFnZ2FibGUoZWxlbWVudCwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyRWxlbWVudFxuICAgICAgfSwgb3B0aW9ucy5kcmFnZ2FibGUgfHwge30pKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IEJ1YmJsaW5nTGlzdChkcmFnZ2FibGVzLCBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyRWxlbWVudFxuICAgIH0sIG9wdGlvbnMubGlzdCB8fCB7fSkpO1xuICB9XG59XG5cbmV4cG9ydCB7IEJvdW5kLCBCb3VuZFRvQXJjLCBCb3VuZFRvQ2lyY2xlLCBCb3VuZFRvRWxlbWVudCwgQm91bmRUb0xpbmUsIEJvdW5kVG9MaW5lWCwgQm91bmRUb0xpbmVZLCBCb3VuZFRvUmVjdGFuZ2xlLCBCdWJibGluZ0xpc3QsIERyYWdnYWJsZSwgRmxvYXRMZWZ0U3RyYXRlZ3ksIEZsb2F0UmlnaHRTdHJhdGVneSwgTGlzdCwgTm90Q3Jvc3NpbmdTdHJhdGVneSwgUG9pbnQsIFJlY3RhbmdsZSwgU2NvcGUsIFRhcmdldCwgZGVmYXVsdFNjb3BlLCBnZXREaXN0YW5jZSwgZ2V0WERpZmZlcmVuY2UsIGdldFlEaWZmZXJlbmNlLCBpbmRleE9mTmVhcmVzdFBvaW50LCBzY29wZSwgc2NvcGVzLCB0cmFuc2Zvcm1lZFNwYWNlRGlzdGFuY2VGYWN0b3J5IH07XG4iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2RyYWdlZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuZ2xlRGlmZihhbHBoYSwgYmV0YSkge1xuICBjb25zdCBtaW5BbmdsZSA9IE1hdGgubWluKGFscGhhLCBiZXRhKVxuICBjb25zdCBtYXhBbmdsZSA9ICBNYXRoLm1heChhbHBoYSwgYmV0YSlcbiAgcmV0dXJuIE1hdGgubWluKG1heEFuZ2xlIC0gbWluQW5nbGUsIG1pbkFuZ2xlICsgTWF0aC5QSSoyIC0gbWF4QW5nbGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIpIHtcbiAgY29uc3QgZGlmZiA9IHAyLnN1YihwMSlcbiAgcmV0dXJuIG5vcm1hbGl6ZUFuZ2xlKE1hdGguYXRhbjIoZGlmZi55LCBkaWZmLngpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9SYWRpYW4oYW5nbGUpIHtcbiAgcmV0dXJuICgoYW5nbGUgJSAzNjApICogTWF0aC5QSSAvIDE4MClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGVncmVlKGFuZ2xlKSB7XG4gIHJldHVybiAoYW5nbGUgKiAxODAgLyBNYXRoLlBJKSAlIDM2MFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYm91bmRBbmdsZShtaW4sIG1heCwgdmFsKSB7XG4gIGxldCBkbWluLCBkbWF4XG4gIGlmIChtaW4gPCBtYXggJiYgdmFsID4gbWluICYmIHZhbCA8IG1heCkge1xuICAgIHJldHVybiB2YWxcbiAgfSBlbHNlIGlmIChtYXggPCBtaW4gJiYgKHZhbCA8IG1heCB8fCB2YWwgPiBtaW4pKSB7XG4gICAgcmV0dXJuIHZhbFxuICB9IGVsc2Uge1xuICAgIGRtaW4gPSBnZXRBbmdsZURpZmYobWluLCB2YWwpXG4gICAgZG1heCA9IGdldEFuZ2xlRGlmZihtYXgsIHZhbClcbiAgICBpZiAoZG1pbiA8IGRtYXgpIHtcbiAgICAgIHJldHVybiBtaW5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1heFxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVhcmVzdEFuZ2xlKGFyciwgYW5nbGUpIHtcbiAgbGV0IGksIHRlbXAsIGRpZmYgPSBNYXRoLlBJICogMiwgdmFsdWVcbiAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7aSsrKSB7XG4gICAgdGVtcCA9IGdldEFuZ2xlRGlmZihhcnJbaV0sIGFuZ2xlKVxuICAgIGlmIChkaWZmIDwgdGVtcCkge1xuICAgICAgZGlmZiA9IHRlbXBcbiAgICAgIHZhbHVlID0gYXJyW2ldXG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQW5nbGUodmFsKSB7XG4gIHdoaWxlICh2YWwgPCAwKSB7XG4gICAgdmFsICs9IDIgKiBNYXRoLlBJXG4gIH1cbiAgd2hpbGUgKHZhbCA+IDIgKiBNYXRoLlBJKSB7XG4gICAgdmFsIC09IDIgKiBNYXRoLlBJXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCBsZW5ndGgsIGNlbnRlcikge1xuICBjZW50ZXIgPSBjZW50ZXIgfHwgbmV3IFBvaW50KDAsIDApXG4gIHJldHVybiBjZW50ZXIuYWRkKG5ldyBQb2ludChsZW5ndGggKiBNYXRoLmNvcyhhbmdsZSksIGxlbmd0aCAqIE1hdGguc2luKGFuZ2xlKSkpXG59XG4iLCJpbXBvcnQgY3JlYXRlQ2FudmFzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWNhbnZhcydcbmltcG9ydCB7XG4gIERyYWdnYWJsZSxcbiAgUG9pbnQsXG4gIFJlY3RhbmdsZSxcbiAgQm91bmRUb0xpbmVcbn0gZnJvbSAnZHJhZ2VlJ1xuXG5pbXBvcnQgeyBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0gfSBmcm9tICcuL2dlb21ldHJ5L2FuZ2xlcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BpZGVyIHtcbiAgY29uc3RydWN0b3IoYXJlYSwgZWxlbWVudHMsIG9wdGlvbnM9e30pIHtcbiAgICBjb25zdCBhcmVhUmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGFyZWEsIGFyZWEpXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhbmdsZTogMCxcbiAgICAgIGRBbmdsZTogMiAqIE1hdGguUEkgLyBlbGVtZW50cy5sZW5ndGgsXG4gICAgICBjZW50ZXI6IGFyZWFSZWN0YW5nbGUuZ2V0Q2VudGVyKCksXG4gICAgICBzdGFydFJhZGl1czogNTAsXG4gICAgICBlbmRSYWRpdXM6IGFyZWFSZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgIHN0cm9rZVN0eWxlOiAnI2ZmNTU3NycsXG4gICAgICBmaWxsU3R5bGU6ICdyZ2JhKDE1MCwyNTUsNTAsMC44KSdcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5hcmVhID0gYXJlYVxuICAgIHRoaXMuYXJlYVJlY3RhbmdsZSA9IGFyZWFSZWN0YW5nbGVcbiAgICB0aGlzLmluaXQoZWxlbWVudHMpXG4gIH1cblxuICBpbml0KGVsZW1lbnRzKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjcmVhdGVDYW52YXModGhpcy5hcmVhLCB0aGlzLmFyZWFSZWN0YW5nbGUpXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgdGhpcy5kcmFnZ2FibGVzID0gZWxlbWVudHMubWFwKChlbGVtZW50LCBpKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9IHRoaXMub3B0aW9ucy5hbmdsZSArIGkgKiB0aGlzLm9wdGlvbnMuZEFuZ2xlXG4gICAgICBjb25zdCBoYWxmU2l6ZSA9IFBvaW50LmVsZW1lbnRTaXplKGVsZW1lbnQpLm11bHQoMC41KVxuICAgICAgY29uc3Qgc3RhcnQgPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oYW5nbGUsIHRoaXMub3B0aW9ucy5zdGFydFJhZGl1cywgdGhpcy5vcHRpb25zLmNlbnRlcikuc3ViKGhhbGZTaXplKVxuICAgICAgY29uc3QgZW5kID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCB0aGlzLm9wdGlvbnMuZW5kUmFkaXVzLCB0aGlzLm9wdGlvbnMuY2VudGVyKS5zdWIoaGFsZlNpemUpXG5cbiAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmFyZWEsXG4gICAgICAgIGJvdW5kOiBCb3VuZFRvTGluZS5ib3VuZGluZyhzdGFydCwgZW5kKSxcbiAgICAgICAgcG9zaXRpb246IHN0YXJ0LFxuICAgICAgICBvbjoge1xuICAgICAgICAgICdkcmFnOm1vdmUnOiAoKSA9PiB0aGlzLmRyYXcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmlzSW5pdCA9IHRydWVcbiAgICB0aGlzLmRyYXcoKVxuICB9XG5cbiAgZHJhdygpIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS54LCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55KVxuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKVxuXG4gICAgbGV0IHBvaW50ID0gdGhpcy5kcmFnZ2FibGVzWzBdLmdldENlbnRlcigpXG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhwb2ludC54LCBwb2ludC55KVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBvaW50ID0gdGhpcy5kcmFnZ2FibGVzW2ldLmdldENlbnRlcigpXG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHBvaW50LngsIHBvaW50LnkpXG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKVxuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLm9wdGlvbnMubGluZVdpZHRoXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5vcHRpb25zLnN0cm9rZVN0eWxlXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5maWxsU3R5bGVcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmV2ZW50cyA9IHt9XG5cbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9uKSB7XG4gICAgICBmb3IgKGNvbnN0IFtldmVudE5hbWUsIGZuXSBvZiBPYmplY3QuZW50cmllcyhvcHRpb25zLm9uKSkge1xuICAgICAgICB0aGlzLm9uKGV2ZW50TmFtZSwgZm4pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW1pdChldmVudE5hbWUpIHtcbiAgICB0aGlzLmludGVycnVwdGVkID0gZmFsc2VcbiAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cbiAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHJldHVyblxuXG4gICAgZm9yIChjb25zdCBmdW5jIG9mIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgIGZ1bmMuYXBwbHkoLi4uYXJncylcbiAgICAgIGlmICh0aGlzLmludGVycnVwdGVkKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGludGVycnVwdCgpIHtcbiAgICB0aGlzLmludGVycnVwdGVkID0gdHJ1ZVxuICB9XG5cbiAgb24oZXZlbnROYW1lLCBmbikge1xuICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdXG4gICAgfVxuXG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKVxuICB9XG5cbiAgcHJlcGVuZE9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXVxuICAgIH1cblxuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0udW5zaGlmdChmbilcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmluZGV4T2YoZm4pXG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cblxuICByZXNldEVtaXR0ZXIgKCkge1xuICAgIHRoaXMuZXZlbnRzID0ge31cbiAgfVxuXG4gIHJlc2V0T24oZXZlbnROYW1lKSB7XG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdXG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYWdnYWJsZSxcbiAgQm91bmRUb0FyYyxcbiAgUmVjdGFuZ2xlXG59IGZyb20gJ2RyYWdlZSdcblxuaW1wb3J0IHtcbiAgZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtLFxuICBnZXRBbmdsZSxcbiAgbm9ybWFsaXplQW5nbGVcbn0gZnJvbSAnLi9nZW9tZXRyeS9hbmdsZXMnXG5cbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9FdmVudEVtaXR0ZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyY1NsaWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGFyZWEsIGVsZW1lbnQsIG9wdGlvbnM9e30pIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIGNvbnN0IGFyZWFSZWN0YW5nbGUgPSBSZWN0YW5nbGUuZnJvbUVsZW1lbnQoYXJlYSwgYXJlYSlcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNlbnRlcjogYXJlYVJlY3RhbmdsZS5nZXRDZW50ZXIoKSxcbiAgICAgIHJhZGl1czogYXJlYVJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgc3RhcnRBbmdsZTogTWF0aC5QSSxcbiAgICAgIGVuZEFuZ2xlOiAwLFxuICAgICAgYW5nbGVzOiBbTWF0aC5QSSwgLU1hdGguUEkgLyA0LCAwLCBNYXRoLlBJIC8gNCwgTWF0aC5QSSAvIDJdLFxuICAgICAgdGltZTogNTAwXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHRoaXMuc2hpZnRlZENlbnRlciA9IHRoaXMub3B0aW9ucy5jZW50ZXJcbiAgICB0aGlzLmFyZWEgPSBhcmVhXG4gICAgdGhpcy5pbml0KGVsZW1lbnQpXG4gIH1cblxuICBpbml0KGVsZW1lbnQpIHtcbiAgICBjb25zdCBhbmdsZSA9IHRoaXMub3B0aW9ucy5zdGFydEFuZ2xlXG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oXG4gICAgICBhbmdsZSxcbiAgICAgIHRoaXMub3B0aW9ucy5yYWRpdXMsXG4gICAgICB0aGlzLnNoaWZ0ZWRDZW50ZXJcbiAgICApXG5cbiAgICB0aGlzLmFuZ2xlID0gYW5nbGVcbiAgICB0aGlzLmRyYWdnYWJsZSA9IG5ldyBEcmFnZ2FibGUoZWxlbWVudCwge1xuICAgICAgY29udGFpbmVyOiB0aGlzLmFyZWEsXG4gICAgICBib3VuZDogQm91bmRUb0FyYy5ib3VuZGluZyhcbiAgICAgICAgdGhpcy5zaGlmdGVkQ2VudGVyLFxuICAgICAgICB0aGlzLm9wdGlvbnMucmFkaXVzLFxuICAgICAgICB0aGlzLm9wdGlvbnMuc3RhcnRBbmdsZSxcbiAgICAgICAgdGhpcy5vcHRpb25zLmVuZEFuZ2xlXG4gICAgICApLFxuICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgb246IHtcbiAgICAgICAgJ2RyYWc6bW92ZSc6ICgpID0+IHRoaXMuY2hhbmdlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQW5nbGUoKSB7XG4gICAgdGhpcy5hbmdsZSA9IGdldEFuZ2xlKHRoaXMuc2hpZnRlZENlbnRlciwgdGhpcy5kcmFnZ2FibGUucG9zaXRpb24pXG4gIH1cblxuICBjaGFuZ2UoKSB7XG4gICAgdGhpcy51cGRhdGVBbmdsZSgpXG4gICAgLy8gICAgICB2YXIgYW5nbGUgPSBHZW9tZXRyeS5nZXROZWFyZXN0QW5nbGUodGhpcy5vcHRpb25zLmFuZ2xlcywgdGhpcy5hbmdsZSk7XG4gICAgLy8gICAgICB0aGlzLnNldEFuZ2xlKGFuZ2xlLHRoaXMub3B0aW9ucy50aW1lKTtcbiAgICB0aGlzLmVtaXQoJ2FyY3NsaWRlcjpjaGFuZ2UnLCB7IGFuZ2xlOiB0aGlzLmFuZ2xlIH0pXG4gIH1cblxuICBzZXRBbmdsZShhbmdsZSwgdGltZSkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKFxuICAgICAgdGhpcy5hbmdsZSxcbiAgICAgIHRoaXMub3B0aW9ucy5yYWRpdXMsXG4gICAgICB0aGlzLnNoaWZ0ZWRDZW50ZXJcbiAgICApXG4gICAgdGhpcy5hbmdsZSA9IG5vcm1hbGl6ZUFuZ2xlKGFuZ2xlLCBwb3NpdGlvbilcbiAgICB0aGlzLmRyYWdnYWJsZS5waW5Qb3NpdGlvbihwb3NpdGlvbiwgdGltZXx8MClcbiAgICB0aGlzLmVtaXQoJ2FyY3NsaWRlcjpjaGFuZ2UnLCB0aGlzLmFuZ2xlKVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5nZShzdGFydCwgc3RvcCwgc3RlcCkge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBpZiAodHlwZW9mIHN0b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgc3RvcCA9IHN0YXJ0XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKHR5cGVvZiBzdGVwID09PSAndW5kZWZpbmVkJykge1xuICAgIHN0ZXAgPSAxXG4gIH1cbiAgaWYgKChzdGVwID4gMCAmJiBzdGFydCA+PSBzdG9wKSB8fCAoc3RlcCA8IDAgJiYgc3RhcnQgPD0gc3RvcCkpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBmb3IgKGxldCBpID0gc3RhcnQ7IHN0ZXAgPiAwID8gaSA8IHN0b3AgOiBpID4gc3RvcDsgaSArPSBzdGVwKSB7XG4gICAgcmVzdWx0LnB1c2goaSlcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG4iLCJpbXBvcnQgY3JlYXRlQ2FudmFzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWNhbnZhcydcbmltcG9ydCByYW5nZSBmcm9tICcuL3V0aWxzL3JhbmdlJ1xuaW1wb3J0IHtcbiAgRHJhZ2dhYmxlLFxuICBCb3VuZFRvQXJjLFxuICBQb2ludCxcbiAgUmVjdGFuZ2xlLFxuICBnZXREaXN0YW5jZVxufSBmcm9tICdkcmFnZWUnXG5cbmltcG9ydCB7XG4gIHRvUmFkaWFuLFxuICBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0sXG4gIGdldEFuZ2xlLFxuICBub3JtYWxpemVBbmdsZVxufSBmcm9tICcuL2dlb21ldHJ5L2FuZ2xlcydcblxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuL0V2ZW50RW1pdHRlcidcblxuY29uc3Qgcm5kID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMjU1KVxufVxuXG5jb25zdCB0b0hleFN0cmluZyA9IGZ1bmN0aW9uKGRpZ2l0KSB7XG4gIGxldCBzdHIgPSBkaWdpdC50b1N0cmluZygxNilcbiAgd2hpbGUgKHN0ci5sZW5ndGggPCAyKSB7XG4gICAgc3RyID0gJzAnICsgc3RyXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiByYW5kb21Db2xvcigpIHtcbiAgcmV0dXJuIGAjJHt0b0hleFN0cmluZyhybmQoKSl9JHt0b0hleFN0cmluZyhybmQoKSl9JHt0b0hleFN0cmluZyhybmQoKSl9YFxufVxuXG5mdW5jdGlvbiBnZXRBcnJheVdpdGhCb3VuZEluZGV4ZXMoaW5kZXgsIGxlbmd0aCkge1xuICBjb25zdCByZXRJbmRleGVzID0gW11cbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHJldEluZGV4ZXMucHVzaChpbmRleClcbiAgICByZXRJbmRleGVzLnB1c2goKGluZGV4ICsgMSkgJSBsZW5ndGgpXG4gIH1cblxuICByZXR1cm4gcmV0SW5kZXhlc1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFydCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yIChhcmVhLCBlbGVtZW50cywgb3B0aW9ucz17fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgY29uc3QgYXJlYVJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudChhcmVhLCBhcmVhKVxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiBhcmVhUmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgcmFkaXVzOiBhcmVhUmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICB0b3VjaFJhZGl1czogYXJlYVJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgYm91bmRBbmdsZTogTWF0aC5QSSAvIDksXG4gICAgICBmaWxsU3R5bGVzOiByYW5nZSgwLCBlbGVtZW50cy5sZW5ndGgpLm1hcCgoKSA9PiByYW5kb21Db2xvcigpKSxcbiAgICAgIGluaXRBbmdsZXM6IHJhbmdlKC05MCwgMjcwLCAzNjAgLyBlbGVtZW50cy5sZW5ndGgpLm1hcCgoYW5nbGUpID0+IHRvUmFkaWFuKGFuZ2xlKSksXG4gICAgICBsaW1pdEltZzogbnVsbCxcbiAgICAgIGxpbWl0SW1nT2Zmc2V0OiBuZXcgUG9pbnQoMCwgMClcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5hcmVhID0gYXJlYVxuICAgIHRoaXMuYXJlYVJlY3RhbmdsZSA9IGFyZWFSZWN0YW5nbGVcbiAgICB0aGlzLmluaXQoZWxlbWVudHMpXG4gIH1cblxuICBpbml0KGVsZW1lbnRzKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjcmVhdGVDYW52YXModGhpcy5hcmVhLCB0aGlzLmFyZWFSZWN0YW5nbGUpXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHRoaXMuZHJhZ2dhYmxlcyA9IGVsZW1lbnRzLm1hcCgoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLm9wdGlvbnMuaW5pdEFuZ2xlc1tpXVxuICAgICAgY29uc3QgaGFsZlNpemUgPSBQb2ludC5lbGVtZW50U2l6ZShlbGVtZW50KS5tdWx0KDAuNSlcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKFxuICAgICAgICBhbmdsZSxcbiAgICAgICAgdGhpcy5vcHRpb25zLnRvdWNoUmFkaXVzLFxuICAgICAgICB0aGlzLm9wdGlvbnMuY2VudGVyLnN1YihoYWxmU2l6ZSlcbiAgICAgIClcblxuICAgICAgcmV0dXJuIG5ldyBEcmFnZ2FibGUoZWxlbWVudCwge1xuICAgICAgICBjb250YWluZXI6IHRoaXMuYXJlYSxcbiAgICAgICAgYm91bmQ6IEJvdW5kVG9BcmMuYm91bmRpbmcoXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpLFxuICAgICAgICAgIHRoaXMub3B0aW9ucy50b3VjaFJhZGl1cyxcbiAgICAgICAgICB0aGlzLmdldEJvdW5kQW5nbGUoaSwgZmFsc2UpLFxuICAgICAgICAgIHRoaXMuZ2V0Qm91bmRBbmdsZShpLCB0cnVlKVxuICAgICAgICApLFxuICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgJ2RyYWc6bW92ZSc6ICgpID0+IHRoaXMuZHJhdygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRoaXMuaXNJbml0ID0gdHJ1ZVxuICAgIHRoaXMuZHJhdygpXG4gIH1cblxuICB1cGRhdGVBbmdsZXMoKSB7XG4gICAgdGhpcy5hbmdsZXMgPSB0aGlzLmRyYWdnYWJsZXMubWFwKChkcmFnZ2FibGUpID0+IHtcbiAgICAgIGNvbnN0IGhhbGZTaXplID0gZHJhZ2dhYmxlLmdldFNpemUoKS5tdWx0KDAuNSlcbiAgICAgIHJldHVybiBnZXRBbmdsZSh0aGlzLm9wdGlvbnMuY2VudGVyLnN1YihoYWxmU2l6ZSksIGRyYWdnYWJsZS5wb3NpdGlvbilcbiAgICB9KVxuICB9XG5cbiAgZ2V0Qm91bmRBbmdsZShpbmRleCwgaXNDbG9zc2luZykge1xuICAgIGNvbnN0IHNpZ24gPSBpc0Nsb3NzaW5nID8gMSA6IC0xXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbGV0IGkgPSAoaW5kZXggKyBzaWduKSAlIHRoaXMuYW5nbGVzLmxlbmd0aFxuICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgIGkgKz0gdGhpcy5hbmdsZXMubGVuZ3RoXG4gICAgICB9XG4gICAgICByZXR1cm4gbm9ybWFsaXplQW5nbGUodGhpcy5hbmdsZXNbaV0gLSBzaWduICogdGhpcy5vcHRpb25zLmJvdW5kQW5nbGUpXG4gICAgfVxuICB9XG5cbiAgZHJhdygpIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUFuZ2xlcygpXG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS54LCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55KVxuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChfZHJhZ2dhYmxlLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5kcmF3QXJjKHRoaXMuY29udGV4dCwgdGhpcy5vcHRpb25zLmNlbnRlciwgdGhpcy5vcHRpb25zLnJhZGl1cywgaW5kZXgpXG4gICAgfSlcblxuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChfZHJhZ2dhYmxlLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5kcmF3TGltaXRJbWcoaW5kZXgpXG4gICAgfSlcblxuICAgIHRoaXMuZW1pdCgnY2hhcnQ6ZHJhdycpXG4gIH1cblxuICBjcmVhdGVDbG9uZShlbGVtZW50LCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGVsZW1lbnQsIGVsZW1lbnQpXG4gICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiByZWN0YW5nbGUuZ2V0Q2VudGVyKCksXG4gICAgICByYWRpdXM6IHJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgZmlsbFN0eWxlczogdGhpcy5vcHRpb25zLmZpbGxTdHlsZXNcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKGVsZW1lbnQsIHJlY3RhbmdsZSlcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjb25zdCBjbG9uZU9iaiA9IHtcbiAgICAgIGRyYXc6ICgpID0+IHtcbiAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgcmVjdGFuZ2xlLnNpemUueCwgcmVjdGFuZ2xlLnNpemUueSlcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goKF9kcmFnZ2FibGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgdGhpcy5kcmF3QXJjKGNvbnRleHQsIG9wdHMuY2VudGVyLCBvcHRzLnJhZGl1cywgaW5kZXgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGNsb25lT2JqLmRyYXcoKVxuICAgIHJldHVybiBjbG9uZU9ialxuICB9XG5cbiAgZ2V0RmlsbFN0eWxlKGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5maWxsU3R5bGVzW2luZGV4XSA9IHRoaXMub3B0aW9ucy5maWxsU3R5bGVzW2luZGV4XS5jYWxsKHRoaXMpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF1cbiAgfVxuXG4gIGRyYXdBcmMoY29udGV4dCwgY2VudGVyLCByYWRpdXMsIGluZGV4KSB7XG4gICAgY29uc3Qgc3RhcnRBbmdsZSA9IHRoaXMuYW5nbGVzW2luZGV4XVxuICAgIGNvbnN0IGVuZEFuZ2xlID0gdGhpcy5hbmdsZXNbKGluZGV4KzEpICUgdGhpcy5hbmdsZXMubGVuZ3RoXVxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5nZXRGaWxsU3R5bGUoaW5kZXgpXG5cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpXG4gICAgY29udGV4dC5tb3ZlVG8oY2VudGVyLngsIGNlbnRlci55KVxuICAgIGNvbnRleHQuYXJjKGNlbnRlci54LCBjZW50ZXIueSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgZmFsc2UpXG4gICAgY29udGV4dC5saW5lVG8oY2VudGVyLngsIGNlbnRlci55KVxuICAgIGNvbnRleHQuY2xvc2VQYXRoKClcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yXG4gICAgY29udGV4dC5maWxsKClcbiAgfVxuXG4gIGRyYXdMaW1pdEltZyhpbmRleCkge1xuICAgIGxldCBwb2ludCwgaW1nXG4gICAgaWYgKHRoaXMub3B0aW9ucy5saW1pdEltZykge1xuICAgICAgaW1nID0gdGhpcy5vcHRpb25zLmxpbWl0SW1nIGluc3RhbmNlb2YgQXJyYXkgPyB0aGlzLm9wdGlvbnMubGltaXRJbWdbaW5kZXhdIDogdGhpcy5vcHRpb25zLmxpbWl0SW1nXG4gICAgfVxuXG4gICAgaWYgKGltZykge1xuICAgICAgY29uc3QgYW5nbGUgPSBub3JtYWxpemVBbmdsZSh0aGlzLmFuZ2xlc1tpbmRleF0pXG4gICAgICBwb2ludCA9IG5ldyBQb2ludCgwLCAtaW1nLmhlaWdodCAvIDIpXG4gICAgICBwb2ludCA9IHBvaW50LmFkZCh0aGlzLm9wdGlvbnMubGltaXRJbWdPZmZzZXQpXG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHRoaXMuYXJlYVJlY3RhbmdsZS5zaXplLnggLyAyLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55IC8gMilcbiAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoYW5nbGUpXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltZywgcG9pbnQueCwgcG9pbnQueSlcbiAgICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMClcbiAgICB9XG4gIH1cblxuICBnZXRBbmdsZXNEaWZmKCkge1xuICAgIGNvbnN0IGFuZ2xlcyA9IHRoaXMuYW5nbGVzLnNsaWNlKDEpXG4gICAgbGV0IGJhc2VBbmdsZSA9IHRoaXMuYW5nbGVzWzBdXG5cbiAgICBhbmdsZXMucHVzaChiYXNlQW5nbGUpXG4gICAgcmV0dXJuIGFuZ2xlcy5tYXAoKGFuZ2xlKSA9PiB7XG4gICAgICBjb25zdCBkaWZmQW5nbGUgPSBub3JtYWxpemVBbmdsZShhbmdsZSAtIGJhc2VBbmdsZSlcbiAgICAgIGJhc2VBbmdsZSA9IGFuZ2xlXG4gICAgICByZXR1cm4gZGlmZkFuZ2xlXG4gICAgfSlcbiAgfVxuXG4gIGdldFBlcmNlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QW5nbGVzRGlmZigpLm1hcCgoZGlmZkFuZ2xlKSA9PiBkaWZmQW5nbGUgLyAoMiAqIE1hdGguUEkpKVxuICB9XG5cbiAgZ2V0QXJjQmlzZWN0cml4cygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBbmdsZXNEaWZmKCkubWFwKChkaWZmQW5nbGUsIGkpID0+IHtcbiAgICAgIHJldHVybiBub3JtYWxpemVBbmdsZSh0aGlzLmFuZ2xlc1tpXSArIGRpZmZBbmdsZSAvIDIpXG4gICAgfSlcbiAgfVxuXG4gIGdldEFyY09uUG9pbnQocG9pbnQpIHtcbiAgICBjb25zdCBhbmdsZSA9IGdldEFuZ2xlKHRoaXMub3B0aW9ucy5jZW50ZXIsIHBvaW50KVxuICAgIGNvbnN0IHJhZGl1cyA9IGdldERpc3RhbmNlKHRoaXMub3B0aW9ucy5jZW50ZXIsIHBvaW50KVxuXG4gICAgaWYgKHJhZGl1cyA+IHRoaXMub3B0aW9ucy5yYWRpdXMpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGxldCBvZmZzZXQgPSAtMSwgaSwgalxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmFuZ2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9mZnNldCA9PT0gLTEgfHwgdGhpcy5hbmdsZXNbb2Zmc2V0XSA+IHRoaXMuYW5nbGVzW2ldKSB7XG4gICAgICAgIG9mZnNldCA9IGlcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChpID0gMCwgaiA9IG9mZnNldDsgaSA8IHRoaXMuYW5nbGVzLmxlbmd0aDsgaSsrLCBqID0gKGkgKyBvZmZzZXQpICUgdGhpcy5hbmdsZXMubGVuZ3RoKSB7XG4gICAgICBpZiAoYW5nbGUgPCB0aGlzLmFuZ2xlc1tqXSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoLS1qIDwgMCkge1xuICAgICAgaiArPSB0aGlzLmFuZ2xlcy5sZW5ndGhcbiAgICB9XG4gICAgcmV0dXJuIGpcbiAgfVxuXG4gIHNldEFuZ2xlcyhhbmdsZXMpIHtcbiAgICB0aGlzLmFuZ2xlcyA9IGFuZ2xlc1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChkcmFnZ2FibGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5hbmdsZXNbaV1cbiAgICAgIGNvbnN0IGhhbGZTaXplID0gZHJhZ2dhYmxlLmdldFNpemUoKS5tdWx0KDAuNSlcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKFxuICAgICAgICBhbmdsZSxcbiAgICAgICAgdGhpcy5vcHRpb25zLnRvdWNoUmFkaXVzLFxuICAgICAgICB0aGlzLm9wdGlvbnMuY2VudGVyLnN1YihoYWxmU2l6ZSlcbiAgICAgIClcblxuICAgICAgZHJhZ2dhYmxlLm1vdmVBbmRTYXZlKHBvc2l0aW9uKVxuICAgIH0pXG4gICAgdGhpcy5kcmF3KClcbiAgfVxuXG4gIHNldEFjdGl2ZUFyYyhpbmRleCkge1xuICAgIGNvbnN0IGVuYWJsZUluZGV4ZXMgPSBnZXRBcnJheVdpdGhCb3VuZEluZGV4ZXMoaW5kZXgsIHRoaXMuZHJhZ2dhYmxlcy5sZW5ndGgpXG4gICAgdGhpcy5hY3RpdmVBcmNJbmRleCA9IGluZGV4XG4gICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goKGRyYWdnYWJsZSwgaSkgPT4ge1xuICAgICAgZHJhZ2dhYmxlLmVuYWJsZSA9IGVuYWJsZUluZGV4ZXMuaW5kZXhPZihpKSAhPT0gLTFcbiAgICB9KVxuICAgIHRoaXMuZHJhdygpXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJzZXRTdHlsZSIsImVsZW1lbnQiLCJzdHlsZSIsImNzc1RleHQiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImFwcGVuZEZpcnN0Q2hpbGQiLCJub2RlIiwiZmlyc3RDaGlsZCIsImluc2VydEJlZm9yZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlQ2FudmFzIiwiYXJlYSIsInJlY3RhZ2xlIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBvc2l0aW9uIiwic2V0QXR0cmlidXRlIiwic2l6ZSIsIngiLCJ5IiwibGVmdCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0QW5nbGUiLCJub3JtYWxpemVBbmdsZSIsImdldFBvaW50RnJvbVJhZGlhbFN5c3RlbSIsInJhbmdlIiwiRXZlbnRFbWl0dGVyIiwicDEiLCJwMiIsImRpZmYiLCJzdWIiLCJNYXRoIiwiYXRhbjIiLCJ0b1JhZGlhbiIsImFuZ2xlIiwiUEkiLCJ2YWwiLCJsZW5ndGgiLCJjZW50ZXIiLCJQb2ludCIsImFkZCIsImNvcyIsInNpbiIsIlNwaWRlciIsImNvbnN0cnVjdG9yIiwiZWxlbWVudHMiLCJvcHRpb25zIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiYXJlYVJlY3RhbmdsZSIsIlJlY3RhbmdsZSIsImZyb21FbGVtZW50IiwiT2JqZWN0IiwiYXNzaWduIiwiZEFuZ2xlIiwiZ2V0Q2VudGVyIiwic3RhcnRSYWRpdXMiLCJlbmRSYWRpdXMiLCJnZXRNaW5TaWRlIiwibGluZVdpZHRoIiwic3Ryb2tlU3R5bGUiLCJmaWxsU3R5bGUiLCJpbml0IiwiY29udGV4dCIsImdldENvbnRleHQiLCJkcmFnZ2FibGVzIiwibWFwIiwiaSIsImhhbGZTaXplIiwiZWxlbWVudFNpemUiLCJtdWx0Iiwic3RhcnQiLCJlbmQiLCJEcmFnZ2FibGUiLCJjb250YWluZXIiLCJib3VuZCIsIkJvdW5kVG9MaW5lIiwiYm91bmRpbmciLCJvbiIsImRyYWc6bW92ZSIsImRyYXciLCJpc0luaXQiLCJjbGVhclJlY3QiLCJiZWdpblBhdGgiLCJwb2ludCIsIm1vdmVUbyIsImxpbmVUbyIsImNsb3NlUGF0aCIsInN0cm9rZSIsImZpbGwiLCJldmVudHMiLCJldmVudE5hbWUiLCJmbiIsImVudHJpZXMiLCJlbWl0IiwiaW50ZXJydXB0ZWQiLCJhcmdzIiwic2xpY2UiLCJjYWxsIiwiZnVuYyIsImFwcGx5IiwiaW50ZXJydXB0IiwicHVzaCIsInByZXBlbmRPbiIsInVuc2hpZnQiLCJ1bnN1YnNjcmliZSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInJlc2V0RW1pdHRlciIsInJlc2V0T24iLCJBcmNTbGlkZXIiLCJyYWRpdXMiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJhbmdsZXMiLCJ0aW1lIiwic2hpZnRlZENlbnRlciIsImRyYWdnYWJsZSIsIkJvdW5kVG9BcmMiLCJjaGFuZ2UiLCJ1cGRhdGVBbmdsZSIsInNldEFuZ2xlIiwicGluUG9zaXRpb24iLCJzdG9wIiwic3RlcCIsInJlc3VsdCIsInJuZCIsInJvdW5kIiwicmFuZG9tIiwidG9IZXhTdHJpbmciLCJkaWdpdCIsInN0ciIsInRvU3RyaW5nIiwicmFuZG9tQ29sb3IiLCJnZXRBcnJheVdpdGhCb3VuZEluZGV4ZXMiLCJyZXRJbmRleGVzIiwiQ2hhcnQiLCJ0b3VjaFJhZGl1cyIsImJvdW5kQW5nbGUiLCJmaWxsU3R5bGVzIiwiaW5pdEFuZ2xlcyIsImxpbWl0SW1nIiwibGltaXRJbWdPZmZzZXQiLCJnZXRCb3VuZEFuZ2xlIiwidXBkYXRlQW5nbGVzIiwiZ2V0U2l6ZSIsImlzQ2xvc3NpbmciLCJzaWduIiwiZm9yRWFjaCIsIl9kcmFnZ2FibGUiLCJkcmF3QXJjIiwiZHJhd0xpbWl0SW1nIiwiY3JlYXRlQ2xvbmUiLCJyZWN0YW5nbGUiLCJvcHRzIiwiY2xvbmVPYmoiLCJnZXRGaWxsU3R5bGUiLCJjb2xvciIsImFyYyIsImltZyIsIkFycmF5IiwidHJhbnNsYXRlIiwicm90YXRlIiwiZHJhd0ltYWdlIiwic2V0VHJhbnNmb3JtIiwiZ2V0QW5nbGVzRGlmZiIsImJhc2VBbmdsZSIsImRpZmZBbmdsZSIsImdldFBlcmNlbnQiLCJnZXRBcmNCaXNlY3RyaXhzIiwiZ2V0QXJjT25Qb2ludCIsImdldERpc3RhbmNlIiwib2Zmc2V0IiwiaiIsInNldEFuZ2xlcyIsIm1vdmVBbmRTYXZlIiwic2V0QWN0aXZlQXJjIiwiZW5hYmxl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Q0FBQyxJQUFJLEVBQUU7RUFDWCxJQUFJLE1BQU0sUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEgsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztFQUN4TCxJQUFJLE9BQU8sSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztFQUN4QztFQUNBLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRTtFQUNaLElBQUksTUFBTSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0SCxJQUFJLE1BQU0sSUFBSSxH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Q0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNO0VBQzVELElBQUksT0FBTyxJQUFJO0VBQ2Y7RUFDQSxFQUFFLFNBQVMsR0FBRztFQUNkLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDcEM7RUFDQSxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUU7RUFDakIsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzVDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSTtFQUMxQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUk7RUFDekMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJO0VBQ3ZDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSTtFQUN4QztFQUNBLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRTtFQUNmLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7RUFDbkMsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDdEQ7RUFDQSxFQUFFLFVBQVUsR0FBRztFQUNmLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzdDO0VBQ0EsRUFBRSxPQUFPLFdBQVcsQ0FBQyxPQUFP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RyxFQUFFO0VBQ25CLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzFCLEdBQUcsTUFBTTtFQUNULElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5QyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2hFLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUM5QyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2hFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDO0VBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtFQUNuQixJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUMxQjtFQUNBO0VBQ0EsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDOUIsRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVDLElBQUksRUFBRSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDbkMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDckMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLEdBQUc7RUFDbkIsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNsRDtFQUNBLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7RUFDbEQsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0VBQzFCLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUMxQixFQUFFLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztFQUNoRCxFQUFFLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQztFQUM5RDtFQUNBLFNBQVMscUJBQXFCLENBQUMsV0FBVyxFQUFFLEtBQUssRUFB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
